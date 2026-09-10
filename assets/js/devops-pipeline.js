(function () {
  "use strict";
  var pipeline = document.getElementById("devops-pipeline");
  if (!pipeline || !("IntersectionObserver" in window)) return;
  var nodes = pipeline.querySelectorAll(".pipeline-node");
  var played = false;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !played) {
        played = true;
        function cycle() {
          nodes.forEach(function (n, i) {
            setTimeout(function () {
              n.classList.add("!bg-azure-500", "!text-white");
              setTimeout(function () { n.classList.remove("!bg-azure-500", "!text-white"); }, 900);
            }, i * 260);
          });
        }
        cycle();
        setInterval(cycle, nodes.length * 260 + 2200);
      }
    });
  }, { threshold: 0.2 });
  io.observe(pipeline);
})();
