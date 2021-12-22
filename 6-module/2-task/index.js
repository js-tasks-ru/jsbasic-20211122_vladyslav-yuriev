export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.elem();
  }

  elem() {
    const card = document.createElement('div');
    const cardTop = document.createElement('div');
    const cardBody = document.createElement('div');
  
    const cardTopData = 
      `<img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
       <span class="card__price">€${this.product.price.toFixed(2)}</span>`;
  
    cardTop.innerHTML = cardTopData;
    card.append(cardTop);
  
    const cardBodyData = 
      `<div class="card__title">${this.product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>`
  
    cardBody.innerHTML = cardBodyData;
    card.append(cardBody)

    const event = new CustomEvent('product-add', {
      detail: this.product.id,
      bubbles: true
    });

    Array.from(card.getElementsByClassName('card__button')).forEach(cardBtn => {
      cardBtn.addEventListener('click', () => { cardBtn.dispatchEvent(event) })
    });

    return card;
  }
}