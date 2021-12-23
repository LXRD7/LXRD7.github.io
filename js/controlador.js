var multimedia = document.getElementById("panelVideo");
var barraReproduccion = document.getElementById("barraReproduccion");
var listaSeleccionada = "musica";
var panelVideo = document.getElementById("panelVideo");

function reproducir(n) {
    stop();

    document.getElementById("controles").style.display = "block";
    document.getElementById("panelReproduccion").style.display = "block";

    if (listaSeleccionada == "musica") {
        var media = document.getElementById("audio_" + n);
        multimedia = media;
        multimedia.play();
    } else {
        panelVideo.load();
        multimedia = panelVideo;
        multimedia.play();
    }
    cambiarVolumen();
    multimedia.ontimeupdate = updateUI;
    multimedia.ondurationchange = setupBarraReproduccion;
    resaltar_card(n);
}

function resaltar_card(id_media) {
    var cards = document.querySelectorAll(".card");
    for (var i = 0; i < cards.length; i++) {
        cards[i].className = "card";
    }
    if (listaSeleccionada == "musica") {
        var card = document
            .querySelector("#audio_" + id_media)
            .closest(".card");
    } else {
        var card = document
            .querySelector("#video_" + id_media)
            .closest(".card");
    }

    card.className = "card bg-dark text-white";
}

function play() {
    multimedia.play();
}

function pause() {
    multimedia.pause();
}

function stop() {
    multimedia.pause();
    multimedia.currentTime = 0;
}

function retroceder() {
    multimedia.currentTime -= 5;
}

function avanzar() {
    console.log("avanzar");
    multimedia.currentTime += 5;
}

/**********************************************************
 * Drop & play
 */

function evdragstart(ev) {
    if (listaSeleccionada == "musica") {
        ev.dataTransfer.setData("id", ev.target.querySelector("audio").id);
    } else {
        ev.dataTransfer.setData("id", ev.target.querySelector("video").id);
    }
    ev.dataTransfer.setData("caratula", ev.target.querySelector("input").src);
    ev.dataTransfer.setData("media", ev.target.querySelector("source").src);
    ev.dataTransfer.setData(
        "artista",
        ev.target.querySelector("small").innerHTML
    );
    ev.dataTransfer.setData("titulo", ev.target.querySelector("h5").innerHTML);
}
function evdragover(ev) {
    ev.preventDefault();
}

function updateUI() {
    var longitud = multimedia.duration;
    barraReproduccion.min = multimedia.startTime;
    barraReproduccion.max = longitud;
    barraReproduccion.value = multimedia.currentTime;
    document.getElementById("tiempo").innerHTML = formatTime(
        multimedia.currentTime
    );
}

function formatTime(time) {
    var min = Math.floor(time / 60);
    var sec = Math.floor(time % 60);
    return min + ":" + (sec < 10 ? "0" : "") + sec;
}

function setupBarraReproduccion() {
    barraReproduccion.min = multimedia.startTime;
    barraReproduccion.max = multimedia.startTime + multimedia.duration;
}

function navegar() {
    multimedia.currentTime = barraReproduccion.value;
}

function evdrop(ev) {
    ev.stopPropagation();
    ev.preventDefault();

    if (listaSeleccionada == "musica") {
        document.getElementById("imagenCaja").style.display = "block";
        document.getElementById("divVideo").style.display = "none";
        var id = ev.dataTransfer.getData("id").replace("audio_", "");
        document.getElementById("imagenCaja").src =
            ev.dataTransfer.getData("caratula");
        document.getElementById("textoTipo").innerHTML = "Música";
    } else {
        document.getElementById("imagenCaja").style.display = "none";
        document.getElementById("divVideo").style.display = "block";
        var id = ev.dataTransfer.getData("id").replace("video_", "");
        document.getElementById("panelVideo").src =
            ev.dataTransfer.getData("media");
        document.getElementById("textoTipo").innerHTML = "Vídeo";
    }

    reproducir(id);

    document.getElementById("titulo").innerHTML =
        ev.dataTransfer.getData("titulo") +
        " - " +
        ev.dataTransfer.getData("artista");
}

function cambiarVolumen() {
    var volumen = document.getElementById("barraVolumen");
    multimedia.volume = volumen.value / 100;
}

function mostrarCanciones() {
    document.getElementById("listaCanciones").style.display = "block";
    document.getElementById("listaVideos").style.display = "none";
    listaSeleccionada = "musica";
}

function mostrarVideos() {
    document.getElementById("listaCanciones").style.display = "none";
    document.getElementById("listaVideos").style.display = "block";
    listaSeleccionada = "videos";
}
