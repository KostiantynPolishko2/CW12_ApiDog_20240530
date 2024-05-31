document.addEventListener('DOMContentLoaded', (e)=>{
    console.log('Start');
 
    let api = 'https://dog.ceo/api/breeds/image/random';

    document.querySelector('body').appendChild(createCard('dog1', api));
    document.getElementById('dog1').querySelector('button').addEventListener('click', loadImg);

    console.log(document.querySelector('button').apiRequest);
})

const loadImg = (e) => {
    fetch(e.target.apiRequest).
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

const createCard = (identifier, api) => {
    let divIDCardDog = document.createElement('div');
    divIDCardDog.id = identifier;
    divIDCardDog.className = 'card_dog';

    let btnLoad = document.createElement('button');
    btnLoad.type = 'button';
    btnLoad.name = 'load_img';
    btnLoad.insertBefore(document.createTextNode('Load Img'), btnLoad.firstElementChild);

    let divImgDog = document.createElement('div');
    divImgDog.className = 'img_dog';
    divImgDog.style.backgroundImage = "url('./img/load.png')"

    divIDCardDog.appendChild(btnLoad);
    divIDCardDog.appendChild(divImgDog);

    Object.defineProperties(btnLoad, {apiRequest: {value: api, writable: false}})

    return divIDCardDog;
}