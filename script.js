
function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  const page = document.getElementById(pageId);
  if (page) {
    page.style.display = 'block';
  }
}

function viewDetails(title) {
  navigateTo('details-page');
}


let favoriteCards = [];

function toggleHeart(button) {
  button.classList.toggle('liked'); 
  const card = button.parentElement; 
  const favoritesList = document.getElementById('favorites-list');

  if (button.classList.contains('liked')) {
    const isAlreadyFavorite = favoriteCards.some(favCard => favCard.isEqualNode(card));
    if (!isAlreadyFavorite) {
      const clonedCard = card.cloneNode(true);

      const clonedHeartButton = clonedCard.querySelector('.heart-btn');
      clonedHeartButton.onclick = () => toggleHeart(clonedHeartButton);

      favoriteCards.push(clonedCard);
    }
  } else {
    favoriteCards = favoriteCards.filter(favCard => !favCard.isEqualNode(card));
  }

  updateFavoritesList();
}

function updateFavoritesList() {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = ''; 
  favoriteCards.forEach(favCard => favoritesList.appendChild(favCard));
}

function renderDynamicStars(container, maxStars) {
  const currentRating = parseInt(container.getAttribute('data-user-rating')) || 0;
  container.innerHTML = '';

  for (let i = 1; i <= maxStars; i++) {
    const star = document.createElement('span');
    star.textContent = i <= currentRating ? '★' : '☆';
    star.style.cursor = 'pointer';

    star.addEventListener('click', () => {
      container.setAttribute('data-user-rating', i); 
      renderDynamicStars(container, maxStars); 
    });

    container.appendChild(star);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dynamic-star-rating').forEach(container => {
    renderDynamicStars(container, 5);
  });
});
