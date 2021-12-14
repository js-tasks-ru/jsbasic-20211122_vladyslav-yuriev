function initCarousel() {
  const innerCarousel = document.querySelector('.carousel__inner');
  const imageWidth = innerCarousel.offsetWidth;
  const images = innerCarousel.children;
  images[0].classList.add('current-image');

  const btnLeft  = document.querySelector('.carousel__arrow_left');
  const btnRight = document.querySelector('.carousel__arrow_right');

  btnLeft.style.display = 'none';

  btnLeft.addEventListener('click', e => {
    hideArrowBtn(e);
    const translateX = Number(innerCarousel.style.transform.replace(/[^-\d.]/g, ''));
    let positionToMove = 0;
    (translateX === 0) ? positionToMove = imageWidth : positionToMove = translateX + imageWidth;
    innerCarousel.style.transform = `translateX(${positionToMove}px)`
  });

  btnRight.addEventListener('click', e => {
    hideArrowBtn(e);
    const translateX = Number(innerCarousel.style.transform.replace(/[^-\d.]/g, ''));
    let positionToMove = 0;
    (translateX === 0) ? positionToMove = -imageWidth : positionToMove = translateX - imageWidth;
    innerCarousel.style.transform = `translateX(${positionToMove}px)`
  });

  function hideArrowBtn(event) {
    const currentImage = document.querySelector('.current-image');

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
};