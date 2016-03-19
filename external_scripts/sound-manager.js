$(document).ready(function(){
    Howler.volume(localStorage.getItem('globalVolume'))
});

function updateVolume(){
    Howler.volume(localStorage.getItem('globalVolume'))
}