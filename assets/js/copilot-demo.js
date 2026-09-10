(function () {
  "use strict";
  var askBtn = document.getElementById("copilot-ask-btn");
  var trace = document.getElementById("copilot-trace");
  var answerWrap = document.getElementById("copilot-answer-wrap");
  if (askBtn) {
    askBtn.addEventListener("click", function () {
      askBtn.disabled = true;
      askBtn.textContent = "Retrieving grounded answer...";
      trace.classList.remove("hidden");
      var steps = trace.querySelectorAll(".copilot-trace-step");
      steps.forEach(function (s, i) {
        setTimeout(function () {
          s.classList.remove("opacity-30");
          s.classList.add("!bg-azure-500/20", "!border-azure-400/40", "!text-white");
        }, i * 380);
      });
      setTimeout(function () {
        answerWrap.classList.remove("hidden");
        askBtn.textContent = "Ask Another Question";
        askBtn.disabled = false;
      }, steps.length * 380 + 300);
    });
  }

  var modal = document.getElementById("citation-modal");
  var modalTitle = document.getElementById("citation-title");
  document.querySelectorAll(".citation-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      modalTitle.textContent = btn.getAttribute("data-doc");
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });
  var closeBtn = document.getElementById("citation-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });
  }
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) { modal.classList.add("hidden"); modal.classList.remove("flex"); }
    });
  }
})();
