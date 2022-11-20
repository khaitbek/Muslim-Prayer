const azanList = document.querySelector("#azanList");
const azanTemplate = document.querySelector("#azanTemplate").content;
const azanSelect = document.querySelector("#azanSelect");

const azans = [
    {
        iframe: "https://www.youtube.com/embed/j24AfTtbZdk",
        author: "Nizomiddin Shoshiy",
        category:"Hijoz"
    },
    {
        iframe: "https://www.youtube.com/embed/RJ5wpIN-zRE",
        author: "Nizomiddin Shoshiy",
        category:"Hijoz"
    },
    {
        iframe: "https://www.youtube.com/embed/0Ep5pwiF19Y",
        author: "Nizomiddin Shoshiy",
        category:"Hijoz"
    },
    {
        iframe: "https://www.youtube.com/embed/No__UDTWoeo",
        author: "Orif Abduvahobov",
        category:"Misr"
    },
    {
        iframe: "https://www.youtube.com/embed/R4VnkospIY4",
        author: "Orif Abduvahobov",
        category:"Hijoz"
    },
    {
        iframe: "https://www.youtube.com/embed/yWPrw8a-qqY",
        author: "Orif Abduvahobov",
        category:"Hijoz"
    },
    {
        iframe: "https://www.youtube.com/embed/UAkhY7IGTT4",
        author: "Yo'ldoshbek Ibrohim",
        category:"Hijoz"
    },
    {
        iframe: "https://www.youtube.com/embed/Cv4Ran5ZpBA",
        author: "Yo'ldoshbek Ibrohim",
        category:"Misr"
    },
    
];

function renderAuthors(authors,authorsList){
    const authorsFragment = new DocumentFragment();
    authors.forEach(author => {
        const newAuthorOption = document.createElement("option");
        newAuthorOption.textContent = author;
        newAuthorOption.value = author;

        authorsFragment.appendChild(newAuthorOption);
    });
    authorsList.appendChild(authorsFragment);
}

function getAuthors(azans){
    const authors = new Set();
    azans.forEach(azan => {
        authors.add(azan.author);
    });
    renderAuthors(authors,azanSelect);
}

function renderAzans(azans,azanList){
    const newFragment = new DocumentFragment();
    azanList.innerHTML = "";
    azans.forEach(azan => {
        const {iframe,author,category} = azan;
        const azanTemplateClone = azanTemplate.cloneNode(true).children[0];
        azanTemplateClone.querySelector("iframe").src = iframe;
        azanTemplateClone.dataset.author = author;
        azanTemplateClone.dataset.category = category;

        newFragment.appendChild(azanTemplateClone);
    });
    azanList.appendChild(newFragment);
}

function filteredAzansByAuthor(azans,author,azanList){
    const filteredAzansByAuthor = azans.filter(azan => author === "" | author === azan.author);
    renderAzans(filteredAzansByAuthor,azanList); 
}

azanSelect.addEventListener("change",evt => {
    filteredAzansByAuthor(azans,evt.target.value,azanList);
});


getAuthors(azans);
filteredAzansByAuthor(azans,azanSelect.value,azanList);