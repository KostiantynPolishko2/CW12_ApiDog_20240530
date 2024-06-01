document.addEventListener('DOMContentLoaded', async (e)=>{
    console.log('Start');
 
    const api = 'https://dog.ceo/api/breeds/list';

    // let selectTag = document.getElementsByName('s_sub_breeds')[0];
    // selectTag.add(new Option('one', '1'));
    // selectTag.options[selectTag.options.length] = new Option('two', '2');
    // selectTag['2'] = new Option('three', '3');

    // let arr = ['one', 'two', 'three'];
    // arr.forEach((element, index) => {
    //     console.log(element, index);
    // })

    try{
        const breeds = await getBreeds(api);
        setSelection(document.getElementsByName('s_breeds')[0], breeds);
    }
    catch(ex){
        console.log(ex)
    }   
})

const setSelection = (s_element, array) => {
    array.forEach((name, index) =>{
        s_element.add(new Option(name, index));
    });
    console.log(s_element);
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