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
const servicesList = document.querySelector("#servicesList");
const verseSelect = document.querySelector("#verseSelect");
const recitationSelect = document.querySelector("#recitationSelect");

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

async function getRecitationsFromApi(url,options = {}){
    const recitationsData = await makeRequest(`${url}`,options);
    const recitations = await recitationsData.json();
    renderRecitators(recitations.recitations);
}

async function getSingleAyah(url, id, options) {
    const ayahData = await makeRequest(`${url}`, options);
    const ayah = await ayahData.json();
    return ayah
}

async function getAllJuzs(){
    const response = await makeRequest("https://api.quran.com/api/v4/juzs");
    const juz = await response.json();
}

function renderRecitators(reciters){
    const uniqueReciters = []
    reciters.forEach(recitator => {
        const {id,reciter_name} = recitator;
        if(uniqueReciters.includes(reciter_name)) return;
        const newOption = document.createElement("option");
        newOption.text = reciter_name;
        newOption.value = id;
        recitationSelect.appendChild(newOption);
        uniqueReciters.push(reciter_name);
    });
    setReciter();
}

function setReciter(){
    window.localStorage.setItem("reciterId",recitationSelect.value);
}

function renderAyahs(ayahs, ayahsList) {
    const newFragment = new DocumentFragment();
    ayahsList.innerHTML = "";
    ayahs.forEach(ayah => {
        const verseTemplateClone = verseTemplate.cloneNode(true).children[0];
        const { verses_count, name_simple,name_arabic, id, revelation_place,chapter_number } = ayah;
        verseTemplateClone.dataset.id = id;
        verseTemplateClone.querySelector("#verseName").textContent = `${chapter_number}. ${name_simple} (${name_arabic})`;
        verseTemplateClone.querySelector("#verseRevelationPlace").textContent = revelation_place;
        verseTemplateClone.querySelector("#versesAyahs").textContent = `${verses_count} oyat`;
        verseTemplateClone
        newFragment.appendChild(verseTemplateClone);
    });
    ayahList.appendChild(newFragment);
}

async function getSingleAyahTranslation(verseKey){
    const response = await makeRequest(`https://api.quran.com/api/v4/quran/translations/55`,{
        verse_key:verseKey
    });
    const ayahTranslation = await response.json();
    return ayahTranslation;
}

function renderSurah(ayahs, list,surah,surahNumber) {
    const newFragment = new DocumentFragment();
    list.innerHTML = "";
    const currentSurahName = sidebar.querySelector("#surahName");
    currentSurahName.textContent = surah
    ayahs.forEach(ayah => {
        const { number, numberInSurah, audio, text } = ayah;
        const ayahVerseKey = `${surahNumber}:${numberInSurah}`;
        const surahTemplateClone = surahTemplate.cloneNode(true).children[0];
        const currentReciterId = Number(window.localStorage.getItem("reciterId"));
        getSingleAyahTranslation(ayahVerseKey).then(translationData => {
            const translation = translationData.translations[0].text.split("<")[0];
            surahTemplateClone.querySelector("#ayahTranslation").textContent = translation;
        })
        surahTemplateClone.querySelector("#ayah").textContent = `${numberInSurah}. ${text}`;
        getReciterAudio(currentReciterId,ayahVerseKey).then(audio => {
            if(currentReciterId === 12) {
                surahTemplateClone.querySelector("audio").src = `https:${audio.audio_files?.[0]?.url}`
            }else{
                surahTemplateClone.querySelector("audio").src = `https://verses.quran.com/${audio.audio_files?.[0]?.url}`
            }
        });
        surahTemplateClone.dataset.number = number;
        newFragment.appendChild(surahTemplateClone);
    });
    list.appendChild(newFragment);
}

async function getReciterAudio(reciterId,verse_key){
    const data = await makeRequest(`https://api.quran.com/api/v4/quran/recitations/${Number(window.localStorage.getItem("reciterId"))}`,{
        verse_key:verse_key
    });
    return await data.json();
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
    renderSurah(firstAyah.data[0].ayahs, surahList,firstAyah.data[0].englishName,firstAyah.data[0].number);
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

function filterVideosByAuthor(videos,author){
    const filteredVideos = videos.filter(video => author === "" | video.author === author);
    renderVideos(filteredVideos,videosList);
};

// events
ayahList.addEventListener("click", async (evt) => {
    const targetElem = evt.target;
    if (targetElem.matches("#openSidebarBtn")) {
        window.localStorage.removeItem("audioId");
        const closestSurahElement = targetElem.closest("#verseItem");
        const surahId = Number(closestSurahElement.dataset.id);
        const ayah = await getSingleAyah(`https://api.alquran.cloud/v1/surah/${surahId}/editions/ar.alafasy,en.asad,ur.jalandhry?limit=1`, {});
        renderSurah(ayah.data[0].ayahs, surahList,ayah.data[0].englishName,ayah.data[0].number);
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
    checkIfAnyAudioPlaying(Number(window.localStorage.getItem("audioId")))
    window.localStorage.removeItem("audioId");
    sidebar.classList.remove("show");
});

authorSelect.addEventListener("change", evt => {
    filterVideosByAuthor(videos,evt.target.value);
});

verseSelect.addEventListener("change", evt => {
    if(evt.target.value === "juz"){
        getAllJuzs();
    }else{
        getAyahsFromAPI("https://api.quran.com/api/v3/chapters");
    }
});

recitationSelect.addEventListener("change", setReciter);


// function calls
getFirstAyah();
getRecitationsFromApi("https://api.quran.com/api/v4/resources/recitations");
getAyahsFromAPI("https://api.quran.com/api/v3/chapters");
renderVideos(videos.slice(0,1),videosList);
getAuthors(videos,authorSelect);