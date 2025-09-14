 // hamburger menu code
const hamburger = document.querySelector('.open-mobilemenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
}

hamburger.addEventListener('click', toggleMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Close menu when nav item is clicked
const mobileNavItems = document.querySelectorAll('.mobile-menu .nav-item');
mobileNavItems.forEach(item => {
    item.addEventListener('click', closeMobileMenu);
});

// end of hamburger menu code

// chat modal functionality
function openChatModal() {
  document.getElementById("chatModal").style.display = "flex";
  document.getElementById("chatStatus").innerHTML = `
    <div class="chat-status-dot" style="background: green;"></div>
    <span>Connected</span>
  `;
}

function closeChatModal() {
  document.getElementById("chatModal").style.display = "none";
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const messageText = input.value.trim();
  if (messageText === "") return;

  const messages = document.getElementById("chatMessages");

  // Add user message
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "user-message");
  messageDiv.innerHTML = `
    <div class="message-content">
      <div class="message-header">You</div>
      <div class="message-text">${messageText}</div>
      <div class="message-time">${new Date().toLocaleTimeString()}</div>
    </div>
  `;
  messages.appendChild(messageDiv);

  // Scroll to bottom
  messages.scrollTop = messages.scrollHeight;

  input.value = "";

  // Fake agent reply (optional)
  setTimeout(() => {
    const reply = document.createElement("div");
    reply.classList.add("message", "agent-message");
    reply.innerHTML = `
      <div class="message-avatar"><i class="fas fa-user-tie"></i></div>
      <div class="message-content">
        <div class="message-header">Customer Support</div>
        <div class="message-text">Thanks for your message! We'll assist shortly.</div>
        <div class="message-time">${new Date().toLocaleTimeString()}</div>
      </div>
    `;
    messages.appendChild(reply);
    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}

function handleChatKeyPress(event) {
  if (event.key === "Enter") {
    sendChatMessage();
  }
}
// end of chat modal functionality



    // About Us Modal

  const aboutModal = document.getElementById("aboutModal");

  // Function called by your nav onclick
  function showAboutModal() {
    aboutModal.style.display = "flex";
  }

  // Close modal
  function closeAboutModal() {
    aboutModal.style.display = "none";
  }

  // Close when clicking outside modal content
  window.addEventListener("click", (e) => {
    if (e.target === aboutModal) {
      closeAboutModal();
    }
  });
// end of about us


// all user onbarding
// =================== OPEN/CLOSE MODALS ===================

// Open login modal
document.querySelector(".button-olb").addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "flex";
});

// Close login modal
document.getElementById("closeLogin").addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "none";
});

// Switch to signup modal
document.getElementById("showSignup").addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("signupModal").style.display = "flex";
});

// Back to login from signup
document.getElementById("backToLogin").addEventListener("click", () => {
  document.getElementById("signupModal").style.display = "none";
  document.getElementById("loginModal").style.display = "flex";
});

// Close signup modal
document.getElementById("closeSignup").addEventListener("click", () => {
  document.getElementById("signupModal").style.display = "none";
});

// Switch to forgot modal
document.getElementById("showForgot").addEventListener("click", () => {
  document.getElementById("loginModal").style.display = "none";
  document.getElementById("forgotModal").style.display = "flex";
});

// Back to login from forgot
document.getElementById("backToLoginFromForgot").addEventListener("click", () => {
  document.getElementById("forgotModal").style.display = "none";
  document.getElementById("loginModal").style.display = "flex";
});

// Close forgot modal
document.getElementById("closeForgot").addEventListener("click", () => {
  document.getElementById("forgotModal").style.display = "none";
});

// Close reset modal
const closeResetBtn = document.getElementById("closeReset");
if (closeResetBtn) {
  closeResetBtn.addEventListener("click", () => {
    document.getElementById("resetPasswordModal").style.display = "none";
  });
}

// Universal close if clicking outside any modal
window.addEventListener("click", (e) => {
  ["login-modal", "signup-modal", "forgot-modal", "reset-password-modal"].forEach((cls) => {
    if (e.target.classList.contains(cls)) {
      e.target.style.display = "none";
    }
  });
});

// =================== SIGNUP ===================
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("fullName").value;
    const email = document.getElementById("signupEmail").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await fetch("https://api.pvbonline.online/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful! Please login.");
        document.getElementById("signupModal").style.display = "none";
        document.getElementById("loginModal").style.display = "flex";
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  });
}

