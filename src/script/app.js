// import azanPage from '../views/azan.html';
// import quranPage from '../views/quran.html';
// import prayerPage from '../views/prayer.html';
const servicesList = document.querySelector("#servicesList");
const PAGES = {
    "azan":azanPage,
    "prayer":prayerPage,
    "quran":quranPage
}
servicesList.addEventListener("click",evt => {
    console.log("click");
    const targetElem = evt.target;
    if(targetElem.matches("[data-page]")){
        goToPage(targetElem.dataset.page);
    }
});


function goToPage(page){
    window.location.href = PAGES[page]
}