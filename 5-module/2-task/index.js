function toggleText() {
  const btn = document.querySelector('.toggle-text-button');
  btn.addEventListener('click', () => {
    const text = document.querySelector('#text');
    (text.hidden) ? text.hidden = false : text.hidden = true;
  });
}
