(function busanTodoApp() {
  "use strict";
  const URL = "https://wrfdekswwlubbgteevjt.supabase.co";
  const KEY = "sb_publishable_lcP7BPT60ArEqcJ2ckwvyA_Qjn3DJhw";
  const TRIP_SLUG = "busan-2026";
  const $ = id => document.getElementById(id);
  const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const today = () => { const d = new Date(); return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-"); };
  const state = { db: null, trip: null, members: [], tasks: [], status: "open", loaded: false, fetching: false, queued: false, writing: false, editing: null, channel: null };
  const member = id => state.members.find(m => m.id === id);
  const memberName = id => member(id)?.name || "未知成員";
  const memberNames = ids => (ids || []).map(memberName).join("、") || "未指定負責人";
  const priorityLabel = { high:"重要", normal:"一般", low:"彈性" };
  const priorityRank = { high:0, normal:1, low:2 };
  function status(ok, msg) { $("todo-sync-dot").classList.toggle("offline", !ok); $("todo-sync-message").textContent = msg; }
  function notify(message, ok=false) { const box=$("todo-alert"); box.textContent=message; box.classList.toggle("ok",ok); box.hidden=false; clearTimeout(notify.timer); notify.timer=setTimeout(()=>box.hidden=true,6500); }
  function assignOptions() {
    $("filter-assignee").innerHTML='<option value="all">全部成員</option><option value="unassigned">尚未指派</option>' + state.members.map(m=>'<option value="'+esc(m.id)+'">'+esc(m.name)+'</option>').join("");
    $("task-editor").innerHTML='<option value="">不指定</option>' + state.members.map(m=>'<option value="'+esc(m.id)+'">'+esc(m.name)+'</option>').join("");
    $("task-assignees").innerHTML=state.members.map(m=>'<label><input type="checkbox" value="'+esc(m.id)+'">'+esc(m.name)+'</label>').join("");
  }
  async function load(silent=false) {
    if(state.fetching || state.writing){state.queued=true;return;}
    state.fetching=true;
    if(!silent)status(false,"正在更新雲端清單…");
    try {
      const db=state.db;
      if(!state.trip){const {data,error}=await db.from("trips").select("id,name").eq("slug",TRIP_SLUG).single(); if(error)throw error;state.trip=data;}
      const [members,tasks]=await Promise.all([
        db.from("trip_members").select("id,name,sort_order").eq("trip_id",state.trip.id).eq("active",true).order("sort_order"),
        db.from("todo_tasks").select("id,trip_id,title,notes,priority,assignee_ids,due_date,is_done,completed_at,created_by_member_id,created_at,updated_at").eq("trip_id",state.trip.id).order("created_at",{ascending:false})
      ]);
      if(members.error)throw members.error;
      if(tasks.error)throw tasks.error;
      state.members=members.data||[];state.tasks=tasks.data||[];
      if(!state.loaded){state.loaded=true;assignOptions();$("add-task").disabled=false;$("add-task-hero").disabled=false;}
      render();
      status(true,"雲端已同步 · "+new Date().toLocaleTimeString("zh-TW",{hour:"2-digit",minute:"2-digit"}));
    }catch(e){status(false,"同步失敗；系統將自動重試");if(!silent)notify("讀取清單失敗："+(e?.message||String(e)));}
    finally{state.fetching=false;if(state.queued){state.queued=false;setTimeout(()=>load(true),350);}}
  }
  function filtered() {
    const priority=$("filter-priority").value, who=$("filter-assignee").value, search=$("search-tasks").value.trim().toLocaleLowerCase("zh-TW");
    return state.tasks.filter(t=>
      (state.status==="all" || (state.status==="done"?t.is_done:!t.is_done)) &&
      (priority==="all" || t.priority===priority) &&
      (who==="all" || (who==="unassigned"?!(t.assignee_ids||[]).length:(t.assignee_ids||[]).includes(who))) &&
      (!search || (t.title+" "+t.notes+" "+memberNames(t.assignee_ids)).toLocaleLowerCase("zh-TW").includes(search))
    ).sort((a,b)=>{
      if(a.is_done!==b.is_done)return a.is_done?1:-1;
      if(!a.is_done && priorityRank[a.priority]!==priorityRank[b.priority])return priorityRank[a.priority]-priorityRank[b.priority];
      if(a.due_date!==b.due_date)return a.due_date?(b.due_date?a.due_date.localeCompare(b.due_date):-1):1;
      return b.created_at.localeCompare(a.created_at);
    });
  }
  function dueTag(t){
    if(!t.due_date)return "";
    const overdue=!t.is_done&&t.due_date<today();
    return '<span class="todo-chip '+(overdue?'overdue':'')+'">'+(overdue?'已逾期 · ':'預計 ')+esc(t.due_date.replaceAll('-','/'))+'</span>';
  }
  function taskHTML(t){
    const priority=priorityLabel[t.priority]||"一般";
    return '<article class="todo-task '+(t.is_done?'is-done':'')+'" data-task="'+esc(t.id)+'">'+
      '<label class="todo-check"><input type="checkbox" data-complete="'+esc(t.id)+'" aria-label="標記 '+esc(t.title)+' 是否完成" '+(t.is_done?'checked':'')+'></label>'+
      '<div class="todo-task-main"><div class="todo-task-title">'+esc(t.title)+'</div>'+
      (t.notes?'<div class="todo-task-notes">'+esc(t.notes)+'</div>':'')+
      '<div class="todo-task-meta"><span class="todo-chip '+esc(t.priority)+'">'+esc(priority)+'</span><span class="todo-chip">負責：'+esc(memberNames(t.assignee_ids))+'</span>'+dueTag(t)+(t.is_done?'<span class="todo-chip done">✓ 已完成</span>':'')+'</div></div>'+
      '<div class="todo-actions"><button type="button" class="todo-action" data-edit="'+esc(t.id)+'">編輯</button><button type="button" class="todo-action delete" data-delete="'+esc(t.id)+'">刪除</button></div></article>';
  }
  function render(){
    const n=state.tasks.length,done=state.tasks.filter(t=>t.is_done).length,open=n-done,high=state.tasks.filter(t=>!t.is_done&&t.priority==="high").length;
    $("stat-total").textContent=n;$("stat-open").textContent=open;$("stat-high").textContent=high;$("stat-done").textContent=done;
    $("tab-all").textContent=n;$("tab-open").textContent=open;$("tab-done").textContent=done;
    const percent=n?Math.round(done/n*100):0;$("progress-text").textContent=percent+"%";$("progress-fill").style.width=percent+"%";
    $("progress-description").textContent=n?"已完成 "+done+" 件，共 "+n+" 件待辦事項。":"新增第一件待辦事項，開始一起安排旅程。";
    document.querySelectorAll("[data-status]").forEach(b=>{let active=b.dataset.status===state.status;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
    const rows=filtered();$("todo-list").innerHTML=rows.length?rows.map(taskHTML).join(""):'<div class="todo-empty"><strong>'+(n?'目前沒有符合的事項':'一起開始規劃旅程')+'</strong>'+(n?'試著切換篩選條件，或新增其他待辦。':'點選「新增事項」，負責人和重要性都能一起設定。')+'</div>';
  }
  function openModal(id=null){
    if(!state.loaded){notify("清單載入中，請稍候。");return;}
    const t=id?state.tasks.find(x=>x.id===id):null;if(id&&!t){notify("找不到這個待辦事項，請重新整理。");return;}
    state.editing=t?.id||null;
    $("task-form").reset();$("task-error").hidden=true;$("task-error").textContent="";
    $("task-dialog-heading").textContent=t?"編輯待辦事項":"新增待辦事項";$("save-task").textContent=t?"儲存修改":"儲存待辦事項";
    $("task-title").value=t?.title||"";$("task-notes").value=t?.notes||"";$("task-due").value=t?.due_date||"";$("task-done").checked=!!t?.is_done;
    document.querySelectorAll('[name="task-priority"]').forEach(r=>r.checked=r.value===(t?.priority||"normal"));
    $("task-assignees").querySelectorAll('input[type="checkbox"]').forEach(i=>i.checked=(t?.assignee_ids||[]).includes(i.value));
    const saved=window.localStorage.getItem("busan-todo-editor")||"";
    $("task-editor").value=(t?.created_by_member_id&&member(t.created_by_member_id)?t.created_by_member_id:member(saved)?saved:"");
    $("task-modal").hidden=false;document.body.style.overflow="hidden";$("task-title").focus();
  }
  function closeModal(){if(state.writing)return;$("task-modal").hidden=true;state.editing=null;document.body.style.overflow="";}
  function errorBox(text){$("task-error").hidden=false;$("task-error").textContent=text;}
  async function save(e){
    e.preventDefault();if(state.writing)return;$("task-error").hidden=true;
    try{
      const title=$("task-title").value.trim();if(!title)throw Error("請填寫待辦事項。") ;
      const priority=document.querySelector('[name="task-priority"]:checked')?.value||"normal";
      const editor=$("task-editor").value||null;
      const payload={title,notes:$("task-notes").value.trim(),priority,due_date:$("task-due").value||null,is_done:$("task-done").checked,assignee_ids:[...$("task-assignees").querySelectorAll('input:checked')].map(i=>i.value)};
      state.writing=true;$("save-task").disabled=true;$("save-task").textContent="儲存中…";
      let result;
      if(state.editing){result=await state.db.from("todo_tasks").update(payload).eq("id",state.editing).eq("trip_id",state.trip.id).select("id").single();}
      else{payload.trip_id=state.trip.id;payload.created_by_member_id=editor;result=await state.db.from("todo_tasks").insert(payload).select("id").single();}
      if(result.error)throw result.error;
      window.localStorage.setItem("busan-todo-editor",editor||"");
      state.writing=false;$("save-task").disabled=false;closeModal();
      await load(true);notify("待辦事項已同步，所有旅伴都能看到。",true);
    }catch(err){errorBox("儲存失敗："+(err?.message||String(err)));}
    finally{state.writing=false;$("save-task").disabled=false;$("save-task").textContent=state.editing?"儲存修改":"儲存待辦事項";if(state.queued){state.queued=false;setTimeout(()=>load(true),250);}}
  }
  async function toggle(id,input){
    if(state.writing){input.checked=!input.checked;return;}
    const t=state.tasks.find(x=>x.id===id);if(!t){input.checked=!input.checked;return;}
    const newValue=input.checked;input.disabled=true;state.writing=true;
    try{const {error}=await state.db.from("todo_tasks").update({is_done:newValue}).eq("id",id).eq("trip_id",state.trip.id);if(error)throw error;await loadAfterWrite();notify(newValue?"已標記完成，所有人都會看到。":"已移回待完成清單。",true);}
    catch(e){input.checked=!newValue;notify("更新失敗："+(e?.message||String(e)));}
    finally{state.writing=false;input.disabled=false;if(state.queued){state.queued=false;setTimeout(()=>load(true),250);}}
  }
  async function remove(id){
    const t=state.tasks.find(x=>x.id===id);if(!t||state.writing)return;
    if(!window.confirm("確定刪除「"+t.title+"」？所有旅伴的清單都會移除這件事。"))return;
    state.writing=true;
    try{const {error}=await state.db.from("todo_tasks").delete().eq("id",id).eq("trip_id",state.trip.id);if(error)throw error;await loadAfterWrite();notify("待辦事項已刪除。",true);}
    catch(e){notify("刪除失敗："+(e?.message||String(e)));}
    finally{state.writing=false;if(state.queued){state.queued=false;setTimeout(()=>load(true),250);}}
  }
  // Writes are complete before refreshing. Avoid a polling request racing a database change.
  async function loadAfterWrite(){state.writing=false;try{await load(true);}finally{state.writing=true;}}
  function attach(){
    ["add-task","add-task-hero"].forEach(id=>$(id).addEventListener("click",()=>openModal()));
    $("refresh-tasks").addEventListener("click",()=>load());
    ["close-task","cancel-task"].forEach(id=>$(id).addEventListener("click",closeModal));
    $("task-modal").addEventListener("click",e=>{if(e.target===$("task-modal"))closeModal();});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("task-modal").hidden)closeModal();});
    $("task-form").addEventListener("submit",save);
    document.querySelectorAll("[data-status]").forEach(button=>button.addEventListener("click",()=>{state.status=button.dataset.status;render();}));
    ["filter-assignee","filter-priority"].forEach(id=>$(id).addEventListener("change",render));
    $("search-tasks").addEventListener("input",render);
    $("todo-list").addEventListener("change",e=>{if(e.target.matches("[data-complete]"))toggle(e.target.dataset.complete,e.target);});
    $("todo-list").addEventListener("click",e=>{const edit=e.target.closest("[data-edit]");if(edit)openModal(edit.dataset.edit);const del=e.target.closest("[data-delete]");if(del)remove(del.dataset.delete);});
    document.addEventListener("visibilitychange",()=>{if(!document.hidden)load(true);});
    window.addEventListener("online",()=>load(true));
  }
  async function init(){
    attach();if(!window.supabase?.createClient){status(false,"資料庫連線套件載入失敗");notify("無法連線至雲端，請確認網路後重新整理。");return;}
    state.db=window.supabase.createClient(URL,KEY,{auth:{persistSession:false}});
    await load();
    state.channel=state.db.channel("busan-todo-changes").on("postgres_changes",{event:"UPDATE",schema:"public",table:"todo_sync",filter:"trip_slug=eq.busan-2026"},()=>load(true)).subscribe(channelStatus=>{if(channelStatus==="CHANNEL_ERROR"||channelStatus==="TIMED_OUT")status(false,"即時通知暫時中斷，仍會每 20 秒同步");});
    window.setInterval(()=>load(true),20000);
  }
  init();
})();