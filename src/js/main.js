import MainSlider from './modules/slider/slider-main';
import MiniSlider from './modules/slider/slider-mini';
import VideoPlayer from './modules/playVideo';
import Difference from './modules/difference';
import Form from './modules/forms';
import ShowInfo from './modules/showInfo';
import Download from './modules/download';

window.addEventListener('DOMContentLoaded', () => {
    'strict mode';
    const slider = new MainSlider({
            container: '.page',
            btns: '.next'
          }),

          moduleSlider = new MainSlider({
            container: '.moduleapp',
            btns: '.next',
            prev: '.prevmodule',
            next: '.nextmodule'
          }),

          showUpSlider = new MiniSlider({
            container: ".showup__content-slider", 
            prev: ".showup__prev", 
            next: ".showup__next",
            activeClass: 'card-active',
            animate: true
          }),
          
          modulesSlider = new MiniSlider({
            container: ".modules__content-slider", 
            prev: ".modules__info-btns .slick-prev", 
            next: ".modules__info-btns .slick-next",
            activeClass: 'card-active',
            animate: true,
            autoplay: true
          }),

          feedSlider = new MiniSlider({
            container: ".feed__slider", 
            prev: ".feed__slider .slick-prev", 
            next: ".feed__slider .slick-next",
            activeClass: 'feed__item-active'
          }),

          videoPlayer = new VideoPlayer('.showup .play', '.overlay'),

          modulesVideoPlayer = new VideoPlayer('.module__video-item .play', '.overlay'),

          difference = new Difference('.officerold', '.officernew', '.officer__card-item'),

          form = new Form(),

          download = new Download('.download'),

          showInfo = new ShowInfo('.module__info-show');

    slider.render();
    moduleSlider.render();
    showUpSlider.init(); 
    modulesSlider.init();
    feedSlider.init();
    videoPlayer.init();
    modulesVideoPlayer.init();
    difference.init();
    form.init();
    showInfo.init();
    download.init();
});