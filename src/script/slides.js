import KabahImage from "../images/kabah.jpg";
import alAqsoImage from "../images/alAqso.jpg";
import prayerImage from "../images/prayer.jpeg";


const slides = [
    {
        content:"Albatta, namoz mo'minlarga vaqtida farz qilingandir",
        ayah:"Niso surasi 103-oyat",
        imageUrl:prayerImage
    },
    {
        content:"O'z bandasini kechasi Masjidul Haromdan atrofini barakali qilganimiz Masjidul Aqsoga mo'jizalarimizni ko'rsatish uchun sayr qildirgan Zot pokdir. Albatta, U o'ta eshituvchidir, ko'rib turuvchidir",
        ayah:"Isro sura'si 1-oyat",
        imageUrl:alAqsoImage

    },
    {
        content:`Esla, vaqtiki, Ibrohim bilan Ismoil Baytning poydevorlarini ko'tarayotib , (dedilar):"Robbimiz, bizdan qabul et, albatta, Sen O'zing o'ta eshituvchisan va o'ta biluvchisan"`,
        ayah:"Baqara sura'si 143-oyat",
        imageUrl:KabahImage
    }
]


const slideList = document.querySelector("#slideList");
const heroSection = document.querySelector("#hero");
const carouselButtons = document.querySelectorAll("[data-carousel-btn]");


// functions
function renderSlides(slides,slideList){
    const slideTemp = document.querySelector("#slideTemplate").content;
    const slideFragment = new DocumentFragment();
    slides.forEach((slide,index) => {
        const slideTempClone = slideTemp.cloneNode(true).children[0];
        slideTempClone.querySelector("#slideTitle").textContent = slide.content;
        if(slide.content.length > 100) {
            slideTempClone.querySelector("#slideTitle").classList.add("fs-50");
        }
        slideTempClone.querySelector("#slideText").textContent = slide.ayah;
        if(index === 0) slideTempClone.dataset.active = true;
        slideTempClone.dataset.index = index;
        slideFragment.appendChild(slideTempClone);
    });
    slideList.appendChild(slideFragment);
}


// event listeners
carouselButtons.forEach(button => {
    button.addEventListener("click",()=>{
        const slidesWrapper = button.closest("#slidesWrapper");
        const slideElements = slidesWrapper.querySelectorAll("#slideItem");
        const currentSlideIndex = Number(slidesWrapper.querySelector("[data-active]").dataset.index);
        const neededNumberToAdd = button.dataset.carouselBtn === "prev" ? -1 : 1;
        let neededIndex = currentSlideIndex + neededNumberToAdd;
        if(neededIndex < 0) neededIndex = slideElements.length - 1;
        if(neededIndex >= slideElements.length) neededIndex = 0;
        const currentSlideImage = slides[neededIndex].imageUrl;
        heroSection.style.backgroundImage = `url(${currentSlideImage})`;
        slideElements[neededIndex].dataset.active = true;
        delete slideElements[currentSlideIndex].dataset.active;
    });
});

renderSlides(slides,slideList);