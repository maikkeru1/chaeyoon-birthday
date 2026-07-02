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

function getPositionsOnCake(index) {
  const cols = 9;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const x = 6 + col * 24;
  const y = row * 22;
  return { x, y };
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

  function placeOnCake(candle) {
    if (candle.classList.contains('on-cake')) return;

    candle.classList.remove('dragging');
    candle.classList.add('on-cake');

    const pos = getPositionsOnCake(placedCount);
    candle.style.left = pos.x + 'px';
    candle.style.top = pos.y + 'px';

    candlesOnCake.appendChild(candle);
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

  function attachDrag(candle) {
    const onStart = (clientX, clientY) => {
      if (candle.classList.contains('on-cake')) return;

      dragState = {
        candle,
        startX: clientX,
        startY: clientY,
        offsetX: 0,
        offsetY: 0,
        moved: false,
      };

      const rect = candle.getBoundingClientRect();
      dragState.offsetX = clientX - rect.left - rect.width / 2;
      dragState.offsetY = clientY - rect.top - rect.height / 2;

      candle.classList.add('dragging');
      document.body.appendChild(candle);

      candle.style.position = 'fixed';
      candle.style.left = (clientX - dragState.offsetX - 7) + 'px';
      candle.style.top = (clientY - dragState.offsetY - 22) + 'px';
      candle.style.zIndex = '1000';
    };

    const onMove = (clientX, clientY) => {
      if (!dragState || dragState.candle !== candle) return;

      dragState.moved = true;
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
        candle.style.position = '';
        candle.style.left = '';
        candle.style.top = '';
        candle.style.zIndex = '';
        placeOnCake(candle);
      } else {
        candlesTray.appendChild(candle);
        candle.style.position = '';
        candle.style.left = '';
        candle.style.top = '';
        candle.style.zIndex = '';
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
  }

  document.addEventListener('mousemove', (e) => {
    if (dragState) onMove(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', (e) => {
    if (dragState) onEnd(e.clientX, e.clientY);
  });

  document.addEventListener('touchmove', (e) => {
    if (dragState) {
      e.preventDefault();
      const t = e.touches[0];
      onMove(t.clientX, t.clientY);
    }
  }, { passive: false });

  document.addEventListener('touchend', (e) => {
    if (dragState) {
      const t = e.changedTouches[0];
      onEnd(t.clientX, t.clientY);
    }
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
