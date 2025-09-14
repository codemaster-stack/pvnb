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




  // Open login modal when ONLINE BANKING button is clicked

  document.querySelector(".button-olb").addEventListener("click", () => {
    document.getElementById("loginModal").style.display = "flex";
  });

  // Close login modal
  document.getElementById("closeLogin").addEventListener("click", () => {
    document.getElementById("loginModal").style.display = "none";
  });

  // Open signup modal
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

  // Close if clicking outside modal content
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("login-modal")) {
      document.getElementById("loginModal").style.display = "none";
    }
    if (e.target.classList.contains("signup-modal")) {
      document.getElementById("signupModal").style.display = "none";
    }
  });


// Open forgot modal
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

// Close if clicking outside modal
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("forgot-modal")) {
    document.getElementById("forgotModal").style.display = "none";
  }
});

// Forgot password form End


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



  // =================== SIGNUP ===================
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("signupEmail").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const res = await fetch("https://api.pvbonline.online/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, phone, password })
        });
        const data = await res.json();

        if(res.ok) {
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

// =================== LOGIN ===================
const loginForm = document.getElementById("loginForm");
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

        if(res.ok) {
            alert("Login successful!");
            // Save token if your backend returns JWT
            localStorage.setItem("token", data.token);
            document.getElementById("loginModal").style.display = "none";
            // Optionally redirect
            window.location.href = "/";
        } else {
            alert(data.message || "Login failed");
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred. Please try again.");
    }
});

