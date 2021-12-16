import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        [].forEach.call(this.slides, slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });
        this.slides[0].classList.add(this.activeClass); 
        
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }

    nextSlide() {
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
        [].forEach.call(this.slides, slide => {
            if (slide.tagName === "BUTTON") {
                this.container.appendChild(slide);
            }
        });
    }

    manageAnimate() {
        let slideNextInterval;

        if (this.autoplay) {
            slideNextInterval = setInterval(() => this.nextSlide(), 5000); 
        }

        this.container.addEventListener('mouseenter', () => {
            clearInterval(slideNextInterval);
        });

        this.container.addEventListener('mouseleave', () => {
            if (this.autoplay) {
                slideNextInterval = setInterval(() => this.nextSlide(), 5000); 
            }
        });
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();
            this.manageAnimate();        
        } catch(e) {}
    } 
}
 


