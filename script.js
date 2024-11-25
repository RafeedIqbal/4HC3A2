function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  
  const page = document.getElementById(pageId);
  if (page) {
    page.style.display = 'block';
  }
}

let favoriteCards = []; 

function toggleHeart(button) {
  button.classList.toggle('liked');

  const card = button.parentElement; 
  const favoritesList = document.getElementById('favorites-list');

  if (button.classList.contains('liked')) {
    favoriteCards.push(card.cloneNode(true)); 
  } else {
    favoriteCards = favoriteCards.filter(favCard => favCard.innerHTML !== card.innerHTML);
  }

  favoritesList.innerHTML = '';
  favoriteCards.forEach(favCard => favoritesList.appendChild(favCard));
}
