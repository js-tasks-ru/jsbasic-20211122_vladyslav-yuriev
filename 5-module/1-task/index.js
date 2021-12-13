function hideSelf() {
  const btnToHide = document.querySelector('.hide-self-button');
  btnToHide.addEventListener('click', () => {
    btnToHide.hidden = true;
  });
}
