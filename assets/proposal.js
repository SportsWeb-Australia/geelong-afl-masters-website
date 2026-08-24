/* Finals Media Day proposal — single edit point for Carson before sending to the committee. */
window.MEDIA_DAY_CONFIG = {
  teamOneName: 'Finals Team One — confirm exact team name',
  teamTwoName: 'Finals Team Two — confirm exact team name',
  turnaround: 'Confirm turnaround time before sending',
  contactEmail: 'carson@clicksportsmedia.com',
};

(function () {
  var cfg = window.MEDIA_DAY_CONFIG;
  document.querySelectorAll('[data-bind]').forEach(function (el) {
    var key = el.getAttribute('data-bind');
    if (cfg[key]) el.textContent = cfg[key];
  });

  var mailBase = 'mailto:' + cfg.contactEmail;
  document.querySelectorAll('[data-mail="approve"]').forEach(function (a) {
    a.href = mailBase + '?subject=' + encodeURIComponent('Approved: Finals Media Day ($495)') +
      '&body=' + encodeURIComponent("Hi Click Sports Media,\n\nWe'd like to go ahead with the Finals Media Day proposal — $495, both Finals teams.\n\nThanks,");
  });
  document.querySelectorAll('[data-mail="question"]').forEach(function (a) {
    a.href = mailBase + '?subject=' + encodeURIComponent('Question: Finals Media Day proposal');
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // transformation pipeline — sequential reveal
  var nodes = document.querySelectorAll('.pipe-node');
  if (nodes.length) {
    if (reduce) {
      nodes.forEach(function (n) { n.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var i = Array.prototype.indexOf.call(nodes, e.target);
            e.target.style.transitionDelay = (i * 90) + 'ms';
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.2 });
      nodes.forEach(function (n) { io.observe(n); });
    }
  }

  // sticky mobile CTA — show once hero is scrolled past, hide once final CTA is reached
  var bar = document.getElementById('stickyCta');
  var hero = document.querySelector('.md-hero');
  var finalCta = document.getElementById('finalCta');
  if (bar && hero) {
    var heroDone = false, finalHit = false;
    var setBar = function () { bar.classList.toggle('show', heroDone && !finalHit); };
    new IntersectionObserver(function (e) { heroDone = !e[0].isIntersecting; setBar(); }, { threshold: 0 }).observe(hero);
    if (finalCta) {
      new IntersectionObserver(function (e) { finalHit = e[0].isIntersecting; setBar(); }, { threshold: 0.15 }).observe(finalCta);
    }
  }
})();
