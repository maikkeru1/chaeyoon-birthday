(function () {
  'use strict';

  const TOTAL_CANDLES = 18;
  const candlesTray = document.getElementById('candles-tray');
  const candlesOnCake = document.getElementById('candles-on-cake');
  const cakeArea = document.getElementById('cake-area');
  const counter = document.getElementById('candle-counter');
  const btnContinue = document.getElementById('btn-continue');
  const btnOpen = document.getElementById('btn-open');
  const birthdayBanner = document.getElementById('birthday-banner');
  const floatingHearts = document.getElementById('floating-hearts');

  let placedCount = 0;
  let dragState = null;

  function createCandle(id) {
    const el = document.createElement('div');
    el.className = 'candle';
    el.dataset.id = id;
    el.innerHTML = `
      <div class="candle-flame"></div>
      <div class="candle-wick"></div>
      <div class="candle-body"></div>
    `;
    return el;
  }

  function initCandles() {
    for (let i = 0; i < TOTAL_CANDLES; i++) {
      const candle = createCandle(i);
      candlesTray.appendChild(candle);
      attachDrag(candle);
    }
  }

  function updateCounter() {
    counter.textContent = `${placedCount} / ${TOTAL_CANDLES} candles on cake`;
  }

  // Elliptical zone (in px, local to #candles-on-cake's own box) representing
  // the cake's top surface. Candles can be dropped anywhere inside it; drops
  // near the edge get pulled to the nearest point on the ellipse so they
  // never end up floating off the cake.
  const SURFACE_ELLIPSE = { cx: 85, cy: 24, rx: 74, ry: 19 };

  function clampToSurface(localX, localY) {
    const dx = localX - SURFACE_ELLIPSE.cx;
    const dy = localY - SURFACE_ELLIPSE.cy;
    const norm = Math.sqrt(
      (dx * dx) / (SURFACE_ELLIPSE.rx * SURFACE_ELLIPSE.rx) +
      (dy * dy) / (SURFACE_ELLIPSE.ry * SURFACE_ELLIPSE.ry)
    );
    if (norm <= 1 || norm === 0) return { x: localX, y: localY };
    return {
      x: SURFACE_ELLIPSE.cx + dx / norm,
      y: SURFACE_ELLIPSE.cy + dy / norm,
    };
  }

  function isOverCake(clientX, clientY) {
    const rect = cakeArea.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }

  function resetCandleStyle(candle) {
    candle.style.position = '';
    candle.style.left = '';
    candle.style.top = '';
    candle.style.zIndex = '';
  }

  function returnToTray(candle) {
    candle.classList.remove('dragging');
    resetCandleStyle(candle);
    candlesTray.appendChild(candle);
  }

  function placeOnCake(candle, clientX, clientY) {
    if (candle.classList.contains('on-cake')) return;

    candle.classList.remove('dragging');
    candle.classList.add('on-cake');
    resetCandleStyle(candle);
    candlesOnCake.appendChild(candle);

    const rect = candlesOnCake.getBoundingClientRect();
    const localX = clientX - rect.left;
    const localY = clientY - rect.top;
    const pos = clampToSurface(localX, localY);

    candle.style.left = (pos.x - 7) + 'px';
    candle.style.top = (pos.y - 44) + 'px';

    placedCount++;
    updateCounter();

    if (placedCount === TOTAL_CANDLES) {
      onAllCandlesPlaced();
    }
  }

  function onAllCandlesPlaced() {
    document.getElementById('hint-text').textContent = '🎉 All candles are on the cake! 🎉';

    setTimeout(() => {
      document.querySelectorAll('.candle.on-cake').forEach((c, i) => {
        setTimeout(() => c.classList.add('lit'), i * 80);
      });
    }, 400);

    setTimeout(() => {
      btnContinue.classList.remove('hidden');
    }, 1800);
  }

  function cancelDrag() {
    if (!dragState) return;
    const candle = dragState.candle;
    cakeArea.classList.remove('highlight');
    returnToTray(candle);
    dragState = null;
  }

  function attachDrag(candle) {
    const onStart = (clientX, clientY) => {
      if (candle.classList.contains('on-cake')) return;
      if (dragState) return; // already dragging something

      const rect = candle.getBoundingClientRect();

      dragState = {
        candle,
        offsetX: clientX - rect.left - rect.width / 2,
        offsetY: clientY - rect.top - rect.height / 2,
      };

      candle.classList.add('dragging');
      document.body.appendChild(candle);

      candle.style.position = 'fixed';
      candle.style.left = (clientX - dragState.offsetX - 7) + 'px';
      candle.style.top = (clientY - dragState.offsetY - 22) + 'px';
      candle.style.zIndex = '1000';
    };

    const onMove = (clientX, clientY) => {
      if (!dragState || dragState.candle !== candle) return;

      candle.style.left = (clientX - dragState.offsetX - 7) + 'px';
      candle.style.top = (clientY - dragState.offsetY - 22) + 'px';

      if (isOverCake(clientX, clientY)) {
        cakeArea.classList.add('highlight');
      } else {
        cakeArea.classList.remove('highlight');
      }
    };

    const onEnd = (clientX, clientY) => {
      if (!dragState || dragState.candle !== candle) return;

      cakeArea.classList.remove('highlight');
      candle.classList.remove('dragging');

      if (isOverCake(clientX, clientY)) {
        placeOnCake(candle, clientX, clientY);
      } else {
        returnToTray(candle);
      }

      dragState = null;
    };

    candle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      onStart(e.clientX, e.clientY);
    });

    candle.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      onStart(t.clientX, t.clientY);
    }, { passive: false });

    // store handlers on candle so global listeners can call them
    candle._onMove = onMove;
    candle._onEnd = onEnd;
  }

  document.addEventListener('mousemove', (e) => {
    if (dragState) dragState.candle._onMove(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', (e) => {
    if (dragState) dragState.candle._onEnd(e.clientX, e.clientY);
  });

  document.addEventListener('touchmove', (e) => {
    if (dragState) {
      e.preventDefault();
      const t = e.touches[0];
      dragState.candle._onMove(t.clientX, t.clientY);
    }
  }, { passive: false });

  document.addEventListener('touchend', (e) => {
    if (dragState) {
      const t = e.changedTouches[0];
      dragState.candle._onEnd(t.clientX, t.clientY);
    }
  });

  document.addEventListener('touchcancel', () => {
    cancelDrag();
  });

  window.addEventListener('blur', () => {
    cancelDrag();
  });

  function switchPhase(fromId, toId) {
    document.getElementById(fromId).classList.remove('active');
    document.getElementById(toId).classList.add('active');
  }

  btnContinue.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay active';
    document.body.appendChild(overlay);

    setTimeout(() => {
      switchPhase('phase-cake', 'phase-notebook-closed');
      document.querySelector('.flowers-bg').style.display = 'none';
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 600);
      setTimeout(() => btnOpen.classList.remove('hidden'), 1200);
    }, 700);
  });

  btnOpen.addEventListener('click', () => {
    switchPhase('phase-notebook-closed', 'phase-letter');
    startHeartAnimation();

    setTimeout(() => {
      birthdayBanner.classList.remove('hidden');
      birthdayBanner.classList.add('show');
    }, 4000);
  });

  function startHeartAnimation() {
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '🩷'];
    let count = 0;

    const interval = setInterval(() => {
      if (count > 30) {
        clearInterval(interval);
        return;
      }
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.bottom = Math.random() * 30 + 'vh';
      heart.style.animationDuration = (2 + Math.random() * 2) + 's';
      floatingHearts.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
      count++;
    }, 300);
  }

  initCandles();
  updateCounter();
})();
