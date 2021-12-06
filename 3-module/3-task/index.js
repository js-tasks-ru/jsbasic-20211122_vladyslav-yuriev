function camelize(str) {
  let words_arr = str.split('-');
  let first_word = words_arr.shift();
  let new_arr = words_arr.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  new_arr.unshift(first_word);
  return new_arr.join('');
}
