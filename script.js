document.addEventListener('DOMContentLoaded', (e)=>{
    console.log('Start');
 
    let api = 'https://dog.ceo/api/breeds/image/random';

    const cardDog1 = new CardDog('dog1', api);
    document.querySelector('body').appendChild(cardDog1.divIDCardDog);

    const cardDog2 = new CardDog('dog2', api);
    document.querySelector('body').appendChild(cardDog2.divIDCardDog);
})