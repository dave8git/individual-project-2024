import { templates, select } from '../settings.js';
import { utils } from '../utils.js';

class AudioContainer{
    constructor(data, container, app) {
        const thisAudioContainer = this; 

        thisAudioContainer.data = data;
        thisAudioContainer.app = app; 
        //thisAudioContainer.cleaner();
        thisAudioContainer.container = container;
        thisAudioContainer.render();
        thisAudioContainer.initActions(); 
        thisAudioContainer.initializePlayers();
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

    initializePlayers() {
        const thisAudioContainer = this; 
        console.log('initializePlayers started');
   
            GreenAudioPlayer.init({
                selector: 'audioSelector',
                stopOthersOnPlay: true
            })

        const audios = document.querySelectorAll('.audioSelector');
        
        audios.forEach(audio => {

            audio.addEventListener('play', () => {
                thisAudioContainer.audioStopper(audio);
            })
        })
    }

    audioStopper(exceptAudio) {
        const thisAudioContainer = this; 
        const audios = document.querySelectorAll('audio');
        audios.forEach(audio => {
            if(audio !== exceptAudio && !audio.paused) { // jeżeli audio nie równa się aktualnie klikany element audio i nie jest zapauzowane
                audio.pause();  
                audio.currentTime = 0;
            }
        });
    }
}

export default AudioContainer;