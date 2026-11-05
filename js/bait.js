/* Приманки: повтор окна с фриспинами, нижняя кнопка «Играть», цели Метрики */
(function () {
  var YM = +document.documentElement.getAttribute("data-ym") || 0;
  var REF = document.documentElement.getAttribute("data-ref") || "";
  function goal(g) { if (YM && window.ym) try { ym(YM, "reachGoal", g); } catch (e) {} }

  // цели на все переходы по рефке
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (a && REF && a.href.indexOf(REF) === 0) goal(a.closest("#md-notify") ? "bait_click" : a.closest(".md-stick") ? "stick_click" : "ref_click");
  }, true);

  // повтор окна: после закрытия — через 60 с, потом через 150 с, и при возврате на вкладку; не больше 3 показов
  var root = document.getElementById("md-notify");
  if (root && window.MDNotify) {
    var shown = 0, vis = false, t = null, t0 = Date.now();
    var open = window.MDNotify.open;
    window.MDNotify.open = function () { if (!root.hidden || shown >= 3) return; open(); };
    new MutationObserver(function () {
      if (!root.hidden && !vis) { vis = true; shown++; goal("bait_show"); }
      else if (root.hidden && vis) { vis = false; clearTimeout(t); if (shown < 3) t = setTimeout(window.MDNotify.open, shown < 2 ? 60000 : 150000); }
    }).observe(root, { attributes: true, attributeFilter: ["hidden"] });
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible" && Date.now() - t0 > 20000 && shown < 3) setTimeout(window.MDNotify.open, 900);
    });
  }

  // нижняя кнопка — появляется, когда первый экран прокручен
  if (REF) {
    var s = document.createElement("div");
    s.className = "md-stick"; s.hidden = true;
    s.innerHTML = '<span class="md-stick__txt">30 фриспинов новым игрокам</span><a class="md-btn md-btn--gold md-stick__btn" href="' + REF + '" target="_blank" rel="noopener"><span>ИГРАТЬ</span></a>';
    document.body.appendChild(s);
    var onScroll = function () { s.hidden = window.scrollY < window.innerHeight * 0.8; };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }
})();
