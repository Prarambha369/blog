let currentAudio = null;
let musicEnabled = true;

function playMusic(mood) {
  if (!musicEnabled) return;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const moods = ['Happy', 'Sad', 'Relaxed', 'Energetic'];
  const moodFiles = {
    0: 'Images/happy.mp3',
    1: 'Images/sad.mp3',
    2: 'Images/relax.mp3',
    3: 'Images/energy.mp3'
  };

  const audioSrc = moodFiles[mood];
  currentAudio = new Audio(audioSrc);

  currentAudio.addEventListener('canplaythrough', () => {
    currentAudio.play();
    console.log(`Playing ${moods[mood]} music`);
  });

  currentAudio.addEventListener('error', (e) => {
    console.error(`Error loading audio file: ${audioSrc}`, e);
  });

  currentAudio.load();
}

document.getElementById('mood-slider').addEventListener('input', (event) => {
  const mood = event.target.value;
  playMusic(mood);
});

document.getElementById('music-toggle').addEventListener('change', (event) => {
  musicEnabled = event.target.checked;
  if (!musicEnabled && currentAudio) {
    currentAudio.pause();
  } else {
    playMusic(document.getElementById('mood-slider').value);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  playMusic(0); // Play happy music by default
});

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

  if (window.markdownViewer) {
    window.markdownViewer.document.body.classList.toggle('dark');
    window.markdownViewer.document.body.classList.toggle('light');
  }
});

document.querySelectorAll('.post-box').forEach(box => {
  box.addEventListener('click', () => {
    const file = box.getAttribute('data-file');
    fetch(file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.text();
      })
      .then(text => {
        const renderedHTML = markdown.toHTML(text);
        const newWindow = window.open();
        newWindow.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Markdown Viewer</title>
            <link rel="stylesheet" href="style.css">
          </head>
          <body class="${document.body.className}">
            ${renderedHTML}
          </body>
          </html>
        `);
        newWindow.document.close();
        window.markdownViewer = newWindow;
      })
      .catch(error => {
        console.error('Error fetching the Markdown file:', error);
      });
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
