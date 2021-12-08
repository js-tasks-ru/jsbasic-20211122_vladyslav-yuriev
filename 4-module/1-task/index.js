function makeFriendsList(friends) {
  const ul_tag = document.createElement('ul');
  friends.forEach(friend => {
    ul_tag.innerHTML += `<li>${friend.firstName} ${friend.lastName}</li>`;
  });
  return ul_tag;
}
