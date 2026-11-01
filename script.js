
document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTS
  const entryForm = document.getElementById("entryForm");
  const entryScreen = document.getElementById("entryScreen");
  const mainSite = document.getElementById("mainSite");

  const phoneStep = document.getElementById("phoneStep");
  const otpStep = document.getElementById("otpStep");

  const mobileInput = document.getElementById("mobileNumber");
  const otpInput = document.getElementById("otpInput");

  const entryError = document.getElementById("entryError");
  const verifyBtn = document.getElementById("verifyBtn");
  const backBtn = document.getElementById("backBtn");

  const photoScene = document.getElementById("photoScene");
  const photoCard = document.querySelector(".photo-card");

  const surpriseBtn = document.getElementById("surpriseBtn");
  const surpriseMessage = document.getElementById("surpriseMessage");

  // DEMO OTP
  const DEMO_OTP = "123456";

  // CHECK REQUIRED ELEMENTS
  if (
    !entryForm || !entryScreen || !mainSite ||
    !phoneStep || !otpStep || !mobileInput ||
    !otpInput || !entryError || !verifyBtn || !backBtn
  ) {
    console.error("Website setup error: Some HTML elements are missing.");
    return;
  }

  // PHONE NUMBER INPUT
  mobileInput.addEventListener("input", () => {
    mobileInput.value = mobileInput.value
      .replace(/\D/g, "")
      .slice(0, 10);

    entryError.textContent = "";
  });

  // SEND DEMO OTP
  entryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const number = mobileInput.value.trim();

    if (!/^[6-9]\d{9}$/.test(number)) {
      entryError.textContent =
        "Please enter a valid 10-digit Indian mobile number.";

      mobileInput.focus();
      return;
    }

    entryError.textContent = "";

    phoneStep.hidden = true;
    otpStep.hidden = false;

    otpInput.value = "";
    otpInput.focus();
  });

  // OTP INPUT
  otpInput.addEventListener("input", () => {
    otpInput.value = otpInput.value
      .replace(/\D/g, "")
      .slice(0, 6);

    entryError.textContent = "";
  });

  // VERIFY OTP
  function verifyOTP() {

    const enteredOTP = otpInput.value.trim();

    if (enteredOTP.length !== 6) {
      entryError.textContent =
        "Please enter all 6 digits of the OTP.";

      otpInput.focus();
      return;
    }

    if (enteredOTP !== DEMO_OTP) {
      entryError.textContent =
        "Incorrect OTP. Try 123456 💗";

      otpInput.value = "";
      otpInput.focus();
      return;
    }

    // SUCCESSFUL DEMO LOGIN
    entryError.textContent = "";

    mainSite.hidden = false;
    entryScreen.classList.add("leaving");

    document.body.style.overflow = "auto";

    setTimeout(() => {
      entryScreen.remove();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  }

  verifyBtn.addEventListener("click", verifyOTP);

  // ALLOW ENTER KEY TO VERIFY
  otpInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      verifyOTP();
    }
  });

  // GO BACK TO PHONE NUMBER
  backBtn.addEventListener("click", () => {
    otpStep.hidden = true;
    phoneStep.hidden = false;

    otpInput.value = "";
    entryError.textContent = "";

    mobileInput.focus();
  });

  // 3D PHOTO MOVEMENT - DESKTOP
  if (photoScene && photoCard) {

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (canHover.matches) {

      photoScene.addEventListener("mousemove", (event) => {

        const rect = photoScene.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width - 0.5;

        const y =
          (event.clientY - rect.top) / rect.height - 0.5;

        photoCard.style.transform =
          `rotateY(${x * 18}deg) rotateX(${-y * 12}deg) rotateZ(-2deg)`;

      });

      photoScene.addEventListener("mouseleave", () => {
        photoCard.style.transform =
          "rotateY(-5deg) rotateX(3deg) rotateZ(-2deg)";
      });

    }
  }

  // SURPRISE MESSAGES
  const surprises = [
    "ನೀನು ಇದ್ದರೆ ಸಾಕು, ದಿನವೇ ಚೆನ್ನಾಗಿರುತ್ತದೆ. 💗",
    "You're my favourite notification, always. ♡",
    "ಜಗಳ ಆಡಿದರೂ, ನಿನ್ನನ್ನು ಬಿಟ್ಟುಕೊಡಲ್ಲ! 😂",
    "Bestie today, tomorrow and forever. ✨",
    "ನಮ್ಮ ಸ್ನೇಹ ಸದಾ ಹೀಗೆಯೇ ಇರಲಿ. 🫶",
    "You are one of my favourite blessings. 💕",
    "No matter how far life takes us, you'll always be special to me. 🌷",
    "ನಿನ್ನ ನಗು ಯಾವಾಗಲೂ ಹೀಗೆಯೇ ಇರಲಿ. 💖"
  ];

  let surpriseIndex = 0;

  if (surpriseBtn && surpriseMessage) {

    surpriseBtn.addEventListener("click", () => {

      surpriseMessage.style.opacity = "0";

      setTimeout(() => {

        surpriseMessage.textContent =
          surprises[surpriseIndex % surprises.length];

        surpriseIndex++;

        surpriseMessage.style.opacity = "1";

      }, 180);

    });

  }

});
