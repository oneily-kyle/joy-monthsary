function fadeInMusic(audioElement, duration = 25000) {
  console.log("🔊 Fade-in started...");
  audioElement.volume = 0;

  const steps = 100; // Number of volume steps
  const stepTime = duration / steps; // = 25000 / 100 = 250ms
  const stepSize = 1 / steps; // = 0.01

  let currentStep = 0;

  const fadeInterval = setInterval(() => {
    currentStep++;
    audioElement.volume = Math.min(1, stepSize * currentStep);
    console.log(`🎚 Volume: ${audioElement.volume.toFixed(2)}`);

    if (currentStep >= steps) {
      clearInterval(fadeInterval);
      console.log("✅ Fade complete");
    }
  }, stepTime);
}


document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const toggle = document.getElementById("music-toggle");
  const icon = document.getElementById("music-icon");
  let isPlaying = false;

  toggle.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      icon.textContent = "🔈";
    } else {
      music.volume = 0; // set to 0 BEFORE play
      music.play().then(() => {
        fadeInMusic(music, 8000);
        icon.textContent = "🔊";
      }).catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
    isPlaying = !isPlaying;
  });

  // Optional: autoplay with fade on first click anywhere
  document.body.addEventListener("click", () => {
    if (!isPlaying) {
      music.volume = 0;
      music.play().then(() => {
        fadeInMusic(music, 8000);
        icon.textContent = "🔊";
        isPlaying = true;
      }).catch(err => {
        console.warn("Autoplay blocked:", err);
      });
    }
  }, { once: true });
});




// Envelope click logic
document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const lightbox = document.getElementById("letter-lightbox");
  const closeBtn = document.getElementById("close-letter");

  if (envelope) {
    envelope.addEventListener("click", () => {
      lightbox.classList.remove("hidden");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.add("hidden");
    });
  }
});

