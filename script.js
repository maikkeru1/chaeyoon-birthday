(function () {
  'use strict';

  // ---- Decorative Hello Kitty & Kuromi stickers ----
  const SVG_KITTY_FACE = `<svg viewBox="0 0 100 100">
    <ellipse cx="50" cy="58" rx="38" ry="32" fill="#fff" stroke="#333" stroke-width="2"/>
    <ellipse cx="21" cy="29" rx="15" ry="18" fill="#fff" stroke="#333" stroke-width="2"/>
    <ellipse cx="79" cy="29" rx="15" ry="18" fill="#fff" stroke="#333" stroke-width="2"/>
    <ellipse cx="21" cy="29" rx="8" ry="10" fill="#ffb6c1"/>
    <ellipse cx="79" cy="29" rx="8" ry="10" fill="#ffb6c1"/>
    <ellipse cx="40" cy="57" rx="3.4" ry="4.2" fill="#333"/>
    <ellipse cx="60" cy="57" rx="3.4" ry="4.2" fill="#333"/>
    <ellipse cx="50" cy="65" rx="4.2" ry="2.5" fill="#ffb6c1"/>
    <circle cx="35" cy="52" r="5" fill="#ffe0e8" opacity="0.7"/>
    <circle cx="65" cy="52" r="5" fill="#ffe0e8" opacity="0.7"/>
    <ellipse cx="50" cy="15" rx="18" ry="11" fill="#ff69b4" stroke="#e05090" stroke-width="1.2"/>
    <circle cx="50" cy="15" r="4" fill="#fff"/>
  </svg>`;

  const SVG_KITTY_BOW = `<svg viewBox="0 0 100 100">
    <path d="M50 50 L15 25 Q5 20 8 35 Q10 48 30 50 Q10 52 8 65 Q5 80 15 75 Z" fill="#ff69b4" stroke="#e05090" stroke-width="2"/>
    <path d="M50 50 L85 25 Q95 20 92 35 Q90 48 70 50 Q90 52 92 65 Q95 80 85 75 Z" fill="#ff69b4" stroke="#e05090" stroke-width="2"/>
    <circle cx="50" cy="50" r="9" fill="#fff" stroke="#e05090" stroke-width="2"/>
  </svg>`;

  const SVG_KUROMI_FACE = `<svg viewBox="0 0 100 100">
    <ellipse cx="50" cy="58" rx="38" ry="32" fill="#fff" stroke="#2b2a33" stroke-width="2"/>
    <ellipse cx="17" cy="32" rx="13" ry="20" fill="#2b2a33" transform="rotate(-25 17 32)"/>
    <ellipse cx="83" cy="32" rx="13" ry="20" fill="#2b2a33" transform="rotate(25 83 32)"/>
    <circle cx="8" cy="15" r="6" fill="#f582c0"/>
    <circle cx="92" cy="15" r="6" fill="#f582c0"/>
    <path d="M18 38 Q50 10 82 38 Q82 24 50 19 Q18 24 18 38 Z" fill="#2b2a33"/>
    <ellipse cx="40" cy="57" rx="3.8" ry="4.6" fill="#2b2a33"/>
    <ellipse cx="60" cy="57" rx="3.8" ry="4.6" fill="#2b2a33"/>
    <ellipse cx="50" cy="66" rx="3" ry="2" fill="#2b2a33"/>
    <circle cx="35" cy="52" r="5" fill="#f582c0" opacity="0.6"/>
    <circle cx="65" cy="52" r="5" fill="#f582c0" opacity="0.6"/>
    <circle cx="50" cy="13" r="7.5" fill="#fff" stroke="#2b2a33" stroke-width="1.4"/>
    <circle cx="47" cy="12" r="1.4" fill="#2b2a33"/>
    <circle cx="53" cy="12" r="1.4" fill="#2b2a33"/>
    <path d="M47 16 Q50 18.5 53 16" stroke="#2b2a33" stroke-width="1.1" fill="none" stroke-linecap="round"/>
  </svg>`;

  const SVG_KUROMI_STAR = `<svg viewBox="0 0 100 100">
    <path d="M60 15 A30 30 0 1 0 60 85 A24 24 0 1 1 60 15 Z" fill="#2b2a33"/>
    <path d="M78 60 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4 Z" fill="#f582c0"/>
    <path d="M25 20 l2.5 5.5 5.5 2.5 -5.5 2.5 -2.5 5.5 -2.5 -5.5 -5.5 -2.5 5.5 -2.5 Z" fill="#c9a0f5"/>
  </svg>`;

  const STICKERS = [SVG_KITTY_FACE, SVG_KITTY_BOW, SVG_KUROMI_FACE, SVG_KUROMI_STAR];

  function scatterStickers(containerId, layout) {
    const container = document.getElementById(containerId);
    if (!container) return;
    layout.forEach((spot) => {
      const el = document.createElement('div');
      el.className = 'sticker';
      el.innerHTML = STICKERS[spot.icon % STICKERS.length];
      el.style.setProperty('--s-size', spot.size + 'px');
      el.style.setProperty('--s-dur', (spot.dur || 4.5) + 's');
      el.style.setProperty('--s-delay', (spot.delay || 0) + 's');
      el.style.setProperty('--s-rot', (spot.rot || 0) + 'deg');
      if (spot.top !== undefined) el.style.top = spot.top;
      if (spot.bottom !== undefined) el.style.bottom = spot.bottom;
      if (spot.left !== undefined) el.style.left = spot.left;
      if (spot.right !== undefined) el.style.right = spot.right;
      container.appendChild(el);
    });
  }

  function initStickers() {
    scatterStickers('deco-cake', [
      { icon: 2, size: 26, top: '4px', left: '4px', rot: -8, dur: 4.2 },
      { icon: 1, size: 24, top: '4px', right: '4px', rot: 10, dur: 5, delay: 0.4 },
      { icon: 2, size: 30, bottom: '8px', left: '6px', rot: 6, dur: 4.6, delay: 0.8 },
      { icon: 0, size: 30, bottom: '8px', right: '6px', rot: -10, dur: 4, delay: 1.2 },
      { icon: 3, size: 20, top: '44%', left: '2px', rot: 14, dur: 5.4, delay: 0.2 },
      { icon: 1, size: 20, top: '36%', right: '2px', rot: -12, dur: 4.8, delay: 0.6 },
    ]);
    scatterStickers('deco-notebook-closed', [
      { icon: 2, size: 34, top: '10px', left: '6px', rot: -6, dur: 4.4 },
      { icon: 0, size: 34, top: '10px', right: '6px', rot: 8, dur: 4.8, delay: 0.5 },
      { icon: 1, size: 26, bottom: '10px', left: '8px', rot: 10, dur: 4.2, delay: 1 },
      { icon: 3, size: 26, bottom: '10px', right: '8px', rot: -8, dur: 5, delay: 0.3 },
      { icon: 3, size: 20, top: '45%', left: '2px', rot: 16, dur: 5.2, delay: 0.7 },
      { icon: 1, size: 20, top: '60%', right: '2px', rot: -14, dur: 4.6, delay: 0.2 },
    ]);
    scatterStickers('deco-letter', [
      { icon: 0, size: 28, top: '6px', left: '4px', rot: -6, dur: 4.6 },
      { icon: 2, size: 28, top: '6px', right: '4px', rot: 8, dur: 4.2, delay: 0.5 },
      { icon: 3, size: 24, bottom: '6px', left: '4px', rot: 10, dur: 5, delay: 0.9 },
      { icon: 1, size: 24, bottom: '6px', right: '4px', rot: -10, dur: 4.4, delay: 0.3 },
      { icon: 1, size: 18, top: '32%', left: '2px', rot: 14, dur: 5.4, delay: 0.6 },
      { icon: 3, size: 18, top: '52%', right: '2px', rot: -16, dur: 4.8, delay: 0.1 },
    ]);
  }

  function burstConfetti() {
    const bits = ['💕', '💖', '✨', '🎀', '💗', '⭐'];
    for (let i = 0; i < 16; i++) {
      const bit = document.createElement('span');
      bit.className = 'floating-heart';
      bit.textContent = bits[Math.floor(Math.random() * bits.length)];
      bit.style.left = (30 + Math.random() * 40) + 'vw';
      bit.style.bottom = (20 + Math.random() * 20) + 'vh';
      bit.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
      document.body.appendChild(bit);
      setTimeout(() => bit.remove(), 3400);
    }
  }

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
      burstConfetti();
    }, 1200);

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
      burstConfetti();
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
  initStickers();
})();
