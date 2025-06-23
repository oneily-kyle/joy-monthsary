const anniversaryDate = new Date("2024-12-25");

function updateCounter() {
  const today = new Date(); // Real current date

  // Total days
  const diffTime = today - anniversaryDate;
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Years, months, days calculation
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

  // Update DOM
  document.getElementById("day-counter").textContent = totalDays;
  document.getElementById("weeks-counter").textContent = weeks;
  document.getElementById("months-counter").textContent = months;
  document.getElementById("years-counter").textContent = years;

  // === Monthsary Logic (always target 25th) ===
  const eventMessage = document.getElementById("next-event-message");
  const countdownMessage = document.getElementById("countdown-to-next");

  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // Next 25th logic
  let nextMonthsary = new Date(todayYear, todayMonth, 25);
  if (todayDate > 25) {
    // Move to next month's 25th
    nextMonthsary = new Date(todayYear, todayMonth + 1, 25);
  }

const isTodayAnniversary =
  today.getMonth() === anniversaryDate.getMonth() &&
  today.getDate() === anniversaryDate.getDate();

const isTodayMonthsary =
  !isTodayAnniversary &&
  today.getDate() === 25;

if (isTodayAnniversary) {
  if (!document.getElementById("already-celebrated")) {
    eventMessage.innerHTML = "💖 Happy Anniversary, My Love! <span id='already-celebrated'></span>";
    countdownMessage.textContent = "";
    triggerFallingHearts();
    document.getElementById("envelope-container").classList.remove("hidden");
  }
} else if (isTodayMonthsary) {
  if (!document.getElementById("already-celebrated")) {
    eventMessage.innerHTML = "💝 Happy Monthsary, My Love! <span id='already-celebrated'></span>";
    countdownMessage.textContent = "";
    triggerFallingHearts();
    document.getElementById("envelope-container").classList.remove("hidden");
  }
} else {
  const nextMonthsary = new Date(today.getFullYear(), today.getMonth(), 25);
  if (today.getDate() > 25) {
    nextMonthsary.setMonth(today.getMonth() + 1);
  }

  const daysToNext = Math.ceil((nextMonthsary - today) / (1000 * 60 * 60 * 24));
  eventMessage.textContent = "Counting down to our next monthsary... 💖";
  countdownMessage.textContent = `${daysToNext} day(s) to go!`;
}
}

// ❤️ Falling hearts function (image-based)
function triggerFallingHearts() {
  const container = document.getElementById("hearts-container");

  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
    heart.style.top = "-30px";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
  }
}

// Run on load and every minute
document.addEventListener("DOMContentLoaded", () => {
  updateCounter();
  setInterval(updateCounter, 60000);
});
