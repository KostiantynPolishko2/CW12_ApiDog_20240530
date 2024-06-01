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
            loadCardDog(breed, 'undefined');
            createDropDownSubBreeds(breed, subBreeds);
        }
        else{
            if(document.getElementById('btn_sub-breed').nextElementSibling.firstElementChild != null){
                document.getElementById('btn_sub-breed').nextElementSibling.firstElementChild.remove();
            }
            loadCardDog(breed, `https://dog.ceo/api/breed/${breed}/images/random`);
        }
    }
    catch(ex){
        console.log(ex);
    }
}

const loadCardDog = (id, apiRequest) => {
    cardDogHtml.identifier = id;
    cardDogHtml.api = apiRequest;
    cardDogHtml.btnLoad.apiRequest = apiRequest;

    if(document.querySelector('header').lastElementChild.tagName !== 'CARD-DOG'){
        document.querySelector('header').appendChild(cardDogHtml);
    }
    else{
        cardDogHtml.divImgDog.style.backgroundImage = "url('./img/load.png')"
    }
}

const createDropDownSubBreeds = (breed, subBreeds) => {
    document.getElementById('btn_sub-breed').nextElementSibling.appendChild(createSelectTag('s_sub_breeds', 5));
    setSelection(document.getElementsByName('s_sub_breeds')[0], subBreeds);

    document.getElementsByName('s_sub_breeds')[0].addEventListener('change', (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];

        loadCardDog(`${breed}_${selectedOption.text}`, `https://dog.ceo/api/breed/${breed}/${selectedOption.text}/images/random`);
    });
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