(function () {
  "use strict";

  // Supply chain node detail
  var scDetails = [
    "Raw materials are received and verified prior to entering the manufacturing process, with lot-level identifiers established for downstream traceability.",
    "Active ingredients are formulated and manufactured under controlled, quality-assured production conditions.",
    "Finished product is packaged into saleable units, each associated with a specific GTIN and lot.",
    "Each saleable unit is assigned a unique serial number and marked with a GS1-compliant 2D DataMatrix barcode.",
    "Individual serialized units are aggregated into cases and pallets, linking unit-level serials to parent container identifiers.",
    "Serialized cases are received, verified, and staged for outbound distribution at the warehouse.",
    "Product moves to authorized distributors, with EPCIS events recording each transfer of custody.",
    "Wholesalers receive and verify serialized product prior to fulfillment to pharmacies and hospitals.",
    "Pharmacies and hospitals verify product authenticity at receipt and again at the point of dispensing.",
    "The patient or end customer receives verified, traceable medication with a complete chain-of-custody record.",
  ];
  var scNodes = document.querySelectorAll(".sc-node");
  var scDetail = document.getElementById("sc-detail");
  scNodes.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var idx = parseInt(btn.getAttribute("data-sc-node"), 10);
      scDetail.textContent = scDetails[idx] || "";
      scDetail.classList.remove("hidden");
      scNodes.forEach(function (b) { b.classList.remove("!border-azure-400/50", "!bg-white/[0.06]"); });
      btn.classList.add("!border-azure-400/50", "!bg-white/[0.06]");
      scDetail.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  // Track & trace timeline
  var ttPlay = document.getElementById("tt-play");
  if (ttPlay) {
    ttPlay.addEventListener("click", function () {
      ttPlay.disabled = true;
      ttPlay.textContent = "Tracing...";
      var events = document.querySelectorAll(".tt-event");
      events.forEach(function (ev, i) {
        setTimeout(function () {
          ev.classList.remove("opacity-30");
          ev.classList.add("opacity-100");
          var dot = ev.querySelector(".tt-dot");
          if (dot) dot.classList.add("!bg-signal-green");
        }, i * 450);
      });
      setTimeout(function () {
        ttPlay.textContent = "Trace Complete";
      }, events.length * 450 + 200);
    });
  }

  // Counterfeit detection demo
  var resultBox = document.getElementById("scan-result");
  var icon = document.getElementById("scan-icon");
  var title = document.getElementById("scan-title");
  var details = document.getElementById("scan-details");
  var checkSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13L9.5 17.5L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var xSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';

  function showResult(authentic) {
    resultBox.classList.remove("hidden");
    if (authentic) {
      resultBox.className = "rounded-xl p-5 text-left transition-all bg-signal-green/10 border border-signal-green/30";
      icon.className = "w-8 h-8 rounded-full flex items-center justify-center bg-signal-green/20 text-signal-green";
      icon.innerHTML = checkSvg;
      title.className = "font-semibold text-signal-green";
      title.textContent = "Product Verified";
      details.innerHTML = ["Valid serial number", "Expected supply-chain location", "Active product", "No duplicate scans"].map(function (t) {
        return '<div class="text-slate-300">' + t + "</div>";
      }).join("");
    } else {
      resultBox.className = "rounded-xl p-5 text-left transition-all bg-signal-red/10 border border-signal-red/30";
      icon.className = "w-8 h-8 rounded-full flex items-center justify-center bg-signal-red/20 text-signal-red";
      icon.innerHTML = xSvg;
      title.className = "font-semibold text-signal-red";
      title.textContent = "Verification Failed";
      details.innerHTML = ["Unknown serial number", "Duplicate scan detected", "Product scanned in unexpected region", "Decommissioned or expired identifier"].map(function (t) {
        return '<div class="text-slate-300">' + t + "</div>";
      }).join("");
    }
  }
  var authBtn = document.getElementById("scan-authentic");
  var counterBtn = document.getElementById("scan-counterfeit");
  if (authBtn) authBtn.addEventListener("click", function () { showResult(true); });
  if (counterBtn) counterBtn.addEventListener("click", function () { showResult(false); });
})();
