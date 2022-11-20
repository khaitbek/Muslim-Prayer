const a=document.querySelector("#servicesList"),e={azan:azanPage,prayer:prayerPage,quran:quranPage};a.addEventListener("click",(a=>{console.log("click");const t=a.target;var r;t.matches("[data-page]")&&(r=t.dataset.page,window.location.href=e[r])}));
//# sourceMappingURL=index.cd47292f.js.map
