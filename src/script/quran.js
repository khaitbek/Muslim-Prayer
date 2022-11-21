import { makeRequest } from "./helper.js";
const ayahList = document.querySelector("#verseList");
const surahList = document.querySelector("#surahList");
const verseTemplate = document.querySelector("#verseTemplate").content;
const surahTemplate = document.querySelector("#surahTemplate").content;
const closeSideBarBtn = document.querySelector("#closeSidebarBtn");
const sidebar = document.querySelector("#sidebar");
const videosList = document.querySelector("#videosList");
const videosTemplate = document.querySelector("#videosTemplate").content;
const authorSelect = document.querySelector("#videoSelect");

// global variables
const videos = [
    {
        link:"https://www.youtube.com/embed/EYPC8k-6YsI",
        author:"Nizomiddin Shoshiy",
        title:"Nizomiddin qori Qur'on musobaqasi g'olibi"
    },
    {
        link:"https://www.youtube.com/embed/YDpR42jeUXE",
        author:"Nizomiddin Shoshiy",
        title:"Nizomiddin qori Isro su'rasi"
    },
    {
        link:"https://www.youtube.com/embed/KH-WPAzHP-g",
        author:"Nizomiddin Shoshiy",
        title:"Nizomiddin qori bir oyatni 8 xil maqomda o'qidi!"
    },
    {
        link:"https://www.youtube.com/embed/jNCvp01AumQ",
        author:"Shayx Alijon qori",
        title:"Shayx Alijon qoridan go'zal tilovat"
    },
    {
        link:"https://www.youtube.com/embed/QZoR9AYNN54",
        author:"Shayx Alijon qori",
        title:"Qalblar sohibini eslatgan tilovat" 
    },
    {
        link:"https://www.youtube.com/embed/saF4Lg4zHZU",
        author:"Shayx Alijon qori",
        title:"Fotiha surasi va Baqara surasi 1-5-oyatlar"
    },
    {
        link:"https://www.youtube.com/embed/Lql37um7VSs",
        author:"Hasanxon Yahyo Abdulmajid",
        title:"Fotiha surasi 6 xil maqomda o'qilishi"
    },
    {
        link:"https://www.youtube.com/embed/OH5iLyQesXw",
        author:"Hasanxon Yahyo Abdulmajid",
        title:"Qur'onning kelinchagi bo'lmish Rohman surasi!"
    },
    {
        link:"https://www.youtube.com/embed/mRaqkxNLRhk",
        author:"Hasanxon Yahyo Abdulmajid",
        title:"Hasanxon Yahyo Abdulmajid - “Baqara” surasi, 1-25 oyatlar"
    }
]
let currentAudioID = undefined;
window.localStorage.removeItem("audioId");


// functions
async function getAyahsFromAPI(url, options = {}) {
    const versesData = await makeRequest(`${url}`, options);
    const versesFromAPI = await versesData.json();
    renderAyahs(versesFromAPI.chapters, ayahList);
}

async function getSingleAyah(url, id, options) {
    const ayahData = await makeRequest(`${url}`, options);
    const ayah = await ayahData.json();
    return ayah
}

function renderAyahs(ayahs, ayahsList) {
    const newFragment = new DocumentFragment();
    ayahsList.innerHTML = "";
    ayahs.forEach(ayah => {
        const verseTemplateClone = verseTemplate.cloneNode(true).children[0];
        const { verses_count, name_simple, id, revelation_place } = ayah;
        verseTemplateClone.dataset.id = id;
        verseTemplateClone.querySelector("#verseName").textContent = name_simple;
        verseTemplateClone.querySelector("#verseRevelationPlace").textContent = revelation_place;
        verseTemplateClone.querySelector("#versesAyahs").textContent = verses_count;
        verseTemplateClone
        newFragment.appendChild(verseTemplateClone);
    });
    ayahList.appendChild(newFragment);
}

function renderSurah(ayahs, list,surah) {
    const newFragment = new DocumentFragment();
    list.innerHTML = "";
    const currentSurahName = sidebar.querySelector("#surahName");
    currentSurahName.textContent = surah
    ayahs.forEach(ayah => {
        const { number, numberInSurah, audio, text } = ayah;
        const surahTemplateClone = surahTemplate.cloneNode(true).children[0];
        surahTemplateClone.querySelector("#ayah").textContent = `${numberInSurah}. ${text}`;
        surahTemplateClone.querySelector("audio").src = audio;
        surahTemplateClone.dataset.number = number;
        newFragment.appendChild(surahTemplateClone);
    });
    list.appendChild(newFragment);
}

