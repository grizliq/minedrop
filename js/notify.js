(function () {
  var root = document.getElementById("md-notify");
  if (!root) return;

  function open() {
    root.hidden = false;
  }

  function close() {
    root.hidden = true;
  }

  root.querySelectorAll("[data-md-notify-close]").forEach(function (el) {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  // Автопоказ через 15с — чтобы пользователь успел полистать сайт
  // (можно отключить: data-md-notify-auto="off" на #md-notify)
  if (root.getAttribute("data-md-notify-auto") !== "off") {
    setTimeout(open, 15000);
  }

  window.MDNotify = { open: open, close: close };
})();
