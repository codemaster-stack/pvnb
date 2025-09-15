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

// End of fined us/card valet contact by form


// Contact form submition, sending mail
// contact by mail
function openContactModal() {
  document.getElementById("contactModal").style.display = "block";
}

function closeContactModal() {
  document.getElementById("contactModal").style.display = "none";
}

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

// Contact form submition, sending mail end
  // contact by mail end


// When transfer form is submitted
// document.getElementById("transferForm").addEventListener("submit", function(e) {
//   e.preventDefault();

//   // 🔹 Simulate backend check
//   // Later, replace with real API call to Node.js
//   let userHasPin = true; // <-- Replace with backend response

//   if (userHasPin) {
//     closeModal("transferModal");
//     openModal("enterPinModal");
//   } else {
//     closeModal("transferModal");
//     openModal("createPinModal");
//   }
// });

// function openModal(id) {
//   document.getElementById(id).style.display = 'flex';
// }
// function closeModal(id) {
//   document.getElementById(id).style.display = 'none';
// }


  // ===transaction  Modal Controls ===
  function openModal(id) {
    document.getElementById(id).style.display = "flex";
  }
  function closeModal(id) {
    document.getElementById(id).style.display = "none";
  }

  // Transactions modal
  function openTransactionsModal() {
    document.getElementById("transactionsModal").style.display = "flex";
  }
  function closeTransactionsModal() {
    document.getElementById("transactionsModal").style.display = "none";
  }

  // Close when clicking outside modal
  window.onclick = function (event) {
    const modal = document.getElementById("transactionsModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // === Transfer Form ===
  document.getElementById("transferForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const amount = document.getElementById("transferAmount").value;
    const recipient = document.getElementById("accountNumber").value;

    try {
      const token = localStorage.getItem("token"); // assumes token stored at login
      const res = await fetch("https://api.pvbonline.online/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount, recipient }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Transfer submitted successfully!");
        closeModal("transferModal");
        openModal("enterPinModal"); // ask for PIN after transfer starts
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Transfer failed. Try again.");
    }
  });

  // === Enter PIN Form ===
  document.getElementById("enterPinForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    let pin = document.getElementById("transferPin").value;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://api.pvbonline.online/api/pin/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ PIN validated, transfer completed!");
        closeModal("enterPinModal");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error validating PIN");
    }
  });

  // === Create PIN Form ===
  document.getElementById("createPinForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    let newPin = document.getElementById("newPin").value;
    let confirmPin = document.getElementById("confirmNewPin").value;

    if (newPin !== confirmPin) {
      alert("❌ PINs do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://api.pvbonline.online/api/pin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pin: newPin }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ New PIN created!");
        closeModal("createPinModal");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error creating PIN");
    }
  });

  // === Forgot PIN Form ===
  document.getElementById("forgotPinForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/pin/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert("📧 Reset link sent to your email!");
        closeModal("forgotPinModal");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error sending reset link");
    }
  });


// load transaction
  async function loadTransactions() {
  try {
    const token = localStorage.getItem("token"); // your JWT from login
    if (!token) {
      alert("You must be logged in");
      return;
    }

    const res = await fetch("https://api.pvbonline.online/api/transactions?limit=20", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const txs = await res.json();
    const container = document.getElementById("transactionsList");
    container.innerHTML = "";

    if (txs.length === 0) {
      container.innerHTML = "<p>No transactions yet.</p>";
      return;
    }

    txs.forEach((tx) => {
      const div = document.createElement("div");
      div.classList.add("transaction-item");
      div.innerHTML = `
        <p><b>${tx.type.toUpperCase()}</b> - ${tx.amount} USD</p>
        <p>To: ${tx.to || "N/A"}</p>
        <small>${new Date(tx.date).toLocaleString()}</small>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    alert("Error loading transactions");
  }
}

// Attach to modal open
function openTransactionsModal() {
  document.getElementById("transactionsModal").style.display = "flex";
  loadTransactions(); // fetch when modal opens
}

// End Transaction 