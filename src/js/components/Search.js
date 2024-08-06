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
        //flatMap tutaj weźmie wszystkie tablice categories i zrzuci je do jednej, i dopiero potem przechodzi po piosenkach
        // oczywiście Set weźmie tą jedną tablicę "sklejoną" ze wszystkich tablic categories w obiektach i usunie duplikaty
        // spread operator ... zrobi z tego wszystkiego ponowni tablicę.
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
        const musicPlayers = thisSearch.element.querySelector(select.containerOf.player);
        musicPlayers.innerHTML = '';
        thisSearch.app.initAudio(songs, searchContainer);
        //thisSearch.app.addEventListenerOnPlay(thisSearch.element);
        console.log('songs', songs);
    }
}

export default Search; 