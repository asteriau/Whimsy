class RainManager {
  constructor() {
    this.rainBackground = document.getElementById('rainBackground');
    this.lastDropTime = 0;
    this.dropInterval = 5; // ms between drops
    this.animationId = null;
    this.isRunning = false;
    this.init();
  }

  init() {
    this.startRain();
  }

  createRain() {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    
    raindrop.style.left = `${Math.random() * 100}vw`;
    raindrop.style.height = `${15 + Math.random() * 10}px`;
    raindrop.style.animationDuration = `${0.8 + Math.random() * 0.7}s`;
    raindrop.style.opacity = 0.2 + Math.random() * 0.2;
    
    this.rainBackground.appendChild(raindrop);

    raindrop.addEventListener('animationend', () => {
      raindrop.remove();
    });
  }

  rainLoop(timestamp) {
    if (!this.isRunning) return;

    // Create drops based on elapsed time rather than fixed intervals (my pc went boom earlier)
    if (!this.lastDropTime) this.lastDropTime = timestamp;
    const elapsed = timestamp - this.lastDropTime;

    if (elapsed > this.dropInterval) {
      this.createRain();
      this.lastDropTime = timestamp - (elapsed % this.dropInterval);
    }

    this.animationId = requestAnimationFrame((ts) => this.rainLoop(ts));
  }

  startRain() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastDropTime = 0;
    this.animationId = requestAnimationFrame((ts) => this.rainLoop(ts));
  }

  stopRain() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  // Handle visibility change
  handleVisibilityChange() {
    if (document.hidden) {
      this.stopRain();
    } else {
      this.startRain();
    }
  }
}

// Initialize with visibility handling
document.addEventListener('DOMContentLoaded', () => {
  const rainManager = new RainManager();
  
  // Resume rain when tab becomes visible
  document.addEventListener('visibilitychange', () => {
    rainManager.handleVisibilityChange();
  });
});