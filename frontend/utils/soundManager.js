import { Howl } from "howler";


const soundMap = {
    ui: {
        error: "../src/assets/FruitFall/sounds/bubble-1.mp3",
    },
    music: {
        bgAmbience: "../src/assets/FruitFall/sounds/nature-ambience.mp3",
        bgMusic: "../src/assets/sounds/bg-music.mp3",

    },
    animals: {
        parrot: "../src/assets/FruitFall/sounds/animals/bird-squawk.mp3",
    },
    sfx: {
        click: "../src/assets/FruitFall/sounds/click-1.wav",
        emptyClick: "../src/assets/FruitFall/sounds/click-2.mp3",
        pop: "../src/assets/FruitFall/sounds/pop-2.mp3",
        drop: "../src/assets/FruitFall/sounds/drop-2.mp3",
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

const setRate = (category, name, volume) => {
    const sound = sounds?.[category]?.[name];
    if (sound) sound.rate(volume);
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
    setRate,
    muteCategory,
};

export default SoundManager;
