let input = document.querySelector(`#inp-word`)
let sound = document.querySelector(`#sound`)
let search_input = document.querySelector(`#search-btn`)
let result = document.querySelector(`#result`)
let theword = document.querySelector(`.theword`)
let playbtn = document.querySelector(`.playbtn`)





search_input.addEventListener('click', e =>{
    setdata(input.value)
})

function play1 (){
    sound.play()
}


async function setdata(word){

    let fd = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    
    if(!fd.ok){
        result.innerHTML=`<h1>word not found</h1>`
    }else{
        
        let dt = await fd.json()   

        result.innerHTML=""

        sound.setAttribute("src", dt[0]?.phonetics?.[1]?.audio || "");

        
        let resultdt = `    <div class="word" id="words">
          <h3>${dt[0]?.word}</h3>
          <button class="playbtn" onclick=play1()>
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        <div class="details">
          <p>${dt[0]?.meanings[0]?.partOfSpeech}</p>
          <p>/${dt[0]?.phonetic}/</p>
        </div>
        <p class="word-meaning">
            ${dt[0]?.meanings[0]?.definitions[0]?.definition}
        </p>
        <p class="word-example">
            ${dt[0]?.meanings[0]?.definitions[0]?.example||"no example"}
        </p>`
        result.insertAdjacentHTML("beforeend",resultdt)
    }

    

}






