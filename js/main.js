'use strict';

const constraints = window.constraints = {
    audio: false,
    video: true
};

function errorMsg(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
        console.error(error);
    }
}

function init(e) {
    adapter.browserShim.shimGetUserMedia(window, adapter.browserDetails);
    alert("hey", JSON.stringify(adapter.browserDetails));

    try {
        navigator.getUserMedia({ video: true, audio: false }, (stream => {
            const video = document.querySelector('video');
            const videoTracks = stream.getVideoTracks();
            console.log('Got stream with constraints:', constraints);
            console.log(`Using video device: ${videoTracks[0].label}`);
            window.stream = stream;
            video.srcObject = stream;
            e.target.disabled = true;
        }));
    } catch (err2) {
        alert(err2);
        errorMsg(`getUserMedia error: ${err2.name}`, err2);
    }
}

document.querySelector('#showVideo').addEventListener('click', e => init(e));
