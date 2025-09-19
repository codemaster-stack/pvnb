 // hamburger menu code
// const hamburger = document.querySelector('.open-mobilemenu');
// const mobileMenu = document.getElementById('mobileMenu');
// const mobileOverlay = document.getElementById('mobileOverlay');

// function toggleMobileMenu() {
//     mobileMenu.classList.toggle('active');
//     mobileOverlay.classList.toggle('active');
// }

// function closeMobileMenu() {
//     mobileMenu.classList.remove('active');
//     mobileOverlay.classList.remove('active');
// }

// hamburger.addEventListener('click', toggleMobileMenu);
// mobileOverlay.addEventListener('click', closeMobileMenu);

// // Close menu when nav item is clicked
// const mobileNavItems = document.querySelectorAll('.mobile-menu .nav-item');
// mobileNavItems.forEach(item => {
//     item.addEventListener('click', closeMobileMenu);
// });

// // end of hamburger menu code


// // chat modal functionality
// function openChatModal() {
//   document.getElementById("chatModal").style.display = "flex";
//   document.getElementById("chatStatus").innerHTML = `
//     <div class="chat-status-dot" style="background: green;"></div>
//     <span>Connected</span>
//   `;
// }

// function closeChatModal() {
//   document.getElementById("chatModal").style.display = "none";
// }

// function sendChatMessage() {
//   const input = document.getElementById("chatInput");
//   const messageText = input.value.trim();
//   if (messageText === "") return;

//   const messages = document.getElementById("chatMessages");

//   // Add user message
//   const messageDiv = document.createElement("div");
//   messageDiv.classList.add("message", "user-message");
//   messageDiv.innerHTML = `
//     <div class="message-content">
//       <div class="message-header">You</div>
//       <div class="message-text">${messageText}</div>
//       <div class="message-time">${new Date().toLocaleTimeString()}</div>
//     </div>
//   `;
//   messages.appendChild(messageDiv);

//   // Scroll to bottom
//   messages.scrollTop = messages.scrollHeight;

//   input.value = "";

//   // Fake agent reply (optional)
//   setTimeout(() => {
//     const reply = document.createElement("div");
//     reply.classList.add("message", "agent-message");
//     reply.innerHTML = `
//       <div class="message-avatar"><i class="fas fa-user-tie"></i></div>
//       <div class="message-content">
//         <div class="message-header">Customer Support</div>
//         <div class="message-text">Thanks for your message! We'll assist shortly.</div>
//         <div class="message-time">${new Date().toLocaleTimeString()}</div>
//       </div>
//     `;
//     messages.appendChild(reply);
//     messages.scrollTop = messages.scrollHeight;
//   }, 1000);
// }

// function handleChatKeyPress(event) {
//   if (event.key === "Enter") {
//     sendChatMessage();
//   }
// }
// // end of chat modal functionality



//     // About Us Modal

//   const aboutModal = document.getElementById("aboutModal");

//   // Function called by your nav onclick
//   function showAboutModal() {
//     aboutModal.style.display = "flex";
//   }

//   // Close modal
//   function closeAboutModal() {
//     aboutModal.style.display = "none";
//   }

//   // Close when clicking outside modal content
//   window.addEventListener("click", (e) => {
//     if (e.target === aboutModal) {
//       closeAboutModal();
//     }
//   });

// // End About Us Modal



// // Show loan modal functions

// function showPersonalLoan() {
//     document.getElementById('loanModal').style.display = 'block';
//     // Show only personal loan section
//     document.getElementById('personalLoanSection').style.display = 'block';
//     document.getElementById('businessLoanSection').style.display = 'none';
//     document.getElementById('loanModalTitle').innerHTML = '<i class="fas fa-user"></i> Personal Loans';
// }

// function showBusinessLoan() {
//     document.getElementById('loanModal').style.display = 'block';
//     // Show only business loan section
//     document.getElementById('personalLoanSection').style.display = 'none';
//     document.getElementById('businessLoanSection').style.display = 'block';
//     document.getElementById('loanModalTitle').innerHTML = '<i class="fas fa-building"></i> Business Loans';
// }

// function closeLoanModal() {
//     document.getElementById('loanModal').style.display = 'none';
// }

// function showLoanApplication() {
//     document.getElementById('loanModal').style.display = 'none';
//     document.getElementById('loanApplicationModal').style.display = 'block';
// }

// function closeLoanApplication() {
//     document.getElementById('loanApplicationModal').style.display = 'none';
// }


// // Handle loan application form submission
// document.getElementById('loanApplicationForm').addEventListener('submit', async function(e) {
//     e.preventDefault();
    
