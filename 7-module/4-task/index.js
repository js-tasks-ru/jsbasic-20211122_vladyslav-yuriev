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
    let valuePercents = (value / this.segments) * 100;

    this.findSlider('thumb').style.left = `${valuePercents}%`;
    this.findSlider('progress').style.width = `${valuePercents}%`;
    this.findSlider('value').innerHTML = value;

    if (this.findSlider('step-active')) {
      this.findSlider('step-active').classList.remove('slider__step-active');
    }

    this.findSlider('steps').children[this.value].classList.add('slider__step-active');
  }

  addEventListeners() {
    this.findSlider('thumb').ondragstart = () => false;
    this.findSlider('thumb').onpointerdown = this.onPointerDown;
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

  onPointerUp = event => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    this.elem.classList.remove('slider_dragging');
    this.findSlider('thumb').style.left = `${(this.value / this.segments) * 100}%`;
    this.findSlider('progress').style.width = `${(this.value / this.segments) * 100}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  };

  onPointerDown = event => {
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = event => {
    let leftRelative = this.countLeftValueOnEvent(event);

    this.findSlider('thumb').style.left = `${leftRelative * 100}%`;
    this.findSlider('progress').style.width = `${leftRelative * 100}%`;
    this.value = Math.round(this.segments * leftRelative);
    this.findSlider('value').innerHTML = this.value;

    if (this.findSlider('step-active')) {
      this.findSlider('step-active').classList.remove('slider__step-active');
    }

    this.findSlider('steps').children[this.value].classList.add('slider__step-active');
  };

  countLeftValueOnEvent(event) {
    let leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    if (leftRelative < 0) { leftRelative = 0; }
    if (leftRelative > 1) { leftRelative = 1; }

    return leftRelative;
  }

  findSlider(class_name) {
    return this.elem.querySelector(`.slider__${class_name}`);
  }
}
