import { Howl } from "howler";

// Object to store and manage all sounds
// const sounds = {    
//     bgMusic: new Howl({
//         src: [require("../src/assets/FruitFall/sounds/nature-ambience.mp3")],
//         loop: true,
//         volume: 1,
//         preload: true,
//     }),

//     click: new Howl({
//         src: [require("../src/assets/FruitFall/sounds/click-2.mp3")],
//         volume: 0.6,
//     }),

//     emptyClick: new Howl({
//         src: [require("../src/assets/FruitFall/sounds/click-1.wav")],
//         volume: 0.6,
//     }),

//     bubble: new Howl({
//         src: [require("../src/assets/FruitFall/sounds/bubble-1.mp3")],
//         volume: 0.6,
//     }),
// }

const soundMap = {
    ui: {
        error: "../src/assets/FruitFall/sounds/bubble-1.mp3",
    },
    music: {
        bg: "../src/assets/FruitFall/sounds/nature-ambience.mp3",
    },
    animals: {
        parrot: "../src/assets/FruitFall/sounds/animals/bird-squawk.mp3",
    },
    sfx: {
        click: "../src/assets/FruitFall/sounds/click-1.wav",
        emptyClick: "../src/assets/FruitFall/sounds/click-2.mp3",
    }
}


const sounds = {};

const loadSounds = () => {
    for (const [category, entries] of Object.entries(soundMap)) {
        sounds[category] = {};

        for (const [name, path] of Object.entries(entries)) {
            const isMusic = category === "music";
            
            sounds[category][name] = new Howl({
                src: [path],
                preload: true,
                loop: isMusic,
                volume: 0.6,
            });
        }
    }
}


const play = (category, name) => {
    const sound = sounds?.[category]?.[name];
    if (sound) {
        sound.play();
    } else {
        console.warn(`Sound not found: ${category}/${name}`);
    }
}


const stop = (category, name) => {
    const sound = sounds?.[category]?.[name];
    if (sound) sound.stop();
}


const setVolume = (category, name, volume) => {
    const sound = sounds?.[category]?.[name];
    if (sound) sound.volume(volume);
}


const muteCategory = (category, mute = true) => {
    if (sounds?.[category]) {
        Object.values(sounds[category]).forEach(sound => {
            sound.mute(mute);
        })
    }
}


const SoundManager = {
    loadSounds,
    play,
    stop,
    setVolume,
    muteCategory,
};

export default SoundManager;
