const cats=["Happy","Sad","Romantic","Energetic"];
let user={favorites:[],recent:[]};
function httpGET(url){return fetch(url).then(r=>r.json());}
function httpPOST(url, body){return fetch(url, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(r=>r.json());}
function renderCats(){
  const cdiv=document.getElementById('cats');
  cats.forEach(cat=>{
    let img=document.createElement('img');
    img.src=`img/${cat.toLowerCase()}.jpg`;
    img.onclick=()=>loadSongs(cat);
    img.title=cat;
    cdiv.appendChild(img);
  });
}
function loadSongs(cat,q){
  httpGET(`/songs?cat=${cat}&q=${q||''}`).then(list=>{
    const sdiv=document.getElementById('songs'); sdiv.innerHTML='';
    list.forEach(s=>{
      let card=document.createElement('div');card.className='song-card';
      card.innerHTML=`
        <img src="${s.img}">
        <div>${s.title}</div>
      `;
      let btn=document.createElement('button');
      btn.className=`btn ${user.favorites.includes(s.id)?'unfav':'fav'}`;
      btn.textContent = user.favorites.includes(s.id)?'Unfav':'Fav';
      btn.onclick=e=>{
        e.stopPropagation();
        const act=user.favorites.includes(s.id)?'unfav':'fav';
        httpPOST('/user',{action:act,id:s.id}).then(u=>{
          user=u; renderUI();
          btn.className=`btn ${act==='fav'?'unfav':'fav'}`;
          btn.textContent = act==='fav'?'Unfav':'Fav';
        });
      };
      card.appendChild(btn);
      card.onclick=()=>{
        httpPOST('/user',{action:'recent',id:s.id}).then(u=>{user=u; renderRecent();});
        new Audio(s.url).play();
      };
      sdiv.appendChild(card);
    });
  });
}
function renderUI(){
  httpGET('/user').then(u=>{user=u; renderFavs(); renderRecent();});
}
function renderFavs(){
  const div=document.getElementById('favs'); div.innerHTML='';
  user.favorites.forEach(id=>{
    httpGET(`/songs?id=${id}`).then(list=>{
      const s=list[0];
      let d=document.createElement('div'); d.textContent=s.title; div.appendChild(d);
    });
  });
}
function renderRecent(){
  const div=document.getElementById('recent'); div.innerHTML='';
  user.recent.forEach(id=>{
    httpGET(`/songs?id=${id}`).then(list=>{
      const s=list[0];
      let d=document.createElement('div'); d.textContent=s.title; div.appendChild(d);
    });
  });
}
document.getElementById('search').addEventListener('input',e=>loadSongs(document.querySelector('#cats img.selected')?.title||'', e.target.value));
renderCats(); renderUI();
