import { select } from '../settings.js';

class Categories {
    constructor(data) {
        const thisCategories = this; 

        console.log('categories ruszyło!');
        this.listCategories(data);
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
                const href = event.target.getAttribute('href');
                const categoryName = href.split('-')[1];
                thisCategories.generateDataByCategory(categoryName);
            });
        }
    }

    generateDataByCategory(categoryName) {
        console.log(categoryName);
    }
}

export default Categories;