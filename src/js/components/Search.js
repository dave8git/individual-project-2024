import { templates, select } from '../settings.js';
import { utils } from '../utils.js';

class Search {
    constructor(data, app) {
        const thisSearch = this; 
        thisSearch.data = data;
        thisSearch.app = app; 
        thisSearch.render(); 
        thisSearch.getElements(); 
        // thisSearch.input()
        thisSearch.initActions(); 

        console.log('thisSearch.data', thisSearch.data);
    }

    getElements() {
        const thisSearch = this; 

        thisSearch.dom = {};
        thisSearch.dom.input = document.querySelector(select.containerOf.input);
        thisSearch.dom.searchButton = document.querySelector(select.containerOf.searchButton);
    }

    prepareData() {
        const thisSearch = this;
        return [...new Set(thisSearch.data.flatMap(song => song.categories))]; // Get unique categories
    }
    render() {
        const thisSearch = this;
        const categories = thisSearch.prepareData();
        console.log('categories:', categories); // Debug statement
        const generatedHTML = templates.search({ categories }); // funkcja prepareData() zwraca tablicę więc, żeby ją przekazać do handlebars trzeba dodać {}
        thisSearch.element = utils.createDOMFromHTML(generatedHTML);
        thisSearch.container = document.querySelector(select.containerOf.search);
        thisSearch.container.appendChild(thisSearch.element);
    }

    initActions() {
        const thisSearch = this; 
        thisSearch.dom.searchButton.addEventListener('click', function() {
            const value = thisSearch.dom.input.value;
            thisSearch.input(value);
        });
    }

    input(value) {
        const thisSearch = this;
        const songs = [];
        const searchInput = value.toLowerCase();
        const searchContainer = thisSearch.container.querySelector(select.containerOf.song);
        const filteredSongs = thisSearch.data.filter(song => {
            const titleMatch = song.title.toLowerCase().includes(searchInput);
            const authorMatch = song.author.toString().toLowerCase().includes(searchInput); // Assuming author is a string now
            if(titleMatch || authorMatch) {
                songs.push(song);
            };
        });

        thisSearch.app.initAudio(songs, searchContainer);
        console.log('songs', songs);
    }


}

export default Search; 