// =================== FORGOT PASSWORD ===================
const forgotForm = document.getElementById("forgotForm");
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

        if(res.ok) {
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


// End About Us Modal
// Login/SignUp End


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


      // Mobile menu functionality
// const openMenu = document.querySelector('.open-mobilemenu');
// const closeMenu = document.querySelector('.close-mobilemenu');
// const mobileMenu = document.querySelector('.mobilemenu');
// const overlay = document.querySelector('.overlay-mask');

// openMenu.addEventListener('click', () => {
//     mobileMenu.classList.add('active');
//     overlay.classList.add('active');
//     document.body.style.overflow = 'hidden';
// });

// closeMenu.addEventListener('click', closeMenuFunc);
// overlay.addEventListener('click', closeMenuFunc);

// function closeMenuFunc() {
//     mobileMenu.classList.remove('active');
//     overlay.classList.remove('active');
//     document.body.style.overflow = 'auto';
// }

// Search functionality
// const searchIcon = document.querySelector('.search-icon');
// const searchWrapper = document.querySelector('.search-field-wrapper');
// const closeSearch = document.querySelector('.close-search');

// searchIcon.addEventListener('click', () => {
//     searchWrapper.classList.remove('hide');
//     document.querySelector('#searchfield').focus();
// });

// closeSearch.addEventListener('click', () => {
//     searchWrapper.classList.add('hide');
// });

// Login Modal functionality
// const onlineBankingBtn = document.querySelector('.button-olb');
// const loginModal = document.getElementById('loginModal');
// const signupModal = document.getElementById('signupModal');
// const forgotModal = document.getElementById('forgotModal');
// const closeLogin = document.getElementById('closeLogin');
// const closeSignup = document.getElementById('closeSignup');
// const closeForgot = document.getElementById('closeForgot');
// const showSignup = document.getElementById('showSignup');
// const showForgot = document.getElementById('showForgot');
// const backToLogin = document.getElementById('backToLogin');
// const backToLoginFromForgot = document.getElementById('backToLoginFromForgot');

// Open login modal
// onlineBankingBtn.addEventListener('click', () => {
//     loginModal.classList.add('active');
//     document.body.style.overflow = 'hidden';
//     document.getElementById('email').focus();
// });

// Close modals
// function closeAllModals() {
//     loginModal.classList.remove('active');
//     signupModal.classList.remove('active');
//     forgotModal.classList.remove('active');
//     document.body.style.overflow = 'auto';
// }

// closeLogin.addEventListener('click', closeAllModals);
// closeSignup.addEventListener('click', closeAllModals);
// closeForgot.addEventListener('click', closeAllModals);

// // Close modal when clicking outside
// loginModal.addEventListener('click', (e) => {
//     if (e.target === loginModal) closeAllModals();
// });
// signupModal.addEventListener('click', (e) => {
//     if (e.target === signupModal) closeAllModals();
// });
// forgotModal.addEventListener('click', (e) => {
//     if (e.target === forgotModal) closeAllModals();
// });

// Switch between modals
// showSignup.addEventListener('click', () => {
//     loginModal.classList.remove('active');
//     signupModal.classList.add('active');
//     document.getElementById('fullName').focus();
// });

// showForgot.addEventListener('click', () => {
//     loginModal.classList.remove('active');
//     forgotModal.classList.add('active');
//     document.getElementById('forgotEmail').focus();
// });

// backToLogin.addEventListener('click', () => {
//     signupModal.classList.remove('active');
//     loginModal.classList.add('active');
//     document.getElementById('email').focus();
// });

// backToLoginFromForgot.addEventListener('click', () => {
//     forgotModal.classList.remove('active');
//     loginModal.classList.add('active');
//     document.getElementById('email').focus();
// });

// Handle form submissions - FIXED LOGIN FORM
// document.getElementById('loginForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const res = await fetch("https://pvnbank.onrender.com/api/auth/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//             alert("Login successful!");
//             console.log("User:", data);
//             closeAllModals();

            // FIXED: Correct localStorage syntax and use data.token
            // localStorage.setItem("authToken", data.token);

            // FIXED: Correct window.location.href syntax
//             if (data.role && data.role.toLowerCase() === "admin") {
//                 window.location.href = "admin.html";
//             } else {
//                 window.location.href = "userDashboard.html";
//             }
//         } else {
//             alert("Login failed: " + data.message);
//         }
//     } catch (err) {
//         alert("Error connecting to server");
//         console.error(err);
//     }
// });

// Signup form
// document.getElementById('signupForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const fullName = document.getElementById('fullName').value;
//     const email = document.getElementById('signupEmail').value;
//     const phone = document.getElementById('phone').value;
//     const password = document.getElementById('signupPassword').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;

//     if (!fullName || !email || !phone || !password || !confirmPassword) {
//         alert("Please fill in all fields");
//         return;
//     }

//     if (password !== confirmPassword) {
//         alert("Passwords do not match");
//         return;
//     }

    // try {
    //     const res = await fetch("https://pvnbank.onrender.com/api/auth/register", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             fullName,
    //             email,
    //             phone,
    //             password,
    //         }),
    //     });

    //     const data = await res.json();

    //     if (res.ok) {
    //         alert("Account created successfully!");
    //         closeAllModals();

            // Open login modal immediately
//             loginModal.classList.add('active');
//             document.body.style.overflow = 'hidden';
//             document.getElementById('email').focus();
//         } else {
//             alert("Registration failed: " + data.message);
//         }
//     } catch (err) {
//         alert("Error connecting to server");
//         console.error(err);
//     }
// });

// Forgot password form
// document.getElementById('forgotForm').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('forgotEmail').value;
    
//     if (email) {
//         alert('Password reset link sent to your email! (This is a demo)');
//         closeAllModals();
//     } else {
//         alert('Please enter your email address');
//     }
// });

// Close modals with Escape key
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') {
//         closeAllModals();
//     }
// });

// Slider functionality
// let currentSlide = 0;
// const slides = document.querySelectorAll('.slides li');
// const controlDots = document.querySelectorAll('.control-dot');
// const prevBtn = document.querySelector('.flex-prev');
// const nextBtn = document.querySelector('.flex-next');

// function showSlide(index) {
//     slides.forEach((slide, i) => {
//         slide.style.opacity = i === index ? '1' : '0';
//     });
//     controlDots.forEach((dot, i) => {
//         dot.classList.toggle('active', i === index);
//     });
// }

// function nextSlide() {
//     currentSlide = (currentSlide + 1) % slides.length;
//     showSlide(currentSlide);
// }

// function prevSlide() {
//     currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//     showSlide(currentSlide);
// }

// nextBtn.addEventListener('click', nextSlide);
// prevBtn.addEventListener('click', prevSlide);

// controlDots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//         currentSlide = index;
//         showSlide(currentSlide);
//     });
// });

// Auto-advance slides
// setInterval(nextSlide, 5000);

// Back to top functionality
// const backToTop = document.querySelector('.back-to-top');
// backToTop.addEventListener('click', () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// });

// Show/hide back to top button
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 300) {
//         backToTop.style.opacity = '1';
//     } else {
//         backToTop.style.opacity = '0.7';
//     }
// });
//     </>


// <>
// let chatPollingInterval = null; // Add this line
// let currentChatSession = null;
// let chatPollingInstance = null;
// let lastMessageId = null;
// let lastMessageTimestamp = null;
// let messageIdsSeen = new Set();


//             class ChatPolling {
//     constructor(sessionId, onNewMessages, pollingInterval = 3000) {
//         this.sessionId = sessionId;
//         this.onNewMessages = onNewMessages;
//         this.pollingInterval = pollingInterval;
//         this.baseInterval = pollingInterval;
//         this.lastMessageId = null;
//         this.lastTimestamp = null;
//         this.isPolling = false;
//         this.pollTimeout = null;
//         this.isPageVisible = true;
//         this.errorCount = 0;
//         this.maxErrors = 3;
        
//         document.addEventListener('visibilitychange', () => {
//             this.isPageVisible = !document.hidden;
//             if (this.isPageVisible && !this.isPolling) {
//                 this.startPolling();
//             } else if (!this.isPageVisible && this.isPolling) {
//                 this.stopPolling();
//             }
//         });
//     }
    
//     startPolling() {
//         if (this.isPolling) return;
//         this.isPolling = true;
//         this.errorCount = 0;
//         this.pollingInterval = this.baseInterval;
//         this.poll();
//     }
    
//     stopPolling() {
//         this.isPolling = false;
//         if (this.pollTimeout) {
//             clearTimeout(this.pollTimeout);
//             this.pollTimeout = null;
//         }
//     }
    
//     async poll() {
//         if (!this.isPolling || !this.isPageVisible) return;
        
//         try {
//             const token = localStorage.getItem('authToken');
//             if (!token) {
//                 console.log('No auth token available for polling');
//                 this.stopPolling();
//                 return;
//             }
            
//             const params = new URLSearchParams();
//             if (this.lastMessageId) {
//                 params.append('after', this.lastMessageId);
//             }
//             if (this.lastTimestamp) {
//                 params.append('timestamp', this.lastTimestamp);
//             }
            
//             const response = await fetch(
//                 `https://pvnbank.onrender.com/api/user/dashboard/messages/${this.sessionId}/new?${params}`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
            
//             if (response.ok) {
//                 const data = await response.json();
//                 if (data.messages && data.messages.length > 0) {
//                     const newMessages = data.messages.filter(msg => 
//                         !messageIdsSeen.has(msg._id || msg.id)
//                     );
                    
//                     if (newMessages.length > 0) {
//                         newMessages.forEach(msg => {
//                             messageIdsSeen.add(msg._id || msg.id);
//                         });
                        
//                         this.lastMessageId = data.lastMessageId || newMessages[newMessages.length - 1]._id;
//                         this.lastTimestamp = data.timestamp || new Date().toISOString();
                        
//                         this.onNewMessages(newMessages);
//                     }
//                 }
                
//                 this.errorCount = 0;
//                 this.pollingInterval = this.baseInterval;
                
//             } else if (response.status === 204) {
//                 this.errorCount = 0;
//             } else if (response.status === 401 || response.status === 403) {
//                 console.log('Authentication error in polling, stopping');
//                 this.stopPolling();
//                 return;
//             } else {
//                 throw new Error(`HTTP ${response.status}`);
//             }
            
//         } catch (error) {
//             console.error('Polling error:', error);
//             this.errorCount++;
            
//             if (this.errorCount < this.maxErrors) {
//                 this.pollingInterval = Math.min(this.pollingInterval * 1.5, 30000);
//             } else {
//                 console.log('Too many polling errors, stopping');
//                 this.stopPolling();
//                 updateChatStatus('Connection lost', 'error');
//                 return;
//             }
//         }
        
//         if (this.isPolling) {
//             this.pollTimeout = setTimeout(() => this.poll(), this.pollingInterval);
//         }
//     }
    
//     updateLastMessage(messageId, timestamp) {
//         this.lastMessageId = messageId;
//         this.lastTimestamp = timestamp;
//     }
// }
       




//           // Show email modal
// function showMailModal() {
//     const modal = document.getElementById('mailModal');
//     modal.classList.add('show');
// }

// // Close email modal
// function closeMailModal() {
//     const modal = document.getElementById('mailModal');
//     modal.classList.remove('show');
// }

// // Close modal when clicking outside
// window.onclick = function(event) {
//     const modal = document.getElementById('mailModal');
//     if (event.target == modal) {
//         closeMailModal();
//     }
// }

// // Handle form submission
// document.getElementById('mailForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     const subject = document.getElementById('emailSubject').value;
//     const message = document.getElementById('emailMessage').value;
    
    // Here you would typically send the email to your backend
    // console.log('Email to admin:', { subject, message });
    
    // Show success message (you can customize this)
    // alert('Your message has been sent successfully! We will get back to you soon.');
    
    // Reset form and close modal
//     this.reset();
//     closeMailModal();
// });

// Handle escape key to close modal
// document.addEventListener('keydown', function(e) {
//     if (e.key === 'Escape') {
//         closeMailModal();
//     }
// });



  
  // ADD THESE FUNCTIONS TO YOUR EXISTING SCRIPT (after your current code):

// // Show notification with different types
// function showNotification(message, type = 'success') {
//     const notification = document.getElementById('notification');
//     notification.textContent = message;
//     notification.className = `notification ${type}`;
//     notification.classList.add('show');

//     setTimeout(() => {
//         notification.classList.remove('show');
//     }, 3000);
// }

// // Contact Modal Functions
// function showContactModal() {
//     document.getElementById('contactModal').style.display = 'block';
//     document.body.style.overflow = 'hidden';
// }

// function closeContactModal() {
//     document.getElementById('contactModal').style.display = 'none';
//     document.body.style.overflow = 'auto';
// }

// // Mail Form Functions
// function showMailForm() {
//     closeContactModal();
//     document.getElementById('mailModal').style.display = 'block';
// }

// function closeMailModal() {
//     document.getElementById('mailModal').style.display = 'none';
//     document.body.style.overflow = 'auto';
//     document.getElementById('mailForm').reset();
// }

// // Handle mail form submission
// document.getElementById('mailForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     showNotification('Email sent successfully! We will respond within 24 hours.', 'success');
//     closeMailModal();
// });



//          function showOnlineChat() {
//     closeContactModal();
//     document.getElementById('chatModal').style.display = 'block';
    
//     // Initialize the real chat system
//     messageIdsSeen.clear();
//     lastMessageId = null;
//     lastMessageTimestamp = null;
    
//     const chatMessages = document.getElementById('chatMessages');
//     chatMessages.innerHTML = `
//         <div class="message agent-message">
//             <div class="message-avatar">
//                 <i class="fas fa-user-tie"></i>
//             </div>
//             <div class="message-content">
//                 <div class="message-header">Customer Support</div>
//                 <div class="message-text">Hello! I'm here to help you with your banking needs. How can I assist you today?</div>
//                 <div class="message-time">Just now</div>
//             </div>
//         </div>
//     `;
    
//     // Start real chat session
//     startChatSession();
// }

            


// function closeChatModal() {
//     document.getElementById('chatModal').style.display = 'none';
//     document.body.style.overflow = 'auto';
    
//     // Stop the new polling system
//     if (chatPollingInstance) {
//         chatPollingInstance.stopPolling();
//         chatPollingInstance = null;
//     }
    
//     // Clear the old interval if it exists
//     if (chatPollingInterval) {
//         clearInterval(chatPollingInterval);
//         chatPollingInterval = null;
//     }
    
//     // End chat session
//     if (currentChatSession) {
//         endChatSession();
//     }
    
//     // Reset tracking
//     messageIdsSeen.clear();
//     lastMessageId = null;
//     lastMessageTimestamp = null;
// }

// function handleChatKeyPress(event) {
//     if (event.key === 'Enter') {
//         sendChatMessage();
//     }
// }

// async function sendChatMessage() {
//     const chatInput = document.getElementById('chatInput');
//     const message = chatInput.value.trim();
    
//     if (!message) {
//         return;
//     }
    
//     if (!currentChatSession) {
//         showNotification('Chat session not active. Please restart chat.', 'error');
//         return;
//     }
    
//     const userMessageId = 'temp_' + Date.now();
//     messageIdsSeen.add(userMessageId);
//     addChatMessage(message, 'user');
//     chatInput.value = '';
    
//     try {
//         const token = localStorage.getItem('authToken');
//         const response = await fetch('https://pvnbank.onrender.com/api/user/dashboard/message', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 sessionId: currentChatSession,
//                 message: message,
//                 isFromSupport: false
//             })
//         });

//         if (response.ok) {
//             const data = await response.json();
//             if (data.messageId) {
//                 messageIdsSeen.delete(userMessageId);
//                 messageIdsSeen.add(data.messageId);
//             }
            
//             showTypingIndicator();
//         } else {
//             throw new Error(`Failed to send message: ${response.status}`);
//         }
        
//     } catch (error) {
//         console.error('Error sending message:', error);
//         addChatMessage('Sorry, there was an error sending your message. Please try again.', 'system');
//     }
// }




//             async function startChatSession() {
//     try {
//         updateChatStatus('Connecting...', 'connecting');
        
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//             updateChatStatus('Authentication required', 'error');
//             showNotification('Please log in to start a chat session', 'error');
//             return;
//         }

//         const response = await fetch('https://pvnbank.onrender.com/api/user/dashboard/start', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.ok) {
//             const data = await response.json();
//             currentChatSession = data.sessionId;
            
//             updateChatStatus('Connected to support', 'connected');
            
//             messageIdsSeen.clear();
//             lastMessageId = null;
//             lastMessageTimestamp = null;
            
//             await loadChatHistory();
//             startMessagePolling();
            
//         } else {
//             console.error('Failed to start chat session');
//             updateChatStatus('Connection failed', 'error');
//             showNotification('Failed to connect to chat support', 'error');
//         }
//     } catch (error) {
//         console.error('Error starting chat session:', error);
//         updateChatStatus('Connection failed', 'error');
//         showNotification('Connection error. Please try again.', 'error');
//     }
// }

// function startMessagePolling() {
//     if (chatPollingInstance) {
//         chatPollingInstance.stopPolling();
//     }
    
//     chatPollingInstance = new ChatPolling(
//         currentChatSession,
//         handleNewMessages,
//         3000
//     );
    
//     chatPollingInstance.startPolling();
// }

// function handleNewMessages(newMessages) {
//     newMessages.forEach(message => {
//         if (message.sender === 'admin' || message.isFromSupport) {
//             removeTypingIndicator();
//             addChatMessageFromHistory(message);
//         }
//     });
    
//     if (newMessages.length > 0) {
//         const lastMsg = newMessages[newMessages.length - 1];
//         lastMessageId = lastMsg._id || lastMsg.id;
//         lastMessageTimestamp = lastMsg.createdAt || lastMsg.timestamp;
        
//         if (chatPollingInstance) {
//             chatPollingInstance.updateLastMessage(lastMessageId, lastMessageTimestamp);
//         }
//     }
// }

// async function loadChatHistory() {
//     if (!currentChatSession) return;
    
//     try {
//         const token = localStorage.getItem('authToken');
//         const response = await fetch(`https://pvnbank.onrender.com/api/user/dashboard/messages/${currentChatSession}`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (response.ok) {
//             const data = await response.json();
//             const messages = data.messages || [];
            
//             const chatMessages = document.getElementById('chatMessages');
//             const welcomeMessage = chatMessages.querySelector('.message:first-child');
//             chatMessages.innerHTML = '';
//             if (welcomeMessage) {
//                 chatMessages.appendChild(welcomeMessage);
//             }
            
//             messages.forEach(message => {
//                 messageIdsSeen.add(message._id || message.id);
//                 addChatMessageFromHistory(message);
//             });
            
//             if (messages.length > 0) {
//                 const lastMsg = messages[messages.length - 1];
//                 lastMessageId = lastMsg._id || lastMsg.id;
//                 lastMessageTimestamp = data.timestamp || lastMsg.createdAt || new Date().toISOString();
//             }
//         }
//     } catch (error) {
//         console.error('Error loading chat history:', error);
//     }
// }

// function addChatMessageFromHistory(messageData) {
//     const chatMessages = document.getElementById('chatMessages');
//     const messageDiv = document.createElement('div');
    
//     const isUser = messageData.sender === 'user';
//     messageDiv.className = `message ${isUser ? 'user-message' : 'agent-message'}`;
    
//     const messageTime = new Date(messageData.createdAt || messageData.timestamp);
//     const formattedTime = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
//     messageDiv.innerHTML = `
//         <div class="message-avatar">
//             <i class="fas ${isUser ? 'fa-user' : 'fa-user-tie'}"></i>
//         </div>
//         <div class="message-content">
//             <div class="message-header">${isUser ? 'You' : 'Customer Support'}</div>
//             <div class="message-text">${messageData.message}</div>
//             <div class="message-time">${formattedTime}</div>
//         </div>
//     `;
    
//     chatMessages.appendChild(messageDiv);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// function showTypingIndicator() {
//     removeTypingIndicator();
    
//     const chatMessages = document.getElementById('chatMessages');
//     const typingDiv = document.createElement('div');
//     typingDiv.className = 'message agent-message typing-indicator';
//     typingDiv.id = 'typingIndicator';
    
//     typingDiv.innerHTML = `
//         <div class="message-avatar">
//             <i class="fas fa-user-tie"></i>
//         </div>
//         <div class="message-content">
//             <div class="message-header">Customer Support</div>
//             <div class="message-text">
//                 <div class="typing-dots">
//                     <span></span>
//                     <span></span>
//                     <span></span>
//                 </div>
//             </div>
//         </div>
//     `;
    
//     chatMessages.appendChild(typingDiv);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// function removeTypingIndicator() {
//     const existingIndicator = document.getElementById('typingIndicator');
//     if (existingIndicator) {
//         existingIndicator.remove();
//     }
// }

// function updateChatStatus(message, status) {
//     const chatStatus = document.getElementById('chatStatus');
//     if (chatStatus) {
//         const statusSpan = chatStatus.querySelector('span');
//         const statusDot = chatStatus.querySelector('.chat-status-dot');
        
//         if (statusSpan) statusSpan.textContent = message;
        
//         if (statusDot) {
//             statusDot.className = 'chat-status-dot';
//             statusDot.classList.add(`status-${status}`);
//         }
//     }
// }

// async function endChatSession() {
//     if (!currentChatSession) return;
    
//     try {
//         const token = localStorage.getItem('authToken');
//         await fetch(`https://pvnbank.onrender.com/api/user/dashboard/end/${currentChatSession}`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//     } catch (error) {
//         console.error('Error ending chat session:', error);
//     }
    
//     currentChatSession = null;
// }





// function addChatMessage(text, sender) {
//     const chatMessages = document.getElementById('chatMessages');
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${sender}-message`;
    
//     const currentTime = new Date().toLocaleTimeString('en-US', { 
//         hour: 'numeric', 
//         minute: '2-digit' 
//     });
    
//     messageDiv.innerHTML = `
//         <div class="message-avatar">
//             <i class="fas ${sender === 'user' ? 'fa-user' : 'fa-user-tie'}"></i>
//         </div>
//         <div class="message-content">
//             <div class="message-header">${sender === 'user' ? 'You' : 'Customer Support'}</div>
//             <div class="message-text">${text}</div>
//             <div class="message-time">${currentTime}</div>
//         </div>
//     `;
    
//     chatMessages.appendChild(messageDiv);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }




// window.addEventListener('beforeunload', function() {
//     if (chatPollingInstance) {
//         chatPollingInstance.stopPolling();
//     }
//     if (currentChatSession) {
//         endChatSession();
//     }
// });




// // Add chat message to UI (for new messages being sent)
// function addChatMessage(message, sender) {
//     const chatMessages = document.getElementById('chatMessages');
//     const messageDiv = document.createElement('div');
//     messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'agent-message'}`;
    
//     const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
//     messageDiv.innerHTML = `
//         <div class="message-avatar">
//             <i class="fas ${sender === 'user' ? 'fa-user' : 'fa-user-tie'}"></i>
//         </div>
//         <div class="message-content">
//             <div class="message-header">${sender === 'user' ? 'You' : 'Customer Support'}</div>
//             <div class="message-text">${message}</div>
//             <div class="message-time">${currentTime}</div>
//         </div>
//     `;
    
//     chatMessages.appendChild(messageDiv);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// }

// function updateChatStatus(message, status) {
//     const chatStatus = document.getElementById('chatStatus');
//     if (chatStatus) {
//         const statusSpan = chatStatus.querySelector('span');
//         const statusDot = chatStatus.querySelector('.chat-status-dot');
        
//         if (statusSpan) statusSpan.textContent = message;
        
//         if (statusDot) {
//             statusDot.className = 'chat-status-dot';
//             statusDot.classList.add(`status-${status}`);
//         }
//     }
// }

// async function endChatSession() {
//     if (!currentChatSession) return;
    
//     try {
//         const token = localStorage.getItem('authToken');
//         await fetch(`https://pvnbank.onrender.com/api/user/dashboard/end/${currentChatSession}`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//     } catch (error) {
//         console.error('Error ending chat session:', error);
//     }
    
//     currentChatSession = null;
// }



// // About Modal Functions
// function showAboutModal() {
//     document.getElementById('aboutModal').style.display = 'block';
//     document.body.style.overflow = 'hidden';
// }

// function closeAboutModal() {
//     document.getElementById('aboutModal').style.display = 'none';
//     document.body.style.overflow = 'auto';
// }

// // Loan Modal Functions
// function showPersonalLoan() {
//     document.getElementById('loanModalTitle').innerHTML = '<i class="fas fa-user"></i> Personal Loans';
//     document.getElementById('businessLoanSection').style.display = 'none';
//     document.getElementById('personalLoanSection').style.display = 'block';
//     document.getElementById('loanModal').style.display = 'block';
//     document.body.style.overflow = 'hidden';
// }

// function showBusinessLoan() {
//     document.getElementById('loanModalTitle').innerHTML = '<i class="fas fa-building"></i> Business Loans';
//     document.getElementById('personalLoanSection').style.display = 'none';
//     document.getElementById('businessLoanSection').style.display = 'block';
//     document.getElementById('loanModal').style.display = 'block';
//     document.body.style.overflow = 'hidden';
// }

// function closeLoanModal() {
//     document.getElementById('loanModal').style.display = 'none';
//     document.body.style.overflow = 'auto';
//     // Reset to show both sections
//     document.getElementById('personalLoanSection').style.display = 'block';
//     document.getElementById('businessLoanSection').style.display = 'block';
// }

// // Loan Application Functions
// function showLoanApplication() {
//     closeLoanModal();
//     document.getElementById('loanApplicationModal').style.display = 'block';
//     document.body.style.overflow = 'hidden';
// }

// function closeLoanApplication() {
//     document.getElementById('loanApplicationModal').style.display = 'none';
//     document.body.style.overflow = 'auto';
//     document.getElementById('loanApplicationForm').reset();
// }

// // Handle loan application form submission
// document.addEventListener('DOMContentLoaded', function() {
//     const loanForm = document.getElementById('loanApplicationForm');
//     if (loanForm) {
//         loanForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             showNotification('Loan application submitted successfully! We will contact you within 24 hours.', 'success');
//             closeLoanApplication();
//         });
//     }
// });

// // Update your existing window click event listener to include new modals
// // MODIFY your existing window click event (if you have one) to include these modal IDs:
// // If you don't have this, ADD it:
// window.addEventListener('click', function(event) {
//     const modals = ['contactModal', 'mailModal', 'chatModal', 'aboutModal', 'loanModal', 'loanApplicationModal'];
//     modals.forEach(modalId => {
//         const modal = document.getElementById(modalId);
//         if (modal && event.target === modal) {
//             modal.style.display = 'none';
//             document.body.style.overflow = 'auto';
//         }
//     });
// });





// // Initialize chat system
// function initializeChatSystem() {
//     // Reset message tracking
//     messageIdsSeen.clear();
//     lastMessageId = null;
//     lastMessageTimestamp = null;
    
//     // Clear chat messages
//     const chatMessages = document.getElementById('chatMessages');
//     chatMessages.innerHTML = `
//         <div class="message agent-message">
//             <div class="message-avatar">
//                 <i class="fas fa-user-tie"></i>
//             </div>
//             <div class="message-content">
//                 <div class="message-header">Customer Support</div>
//                 <div class="message-text">Hello! I'm here to help you with your banking needs. How can I assist you today?</div>
//                 <div class="message-time">Just now</div>
//             </div>
//         </div>
//     `;
// }





// function showPersonalLoan() {
//     // Close mobile menu first
//     document.querySelector('.mobilemenu').classList.remove('active'); // or whatever class opens it
//     document.querySelector('.overlay-mask').classList.remove('active');
    
//     // Then show the modal
//     document.getElementById('loanModal').style.display = 'block';
//     // ... rest of your modal code
// }


// function showBusinessLoan() {
//     // Close mobile menu first
//     document.querySelector('.mobilemenu').classList.remove('active');
//     document.querySelector('.overlay-mask').classList.remove('active');
    
//     // Show business loan modal
//     document.getElementById('loanModal').style.display = 'block';
//     document.getElementById('loanModalTitle').innerHTML = '<i class="fas fa-building"></i> Business Loan Services';
//     document.getElementById('personalLoanSection').style.display = 'none';
//     document.getElementById('businessLoanSection').style.display = 'block';
// }

// function showAboutModal() {
//     // Close mobile menu first
//     document.querySelector('.mobilemenu').classList.remove('active');
//     document.querySelector('.overlay-mask').classList.remove('active');
    
//     // Show about modal
//     document.getElementById('aboutModal').style.display = 'block';
// }


// function showContactModal() {
//     // Close mobile menu first
//     document.querySelector('.mobilemenu').classList.remove('active');
//     document.querySelector('.overlay-mask').classList.remove('active');
    
//     // Show contact modal
//     document.getElementById('contactModal').style.display = 'block';
// }

    