// =================== LOGIN ===================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("https://api.pvbonline.online/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        alert("Login successful!");
        localStorage.setItem("token", data.token);
        document.getElementById("loginModal").style.display = "none";
        window.location.href = "userpage.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  });
}

// =================== FORGOT PASSWORD ===================
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("forgotEmail").value;
    try {
      const res = await fetch("https://api.pvbonline.online/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Password reset link sent to your email!");
        document.getElementById("forgotModal").style.display = "none";
        document.getElementById("loginModal").style.display = "flex";
      } else {
        alert(data.message || "Failed to send reset link");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  });
}

// =================== RESET PASSWORD ===================
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("resetToken"); // confirm with backend if param name is resetToken or token

  if (token) {
    const modal = document.getElementById("resetPasswordModal");
    const tokenInput = document.getElementById("resetToken");
    if (modal && tokenInput) {
      modal.style.display = "flex";
      tokenInput.value = token;
    }
  }
});

const resetForm = document.getElementById("resetPasswordForm");
if (resetForm) {
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;
    const token = document.getElementById("resetToken").value;

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const res = await fetch("https://api.pvbonline.online/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Password reset successful");
        document.getElementById("resetPasswordModal").style.display = "none";
      } else {
        alert(data.message || "Reset failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  });
}

// all user onbarding end

 //Send Email Contact Modal Functions

  function showContactModal() {
    document.getElementById("contactModal").style.display = "flex";
  }

  function closeContactModal() {
    document.getElementById("contactModal").style.display = "none";
  }

  // Handle form submit
  document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const subject = document.getElementById("contactSubject").value;
    const message = document.getElementById("contactMessage").value;

    // build mailto
    const mailtoLink = `mailto:support@pvbonline.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;

    window.location.href = mailtoLink;

    // close modal
    closeContactModal();
  });

// End Send Email Contact Modal Functions


//  fined us/card valet support by form

function openContactSupportModal() {
    document.getElementById('contactSupportModal').style.display = 'block';
    document.getElementById('mobileOverlay').classList.add('active'); // Use existing overlay
}

function closeContactSupportModal() {
    document.getElementById('contactSupportModal').style.display = 'none';
    document.getElementById('mobileOverlay').classList.remove('active');
}

// Handle form submission
document.getElementById('supportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const email = document.getElementById('supportEmail').value;
    const phone = document.getElementById('supportPhone').value;
    const subject = document.getElementById('supportSubject').value;
    const message = document.getElementById('supportMessage').value;
    
    // Here you can handle the form submission (send to server, etc.)
    alert('Message sent successfully!');
    closeContactSupportModal();
    
    // Reset form
    this.reset();
});

// Close modal when clicking overlay
document.getElementById('mobileOverlay').addEventListener('click', function() {
    closeContactSupportModal();
});

// End of fined us/card valet support by form




// Show loan modal functions

function showPersonalLoan() {
    document.getElementById('loanModal').style.display = 'block';
    // Show only personal loan section
    document.getElementById('personalLoanSection').style.display = 'block';
    document.getElementById('businessLoanSection').style.display = 'none';
    document.getElementById('loanModalTitle').innerHTML = '<i class="fas fa-user"></i> Personal Loans';
}

function showBusinessLoan() {
    document.getElementById('loanModal').style.display = 'block';
    // Show only business loan section
    document.getElementById('personalLoanSection').style.display = 'none';
    document.getElementById('businessLoanSection').style.display = 'block';
    document.getElementById('loanModalTitle').innerHTML = '<i class="fas fa-building"></i> Business Loans';
}

function closeLoanModal() {
    document.getElementById('loanModal').style.display = 'none';
}

function showLoanApplication() {
    document.getElementById('loanModal').style.display = 'none';
    document.getElementById('loanApplicationModal').style.display = 'block';
}

function closeLoanApplication() {
    document.getElementById('loanApplicationModal').style.display = 'none';
}

// Handle loan application form submission
document.getElementById('loanApplicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const loanData = Object.fromEntries(formData);
    
    // Here you would normally send data to server
    alert('Loan application submitted successfully! We will contact you soon.');
    
    // Close modal and reset form
    closeLoanApplication();
    this.reset();
});

// Close modals when clicking outside
window.onclick = function(event) {
    const loanModal = document.getElementById('loanModal');
    const appModal = document.getElementById('loanApplicationModal');
    
    if (event.target === loanModal) {
        closeLoanModal();
    }
    if (event.target === appModal) {
        closeLoanApplication();
    }
}

// Loan modal functions end here


  
    


