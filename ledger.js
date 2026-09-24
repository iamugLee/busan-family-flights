(function ledgerApp() {
  "use strict";
  const PROJECT_URL = "https://wrfdekswwlubbgteevjt.supabase.co";
  const PUBLIC_KEY = "sb_publishable_lcP7BPT60ArEqcJ2ckwvyA_Qjn3DJhw";
  const TRIP_SLUG = "busan-2026";
  const CATEGORIES = ["餐飲", "交通", "住宿", "購物", "景點", "其他"];
  const $ = id => document.getElementById(id);
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const selected = selectId => $(selectId)?.value || "";
  const today = () => {
    const d = new Date();
    return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
  };
  const cents = number => Math.round(Number(number) * 100);
  const money = (amountCents, currency) => {
    const code = String(currency || "TWD").toUpperCase();
    const sym = code === "KRW" ? "₩" : code === "TWD" ? "NT$" : code === "USD" ? "US$" : code + " ";
    const digits = code === "KRW" ? 0 : 2;
    return sym + new Intl.NumberFormat("zh-TW", { maximumFractionDigits: digits }).format(Math.abs(amountCents) / 100);
  };
  const state = {
    db: null, trip: null, members: [], expenses: [], splits: [], settlements: [],
    view: "summary", editingExpense: null, busy: false, refreshQueued: false, loaded: false
  };
  const member = id => state.members.find(m => m.id === id);
  const memberName = id => member(id)?.name || "未知成員";
  const allMembers = () => state.members.map(m => m.id);
  const pick = (id, value) => { if ($(id)) $(id).value = value || ""; };
  const setStatus = (connected, msg) => {
    $("sync-dot").classList.toggle("offline", !connected);
    $("sync-label").textContent = msg;
  };
  const notify = (msg, good = false) => {
    const bar = $("ledger-alert");
    bar.hidden = false;
    bar.classList.toggle("ok", good);
    bar.textContent = msg;
    window.clearTimeout(notify.timeout);
    notify.timeout = window.setTimeout(() => { bar.hidden = true; }, 7000);
  };
  const showError = (id, msg) => {
    $(id).hidden = false;
    $(id).textContent = msg;
  };
  const clearError = id => { $(id).hidden = true; $(id).textContent = ""; };
  function allocate(totalCents, ids, currency) {
    if (!ids.length) throw new Error("至少選擇一位分攤人");
    const unit = currency === "KRW" ? 100 : 1;
    if (totalCents % unit !== 0) throw new Error("韓元金額請輸入整數");
    const count = totalCents / unit;
    const base = Math.floor(count / ids.length), extra = count % ids.length;
    return ids.map((id, i) => ({ member_id: id, cents: (base + (i < extra ? 1 : 0)) * unit }));
  }
  function parseAmount(input, currency) {
    const num = Number(input);
    if (!Number.isFinite(num) || num <= 0 || num > 999999999) throw new Error("金額須為大於零的有效數字");
    if (currency === "KRW" && !Number.isInteger(num)) throw new Error("韓元金額請輸入整數");
    if (Math.abs(num * 100 - Math.round(num * 100)) > 0.000001) throw new Error("金額最多輸入小數點後兩位");
    return cents(num);
  }
  function memberOptions(includeBlank = false) {
    return (includeBlank ? '<option value="">不指定</option>' : "") +
      state.members.map(m => '<option value="' + escapeHTML(m.id) + '">' + escapeHTML(m.name) + "</option>").join("");
  }
  function initializeSelectors() {
    const options = memberOptions();
    ["expense-paidby", "settlement-from", "settlement-to"].forEach(id => { $(id).innerHTML = options; });
    ["expense-editor", "settlement-editor"].forEach(id => {
      $(id).innerHTML = memberOptions(true);
      const saved = window.localStorage.getItem("busan-ledger-editor") || "";
      if (member(saved)) $(id).value = saved;
    });
    $("expense-filter-member").innerHTML = '<option value="all">全部成員</option>' + options;
    $("expense-date").value = today();
    $("settlement-date").value = today();
  }
  async function refresh(silent = false) {
    if (state.busy) { state.refreshQueued = true; return; }
    state.busy = true;
    if (!silent) setStatus(false, "正在讀取最新帳務…");
    try {
      const db = state.db;
      const { data: trip, error: tripError } = await db.from("trips").select("id,name").eq("slug", TRIP_SLUG).single();
      if (tripError) throw tripError;
      const [m, e, s] = await Promise.all([
        db.from("trip_members").select("id,name,sort_order").eq("trip_id", trip.id).eq("active", true).order("sort_order"),
        db.from("expenses").select("*").eq("trip_id", trip.id).order("spent_at", { ascending: false }).order("created_at", { ascending: false }),
        db.from("settlements").select("*").eq("trip_id", trip.id).order("settled_at", { ascending: false }).order("created_at", { ascending: false })
      ]);
      if (m.error) throw m.error;
      if (e.error) throw e.error;
      if (s.error) throw s.error;
      const ids = (e.data || []).map(row => row.id);
      let splits = [];
      if (ids.length) {
        const answer = await db.from("expense_splits").select("expense_id,member_id,amount").in("expense_id", ids);
        if (answer.error) throw answer.error;
        splits = answer.data || [];
      }
      state.trip = trip;
      state.members = m.data || [];
      state.expenses = e.data || [];
      state.splits = splits;
      state.settlements = s.data || [];
      if (!state.loaded) {
        initializeSelectors();
        state.loaded = true;
        $("new-expense").disabled = false;
      }
      render();
      setStatus(true, "雲端資料已同步 · " + new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" }));
    } catch (err) {
      setStatus(false, "連線失敗，稍後自動重試");
      if (!silent) notify("讀取帳務失敗：" + (err?.message || String(err)));
    } finally {
      state.busy = false;
      if (state.refreshQueued) {
        state.refreshQueued = false;
        window.setTimeout(() => refresh(true), 300);
      }
    }
  }
  function splitRows(expenseId) { return state.splits.filter(row => row.expense_id === expenseId); }
  function compute() {
    const balances = {};
    const totals = {};
    const categories = {};
    const burdens = {};
    const add = (currency, id, sum) => {
      if (!balances[currency]) balances[currency] = {};
      balances[currency][id] = (balances[currency][id] || 0) + sum;
    };
    for (const e of state.expenses) {
      const cur = e.currency, amount = cents(e.amount);
      totals[cur] = (totals[cur] || 0) + amount;
      if (!categories[cur]) categories[cur] = {};
      categories[cur][e.category] = (categories[cur][e.category] || 0) + amount;
      add(cur, e.paid_by, amount);
      for (const s of splitRows(e.id)) {
        const share = cents(s.amount);
        add(cur, s.member_id, -share);
        if (!burdens[cur]) burdens[cur] = {};
        burdens[cur][s.member_id] = (burdens[cur][s.member_id] || 0) + share;
      }
    }
    for (const s of state.settlements) {
      const amount = cents(s.amount);
      add(s.currency, s.from_member_id, amount);
      add(s.currency, s.to_member_id, -amount);
    }
    return { balances, totals, categories, burdens };
  }
  function optimize(balances) {
    const transfers = [];
    for (const [currency, entries] of Object.entries(balances)) {
      const creditors = Object.entries(entries).filter(([, v]) => v > 0).map(([id, amount]) => ({ id, amount })).sort((a, b) => b.amount - a.amount);
      const debtors = Object.entries(entries).filter(([, v]) => v < 0).map(([id, amount]) => ({ id, amount: -amount })).sort((a, b) => b.amount - a.amount);
      let i = 0, j = 0;
      while (i < debtors.length && j < creditors.length) {
        const value = Math.min(debtors[i].amount, creditors[j].amount);
        if (value > 0) transfers.push({ from: debtors[i].id, to: creditors[j].id, amount: value, currency });
        debtors[i].amount -= value;
        creditors[j].amount -= value;
        if (!debtors[i].amount) i++;
        if (!creditors[j].amount) j++;
      }
    }
    return transfers;
  }
  function expenseHTML(e, allowActions) {
    const splits = splitRows(e.id);
    const who = splits.map(row => memberName(row.member_id)).join("、") || "尚無分攤";
    const action = allowActions ?
      '<div class="ledger-mini-actions"><button type="button" data-edit="' + escapeHTML(e.id) + '">修改</button><button type="button" data-remove="' + escapeHTML(e.id) + '">刪除</button></div>' : "";
    return '<div class="ledger-row"><div><h3><span class="ledger-tag">' + escapeHTML(e.category) + "</span>" +
      escapeHTML(e.title) + '</h3><p>' + escapeHTML(e.spent_at) + " · " + escapeHTML(memberName(e.paid_by)) +
      ' 先付款</p><div class="ledger-meta">分攤：' + escapeHTML(who) +
      (e.notes ? " · " + escapeHTML(e.notes) : "") + "</div></div><div style=\"text-align:right\"><strong>" +
      escapeHTML(money(cents(e.amount), e.currency)) + "</strong>" + action + "</div></div>";
  }
  function empty(title, desc) {
    return '<div class="ledger-empty"><strong>' + escapeHTML(title) + "</strong>" + escapeHTML(desc) + "</div>";
  }
  function currencyOrder(keys) { return [...keys].sort((a, b) => ["KRW", "TWD", "USD"].indexOf(a) - ["KRW", "TWD", "USD"].indexOf(b)); }
  function renderBalance(balances) {
    const html = currencyOrder(Object.keys(balances)).map(currency => {
      const rows = state.members.map(m => ({ name: m.name, value: balances[currency][m.id] || 0 })).filter(m => m.value !== 0);
      if (!rows.length) return "";
      return '<div class="ledger-stack"><h3 style="margin:7px 0">' + escapeHTML(currency) + '</h3>' +
        rows.map(row => '<div class="ledger-row"><span>' + escapeHTML(row.name) + '</span><strong class="ledger-money ' +
        (row.value > 0 ? "pos" : "neg") + '">' +
        (row.value > 0 ? "應收 " : "應付 ") + escapeHTML(money(row.value, currency)) + "</strong></div>").join("") + "</div>";
    }).filter(Boolean).join('<div class="ledger-divide"></div>');
    $("balance-list").innerHTML = html || empty("目前沒有待結算帳款", "新增第一筆支出後，這裡會自動計算。");
  }
  function suggestionHTML(transfers, withButtons) {
    if (!transfers.length) return empty("帳務已平衡", "目前沒有需要轉帳的金額。");
    return '<div class="ledger-list">' + transfers.map(t =>
      '<div class="ledger-row"><div><h3>' + escapeHTML(memberName(t.from)) + ' → ' + escapeHTML(memberName(t.to)) +
      '</h3><p>' + escapeHTML(t.currency) + ' · 建議轉帳</p></div><div style="text-align:right"><strong>' +
      escapeHTML(money(t.amount, t.currency)) + '</strong>' +
      (withButtons ? '<div class="ledger-mini-actions"><button type="button" data-settle-from="' +
        escapeHTML(t.from) + '" data-settle-to="' + escapeHTML(t.to) + '" data-settle-amount="' +
        escapeHTML(t.amount / 100) + '" data-settle-currency="' + escapeHTML(t.currency) + '">登記已還</button></div>' : "") +
      "</div></div>").join("") + "</div>";
  }
  function renderOverview(result, transfers) {
    const card = (caption, value, note) => '<div class="ledger-kpi"><small>' + caption + '</small><strong>' +
      escapeHTML(value) + '</strong><span>' + note + "</span></div>";
    const totalKRW = result.totals.KRW || 0, totalTWD = result.totals.TWD || 0;
    $("summary-kpis").innerHTML = card("TOTAL / KRW", money(totalKRW, "KRW"), "韓元支出累計") +
      card("TOTAL / TWD", money(totalTWD, "TWD"), "台幣支出累計") +
      card("RECORDS", String(state.expenses.length), "筆支出 · " + state.settlements.length + " 筆還款");
    renderBalance(result.balances);
    $("suggested-settlements").innerHTML = suggestionHTML(transfers, false);
    $("recent-expenses").innerHTML = state.expenses.length ?
      state.expenses.slice(0, 5).map(e => expenseHTML(e, false)).join("") :
      empty("還沒有收支紀錄", "按右上角的「新增支出」，開始七人共用記帳。");
  }
  function renderExpenses() {
    const currency = selected("expense-filter-currency"), category = selected("expense-filter-category"), payer = selected("expense-filter-member");
    const rows = state.expenses.filter(e =>
      (currency === "all" || e.currency === currency) &&
      (category === "all" || e.category === category) &&
      (payer === "all" || e.paid_by === payer));
    $("all-expenses").innerHTML = rows.length ? rows.map(e => expenseHTML(e, true)).join("") :
      empty("沒有符合的支出", "可以調整篩選條件，或新增一筆支出。");
  }
  function renderSettlements(transfers) {
    $("settlement-suggestions").innerHTML = suggestionHTML(transfers, true);
    $("settlement-history").innerHTML = state.settlements.length ?
      '<div class="ledger-list">' + state.settlements.map(s =>
        '<div class="ledger-row"><div><h3>' + escapeHTML(memberName(s.from_member_id)) + ' → ' +
        escapeHTML(memberName(s.to_member_id)) + '</h3><p>' + escapeHTML(s.settled_at) +
        (s.notes ? " · " + escapeHTML(s.notes) : "") + '</p></div><div style="text-align:right"><strong>' +
        escapeHTML(money(cents(s.amount), s.currency)) +
        '</strong><div class="ledger-mini-actions"><button type="button" data-remove-settlement="' +
        escapeHTML(s.id) + '">刪除</button></div></div></div>').join("") + "</div>" :
      empty("尚無還款紀錄", "旅伴實際完成轉帳後，再按「登記已還款」。");
  }
  function bars(data, currency) {
    const rows = Object.entries(data).filter(([, value]) => value > 0).sort((a, b) => b[1] - a[1]);
    const max = rows.length ? rows[0][1] : 1;
    return rows.map(([label, value]) => '<div class="ledger-bar-row"><span>' + escapeHTML(label) +
      '</span><div class="ledger-bar"><span style="width:' + (100 * value / max).toFixed(2) +
      '%"></span></div><strong>' + escapeHTML(money(value, currency)) + "</strong></div>").join("");
  }
  function renderStats(result) {
    const print = source => currencyOrder(Object.keys(source)).map(currency =>
      '<h3 style="margin:15px 0 8px;color:#436578">' + escapeHTML(currency) + "</h3>" + bars(source[currency], currency)).join("");
    $("category-stats").innerHTML = print(result.categories) || empty("尚無分類統計", "新增支出後顯示。");
    const stats = {};
    for (const [currency, amounts] of Object.entries(result.burdens)) {
      stats[currency] = {};
      for (const [memberId, value] of Object.entries(amounts)) stats[currency][memberName(memberId)] = value;
    }
    $("member-stats").innerHTML = print(stats) || empty("尚無個人統計", "新增支出後顯示。");
  }
  function render() {
    const result = compute(), transfers = optimize(result.balances);
    renderOverview(result, transfers);
    renderExpenses();
    renderSettlements(transfers);
    renderStats(result);
  }
  function changeView(view) {
    if (!["summary", "expenses", "settlements", "stats"].includes(view)) return;
    state.view = view;
    document.querySelectorAll("[data-view]").forEach(btn => {
      if (!btn.classList.contains("ledger-tab")) return;
      const isActive = btn.dataset.view === view;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
    ["summary", "expenses", "settlements", "stats"].forEach(v => { $("view-" + v).hidden = v !== view; });
  }
  function participants() {
    return [...$("expense-participants").querySelectorAll('input[type="checkbox"]:checked')].map(el => el.value);
  }
  function buildParticipants(ids) {
    $("expense-participants").innerHTML = state.members.map(m =>
      '<label><input type="checkbox" value="' + escapeHTML(m.id) + '"' +
      (ids.includes(m.id) ? " checked" : "") + '> ' + escapeHTML(m.name) + "</label>").join("");
    $("expense-custom").dataset.ids = "";
  }
  function splitMode() { return document.querySelector('input[name="split_mode"]:checked')?.value || "equal"; }
  function updateCustomInputs(ids, total, currency) {
    const area = $("expense-custom");
    const idSignature = ids.join(",");
    if (area.dataset.ids === idSignature) return;
    const prev = new Map([...area.querySelectorAll('input[data-split-member]')].map(el => [el.dataset.splitMember, el.value]));
    let estimated;
    try { estimated = allocate(total, ids, currency); } catch (_) { estimated = ids.map(id => ({ member_id: id, cents: 0 })); }
    const suggested = new Map(estimated.map(el => [el.member_id, el.cents / 100]));
    area.innerHTML = ids.map(id => '<label class="ledger-custom-row"><span>' + escapeHTML(memberName(id)) +
      '</span><input class="ledger-input" inputmode="decimal" type="number" min="0" step="' +
      (currency === "KRW" ? "1" : ".01") + '" data-split-member="' + escapeHTML(id) +
      '" value="' + escapeHTML(prev.has(id) ? prev.get(id) : suggested.get(id)) + '"></label>').join("");
    area.dataset.ids = idSignature;
  }
  function previewSplit() {
    const target = $("split-preview"), ids = participants(), currency = selected("expense-currency");
    const total = cents($("expense-amount").value);
    const custom = splitMode() === "custom";
    $("expense-custom").hidden = !custom;
    if (custom) updateCustomInputs(ids, total, currency);
    if (!ids.length) { target.textContent = "請至少勾選一位分攤人"; return; }
    if (!(total > 0) || !Number.isFinite(total)) { target.textContent = "輸入金額後，會自動計算分攤結果。"; return; }
    try {
      const allocation = custom ?
        [...$("expense-custom").querySelectorAll("input[data-split-member]")].map(el => ({
          member_id: el.dataset.splitMember, cents: cents(el.value || 0)
        })) : allocate(total, ids, currency);
      const sum = allocation.reduce((a, row) => a + row.cents, 0);
      if (sum !== total) {
        target.textContent = "目前已分配 " + money(sum, currency) + "，應為 " + money(total, currency) +
          "，還差 " + money(total - sum, currency) + "。";
      } else {
        target.textContent = "合計正確：" + allocation.map(row => memberName(row.member_id) +
          " " + money(row.cents, currency)).join(" · ");
      }
    } catch (err) { target.textContent = err.message; }
  }
  function openExpense(id = null) {
    if (!state.loaded) { notify("帳務仍在載入，請稍候。"); return; }
    clearError("expense-error");
    $("expense-form").reset();
    $("expense-dialog-title").textContent = id ? "修改支出" : "新增支出";
    $("expense-submit").textContent = id ? "儲存修改" : "儲存支出";
    state.editingExpense = id;
    $("expense-date").value = today();
    $("expense-currency").value = "KRW";
    $("expense-category").value = "餐飲";
    pick("expense-editor", window.localStorage.getItem("busan-ledger-editor") || "");
    let ids = allMembers();
    if (id) {
      const expense = state.expenses.find(row => row.id === id);
      if (!expense) { notify("找不到此支出，請重新整理。"); return; }
      $("expense-title").value = expense.title;
      $("expense-amount").value = Number(expense.amount);
      $("expense-currency").value = expense.currency;
      $("expense-paidby").value = expense.paid_by;
      $("expense-date").value = expense.spent_at;
      $("expense-category").value = CATEGORIES.includes(expense.category) ? expense.category : "其他";
      $("expense-notes").value = expense.notes || "";
      $("expense-editor").value = expense.updated_by_member_id || expense.created_by_member_id || "";
      ids = splitRows(id).map(row => row.member_id);
    }
    buildParticipants(ids);
    document.querySelector('input[name="split_mode"][value="equal"]').checked = true;
    if (id) {
      const exp = state.expenses.find(e => e.id === id);
      const existing = splitRows(id), expected = allocate(cents(exp.amount), ids, exp.currency);
      const match = expected.every((row, i) => row.member_id === ids[i] &&
        row.cents === cents(existing.find(x => x.member_id === row.member_id)?.amount ?? -1));
      if (!match) {
        document.querySelector('input[name="split_mode"][value="custom"]').checked = true;
        updateCustomInputs(ids, cents(exp.amount), exp.currency);
        for (const row of existing) {
          const input = [...$("expense-custom").querySelectorAll("input")].find(el => el.dataset.splitMember === row.member_id);
          if (input) input.value = Number(row.amount);
        }
      }
    }
    previewSplit();
    $("expense-modal").hidden = false;
    $("expense-title").focus();
  }
  function closeExpense() { $("expense-modal").hidden = true; state.editingExpense = null; }
  function openSettlement(transfer = null) {
    if (!state.loaded) { notify("帳務仍在載入，請稍候。"); return; }
    $("settlement-form").reset();
    clearError("settlement-error");
    $("settlement-date").value = today();
    pick("settlement-editor", window.localStorage.getItem("busan-ledger-editor") || "");
    if (transfer) {
      pick("settlement-from", transfer.from);
      pick("settlement-to", transfer.to);
      pick("settlement-currency", transfer.currency);
      $("settlement-amount").value = transfer.amount;
    }
    $("settlement-modal").hidden = false;
    $("settlement-amount").focus();
  }
  async function submitExpense(event) {
    event.preventDefault();
    clearError("expense-error");
    const submit = $("expense-submit");
    try {
      const currency = selected("expense-currency");
      const total = parseAmount($("expense-amount").value, currency);
      const ids = participants();
      if (!ids.length) throw new Error("至少需要一位分攤人");
      const split = splitMode() === "custom" ?
        [...$("expense-custom").querySelectorAll("input[data-split-member]")].map(el => ({
          member_id: el.dataset.splitMember, cents: Number(el.value) === 0 ? 0 : parseAmount(el.value, currency)
        })) : allocate(total, ids, currency);
      if (split.length !== ids.length) throw new Error("分攤人數與金額欄位不一致");
      if (split.reduce((acc, row) => acc + row.cents, 0) !== total) throw new Error("各人分攤金額加總必須等於支出總額");
      submit.disabled = true;
      submit.textContent = "儲存中…";
      const editor = selected("expense-editor") || null;
      const args = {
        p_trip_slug: TRIP_SLUG,
        p_title: $("expense-title").value.trim(),
        p_amount: total / 100,
        p_currency: currency,
        p_category: selected("expense-category"),
        p_paid_by: selected("expense-paidby"),
        p_spent_at: $("expense-date").value,
        p_notes: $("expense-notes").value.trim(),
        p_editor: editor,
        p_splits: split.map(row => ({ member_id: row.member_id, amount: row.cents / 100 }))
      };
      if (!args.p_title) throw new Error("請填寫支出名稱");
      if (state.editingExpense) args.p_expense_id = state.editingExpense;
      const { error } = await state.db.rpc(state.editingExpense ? "ledger_update_expense" : "ledger_create_expense", args);
      if (error) throw error;
      window.localStorage.setItem("busan-ledger-editor", editor || "");
      closeExpense();
      await refresh();
      notify("支出已存入雲端，所有人都能看到更新。", true);
    } catch (err) { showError("expense-error", "儲存失敗：" + (err?.message || String(err))); }
    finally { submit.disabled = false; submit.textContent = state.editingExpense ? "儲存修改" : "儲存支出"; }
  }
  async function submitSettlement(event) {
    event.preventDefault();
    clearError("settlement-error");
    const submit = $("settlement-submit");
    try {
      const from = selected("settlement-from"), to = selected("settlement-to"), currency = selected("settlement-currency");
      if (from === to) throw new Error("付款人與收款人不能相同");
      const amount = parseAmount($("settlement-amount").value, currency);
      submit.disabled = true;
      const editor = selected("settlement-editor") || null;
      const { error } = await state.db.rpc("ledger_create_settlement", {
        p_trip_slug: TRIP_SLUG, p_from: from, p_to: to, p_amount: amount / 100,
        p_currency: currency, p_settled_at: $("settlement-date").value,
        p_notes: $("settlement-notes").value.trim(), p_editor: editor
      });
      if (error) throw error;
      window.localStorage.setItem("busan-ledger-editor", editor || "");
      $("settlement-modal").hidden = true;
      await refresh();
      notify("還款紀錄已同步，應收應付已重新計算。", true);
    } catch (err) { showError("settlement-error", "無法登記還款：" + (err?.message || String(err))); }
    finally { submit.disabled = false; }
  }
  async function removeExpense(id) {
    const exp = state.expenses.find(e => e.id === id);
    if (!exp || !window.confirm("確定刪除「" + exp.title + "」？所有旅伴的帳本都會同步移除。")) return;
    const { error } = await state.db.rpc("ledger_delete_expense", { p_trip_slug: TRIP_SLUG, p_expense_id: id });
    if (error) { notify("刪除失敗：" + error.message); return; }
    await refresh();
    notify("支出已刪除。", true);
  }
  async function removeSettlement(id) {
    if (!window.confirm("確定刪除這筆還款紀錄？所有人的餘額將重新計算。")) return;
    const { error } = await state.db.rpc("ledger_delete_settlement", { p_trip_slug: TRIP_SLUG, p_settlement_id: id });
    if (error) { notify("刪除失敗：" + error.message); return; }
    await refresh();
    notify("還款紀錄已刪除。", true);
  }
  function attach() {
    $("new-expense").disabled = true;
    $("new-expense").addEventListener("click", () => openExpense());
    $("record-settlement").addEventListener("click", () => openSettlement());
    $("expense-close").addEventListener("click", closeExpense);
    $("expense-cancel").addEventListener("click", closeExpense);
    $("settlement-close").addEventListener("click", () => { $("settlement-modal").hidden = true; });
    $("settlement-cancel").addEventListener("click", () => { $("settlement-modal").hidden = true; });
    ["expense-modal", "settlement-modal"].forEach(id => $(id).addEventListener("click", e => {
      if (e.target === $(id)) $(id).hidden = true;
    }));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") { closeExpense(); $("settlement-modal").hidden = true; }
    });
    document.addEventListener("click", e => {
      const tab = e.target.closest("[data-view]");
      if (tab) changeView(tab.dataset.view);
      const edit = e.target.closest("[data-edit]");
      if (edit) openExpense(edit.dataset.edit);
      const del = e.target.closest("[data-remove]");
      if (del) removeExpense(del.dataset.remove);
      const settle = e.target.closest("[data-settle-from]");
      if (settle) openSettlement({
        from: settle.dataset.settleFrom, to: settle.dataset.settleTo,
        amount: Number(settle.dataset.settleAmount), currency: settle.dataset.settleCurrency
      });
      const delSettlement = e.target.closest("[data-remove-settlement]");
      if (delSettlement) removeSettlement(delSettlement.dataset.removeSettlement);
    });
    ["expense-filter-currency", "expense-filter-category", "expense-filter-member"].forEach(id => $(id).addEventListener("change", renderExpenses));
    ["expense-amount", "expense-currency"].forEach(id => $(id).addEventListener("input", () => {
      $("expense-custom").dataset.ids = ""; previewSplit();
    }));
    $("expense-participants").addEventListener("change", previewSplit);
    document.querySelectorAll('input[name="split_mode"]').forEach(el => el.addEventListener("change", previewSplit));
    $("expense-custom").addEventListener("input", previewSplit);
    $("expense-form").addEventListener("submit", submitExpense);
    $("settlement-form").addEventListener("submit", submitSettlement);
  }
  function subscribe() {
    state.db.channel("busan-ledger-version").on("postgres_changes", {
      event: "UPDATE", schema: "public", table: "ledger_sync", filter: "trip_slug=eq.busan-2026"
    }, () => refresh(true)).subscribe(status => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        setStatus(false, "即時連線暫時中斷，每 25 秒仍會自動更新");
      }
    });
    window.setInterval(() => refresh(true), 25000);
    document.addEventListener("visibilitychange", () => { if (!document.hidden) refresh(true); });
    window.addEventListener("online", () => refresh());
  }
  async function init() {
    attach();
    if (!window.supabase?.createClient) {
      setStatus(false, "載入雲端套件失敗，請檢查網路後重新整理");
      notify("無法載入資料庫連線套件，請重新整理頁面。");
      return;
    }
    state.db = window.supabase.createClient(PROJECT_URL, PUBLIC_KEY, { auth: { persistSession: false } });
    await refresh();
    subscribe();
  }
  init();
})();