//     const formData = new FormData(this);
//     const loanData = Object.fromEntries(formData);

//     try {
//         const res = await fetch('/api/loan/apply', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(loanData)
//         });

//         const result = await res.json();

//         if (result.success) {
//             alert('Loan application submitted successfully! We will contact you soon.');
//             closeLoanApplication();
//             this.reset();
//         } else {
//             alert('Error: ' + result.message);
//         }
//     } catch (err) {
//         alert('Server error, please try again later.');
//     }
// });



// // Close modals when clicking outside
// window.onclick = function(event) {
//     const loanModal = document.getElementById('loanModal');
//     const appModal = document.getElementById('loanApplicationModal');
    
//     if (event.target === loanModal) {
//         closeLoanModal();
//     }
//     if (event.target === appModal) {
//         closeLoanApplication();
//     }
// }

// // Loan modal functions end here



// //  fined us/card valet support by form

// function openContactSupportModal() {
//     document.getElementById('contactSupportModal').style.display = 'block';
//     document.getElementById('mobileOverlay').classList.add('active'); // Use existing overlay
// }

// function closeContactSupportModal() {
//     document.getElementById('contactSupportModal').style.display = 'none';
//     document.getElementById('mobileOverlay').classList.remove('active');
// }

// // Handle form submission
// document.getElementById('supportForm').addEventListener('submit', async function(e) {
//     e.preventDefault();
    
//     // Get form data
//     const email = document.getElementById('supportEmail').value;
//     const phone = document.getElementById('supportPhone').value;
//     const subject = document.getElementById('supportSubject').value;
//     const message = document.getElementById('supportMessage').value;

//     try {
//         const token = localStorage.getItem("token"); // stored on login

// const res = await fetch("https://api.pvbonline.online/api/support/contact", {
//     method: "POST",
//     headers: { 
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//     },
//     body: JSON.stringify({ subject, message, phone })
// });


//         const data = await res.json();

//         if (res.ok) {
//             alert("Message sent successfully!");
//             closeContactSupportModal();
//             this.reset();
//         } else {
//             alert(data.message || "Failed to send message");
//         }
//     } catch (err) {
//         console.error("Support form error:", err);
//         alert("An error occurred. Please try again.");
//     }
// });

// // Close modal when clicking overlay
// document.getElementById('mobileOverlay').addEventListener('click', function() {
//     closeContactSupportModal();
// });


// // End of fined us/card valet


// // Quick actions for Transaction/mail/transfer           quick-actions buttons
// // Simple modal open/close
// function openModal(id) {
//   document.getElementById(id).style.display = 'flex';
// }
// function closeModal(id) {
//   document.getElementById(id).style.display = 'none';
// }

// // Fake transfer form submission

// document.addEventListener('DOMContentLoaded', function() {
//     console.log("DOM loaded");

//     const modal = document.getElementById("transferModal");
//     const transferBtn = document.getElementById("transferBtn"); 

//     if (transferBtn && modal) {
//         transferBtn.addEventListener("click", () => {
//             console.log("Transfer button clicked!");
//             modal.style.display = "flex";
//         });
//     } else {
//         console.log("Transfer button or modal not found");
//     }
// });





// // contact by mail
// function openContactModal() {
//   document.getElementById("contactModal").style.display = "block";
// }

// function closeContactModal() {
//   document.getElementById("contactModal").style.display = "none";
// }
// // contact by mail end


// // Open the Transactions modal
// function openTransactionsModal() {
//   document.getElementById("transactionsModal").style.display = "flex";
// }

// // Close the Transactions modal
// function closeTransactionsModal() {
//   document.getElementById("transactionsModal").style.display = "none";
// }

// // Also close if user clicks outside modal content
// window.onclick = function(event) {
//   const modal = document.getElementById("transactionsModal");
//   if (event.target === modal) {
//     modal.style.display = "none";
//   }
// };

// //   Quick actions for Transaction/mail/transfer           quick-actions buttons 



// // Contact form submition, sending mail

// document.getElementById("contactForm").addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const formData = {
//     name: document.getElementById("contactName").value,
//     email: document.getElementById("contactEmail").value,
//     subject: document.getElementById("contactSubject").value,
//     message: document.getElementById("contactMessage").value
//   };

//   try {
//     const res = await fetch("/send-email", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData)
//     });

//     if (res.ok) {
//       alert("✅ Support request sent successfully!");
//       closeContactModal();
//       document.getElementById("contactForm").reset();
//     } else {
//       alert("❌ Failed to send. Try again later.");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("⚠️ Error sending message.");
//   }
// });

// // Contact form submition, sending mail



// // Helper to open/close modals //  Transaction pin

