import { select } from '../settings.js';

class Categories {
    constructor(data, app) {
        const thisCategories = this; 

        console.log('categories ruszyło!');
        
        thisCategories.listCategories(data);
        thisCategories.data = data; 
        thisCategories.app = app;
        thisCategories.getElements(); 
    }

    getElements() {
        const thisCategories = this; 
        thisCategories.dom = {};
        thisCategories.dom.audioContainer = document.querySelector(select.containerOf.song);
        console.log(thisCategories.dom.audioContainer);
    }

    listCategories(data) {
        const thisCategories = this; 
        const categories = [];
        for (let category of data) {
            for (let singleCategory of category.categories) {
                if (!categories.includes(singleCategory)) {
                    categories.push(singleCategory);
                }
            }
        }

        const categoriesContainer = document.querySelector(select.containerOf.categories);
        console.log('select.containerOf.categories', select);
        console.log('categoriesContainer', categoriesContainer);

        let links = '';

        for (let category of categories) {
            links += `<a href="#category-${category}">${category}</a>`
        }
        categoriesContainer.innerHTML = links;

        thisCategories.initCategories();
    }

    initCategories() {
        const thisCategories = this; 

        const allCategories = document.querySelectorAll('a[href^="#category-"]');

        for (let category of allCategories) {
            category.addEventListener('click', function () {
                event.preventDefault();
                console.log('ruszył click na kategorii');
                const href = event.target.getAttribute('href');
                const categoryName = href.split('-')[1];
                thisCategories.generateDataByCategory(thisCategories.data, categoryName);
                thisCategories.app.initCategories();
            });
        }
    }

    generateDataByCategory(data, categoryName) {
        const thisCategories = this; 
        console.log(categoryName);
        console.log('thisCategories.dom.audioContainer', thisCategories.dom.audioContainer);
        const filteredSongs = data.filter(song => song.categories.includes(categoryName));

        console.log('filteredSongs', filteredSongs);
        thisCategories.dom.audioContainer.innerHTML = '';
        thisCategories.app.initAudio(filteredSongs);

    }
}

export default Categories;