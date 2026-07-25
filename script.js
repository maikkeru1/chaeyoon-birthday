(function () {
  'use strict';

  // ---- Decorative Hello Kitty stickers (real photos) ----
  const IMG_KITTY_FACE_REAL = `<img src="images/hk-face.png" alt="">`;
  const IMG_KITTY_BOW_BIG = `<img src="images/hk-bow-big.png" alt="">`;
  const IMG_KITTY_HEART_BALLOONS = `<img src="images/hk-heart-balloons.png" alt="">`;
  const IMG_KISS_MARK = `<img src="images/kiss-mark.png" alt="">`;

  const STICKERS = [IMG_KITTY_FACE_REAL, IMG_KITTY_BOW_BIG, IMG_KITTY_HEART_BALLOONS, IMG_KISS_MARK];

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
    scatterStickers('deco-gate', [
      { icon: 0, size: 30, top: '8%', left: '6%', rot: -8, dur: 4.6 },
      { icon: 2, size: 30, top: '10%', right: '6%', rot: 10, dur: 5, delay: 0.4 },
      { icon: 1, size: 26, bottom: '14%', left: '8%', rot: 8, dur: 4.2, delay: 0.9 },
      { icon: 3, size: 22, bottom: '16%', right: '9%', rot: -12, dur: 4.8, delay: 0.2 },
    ]);
    scatterStickers('deco-cake', [
      { icon: 1, size: 28, top: '4px', left: '4px', rot: -8, dur: 4.2 },
      { icon: 0, size: 24, top: '4px', right: '4px', rot: 10, dur: 5, delay: 0.4 },
      { icon: 2, size: 30, bottom: '8px', left: '6px', rot: 6, dur: 4.6, delay: 0.8 },
      { icon: 0, size: 30, bottom: '8px', right: '6px', rot: -10, dur: 4, delay: 1.2 },
      { icon: 3, size: 18, top: '44%', left: '2px', rot: 14, dur: 5.4, delay: 0.2 },
      { icon: 1, size: 20, top: '36%', right: '2px', rot: -12, dur: 4.8, delay: 0.6 },
    ]);
    scatterStickers('deco-gallery', [
      { icon: 0, size: 26, top: '6px', left: '4px', rot: -6, dur: 4.6 },
      { icon: 1, size: 28, top: '6px', right: '4px', rot: 8, dur: 4.2, delay: 0.5 },
      { icon: 3, size: 20, bottom: '6px', left: '4px', rot: 10, dur: 5, delay: 0.9 },
      { icon: 2, size: 22, bottom: '6px', right: '4px', rot: -10, dur: 4.4, delay: 0.3 },
    ]);
    scatterStickers('deco-game', [
      { icon: 2, size: 26, top: '6px', left: '4px', rot: -6, dur: 4.6 },
      { icon: 3, size: 20, top: '6px', right: '4px', rot: 8, dur: 4.2, delay: 0.5 },
      { icon: 0, size: 22, bottom: '6px', left: '4px', rot: 10, dur: 5, delay: 0.9 },
      { icon: 1, size: 28, bottom: '6px', right: '4px', rot: -10, dur: 4.4, delay: 0.3 },
    ]);
    scatterStickers('deco-notebook-closed', [
      { icon: 1, size: 36, top: '10px', left: '6px', rot: -6, dur: 4.4 },
      { icon: 0, size: 34, top: '10px', right: '6px', rot: 8, dur: 4.8, delay: 0.5 },
      { icon: 2, size: 26, bottom: '10px', left: '8px', rot: 10, dur: 4.2, delay: 1 },
      { icon: 3, size: 24, bottom: '10px', right: '8px', rot: -8, dur: 5, delay: 0.3 },
      { icon: 0, size: 20, top: '45%', left: '2px', rot: 16, dur: 5.2, delay: 0.7 },
      { icon: 1, size: 20, top: '60%', right: '2px', rot: -14, dur: 4.6, delay: 0.2 },
    ]);
    scatterStickers('deco-letter', [
      { icon: 0, size: 28, top: '6px', left: '4px', rot: -6, dur: 4.6 },
      { icon: 1, size: 30, top: '6px', right: '4px', rot: 8, dur: 4.2, delay: 0.5 },
      { icon: 3, size: 22, bottom: '6px', left: '4px', rot: 10, dur: 5, delay: 0.9 },
      { icon: 2, size: 24, bottom: '6px', right: '4px', rot: -10, dur: 4.4, delay: 0.3 },
      { icon: 1, size: 18, top: '32%', left: '2px', rot: 14, dur: 5.4, delay: 0.6 },
      { icon: 2, size: 22, top: '52%', right: '2px', rot: -16, dur: 4.8, delay: 0.1 },
    ]);
  }

  function initKissField() {
    const containers = document.querySelectorAll('.kiss-field');
    const cols = 9;
    const rows = 13;
    containers.forEach((container) => {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const el = document.createElement('div');
          el.className = 'kiss-mark';
          el.innerHTML = IMG_KISS_MARK;
          const jitterX = (Math.random() - 0.5) * (100 / cols) * 0.9;
          const jitterY = (Math.random() - 0.5) * (100 / rows) * 0.9;
          const left = ((c + 0.5) / cols) * 100 + jitterX;
          const top = ((r + 0.5) / rows) * 100 + jitterY;
          const size = 64 + Math.random() * 54;
          const rot = Math.random() * 360;
          const op = 0.36 + Math.random() * 0.24;
          el.style.setProperty('--k-size', size.toFixed(1) + 'px');
          el.style.setProperty('--k-rot', rot.toFixed(1) + 'deg');
          el.style.setProperty('--k-op', op.toFixed(2));
          el.style.left = left.toFixed(2) + '%';
          el.style.top = top.toFixed(2) + '%';
          container.appendChild(el);
        }
      }
    });
  }

  function vibrate(ms) {
    if (navigator.vibrate) navigator.vibrate(ms || 15);
  }

  function burstConfetti() {
    const bits = ['💕', '💖', '✨', '🎀', '💗', '⭐', '🌸', '🌷'];
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
  const counter = document.getElementById('candle-counter');
  const btnPlaceCandles = document.getElementById('btn-place-candles');
  const btnContinue = document.getElementById('btn-continue');
  const btnGalleryContinue = document.getElementById('btn-gallery-continue');
  const btnOpen = document.getElementById('btn-open');
  const birthdayBanner = document.getElementById('birthday-banner');
  const floatingHearts = document.getElementById('floating-hearts');

  let placedCount = 0;

  function createCandle(id) {
    const el = document.createElement('div');
    el.className = 'candle';
    el.dataset.id = id;
    el.innerHTML = `
      <img class="candle-flame" src="images/flame.png" alt="">
      <img class="candle-body" src="images/candle.png" alt="">
    `;
    return el;
  }

  function initCandles() {
    for (let i = 0; i < TOTAL_CANDLES; i++) {
      candlesTray.appendChild(createCandle(i));
    }
  }

  function updateCounter() {
    counter.textContent = `${placedCount} / ${TOTAL_CANDLES} candles on cake`;
  }

  // The cake's top surface, as an ellipse in px local to #candles-on-cake's
  // own box. Target points for the auto-placement sit in a single ring
  // around that ellipse's rim, right on the icing and clear of the Hello
  // Kitty topper baked into the cake photo.
  const SURFACE_ELLIPSE = { cx: 73, cy: 24, rx: 80, ry: 22 };

  function candlePositions(count) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      points.push({
        x: SURFACE_ELLIPSE.cx + Math.cos(angle) * SURFACE_ELLIPSE.rx + (Math.random() - 0.5) * 4,
        y: SURFACE_ELLIPSE.cy + Math.sin(angle) * SURFACE_ELLIPSE.ry + (Math.random() - 0.5) * 3,
      });
    }
    return points;
  }

  function onAllCandlesPlaced() {
    document.getElementById('hint-text').textContent = '🎉 All candles are on the cake! 🎉';

    setTimeout(() => {
      document.querySelectorAll('.candle.on-cake').forEach((c, i) => {
        setTimeout(() => c.classList.add('lit'), i * 80);
      });
    }, 1600);

    setTimeout(() => {
      burstConfetti();
    }, 2600);

    setTimeout(() => {
      btnContinue.classList.remove('hidden');
    }, 3200);
  }

  // Flies a candle from its tray spot to its target cake spot using a
  // transform-only animation (translate/scale/rotate), so the browser can
  // run it off the main thread. The candle is placed at its final resting
  // left/top immediately, then animated in from an offset equal to where it
  // started — with a raised midpoint keyframe so the path arcs instead of
  // cutting a straight line.
  function flyCandleToCake(candle, startRect, target, delay) {
    candle.classList.add('on-cake');
    candlesOnCake.appendChild(candle);
    candle.style.left = (target.x - 9) + 'px';
    candle.style.top = (target.y - 59) + 'px';

    const endRect = candle.getBoundingClientRect();
    const dx = startRect.left - endRect.left;
    const dy = startRect.top - endRect.top;
    const rot = (Math.random() - 0.5) * 50;

    const anim = candle.animate([
      { transform: `translate(${dx}px, ${dy}px) scale(1.1) rotate(${rot}deg)`, offset: 0 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 90}px) scale(1.25) rotate(${rot * 0.3}deg)`, offset: 0.55 },
      { transform: 'translate(0, 0) scale(0.8) rotate(0deg)', offset: 1 },
    ], {
      duration: 850,
      delay,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'both',
    });

    anim.onfinish = () => {
      candle.style.transform = '';
      placedCount++;
      updateCounter();
      if (placedCount === TOTAL_CANDLES) {
        onAllCandlesPlaced();
      }
    };
  }

  function placeAllCandles() {
    btnPlaceCandles.classList.add('hidden');
    document.getElementById('hint-text').textContent = '✨ Here we go! ✨';

    const candles = Array.from(candlesTray.children);
    const startRects = candles.map((c) => c.getBoundingClientRect());
    const targets = candlePositions(candles.length);

    candles.forEach((candle, i) => {
      flyCandleToCake(candle, startRects[i], targets[i], i * 90);
    });
  }

  btnPlaceCandles.addEventListener('click', () => {
    vibrate();
    placeAllCandles();
  });

  function switchPhase(fromId, toId) {
    document.getElementById(fromId).classList.remove('active');
    document.getElementById(toId).classList.add('active');
  }

  // Springy circular-wipe transition between phases: an overlay covers the
  // screen, the phase swap happens at the peak of the cover, then the
  // overlay uncovers to reveal the new phase.
  function runPhaseTransition(fromId, toId, afterSwap) {
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    overlay.innerHTML = '<span class="overlay-heart">💗</span>';
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => overlay.classList.add('active'));
    });

    setTimeout(() => {
      switchPhase(fromId, toId);
      if (afterSwap) afterSwap();
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 700);
    }, 680);
  }

  btnContinue.addEventListener('click', () => {
    vibrate();
    runPhaseTransition('phase-cake', 'phase-gallery', () => {
      setTimeout(() => btnGalleryContinue.classList.remove('hidden'), 900);
    });
  });

  btnGalleryContinue.addEventListener('click', () => {
    vibrate();
    runPhaseTransition('phase-gallery', 'phase-game');
  });

  const btnGameContinue = document.getElementById('btn-game-continue');
  btnGameContinue.addEventListener('click', () => {
    vibrate();
    runPhaseTransition('phase-game', 'phase-notebook-closed', () => {
      setTimeout(() => btnOpen.classList.remove('hidden'), 1200);
    });
  });

  btnOpen.addEventListener('click', () => {
    vibrate();
    switchPhase('phase-notebook-closed', 'phase-letter');
    startHeartAnimation();

    setTimeout(() => {
      birthdayBanner.classList.remove('hidden');
      birthdayBanner.classList.add('show');
      burstConfetti();
    }, 4000);
  });

  // ---- Mini-game: catch the falling hearts ----
  function initGame() {
    const gameArea = document.getElementById('game-area');
    const btnStartGame = document.getElementById('btn-start-game');
    const gameCounter = document.getElementById('game-counter');
    const gameHint = document.getElementById('game-hint');
    if (!gameArea || !btnStartGame) return;

    const TARGET = 15;
    const heartsEmoji = ['💕', '💖', '💗', '💝', '❤️', '🩷'];
    let score = 0;
    let spawnTimer = null;

    function spawnHeart() {
      const el = document.createElement('div');
      el.className = 'game-heart';
      el.textContent = heartsEmoji[Math.floor(Math.random() * heartsEmoji.length)];
      el.style.left = (5 + Math.random() * 80) + '%';
      const dur = 3.2 + Math.random() * 2;
      el.style.animationDuration = dur + 's';

      const catchHeart = () => {
        if (el.dataset.done) return;
        el.dataset.done = '1';
        vibrate(10);
        el.classList.add('popped');
        score++;
        gameCounter.textContent = `${score} / ${TARGET} caught`;
        setTimeout(() => el.remove(), 350);
        if (score >= TARGET) endGame();
      };

      el.addEventListener('pointerdown', catchHeart);
      el.addEventListener('animationend', (e) => {
        if (e.animationName === 'fallHeart') el.remove();
      });

      gameArea.appendChild(el);
    }

    function endGame() {
      clearInterval(spawnTimer);
      gameArea.querySelectorAll('.game-heart').forEach((h) => h.remove());
      gameHint.textContent = '🎉 You caught them all! 🎉';
      burstConfetti();
      setTimeout(() => btnGameContinue.classList.remove('hidden'), 900);
    }

    btnStartGame.addEventListener('click', () => {
      vibrate();
      btnStartGame.remove();
      gameHint.textContent = 'Tap or click the hearts before they land 💕';
      spawnTimer = setInterval(spawnHeart, 550);
    });
  }

  // ---- "Our song" toggle on the gate screen ----
  function initSong() {
    const btnSong = document.getElementById('btn-song');
    const bgAudio = document.getElementById('bg-audio');
    if (!btnSong || !bgAudio) return;

    btnSong.addEventListener('click', () => {
      vibrate();
      if (bgAudio.paused) {
        bgAudio.play().catch(() => {});
        btnSong.classList.add('playing');
        btnSong.setAttribute('aria-pressed', 'true');
        btnSong.querySelector('.song-icon').textContent = '❚❚';
      } else {
        bgAudio.pause();
        btnSong.classList.remove('playing');
        btnSong.setAttribute('aria-pressed', 'false');
        btnSong.querySelector('.song-icon').textContent = '▶';
      }
    });
  }

  // ---- Cursor / touch heart trail, subtle, site-wide ----
  function initCursorHearts() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bits = ['💕', '💖', '✨'];
    let lastTime = 0;

    function spawn(x, y) {
      const now = Date.now();
      if (now - lastTime < 140) return;
      lastTime = now;
      const h = document.createElement('span');
      h.className = 'cursor-heart';
      h.textContent = bits[Math.floor(Math.random() * bits.length)];
      h.style.left = x + 'px';
      h.style.top = y + 'px';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 900);
    }

    document.addEventListener('pointermove', (e) => spawn(e.clientX, e.clientY));
  }

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

  // ---- Intro: bouquets swept in by wind, then the gate question reveals ----
  function initIntroSweep() {
    const container = document.getElementById('intro-sweep');
    const gateContent = document.getElementById('gate-content');
    if (!container || !gateContent) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      container.remove();
      gateContent.classList.add('reveal');
      return;
    }

    const blooms = [
      'images/flower-cosmos-pink.png',
      'images/flower-daisy-white.png',
      'images/flower-rose-red.png',
      'images/flower-anemone-purple.png',
      'images/flower-rose-purple.png',
      'images/flower-rose-yellow.png',
      'images/flower-anemone-teal.png',
      'images/flower-rose-pink.png',
    ];
    const COUNT = 46;

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('img');
      el.className = 'intro-bloom';
      el.src = blooms[i % blooms.length];
      el.alt = '';

      const size = 90 + Math.random() * 170;
      const dx = -(70 + Math.random() * 95);
      const dy = 55 + Math.random() * 75;
      const rot = (Math.random() > 0.5 ? 1 : -1) * (120 + Math.random() * 200);
      const dur = 1.9 + Math.random() * 1.3;
      const delay = Math.random() * 0.9;

      el.style.setProperty('--b-size', size + 'px');
      el.style.setProperty('--b-dx', dx + 'vw');
      el.style.setProperty('--b-dy', dy + 'vh');
      el.style.setProperty('--b-rot', rot + 'deg');
      el.style.setProperty('--b-dur', dur + 's');
      el.style.setProperty('--b-delay', delay + 's');
      el.style.top = (Math.random() * 70 - 20) + '%';
      el.style.right = (Math.random() * 90 - 20) + '%';

      container.appendChild(el);
    }

    setTimeout(() => {
      gateContent.classList.add('reveal');
    }, 2100);

    setTimeout(() => {
      container.classList.add('done');
      setTimeout(() => container.remove(), 500);
    }, 3300);
  }

  // ---- Phase 0: love gate with a "No" button that flees the cursor ----
  function initGate() {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const taunt = document.getElementById('gate-taunt');
    if (!btnYes || !btnNo) return;

    const FLEE_RADIUS = 100;
    const MARGIN = 16;
    const taunts = [
      'nice try 😏',
      'not so fast~',
      'try again 💗',
      "it's Yes or Yes",
      'catch me if u can',
      'no isn\'t an option 🐰',
    ];
    let tauntIndex = 0;

    function flee(fromX, fromY) {
      const rect = btnNo.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const maxX = window.innerWidth - w - MARGIN;
      const maxY = window.innerHeight - h - MARGIN;

      let bestX = rect.left;
      let bestY = rect.top;
      let bestDist = -1;

      for (let i = 0; i < 12; i++) {
        const cx = MARGIN + Math.random() * Math.max(1, maxX - MARGIN);
        const cy = MARGIN + Math.random() * Math.max(1, maxY - MARGIN);
        const d = Math.hypot(cx + w / 2 - fromX, cy + h / 2 - fromY);
        if (d > bestDist) {
          bestDist = d;
          bestX = cx;
          bestY = cy;
        }
      }

      btnNo.classList.add('fleeing');
      btnNo.style.left = bestX + 'px';
      btnNo.style.top = bestY + 'px';

      if (taunt) {
        taunt.textContent = taunts[tauntIndex % taunts.length];
        tauntIndex++;
      }
    }

    function maybeFlee(x, y) {
      if (document.getElementById('phase-gate').classList.contains('active') === false) return;
      const rect = btnNo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (Math.hypot(cx - x, cy - y) < FLEE_RADIUS) {
        flee(x, y);
      }
    }

    document.addEventListener('mousemove', (e) => maybeFlee(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      if (t) maybeFlee(t.clientX, t.clientY);
    }, { passive: true });

    btnNo.addEventListener('mouseenter', () => {
      const rect = btnNo.getBoundingClientRect();
      flee(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });

    btnNo.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const rect = btnNo.getBoundingClientRect();
      flee(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }, { passive: false });

    btnYes.addEventListener('click', () => {
      vibrate();
      burstConfetti();
      runPhaseTransition('phase-gate', 'phase-cake');
    });
  }

  initCandles();
  updateCounter();
  initStickers();
  initKissField();
  initGate();
  initIntroSweep();
  initGame();
  initSong();
  initCursorHearts();
})();
