import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;

    this.elem();
    this.addEventListeners();
    this.setApproximateValue(value);
  }

  elem() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${'<span></span>'.repeat(this.steps)}
        </div>
      </div>
    `);
  }

  setApproximateValue(value) {
    this.value = value;

    let valuePercents = (this.value / this.segments) * 100;

    this.findSlider('thumb').style.left = `${valuePercents}%`;
    this.findSlider('progress').style.width = `${valuePercents}%`;
    this.findSlider('value').innerHTML = value;

    if (this.findSlider('step-active')) {
      this.findSlider('step-active').classList.remove('slider__step-active');
    }

    this.findSlider('steps').children[this.value].classList.add('slider__step-active');
  }

  addEventListeners() {
    this.elem.onclick = this.onClick;
  }

  onClick = event => {
    let leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    this.setApproximateValue(Math.round(this.segments * leftRelative));
    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }

  findSlider(class_name) {
    return this.elem.querySelector(`.slider__${class_name}`);
  }
}
