import AudioContainer from './components/AudioContainer.js'; //plik musi być z rozszerzenim .js i cudzysłowy muszą być pojedyńcze ''
import Categories from './components/Categories.js';

/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

const settings = {
    amountWidget: {
        defaultValue: 1,
        defaultMin: 0,
        defaultMax: 10,
    },
    cart: {
        defaultDeliveryFee: 20,
    },
    hours: {
        open: 12,
        close: 24,
    },
    datePicker: {
        maxDaysInFuture: 14,
    },
    booking: {
        tableIdAttribute: 'data-table',
    },
    db: {
        url: '//localhost:3131',
        songs: 'songs',
        products: 'products',
        orders: 'orders',
        bookings: 'bookings',
        events: 'events',
        dateStartParamKey: 'date_gte',
        dateEndParamKey: 'date_lte',
        notRepeatParam: 'repeat=false',
        repeatParam: 'repeat_ne=false',
    },

};

const classNames = {
    menuProduct: {
        wrapperActive: 'active',
        imageVisible: 'active',
    },
    cart: {
        wrapperActive: 'active',
    },
    booking: {
        loading: 'loading',
        tableBooked: 'booked',
    },
    nav: {
        active: 'active',
    },
    pages: {
        active: 'active',
    }
};

const select = {
    templateOf: {
        menuProduct: "#template-menu-product",
        cartProduct: '#template-cart-product',
        bookingWidget: '#template-booking-widget',
    },
    containerOf: {
        menu: '#product-list',
        cart: '#cart',
        pages: '#pages',
        booking: '.booking-wrapper',
        player: '.musicContainer',
        categories: '.categoriesContainer'
    },
    all: {
        menuProducts: '#product-list > .product',
        menuProductsActive: '#product-list > .product.active',
        formInputs: 'input, select',
    },
    menuProduct: {
        clickable: '.product__header',
        form: '.product__order',
        priceElem: '.product__total-price .price',
        imageWrapper: '.product__images',
        amountWidget: '.widget-amount',
        cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
        amount: {
            input: 'input.amount', //'input[name="amount"]',
            linkDecrease: 'a[href="#less"]',
            linkIncrease: 'a[href="#more"]',
        },
        datePicker: {
            wrapper: '.date-picker',
            input: `input[name="date"]`,
        },
        hourPicker: {
            wrapper: '.hour-picker',
            input: 'input[type="range"]',
            output: '.output',
        },
    },
    booking: {
        peopleAmount: '.people-amount',
        hoursAmount: '.hours-amount',
        tables: '.floor-plan .table',
    },
    nav: {
        links: '.main-nav a',
    },
    cart: {
        productList: '.cart__order-summary',
        toggleTrigger: '.cart__summary',
        totalNumber: `.cart__total-number`,
        totalPrice: '.cart__total-price strong, .cart__order-total .cart__order-price-sum strong',
        subtotalPrice: '.cart__order-subtotal .cart__order-price-sum strong',
        deliveryFee: '.cart__order-delivery .cart__order-price-sum strong',
        form: '.cart__order',
        formSubmit: '.cart__order [type="submit"]',
        phone: '[name="phone"]',
        address: '[name="address"]',
    },
    cartProduct: {
        amountWidget: '.widget-amount',
        price: '.cart__product-price',
        edit: '[href="#edit"]',
        remove: '[href="#remove"]',
    },
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
                console.log(pageMatchingHash);
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
            // if(page.id == pageId) {
            //   page.classList.add(classNames.pages.active);
            // } else {
            //   page.classList.remove(classNames.pages.active);
            // }
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
                thisApp.initData();
                thisApp.initCategories(); 
                console.log('data działa');
            });

        console.log('thisApp.data', JSON.stringify(thisApp.data));

    },

    initCategories: function () {
        const thisApp = this;
        console.log('init categories');
        const newCategory = new Categories(thisApp.data.songs);
    },

    initAudio: function () {
        const thisApp = this;

        for (let song in thisApp.data.songs) {
            //new AudioContainer(); 
            new AudioContainer(thisApp.data.songs[song]);
        }
    },

    init: function () {
        const thisApp = this;
        console.log('*** App starting ***');
        thisApp.initPages();
        thisApp.initData();
        

        //thisApp.inputHide();

    },
};

app.init();