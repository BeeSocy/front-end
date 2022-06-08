document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.js-side-menu-toggler').forEach((value) => {
        value.addEventListener('click', () => {
            document.querySelector('#side-menu').classList.toggle('active');
        });
    })

    document.querySelector('#side-menu').addEventListener('mouseenter', (e) => {
        e.currentTarget.classList.add('scroll');
    });

    document.querySelector('#side-menu').addEventListener('mouseleave', (e) => {
        e.currentTarget.classList.remove('scroll');
    });

    document.querySelector('#js-show-more').addEventListener('click', () => {
        document.querySelector('#following-menu').classList.toggle('active');
    });

    document.body.className = localStorage.getItem('theme');

    document.querySelector('.theme-btn').addEventListener('click', () => {
        document.body.classList.toggle('light');
        localStorage.setItem('theme', document.body.className);
    })
});
