document.addEventListener('DOMContentLoaded', function () {
  const colorBox = document.getElementById('color-box');
  const changeColorBtn = document.getElementById('change-color-btn');
  const hexLabel = document.getElementById('hex-label');

  // Add click counter display
  const counter = document.createElement('p');
  counter.className = 'counter';
  counter.innerHTML = 'Changes: <span id="count">0</span>';
  changeColorBtn.parentElement.appendChild(counter);

  let clickCount = 0;

  // Generate a random hexadecimal color code
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Ripple effect on button click
  function createRipple(event) {
    const btn = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;
    const rect = btn.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  // Main click handler
  changeColorBtn.addEventListener('click', function (event) {
    const newColor = getRandomColor();

    // Update box background color
    colorBox.style.backgroundColor = newColor;

    // Update box shadow to match new color
    colorBox.style.boxShadow = `
      0 0 0 1px rgba(255,255,255,0.06),
      0 20px 60px rgba(0,0,0,0.6),
      0 0 80px ${newColor}44
    `;

    // Update hex label
    hexLabel.textContent = newColor;

    // Increment and display counter
    clickCount++;
    document.getElementById('count').textContent = clickCount;

    // Pop animation
    colorBox.classList.remove('pop');
    void colorBox.offsetWidth; // reflow to restart animation
    colorBox.classList.add('pop');
    setTimeout(() => colorBox.classList.remove('pop'), 150);

    // Ripple
    createRipple(event);
  });
});