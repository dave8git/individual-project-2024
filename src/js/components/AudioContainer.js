import { templates, select } from '../settings.js';
import { utils } from '../utils.js';

class AudioContainer{
    constructor(data, container) {
        const thisAudioContainer = this; 

        thisAudioContainer.data = data;
        //thisAudioContainer.cleaner();
        thisAudioContainer.container = container;
        thisAudioContainer.render();
    }

    cleaner() {
        const thisAudioContainer = this; 
        const container = document.querySelector(select.containerOf.song);
        container.innerHTML = '';
    }

    render() {
        const thisAudioContainer = this; 
        const generatedHTML = templates.audioPlayer(thisAudioContainer.data);
        thisAudioContainer.element = utils.createDOMFromHTML(generatedHTML);
        //const container = document.querySelector(select.containerOf.song);
        thisAudioContainer.container.appendChild(thisAudioContainer.element);
    }


}

export default AudioContainer;