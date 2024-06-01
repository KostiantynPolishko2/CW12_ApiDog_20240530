
document.addEventListener('DOMContentLoaded', async (e)=>{
    console.log('Start');
 
    cardDogHtml = new CardDogHtmlElemnt('dog', 'api_undefined');
    const api = 'https://dog.ceo/api/breeds/list';

    const btnBreed = document.getElementById('btn_breed');
    Object.defineProperties(btnBreed, {apiRequest: {value: api, writable: false}});   
    Object.defineProperties(btnBreed, {nameBreeds: {value: 's_breeds', writable: false}});   
    Object.defineProperties(btnBreed, {sizeList: {value: 5, writable: false}});   

    btnBreed.addEventListener('click', createDropDownBreeds);
})

const getSubBreed = async (breed) => {
    let api = `https://dog.ceo/api/breed/${breed}/list`;

    try{
        const subBreeds = await getBreeds(api);

        if(subBreeds.length !== 0){
            console.log(subBreeds);
        }
        else{
            apiRequest = `https://dog.ceo/api/breed/${breed}/images/random`;
            cardDogHtml.identifier = breed;
            cardDogHtml.api = apiRequest;
            cardDogHtml.btnLoad.apiRequest = apiRequest;

            if(document.querySelector('header').firstElementChild == null){
                document.querySelector('header').appendChild(cardDogHtml);
            }
            else{
                cardDogHtml.divImgDog.style.backgroundImage = "url('./img/load.png')"
            }
        }
    }
    catch(ex){
        console.log(ex);
    }
}

const createDropDownBreeds = async (e) => {
    try{
        const breeds = await getBreeds(e.target.apiRequest);
        e.target.nextElementSibling.appendChild(createSelectTag(e.target.nameBreeds, e.target.sizeList));

        setSelection(document.getElementsByName(e.target.nameBreeds)[0], breeds);

        document.getElementsByName('s_breeds')[0].addEventListener('change', (e)=> {
        const selectedOption = e.target.options[e.target.selectedIndex];

        getSubBreed(selectedOption.text);
    })
    }
    catch(ex){
        console.log(ex)
    }
}

const createSelectTag = (name, size) => {
    const selectTag = document.createElement('select');
    selectTag.name = name;
    selectTag.size = size;

    return selectTag;
}

const setSelection = (s_element, array) => {
    array.forEach((name, index) =>{
        s_element.add(new Option(name, index));
    });
}

const getBreeds = async(api) => {

    let responce = await fetch(api);
    if(responce.status === 200){
        const objApi = await responce.json();

        if (objApi.status !== 'success'){
            throw 'Breeds unsuccess loaded';
        }
        return Array.from(objApi.message);
    }
    else{
        throw new Error();
    }
}