// Shared site behavior: sticky nav blur, mobile menu, scroll reveal, animated counters, hero network canvas
(function () {
  "use strict";

  // Sticky nav blur on scroll
  var header = document.getElementById("site-header");
  var navInner = document.getElementById("nav-inner");
  function onScroll() {
    if (!navInner) return;
    if (window.scrollY > 12) {
      navInner.classList.add("bg-ink-950/80", "backdrop-blur-xl", "border-white/10", "shadow-lg");
    } else {
      navInner.classList.remove("bg-ink-950/80", "backdrop-blur-xl", "border-white/10", "shadow-lg");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  var menuBtn = document.getElementById("mobile-menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { mobileMenu.classList.add("hidden"); });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Animated counters
  var counters = document.querySelectorAll(".counter");
  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  if (counters.length && "IntersectionObserver" in window) {
    var counterIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterIo.observe(c); });
  }

  // Hero network canvas (subtle animated interconnected architecture)
  var canvas = document.getElementById("network-canvas");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var w, h, nodes = [];
    var NODE_COUNT = window.innerWidth < 640 ? 20 : 38;

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }
    function initNodes() {
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
          vy: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
          r: (Math.random() * 1.5 + 1) * devicePixelRatio,
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(66,163,255,0.55)";
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (var i2 = 0; i2 < nodes.length; i2++) {
        for (var j = i2 + 1; j < nodes.length; j++) {
          var a = nodes[i2], b = nodes[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var maxDist = 160 * devicePixelRatio;
          if (dist < maxDist) {
            ctx.strokeStyle = "rgba(21,131,245," + (0.22 * (1 - dist / maxDist)) + ")";
            ctx.lineWidth = devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    resize();
    initNodes();
    draw();
    window.addEventListener("resize", function () { resize(); initNodes(); }, { passive: true });
  }
})();
