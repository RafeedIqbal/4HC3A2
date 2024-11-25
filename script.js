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

function renderDynamicStars(container, maxStars) {
  const currentRating = parseInt(container.getAttribute('data-user-rating')) || 0;

  // Clear existing stars
  container.innerHTML = '';

  // Create stars dynamically
  for (let i = 1; i <= maxStars; i++) {
    const star = document.createElement('span');
    star.textContent = i <= currentRating ? '★' : '☆';
    star.style.cursor = 'pointer';

    // Add click event to update rating
    star.addEventListener('click', () => {
      container.setAttribute('data-user-rating', i); // Update user rating
      renderDynamicStars(container, maxStars); // Re-render stars
    });

    container.appendChild(star);
  }
}

// Initialize dynamic ratings on page load
document.querySelectorAll('.dynamic-star-rating').forEach(container => {
  renderDynamicStars(container, 5); // Assume a 5-star system
});

