document.addEventListener('DOMContentLoaded', async (e)=>{
    console.log('Start');
 
    const api = 'https://dog.ceo/api/breeds/list';
    // const nameBreeds = 's_breeds';
    // const sizeList = 5;

    const btnBreed = document.getElementById('btn_breed');
    Object.defineProperties(btnBreed, {apiRequest: {value: api, writable: false}});   
    Object.defineProperties(btnBreed, {nameBreeds: {value: 's_breeds', writable: false}});   
    Object.defineProperties(btnBreed, {sizeList: {value: 5, writable: false}});   

    btnBreed.addEventListener('click', createDropDownBreeds);

})


const createDropDownBreeds = async (e) => {
    try{
        const breeds = await getBreeds(e.target.apiRequest);
        e.target.nextElementSibling.appendChild(createSelectTag(e.target.nameBreeds, e.target.sizeList));

        setSelection(document.getElementsByName(e.target.nameBreeds)[0], breeds);

        document.getElementsByName('s_breeds')[0].addEventListener('change', (e)=> {
        const selectedOption = e.target.options[e.target.selectedIndex];
        console.log(selectedOption.text);
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