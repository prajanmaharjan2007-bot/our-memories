const galleryImages = document.querySelectorAll(".gallery-item img");
const photoViewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");

// Only wire up the gallery if all the required elements exist on this page
if (photoViewer && viewerImage && closeViewer) {

    galleryImages.forEach(function(image) {
        image.addEventListener("click", function() {
            photoViewer.classList.add("active");
            viewerImage.src = image.src;
            viewerImage.alt = image.alt || "";
        });
    });

    closeViewer.addEventListener("click", function() {
        photoViewer.classList.remove("active");
    });

    photoViewer.addEventListener("click", function(event) {
        if (event.target === photoViewer) {
            photoViewer.classList.remove("active");
        }
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && photoViewer.classList.contains("active")) {
            photoViewer.classList.remove("active");
        }
    });
}

/* =========================
   ANNIVERSARY COUNTDOWN
========================= */

function updateCountdown() {

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    // If the countdown isn't on this page, stop.
    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    const now = new Date();

    // December 10
    let anniversary = new Date(
        now.getFullYear(),
        11,
        10,
        0,
        0,
        0
    );

    // If this year's anniversary has passed,
    // count down to next year's anniversary.
    if (now >= anniversary) {

        anniversary = new Date(
            now.getFullYear() + 1,
            11,
            10,
            0,
            0,
            0
        );

    }

    const difference = anniversary.getTime() - now.getTime();

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent = days;
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

// Run immediately
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);

/* =========================
   DAYS SINCE PROPOSAL
========================= */

function updateSinceProposal() {

    const sinceElement = document.getElementById("sinceProposal");

    // If this element isn't on the page, stop.
    if (!sinceElement) {
        return;
    }

    const proposalDate = new Date(2025, 11, 10, 0, 0, 0); // 10 Dec 2025
    const now = new Date();

    const difference = now.getTime() - proposalDate.getTime();

    const daysSince = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    sinceElement.textContent = daysSince;
}

// Run immediately
updateSinceProposal();

// Update once a minute (doesn't need to be per-second, it only changes daily)
setInterval(updateSinceProposal, 60 * 1000);


const music = document.getElementById("backgroundMusic");

if (music) {

    // Restore the previous position
    const savedTime = localStorage.getItem("musicTime");

    if (savedTime !== null) {
        music.currentTime = parseFloat(savedTime);
    }

    // Try to continue playing
    if (localStorage.getItem("musicPlaying") === "true") {
        music.play().catch(() => {
            console.log("Click the music button to continue playing.");
        });
    }

    // Keep saving the current position
    music.addEventListener("timeupdate", function () {

        localStorage.setItem(
            "musicTime",
            music.currentTime
        );

    });

}


// Play / pause button

function toggleMusic() {

    if (!music) return;

    if (music.paused) {

        music.play();

        localStorage.setItem(
            "musicPlaying",
            "true"
        );

    } else {

        music.pause();

        localStorage.setItem(
            "musicPlaying",
            "false"
        );

    }

}