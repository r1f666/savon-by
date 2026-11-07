(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Фильтр каталога
  var chips = document.querySelector('.chips');
  if (chips) {
    var cards = document.querySelectorAll('.card');
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('.chip');
      if (!b) return;
      var f = b.getAttribute('data-filter');
      chips.querySelectorAll('.chip').forEach(function (c) {
        c.setAttribute('aria-pressed', c === b ? 'true' : 'false');
      });
      cards.forEach(function (card) {
        card.hidden = !(f === 'all' || card.getAttribute('data-cat') === f);
      });
    });
  }

  // Цели аналитики (впишите номер счётчика Яндекс.Метрики в YM_ID)
  var YM_ID = 0;
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-goal]');
    if (!el) return;
    var goal = el.getAttribute('data-goal');
    try {
      if (typeof window.ym === 'function' && YM_ID) window.ym(YM_ID, 'reachGoal', goal);
      if (typeof window.gtag === 'function') window.gtag('event', goal, { event_category: 'contact' });
    } catch (err) {}
  });
})();
