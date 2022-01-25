import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.elem();
  }

  elem() {
    const categoriesHtml = this.categories.map(category => {
      return `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>` }
    ).join('')

    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner">
            ${categoriesHtml}
        </nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    const categoryItems = ribbon.querySelectorAll('.ribbon__item');
    for (let categoryItem of categoryItems) {
      categoryItem.addEventListener('click', pickCategory);
      categoryItem.addEventListener('click', this.categoryIsSelected);
    }
    const arrowLeft   = ribbon.querySelector('.ribbon__arrow_left')
    const arrowRight  = ribbon.querySelector('.ribbon__arrow_right')
    const ribbonInner = ribbon.querySelector('.ribbon__inner')

    arrowLeft.addEventListener('click', move)
    arrowRight.addEventListener('click', move)

    function move() {
      ribbonInner.addEventListener('scroll', hideArror);

      if (this.classList.contains('ribbon__arrow_right')) {
        ribbonInner.scrollBy(350, 0)
        arrowLeft.classList.add('ribbon__arrow_visible')
      } else if (this.classList.contains('ribbon__arrow_left')) {
        ribbonInner.scrollBy(-350, 0)
        arrowRight.classList.add('ribbon__arrow_visible')
      }
    }

    function hideArror() {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth
      if (scrollLeft < 1) {
        arrowLeft.classList.remove('ribbon__arrow_visible')
      } else if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible')
      }
    }

    function pickCategory(event) {
      event.preventDefault();
      const selectedCategory = ribbonInner.querySelector('.ribbon__item_active')
      if (selectedCategory) {
        selectedCategory.classList.remove('ribbon__item_active')
      }
      this.classList.add('ribbon__item_active')
    }

    return ribbon;
  }

  categoryIsSelected() {
    if (this.classList.contains('ribbon__item')) {
      const event = new CustomEvent('ribbon-select', {
        detail: this.dataset.id,
        bubbles: true
      })
  
      this.dispatchEvent(event)
    }
  }
}
