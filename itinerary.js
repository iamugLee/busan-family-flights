
(() => {
  const tabs=[...document.querySelectorAll(".itinerary-tab")];
  const panels=[...document.querySelectorAll(".itinerary-panel")];
  const activate=id=>{
    const target=document.getElementById(id);
    if(!target)return;
    tabs.forEach(tab=>{
      const on=tab.dataset.target===id;
      tab.classList.toggle("active",on);
      tab.setAttribute("aria-selected",on?"true":"false");
    });
    panels.forEach(panel=>panel.hidden=panel!==target);
    history.replaceState(null,"","#"+id);
    window.scrollTo({top:document.querySelector(".itinerary-toolbar").offsetTop-90,behavior:"smooth"});
  };
  tabs.forEach(tab=>tab.addEventListener("click",()=>activate(tab.dataset.target)));
  const hash=location.hash.replace("#","");
  if(hash && document.getElementById(hash)) activate(hash);

  document.querySelectorAll(".itin-gallery").forEach(g=>{
    const view=g.querySelector(".itin-gallery-view");
    const slides=[...g.querySelectorAll(".itin-gallery-item")];
    const prev=g.querySelector("[data-prev]");
    const next=g.querySelector("[data-next]");
    const count=g.querySelector(".itin-gallery-count");
    const index=()=>Math.max(0,Math.min(slides.length-1,Math.round(view.scrollLeft/Math.max(1,view.clientWidth))));
    const update=()=>{
      const i=index();
      count.textContent=String(i+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
      prev.disabled=i===0; next.disabled=i===slides.length-1;
    };
    const go=d=>view.scrollTo({left:Math.max(0,Math.min(slides.length-1,index()+d))*view.clientWidth,behavior:"smooth"});
    prev.addEventListener("click",()=>go(-1));
    next.addEventListener("click",()=>go(1));
    view.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    update();
  });
})();
