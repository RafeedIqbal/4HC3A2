function navigateTo(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  
  // Show the selected page
  const page = document.getElementById(pageId);
  if (page) {
    page.style.display = 'block';
  }
}
