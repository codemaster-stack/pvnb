


// =================== MODAL HANDLING ===================

// Utility to get element safely
const $ = (selector) => document.querySelector(selector);

// Modal elements
const loginModal = $("#loginModal");
const signupModal = $("#signupModal");
const forgotModal = $("#forgotModal");
const resetModal = $("#resetPasswordModal");

// Open and close modal helpers
const openModal = (modal) => modal?.classList.add("active");
const closeModal = (modal) => modal?.classList.remove("active");

// ----- ONLINE BANKING BUTTON -----
const onlineBankingBtn = document.querySelector(".button-olb");
onlineBankingBtn?.addEventListener("click", () => openModal(loginModal));

// ----- LOGIN MODAL BUTTONS -----
$("#closeLogin")?.addEventListener("click", () => closeModal(loginModal));
$("#showSignup")?.addEventListener("click", () => {
  closeModal(loginModal);
  openModal(signupModal);
});
$("#showForgot")?.addEventListener("click", () => {
  closeModal(loginModal);
  openModal(forgotModal);
});

// ----- SIGNUP MODAL BUTTONS -----
$("#closeSignup")?.addEventListener("click", () => closeModal(signupModal));
$("#backToLogin")?.addEventListener("click", () => {
  closeModal(signupModal);
  openModal(loginModal);
});

// ----- FORGOT PASSWORD MODAL BUTTONS -----
$("#closeForgot")?.addEventListener("click", () => closeModal(forgotModal));
$("#backToLoginFromForgot")?.addEventListener("click", () => {
  closeModal(forgotModal);
  openModal(loginModal);
});

// ----- RESET PASSWORD MODAL BUTTON -----
$("#closeReset")?.addEventListener("click", () => closeModal(resetModal));

// =================== FORM HANDLERS ===================
const API_URL = "https://api.pvbonline.online/api/users"; // update if deployed

// Utility function to handle button loading state
const setButtonLoading = (button, isLoading, text = "Processing...") => {
  if (isLoading) {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.innerHTML = `<span class="spinner"></span> ${text}`;
  } else {
    button.disabled = false;
    button.textContent = button.dataset.originalText || button.textContent;
  }
};

// ----- LOGIN -----
const loginForm = $("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = loginForm.querySelector("button[type='submit']");
    setButtonLoading(button, true);

    const data = {
      email: $("#email").value,
      password: $("#password").value,
    };
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        alert("Login successful!");
        localStorage.setItem("token", result.token);
        window.location.href = "/userpage.html";
      } else {
        alert(result.message || "Login failed.");
      }
    } catch (err) {
      alert("Login failed. Please try again.");
    } finally {
      setButtonLoading(button, false);
    }
  });
}

// ----- SIGNUP -----
const signupForm = $("#signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = signupForm.querySelector("button[type='submit']");
    setButtonLoading(button, true);

    const data = {
      fullname: $("#fullName").value,
      email: $("#signupEmail").value,
      phone: $("#phone").value,
      password: $("#signupPassword").value,
    };
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        closeModal(signupModal);
        openModal(loginModal);
      } else {
        alert(result.message || "Signup failed.");
      }
    } catch (err) {
      alert("Signup failed. Please try again.");
    } finally {
      setButtonLoading(button, false);
    }
  });
}

// ----- FORGOT PASSWORD -----
const forgotForm = $("#forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = forgotForm.querySelector("button[type='submit']");
    setButtonLoading(button, true);

    const email = $("#forgotEmail").value;
    try {
      const res = await fetch(`${API_URL}/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message || "Reset link sent. Check your email.");
      } else {
        alert(result.message || "Failed to send reset link.");
      }
    } catch (err) {
      alert("Failed to send reset link. Please try again.");
    } finally {
      setButtonLoading(button, false);
    }
  });
}

// ----- RESET PASSWORD -----
const resetForm = $("#resetPasswordForm");
if (resetForm) {
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("resetToken");

    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const button = resetForm.querySelector("button[type='submit']");
      setButtonLoading(button, true);

      const password = $("#newPassword").value;
      try {
        const res = await fetch(`${API_URL}/reset`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        });
        const result = await res.json();
        if (res.ok) {
          alert(result.message || "Password reset successful!");
          setTimeout(() => window.location.href = "/login.html", 1500);
        } else {
          alert(result.message || "Reset failed.");
        }
      } catch (err) {
        alert("Reset failed. Please try again.");
      } finally {
        setButtonLoading(button, false);
      }
    });
  });
};

