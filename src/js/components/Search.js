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
    }

    getElements() {
        const thisSearch = this; 

        thisSearch.dom = {};
        thisSearch.dom.input = document.querySelector(select.containerOf.input);
        thisSearch.dom.searchButton = document.querySelector(select.containerOf.searchButton);
    }
    render() {
        const thisSearch = this; 
        const generatedHTML = templates.search();
        thisSearch.element = utils.createDOMFromHTML(generatedHTML);
        const container = document.querySelector(select.containerOf.search);
        container.appendChild(thisSearch.element);
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

        const filteredSongs = thisSearch.data.filter(song => {
            const titleMatch = song.title.toLowerCase().includes(searchInput);
            const authorMatch = song.author.toString().toLowerCase().includes(searchInput); // Assuming author is a string now
            if(titleMatch || authorMatch) {
                songs.push(song);
            };
        });

        thisSearch.app.initAudio(songs);
        console.log('songs', songs);
    }


}

export default Search; 