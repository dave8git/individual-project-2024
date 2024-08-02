export const select = {
    templateOf: {
        songPlayer: "#template-song-player",
        search: "#template-search"
    },
    containerOf: {
        song: '.musicContainer',
        categories: '.categoriesContainer',
        search: '.searchContainer',
        input: '#nameInput',
        searchButton: '#findAction2',
        menu: '#product-list',
        cart: '#cart',
        pages: '#pages',
        booking: '.booking-wrapper',
        player: '.musicContainer',
    },
    all: {
        menuProducts: '#product-list > .product',
        menuProductsActive: '#product-list > .product.active',
        formInputs: 'input, select',
    }, 
    nav: {
        links: '.main-nav a',
    },
};

export const classNames = {
    menuProduct: {
        wrapperActive: 'active',
        imageVisible: 'active',
    },

};

export const settings = {
    db: {
        url: '//localhost:3131',
        songs: 'songs',
    },
};

export const templates = {
    audioPlayer: Handlebars.compile(document.querySelector(select.templateOf.songPlayer).innerHTML),
    search: Handlebars.compile(document.querySelector(select.templateOf.search).innerHTML),
};