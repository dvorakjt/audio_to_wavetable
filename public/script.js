//create cross-browser compatible audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const aC = new AudioContext();
var source;

//create instance of file reader
const fileReader = new FileReader();

//analyzer functionality!
//this handles file input
const recordingInput = document.getElementById("recording");
recordingInput.addEventListener("change", function (event) {
    console.log("new file added");

    //get the audio file that the user uploaded
    const selectedRecording = event.target.files[0];
    console.log(selectedRecording);

    //pass this file into the file reader
    fileReader.readAsArrayBuffer(selectedRecording);
}, false);

//handles playback and analysis
const play = document.querySelector("#play");
play.addEventListener("click", function (event) {
    //prevent page refreshing
    event.preventDefault();

    //now start the source
    source.start(0);

    //finally use the analyser node to create a wavetable and make a post request to save it as a js file
});


//when the file has been read, use decodeAudioData to play it, then use the analyzer node to analyze it.
fileReader.onloadend = function (e) {
    const audioData = e.target.result;
    console.log(audioData);
    source = aC.createBufferSource();
    aC.decodeAudioData(audioData, buffer => {
        source.buffer = buffer;
        source.connect(aC.destination);
        source.loop = false;
    }, e => {
        console.log(`There was a problem decoding the audio file: A${e.err}`);
    });
};


//piano functionality
//create piano wave
// let pianowave = aC.createPeriodicWave(wavetable.real, wavetable.imag);

// function playNote(pitch, waveform, attackTime = 0, releaseTime = .2, duration = .21) {
//     console.log(waveform);
//     let osc = aC.createOscillator();
//     if (waveform === "sine") {
//         osc.type = "sine"
//     } else {
//         //otherwise use a custom periodic waveform, for now just a piano wave
//         // osc.setPeriodicWave(pianowave);
//     }
//     osc.frequency.value = pitch;

//     //set up gain and create attack/release envelope
//     let envelope = aC.createGain();
//     envelope.gain.cancelScheduledValues(0, aC.currentTime);
//     envelope.gain.setValueAtTime(0, aC.currentTime);
//     //set the attack
//     envelope.gain.linearRampToValueAtTime(1, aC.currentTime + attackTime);
//     //set the release
//     envelope.gain.linearRampToValueAtTime(0, aC.currentTime + releaseTime);
//     osc.connect(envelope).connect(aC.destination);
//     osc.start();
//     osc.stop(aC.currentTime + duration);
// }

// //allow the user to select a different instrument
// let instrument = "sine";
// const select = document.querySelector('#instrumentSelect');
// select.addEventListener('input', function () {
//     instrument = this.value;
//     console.log(instrument);
// }, false);

// const keys = document.querySelectorAll('button');

// for (key of keys) {
//     key.addEventListener("click", function () {
//         console.log(this.dataset.pitch);
//         playNote(Number(this.dataset.pitch), instrument);
//     }, false);
// }