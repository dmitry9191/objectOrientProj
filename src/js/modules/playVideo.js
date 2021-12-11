export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }

    createPlayer(url) {
        this.videoPlayer = new YT.Player('frame', { // создается плеер через объект YT который подгружается в init. frame - id элемента верстки для плеера
            height: '100%',
            width: '100%',
            videoId: url
        });

        this.overlay.style.display = 'flex';
    }

    init() {
        const tag = document.createElement('script'),
              firstScriptTag = document.getElementsByTagName('script')[0];

        tag.src = "https://www.youtube.com/iframe_api";
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const path = btn.getAttribute('data-url');

                this.createPlayer(path);
            })
        })
    }
}