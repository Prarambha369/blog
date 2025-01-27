document.getElementById('dark-mode-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');

  const icon = document.getElementById('dark-mode-icon');
  if (document.body.classList.contains('dark')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
});

document.querySelectorAll('.post-box').forEach(box => {
  box.addEventListener('click', () => {
    const file = box.getAttribute('data-file');
    window.open(file, '_blank');
  });
});

document.querySelector('input[type="text"]').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase();
  document.querySelectorAll('.post-box').forEach(box => {
    const title = box.querySelector('.post-title').textContent.toLowerCase();
    const author = box.querySelector('.post-author').textContent.toLowerCase();
    if (title.includes(query) || author.includes(query)) {
      box.style.display = 'block';
    } else {
      box.style.display = 'none';
    }
  });
});