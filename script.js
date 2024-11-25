
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
  
  if (button.classList.contains('liked')) {
    addCardToFavorites(card);
  } else {
    removeCardFromFavorites(card);
  }
  updateFavoritesList();
}

function addCardToFavorites(card) {
  const isAlreadyFavorite = favoriteCards.some(favCard => favCard.isEqualNode(card));
  if (!isAlreadyFavorite) {
    const clonedCard = cloneCardWithListeners(card);
    favoriteCards.push(clonedCard);
  }
}

function removeCardFromFavorites(card) {
  favoriteCards = favoriteCards.filter(favCard => !favCard.isEqualNode(card));
}

function updateFavoritesList() {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = ''; 
  favoriteCards.forEach(favCard => {
    favoritesList.appendChild(favCard);
    initializeDynamicStars(favCard.querySelector('.dynamic-star-rating'));
  });
}

function cloneCardWithListeners(card) {
  const clonedCard = card.cloneNode(true);
  const clonedHeartButton = clonedCard.querySelector('.heart-btn');
  clonedHeartButton.onclick = () => toggleHeart(clonedHeartButton);
  return clonedCard;
}

function initializeDynamicStars(container) {
  const maxStars = 5;
  const currentRating = parseInt(container.getAttribute('data-user-rating')) || 0;
  container.innerHTML = '';

  for (let i = 1; i <= maxStars; i++) {
    const star = document.createElement('span');
    star.textContent = i <= currentRating ? '★' : '☆';
    star.style.cursor = 'pointer';

    star.addEventListener('click', () => {
      container.setAttribute('data-user-rating', i);
      synchronizeRatings(container);
      initializeDynamicStars(container);
    });

    container.appendChild(star);
  }
}

function synchronizeRatings(container) {
  const card = container.closest('.study-card');
  const cardId = card.getAttribute('data-id');
  const matchingCards = document.querySelectorAll(`.study-card[data-id="${cardId}"]`);
  
  matchingCards.forEach(matchingCard => {
    const matchingContainer = matchingCard.querySelector('.dynamic-star-rating');
    if (matchingContainer !== container) {
      matchingContainer.setAttribute('data-user-rating', container.getAttribute('data-user-rating'));
      initializeDynamicStars(matchingContainer);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dynamic-star-rating').forEach(container => {
    initializeDynamicStars(container);
  });
});