// function openModal(id) {
//   document.getElementById(id).style.display = "flex";
// }
// function closeModal(id) {
//   document.getElementById(id).style.display = "none";
// }

// // When transfer form is submitted
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

// // Handle Enter PIN form
// document.getElementById("enterPinForm").addEventListener("submit", function(e) {
//   e.preventDefault();
//   let pin = document.getElementById("transferPin").value;
//   alert("PIN entered: " + pin);
//   closeModal("enterPinModal");
//   // 🔹 Send PIN to backend for validation
// });

// // Handle Create PIN form
// document.getElementById("createPinForm").addEventListener("submit", function(e) {
//   e.preventDefault();
//   let newPin = document.getElementById("newPin").value;
//   let confirmPin = document.getElementById("confirmNewPin").value;
  
//   if (newPin !== confirmPin) {
//     alert("PINs do not match!");
//     return;
//   }
//   alert("New PIN created: " + newPin);
//   closeModal("createPinModal");
//   // 🔹 Send to backend to save securely
// });

// // Handle Forgot PIN form
// document.getElementById("forgotPinForm").addEventListener("submit", function(e) {
//   e.preventDefault();
//   alert("Reset link sent to your email!");
//   closeModal("forgotPinModal");
//   // 🔹 Backend should send email reset link
// });

// // End Transaction pin


// // Add this to the end of your current userpage.js file
document.getElementById('logoutBtn').addEventListener('click', function() {
//     // Clear authentication data
    localStorage.removeItem('token');
    sessionStorage.clear();
    
    // Redirect back to index page where login modal exists
    window.location.href = 'index.html'; // or whatever your index page is named
});



// end dashboard acct display
const token = localStorage.getItem("token");

  async function loadAccountSummary() {
    try {
      const res = await fetch("https://api.pvbonline.online/api/users/dashboard", {
        
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      document.getElementById("welcomeUser").textContent = `Welcome Back, ${data.fullname}`;

      const totalBalance = data.balances.savings + data.balances.current;
      document.getElementById("accountBalance").textContent = `$${totalBalance.toLocaleString()}`;

      document.getElementById("savingsAccount").textContent = data.savingsAccountNumber || "N/A";
      document.getElementById("currentAccount").textContent = data.currentAccountNumber || "N/A";

      document.getElementById("loanBalanceSummary").textContent = `$${data.balances.loan.toLocaleString()}`;
      document.getElementById("inflowSummary").textContent = `$${data.balances.inflow.toLocaleString()}`;
      document.getElementById("outflowSummary").textContent = `$${data.balances.outflow.toLocaleString()}`;

      document.getElementById("accountStatus").textContent = "Active";
    } catch (err) {
      console.error("Failed to load account summary:", err);
    }
  }

  async function showTransactions(type) {
    try {
      const res = await fetch(`https://api.pvbonline.online/api/users/transactions?type=${type}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const transactions = await res.json();

      document.getElementById("txTitle").textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Transactions`;

      const container = document.getElementById("transactionsContent");
      container.innerHTML = "";

      if (transactions.length === 0) {
        container.innerHTML = "<p>No transactions found.</p>";
      } else {
        const list = document.createElement("ul");
        transactions.forEach(tx => {
          const li = document.createElement("li");
          li.textContent = `${new Date(tx.createdAt).toLocaleString()} - $${tx.amount.toLocaleString()} - ${tx.description || ""}`;
          list.appendChild(li);
        });
        container.appendChild(list);
      }

      document.getElementById("transactionList").style.display = "block";
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  }

  function closeTransactions() {
    document.getElementById("transactionList").style.display = "none";
  }

  document.addEventListener("DOMContentLoaded", loadAccountSummary);

// end second dashboard account display



// Make sure user is authenticated and you have a token

const token = localStorage.getItem("token"); // Adjust if you store it differently

// ---------------------------
// Load dashboard info
// ---------------------------
async function loadDashboard() {
  try {
    const res = await fetch("https://api.pvbonline.online/api/users/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    document.getElementById("userPhoto").src = data.photo || "https://i.pravatar.cc/50";
    document.getElementById("userFullname").textContent = data.fullname;
    document.getElementById("savingsBalance").textContent = `$${data.balances.savings.toLocaleString()}`;
    document.getElementById("currentBalanceExtra").textContent = `$${data.balances.current.toLocaleString()}`;
    document.getElementById("loanBalance").textContent = `$${data.balances.loan.toLocaleString()}`;
    document.getElementById("inflowAmount").textContent = `$${data.balances.inflow.toLocaleString()}`;
    document.getElementById("outflowAmount").textContent = `$${data.balances.outflow.toLocaleString()}`;
    document.getElementById("lastLoginIP").textContent = data.lastLoginIP;
    document.getElementById("lastLoginDate").textContent = data.lastLoginDate;
  } catch (err) {
    console.error("Failed to load dashboard:", err);
  }
}

const token = localStorage.getItem("token");

// Preview selected photo immediately
document.getElementById("profileUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("userPhoto").src = e.target.result; // Replace dummy avatar
    };
    reader.readAsDataURL(file);
  }
});

// Upload photo to backend
async function uploadPhoto() {
  const fileInput = document.getElementById("profileUpload");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("photo", file);

  try {
    const res = await fetch("https://api.pvbonline.online/api/users/upload-photo", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Profile photo updated successfully!");
      document.getElementById("userPhoto").src = data.photoUrl; // final saved URL from backend
    } else {
      alert(data.message || "Failed to upload photo.");
    }
  } catch (err) {
    console.error("Upload failed:", err);
    alert("An error occurred while uploading.");
  }
}


// ---------------------------
// Fetch transactions for Inflow/Outflow
// ---------------------------
// ---------------------------
// Fetch transactions for Inflow/Outflow
// ---------------------------
async function showTransactions(type) {
  try {
    const res = await fetch(`https://api.pvbonline.online/api/users/transactions?type=${type}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const transactions = await res.json();

    const container = document.getElementById("transactionList");
    container.innerHTML = `<div class="tx-header">
        <h3>${type.charAt(0).toUpperCase() + type.slice(1)} Transactions</h3>
        <button onclick="closeTransactions()">×</button>
      </div>`;

    if (transactions.length === 0) {
      container.innerHTML += "<p>No transactions found.</p>";
    } else {
      const list = document.createElement("ul");
      transactions.forEach(tx => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${new Date(tx.createdAt).toLocaleString()}</strong><br>
          Amount: <span style="color:${tx.type === "inflow" ? "green" : "red"};">
            ${tx.type === "inflow" ? "+" : "-"}$${tx.amount.toLocaleString()}
          </span><br>
          <em>${tx.description || "No description"}</em>
        `;
        list.appendChild(li);
      });
      container.appendChild(list);
    }

    container.style.display = "block";
  } catch (err) {
    console.error("Failed to fetch transactions:", err);
  }
}


