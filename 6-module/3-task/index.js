import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.elem();
  }

  elem() {
    const slidesHtml = this.slides.map(slide => {
      return `<div class="carousel__slide" data-id="${slide.id}">
                <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
                <div class="carousel__caption">
                  <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                  <div class="carousel__title">${slide.name}</div>
                  <button type="button" class="carousel__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                  </button>
                </div>
              </div>`
    }).join('')
    const carousel = createElement(`
        <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </div>
          <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
          </div>
      
          <div class="carousel__inner">
            ${slidesHtml}
          </div>
        </div>
    `)

    let addProductBtns = carousel.querySelectorAll('.carousel__button');
    for (let btn of addProductBtns) {
      btn.addEventListener('click', this.addProduct);
    }
    
    const btnLeft = carousel.querySelector('.carousel__arrow_left');
    const btnRight = carousel.querySelector('.carousel__arrow_right');
    btnLeft.style.display = 'none'

    const innerCarousel = carousel.querySelector('.carousel__inner');
    innerCarousel.children[0].classList.add('current-image');
    
    btnLeft.addEventListener('click', e => {
      hideArrowBtn(e);
      const translateX = Number(carousel.querySelector('.carousel__inner').style.transform.replace(/[^-\d.]/g, ''));
      let positionToMove = 0;
      let imageWidth = carousel.querySelector('.carousel__inner').offsetWidth;
      (translateX === 0) ? positionToMove = imageWidth : positionToMove = translateX + imageWidth;
      innerCarousel.style.transform = `translateX(${positionToMove}px)`
    });
  
    btnRight.addEventListener('click', e => {
      hideArrowBtn(e);
      const translateX = Number(carousel.querySelector('.carousel__inner').style.transform.replace(/[^-\d.]/g, ''));
      let positionToMove = 0;
      let imageWidth = carousel.querySelector('.carousel__inner').offsetWidth;
      (translateX === 0) ? positionToMove = -imageWidth : positionToMove = translateX - imageWidth;
      innerCarousel.style.transform = `translateX(${positionToMove}px)`
    });


    function hideArrowBtn(event) {
      const currentImage = carousel.querySelector('.current-image');
  
      if (event.currentTarget.classList.contains('carousel__arrow_right')) {
        const nextImage = currentImage.nextElementSibling;
        nextImage.classList.add('current-image');
        if (nextImage.nextElementSibling === null) {
          document.querySelector('.carousel__arrow_right').style.display = 'none';
        } else {
          document.querySelector('.carousel__arrow_left').style.display = '';
        }
      } else if (event.currentTarget.classList.contains('carousel__arrow_left')) {
        const prevImage = currentImage.previousElementSibling;
        prevImage.classList.add('current-image');
        if (prevImage.previousElementSibling === null) {
          document.querySelector('.carousel__arrow_left').style.display = 'none';
        } else {
          document.querySelector('.carousel__arrow_right').style.display = '';
        }
      }
  
      currentImage.classList.remove('current-image');
    };

    return carousel;
  }

  addProduct() {
    if (this.classList.contains('carousel__button')) {
      const event = new CustomEvent('product-add', {
        detail: this.closest('.carousel__slide').dataset.id,
        bubbles: true
      })
  
      this.dispatchEvent(event)
    }
  }
}
