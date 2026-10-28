document.querySelectorAll('.menu-toggle').forEach(function(button) {
  button.addEventListener('click', function() {
    var menu = document.getElementById(button.getAttribute('aria-controls'));
    var open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
  });
});
