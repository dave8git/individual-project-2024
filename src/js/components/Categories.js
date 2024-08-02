import { select } from '../settings.js';

class Categories {
    constructor(data, app) {
        const thisCategories = this;
        thisCategories.listCategories(data);
        thisCategories.data = data;
        thisCategories.app = app;
        thisCategories.getElements();
    }

    getElements() {
        const thisCategories = this;
        thisCategories.dom = {};
        thisCategories.dom.audioContainer = document.querySelector('#main ' + select.containerOf.song);
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

        thisCategories.categoriesContainer = document.querySelector(select.containerOf.categories);

        let links = '';

        for (let category of categories) {
            links += `<a href="#category-${category}">${category}</a>`
        }
        thisCategories.categoriesContainer.innerHTML = links;

        thisCategories.initCategories();
    }

    initCategories() {
        const thisCategories = this;

        const allCategories = thisCategories.categoriesContainer.querySelectorAll('a[href^="#category-"]');

        for (let category of allCategories) {
            category.addEventListener('click', function (event) {
               thisCategories.onCategoryClick(event);
            });
        }

        document.addEventListener('categoryClick', function (event) {
             thisCategories.onCategoryClick(event);
        })
    }

    onCategoryClick(event) {
        const thisCategories = this; 
        event.preventDefault();
        const href = event.target.getAttribute('href');
        const categoryName = href.split('-')[1]; //
        thisCategories.generateDataByCategory(thisCategories.data, categoryName);
    }

    generateDataByCategory(data, categoryName) {
        const thisCategories = this;
        const filteredSongs = data.filter(song => song.categories.includes(categoryName));
        thisCategories.app.activatePage('main');
        console.log(thisCategories.dom.audioContainer);
        thisCategories.dom.audioContainer.innerHTML = '';
        thisCategories.app.initAudio(filteredSongs, thisCategories.dom.audioContainer);
    }
}

export default Categories;