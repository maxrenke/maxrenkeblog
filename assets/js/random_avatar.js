document.addEventListener('DOMContentLoaded', function() {
  const avatarLink = document.getElementById('avatar');
  if (avatarLink) {
    let avatarImage = avatarLink.querySelector('img');
    if (!avatarImage) {
      avatarImage = document.createElement('img');
      avatarImage.width = 112; // Set a default width, adjust as needed
      avatarImage.height = 112; // Set a default height, adjust as needed
      avatarImage.alt = 'avatar';
      avatarLink.appendChild(avatarImage);
    }

    const tileImages = [
      'tile000.png',
      'tile001.png',
      'tile002.png',
      'tile003.png',
      'tile006.png',
      'tile007.png'
    ];
    const randomIndex = Math.floor(Math.random() * tileImages.length);
    avatarImage.src = `/assets/images/${tileImages[randomIndex]}`;
  }
});