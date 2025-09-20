//  hamburger menu code
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
// document.getElementById('logoutBtn').addEventListener('click', function() {
//     // Clear authentication data
//     localStorage.removeItem('token');
//     sessionStorage.clear();
    
//     // Redirect back to index page where login modal exists
//     window.location.href = 'index.html'; // or whatever your index page is named
// });




// function showCreateCardModal() {
//     document.getElementById("createCardModal").style.display = "block";
// }

// function closeCreateCardModal() {
//     document.getElementById("createCardModal").style.display = "none";
// }

// // Handle form submission
// document.getElementById("createCardForm").addEventListener("submit", async function(e) {
//     e.preventDefault();
    
//     const cardData = {
//         cardType: document.getElementById("cardType").value,
//         cardLimit: document.getElementById("cardLimit").value
//     };

//     try {
//         const res = await fetch("https://api.pvbonline.online/api/users/create-card", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 // Include auth token if required
//                 // "Authorization": "Bearer " + token
//             },
//             body: JSON.stringify(cardData)
//         });

//         const data = await res.json();

//         if(res.ok) {
//             alert("Credit Card created successfully!");
//             document.getElementById("createCardForm").reset();
//             closeCreateCardModal();
//         } else {
//             alert("Error: " + data.message);
//         }
//     } catch(err) {
//         console.error("Error creating credit card:", err);
//         alert("Something went wrong. Please try again.");
//     }
// });
// // card creation end 
document.addEventListener("DOMContentLoaded", () => {
  const BACKEND_URL = "https://api.pvbonline.online";

  loadUserDashboard();
  setupProfilePictureUpload();

  // Load user dashboard info
  async function loadUserDashboard() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/me`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Failed to load user info", data);
        return;
      }

      // Update name
      const userNameEl = document.getElementById("userName");
      if (userNameEl) userNameEl.textContent = data.fullname;

      // Update profile picture
      const profilePicEl = document.getElementById("profilePic");
      if (profilePicEl) {
        profilePicEl.src = data.profilePic
          ? `${BACKEND_URL}/${data.profilePic.replace(/ /g, "%20")}?t=${Date.now()}`
          : "https://i.pravatar.cc/50";
        profilePicEl.style.visibility = "visible";
      }

      // Update balances
      if (data.balances) {
        const { savings, current, loan, inflow, outflow } = data.balances;

        // Top balance (current + savings)
        const totalEl = document.getElementById("currentBalance");
        if (totalEl) totalEl.textContent = `$${(current + savings).toLocaleString()}`;

        // Individual balances
        const savingsEl = document.getElementById("savingsBalance");
        if (savingsEl) savingsEl.textContent = `$${savings.toLocaleString()}`;

        const currentEl = document.getElementById("onlyCurrentBalance");
        if (currentEl) currentEl.textContent = `$${current.toLocaleString()}`;

        const loanEl = document.getElementById("loanBalance");
        if (loanEl) loanEl.textContent = `$${loan.toLocaleString()}`;

        const inflowEl = document.getElementById("inflow");
        if (inflowEl) {
          inflowEl.textContent = `$${inflow.toLocaleString()}`;
          inflowEl.style.color = inflow > 0 ? "green" : "inherit";
        }

        const outflowEl = document.getElementById("outflow");
        if (outflowEl) {
          outflowEl.textContent = `-$${outflow.toLocaleString()}`;
          outflowEl.style.color = outflow > 0 ? "red" : "inherit";
        }
      }

      // Save account numbers globally for modal use
      window.accountNumbers = {
        current: data.currentAccountNumber || "N/A",
        savings: data.savingsAccountNumber || "N/A"
      };

    } catch (err) {
      console.error("Error loading dashboard:", err);
    }
  }

  // Profile picture upload
  function setupProfilePictureUpload() {
    const profilePicEl = document.getElementById("profilePic");
    if (!profilePicEl) return;

    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.accept = "image/*";
    uploadInput.style.display = "none";
    document.body.appendChild(uploadInput);

    profilePicEl.addEventListener("click", () => uploadInput.click());

    uploadInput.addEventListener("change", async () => {
      const file = uploadInput.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("profilePic", file);

      try {
        const res = await fetch(`${BACKEND_URL}/api/users/profile-picture`, {
          method: "PUT",
          headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
          body: formData
        });

        const data = await res.json();
        if (res.ok) {
          profilePicEl.src = data.profilePic
            ? `${BACKEND_URL}/${data.profilePic.replace(/ /g, "%20")}?t=${Date.now()}`
            : "https://i.pravatar.cc/50";
        } else {
          alert(data.message || "Profile picture upload failed");
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Profile picture upload failed");
      }
    });
  }

  // Buttons & Modals
  const btnDetails = document.getElementById("btnDetails");
  const btnAccount = document.getElementById("btnAccount");

  const detailsModal = document.getElementById("detailsModal");
  const accountModal = document.getElementById("accountModal");

  // Transactions Modal
  if (btnDetails && detailsModal) {
    btnDetails.addEventListener("click", async () => {
      detailsModal.style.display = "block";

      try {
        const res = await fetch(`${BACKEND_URL}/api/users/transactions`, {
          headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        });

        const data = await res.json();
        const listEl = document.getElementById("transactionList");

        if (Array.isArray(data) && data.length > 0) {
          listEl.innerHTML = data.map(tx => `
            <p>
              <strong>${new Date(tx.date).toLocaleDateString()}</strong>: 
              ${tx.type} - $${tx.amount}
            </p>
          `).join("");
        } else {
          listEl.innerHTML = "<p>No transactions yet.</p>";
        }
      } catch (err) {
        console.error("Error loading transactions:", err);
        document.getElementById("transactionList").innerHTML = "<p>Error loading transactions.</p>";
      }
    });
  }

  // Account Details Modal
  if (btnAccount && accountModal) {
    btnAccount.addEventListener("click", () => {
      accountModal.style.display = "block";

      document.getElementById("currentAccountNumber").textContent =
        window.accountNumbers?.current || "N/A";

      document.getElementById("savingsAccountNumber").textContent =
        window.accountNumbers?.savings || "N/A";

      document.getElementById("accCurrentBalance").textContent =
        document.getElementById("onlyCurrentBalance")?.textContent || "$0";

      document.getElementById("accSavingsBalance").textContent =
        document.getElementById("savingsBalance")?.textContent || "$0";

      document.getElementById("accLoanBalance").textContent =
        document.getElementById("loanBalance")?.textContent || "$0";
    });
  }

  // Close modals
  document.querySelectorAll(".modal .close").forEach(closeBtn => {
    closeBtn.addEventListener("click", (e) => {
      const modalId = e.target.getAttribute("data-close");
      if (modalId) document.getElementById(modalId).style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) e.target.style.display = "none";
  });

});



async function loadAccountSummary() {
  try {
    const token = localStorage.getItem("token"); 
    const res = await fetch("https://api.pvbonline.online/api/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to load account details");
    const data = await res.json();

    // ✅ Welcome text
    document.getElementById("welcomeText").innerText =
      `Welcome Back, ${data.fullname || "User"}`;

    // ✅ Balance (current + savings)
    const totalBalance = (data.balances?.current || 0) + (data.balances?.savings || 0);
    document.getElementById("accountBalance").innerText =
      `$${totalBalance.toFixed(2)}`;

    // ✅ Current account number
    document.getElementById("accountNumber").innerText =
      data.currentAccountNumber || "N/A";

    // ✅ Account type (hard-coded since API doesn’t send type)
    document.getElementById("accountType").innerText = "Current & Savings";

    // ✅ Status (hard-coded since API doesn’t send status)
    document.getElementById("accountStatus").innerText = "Active";

  } catch (err) {
    console.error("Error loading account summary:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadAccountSummary);


//  profile picture/name display end