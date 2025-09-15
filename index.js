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
<script src="/socket.io/socket.io.js"></script>

  const socket = io();

  // Load chat history
  socket.on("chatHistory", (history) => {
    const messages = document.getElementById("chatMessages");
    history.forEach(msg => appendMessage(msg));
  });

  // Receive new messages
  socket.on("chatMessage", (msg) => {
    appendMessage(msg);
  });

  function sendChatMessage() {
    const input = document.getElementById("chatInput");
    const messageText = input.value.trim();
    if (!messageText) return;

    const msg = {
      sender: "user", // or "admin" depending on page
      message: messageText,
      timestamp: new Date()
    };

    socket.emit("chatMessage", msg);
    input.value = "";
  }

  function appendMessage(msg) {
    const messages = document.getElementById("chatMessages");
    const div = document.createElement("div");
    div.classList.add("message", msg.sender === "admin" ? "agent-message" : "user-message");
    div.innerHTML = `
      <div class="message-content">
        <div class="message-header">${msg.sender === "admin" ? "Customer Support" : "You"}</div>
        <div class="message-text">${msg.message}</div>
        <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</div>
      </div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
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

// =================== MODAL HANDLERS ===================
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
        // Clear URL parameters when closing
        window.history.replaceState({}, document.title, window.location.pathname);
    });
}

// Universal close if clicking outside any modal - FIXED CLASS NAMES
window.addEventListener("click", (e) => {
    ["login-modal", "signup-modal", "forgot-modal", "reset-modal"].forEach((cls) => {
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

// =================== RESET PASSWORD - FIXED ===================
window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded, checking for reset token...");
    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("resetToken");
    
    console.log("Reset token found:", token);
    
    if (token) {
        const modal = document.getElementById("resetPasswordModal");
        const tokenInput = document.getElementById("resetToken");
        
        console.log("Modal element:", modal);
        console.log("Token input element:", tokenInput);
        
        if (modal && tokenInput) {
            // Hide all other modals first
            const loginModal = document.getElementById("loginModal");
            const signupModal = document.getElementById("signupModal");
            const forgotModal = document.getElementById("forgotModal");
            
            if (loginModal) loginModal.style.display = "none";
            if (signupModal) signupModal.style.display = "none";
            if (forgotModal) forgotModal.style.display = "none";
            
            // Show reset password modal
            modal.style.display = "flex";
            tokenInput.value = token;
            
            console.log("Reset password modal should now be visible");
        } else {
            console.error("Missing modal or token input elements");
            if (!modal) console.error("resetPasswordModal element not found in DOM");
            if (!tokenInput) console.error("resetToken input element not found in DOM");
        }
    } else {
        console.log("No reset token found in URL");
    }
});

// Reset password form submission
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
        
        if (password.length < 6) {
            return alert("Password must be at least 6 characters long!");
        }
        
        try {
            const res = await fetch("https://api.pvbonline.online/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                alert(data.message || "Password reset successful!");
                document.getElementById("resetPasswordModal").style.display = "none";
                document.getElementById("loginModal").style.display = "flex";
                
                // Clear the URL parameters
                window.history.replaceState({}, document.title, window.location.pathname);
            } else {
                alert(data.message || "Reset failed");
            }
        } catch (err) {
            console.error("Reset password error:", err);
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
document.getElementById('supportForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const email = document.getElementById('supportEmail').value;
    const phone = document.getElementById('supportPhone').value;
    const subject = document.getElementById('supportSubject').value;
    const message = document.getElementById('supportMessage').value;

    try {
        const res = await fetch("https://api.pvbonline.online/api/support/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, phone, subject, message })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Message sent successfully!");
            closeContactSupportModal();
            this.reset();
        } else {
            alert(data.message || "Failed to send message");
        }
    } catch (err) {
        console.error("Support form error:", err);
        alert("An error occurred. Please try again.");
    }
});

// Close modal when clicking overlay
document.getElementById('mobileOverlay').addEventListener('click', function() {
    closeContactSupportModal();
});




// Polling for guest replies (every 12s)
async function fetchGuestRepliesBadge() {
  const email = localStorage.getItem('pv_support_contact_email');
  if (!email) return;

  try {
    const res = await fetch(`https://api.pvbonline.online/api/support/email/messages?email=${encodeURIComponent(email)}`);
    if (!res.ok) return;
    const data = await res.json();
    const messages = data.data || [];

    // count unread admin replies
    let unreadReplies = 0;
    messages.forEach(m => {
      const adminReplies = (m.replies || []).filter(r => r.sender === 'admin');
      // if any admin reply and isReadByUser is false => count
      if (adminReplies.length && !m.isReadByUser) unreadReplies++;
    });

    // update UI
    const mailIcon = document.querySelector('.mail-icon'); // change if your selector differs
    if (mailIcon) {
      // create or update badge
      let badge = document.getElementById('guestSupportBadge');
      if (!badge) {
        badge = document.createElement('span');
        badge.id = 'guestSupportBadge';
        badge.style.cssText = 'background:#ff4d4f;color:#fff;border-radius:12px;padding:2px 6px;margin-left:6px;font-size:12px;';
        mailIcon.appendChild(badge);
      }
      badge.textContent = unreadReplies > 0 ? unreadReplies : '';
    }
  } catch (e) {
    console.warn('Guest reply badge failed', e.message);
  }
}

// start polling every 12s
setInterval(fetchGuestRepliesBadge, 12000);
document.addEventListener('DOMContentLoaded', fetchGuestRepliesBadge);


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
document.getElementById('loanApplicationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const loanData = Object.fromEntries(formData);

    try {
        const res = await fetch('https://api.pvbonline.online/api/loan/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loanData)
        });

        const result = await res.json();

        if (result.success) {
            alert('Loan application submitted successfully! We will contact you soon.');
            closeLoanApplication();
            this.reset();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (err) {
        console.error(err);
        alert('Server error, please try again later.');
    }
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


  
    


