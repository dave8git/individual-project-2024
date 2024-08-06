import AudioContainer from './components/AudioContainer.js'; //plik musi być z rozszerzenim .js i cudzysłowy muszą być pojedyńcze ''
import Categories from './components/Categories.js';
import Search from './components/Search.js';
import Random from './components/Random.js';
import { select } from './settings.js';
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
const settings = {
    cart: {
        defaultDeliveryFee: 20,
    },
    db: {
        url: '//localhost:3131',
        songs: 'songs',
    },
};

const classNames = {
    nav: {
        active: 'active',
    },
    pages: {
        active: 'active',
    }
};




const app = {
    //   inputHide: function() {
    //     const thisApp = this; 
    //     console.log('input hide działa');
    //     const inputContainer = document.querySelector('.submitContainer');
    //     // console.log(inputContainer);
    //     // const findActionInput = document.querySelector('#findAction');
    //     // console.log('findActionInput', findActionInput);

    //     document.querySelector('#findAction').addEventListener('click', function () {
    //         console.log('inputAction ruszyło');
    //         inputContainer.innerHTML = '';
    //     })

    //   },
    initPages: function () {
        const thisApp = this;

        thisApp.pages = document.querySelector(select.containerOf.pages).children;

        thisApp.navLinks = document.querySelectorAll(select.nav.links);
        const idFromHash = window.location.hash.replace('#/', '');

        thisApp.activatePage(idFromHash);

        let pageMatchingHash = thisApp.pages[0].id;

        for (let page of thisApp.pages) {
            if (page.id == idFromHash) {
                // eslint-disable-next-line no-unused-vars
                pageMatchingHash = page.id;
                // console.log(pageMatchingHash);
                break; // dzięki break nie zostaną wykonane dalsze pętle jeżeli warunek będzie prawidziwy. 
            }
        }

        for (let link of thisApp.navLinks) {
            link.addEventListener('click', function (event) {
                const clickedElement = this;
                event.preventDefault();
                /* get page id from href attribute */
                const id = clickedElement.getAttribute('href').replace('#', '');

                /* run thisApp.activePaget with that id */
                thisApp.activatePage(id);

                /* change URL hash */
                window.location.hash = '#/' + id;

            });
        }
    },

    activatePage: function (pageId) {
        const thisApp = this;
        /* add class "active" to matching pages, remove from non-matching */
        for (let page of thisApp.pages) {
            page.classList.toggle(classNames.pages.active, page.id == pageId);
        }
        /* add class "active" to matching links, remove from non-matching */

        for (let link of thisApp.navLinks) {
            link.classList.toggle(
                classNames.nav.active,
                link.getAttribute('href') == '#' + pageId
            );
        }
    },
    initData: function () {
        const thisApp = this;
        thisApp.data = {};

        const url = settings.db.url + '/' + settings.db.songs;

        fetch(url)
            .then(function (rawResponse) {
                return rawResponse.json();
            })
            .then(function (parsedResponse) {
                // console.log('parsedResponse', parsedResponse);

                /* save parsedResponse as thisApp.data.products */
             
                thisApp.data.songs = parsedResponse;
                // console.log(thisApp.data.songs);
                /* execute initMenu method */
                thisApp.initAudio(thisApp.data.songs, thisApp.container);
                thisApp.initCategories(); 
                thisApp.initSearch();
                thisApp.initRandom(); 
                //thisApp.addEventListenerOnPlay();
            });

        console.log('thisApp.data', JSON.stringify(thisApp.data));

    },

    initCategories() {
        const thisApp = this; 
        console.log('initcategories');
        thisApp.categories = new Categories(thisApp.data.songs, thisApp);
    },

    initSearch() {
        const thisApp = this;
        thisApp.search = new Search(thisApp.data.songs, thisApp);
    },

    initAudio: function (data, container) {
        const thisApp = this;
    
        for (let song in data) {
            //new AudioContainer(); 
            new AudioContainer(data[song], container, thisApp);
        }
    },

    initRandom: function() {
        const thisApp = this; 
        thisApp.random = new Random(thisApp.numberOfPlayClicks, thisApp.data.songs);
    },

    catchEvent: function() {
        const thisApp = this; 
        document.addEventListener('customPlayEvent', e => {
            console.log('customPlayEvent', e.target); // i teraz dostajemy cały element gdzie funkcja addEventListnerOnPlay może sobie wyszukać
            const clickedSrc = e.target.querySelector('source').getAttribute('src');
            if (thisApp.numberOfPlayClicks[clickedSrc]) {
                thisApp.numberOfPlayClicks[clickedSrc]++;
            } else {

                thisApp.numberOfPlayClicks[clickedSrc] = 1;
            }
                console.log(thisApp.numberOfPlayClicks);
        })
    },

    init: function () {
        const thisApp = this;
        console.log('*** App starting ***');
        const containerSelector = '#main ' + select.containerOf.song
        console.log(containerSelector);
        thisApp.container = document.querySelector(containerSelector);
        thisApp.numberOfPlayClicks = {};
        console.log('thisApp.container', thisApp.container);
        thisApp.initPages();
        thisApp.initData();
        thisApp.catchEvent();
        //thisApp.inputHide();
    },
};

app.init();