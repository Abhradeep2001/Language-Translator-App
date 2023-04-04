const selectTag = document.querySelectorAll("select")    //For the scroll-down menu
const fromText = document.querySelector(".fromText")    //For the Default Textarea
toText = document.querySelector(".toText")              //For the Translated Textarea
translate = document.querySelector("button")           //For the translate button
exchange = document.querySelector(".exchange")         //For the exchange icon
icon = document.querySelectorAll(".row i")                //For the copy and speech icons

//Selecting Default and Translating Languages From the scroll-down menu
selectTag.forEach((tag,id) =>{
    for(const country_code in countries){

        //Selecting "English" as the default language and "Korean" as the default translating language
        let selected;
        //For the 1st select tag (E.g: English)
        if(id==0 && country_code=="en-GB"){
            selected="selected";
        }
        //For the 2nd select tag (E.g: Korean)
        else if(id==1 && country_code=="ko-KR"){
            selected="selected";
        }

        //Adding <options></options> Tag inside the <select></select> tag
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
})

//Translating texts from and to the selected language
translate.addEventListener("click",function(){
    let text = fromText.value,
    translateFrom = selectTag[0].value,  //Default text language
    translateTo = selectTag[1].value;    //Translated text language

    //Creating API URL From MyMemory Api
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    //Using JavaScript fetch() method to fetch the api response and parse in into JSON (js obj)
    //Using JavaScript then() method tp receive that parsed object
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        //Storing the translated text value
        toText.value = data.responseData.translatedText;
    })
})

exchange.addEventListener("click",function(){
    //Swapping fromText and to Text  <select> tags
    let tempTag = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempTag;

    //Swapping fromText and toText value
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

})

//To copy Tranaslated texts and convert text to speech 

icon.forEach(icon =>{
    //To verify which icon has been pressed (copy/voice)
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")){  //If copy icon is selected
            if(target.id == "from"){
                //To copy the specified text string to the system clipboard
                navigator.clipboard.writeText(fromText.value);
                alert("Text copied!!");
            }
            else{
                navigator.clipboard.writeText(toText.value);
                alert("Text copied!!");
            }
        }
        //If speech icon is selected
        else{
            let utterance;
            if(target.id== "from"){
                //Using "SpeechSynthesisUtternace" class (pre-defined class) to convert text to speech
                utterance = new SpeechSynthesisUtterance(fromText.value); //Reading up text from the fromText area
                utterance.lang = selectTag[0].value;  //Setting up the language for the speech
            }
            else{
                utterance = new SpeechSynthesisUtterance(toText.value);  //Reading up text from the toText area
                utterance.lang = selectTag[1].value;
            }
            //To speak the passed utternace (/Information from the texarea)
            speechSynthesis.speak(utterance);
        }
    })
})