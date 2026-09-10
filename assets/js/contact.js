(function () {
  "use strict";

  // Leaflet map centered on Aubrey, TX 76227 (city-level, no exact address)
  function initMap() {
    var mapEl = document.getElementById("contact-map");
    if (!mapEl || typeof L === "undefined") return;
    var aubrey = [33.3037, -96.9905];
    var map = L.map("contact-map", { scrollWheelZoom: false }).setView(aubrey, 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);
    var marker = L.marker(aubrey).addTo(map);
    marker.bindPopup("TRIADVI LLC — Aubrey, Texas").openPopup();
  }
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(initMap, 200);
  } else {
    window.addEventListener("load", initMap);
  }

  // Contact form (static-site friendly: validates + mailto fallback)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var data = new FormData(form);
      var subject = encodeURIComponent("New inquiry from " + data.get("fullName") + " (" + data.get("company") + ")");
      var bodyLines = [
        "Name: " + data.get("fullName"),
        "Email: " + data.get("email"),
        "Company: " + data.get("company"),
        "Phone: " + data.get("phone"),
        "Industry: " + data.get("industry"),
        "Service Interested In: " + data.get("service"),
        "Estimated Timeline: " + data.get("timeline"),
        "",
        "Project Description:",
        data.get("description"),
      ];
      var body = encodeURIComponent(bodyLines.join("\n"));
      document.getElementById("form-success").classList.remove("hidden");
      window.location.href = "mailto:admin@triadvi.com?subject=" + subject + "&body=" + body;
    });
  }
})();
