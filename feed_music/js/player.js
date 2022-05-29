document.addEventListener('DOMContentLoaded', () => {
    let trackControler =
    {
        track: document.querySelector('.track'),
        loaded: false,
        playing: false,
        repeat: 'off',
        shuffle: false,
        src: '',
        path: '../assets/files/',
        volume: 0,
        currentTime: 0,
        finalTime: 0,

        controlers:
        {
            repeat: document.querySelector('.js-repeat'),
            shuffle: document.querySelector('.js-suffle'),
            back: document.querySelector('.js-previous'),
            next: document.querySelector('.js-next'),
            play: document.querySelector('.js-play'),
            timeBar: document.querySelector('.time-bar'),
            currentTime: document.querySelector('.current-time'),
            endTime: document.querySelector('.end-time')
        },

        volumeItens:
        {
            bar: document.querySelector('.volume'),
            icon: document.querySelector('.volume-icon')
        }
    }

    function startPlayer() {
        trackControler.src = `${trackControler.path}1.mp3`
        trackControler.track.src = trackControler.src
        trackControler.track.load();
        trackControler.loaded = true;
        trackControler.volume = trackControler.track.volume;


        trackControler.track.addEventListener('loadedmetadata', () => {
            trackControler.currentTime = 0;
            trackControler.finalTime = trackControler.track.duration;

            finalTime = trackControler.finalTime

            trackControler.controlers.endTime.innerHTML = secondsFormat(finalTime);
            trackControler.controlers.timeBar.max = finalTime;
            trackControler.controlers.timeBar.step = finalTime / trackControler.controlers.timeBar.max;

            changeVolume(trackControler.volume * 100, trackControler.volumeItens.bar);
        })
    }

    startPlayer()

    function secondsFormat(s) {
        function startZero(n) {
            if (n < 10) {
                n = `0${n}`
            }

            return n;
        }

        hour = Math.floor(s / 3600);
        minute = hour > 0 ? startZero(Math.floor((s % 3600) / 60)) : Math.floor((s % 3600) / 60);
        seconds = startZero(Math.floor((s % 3600) % 60));


        if (hour > 0) {
            final = `${hour}:${minute}:${seconds}`;
        } else if (minute > 0) {
            final = `${minute}:${seconds}`;
        } else {
            final = `0:${seconds}`;
        }

        return final;
    }

    function changeRangeStyle(element, backColor, color) {
        element.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${element.value / (element.max / 100)}%, ${backColor}  ${element.value / (element.max / 100)}%, ${backColor} 100%)`;
    }

    function muteIcon(volumeIcon, volume) {
        if (volume <= 0) {
            volumeIcon.classList.add('volume-mute');
        } else {
            volumeIcon.classList.remove('volume-mute');
        }
    }

    function mute() {
        if (getVolume() > 0) {
            muteIcon(trackControler.volumeItens.icon, getVolume());
            changeVolume(0, trackControler.volumeItens.bar);
        } else {
            changeVolume(30, trackControler.volumeItens.bar);
            muteIcon(trackControler.volumeItens.icon, getVolume());
        }
    }

    function repeat(status, icon) {
        trackControler.repeat == null ? trackControler.repeat = 'off' : trackControler.repeat = status;
        trackControler.track.loop = false;
        icon.classList.remove('repeat-one');
        icon.classList.add('active');

        if (status === 'off') {
            icon.classList.remove('active');
        } else if (status === 'one') {
            icon.classList.add('repeat-one');
            trackControler.track.loop = true;
        }
    }

    function getRepeatStatus() {
        return trackControler.repeat;
    }

    function changeVolume(v, volumeBar) {
        volumeBar.value = v;
        trackControler.track.volume = v / 100;
        trackControler.volume = trackControler.track.volume * 100;
        changeRangeStyle(volumeBar, 'var(--bg-light)', 'var(--text)');
        muteIcon(trackControler.volumeItens.icon, getVolume());
    }

    function getVolume() {
        return trackControler.volume;
    }

    function playControl(icon, play) {
        if (play) {
            startTime(trackControler.controlers.timeBar);
            icon.classList.add('playing');
            trackControler.playing = true;
        } else {
            clearInterval(timer);
            icon.classList.remove('playing');
            trackControler.playing = false;
        }
    }

    function playTrack() {
        if (getPlayingState()) {
            trackControler.track.pause();
        } else {
            trackControler.track.play();
        }
    }

    function setTime(seconds) {
        trackControler.currentTime = seconds;
        trackControler.track.currentTime = trackControler.currentTime;
        trackControler.controlers.currentTime.innerHTML = secondsFormat(getCurrentTime());
        trackControler.controlers.timeBar.value = seconds;
        changeRangeStyle(trackControler.controlers.timeBar, 'var(--bg-light)', 'var(--yellow-bee)');
    }

    let timer;
    function startTime(element) {
        if (trackControler.playing == false) {
            timer = setInterval(() => {
                element.value++;
                trackControler.currentTime = trackControler.track.currentTime;
                trackControler.controlers.currentTime.innerHTML = secondsFormat(getCurrentTime());
                changeRangeStyle(trackControler.controlers.timeBar, 'var(--bg-light)', 'var(--yellow-bee)');
            }, 1130);
        }else {
            clearInterval(timer);
        }
    }

    function getCurrentTime() {
        return trackControler.currentTime;
    }

    function getPlayingState() {
        return trackControler.playing;
    }

    function forward() {
        if(trackControler.currentTime <= 4) {
            setTime(0);
        }else {
            /* Música anteriror */
        }
    }

    trackControler.controlers.timeBar.addEventListener('input', () => {
        changeRangeStyle(event.currentTarget, 'var(--bg-light)', 'var(--yellow-bee)');
        setTime(event.currentTarget.value * event.currentTarget.step, event.currentTarget);
    });

    trackControler.volumeItens.bar.addEventListener('input', () => {
        changeVolume(event.currentTarget.value, event.currentTarget);
    });

    trackControler.volumeItens.icon.addEventListener('mousedown', () => {
        event.preventDefault;
        mute();
        trackControler.volumeItens.bar.value = getVolume();
        changeRangeStyle(trackControler.volumeItens.bar, 'var(--bg-light)', 'var(--text)');
    })

    trackControler.controlers.repeat.addEventListener('click', () => {
        if (getRepeatStatus() == 'off') {
            repeat('on', event.currentTarget);
        } else if (getRepeatStatus() == 'on') {
            repeat('one', event.currentTarget);
        } else if (getRepeatStatus() == 'one') {
            repeat('off', event.currentTarget);
        }
    })

    trackControler.track.addEventListener('play', () => playControl(trackControler.controlers.play, true));
    trackControler.track.addEventListener('pause', () => playControl(trackControler.controlers.play, false));
    trackControler.track.addEventListener('ended', () => playControl(trackControler.controlers.play, false));
    trackControler.track.addEventListener('timeupdate', () => {
        if(event.currentTarget.currentTime >= trackControler.finalTime-1) {
            trackControler.controlers.timeBar.value = 0;
        }
    })

    trackControler.controlers.play.addEventListener('click', () => playTrack(event.currentTarget));
    trackControler.controlers.back.addEventListener('click', () => {
        forward();
    })

});