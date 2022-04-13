document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.js-music-toolbar-toggler').forEach((v) => {
        v.addEventListener('click', () => {
            v.children[1].classList.toggle('active');
        });
    });
    
    document.body.addEventListener('click', () => {
        document.querySelectorAll('.toolbar-menu').forEach((v) => {
            if(v.classList.contains('active')) {
                v.classList.remove('active');
            }
        });
    }, true)
});