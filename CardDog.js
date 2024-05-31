class CardDog {
    identifier;
    api;
    divIdCardDog;

    constructor(identifier, api){
        this.identifier = identifier;
        this.api = api;

        this.createCard(this.identifier, this.api);
        this.divIDCardDog.querySelector('button').addEventListener('click', this.loadImg);
    }

    createCard(identifier, api){
        this.divIDCardDog = document.createElement('div');
        this.divIDCardDog.id = identifier;
        this.divIDCardDog.className = 'card_dog';
    
        let btnLoad = document.createElement('button');
        btnLoad.type = 'button';
        btnLoad.name = 'load_img';
        btnLoad.insertBefore(document.createTextNode('Load Img'), btnLoad.firstElementChild);
    
        let divImgDog = document.createElement('div');
        divImgDog.className = 'img_dog';
        divImgDog.style.backgroundImage = "url('./img/load.png')"
    
        this.divIDCardDog.appendChild(btnLoad);
        this.divIDCardDog.appendChild(divImgDog);
    
        Object.defineProperties(btnLoad, {apiRequest: {value: api, writable: false}})
    }

    loadImg(e){
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
            e.target.nextElementSibling.style.backgroundImage = `url(${apiObj.message})`;
        }).
        catch(error => {
            console.log(error);
            e.target.nextElementSibling.style.backgroundImage = "url('./img/error404.jpg')";
        })
        .finally(() => {
            console.log('End');
        });
    }
}