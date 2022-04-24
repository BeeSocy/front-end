document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.js-music-toolbar-toggler').forEach((v) => {
        v.addEventListener('click', () => {
            event.preventDefault();
            v.children[1].classList.toggle('active');
        });
    });

    document.body.addEventListener('click', () => {
        if ((!(event.target.classList.contains('js-music-toolbar-toggler'))) && (!(event.target.classList.contains('icon')))) {
            document.querySelectorAll('.toolbar-menu').forEach((v) => {
                if (v.classList.contains('active')) {
                    v.classList.remove('active');
                }
            });
        }
    }, true)

    let i = 1;
    let on = false;
    let equivalent = 1;
    let timer;
    function autoScroll(distance, seconds) {
        document.querySelector('#progress').style.animationDuration = `${seconds}s`
        timer = setInterval(() => {
            if (on) {
                window.scrollTo({ top: distance*equivalent, left: 0, behavior: 'smooth' });
                i++;
            } else {
                clearInterval(timer);
            }
        }, seconds * 1000);
    }
    
    document.querySelector('#auto-scroll').addEventListener('click', () => {
        document.querySelector('#progress').classList.toggle('active');
        if (event.currentTarget.checked) {
            on = true;

            document.querySelector('#progress-bar').style.animationName = '';
            document.querySelector('#progress-bar').classList.remove('active');
            setTimeout(() => {
                document.querySelector('#progress-bar').style.animationName = 'alert';
                document.querySelector('#progress-bar').classList.add('active');
            }, 1);
            document.querySelector('#progress-bar').setAttribute('title', 'Rolagem automática ativada');

            autoScroll(410, 8);
        } else {
            on = false;

            document.querySelector('#progress-bar').style.animationName = '';
            document.querySelector('#progress-bar').classList.remove('active');
            setTimeout(() => {
                document.querySelector('#progress-bar').style.animationName = 'alert';
                document.querySelector('#progress-bar').classList.add('active');
            }, 1);
            document.querySelector('#progress-bar').setAttribute('title', 'Rolagem automática desativada');

            clearInterval(timer);
        }
    });

    if(window.innerWidth <= 426) {
        document.addEventListener('scroll', () => {
            equivalent = Math.trunc(window.scrollY/410)+1;
        })
    }
});