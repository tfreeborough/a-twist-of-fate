$(document).ready(function(){
    if(localStorage.getItem('globalVolume') === null) {
        localStorage.setItem('globalVolume',1);
        updateVolume();

    }else{
        Howler.volume(localStorage.getItem('globalVolume'));
    }
});

function updateVolume(){
    Howler.volume(localStorage.getItem('globalVolume'))
}