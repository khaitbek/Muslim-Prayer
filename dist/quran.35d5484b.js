async function e(e,t={}){const a=Object.entries(t).map((e=>`${e[0]}=${e[1]}`)).join("&");return fetch(`${e}?${a}`)}const t=document.querySelector("#verseList"),a=document.querySelector("#surahList"),o=document.querySelector("#verseTemplate").content,n=document.querySelector("#surahTemplate").content,i=document.querySelector("#closeSidebarBtn"),r=document.querySelector("#sidebar"),s=document.querySelector("#videosList"),d=document.querySelector("#videosTemplate").content,u=document.querySelector("#videoSelect"),c=(document.querySelector("#servicesList"),[{link:"https://www.youtube.com/embed/EYPC8k-6YsI",author:"Nizomiddin Shoshiy",title:"Nizomiddin qori Qur'on musobaqasi g'olibi"},{link:"https://www.youtube.com/embed/YDpR42jeUXE",author:"Nizomiddin Shoshiy",title:"Nizomiddin qori Isro su'rasi"},{link:"https://www.youtube.com/embed/KH-WPAzHP-g",author:"Nizomiddin Shoshiy",title:"Nizomiddin qori bir oyatni 8 xil maqomda o'qidi!"},{link:"https://www.youtube.com/embed/jNCvp01AumQ",author:"Shayx Alijon qori",title:"Shayx Alijon qoridan go'zal tilovat"},{link:"https://www.youtube.com/embed/QZoR9AYNN54",author:"Shayx Alijon qori",title:"Qalblar sohibini eslatgan tilovat"},{link:"https://www.youtube.com/embed/saF4Lg4zHZU",author:"Shayx Alijon qori",title:"Fotiha surasi va Baqara surasi 1-5-oyatlar"},{link:"https://www.youtube.com/embed/Lql37um7VSs",author:"Hasanxon Yahyo Abdulmajid",title:"Fotiha surasi 6 xil maqomda o'qilishi"},{link:"https://www.youtube.com/embed/OH5iLyQesXw",author:"Hasanxon Yahyo Abdulmajid",title:"Qur'onning kelinchagi bo'lmish Rohman surasi!"},{link:"https://www.youtube.com/embed/mRaqkxNLRhk",author:"Hasanxon Yahyo Abdulmajid",title:"Hasanxon Yahyo Abdulmajid - “Baqara” surasi, 1-25 oyatlar"}]);let l;async function m(t,a,o){const n=await e(`${t}`,o);return await n.json()}function h(e,t,a){const o=new DocumentFragment;t.innerHTML="";r.querySelector("#surahName").textContent=a,e.forEach((e=>{const{number:t,numberInSurah:a,audio:i,text:r}=e,s=n.cloneNode(!0).children[0];s.querySelector("#ayah").textContent=`${a}. ${r}`,s.querySelector("audio").src=i,s.dataset.number=t,o.appendChild(s)})),t.appendChild(o)}function y(e){const t=window.localStorage.getItem("audioId");if(t&&t!==e){const e=a.querySelector(`[data-number="${t}"]`),o=e.querySelector("audio");e.classList.remove("playing"),o.currentTime=0,o.pause()}}function p(){const e=document.querySelector(`[data-number="${l}"]`),t=e.querySelector("#surahAudio");if(!e)return;const a=e.querySelector("audio");y(e.dataset.number),e.classList.add("playing"),a.paused?(t.textContent="Pause",a.play()):(a.pause(),e.classList.add("playing")),window.localStorage.setItem("audioId",e.dataset.number),l++,a.addEventListener("ended",(()=>{t.textContent="Play",e.classList.remove("playing"),p()}),{once:!0}),a.addEventListener("pause",(()=>{t.textContent="Play",a.currentTime=0}),{once:!0})}function w(e,t){t.innerHTML="";const a=new DocumentFragment;e.forEach((e=>{const{link:t,author:o,title:n}=e,i=d.cloneNode(!0).children[0];i.querySelector("iframe").src=t,i.dataset.author=o,a.appendChild(i)})),t.appendChild(a)}window.localStorage.removeItem("audioId"),t.addEventListener("click",(async e=>{const t=e.target;if(t.matches("#openSidebarBtn")){window.localStorage.removeItem("audioId");const e=t.closest("#verseItem"),o=Number(e.dataset.id),n=await m(`https://api.alquran.cloud/v1/surah/${o}/editions/ar.alafasy,en.asad,ur.jalandhry?limit=1`);h(n.data[0].ayahs,a,n.data[0].englishName),r.classList.add("show")}})),r.addEventListener("click",(e=>{const t=e.target;if(t.matches("#surahAudio")){const e=t.parentElement;y(e.dataset.number),l=e.dataset.number,window.localStorage.removeItem("audioId"),p()}})),i.addEventListener("click",(()=>{window.localStorage.removeItem("audioId"),r.classList.remove("show")})),u.addEventListener("change",(e=>{var t,a;t=c,a=e.target.value,w(t.filter((e=>""===a|e.author===a)),s)})),async function(){const e=await m("https://api.alquran.cloud/v1/surah/1/editions/ar.alafasy,en.asad,ur.jalandhry?limit=1");h(e.data[0].ayahs,a,e.data[0].englishName)}(),async function(a,n={}){const i=await e(`${a}`,n);!function(e,a){const n=new DocumentFragment;a.innerHTML="",e.forEach((e=>{const t=o.cloneNode(!0).children[0],{verses_count:a,name_simple:i,id:r,revelation_place:s}=e;t.dataset.id=r,t.querySelector("#verseName").textContent=i,t.querySelector("#verseRevelationPlace").textContent=s,t.querySelector("#versesAyahs").textContent=a,n.appendChild(t)})),t.appendChild(n)}((await i.json()).chapters,t)}("https://api.quran.com/api/v3/chapters"),w(c.slice(0,1),s),function(e,t){const a=new Set;e.forEach((e=>a.add(e.author)));const o=new DocumentFragment;a.forEach((e=>{const t=document.createElement("option");t.value=e,t.textContent=e,o.appendChild(t)})),t.appendChild(o)}(c,u);
//# sourceMappingURL=quran.35d5484b.js.map