// ---------------------------
// Close transaction list
// ---------------------------
function closeTransactions() {
  const container = document.getElementById("transactionList");
  container.style.display = "none";
  container.innerHTML = "";
}

// ---------------------------
// Setup click events for Inflow/Outflow
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();

  const inflowBox = document.querySelector(".flow.inflow");
  const outflowBox = document.querySelector(".flow.outflow");

  if (inflowBox) inflowBox.addEventListener("click", () => showTransactions("inflow"));
  if (outflowBox) outflowBox.addEventListener("click", () => showTransactions("outflow"));
});





// card creation
function showCreateCardModal() {
    document.getElementById("createCardModal").style.display = "block";
}

function closeCreateCardModal() {
    document.getElementById("createCardModal").style.display = "none";
}

// Handle form submission
document.getElementById("createCardForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const cardData = {
        cardType: document.getElementById("cardType").value,
        cardLimit: document.getElementById("cardLimit").value
    };

    try {
        const res = await fetch("https://api.pvbonline.online/api/users/create-card", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Include auth token if required
                // "Authorization": "Bearer " + token
            },
            body: JSON.stringify(cardData)
        });

        const data = await res.json();

        if(res.ok) {
            alert("Credit Card created successfully!");
            document.getElementById("createCardForm").reset();
            closeCreateCardModal();
        } else {
            alert("Error: " + data.message);
        }
    } catch(err) {
        console.error("Error creating credit card:", err);
        alert("Something went wrong. Please try again.");
    }
});
// card creation end 

// transfrer
const token = localStorage.getItem("token");
let pendingTransfer = null;

// 🔹 Step 1: Handle transfer form submission
document.getElementById("transferForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Save transfer details temporarily
  pendingTransfer = {
    amount: document.getElementById("transferAmount").value,
    accountNumber: document.getElementById("accountNumber").value,
    recipientBank: document.getElementById("recipientBank").value,
    recipientCountry: document.getElementById("recipientCountry").value,
    description: document.getElementById("transferDescription").value,
    fromAccountType: document.getElementById("fromAccountType").value,
      toAccountType: document.getElementById("toAccountType").value
  };

  try {
    // Check if user already has a PIN
    const res = await fetch("https://api.pvbonline.online/api/users/has-pin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    closeModal("transferModal");

    if (data.hasPin) {
      openModal("enterPinModal"); // Go to Enter PIN modal
    } else {
      openModal("createPinModal"); // Must create PIN first
    }
  } catch (err) {
    console.error("Error checking PIN:", err);
    alert("Failed to check PIN status. Please try again.");
  }
});

