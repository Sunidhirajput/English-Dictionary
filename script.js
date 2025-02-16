// const inputEl = document.getElementById("input");
// const infoTextEl=document.getElementById("i fo-text")
// const meaningContainerEl= document.getElementById("meaning-container");
// const titleEl = document.getElementById("title")
// const meaningEl= document.getElementById("meaning")
// const audioEl=document.getElementById("audio");
// async function fetchAPI(word){

//   try {
//       infoTextEl.style.display ="block";
//       meaningContainerEl.style.display="none";
//       infoTextEl.innerText=`Searching the meaning of "${word}"`;
//       const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
//       const result = await fetch(url).then((res)=>res.json());
//  if(result.title){
//     meaningContainerEl.style.display="block";
//     infoTextEl.style.display="none";
//     titleEl.innerText=word;
//     meaningEl.innerText = "N/A";
//     audioEl.style.display= none;
//   }else{

// infoTextEl.style.display= "none";
// meaningContainerEl.style.display="block";
// audioEl.style.display="inline-flex";
// titleEl.innerText= result[0].word;
// meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
// audioEl.src= result[0].phonetics[0].audio;
//   }
//   } catch (error) {
//     console.log(error);
//     infoTextEl.innerText=`an error happened,please try again later`;
//   }
//   }inputEl.addEventListener("keyup",()=>{
// if (e.target.value && e.key === "Enter"){
// fetchAPI(e.target.value);
// }
// })

const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching the meaning of "${word}"`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());

        // Check if API response is valid
        if (!Array.isArray(result) || result.length === 0) {
            throw new Error("Word not found");
        }

        // Extract data safely
        const wordData = result[0];
        const meanings = wordData.meanings || [];
        const phonetics = wordData.phonetics || [];

        titleEl.innerText = wordData.word;
        meaningEl.innerText = meanings.length > 0 ? meanings[0].definitions[0].definition : "N/A";

        // Check if audio exists
        const audioSrc = phonetics.length > 0 && phonetics[0].audio ? phonetics[0].audio : null;
        if (audioSrc) {
            audioEl.src = audioSrc;
            audioEl.style.display = "inline-flex";
        } else {
            audioEl.style.display = "none";
        }

        // Show meaning container and hide loading text
        meaningContainerEl.style.display = "block";
        infoTextEl.style.display = "none";
    } catch (error) {
        console.error(error);
        infoTextEl.innerText = "An error happened, please try again later";
    }
}

inputEl.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value);
    }
});
