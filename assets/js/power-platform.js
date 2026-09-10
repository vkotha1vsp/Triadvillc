(function () {
  "use strict";
  var buttons = document.querySelectorAll(".pa-nav-btn");
  if (!buttons.length) return;
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var screen = btn.getAttribute("data-pa-screen");
      buttons.forEach(function (b) {
        b.classList.remove("bg-azure-500/20", "text-white");
        b.classList.add("text-slate-400");
      });
      btn.classList.add("bg-azure-500/20", "text-white");
      btn.classList.remove("text-slate-400");
      document.querySelectorAll(".pa-screen").forEach(function (s) { s.classList.add("hidden"); });
      var target = document.getElementById("pa-screen-" + screen);
      if (target) target.classList.remove("hidden");
    });
  });

  // Flow diagram sequential highlight animation
  var flowDiagram = document.getElementById("flow-diagram");
  if (flowDiagram && "IntersectionObserver" in window) {
    var steps = flowDiagram.querySelectorAll(".flow-step");
    var played = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !played) {
          played = true;
          steps.forEach(function (s, i) {
            setTimeout(function () {
              s.classList.add("!bg-azure-500/20", "!border-azure-400/40");
              setTimeout(function () { s.classList.remove("!bg-azure-500/20", "!border-azure-400/40"); }, 700);
            }, i * 280);
          });
        }
      });
    }, { threshold: 0.3 });
    io.observe(flowDiagram);
  }
})();
