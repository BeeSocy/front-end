document.addEventListener('DOMContentLoaded', () => {

    let i = 0;

    function slide(element, distance, forward, seta, start) {
        let translate;
        let contentWidth = 0;
        let final = false;

        document.querySelectorAll(`${element} > *`).forEach((v) => {
            contentWidth += v.clientWidth;
        });

        if (window.innerWidth >= 1440 && window) {
            contentWidth = (contentWidth /= 2) + 800;
        } else {
            if (window.innerWidth >= 1024) {
                contentWidth = (contentWidth /= 2) + 1200;
            } else {
                if (window.innerWidth >= 320) {
                    contentWidth = (contentWidth /= 2) + 1600;
                }
            }
        }

        translate = document.querySelector(element).style.transform.toString().replace(/[^0-9]/g, '');

        if ((contentWidth - translate) >= 250 && (contentWidth - translate) <= 550) {
            final = true;
        }

        if (seta) {
            if (i > translate / 260) {
                i = Math.round(i * 0.2);
            }
        }

        if (forward) {
            if (!final) {
                i++;
                document.querySelector(element).style.transform = `translateX(-${i * (260 * distance)}px)`
            }
        } else if (i >= 1) {
            if (final) {
                i = Math.ceil(translate / 260);
            }
            i--;
            document.querySelector(element).style.transform = `translateX(-${i * (260 * distance)}px)`
        }

        if (start) {
            document.querySelector(element).style.transform = "translateX(0)";
            i = 0;
        }

        if (i > 0) {
            document.querySelector('#arrows .left-arrow .btn').classList.add('active');
            document.querySelector('.feed').classList.add('active');
        } else {
            document.querySelector('#arrows .left-arrow .btn').classList.remove('active');
            document.querySelector('.feed').classList.remove('active');
            let delay = setInterval(() => {
                clearInterval(delay);
            }, 150);
        }
    }

    function scrollSlide(element, distance) {
        function checkScrollDirection(event) {
            if (event.wheelDelta) {
                return event.wheelDelta > 0;
            }
            return event.deltaY < 0;
        }

        let translate;
        let contentWidth = 0;
        let final = false;

        document.querySelectorAll(`${element} > *`).forEach((v) => {
            contentWidth += v.clientWidth;
        });

        if (window.innerWidth >= 1440 && window) {
            contentWidth = (contentWidth /= 2) + 800;
        } else {
            if (window.innerWidth >= 1024) {
                contentWidth = (contentWidth /= 2) + 1200;
            } else {
                if (window.innerWidth >= 320) {
                    contentWidth = (contentWidth /= 2) + 1600;
                }
            }
        }

        translate = document.querySelector(element).style.transform.toString().replace(/[^0-9]/g, '');

        if ((contentWidth - translate) >= 250 && (contentWidth - translate) <= 550) {
            final = true;
        }

        if (!checkScrollDirection(event)) {
            if (!final) {
                i++;
                document.querySelector(element).style.transform = `translateX(-${i * (260 * distance)}px)`
            }
        } else if (i >= 1) {
            i--;
            document.querySelector(element).style.transform = `translateX(-${i * (260 * distance)}px)`
        }

        if (i >= 1) {
            document.querySelector('#arrows .left-arrow .btn').classList.add('active');
            document.querySelector('.feed').classList.add('active');
        } else {
            document.querySelector('#arrows .left-arrow .btn').classList.remove('active');
            let delay = setInterval(() => {
                document.querySelector('.feed').classList.remove('active');
                clearInterval(delay);
            }, 150);
        }
    }

    document.querySelector('#feed-controller .right-arrow').addEventListener('click', () => {
        slide('#feed-content', 1, true, true);
    });

    document.querySelector('#feed-controller .right-arrow').addEventListener('click', () => {
        document.querySelector('#feed-controller .tip').classList.toggle('active');
    }, {once: true,});

    document.querySelector('#feed-controller .tip').addEventListener('click', () => {
        event.currentTarget.classList.remove('active');
    })
    
    document.querySelector('#feed-controller .left-arrow').addEventListener('click', () => {
        slide('#feed-content', 1, false, true);
    });

    document.querySelector('#feed-content-container').addEventListener('wheel', () => {
        scrollSlide('#feed-content', 1);
        event.preventDefault();
    });

    document.querySelector('#feed-header .return').addEventListener('click', () => {
        slide('#feed-content', 1, false, false, true);
        document.querySelector('#feed-content').scroll(0, 0);
    });

    let distanceRes = window.innerWidth <= 1024.6 ? 4 : 5;
    let z = distanceRes + 1;
    const parent = '#languages-carousel';
    const child = '.item';

    for (let x = 1; x <= distanceRes; x++) {
        document.querySelector(`${parent} > ${child}:nth-child(${x + 1})`).classList.add('active');
    }

    function languageSlide(parent, child, forward, distance) {
        let childs = 0;

        document.querySelectorAll(`${parent} > ${child}`).forEach(() => {
            childs++;
        });;

        if (forward) {
            if (z - 1 < childs) {
                document.querySelectorAll(`${parent} > ${child}`).forEach((v) => {
                    v.classList.remove('active');
                });

                for (let x = 1; x <= distance; x++) {
                    z++;

                    if (document.querySelector(`${parent} > ${child}:nth-child(${z})`)) {
                        document.querySelector(`${parent} > ${child}:nth-child(${z})`).classList.add('active');
                    }
                }
            }
        }else {
            if(z > distance+1) {
                document.querySelectorAll(`${parent} > ${child}`).forEach((v) => {
                    v.classList.remove('active');
                });

                z-=distance*2;

                for (let x = 1; x <= distance; x++) {
                    z++;

                    if (document.querySelector(`${parent} > ${child}:nth-child(${z})`)) {
                        document.querySelector(`${parent} > ${child}:nth-child(${z})`).classList.add('active');
                    }
                }
            }
        }

        if (z > childs) {
            document.querySelector('#languages-carousel .right-arrow .arrow').classList.remove('active');
        } else {
            document.querySelector('#languages-carousel .right-arrow .arrow').classList.add('active');
        }

        if (z > distance + 1) {
            document.querySelector('#languages-carousel .left-arrow .arrow').classList.add('active');
        } else {
            document.querySelector('#languages-carousel .left-arrow .arrow').classList.remove('active');
        }
    }

    document.querySelector('#languages-carousel .right-arrow').addEventListener('click', () => {
        languageSlide(parent, child, true, distanceRes);
    });

    document.querySelector('#languages-carousel .left-arrow').addEventListener('click', () => {
        languageSlide(parent, child, false, distanceRes);
    });

});