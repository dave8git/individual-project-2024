import { templates, select, classNames } from '../settings.js';
import { utils } from '../utils.js';

class Random {
    constructor(object, songs) {
        const thisRandom = this; 
        thisRandom.dataObject = object;
        thisRandom.songs = songs;
        thisRandom.getElements(); 
        thisRandom.initActions();
    }


    getElements() {
        const thisRandom = this;
        thisRandom.dom = {}; 
        thisRandom.randomButton = document.querySelector(classNames.random.randomButton);
        //console.log('random button', thisRandom.randomButton);


    }

    initActions() {
        const thisRandom = this; 
        thisRandom.randomButton.addEventListener('click', function() {
            console.log('mój data Object: ', thisRandom.dataObject);
            console.log('songs w random:', thisRandom.songs);
            const keysArray = Object.keys(thisRandom.dataObject);
            const array = keysArray
                            .map(key => ({filename: key, played: thisRandom.dataObject[key]}))
                            .sort((a, b) => b.played - a.played)
                            .splice(0, keysArray.length/2);

                            // zrobić ceil i wylosować jeden element z niej (array)


                            // jeden mamy wylosowany
                                // z listy całej piosenek wybieramy jedną która nam pasuje, której filename (wyciąć slasha, np. w funkcji w script.js która zlicza statystyki. )

                            // mając obiekt jednej piosenki możemy zainicjować audioPlayer

            console.log('array', array);


        });
    }

}

export default Random; 