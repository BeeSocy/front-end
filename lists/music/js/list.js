document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-music-toolbar-toggler').forEach((v) => {
        v.addEventListener('click', () => {
            event.preventDefault();
            let x = event.currentTarget.getBoundingClientRect().left;
            let y = event.currentTarget.getBoundingClientRect().top;

            v.children[1].classList.toggle('active');
            
            if(event.currentTarget.parentElement.parentElement.parentElement.parentElement.classList.contains('side-details')) {
                v.children[1].style.setProperty('top', `${y-80}px`);
                if(window.innerHeight-(y-80) <= 440) {
                    v.children[1].style.setProperty('top', `${y-450}px`);
                }

                if((window.innerWidth - x) <= 165) {
                    v.children[1].style.setProperty('left', `${x - 132}px`);
                }
            }else {
                v.classList.toggle('active');
                v.children[1].style.setProperty('left', `${x}px`);
                if((window.innerWidth - x) <= 165) {
                    v.children[1].style.setProperty('left', `${x - 132}px`);
                }
            }
        });
    });

    document.body.addEventListener('click', () => {
        document.querySelectorAll('.toolbar-menu').forEach((v) => {
            if (v.classList.contains('active')) {
                v.classList.remove('active');
            }
        });
    }, true)
});