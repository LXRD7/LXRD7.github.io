function reproducir(n){
    var divs = document.querySelectorAll('.btn-controles');
    for(var i = 0; i < divs.length; i++){
        divs[i].style.display = 'none';
    }

    var audios = document.querySelectorAll('.audio');
    for(var i = 0; i < audios.length; i++){
        pause(audios[i].id);
    }

    document.getElementById("div_btn_"+n).style.display = "block";
    play("audio_"+n);
    resaltar_card(n);
}

function resaltar_card(id_sound){
    var cards = document.querySelectorAll('.card');
    for(var i = 0; i < cards.length; i++){
        cards[i].className = "card";
    }
    var card = document.querySelector("#audio_"+id_sound).closest('.card');
    card.className = "card bg-success bg-opacity-25";
}

function play(id_audio){
    var audio = document.getElementById(id_audio);
    audio.play();
}

function pause(id_audio){
    var audio = document.getElementById(id_audio);
    audio.pause();
}