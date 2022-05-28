document.addEventListener('DOMContentLoaded', () => {

    function autoScroll(element, distance, seconds) {
        timer = setInterval(() => {
            document.querySelector(element).scrollTo({ top: 0, left: document.querySelector(element).scrollLeft+distance, behavior: 'smooth' })
        }, seconds * 1000);
    }

    autoScroll('#image-categories', 200, 5);

    document.querySelector('#image-categories').addEventListener('scroll', () => {
        if(event.currentTarget.scrollLeft >= 10) {
            document.querySelector('#image-categories .scroll-blur.left').classList.add('active');
        }else {
            document.querySelector('#image-categories .scroll-blur.left').classList.remove('active');
        }
    })
});