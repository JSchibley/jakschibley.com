document.querySelectorAll('.menu-toggle').forEach(function(button) {
  button.addEventListener('click', function() {
    var menu = document.getElementById(button.getAttribute('aria-controls'));
    var open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  });
});

(function() {
  var carousel = document.querySelector('.home-slideshow');
  if (!carousel) return;
  var slides = Array.from(carousel.querySelectorAll('.home-slide'));
  var controls = carousel.querySelector('.slideshow-controls');
  var count = carousel.querySelector('.slide-count');
  var status = carousel.querySelector('.slide-status');
  var pauseButton = carousel.querySelector('[data-slide-pause]');
  var current = 0;
  var paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hovering = false;
  var focusing = false;
  var timer;
  function show(index, manual) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function(slide, i) { slide.hidden = i !== current; });
    count.textContent = (current + 1) + ' / ' + slides.length;
    if (manual) status.textContent = slides[current].querySelector('h2').textContent;
  }
  function restart() {
    window.clearInterval(timer);
    timer = window.setInterval(function() {
      if (!paused && !hovering && !focusing && !document.hidden) show(current + 1, false);
    }, 6000);
  }
  function updatePause() {
    pauseButton.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
  }
  carousel.querySelector('[data-slide-prev]').addEventListener('click', function() { show(current - 1, true); restart(); });
  carousel.querySelector('[data-slide-next]').addEventListener('click', function() { show(current + 1, true); restart(); });
  pauseButton.addEventListener('click', function() { paused = !paused; updatePause(); restart(); });
  carousel.addEventListener('mouseenter', function() { hovering = true; });
  carousel.addEventListener('mouseleave', function() { hovering = false; restart(); });
  carousel.addEventListener('focusin', function() { focusing = true; });
  carousel.addEventListener('focusout', function(event) {
    focusing = carousel.contains(event.relatedTarget);
    if (!focusing) restart();
  });
  controls.hidden = false;
  show(0, false);
  updatePause();
  restart();
})();