// 🔹 Step 2: Handle Enter PIN submission
document.getElementById("enterPinForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const enteredPin = document.getElementById("transferPin").value;

  if (!pendingTransfer) {
    alert("No transfer in progress.");
    return;
  }

  try {
    const res = await fetch("https://api.pvbonline.online/api/transactions/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...pendingTransfer,
        pin: enteredPin, // Include PIN in transfer request
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Transfer successful!");
      closeModal("enterPinModal");
      pendingTransfer = null; // clear transfer after success
      if (data.balances) {
    document.getElementById("savingsBalance").textContent = `$${data.balances.savings.toLocaleString()}`;
    document.getElementById("currentBalanceExtra").textContent = `$${data.balances.current.toLocaleString()}`;
    document.getElementById("loanBalance").textContent = `$${data.balances.loan.toLocaleString()}`;
    document.getElementById("inflowAmount").textContent = `$${data.balances.inflow.toLocaleString()}`;
    document.getElementById("outflowAmount").textContent = `$${data.balances.outflow.toLocaleString()}`;
    document.getElementById("currentBalance").textContent = `$${data.balances.current.toLocaleString()}`;
  }
    } else {
      alert(data.message || "❌ PIN verification failed");
    }
  } catch (err) {
    console.error("Transfer failed:", err);
    alert("Transfer failed. Please try again.");
  }
});

// 🔹 Step 3: Handle Create PIN submission
document.getElementById("createPinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPin = document.getElementById("newPin").value;
  const confirmPin = document.getElementById("confirmPin").value;

  if (newPin !== confirmPin) {
    alert("❌ PINs do not match!");
    return;
  }

  try {
    const res = await fetch("https://api.pvbonline.online/api/users/create-pin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pin: newPin }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ PIN created successfully!");
      closeModal("createPinModal");
      openModal("enterPinModal"); // Immediately ask user to enter PIN for the transfer
    } else {
      alert(data.message || "❌ Failed to create PIN");
    }
  } catch (err) {
    console.error("Error creating PIN:", err);
    alert("Failed to create PIN. Please try again.");
  }
});



document.getElementById("forgotPinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://api.pvbonline.online/api/users/forgot-pin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // user must be logged in
      }
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Reset instructions sent to your email!");
      closeModal("forgotPinModal");
    } else {
      alert(data.message || "❌ Failed to send reset instructions");
    }
  } catch (err) {
    console.error("Error sending PIN reset:", err);
    alert("Server error. Please try again.");
  }
});

// transfer end


const token = localStorage.getItem("token");

// Open transaction modal and load history
function openTransactionsModal() {
  document.getElementById("transactionsModal").style.display = "block";
  loadTransactions();
}

// Close modal
function closeTransactionsModal() {
  document.getElementById("transactionsModal").style.display = "none";
}

// Fetch and render transactions
async function loadTransactions(startDate = "", endDate = "") {
  const tbody = document.getElementById("transactionsBody");
  tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Loading...</td></tr>`;

  try {
    let url = "https://api.pvbonline.online/api/transactions/history";
    if (startDate && endDate) {
      url += `?start=${startDate}&end=${endDate}`;
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    if (res.ok) {
      if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No transactions found</td></tr>`;
        return;
      }

      tbody.innerHTML = "";
      data.forEach(tx => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${new Date(tx.createdAt).toLocaleDateString()}</td>
          <td>${tx.description || "-"}</td>
          <td>${tx.type === "outflow" ? "-" : "+"}$${tx.amount.toFixed(2)}</td>
          <td>${tx.status || "Completed"}</td>
          <td>$${tx.balanceAfter?.toFixed(2) || "-"}</td>
        `;
        tbody.appendChild(row);
      });
    } else {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:red;">${data.message || "Failed to fetch"}</td></tr>`;
    }
  } catch (err) {
    console.error("Error fetching transactions:", err);
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:red;">Server error</td></tr>`;
  }
}

// Apply filters
function filterTransactions() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  loadTransactions(startDate, endDate);
}

// Download statement as CSV
async function downloadStatement() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  try {
    let url = "https://api.pvbonline.online/api/transactions/statement";
    if (startDate && endDate) {
      url += `?start=${startDate}&end=${endDate}`;
    }

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      alert("❌ Failed to download statement");
      return;
    }

    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "statement.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Error downloading statement:", err);
    alert("Server error while downloading statement");
  }
}
