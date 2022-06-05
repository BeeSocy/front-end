document.addEventListener('DOMContentLoaded', () => {
    let trackControler =
    {
        track: document.querySelector('.track'),
        loaded: false,
        playing: false,
        repeat: 'off',
        shuffle: false,
        shuffleOrder: [],
        src: '',
        cover: '',
        title: '',
        artist: [],
        explict: false,
        currentMusic: 1,
        currentPosition: 1,
        musicPath: '../assets/files/',
        coverPath: '../assets/img/',
        volume: 0,
        currentTime: 0,
        finalTime: 0,

        controlers:
        {
            cover: document.querySelector('.player .cover'),
            title: document.querySelectorAll('.player .title, .big-player-mobile .music-details .title'),
            artist: document.querySelectorAll('.player .artist-description, .big-player-mobile .artist-description'),
            explicit: document.querySelectorAll('.player .explicit', '.big-player-mobile .explicit'),
            repeat: document.querySelectorAll('.js-repeat'),
            shuffle: document.querySelectorAll('.js-shuffle'),
            back: document.querySelectorAll('.js-previous'),
            next: document.querySelectorAll('.js-next'),
            play: document.querySelectorAll('.js-play'),
            timeBar: document.querySelectorAll('.time-bar'),
            currentTime: document.querySelectorAll('.current-time'),
            endTime: document.querySelectorAll('.end-time')
        },

        volumeItens:
        {
            bar: document.querySelector('.volume'),
            icon: document.querySelector('.volume-icon')
        },

        trackList:
        {
            1:
            {
                id: 27,
                title: 'Tato e Sutileza',
                artist: ['MD Chefe', 'Negra Li'],
                explicit: false,
                audio: '1.mp3',
                cover: '1.jfif'
            },

            2:
            {
                id: 427,
                title: 'Mirante',
                artist: ['Tz da Coronel', 'Borges', 'Neo Beats'],
                explicit: true,
                audio: '2.mp3',
                cover: '3.jpg'
            },

            3:
            {
                id: 21,
                title: 'A Cara do Crime 3',
                artist: ['MC Poze do Rodo', 'Bielzin', 'Felipe Ret', 'Orochi', 'Mainstreat', 'Neo Beats'],
                explicit: true,
                audio: '3.mp3',
                cover: '2.jpg'
            }
        }
    }

    function getMusic(id) {
        return trackControler.trackList[id];
    }

    function getTrackListLength() {
        return Object.keys(trackControler.trackList).length;
    }

    function setInTrackList(position, id, title, artist, explicit, audio, cover) {
        let length = getTrackListLength();
        for (let i = length; i >= position; i--) {
            trackControler.trackList[i + 1] = trackControler.trackList[i];
        }
        trackControler.trackList[position] =
        {
            id: id,
            title: title,
            artist: artist,
            explicit: explicit,
            audio: audio,
            cover: cover
        }
    }

    function formartArtist(artistArray) {
        let str = '';
        artistArray.forEach((value, key) => {
            str += value;
            if (key == artistArray.length - 2) {
                str += ' e ';
            } else if (key != artistArray.length - 1) {
                str += ', ';
            }
        });

        return str;
    }

    function applyMusic(position) {
        trackControler.title = getMusic(position).title;
        trackControler.artist = getMusic(position).artist;
        trackControler.explict = getMusic(position).explicit;
        trackControler.src = getMusic(position).audio;
        trackControler.cover = getMusic(position).cover;
        trackControler.currentMusic = position;
        trackControler.currentTime = 0;

        trackControler.controlers.title.forEach((value) => {
            value.innerHTML = trackControler.title;
        })

        trackControler.controlers.artist.forEach((value) => {
            value.innerHTML = '';
            value.innerHTML = formartArtist(trackControler.artist);
        })

        trackControler.controlers.explicit.forEach((value) => {
            value.hidden = !trackControler.explict;
        })
        changeVolume(trackControler.volume, trackControler.volumeItens.bar);
        trackControler.track.src = `${trackControler.musicPath}${trackControler.src}`;
        trackControler.controlers.cover.style.backgroundImage = `url(${trackControler.coverPath}${trackControler.cover})`;
        trackControler.track.currentTime = 0;
        document.querySelector('.big-player .cover').style.backgroundImage = `url(${trackControler.coverPath}${trackControler.cover})`
        document.querySelector('.big-player-mobile .cover').style.backgroundImage = `url(${trackControler.coverPath}${trackControler.cover})`
        
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: trackControler.title,
                artist: formartArtist(trackControler.artist),
                album: 'Single',
                artwork: [
                    { src: `${trackControler.coverPath}${trackControler.cover}`, sizes: '96x96', type: 'image/png' },
                    { src: `${trackControler.coverPath}${trackControler.cover}`, sizes: '128x128', type: 'image/png' },
                    { src: `${trackControler.coverPath}${trackControler.cover}`, sizes: '192x192', type: 'image/png' },
                    { src: `${trackControler.coverPath}${trackControler.cover}`, sizes: '256x256', type: 'image/png' },
                    { src: `${trackControler.coverPath}${trackControler.cover}`, sizes: '384x384', type: 'image/png' },
                    { src: `${trackControler.coverPath}${trackControler.cover}`, sizes: '512x512', type: 'image/png' },
                ]
            });
        }
    }

    function startPlayer() {
        applyMusic(1);
        trackControler.track.load();
        trackControler.loaded = true;
        trackControler.volume = trackControler.track.volume;
        changeVolume(50, trackControler.volumeItens.bar);

        trackControler.track.addEventListener('loadedmetadata', () => {
            trackControler.currentTime = 0;
            trackControler.finalTime = trackControler.track.duration;

            finalTime = trackControler.finalTime

            trackControler.controlers.endTime.forEach((value) => {
                value.innerHTML = secondsFormat(finalTime);
            })

            trackControler.controlers.timeBar.forEach((value) => {
                value.max = finalTime;
            })
            trackControler.controlers.timeBar.forEach((value) => {
                value.step = finalTime / value.max;
            })
            document.querySelector('.player').classList.add('active');
        })

        let i = 0;
        for (const key in trackControler.trackList) {
            trackControler.shuffleOrder[i] = key;
            i++;
        }

        for (const key in trackControler.shuffleOrder) {
            let track = trackControler.trackList[trackControler.shuffleOrder[key]];

            document.querySelector('.big-player .side-details').appendChild(createTrackListItem(`${trackControler.coverPath}${track.cover}`, track.title, `${track.explicit}`, track.artist));
            document.querySelector('.big-player-mobile .side-details').appendChild(createTrackListItem(`${trackControler.coverPath}${track.cover}`, track.title, `${track.explicit}`, track.artist));

        }
        toolbarEvent();
        playMusicInTrackList();
    }

    function toolbarEvent() {
        document.querySelectorAll('.js-music-toolbar-toggler').forEach((v) => {
            v.addEventListener('click', () => {
                event.preventDefault();
                let x = event.currentTarget.getBoundingClientRect().left;
                let y = event.currentTarget.getBoundingClientRect().top;


                if (event.currentTarget.parentElement.parentElement.parentElement.parentElement.classList.contains('side-details')) {
                    v.children[1].classList.toggle('active');
                    v.children[1].style.setProperty('top', `${y - 80}px`);
                    if (window.innerHeight - (y - 80) <= 440) {
                        v.children[1].style.setProperty('top', `${y - 450}px`);
                    }

                    if ((window.innerWidth - x) <= 165) {
                        v.children[1].style.setProperty('left', `${x - 132}px`);
                    }
                } else {
                    v.classList.toggle('active');
                    v.children[1].style.setProperty('left', `${x}px`);
                    if ((window.innerWidth - x) <= 165) {
                        v.children[1].style.setProperty('left', `${x - 132}px`);
                    }
                }
            });
        });
    }

    function createElement(elementName, className) {
        let element = document.createElement(elementName);
        element.className = className;

        return element;
    }

    function createTrackListItem(cover, title, explicit, artist) {
        let queueIcon = createElement('span', 'material-icons icon');
        queueIcon.innerHTML = 'queue_music';
        let queueDesc = createElement('span', '');
        queueDesc.innerHTML = 'Adicionar à fila';
        let queue = createElement('li', 'menu-item queue');
        queue.appendChild(queueIcon);
        queue.appendChild(queueDesc);

        let playNowIcon = createElement('span', 'material-icons icon');
        playNowIcon.innerHTML = 'playlist_play';
        let playNowDesc = createElement('span', '');
        playNowDesc.innerHTML = 'Tocar a seguir';
        let playNow = createElement('li', 'menu-item queue');
        playNow.appendChild(playNowIcon);
        playNow.appendChild(playNowDesc);

        let playlistAddIcon = createElement('span', 'material-icons icon');
        playlistAddIcon.innerHTML = 'playlist_add';
        let playlistAddDesc = createElement('span', '');
        playlistAddDesc.innerHTML = 'Adicionar à playlist';
        let playlistAdd = createElement('li', 'menu-item queue');
        playlistAdd.appendChild(playlistAddIcon);
        playlistAdd.appendChild(playlistAddDesc);

        let favoriteIcon = createElement('span', 'material-icons icon');
        favoriteIcon.innerHTML = 'favorite_border';
        let favoriteDesc = createElement('span', '');
        favoriteDesc.innerHTML = 'Curtir';
        let favorite = createElement('li', 'menu-item queue');
        favorite.appendChild(favoriteIcon);
        favorite.appendChild(favoriteDesc);

        let shareIcon = createElement('span', 'material-icons icon');
        shareIcon.innerHTML = 'share';
        let shareDesc = createElement('span', '');
        shareDesc.innerHTML = 'Compartilhar';
        let share = createElement('li', 'menu-item queue');
        share.appendChild(shareIcon);
        share.appendChild(shareDesc);

        let saveIcon = createElement('span', 'material-icons icon');
        saveIcon.innerHTML = 'bookmark_border';
        let saveDesc = createElement('span', '');
        saveDesc.innerHTML = 'Salvar';
        let save = createElement('li', 'menu-item queue');
        save.appendChild(saveIcon);
        save.appendChild(saveDesc);

        let reportIcon = createElement('span', 'material-icons-outlined icon');
        reportIcon.innerHTML = 'flag';
        let reportDesc = createElement('span', '');
        reportDesc.innerHTML = 'Denunciar';
        let report = createElement('li', 'menu-item queue');
        report.appendChild(reportIcon);
        report.appendChild(reportDesc);

        let toolbarMenu = createElement('ul', 'toolbar-menu');
        toolbarMenu.appendChild(queue);
        toolbarMenu.appendChild(playNow);
        toolbarMenu.appendChild(playlistAdd);
        toolbarMenu.appendChild(favorite);
        toolbarMenu.appendChild(share);
        toolbarMenu.appendChild(save);
        toolbarMenu.appendChild(report);

        let toolbarIcon = createElement('span', 'material-icons icon');
        toolbarIcon.innerHTML = 'more_vert'

        let toolbarButton = createElement('button', 'toolbar js-music-toolbar-toggler');
        toolbarButton.appendChild(toolbarIcon);
        toolbarButton.appendChild(toolbarMenu);

        let artistDescription = createElement('span', 'artist-description');
        artistDescription.innerHTML = formartArtist(artist);

        let explicitIcon = createElement('span', 'material-icons-round icon explicit');
        explicitIcon.innerHTML = 'explicit';
        if (explicit == 'false') {
            explicitIcon.hidden = true;
        }

        let artistDiv = createElement('div', 'artist');
        artistDiv.appendChild(explicitIcon);
        artistDiv.appendChild(artistDescription);

        let detailsTitle = createElement('span', 'title');
        detailsTitle.innerHTML = title;

        let detailsDiv = createElement('section', 'details');
        detailsDiv.appendChild(detailsTitle);
        detailsDiv.appendChild(artistDiv);

        let playIcon = createElement('span', 'material-icons icon');
        playIcon.innerHTML = 'play_arrow';

        let playButton = createElement('a', 'play-button');
        playButton.appendChild(playIcon);

        let coverMenu = createElement('div', 'menu');
        coverMenu.appendChild(playButton);

        let coverDiv = createElement('div', 'cover');
        coverDiv.style.backgroundImage = `url(${cover})`
        coverDiv.appendChild(coverMenu);

        let musicCard = createElement('div', 'card music-card');
        musicCard.appendChild(coverDiv);
        musicCard.appendChild(detailsDiv)
        musicCard.appendChild(toolbarButton);

        let media = createElement('div', 'media');
        media.appendChild(musicCard)

        let h1 = createElement('div', 'h-1');
        h1.appendChild(media);

        return h1;
    }

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

    let timer;
    function startTime() {
        if (trackControler.playing == false) {
            timer = setInterval(() => {
                trackControler.currentTime = trackControler.track.currentTime;
                trackControler.controlers.currentTime.forEach((value) => {
                    value.innerHTML = secondsFormat(getCurrentTime());
                });

                trackControler.controlers.timeBar.forEach((value) => {
                    value.value = trackControler.currentTime;
                    changeRangeStyle(value, 'var(--bg-light)', 'var(--yellow-bee)');
                })

            }, 1130);
        } else {
            clearInterval(timer);
        }
    }

    function playControl(play) {
        if (play) {
            startTime();

            trackControler.controlers.play.forEach((value) => {
                value.classList.add('playing')
            })

            trackControler.playing = true;
        } else {
            clearInterval(timer);
            trackControler.playing = false;
            trackControler.controlers.play.forEach((value) => {
                value.classList.remove('playing')
            })
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
        trackControler.controlers.currentTime.forEach((value) => {
            value.innerHTML = secondsFormat(getCurrentTime());
        })
        trackControler.controlers.timeBar.forEach((value) => {
            value.value = seconds;
            changeRangeStyle(value, 'var(--bg-light)', 'var(--yellow-bee)');
        })
    }

    function getCurrentTime() {
        return trackControler.currentTime;
    }

    function getPlayingState() {
        return trackControler.playing;
    }

    function applyMusicPlay(position) {
        applyMusic(position);
        clearInterval(timer);
        trackControler.playing = false;
        playTrack();
    }

    function forward() {
        if (trackControler.currentTime <= 4 && trackControler.currentPosition != 1) {
            trackControler.currentPosition -= 1;
            applyMusicPlay(trackControler.shuffleOrder[trackControler.currentPosition - 1]);
        }

        if (getRepeatStatus() == 'one') {
            trackControler.controlers.repeat.forEach((value) => {
                repeat('on', value);
            })
        }
        setTime(0);
    }

    function next() {
        if (trackControler.shuffle) {
            if (trackControler.currentPosition == getTrackListLength()) {
                trackControler.currentPosition = 1;
                applyMusicPlay(trackControler.shuffleOrder[trackControler.currentPosition - 1]);
            } else {
                trackControler.currentPosition += 1;
                applyMusicPlay(trackControler.shuffleOrder[trackControler.currentPosition - 1]);
            }
        } else {
            if (trackControler.currentPosition != getTrackListLength()) {
                trackControler.currentPosition += 1;
                applyMusicPlay(trackControler.shuffleOrder[trackControler.currentPosition - 1]);
            } else if (getRepeatStatus() == 'on') {
                trackControler.currentPosition = 1;
                applyMusicPlay(trackControler.shuffleOrder[trackControler.currentPosition - 1]);
            }
        }

        if (getRepeatStatus() == 'one') {
            trackControler.controlers.repeat.forEach((value) => {
                repeat('on', value);
            })
        }
        setTime(0);
    }

    function endTrack() {
        if (trackControler.currentPosition != getTrackListLength()) {
            next();
        } else if (getRepeatStatus() == 'on') {
            trackControler.currentPosition = 1;
            applyMusicPlay(trackControler.shuffleOrder[trackControler.currentPosition - 1]);
        }
    }

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function shuffle(icon) {
        trackControler.shuffle = !trackControler.shuffle;
        icon.classList.toggle('active');

        let order = trackControler.shuffleOrder;
        let tmpTrack = trackControler.shuffleOrder[trackControler.currentPosition - 1];
        order.splice(trackControler.currentPosition - 1, 1);
        shuffleArray(order);

        if (trackControler.currentPosition - 1 == 0) {
            order.unshift(tmpTrack);
        } else if (trackControler.currentPosition - 1 == order.length) {
            order.push(tmpTrack);
        } else {

            for (let i = order.length; i >= trackControler.currentPosition; i--) {
                order[i] = order[i - 1];
            }
            order[trackControler.currentPosition - 1] = tmpTrack
        }


        document.querySelectorAll('.big-player .side-details > *').forEach((value) => {
            if (value.classList.contains('h-1')) {
                document.querySelector('.big-player .side-details').removeChild(value);
            }
        })

        document.querySelectorAll('.big-player-mobile .side-details > *').forEach((value) => {
            if (value.classList.contains('h-1')) {
                document.querySelector('.big-player-mobile .side-details').removeChild(value);
            }
        })
        for (const key in trackControler.shuffleOrder) {
            let track = trackControler.trackList[trackControler.shuffleOrder[key]];

            document.querySelector('.big-player .side-details').appendChild(createTrackListItem(`${trackControler.coverPath}${track.cover}`, track.title, `${track.explicit}`, track.artist));
            document.querySelector('.big-player-mobile .side-details').appendChild(createTrackListItem(`${trackControler.coverPath}${track.cover}`, track.title, `${track.explicit}`, track.artist));
        }
        toolbarEvent();
        playMusicInTrackList();
    }

    trackControler.controlers.timeBar.forEach((value) => {
        value.addEventListener('input', () => {
            changeRangeStyle(event.currentTarget, 'var(--bg-light)', 'var(--yellow-bee)');
            setTime(event.currentTarget.value * event.currentTarget.step, event.currentTarget);
        });
    })

    trackControler.volumeItens.bar.addEventListener('input', () => {
        changeVolume(event.currentTarget.value, event.currentTarget);
    })

    trackControler.volumeItens.icon.addEventListener('mousedown', () => {
        event.preventDefault;
        mute();
        trackControler.volumeItens.bar.value = getVolume();
        changeRangeStyle(trackControler.volumeItens.bar, 'var(--bg-light)', 'var(--text)');
    })

    trackControler.controlers.repeat.forEach((value) => {
        value.addEventListener('click', () => {
            if (getRepeatStatus() == 'off') {
                repeat('on', event.currentTarget);
            } else if (getRepeatStatus() == 'on') {
                repeat('one', event.currentTarget);
            } else if (getRepeatStatus() == 'one') {
                repeat('off', event.currentTarget);
            }
        })
    })

    trackControler.track.addEventListener('play', () => playControl(true));
    trackControler.track.addEventListener('pause', () => playControl(false));
    trackControler.track.addEventListener('ended', () => endTrack());
    trackControler.track.addEventListener('timeupdate', () => {
        if (event.currentTarget.currentTime >= trackControler.finalTime - 1) {
            trackControler.controlers.timeBar.forEach((value) => {
                value.value = 0;
            })
        }
    })

    trackControler.controlers.play.forEach((value) => {
        value.addEventListener('click', () => playTrack());
    })
    trackControler.controlers.back.forEach((value) => {
        value.addEventListener('click', () => forward());
    })
    trackControler.controlers.next.forEach((value) => {
        value.addEventListener('click', () => next())

    })
    trackControler.controlers.shuffle.forEach((value) => {
        value.addEventListener('click', () => {
            shuffle(event.currentTarget);
            playMusicInTrackList();
        });
    })

    let notClick = []

    for (const key in trackControler.controlers) {
        if (key != 'cover' && key != 'artist' && key != 'title' && key != 'explicit') {
            if (trackControler.controlers[key]) {
                trackControler.controlers[key].forEach((value) => {
                    notClick.push(value);
                    if (value.children.length > 0) {
                        notClick.push(value.children[0])
                    }
                })
            }
        }
    }

    for (const key in trackControler.volumeItens) {
        if (trackControler.volumeItens[key]) {
            notClick.push(trackControler.volumeItens[key]);
            if (trackControler.volumeItens[key].children.length > 0) {
                notClick.push(trackControler.volumeItens[key].children[0])
            }
        }
    }

    function showBigPlayer() {
        document.querySelector('.js-open').classList.toggle('active');
        document.querySelector('#content-container').classList.toggle('active');

        if (window.innerWidth <= 768.6) {
            document.querySelector('.big-player-mobile').classList.toggle('active');
        } else {
            document.querySelector('.big-player').classList.toggle('active');
        }
    }

    document.querySelector('.player').addEventListener('click', () => {
        if (!notClick.includes(event.target)) {
            showBigPlayer();
        }
    });


    document.querySelector('.big-player .js-close').addEventListener('click', () => showBigPlayer());
    document.querySelector('.big-player-mobile .js-close').addEventListener('click', () => showBigPlayer());

    document.querySelectorAll('#content-container .play-button').forEach((value) => {
        value.addEventListener('click', () => {
            if (!document.querySelector('.player').classList.contains('active')) {
                startPlayer();
            }
        });
    })


    function playMusicInTrackList() {
        document.querySelectorAll('.big-player .side-details .play-button').forEach((value) => {
            value.addEventListener('click', () => {
                let trackItens = [];
                document.querySelectorAll('.big-player .side-details .play-button').forEach((itens) => {
                    trackItens.push(itens.parentElement.parentElement.style.backgroundImage);
                });
                let position = trackItens.indexOf(event.currentTarget.parentElement.parentElement.style.backgroundImage)
                applyMusicPlay(trackControler.shuffleOrder[position]);
                trackControler.currentPosition = position + 1;
                setTime(0);
                if (getRepeatStatus() == 'one') {
                    trackControler.controlers.repeat.forEach((value) => {
                        repeat('on', value);
                    })
                }
            })
        });

        document.querySelectorAll('.big-player-mobile .side-details .play-button').forEach((value) => {
            value.addEventListener('click', () => {
                let trackItens = [];
                document.querySelectorAll('.big-player-mobile .side-details .play-button').forEach((itens) => {
                    trackItens.push(itens.parentElement.parentElement.style.backgroundImage);
                });
                let position = trackItens.indexOf(event.currentTarget.parentElement.parentElement.style.backgroundImage)
                applyMusicPlay(trackControler.shuffleOrder[position]);
                trackControler.currentPosition = position + 1;
                setTime(0);
                if (getRepeatStatus() == 'one') {
                    trackControler.controlers.repeat.forEach((value) => {
                        repeat('on', value);
                    })
                }
            })
        });
    }

    document.querySelector('.big-player-mobile .side-details').addEventListener('touchstart', () => {
        document.querySelector('.big-player-mobile').scrollTo({ top: document.querySelector('.big-player-mobile').scrollHeight, left: 0, behavior: 'smooth' })
    })

    playMusicInTrackList();
    toolbarEvent();

    if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', () => { playTrack() });
        navigator.mediaSession.setActionHandler('pause', () => { playTrack() });
        navigator.mediaSession.setActionHandler('previoustrack', () => { forward() });
        navigator.mediaSession.setActionHandler('nexttrack', () => { next() });
    }
});