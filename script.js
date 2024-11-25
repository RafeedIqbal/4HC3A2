
document.querySelector('.search-bar input').addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll('.study-card').forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(query) ? '' : 'none';
  });
});
    