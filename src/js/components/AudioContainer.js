import { templates, select } from '../settings.js';
import { utils } from '../utils.js';

class AudioContainer{
    constructor(data) {
        const thisAudioContainer = this; 

        thisAudioContainer.data = data;

        thisAudioContainer.render();
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