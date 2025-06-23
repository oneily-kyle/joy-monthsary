const anniversaryDate = new Date("2024-12-25");
const today = new Date();

// Total days
const diffTime = today - anniversaryDate;
const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

// Calculate exact years, months, days
let years = today.getFullYear() - anniversaryDate.getFullYear();
let months = today.getMonth() - anniversaryDate.getMonth();
let days = today.getDate() - anniversaryDate.getDate();

if (days < 0) {
  months--;
  const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  days += prevMonth.getDate();
}
if (months < 0) {
  years--;
  months += 12;
}

const weeks = Math.floor(days / 7);

// Set display
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("day-counter").textContent = totalDays;
  document.getElementById("weeks-counter").textContent = weeks;
  document.getElementById("months-counter").textContent = months;
  document.getElementById("years-counter").textContent = years;

  // === Countdown logic ===

  // Determine the next monthsary
  const nextMonthsary = new Date(anniversaryDate);
  nextMonthsary.setMonth(nextMonthsary.getMonth() + months + 1);
  if (today > nextMonthsary) {
    nextMonthsary.setMonth(nextMonthsary.getMonth() + 1); // move to the next
  }

  // Check if it's exactly the day
  const isTodayMonthsary =
    today.getFullYear() === nextMonthsary.getFullYear() &&
    today.getMonth() === nextMonthsary.getMonth() &&
    today.getDate() === nextMonthsary.getDate();

  const countdownMessage = document.getElementById("countdown-to-next");
  const eventMessage = document.getElementById("next-event-message");

  if (isTodayMonthsary) {
    eventMessage.textContent = "💝 Happy Monthsary, My Love!";
    countdownMessage.textContent = "";

  // Trigger falling hearts
  triggerFallingHearts();
  } else {
    // Countdown in days
    const timeToNext = nextMonthsary - today;
    const daysToNext = Math.ceil(timeToNext / (1000 * 60 * 60 * 24));
    countdownMessage.textContent = `${daysToNext} day(s) to go!`;
  }
});

function triggerFallingHearts() {
  const container = document.getElementById("hearts-container");

  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
    container.appendChild(heart);

    // Optional: remove after animation ends
    setTimeout(() => heart.remove(), 6000);
  }
}

