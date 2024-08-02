import { templates, select } from '../settings.js';
import { utils } from '../utils.js';

class AudioContainer{
    constructor(data, container) {
        const thisAudioContainer = this; 

        thisAudioContainer.data = data;
        //thisAudioContainer.cleaner();
        thisAudioContainer.container = container;
        thisAudioContainer.render();
        thisAudioContainer.initActions(); 
    }

    initActions() {
        const thisAudioContainer = this; 
        thisAudioContainer.element.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                link.dispatchEvent(new Event('categoryClick', {
                    bubbles: true,
                }));
            });
        });
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