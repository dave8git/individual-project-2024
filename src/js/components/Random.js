import { templates, select, classNames } from '../settings.js';
import { utils } from '../utils.js';
import AudioContainer from './AudioContainer.js';

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
        thisRandom.randomContainer = document.querySelector('.musicContainerRandom');
        //console.log('random button', thisRandom.randomButton);


    }

    initActions() {
        const thisRandom = this; 
        thisRandom.randomButton.addEventListener('click', function() {
            thisRandom.randomContainer.innerHTML = '';
            const keysArray = Object.keys(thisRandom.dataObject);
            if(keysArray.length  === 0 || keysArray.length === 1) {
                alert('Najpierw posłuchaj jeszcze kilku piosenek z bazy... wciąż się uczę twoich preferencji muzycznych ;)');
            }
            const array = keysArray
                            .map(key => ({filename: key, played: thisRandom.dataObject[key]}))
                            .sort((a, b) => b.played - a.played)
                            .splice(0, keysArray.length/2);
            const randomElement = array[Math.floor(Math.random() * array.length)];  

                            // zrobić ceil i wylosować jeden element z niej (array)


                            // jeden mamy wylosowany
                                // z listy całej piosenek wybieramy jedną która nam pasuje, której filename (wyciąć slasha, np. w funkcji w script.js która zlicza statystyki. )

                            // mając obiekt jednej piosenki możemy zainicjować audioPlayer

            thisRandom.getObjectByFilename(thisRandom.songs, randomElement);
        });
    }

    getObjectByFilename(data, filename) {
        const thisRandom = this; 
        console.log('data', data);
        console.log('filename', filename);
        const song = data.find(song => song.filename === filename.filename);
        
        new AudioContainer(song, thisRandom.randomContainer); 

    }

}

export default Random; 