function checkIfAnyAudioPlaying(currentAudioNumber) {
    const isAnyAudioPlaying = window.localStorage.getItem("audioId");
    if (isAnyAudioPlaying && isAnyAudioPlaying !== currentAudioNumber) {
        const playingItem = surahList.querySelector(`[data-number="${isAnyAudioPlaying}"]`);
        const playingAudio = playingItem.querySelector("audio");
        playingItem.classList.remove("playing")
        playingAudio.currentTime = 0;
        playingAudio.pause();
    };
}

function playNextAudio() {
    const nextSurahItem = document.querySelector(`[data-number="${currentAudioID}"]`);
    const nextSurahButton = nextSurahItem.querySelector("#surahAudio");
    if (!nextSurahItem) return;
    const nextAudio = nextSurahItem.querySelector("audio");
    checkIfAnyAudioPlaying(nextSurahItem.dataset.number);
    nextSurahItem.classList.add("playing");
    if (nextAudio.paused) {
        nextSurahButton.textContent = "Pause";
        nextAudio.play();
    }
    else {
        nextAudio.pause();
        nextSurahItem.classList.add("playing");
    }
    window.localStorage.setItem("audioId", nextSurahItem.dataset.number);
    currentAudioID++;
    nextAudio.addEventListener("ended", () => {
        nextSurahButton.textContent = "Play"
        nextSurahItem.classList.remove("playing");
        playNextAudio();
    }, { once: true });
    nextAudio.addEventListener("pause", () => {
        nextSurahButton.textContent = "Play"
        nextAudio.currentTime = 0;
    }, { once: true });
}

async function getFirstAyah() {
    const firstAyah = await getSingleAyah("https://api.alquran.cloud/v1/surah/1/editions/ar.alafasy,en.asad,ur.jalandhry?limit=1");
    renderSurah(firstAyah.data[0].ayahs, surahList,firstAyah.data[0].englishName);
}

function renderVideos(videos,videosList){
    videosList.innerHTML = "";
    const newFragment = new DocumentFragment();
    videos.forEach(video => {
        const {link,author,title} = video;
        const videosTemplateClone = videosTemplate.cloneNode(true).children[0];
        videosTemplateClone.querySelector("iframe").src = link;
        videosTemplateClone.dataset.author = author;
        newFragment.appendChild(videosTemplateClone);
    });
    videosList.appendChild(newFragment);
}

function getAuthors(videos,authorsList){
    const authors = new Set();
    videos.forEach(video => authors.add(video.author));
    const newFragment = new DocumentFragment();
    authors.forEach(author => {
        const newOption = document.createElement("option");
        newOption.value = author;
        newOption.textContent = author;

        newFragment.appendChild(newOption);
    });
    authorsList.appendChild(newFragment);
}

// events
ayahList.addEventListener("click", async (evt) => {
    const targetElem = evt.target;
    if (targetElem.matches("#openSidebarBtn")) {
        window.localStorage.removeItem("audioId");
        const closestSurahElement = targetElem.closest("#verseItem");
        const surahId = Number(closestSurahElement.dataset.id);
        const ayah = await getSingleAyah(`https://api.alquran.cloud/v1/surah/${surahId}/editions/ar.alafasy,en.asad,ur.jalandhry?limit=1`, {});
        renderSurah(ayah.data[0].ayahs, surahList,ayah.data[0].englishName);
        sidebar.classList.add("show");
    }
});

sidebar.addEventListener("click", (evt) => {
    const targetElem = evt.target;
    if (targetElem.matches("#surahAudio")) {
        const parentElement = targetElem.parentElement;
        checkIfAnyAudioPlaying(parentElement.dataset.number)
        currentAudioID = parentElement.dataset.number;
        window.localStorage.removeItem("audioId");
        playNextAudio();
    }
});

closeSideBarBtn.addEventListener("click", () => {
    window.localStorage.removeItem("audioId");
    sidebar.classList.remove("show");
});
authorSelect.addEventListener("change", evt => {
    filterVideosByAuthor(videos,evt.target.value);
})

function filterVideosByAuthor(videos,author){
    const filteredVideos = videos.filter(video => author === "" | video.author === author);
    renderVideos(filteredVideos,videosList);
}

// function calls
getFirstAyah();
getAyahsFromAPI("https://api.quran.com/api/v3/chapters");
renderVideos(videos,videosList);
getAuthors(videos,authorSelect);