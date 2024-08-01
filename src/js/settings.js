export const select = {
    templateOf: {
        songPlayer: "#template-song-player",
    },
    containerOf: {
        song: '.musicContainer',
    },
    all: {
        menuProducts: '#product-list > .product',
        menuProductsActive: '#product-list > .product.active',
        formInputs: 'input, select',
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
};