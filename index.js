


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
// const resetModal = $("#resetPasswordModal");
// const loginModal = $("#loginModal");
// const signupModal = $("#signupModal");
// const forgotModal = $("#forgotModal");

if (resetForm) {
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("resetToken");

    if (token) {
      // Open reset modal automatically
      closeModal(loginModal);
      closeModal(signupModal);
      closeModal(forgotModal);
      openModal(resetModal);

      // Populate hidden input
      const resetTokenInput = $("#resetToken");
      if (resetTokenInput) resetTokenInput.value = token;
    }

    resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const password = $("#newPassword").value;
      const confirmPassword = $("#confirmNewPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const button = resetForm.querySelector("button[type='submit']");
      setButtonLoading(button, true);

      try {
        const res = await fetch(`${API_URL}/reset`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        });

        const result = await res.json();
        if (res.ok) {
          alert(result.message || "Password reset successful!");
          setTimeout(() => {
            closeModal(resetModal);
            openModal(loginModal);
          }, 1500);
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
}




// Show About Modal
function showAboutModal() {
  const modal = document.getElementById("aboutModal");
  if (modal) modal.style.display = "block";
}

// Close About Modal
function closeAboutModal() {
  const modal = document.getElementById("aboutModal");
  if (modal) modal.style.display = "none";
}

// Optional: close when clicking outside modal
window.addEventListener("click", function (event) {
  const modal = document.getElementById("aboutModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
// end about us



// form submition
function openContactSupportModal() {
  document.getElementById("contactSupportModal").style.display = "block";
}

function closeContactSupportModal() {
  document.getElementById("contactSupportModal").style.display = "none";
}
// ----- CONTACT SUPPORT -----
const supportForm = document.getElementById("supportForm");

if (supportForm) {
  supportForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = supportForm.querySelector("button[type='submit']");
    setButtonLoading(button, true);

    const data = {
      name: "Guest User", // optional, since we don’t have auth
      email: document.getElementById("supportEmail").value,
      phone: document.getElementById("supportPhone").value,
      subject: document.getElementById("supportSubject").value,
      message: document.getElementById("supportMessage").value,
    };

    try {
      const res = await fetch("https://api.pvbonline.online/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        alert(result.message || "Message sent successfully!");
        supportForm.reset();
        closeContactSupportModal();
      } else {
        alert(result.message || "Failed to send message.");
      }
    } catch (err) {
      alert("Error sending message. Please try again.");
    } finally {
      setButtonLoading(button, false);
    }
  });
}

// form submition end

// send email
function showContactModal() {
  document.getElementById("contactModal").style.display = "block";
}

function closeContactModal() {
  document.getElementById("contactModal").style.display = "none";
}

// Optional: close when clicking outside the modal
window.addEventListener("click", function (event) {
  const modal = document.getElementById("contactModal");
  if (event.target === modal) {
    closeContactModal();
  }
});


document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const subject = document.getElementById("contactSubject").value;
  const message = document.getElementById("contactMessage").value;

  const adminEmail = "support@pvbonline.online"; // replace with your real admin email

  const mailtoLink = `mailto:${adminEmail}?cc=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

  window.location.href = mailtoLink;

  alert("Your default email app will open. Please send the message.");
  closeContactModal();
});

// send email end



// loan

// ================= Loan Services Modal =================
function showLoanModal() {
  document.getElementById("loanModal").style.display = "block";
}

function closeLoanModal() {
  document.getElementById("loanModal").style.display = "none";
}

// ================= Personal / Business Section =================
function showPersonalLoan() {
  showLoanModal();
  document.getElementById("personalLoanSection").style.display = "block";
  document.getElementById("businessLoanSection").style.display = "none";
}

function showBusinessLoan() {
  showLoanModal();
  document.getElementById("personalLoanSection").style.display = "none";
  document.getElementById("businessLoanSection").style.display = "block";
}

// ================= Loan Application Modal =================
function showLoanApplication() {
  document.getElementById("loanApplicationModal").style.display = "block";
}

function closeLoanApplication() {
  document.getElementById("loanApplicationModal").style.display = "none";
}

// ================= Close Modals when clicking outside =================
window.addEventListener("click", function (event) {
  const loanModal = document.getElementById("loanModal");
  const loanAppModal = document.getElementById("loanApplicationModal");

  if (event.target === loanModal) closeLoanModal();
  if (event.target === loanAppModal) closeLoanApplication();
});

// ================= Loan Application Form Submit =================
document.getElementById("loanApplicationForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const loanData = {
    loanType: document.getElementById("loanType").value,
    loanAmount: document.getElementById("loanAmount").value,
    applicantName: document.getElementById("applicantName").value,
    applicantEmail: document.getElementById("applicantEmail").value,
    applicantPhone: document.getElementById("applicantPhone").value,
    annualIncome: document.getElementById("annualIncome").value,
    loanPurpose: document.getElementById("loanPurpose").value,
  };

  try {
    const res = await fetch("https://api.pvbonline.online/api/public/loans/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loanData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Loan application submitted successfully!");
      document.getElementById("loanApplicationForm").reset();
      closeLoanApplication();
    } else {
      alert("Error: " + data.message);
    }
  } catch (err) {
    console.error("Loan application error:", err);
    alert("Something went wrong. Please try again later.");
  }
});
// loan end


// chart


  const socket = io("https://api.pvbonline.online"); // backend domain

  // Open chat modal
  function openChatModal() {
    document.getElementById("chatModal").style.display = "block";
  }

  // Close chat modal
  function closeChatModal() {
    document.getElementById("chatModal").style.display = "none";
  }

  // Send message from visitor to server
  function sendChatMessage() {
    const input = document.getElementById("chatInput");
    const msg = input.value.trim();
    if (!msg) return;

    socket.emit("visitorMessage", msg); // use visitorMessage instead of userMessage
    appendMessage("You", msg, "visitor");
    input.value = "";
  }

  // Listen for admin replies
  socket.on("adminMessage", (msg) => {
    appendMessage("Support", msg, "agent");
  });

  // Helper to append messages
  function appendMessage(sender, text, type) {
    const chatMessages = document.getElementById("chatMessages");
    const div = document.createElement("div");
    div.classList.add("message", type);
    div.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Allow Enter key to send message
  function handleChatKeyPress(e) {
    if (e.key === "Enter") {
      sendChatMessage();
    }
  }


// chart end

// =================== MODAL HANDLING ===================

// const $ = (selector) => document.querySelector(selector);

// // Open and close modal helpers
// const openModal = (modalSelector) => {
//   console.log("Opening modal:", modalSelector);
//   const modal = typeof modalSelector === 'string' ? $(modalSelector) : modalSelector;
//   console.log("Modal element found:", modal);
//   if (modal) {
//     modal.classList.add("active");
//     console.log("Modal should now be active");
//   } else {
//     console.error("Modal element not found!");
//   }
// };

// const closeModal = (modalSelector) => {
//   const modal = typeof modalSelector === 'string' ? $(modalSelector) : modalSelector;
//   modal?.classList.remove("active");
// };

// // =================== FORM HANDLERS ===================
// const API_URL = "https://api.pvbonline.online/api/users";

// // Utility: button loading state
// const setButtonLoading = (button, isLoading, text = "Processing...") => {
//   if (!button) return;
//   if (isLoading) {
//     button.disabled = true;
//     button.dataset.originalText = button.textContent;
//     button.innerHTML = `<span class="spinner"></span> ${text}`;
//   } else {
//     button.disabled = false;
//     button.textContent = button.dataset.originalText || button.textContent;
//   }
// };

// // Add this at the very top to check URL immediately
// console.log("=== RESET PASSWORD DEBUG ===");
// console.log("Current URL:", window.location.href);
// console.log("URL Search:", window.location.search);

// const urlParams = new URLSearchParams(window.location.search);
// const resetToken = urlParams.get("resetToken");
// console.log("Reset token from URL:", resetToken);

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM Content Loaded - Starting initialization");
  
//   // Modal elements
//   const loginModal = $("#loginModal");
//   const signupModal = $("#signupModal");
//   const forgotModal = $("#forgotModal");
//   const resetModal = $("#resetPasswordModal");
  
//   console.log("Modal elements found:");
//   console.log("Login modal:", loginModal);
//   console.log("Signup modal:", signupModal);
//   console.log("Forgot modal:", forgotModal);
//   console.log("Reset modal:", resetModal);

//   // Check if we have a reset token IMMEDIATELY
//   if (resetToken) {
//     console.log("=== RESET TOKEN DETECTED ===");
//     console.log("Token value:", resetToken);
    
//     // Try to open reset modal immediately
//     if (resetModal) {
//       console.log("Reset modal exists, attempting to open...");
      
//       // Close all other modals
//       if (loginModal) loginModal.classList.remove("active");
//       if (signupModal) signupModal.classList.remove("active");
//       if (forgotModal) forgotModal.classList.remove("active");
      
//       // Open reset modal
//       resetModal.classList.add("active");
//       console.log("Reset modal classes after opening:", resetModal.classList.toString());
      
//       // Check if modal is actually visible
//       const computedStyle = window.getComputedStyle(resetModal);
//       console.log("Reset modal display:", computedStyle.display);
//       console.log("Reset modal visibility:", computedStyle.visibility);
//     } else {
//       console.error("CRITICAL ERROR: Reset modal not found in DOM!");
//       console.log("Available elements with 'reset' in ID:");
//       document.querySelectorAll('[id*="reset"], [id*="Reset"]').forEach(el => {
//         console.log("Found element:", el.id, el);
//       });
//     }
//   } else {
//     console.log("No reset token found in URL");
//   }

//   // ----- ONLINE BANKING BUTTON -----
//   const onlineBankingBtn = document.querySelector(".button-olb");
//   onlineBankingBtn?.addEventListener("click", () => openModal(loginModal));

//   // ----- MODAL BUTTONS -----
//   $("#closeLogin")?.addEventListener("click", () => closeModal(loginModal));
//   $("#showSignup")?.addEventListener("click", () => { closeModal(loginModal); openModal(signupModal); });
//   $("#showForgot")?.addEventListener("click", () => { closeModal(loginModal); openModal(forgotModal); });

//   $("#closeSignup")?.addEventListener("click", () => closeModal(signupModal));
//   $("#backToLogin")?.addEventListener("click", () => { closeModal(signupModal); openModal(loginModal); });

//   $("#closeForgot")?.addEventListener("click", () => closeModal(forgotModal));
//   $("#backToLoginFromForgot")?.addEventListener("click", () => { closeModal(forgotModal); openModal(loginModal); });

//   $("#closeReset")?.addEventListener("click", () => closeModal(resetModal));

//   // ----- LOGIN -----
//   const loginForm = $("#loginForm");
//   if (loginForm) {
//     loginForm.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const button = loginForm.querySelector("button[type='submit']");
//       setButtonLoading(button, true);

//       const data = {
//         email: $("#email").value,
//         password: $("#password").value,
//       };

//       try {
//         const res = await fetch(`${API_URL}/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         });
//         const result = await res.json();
//         if (res.ok) {
//           alert("Login successful!");
//           localStorage.setItem("token", result.token);
//           window.location.href = "/userpage.html";
//         } else {
//           alert(result.message || "Login failed.");
//         }
//       } catch {
//         alert("Login failed. Please try again.");
//       } finally {
//         setButtonLoading(button, false);
//       }
//     });
//   }

//   // ----- SIGNUP -----
//   const signupForm = $("#signupForm");
//   if (signupForm) {
//     signupForm.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const button = signupForm.querySelector("button[type='submit']");
//       setButtonLoading(button, true);

//       const data = {
//         fullname: $("#fullName").value,
//         email: $("#signupEmail").value,
//         phone: $("#phone").value,
//         password: $("#signupPassword").value,
//       };

//       try {
//         const res = await fetch(`${API_URL}/register`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         });
//         const result = await res.json();
//         if (res.ok) {
//           alert("Registration successful!");
//           closeModal(signupModal);
//           openModal(loginModal);
//         } else {
//           alert(result.message || "Signup failed.");
//         }
//       } catch {
//         alert("Signup failed. Please try again.");
//       } finally {
//         setButtonLoading(button, false);
//       }
//     });
//   }

//   // ----- FORGOT PASSWORD -----
//   const forgotForm = $("#forgotForm");
//   if (forgotForm) {
//     forgotForm.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const button = forgotForm.querySelector("button[type='submit']");
//       setButtonLoading(button, true);

//       const email = $("#forgotEmail").value;
//       try {
//         const res = await fetch(`${API_URL}/forgot`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email }),
//         });
//         const result = await res.json();
//         if (res.ok) {
//           alert(result.message || "Reset link sent. Check your email.");
//         } else {
//           alert(result.message || "Failed to send reset link.");
//         }
//       } catch {
//         alert("Failed to send reset link. Please try again.");
//       } finally {
//         setButtonLoading(button, false);
//       }
//     });
//   }

//   // ----- RESET PASSWORD -----
//   const resetForm = $("#resetPasswordForm");
//   console.log("Reset form found:", resetForm);
  
//   if (resetForm && resetToken) {
//     console.log("=== SETTING UP RESET FORM ===");
    
//     // Populate hidden input
//     const resetTokenInput = $("#resetToken");
//     console.log("Reset token input found:", resetTokenInput);
//     if (resetTokenInput) {
//       resetTokenInput.value = resetToken;
//       console.log("Token set in hidden input:", resetTokenInput.value);
//     }

//     resetForm.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       console.log("Reset form submitted");

//       const password = $("#newPassword")?.value;
//       const confirmPassword = $("#confirmNewPassword")?.value;
      
//       console.log("Password fields:", { password: password ? "filled" : "empty", confirmPassword: confirmPassword ? "filled" : "empty" });

//       if (password !== confirmPassword) {
//         alert("Passwords do not match!");
//         return;
//       }

//       const button = resetForm.querySelector("button[type='submit']");
//       setButtonLoading(button, true);

//       try {
//         console.log("Sending reset request with token:", resetToken);
//         const res = await fetch(`${API_URL}/reset`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ token: resetToken, password }),
//         });
//         const result = await res.json();
//         console.log("Reset response:", result);
        
//         if (res.ok) {
//           alert(result.message || "Password reset successful!");
//           setTimeout(() => {
//             closeModal(resetModal);
//             openModal(loginModal);
//           }, 1500);
//         } else {
//           alert(result.message || "Reset failed.");
//         }
//       } catch (error) {
//         console.error("Reset error:", error);
//         alert("Reset failed. Please try again.");
//       } finally {
//         setButtonLoading(button, false);
//       }
//     });
//   }
// });