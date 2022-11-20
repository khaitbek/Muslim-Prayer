import { makeRequest } from "./helper.js";

// select DOM elements
const prayerTimesTable = document.querySelector("#prayerTableBody");
const prayerTimesTemplate = document.querySelector("#prayerTemplate").content;
const regionSelect = document.querySelector("#userRegion");
const periodSelect = document.querySelector("#userPeriod");
const allSelects = document.querySelectorAll("select");
const MONTHS = {
    1: "Yanvar",
    2: "Fevral",
    3: "Mart",
    4: "Aprel",
    5: "May",
    6: "Iyun",
    7: "Iyul",
    8: "Avgust",
    9: "Sentabr",
    10: "Oktabr",
    11: "Noyabr",
    12: "Dekabr"
}
const DAYS = {
    0: "Yakshanba",
    1: "Dushanba",
    2: "Seshanba",
    3: "Chorshanba",
    4: "Payshanba",
    5: "Juma",
    6: "Shanba"
}

// functions

// function initializeDate(){
//     const dateClone = new Date();
//     const weekday = DAYS[dateClone.getDay()];
//     const currentDate = `${dateClone.getFullYear()}-${dateClone.getMonth()}-${dateClone.getDate()}`;
//     const currentDateToString  = getDate(currentDate);
//     currentWeekDay.innerText = weekday;
// }



async function getPrayerTimes(region, route) {
    const prayerTimesData = await makeRequest(`https://islomapi.uz/api/${route}`, {
        region: region,
        month: 4
    });
    const prayerTimesToJSON = await prayerTimesData.json();
    if (Array.isArray(prayerTimesToJSON)) {
        return renderPrayerTimes(prayerTimesToJSON, prayerTimesTable);
    }
    renderPrayerTimes([prayerTimesToJSON], prayerTimesTable);
    return prayerTimesToJSON;
}

function getDate(date) {
    let splitDate = date;
    if (splitDate.includes("T00")) {
        splitDate = splitDate.split("T")[0];
    }
    if (splitDate.includes(":")) {
        splitDate = splitDate.split(",")[0];
    }
    if (splitDate.includes("/")) {
        splitDate = splitDate.split("/");
    } else {
        splitDate = splitDate.split("-");
    }
    const [year, month, day] = [splitDate[0], Number(splitDate[1]), splitDate[2]];
    const dateString = `${year}-yil ${day}-${MONTHS[month]}`;
    return dateString;
}

function convertTimeToSeconds(hours, minutes) {
    return (hours * 3600) + (minutes * 60);
}


function renderPrayerTimes(prayerTimes, prayerList) {
    const prayerFragment = new DocumentFragment();
    prayerList.innerHTML = "";
    prayerTimes.forEach(prayerTime => {
        const { region, date, times, weekday } = prayerTime;
        const convertedDate = getDate(date);
        const prayerTimesTemplateClone = prayerTimesTemplate.cloneNode(true);
        const prayerTimesRow = prayerTimesTemplateClone.querySelector("#prayerTimes");
        const timesToArray = Object.entries(times);
        timesToArray.forEach(time => {
            const timeName = time[0];
            const actualTime = time[1];
            const specificTableData = prayerTimesRow.querySelector(`[data-description=${timeName}]`);
            specificTableData.innerText = actualTime;
        });
        const tableDate = prayerTimesRow.querySelector("[data-description='date']");
        tableDate.innerText = convertedDate;
        const tableWeekDay = prayerTimesRow.querySelector("[data-description='weekday']");
        tableWeekDay.innerText = weekday;
        // append table data to the fragment
        prayerFragment.appendChild(prayerTimesTemplateClone);
    });
    // append the fragment to the table
    prayerTimesTable.appendChild(prayerFragment);
}

// event listeners
allSelects.forEach(select => {
    select.addEventListener("change", evt => {
        const selectedRegion = regionSelect.value;
        const selectedPeriod = periodSelect.value;
        console.log(selectedPeriod, selectedRegion);
        initializePrayerTimes(selectedRegion, selectedPeriod);
    });
})
function initializePrayerTimes(region, period) {
    getPrayerTimes(region, period);
}

// initializeDate();
getPrayerTimes("Toshkent", periodSelect.value);