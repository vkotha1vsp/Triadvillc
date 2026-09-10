(function () {
  "use strict";
  var buttons = document.querySelectorAll(".blog-filter-btn");
  var cards = document.querySelectorAll(".blog-card");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      buttons.forEach(function (b) {
        b.classList.remove("!bg-azure-500/20", "!border-azure-400/40", "!text-white");
      });
      btn.classList.add("!bg-azure-500/20", "!border-azure-400/40", "!text-white");
      cards.forEach(function (c) {
        if (filter === "All" || c.getAttribute("data-cat") === filter) {
          c.style.display = "";
        } else {
          c.style.display = "none";
        }
      });
    });
  });
})();
