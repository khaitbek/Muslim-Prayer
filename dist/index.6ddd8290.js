function e(e,t,a,r){Object.defineProperty(e,t,{get:a,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},i={},n=a.parcelRequire371e;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in i){var t=i[e];delete i[e];var a={id:e,exports:{}};return r[e]=a,t.call(a.exports,a,a.exports),a.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){i[e]=t},a.parcelRequire371e=n),n.register("27Lyk",(function(t,a){var r,i;e(t.exports,"register",(()=>r),(e=>r=e)),e(t.exports,"resolve",(()=>i),(e=>i=e));var n={};r=function(e){for(var t=Object.keys(e),a=0;a<t.length;a++)n[t[a]]=e[t[a]]},i=function(e){var t=n[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),n("27Lyk").register(JSON.parse('{"24rw9":"index.6ddd8290.js","4FqPp":"kabah.3aa40e58.jpg","3VDdo":"alAqso.a2233f3f.jpg","1kvus":"prayer.5c58bf3a.jpeg"}'));var o;o=new URL(n("27Lyk").resolve("4FqPp"),import.meta.url).toString();var l;l=new URL(n("27Lyk").resolve("3VDdo"),import.meta.url).toString();const s=[{content:"Albatta, namoz mo'minlarga vaqtida farz qilingandir",ayah:"Niso surasi 103-oyat",imageUrl:t(new URL(n("27Lyk").resolve("1kvus"),import.meta.url).toString())},{content:"O'z bandasini kechasi Masjidul Haromdan atrofini barakali qilganimiz Masjidul Aqsoga mo'jizalarimizni ko'rsatish uchun sayr qildirgan Zot pokdir. Albatta, U o'ta eshituvchidir, ko'rib turuvchidir",ayah:"Isro sura'si 1-oyat",imageUrl:t(l)},{content:"Esla, vaqtiki, Ibrohim bilan Ismoil Baytning poydevorlarini ko'tarayotib , (dedilar):\"Robbimiz, bizdan qabul et, albatta, Sen O'zing o'ta eshituvchisan va o'ta biluvchisan\"",ayah:"Baqara sura'si 143-oyat",imageUrl:t(o)}],d=document.querySelector("#slideList"),u=document.querySelector("#hero");document.querySelectorAll("[data-carousel-btn]").forEach((e=>{e.addEventListener("click",(()=>{const t=e.closest("#slidesWrapper"),a=t.querySelectorAll("#slideItem"),r=Number(t.querySelector("[data-active]").dataset.index);let i=r+("prev"===e.dataset.carouselBtn?-1:1);i<0&&(i=a.length-1),i>=a.length&&(i=0);const n=s[i].imageUrl;u.style.backgroundImage=`url(${n})`,a[i].dataset.active=!0,delete a[r].dataset.active}))})),function(e,t){const a=document.querySelector("#slideTemplate").content,r=new DocumentFragment;e.forEach(((e,t)=>{const i=a.cloneNode(!0).children[0];i.querySelector("#slideTitle").textContent=e.content,i.querySelector("#slideText").textContent=e.ayah,0===t&&(i.dataset.active=!0),i.dataset.index=t,r.appendChild(i)})),t.appendChild(r)}(s,d);
//# sourceMappingURL=index.6ddd8290.js.map