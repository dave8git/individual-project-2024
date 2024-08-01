import { templates, select } from '../settings.js';
import { utils } from '../utils.js';

class AudioContainer{
    constructor(data) {
        const thisAudioContainer = this; 

        thisAudioContainer.data = data;
        //thisAudioContainer.cleaner();
        thisAudioContainer.render();
    }

    getElements() {
        const thisAudioContainer = this; 
        thisAudioContainer.dom = {};
        thisAudioContainer.container = document.querySelector(select.containerOf.song);
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
        const container = document.querySelector(select.containerOf.song);
        container.appendChild(thisAudioContainer.element);
    }


}

export default AudioContainer;