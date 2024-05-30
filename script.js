document.addEventListener('DOMContentLoaded', (e)=>{
    console.log('Start');

    createCard(document.querySelector('body'));
    let apiRequest = 'https://dog.ceo/api/breeds/image/random';
    loadImg(apiRequest); 

    document.querySelector('div.img_dog').addEventListener('click', (e) => {
        loadImg(apiRequest); 
    });   
})

const loadImg = (apiRequest) => {
    fetch(apiRequest).
    then(res => {
        if(res.status === 200){
            return res.json();
        }
        else{
            throw new Error();
        }
    }).
    then(apiObj => {

        if(apiObj.status !== 'success'){
            throw 'Error!\nImg did not load!'
        }
        document.querySelector('div.img_dog').style.backgroundImage = `url(${apiObj.message})`;
    }).
    catch(error => {
        console.log(error);
        document.querySelector('div.img_dog').style.backgroundImage = "url('./img/error404.jpg')";
    })
    .finally(() => {
        console.log('End');
    });
}

const createCard = (element) => {
    let divDog = document.createElement('div');
    divDog.className = 'img_dog';

    element.appendChild(divDog);
}