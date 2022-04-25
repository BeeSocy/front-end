document.addEventListener('DOMContentLoaded', () => {

    function autoScroll(element, distance, seconds) {
        timer = setInterval(() => {
            document.querySelector(element).scrollTo({ top: 0, left: document.querySelector(element).scrollLeft+distance, behavior: 'smooth' })
        }, seconds * 1000);
    }

    autoScroll('#image-categories', 200, 5);
});