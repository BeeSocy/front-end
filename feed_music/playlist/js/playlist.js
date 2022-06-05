document.addEventListener('DOMContentLoaded', () => {
    const DOMmusicCount = document.querySelector('.playlist .js-music-count');
    const DOMplaylistTime = document.querySelector('.playlist .js-playlist-time');

    DOMplaylistTime.innerHTML = secondsFormat(23574);
    DOMmusicCount.innerHTML = `${countElements('.playlist .carousel-items')} Músicas`

    function countElements(element) {
        return document.querySelector(element).childElementCount;
    }

    function secondsFormat(s) {
        hour = Math.floor(s / 3600);
        minute = Math.floor((s % 3600) / 60);
        seconds = Math.floor((s % 3600) % 60);

        let hourStr;
        let minuteStr;

        hour > 1 ? hourStr = 'horas' : hourStr = 'hora';
        minute > 1 ? minuteStr = 'minutos' : minuteStr = 'minuto';

        if(hour > 24) {
            final = 'Mais de 24 horas'
        }else if (hour > 0) {
            final = `${hour} ${hourStr} e ${minute} ${minuteStr}`;
        } else if (minute > 0) {
            final = `${minute} ${minuteStrl}`;
        } else {
            final = 'Menos de 1 minuto';
        }

        return final;
    }
})