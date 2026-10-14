
(() => {
  const IMG={
    gwangalli:"https://commons.wikimedia.org/wiki/Special:FilePath/Gwangalli%20Beach%20and%20Gwangan%20Bridge%20Busan.jpg?width=900",
    gwangalliNight:"https://commons.wikimedia.org/wiki/Special:FilePath/Gwangan%20Bridge%20at%20night.JPG?width=900",
    haeundae:"https://commons.wikimedia.org/wiki/Special:FilePath/Haeundae%20Beach%20Busan%20(31877275098).jpg?width=900",
    centum:"https://commons.wikimedia.org/wiki/Special:FilePath/Centum%20City%2C%20Busan.jpg?width=900",
    nampo:"https://commons.wikimedia.org/wiki/Special:FilePath/Nampo-dong.jpg?width=900",
    market:"https://commons.wikimedia.org/wiki/Special:FilePath/Busan%20international%20market.jpg?width=900",
    songdo:"https://commons.wikimedia.org/wiki/Special:FilePath/Busan%20-%20Songdo%20beach.jpg?width=900",
    huinnyeoul:"https://commons.wikimedia.org/wiki/Special:FilePath/Huinnyeoul%20culture%20village%2C%20Busan%20on%20October%2025th%2C%202019.jpg?width=900",
    seomyeon:"https://commons.wikimedia.org/wiki/Special:FilePath/Seomyeon%20Station%2020200522%20001.jpg?width=900",
    busanStation:"https://commons.wikimedia.org/wiki/Special:FilePath/Busan%20Station%2020200523%20001.jpg?width=900"
  };

  const ROUTES={
    "day-1115":{
      title:"11/15 · 廣安里 Welcome Night",
      points:[
        {order:0,kind:"stay",title:"Ara Gaon｜廣安里住宿",time:"STAY",lat:35.1532,lng:129.1188,note:"前兩晚住宿位於廣安里海灘第一排生活圈。",photo:IMG.gwangalli,naver:"https://map.naver.com/p/search/%EA%B4%91%EC%95%88%EB%A6%AC%ED%95%B4%EC%88%98%EC%9A%95%EC%9E%A5%20%EB%B6%80%EC%82%B0"},
        {order:1,kind:"main",stopIndex:0,title:"金海國際機場｜早到組抵達",time:"06:10",lat:35.1795,lng:128.9382,note:"早到 3 人抵達；08:00 再到 LOTTE 取 STARIA。",naver:"https://map.naver.com/p/search/%EA%B9%80%ED%95%B4%EA%B5%AD%EC%A0%9C%EA%B3%B5%ED%95%AD"},
        {order:2,kind:"main",stopIndex:1,title:"LOTTE rent-a-car｜取車",time:"08:00",lat:35.1797,lng:128.9387,note:"金海機場國內線航廈取 STARIA。",naver:"https://map.naver.com/p/search/%EB%A1%AF%EB%8D%B0%EB%A0%8C%ED%84%B0%EC%B9%B4%20%EA%B9%80%ED%95%B4%EA%B3%B5%ED%95%AD"},
        {order:3,kind:"food",stopIndex:2,title:"廣安里早餐／早午餐",time:"09:00",lat:35.1550,lng:129.1240,note:"A 水邊最高豬肉湯飯／B 嚴湧帛／C 姊妹湯飯。",photo:IMG.gwangalli,naver:"https://map.naver.com/p/search/%EC%88%98%EB%B3%80%EC%B5%9C%EA%B3%A0%EB%8F%BC%EC%A7%80%EA%B5%AD%EB%B0%A5%20%EB%AF%BC%EB%9D%BD%EB%B3%B8%EC%A0%90%20%EB%B6%80%EC%82%B0"},
        {order:4,kind:"main",stopIndex:3,title:"廣安里海灘／Millac the Market",time:"10:00",lat:35.1543,lng:129.1248,note:"第一天白天不跑遠，住宿周邊散步、補眠。",photo:IMG.gwangalli,naver:"https://map.naver.com/p/search/%EB%B0%80%EB%9D%BD%EB%8D%94%EB%A7%88%EC%BC%93%20%EB%B6%80%EC%82%B0"},
        {order:5,kind:"main",stopIndex:4,title:"金海國際機場｜接高雄組",time:"18:25",lat:35.1793,lng:128.9392,note:"高雄組 4 人抵達後，全員回廣安里。",naver:"https://map.naver.com/p/search/%EA%B9%80%ED%95%B4%EA%B5%AD%EC%A0%9C%EA%B3%B5%ED%95%AD"},
        {order:6,kind:"food",stopIndex:5,title:"廣安里晚餐｜烤肉 3 選 1",time:"20:30",lat:35.1538,lng:129.1194,note:"Gozip／83해치 廣安里店／廣安里烤腸。",photo:IMG.gwangalliNight,naver:"https://naver.me/F9N4V8To"},
        {order:7,kind:"main",stopIndex:6,title:"廣安里海灘・廣安大橋夜景",time:"21:45",lat:35.1531,lng:129.1184,note:"沿海灘短走、看橋景，累了可縮短。",photo:IMG.gwangalliNight,naver:"https://map.naver.com/p/search/%EA%B4%91%EC%95%88%EB%A6%AC%ED%95%B4%EC%88%98%EC%9A%95%EC%9E%A5%20%EB%B6%80%EC%82%B0"},
        {order:8,kind:"main",stopIndex:7,title:"NASUB 나수브",time:"22:15",lat:35.1541,lng:129.1196,note:"第一晚指定酒吧；STARIA 先停回住宿後再步行／叫車。",photo:IMG.gwangalliNight,naver:"https://map.naver.com/p/search/%EB%82%98%EC%88%98%EB%B8%8C%20%EA%B4%91%EC%95%88%EB%A6%AC%20%EB%B6%80%EC%82%B0"}
      ]
    },
    "day-1116":{
      title:"11/16 · 海雲台 → 青沙浦 → Centum",
      points:[
        {order:0,kind:"stay",title:"Ara Gaon｜廣安里住宿",time:"START",lat:35.1532,lng:129.1188,note:"從廣安里往東玩，不往西跑。",photo:IMG.gwangalli,naver:"https://map.naver.com/p/search/%EA%B4%91%EC%95%88%EB%A6%AC%ED%95%B4%EC%88%98%EC%9A%95%EC%9E%A5%20%EB%B6%80%EC%82%B0"},
        {order:1,kind:"food",stopIndex:0,title:"海雲台早餐｜暖胃 3 選 1",time:"08:30",lat:35.1620,lng:129.1587,note:"鮑魚粥／Geodae Gomtang／鱈魚湯。",photo:IMG.haeundae,naver:"https://naver.me/FIfsTBYJ"},
        {order:2,kind:"main",stopIndex:1,title:"BUSAN X the SKY＋海雲台海灘",time:"10:00",lat:35.1593,lng:129.1695,note:"先上觀景台，再走海灘 20–30 分鐘。",photo:IMG.haeundae,naver:"https://map.naver.com/p/search/BUSAN%20X%20the%20SKY%20%EB%B6%80%EC%82%B0"},
        {order:3,kind:"food",stopIndex:2,title:"尾浦小點心｜3 選 1",time:"11:45",lat:35.1597,lng:129.1710,note:"自然島鹽麵包／Milkyshop／Ove One。",photo:IMG.haeundae,naver:"https://naver.me/xrSQSF2f"},
        {order:4,kind:"main",stopIndex:3,title:"尾浦站｜天空膠囊出發",time:"12:45",lat:35.1598,lng:129.1718,note:"七人拆成 4＋3 兩台天空膠囊。",photo:IMG.haeundae,naver:"https://map.naver.com/p/search/%ED%95%B4%EC%9A%B4%EB%8C%80%EB%B8%94%EB%A3%A8%EB%9D%BC%EC%9D%B8%ED%8C%8C%ED%81%AC%20%EB%AF%B8%ED%8F%AC%EC%A0%95%EA%B1%B0%EC%9E%A5%20%EB%B6%80%EC%82%B0"},
        {order:5,kind:"food",stopIndex:4,title:"青沙浦午餐｜烤貝／海鮮",time:"13:30",lat:35.1600,lng:129.1914,note:"노란마후라／동백집／수민이네。",photo:IMG.haeundae,naver:"https://map.naver.com/p/search/%EC%B2%AD%EC%82%AC%ED%8F%AC%20%EB%B6%80%EC%82%B0"},
        {order:6,kind:"main",stopIndex:5,title:"青沙浦＋踏石展望台＋DIART",time:"14:30",lat:35.1628,lng:129.1962,note:"依長輩腳力散步；DIART Coffee 為彈性休息。",photo:IMG.haeundae,naver:"https://naver.me/Gxk1OJez"},
        {order:7,kind:"main",stopIndex:6,title:"青沙浦站｜海岸列車回尾浦",time:"15:30",lat:35.1601,lng:129.1917,note:"回尾浦取 STARIA，再開往 Centum。",photo:IMG.haeundae,naver:"https://map.naver.com/p/search/%ED%95%B4%EC%9A%B4%EB%8C%80%ED%95%B4%EB%B3%80%EC%97%B4%EC%B0%A8%20%EC%B2%AD%EC%82%AC%ED%8F%AC%EC%A0%95%EA%B1%B0%EC%9E%A5%20%EB%B6%80%EC%82%B0"},
        {order:8,kind:"main",stopIndex:7,title:"Wannabe Clinic｜Centum",time:"16:30",lat:35.1689,lng:129.1305,note:"醫美組進診所；非醫美組在新世界／BEXCO 一帶。",photo:IMG.centum,naver:"https://map.naver.com/p/search/%EC%9B%8C%EB%84%88%EB%B9%84%EC%9D%98%EC%9B%90%20%EC%84%BC%ED%85%80%20%EB%B6%80%EC%82%B0"},
        {order:9,kind:"food",stopIndex:8,title:"Centum 晚餐｜3 選 1",time:"19:00",lat:35.1694,lng:129.1290,note:"新世界 Food Hall／水邊最高／Okdoenjang。",photo:IMG.centum,naver:"https://map.naver.com/p/search/%EC%8B%A0%EC%84%B8%EA%B3%84%EB%B0%B1%ED%99%94%EC%A0%90%20%EC%84%BC%ED%85%80%EC%8B%9C%ED%8B%B0%EC%A0%90"}
      ]
    },
    "day-1117":{
      title:"11/17 · 南浦 → 松島",
      points:[
        {order:0,kind:"stay",title:"Ara Gaon｜廣安里住宿",time:"START",lat:35.1532,lng:129.1188,note:"退房後一路往西移動。",photo:IMG.gwangalli,naver:"https://map.naver.com/p/search/%EA%B4%91%EC%95%88%EB%A6%AC%ED%95%B4%EC%88%98%EC%9A%95%EC%9E%A5%20%EB%B6%80%EC%82%B0"},
        {order:1,kind:"main",stopIndex:0,title:"瑞好齋／草梁・釜山站生活圈",time:"09:30",lat:35.1160,lng:129.0418,note:"先處理七人的行李，再開始南浦行程。",photo:IMG.busanStation,naver:"https://map.naver.com/p/search/%EC%B4%88%EB%9F%89%EC%97%AD%20%EB%B6%80%EC%82%B0"},
        {order:2,kind:"main",stopIndex:1,title:"札嘎其 → BIFF → 國際市場 → 富平",time:"11:00",lat:35.0972,lng:129.0295,note:"STARIA 停一次後用走的。",photo:IMG.nampo,naver:"https://map.naver.com/p/search/%EC%9E%90%EA%B0%88%EC%B9%98%EC%8B%9C%EC%9E%A5%20%EB%B6%80%EC%82%B0"},
        {order:3,kind:"food",stopIndex:2,title:"札嘎其午餐｜海鮮 3 選 1",time:"11:30",lat:35.0967,lng:129.0303,note:"韓月生魚片／釜山名物生魚片／미정횟집。",photo:IMG.market,naver:"https://map.naver.com/p/search/%ED%95%9C%EC%9B%94%ED%9A%9F%EC%A7%91%20%EC%9E%90%EA%B0%88%EC%B9%98%20%EB%B6%80%EC%82%B0"},
        {order:4,kind:"food",stopIndex:3,title:"BIFF／富平市場點心",time:"13:30",lat:35.0982,lng:129.0288,note:"種子糖餅／昇基糖餅／韭菜煎餅。",photo:IMG.market,naver:"https://map.naver.com/p/search/BIFF%EA%B4%91%EC%9E%A5%20%EB%B6%80%EC%82%B0"},
        {order:5,kind:"main",stopIndex:4,title:"松島海上纜車",time:"14:45",lat:35.0765,lng:129.0235,note:"搭纜車前往岩南公園／上站。",photo:IMG.songdo,naver:"https://map.naver.com/p/search/%EC%86%A1%EB%8F%84%ED%95%B4%EC%83%81%EC%BC%80%EC%9D%B4%EB%B8%94%EC%B9%B4%20%EB%B6%80%EC%82%B0"},
        {order:6,kind:"main",stopIndex:5,title:"松島龍宮雲橋",time:"15:30",lat:35.0609,lng:129.0174,note:"纜車上站順路走龍宮雲橋。",photo:IMG.songdo,naver:"https://map.naver.com/p/search/%EC%86%A1%EB%8F%84%EC%9A%A9%EA%B6%81%EA%B5%AC%EB%A6%84%EB%8B%A4%EB%A6%AC%20%EB%B6%80%EC%82%B0"},
        {order:7,kind:"main",stopIndex:6,title:"松島纜車回程",time:"16:10",lat:35.0766,lng:129.0237,note:"回松島海灘後依體力短暫散步。",photo:IMG.songdo,naver:"https://map.naver.com/p/search/%EC%86%A1%EB%8F%84%ED%95%B4%EC%83%81%EC%BC%80%EC%9D%B4%EB%B8%94%EC%B9%B4%20%EB%B6%80%EC%82%B0"},
        {order:8,kind:"food",stopIndex:7,title:"南浦晚餐｜豬腳／烤肉",time:"18:30",lat:35.0990,lng:129.0288,note:"Busan Jokbal／漢陽豬腳／味讚王富平店。",photo:IMG.nampo,naver:"https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%A1%B1%EB%B0%9C%20%EB%82%A8%ED%8F%AC%EB%8F%99"}
      ]
    },
    "day-1118":{
      title:"11/18 · 影島 → 西面 → Diamond Bay",
      points:[
        {order:0,kind:"stay",title:"瑞好齋｜草梁／釜山站生活圈",time:"START",lat:35.1160,lng:129.0418,note:"第二間住宿作為今天起點。",photo:IMG.busanStation,naver:"https://map.naver.com/p/search/%EC%B4%88%EB%9F%89%EC%97%AD%20%EB%B6%80%EC%82%B0"},
        {order:1,kind:"main",stopIndex:0,title:"白淺灘文化村",time:"09:30",lat:35.0784,lng:129.0437,note:"只走精華段，不走完整海岸線。",photo:IMG.huinnyeoul,naver:"https://map.naver.com/p/search/%ED%9D%B0%EC%97%AC%EC%9A%B8%EB%AC%B8%ED%99%94%EB%A7%88%EC%9D%84%20%EB%B6%80%EC%82%B0"},
        {order:2,kind:"food",stopIndex:1,title:"影島海景咖啡／輕食",time:"11:00",lat:35.0780,lng:129.0428,note:"Aether／AGE／P.ARK 三選一。",photo:IMG.huinnyeoul,naver:"https://naver.me/5IfzEFVG"},
        {order:3,kind:"main",stopIndex:2,title:"回草梁／釜山站休息",time:"13:30",lat:35.1160,lng:129.0418,note:"整理戰利品、休息，避免一路趕場。",photo:IMG.busanStation,naver:"https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%97%AD"},
        {order:4,kind:"main",stopIndex:3,title:"西面百貨・地下街・田浦",time:"15:00",lat:35.1570,lng:129.0560,note:"下午回市中心自由逛。",photo:IMG.seomyeon,naver:"https://map.naver.com/p/search/%EB%A1%AF%EB%8D%B0%EB%B0%B1%ED%99%94%EC%A0%90%20%EB%B6%80%EC%82%B0%EB%B3%B8%EC%A0%90"},
        {order:5,kind:"food",stopIndex:4,title:"西面晚餐｜烤肉／烤腸",time:"17:15",lat:35.1568,lng:129.0555,note:"味讚王／설야멱／청춘소곱창。",photo:IMG.seomyeon,naver:"https://naver.me/GL8JyYBm"},
        {order:6,kind:"main",stopIndex:5,title:"前往龍湖灣・Diamond Bay 報到",time:"18:20",lat:35.1300,lng:129.1200,note:"目標約 19:00 前抵達碼頭。",photo:IMG.gwangalliNight,naver:"https://map.naver.com/p/search/%EB%8B%A4%EC%9D%B4%EC%95%84%EB%AA%AC%EB%93%9C%EB%B2%A0%EC%9D%B4%20%EB%B6%80%EC%82%B0"},
        {order:7,kind:"main",stopIndex:6,title:"Diamond Bay 鑽石灣遊艇",time:"19:30",lat:35.1302,lng:129.1204,note:"暫排夜航，作為這趟主要夜景體驗。",photo:IMG.gwangalliNight,naver:"https://map.naver.com/p/search/%EB%8B%A4%EC%9D%B4%EC%95%84%EB%AA%AC%EB%93%9C%EB%B2%A0%EC%9D%B4%20%EB%B6%80%EC%82%B0"},
        {order:8,kind:"optional",stopIndex:7,title:"荒嶺山觀景台",time:"20:45",lat:35.1574,lng:129.0827,note:"天氣好、長輩還有精神才加碼。",photo:IMG.gwangalliNight,naver:"https://map.naver.com/p/search/%ED%99%A9%EB%A0%B9%EC%82%B0%20%EC%A0%84%EB%A7%9D%EB%8C%80%20%EB%B6%80%EC%82%B0"}
      ]
    },
    "day-1119":{
      title:"11/19 · 草梁 → 金海機場",
      points:[
        {order:0,kind:"stay",title:"瑞好齋｜草梁／釜山站生活圈",time:"START",lat:35.1160,lng:129.0418,note:"最後半天留在住宿附近。",photo:IMG.busanStation,naver:"https://map.naver.com/p/search/%EC%B4%88%EB%9F%89%EC%97%AD%20%EB%B6%80%EC%82%B0"},
        {order:1,kind:"main",stopIndex:0,title:"草梁／釜山站自由活動",time:"09:30",lat:35.1152,lng:129.0414,note:"整理行李、最後採買，不新增遠距景點。",photo:IMG.busanStation,naver:"https://map.naver.com/p/search/%EB%B6%80%EC%82%B0%EC%97%AD"},
        {order:2,kind:"food",stopIndex:1,title:"最後一餐｜釜山站 3 選 1",time:"12:30",lat:35.1150,lng:129.0402,note:"本錢豬肉湯飯／草梁小麥冷麵／新發園。",photo:IMG.busanStation,naver:"https://map.naver.com/p/search/%EB%B3%B8%EC%A0%84%EB%8F%BC%EC%A7%80%EA%B5%AD%EB%B0%A5%20%EB%B6%80%EC%82%B0%EC%97%AD"},
        {order:3,kind:"main",stopIndex:2,title:"出發往金海機場",time:"14:15",lat:35.1795,lng:128.9382,note:"預留七人整理行李與還車緩衝。",naver:"https://map.naver.com/p/search/%EB%A1%AF%EB%8D%B0%EB%A0%8C%ED%84%B0%EC%B9%B4%20%EA%B9%80%ED%95%B4%EA%B3%B5%ED%95%AD"},
        {order:4,kind:"main",stopIndex:3,title:"LOTTE rent-a-car｜還 STARIA",time:"16:00",lat:35.1797,lng:128.9388,note:"完成還車後前往國際線航廈。",naver:"https://map.naver.com/p/search/%EB%A1%AF%EB%8D%B0%EB%A0%8C%ED%84%B0%EC%B9%B4%20%EA%B9%80%ED%95%B4%EA%B3%B5%ED%95%AD"}
      ]
    }
  };

  const syncDayHeroHeight=()=>{
    const container=document.querySelector(".site-container");
    const toolbar=document.querySelector(".itinerary-toolbar");
    const referencePanel=document.getElementById("day-1116");
    const referenceCopy=referencePanel?.querySelector(".day-hero-copy");
    if(!container||!toolbar||!referencePanel||!referenceCopy)return;

    if(window.matchMedia("(max-width:850px)").matches){
      container.style.removeProperty("--day-hero-reference-height");
      return;
    }

    const wasHidden=referencePanel.hidden;
    const previousStyle=referencePanel.getAttribute("style");
    container.style.removeProperty("--day-hero-reference-height");

    if(wasHidden){
      referencePanel.hidden=false;
      referencePanel.style.position="absolute";
      referencePanel.style.visibility="hidden";
      referencePanel.style.pointerEvents="none";
      referencePanel.style.left="-99999px";
      referencePanel.style.top="0";
      referencePanel.style.width=toolbar.getBoundingClientRect().width+"px";
      referencePanel.style.zIndex="-1";
    }

    const height=Math.ceil(referenceCopy.getBoundingClientRect().height);
    if(height>0)container.style.setProperty("--day-hero-reference-height",height+"px");

    if(wasHidden){
      referencePanel.hidden=true;
      if(previousStyle===null)referencePanel.removeAttribute("style");
      else referencePanel.setAttribute("style",previousStyle);
    }
  };

  const tabs=[...document.querySelectorAll(".itinerary-tab")];
  const panels=[...document.querySelectorAll(".itinerary-panel")];
  const maps={};

  const haversine=(a,b)=>{
    const R=6371,toRad=d=>d*Math.PI/180;
    const dLat=toRad(b.lat-a.lat),dLon=toRad(b.lng-a.lng);
    const x=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLon/2)**2;
    return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
  };
  const fmtKm=km=>km<1?Math.round(km*1000)+" m":km.toFixed(km<10?1:0)+" km";

  const iconFor=(point)=>{
    const label=point.kind==="stay"?"⌂":String(point.order);
    return L.divIcon({
      className:"busan-div-icon",
      html:'<div class="busan-map-marker '+point.kind+'">'+label+"</div>",
      iconSize:[30,30],iconAnchor:[15,15],popupAnchor:[0,-13]
    });
  };

  const popupHtml=(point,prev)=>{
    const distance=prev?haversine(prev,point):null;
    return '<div class="map-popup">'+
      (point.photo?'<img src="'+point.photo+'" alt="" loading="lazy">':"")+
      '<div class="map-popup-body">'+
      '<div class="map-popup-meta"><span>'+point.time+'</span><span>'+(
        point.kind==="food"?"餐飲":point.kind==="optional"?"OPTIONAL":point.kind==="stay"?"住宿":"行程"
      )+'</span></div>'+
      '<h4>'+point.title+'</h4>'+
      '<p>'+point.note+'</p>'+
      (distance!==null?'<p class="map-popup-distance">與上一個顯示點直線約 '+fmtKm(distance)+'</p>':"")+
      '<div class="map-popup-actions">'+
      '<a href="'+point.naver+'" target="_blank" rel="noopener noreferrer">NAVER MAP ↗</a>'+
      (Number.isInteger(point.stopIndex)?'<button type="button" data-scroll-stop="'+point.stopIndex+'">回到行程卡</button>':"")+
      '</div></div></div>';
  };

  const setupMap=(panel)=>{
    const id=panel.id,route=ROUTES[id];
    if(!route)return;
    const timeline=panel.querySelector(".itinerary-timeline");
    if(!timeline)return;

    const explorer=document.createElement("div");
    explorer.className="day-explorer";
    timeline.parentNode.insertBefore(explorer,timeline);
    explorer.appendChild(timeline);

    const mapPanel=document.createElement("aside");
    mapPanel.className="itinerary-map-panel";
    mapPanel.innerHTML=
      '<div class="itinerary-map-head"><div><small>ROUTE AT A GLANCE</small><h3>'+route.title+'</h3><p>點左邊行程卡或地圖編號即可連動；線段只表示行程順序與相對位置，不是實際道路導航。</p></div><button class="map-collapse-btn" type="button" aria-expanded="true">收合地圖</button></div>'+
      '<div class="map-layer-toolbar"><span class="map-layer-label">主行程＋住宿</span><button type="button" class="map-layer-toggle" data-layer="food" aria-pressed="true">餐飲點</button><button type="button" class="map-layer-toggle" data-layer="optional" aria-pressed="false">Optional</button><button type="button" class="map-reset-btn">顯示整天</button></div>'+
      '<div class="itinerary-map" id="map-'+id+'" aria-label="'+route.title+'互動地圖"></div>'+
      '<div class="itinerary-map-note">內嵌底圖使用 OpenStreetMap 顯示相對位置；店家資訊與實際導航仍以每個點的 NAVER MAP 為準。距離為地圖座標直線距離，不是實際行車公里數。</div>';
    explorer.appendChild(mapPanel);

    const cards=[...timeline.querySelectorAll(".itinerary-stop")];
    route.points.forEach(point=>{
      if(!Number.isInteger(point.stopIndex)||!cards[point.stopIndex])return;
      const card=cards[point.stopIndex];
      card.dataset.mapLinked=String(point.order);
      let actions=card.querySelector(".stop-actions");
      if(!actions){actions=document.createElement("div");actions.className="stop-actions";card.querySelector(".stop-body").appendChild(actions);}
      if(!actions.querySelector(".map-focus-btn")){
        const btn=document.createElement("button");
        btn.type="button";btn.className="map-focus-btn";
        btn.textContent="📍 在地圖顯示";
        btn.addEventListener("click",e=>{e.stopPropagation();focusPoint(id,point.order,true);});
        actions.appendChild(btn);
      }
      card.addEventListener("click",e=>{
        if(e.target.closest("a,button"))return;
        focusPoint(id,point.order,false);
      });
    });

    const collapse=mapPanel.querySelector(".map-collapse-btn");
    collapse.addEventListener("click",()=>{
      const collapsed=mapPanel.classList.toggle("is-collapsed");
      collapse.setAttribute("aria-expanded",collapsed?"false":"true");
      collapse.textContent=collapsed?"展開地圖":"收合地圖";
      if(!collapsed&&maps[id])setTimeout(()=>maps[id].map.invalidateSize(),80);
    });

    if(typeof L==="undefined"){
      mapPanel.querySelector(".itinerary-map").innerHTML='<div class="map-load-error"><strong>互動地圖元件沒有載入成功</strong><br>可能是瀏覽器或網路擋住地圖資源。行程中的 NAVER MAP 連結仍可使用。<br><button type="button" class="map-retry-inline">重新載入地圖</button></div>';
      mapPanel.querySelector(".map-retry-inline")?.addEventListener("click",()=>location.reload());
      return;
    }

    const mapEl=mapPanel.querySelector(".itinerary-map");
    mapEl.classList.add("is-loading");
    const map=L.map("map-"+id,{zoomControl:true,scrollWheelZoom:false,preferCanvas:true});

    let tileLayer=null;
    let tileErrors=0;
    let switchedTiles=false;
    const osm=()=>L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
      maxZoom:19,
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    });
    const carto=()=>L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{
      maxZoom:19,
      subdomains:"abcd",
      attribution:'&copy; OpenStreetMap &copy; CARTO'
    });
    const attachTiles=(layer,isFallback=false)=>{
      tileLayer=layer.addTo(map);
      tileLayer.once("load",()=>{
        mapEl.classList.remove("is-loading","is-tile-error");
        const msg=mapPanel.querySelector(".map-runtime-status");
        if(msg)msg.remove();
      });
      tileLayer.on("tileerror",()=>{
        tileErrors++;
        if(tileErrors>=3&&!switchedTiles&&!isFallback){
          switchedTiles=true;
          try{map.removeLayer(tileLayer);}catch(e){}
          attachTiles(carto(),true);
        }else if(tileErrors>=8&&isFallback){
          mapEl.classList.add("is-tile-error");
          showRuntimeError("底圖暫時無法載入，但行程點與相對位置仍可使用。");
        }
      });
    };
    const showRuntimeError=(message)=>{
      let box=mapPanel.querySelector(".map-runtime-status");
      if(!box){
        box=document.createElement("div");
        box.className="map-runtime-status";
        box.innerHTML='<span></span><button type="button">重新載入地圖</button>';
        mapPanel.appendChild(box);
        box.querySelector("button").addEventListener("click",()=>location.reload());
      }
      box.querySelector("span").textContent=message;
    };
    attachTiles(osm());

    const state={map,markers:new Map(),line:null,visible:{food:true,optional:false},route,mapPanel,cards};
    maps[id]=state;

    const render=()=>{
      state.markers.forEach(m=>map.removeLayer(m));
      state.markers.clear();
      if(state.line){map.removeLayer(state.line);state.line=null;}
      const visible=route.points.filter(p=>p.kind!=="optional"||state.visible.optional).filter(p=>p.kind!=="food"||state.visible.food);
      const routeVisible=visible.filter(p=>p.kind!=="optional").sort((a,b)=>a.order-b.order);
      const latlngs=routeVisible.map(p=>[p.lat,p.lng]);
      if(latlngs.length>1){
        state.line=L.polyline(latlngs,{color:"#6f8fa0",weight:3,opacity:.72,dashArray:"9 7"}).addTo(map);
      }
      visible.forEach(point=>{
        const prev=routeVisible.filter(p=>p.order<point.order).slice(-1)[0]||null;
        const marker=L.marker([point.lat,point.lng],{icon:iconFor(point),zIndexOffset:point.kind==="stay"?150:0}).addTo(map);
        marker.bindPopup(popupHtml(point,prev),{maxWidth:280});
        marker.on("click",()=>{
          highlightCard(id,point.stopIndex);
          setTimeout(()=>{
            const popup=marker.getPopup()?.getElement();
            const btn=popup?.querySelector("[data-scroll-stop]");
            if(btn)btn.addEventListener("click",()=>scrollToCard(id,Number(btn.dataset.scrollStop)),{once:true});
          },0);
        });
        state.markers.set(point.order,marker);
      });
      fitDay(id);
    };

    mapPanel.querySelectorAll(".map-layer-toggle").forEach(btn=>{
      btn.addEventListener("click",()=>{
        const key=btn.dataset.layer;
        state.visible[key]=!state.visible[key];
        btn.setAttribute("aria-pressed",state.visible[key]?"true":"false");
        render();
      });
    });
    mapPanel.querySelector(".map-reset-btn").addEventListener("click",()=>fitDay(id));
    render();
  };

  const fitDay=(id)=>{
    const state=maps[id]; if(!state)return;
    const pts=[...state.markers.values()].map(m=>m.getLatLng());
    if(!pts.length)return;
    state.map.fitBounds(L.latLngBounds(pts),{padding:[26,26],maxZoom:14});
  };

  const highlightCard=(id,stopIndex)=>{
    const state=maps[id]; if(!state)return;
    state.cards.forEach(c=>c.classList.remove("map-active"));
    if(Number.isInteger(stopIndex)&&state.cards[stopIndex])state.cards[stopIndex].classList.add("map-active");
  };

  const scrollToCard=(id,stopIndex)=>{
    const state=maps[id]; if(!state||!state.cards[stopIndex])return;
    const card=state.cards[stopIndex];
    highlightCard(id,stopIndex);
    card.scrollIntoView({behavior:"smooth",block:"center"});
  };

  const focusPoint=(id,order,scrollMap)=>{
    const state=maps[id]; if(!state)return;
    let point=state.route.points.find(p=>p.order===order);
    if(!point)return;
    if(point.kind==="food"&&!state.visible.food){
      const btn=state.mapPanel.querySelector('[data-layer="food"]');
      if(btn)btn.click();
    }
    if(point.kind==="optional"&&!state.visible.optional){
      const btn=state.mapPanel.querySelector('[data-layer="optional"]');
      if(btn){btn.click();}
    }
    const marker=state.markers.get(order);
    if(!marker)return;
    state.map.flyTo(marker.getLatLng(),Math.max(state.map.getZoom(),15),{duration:.55});
    marker.openPopup();
    highlightCard(id,point.stopIndex);
    if(scrollMap&&window.matchMedia("(max-width:850px)").matches){
      state.mapPanel.scrollIntoView({behavior:"smooth",block:"start"});
    }
  };

  panels.forEach(setupMap);

  syncDayHeroHeight();
  if(document.fonts?.ready)document.fonts.ready.then(syncDayHeroHeight);
  window.addEventListener("load",syncDayHeroHeight,{once:true});
  let heroResizeTimer;
  window.addEventListener("resize",()=>{
    clearTimeout(heroResizeTimer);
    heroResizeTimer=setTimeout(syncDayHeroHeight,120);
  });

  const activate=(id,scroll=true,updateUrl=true)=>{
    const target=document.getElementById(id);
    if(!target)return;
    tabs.forEach(tab=>{
      const on=tab.dataset.target===id;
      tab.classList.toggle("active",on);
      tab.setAttribute("aria-selected",on?"true":"false");
    });
    panels.forEach(panel=>panel.hidden=panel!==target);

    if(updateUrl){
      const url=new URL(location.href);
      url.hash="";
      if(id==="trip-overview")url.searchParams.delete("tab");
      else url.searchParams.set("tab",id);
      history.replaceState(null,"",url.pathname+(url.search?url.search:""));
    }

    setTimeout(()=>{if(maps[id]){maps[id].map.invalidateSize();fitDay(id);}},80);
    if(scroll)window.scrollTo({top:document.querySelector(".itinerary-toolbar").offsetTop-90,behavior:"smooth"});
  };

  tabs.forEach(tab=>tab.addEventListener("click",()=>activate(tab.dataset.target)));
  document.querySelectorAll("[data-open-day]").forEach(card=>{
    card.addEventListener("click",()=>activate(card.dataset.openDay));
  });

  // Never use URL hash for itinerary tabs: hash anchors can make some browsers
  // auto-scroll again after images/fonts finish loading.
  const url=new URL(location.href);
  let initialTab=url.searchParams.get("tab");
  const legacyHash=location.hash.replace("#","");
  if(!initialTab&&legacyHash&&document.getElementById(legacyHash))initialTab=legacyHash;
  if(!initialTab||!document.getElementById(initialTab))initialTab="trip-overview";

  url.hash="";
  if(initialTab==="trip-overview")url.searchParams.delete("tab");
  else url.searchParams.set("tab",initialTab);
  history.replaceState(null,"",url.pathname+(url.search?url.search:""));

  activate(initialTab,false,false);

  // Belt-and-suspenders protection against browser history/anchor restoration.
  const forceTop=()=>window.scrollTo({top:0,left:0,behavior:"auto"});
  forceTop();
  requestAnimationFrame(forceTop);
  setTimeout(forceTop,0);
  setTimeout(forceTop,80);
  window.addEventListener("load",forceTop,{once:true});

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
    window.addEventListener("resize",()=>{
      update();
      Object.values(maps).forEach(s=>s.map.invalidateSize());
    });
    update();
  });
})();
