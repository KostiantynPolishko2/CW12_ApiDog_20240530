document.addEventListener('DOMContentLoaded', (e)=>{
    console.log('Start');
 
    let api = 'https://dog.ceo/api/breeds/image/random';

    const cardDog1 = new CardDog('dog1', api);
    document.querySelector('body').appendChild(cardDog1.divIDCardDog);

    const cardDogHtml2 = new CardDogHtmlElemnt('dog2', api);
    document.querySelector('body').appendChild(cardDogHtml2);

})