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

// End About Us Modal



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
    
    const formData = new FormData(this);
    const loanData = Object.fromEntries(formData);

    try {
        const res = await fetch('/api/loan/apply', {
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
        const token = localStorage.getItem("token"); // stored on login

const res = await fetch("https://api.pvbonline.online/api/support/contact", {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ subject, message, phone })
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


// End of fined us/card valet


// Quick actions for Transaction/mail/transfer           quick-actions buttons
// Simple modal open/close
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Fake transfer form submission

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded");

    const modal = document.getElementById("transferModal");
    const transferBtn = document.getElementById("transferBtn"); 

    if (transferBtn && modal) {
        transferBtn.addEventListener("click", () => {
            console.log("Transfer button clicked!");
            modal.style.display = "flex";
        });
    } else {
        console.log("Transfer button or modal not found");
    }
});





// contact by mail
function openContactModal() {
  document.getElementById("contactModal").style.display = "block";
}

function closeContactModal() {
  document.getElementById("contactModal").style.display = "none";
}
// contact by mail end


// Open the Transactions modal
function openTransactionsModal() {
  document.getElementById("transactionsModal").style.display = "flex";
}

// Close the Transactions modal
function closeTransactionsModal() {
  document.getElementById("transactionsModal").style.display = "none";
}

// Also close if user clicks outside modal content
window.onclick = function(event) {
  const modal = document.getElementById("transactionsModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

//   Quick actions for Transaction/mail/transfer           quick-actions buttons 



// Contact form submition, sending mail

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    subject: document.getElementById("contactSubject").value,
    message: document.getElementById("contactMessage").value
  };

  try {
    const res = await fetch("/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert("✅ Support request sent successfully!");
      closeContactModal();
      document.getElementById("contactForm").reset();
    } else {
      alert("❌ Failed to send. Try again later.");
    }
  } catch (err) {
    console.error(err);
    alert("⚠️ Error sending message.");
  }
});

// Contact form submition, sending mail



// Helper to open/close modals //  Transaction pin

function openModal(id) {
  document.getElementById(id).style.display = "flex";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// When transfer form is submitted
document.getElementById("transferForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // 🔹 Simulate backend check
  // Later, replace with real API call to Node.js
  let userHasPin = true; // <-- Replace with backend response

  if (userHasPin) {
    closeModal("transferModal");
    openModal("enterPinModal");
  } else {
    closeModal("transferModal");
    openModal("createPinModal");
  }
});

// Handle Enter PIN form
document.getElementById("enterPinForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let pin = document.getElementById("transferPin").value;
  alert("PIN entered: " + pin);
  closeModal("enterPinModal");
  // 🔹 Send PIN to backend for validation
});

// Handle Create PIN form
document.getElementById("createPinForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let newPin = document.getElementById("newPin").value;
  let confirmPin = document.getElementById("confirmNewPin").value;
  
  if (newPin !== confirmPin) {
    alert("PINs do not match!");
    return;
  }
  alert("New PIN created: " + newPin);
  closeModal("createPinModal");
  // 🔹 Send to backend to save securely
});

// Handle Forgot PIN form
document.getElementById("forgotPinForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Reset link sent to your email!");
  closeModal("forgotPinModal");
  // 🔹 Backend should send email reset link
});

// End Transaction pin


// Add this to the end of your current userpage.js file
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Clear authentication data
    localStorage.removeItem('token');
    sessionStorage.clear();
    
    // Redirect back to index page where login modal exists
    window.location.href = 'index.html'; // or whatever your index page is named
});