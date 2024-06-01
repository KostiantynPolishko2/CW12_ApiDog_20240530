class CardDogHtmlElemnt extends HTMLElement{
    identifier;
    api;
    btnLoad;
    divImgDog;

    constructor(identifier, api){
        super();

        this.identifier = identifier;
        this.api = api;

        this.createCard(this.identifier, this.api);
        this.querySelector('button').addEventListener('click', this.loadImg);
    }

    createCard(identifier, api){
        this.id = identifier;
        this.className = 'card_dog';
    
        this.btnLoad = document.createElement('button');
        this.btnLoad.type = 'button';
        this.btnLoad.name = 'load_img';
        this.btnLoad.insertBefore(document.createTextNode('Load Img'), this.btnLoad.firstElementChild);
    
        this.divImgDog = document.createElement('div');
        this.divImgDog.className = 'img_dog';
        this.divImgDog.style.backgroundImage = "url('./img/load.png')"
    
        this.appendChild(this.btnLoad);
        this.appendChild(this.divImgDog);
    
        Object.defineProperties(this.btnLoad, {apiRequest: {value: api, writable: true}})
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

customElements.define('card-dog', CardDogHtmlElemnt);