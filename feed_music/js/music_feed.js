document.addEventListener('DOMContentLoaded', () => {

    let salutation;
    let date = new Date().getHours();

    let carouselContainer = '.carousel';
    let carouselItems = '.carousel-items';
    let carouselLeftArrow = '.arrow-left';
    let carouselRightArrow = '.arrow-right';

    if(date >= 6 && date <= 12) {
        salutation = 'Bom Dia';
    }else if(date > 12 && date <= 18) {
        salutation = 'Boa Tarde';
    }else {
        salutation = 'Boa Noite';
    }

    if(document.querySelector(`${carouselItems}`).children.length) {
        
    }
    
    document.querySelector('.initial-title').innerHTML = salutation;

    document.querySelectorAll('.js-music-toolbar-toggler').forEach((v) => {
        v.addEventListener('click', () => {
            event.preventDefault();
            let position = event.currentTarget.getBoundingClientRect().left
            v.children[1].style.setProperty('left', `${position}px`);
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

    function carousel(element, distance, forward) {
        if(forward) {
            element.scrollTo({ top: 0, left: element.scrollLeft+distance, behavior: 'smooth' })
        }else {
            element.scrollTo({ top: 0, left: element.scrollLeft-distance, behavior: 'smooth' })
        }
    }

    document.querySelectorAll(`${carouselContainer} ${carouselRightArrow}`).forEach((v) => {
        v.addEventListener('click', () => {
            event.preventDefault
            carousel(v.parentElement, v.parentElement.offsetWidth, true);
        })
    })

    document.querySelectorAll(`${carouselContainer} ${carouselLeftArrow}`).forEach((v) => {
        v.addEventListener('click', () => {
            event.preventDefault
            carousel(v.parentElement, v.parentElement.offsetWidth, false);
        })
    })

    document.querySelectorAll(`${carouselContainer}`).forEach((v) => {
        v.addEventListener('scroll', () => {
            if(v.offsetWidth + v.scrollLeft >= v.scrollWidth-1) {
                v.querySelector(`${carouselRightArrow}`).classList.remove('active');
            }else {
                v.querySelector(`${carouselLeftArrow}`).classList.add('active');
                v.querySelector(`${carouselRightArrow}`).classList.add('active');
            }
    
            if(v.scrollLeft <= 0) {
                v.querySelector(`${carouselLeftArrow}`).classList.toggle('active');
            }
        })
    })
});