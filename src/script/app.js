// import azanPage from '../views/azan.html';
// import quranPage from '../views/quran.html';
// import prayerPage from '../views/prayer.html';
const servicesList = document.querySelector("#servicesList");

servicesList.addEventListener("click",evt => {
    const targetElem = evt.target;
    if(targetElem.matches("[data-page]")){
        goToPage(targetElem.querySelector("#pageLink").href);
    }
});


function goToPage(page){
    window.location.href = page
}