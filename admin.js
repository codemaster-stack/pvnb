// // ========== DOM Content Loaded - Main Initialization ==========
// document.addEventListener("DOMContentLoaded", () => {
//   // Check authentication token
//   const token = localStorage.getItem("adminToken");
//   if (!token) {
//     window.location.href = "admin-signup.html";
//     return;
//   }

//   // Initialize sidebar navigation
//   initializeSidebar();
  
//   // Initialize logout functionality
//   initializeLogout();
  
//   // Initialize chat functionality
//   initializeChat();
  
//   // Initialize card preview close button
//   initializeCardPreview();
  
//   // Fetch notifications
//   fetchUnreadNotifications();
// });

// // ========== Sidebar Navigation ==========
// function initializeSidebar() {
//   const links = document.querySelectorAll(".sidebar a[data-target]");
//   const sections = document.querySelectorAll(".section, .form-section");

//   links.forEach(link => {
//     link.addEventListener("click", (e) => {
//       e.preventDefault();

//       // Hide all sections first
//       sections.forEach(sec => sec.style.display = "none");

//       // Remove active class from all links
//       links.forEach(l => l.classList.remove("active"));

//       // Show the clicked section
//       const targetId = link.getAttribute("data-target");
//       const target = document.getElementById(targetId);
//       if (target) {
//         target.style.display = "block";
//       }

//       // Add active class to clicked link
//       link.classList.add("active");
      
//       // Update page title
//       const pageTitle = document.querySelector('.top-bar h1');
//       if (pageTitle) {
//         pageTitle.textContent = link.textContent;
//       }
//     });
//   });

//   // Show dashboard by default
//   const dashboard = document.getElementById("dashboard");
//   if (dashboard) {
//     dashboard.style.display = "block";
//     links[0]?.classList.add("active");
//   }
// }

// // ========== Logout Functionality ==========
function initializeLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem("adminToken");
        window.location.href = "admin-signup.html"; 
      }
    });
  }
}

// // ========== Chat Functionality ==========
// function initializeChat() {
//   // Check if socket.io is available
//   if (typeof io !== 'undefined') {
//     const socket = io();

//     // Load chat history
//     socket.on("chatHistory", (history) => {
//       const messages = document.getElementById("chatMessages");
//       if (messages) {
//         history.forEach(msg => appendMessage(msg));
//       }
//     });

//     // Receive new messages
//     socket.on("chatMessage", (msg) => {
//       appendMessage(msg);
//     });
//   }

//   // Chat toggle buttons
//   const openChat = document.getElementById("openChat");
//   const closeChat = document.getElementById("closeChat");
//   const chatBox = document.getElementById("chatBox");
//   const sendMessage = document.getElementById("sendMessage");

//   if (openChat && chatBox) {
//     openChat.addEventListener("click", () => {
//       chatBox.style.display = "block";
//     });
//   }

//   if (closeChat && chatBox) {
//     closeChat.addEventListener("click", () => {
//       chatBox.style.display = "none";
//     });
//   }

//   if (sendMessage) {
//     sendMessage.addEventListener("click", sendChatMessage);
//   }

//   // Enter key to send message
//   const chatInput = document.getElementById("chatInput");
//   if (chatInput) {
//     chatInput.addEventListener("keypress", (e) => {
//       if (e.key === "Enter") {
//         sendChatMessage();
//       }
//     });
//   }
// }

// function sendChatMessage() {
//   const input = document.getElementById("chatInput");
//   if (!input) return;
  
//   const messageText = input.value.trim();
//   if (!messageText) return;

//   const msg = {
//     sender: "admin",
//     message: messageText,
//     timestamp: new Date()
//   };

//   // Emit to socket if available
//   if (typeof socket !== 'undefined') {
//     socket.emit("chatMessage", msg);
//   }
  
//   input.value = "";
// }

// function appendMessage(msg) {
//   const messages = document.getElementById("chatMessages");
//   if (!messages) return;
  
//   const div = document.createElement("div");
//   div.classList.add("message", msg.sender === "admin" ? "agent-message" : "user-message");
//   div.innerHTML = `
//     <div class="message-content">
//       <div class="message-header">${msg.sender === "admin" ? "Customer Support" : "You"}</div>
//       <div class="message-text">${msg.message}</div>
//       <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</div>
//     </div>
//   `;
//   messages.appendChild(div);
//   messages.scrollTop = messages.scrollHeight;
// }

// // ========== Virtual Cards Functionality ==========
// let cards = [
//   { id: genId(), number: '4242 4242 4242 4242', expiry: '2026-09', cvv: '123', user: 'John Doe', notes: 'Test card', blocked: false }
// ];

// function genId() {
//   return 'vc_' + Math.random().toString(36).slice(2,9);
// }

// function renderCards() {
//   const table = document.getElementById('virtualCardsTable');
//   if (!table) return;
  
//   const tbody = table.querySelector('tbody');
//   if (!tbody) return;
  
//   tbody.innerHTML = '';
//   cards.forEach((c, idx) => {
//     const tr = document.createElement('tr');
//     const masked = maskCard(c.number);

//     tr.innerHTML = `
//       <td>${idx + 1}</td>
//       <td>${masked}</td>
//       <td>${c.expiry}</td>
//       <td>${c.cvv}</td>
//       <td>${escapeHtml(c.user)}</td>
//       <td>${escapeHtml(c.notes || '')}</td>
//       <td>${c.blocked ? '<strong style="color:red">Blocked</strong>' : '<span>Active</span>'}</td>
//       <td>
//         <button onclick="toggleBlock('${c.id}')">${c.blocked ? 'Unblock' : 'Block'}</button>
//         <button onclick="deleteCard('${c.id}')">Delete</button>
//       </td>
//     `;
//     tbody.appendChild(tr);
//   });
// }

// function maskCard(num) {
//   const digits = num.replace(/\s+/g, '');
//   if (digits.length <= 4) return digits;
//   const last4 = digits.slice(-4);
//   return '•••• •••• •••• ' + last4;
// }

// function escapeHtml(str) {
//   return String(str || '').replace(/[&<>"'/]/g, function (s) {
//     return ({
//       '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;'
//     })[s];
//   });
// }

// function createCard(e) {
//   e.preventDefault();
//   const number = document.getElementById('cardNumber')?.value.trim();
//   const expiry = document.getElementById('expiryDate')?.value;
//   const cvv = document.getElementById('cvv')?.value.trim();
//   const user = document.getElementById('cardUser')?.value.trim();
//   const notes = document.getElementById('cardNotes')?.value.trim();

//   if (!number || !expiry || !cvv || !user) {
//     alert('Please fill required fields.');
//     return;
//   }

//   const newCard = {
//     id: genId(),
//     number,
//     expiry,
//     cvv,
//     user,
//     notes,
//     blocked: false
//   };

//   cards.unshift(newCard);
//   renderCards();

//   const createForm = document.getElementById('createCardForm');
//   if (createForm) createForm.reset();
// }

// function toggleBlock(id) {
//   cards = cards.map(c => {
//     if (c.id === id) c.blocked = !c.blocked;
//     return c;
//   });
//   renderCards();
// }

// function deleteCard(id) {
//   if (!confirm('Delete this virtual card? This cannot be undone.')) return;
//   cards = cards.filter(c => c.id !== id);
//   renderCards();
// }

// // Initialize cards rendering
// setTimeout(renderCards, 100);

// // ========== Card Preview Functionality ==========
// function initializeCardPreview() {
//   const closePreviewBtn = document.getElementById('closePreview');
//   const cardPreview = document.getElementById('cardPreview');

//   if (closePreviewBtn && cardPreview) {
//     closePreviewBtn.addEventListener('click', () => {
//       cardPreview.style.display = 'none';
      
//       // Reset preview values
//       const previewNumber = document.getElementById('previewNumber');
//       const previewUser = document.getElementById('previewUser');
//       const previewExpiry = document.getElementById('previewExpiry');
//       const previewLogo = document.getElementById('previewLogo');
//       const previewNotes = document.getElementById('previewNotes');

//       if (previewNumber) previewNumber.textContent = '•••• •••• •••• 1234';
//       if (previewUser) previewUser.textContent = 'Jane Doe';
//       if (previewExpiry) previewExpiry.textContent = '09/26';
//       if (previewLogo) previewLogo.src = '';
//       if (previewNotes) previewNotes.textContent = '';
//     });
//   }
// }

// function previewCard() {
//   const number = document.getElementById('cardNumber')?.value.trim();
//   const expiry = document.getElementById('expiryDate')?.value;
//   const user = document.getElementById('cardUser')?.value.trim();
//   const logoInput = document.getElementById('cardLogo');
//   const notes = document.getElementById('cardNotes')?.value.trim();

//   if (!number || !expiry || !user) {
//     alert('Please fill required fields.');
//     return;
//   }

//   // Update preview
//   const previewNumber = document.getElementById('previewNumber');
//   const previewUser = document.getElementById('previewUser');
//   const previewExpiry = document.getElementById('previewExpiry');
//   const previewLogo = document.getElementById('previewLogo');
//   const previewNotes = document.getElementById('previewNotes');

//   if (previewNumber) previewNumber.textContent = '•••• •••• •••• ' + number.slice(-4);
//   if (previewUser) previewUser.textContent = user;
//   if (previewExpiry) previewExpiry.textContent = expiry.split('-')[1] + '/' + expiry.split('-')[0].slice(2);
//   if (previewNotes) previewNotes.textContent = notes || '';

//   // Show logo if uploaded
//   if (logoInput && logoInput.files[0] && previewLogo) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       previewLogo.src = e.target.result;
//     };
//     reader.readAsDataURL(logoInput.files[0]);
//   } else if (previewLogo) {
//     previewLogo.src = '';
//   }

//   // Show preview container
//   const cardPreview = document.getElementById('cardPreview');
//   if (cardPreview) cardPreview.style.display = 'block';
// }

// function sendCardEmail() {
//   const number = document.getElementById('cardNumber')?.value.trim();
//   const user = document.getElementById('cardUser')?.value.trim();
//   alert(`Card ending ${number?.slice(-4)} sent to ${user}'s email!`);
// }

// // ========== Bank Transactions ==========
// let bankTransactions = [];

// function addBankTransaction(e) {
//   e.preventDefault();
//   const tx = {
//     date: new Date().toISOString().split("T")[0],
//     userId: document.getElementById("bankUserId")?.value.trim(),
//     bank: document.getElementById("bankName")?.value.trim(),
//     amount: document.getElementById("bankAmount")?.value.trim(),
//     ref: document.getElementById("bankRef")?.value.trim(),
//     status: document.getElementById("bankStatus")?.value
//   };
  
//   bankTransactions.unshift(tx);
//   renderBankTransactions();
//   e.target.reset();
// }

// function renderBankTransactions(list = bankTransactions) {
//   const tbody = document.getElementById("bankTransactionTable");
//   if (!tbody) return;
  
//   tbody.innerHTML = "";
//   list.forEach(tx => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${tx.date}</td>
//       <td>${tx.userId}</td>
//       <td>${tx.bank}</td>
//       <td>₦${tx.amount}</td>
//       <td>${tx.ref}</td>
//       <td>${tx.status}</td>
//     `;
//     tbody.appendChild(tr);
//   });
// }

// function filterBankTransactions() {
//   const search = document.getElementById("bankSearch")?.value.toLowerCase() || "";
//   const status = document.getElementById("bankStatusFilter")?.value || "all";
//   const from = document.getElementById("bankFrom")?.value || "";
//   const to = document.getElementById("bankTo")?.value || "";

//   let filtered = bankTransactions.filter(tx => {
//     let match = true;

//     if (search && !(tx.userId.toLowerCase().includes(search) || tx.ref.toLowerCase().includes(search))) {
//       match = false;
//     }
//     if (status !== "all" && tx.status !== status) {
//       match = false;
//     }
//     if (from && tx.date < from) {
//       match = false;
//     }
//     if (to && tx.date > to) {
//       match = false;
//     }

//     return match;
//   });

//   renderBankTransactions(filtered);
// }

// // ========== Deposit Transactions ==========
// let depositTransactions = [];

// function addDepositTransaction(e) {
//   e.preventDefault();

//   const userId = document.getElementById("depositUserId")?.value.trim();
//   const method = document.getElementById("depositMethod")?.value.trim();
//   const amount = document.getElementById("depositAmount")?.value.trim();
//   const ref = document.getElementById("depositRef")?.value.trim();
//   const status = document.getElementById("depositStatus")?.value;
//   const date = new Date().toLocaleString();

//   const newTransaction = { date, userId, method, amount, ref, status };
//   depositTransactions.push(newTransaction);

//   renderDepositTransactions();
//   const form = document.getElementById("depositTransactionForm");
//   if (form) form.reset();
// }

// function renderDepositTransactions(transactions = depositTransactions) {
//   const table = document.getElementById("depositTransactionTable");
//   if (!table) return;
  
//   table.innerHTML = "";

//   transactions.forEach(t => {
//     const row = `<tr>
//       <td>${t.date}</td>
//       <td>${t.userId}</td>
//       <td>${t.method}</td>
//       <td>${t.amount}</td>
//       <td>${t.ref}</td>
//       <td>${t.status}</td>
//     </tr>`;
//     table.innerHTML += row;
//   });
// }

// function filterDepositTransactions() {
//   const search = document.getElementById("depositSearch")?.value.toLowerCase() || "";
//   const status = document.getElementById("depositStatusFilter")?.value || "all";
//   const from = document.getElementById("depositFrom")?.value || "";
//   const to = document.getElementById("depositTo")?.value || "";

//   let filtered = depositTransactions.filter(t => {
//     return (
//       (t.userId.toLowerCase().includes(search) || t.ref.toLowerCase().includes(search)) &&
//       (status === "all" || t.status === status)
//     );
//   });

//   if (from) {
//     filtered = filtered.filter(t => new Date(t.date) >= new Date(from));
//   }
//   if (to) {
//     filtered = filtered.filter(t => new Date(t.date) <= new Date(to));
//   }

//   renderDepositTransactions(filtered);
// }

// // ========== Send Email ==========
// let sentEmails = [];

// // Initialize email form
// setTimeout(() => {
//   const emailForm = document.getElementById("sendEmailForm");
//   if (emailForm) {
//     emailForm.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const to = document.getElementById("emailTo")?.value.trim();
//       const subject = document.getElementById("emailSubject")?.value.trim();
//       const body = document.getElementById("emailBody")?.value.trim();
//       const date = new Date().toLocaleString();

//       if (!to || !subject || !body) {
//         alert("Please fill in all fields before sending.");
//         return;
//       }

//       try {
//         const res = await fetch("https://api.pvbonline.online/api/admin/send-email", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ to, subject, body })
//         });

//         const data = await res.json();

//         if (res.ok) {
//           alert(`Email sent successfully to ${to}!`);
//           sentEmails.push({ date, to, subject, body });
//           renderEmails();
//           emailForm.reset();
//         } else {
//           alert(`Failed: ${data.message || "Could not send email"}`);
//         }
//       } catch (err) {
//         alert("Error sending email. Please try again.");
//         console.error(err);
//       }
//     });
//   }
// }, 100);

// function renderEmails() {
//   const table = document.getElementById("emailTable");
//   if (!table) return;
  
//   table.innerHTML = "";

//   sentEmails.forEach(e => {
//     const row = `<tr>
//       <td>${e.date}</td>
//       <td>${e.to}</td>
//       <td>${e.subject}</td>
//       <td>${e.body}</td>
//     </tr>`;
//     table.innerHTML += row;
//   });
// }

// // ========== User Management ==========
// let allUsers = [];

// // Load users when manage users section is accessed
// async function loadUsers() {
//   try {
//     const response = await fetch("https://api.pvbonline.online/api/auth/admin/get-users");
//     const data = await response.json();

//     if (response.ok) {
//       allUsers = data.users || data || [];
//       renderUsers();
//     } else {
//       console.error("Failed to load users:", data.message || data.error);
//       alert("Failed to load users. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error loading users:", error);
//     alert("Network error while loading users. Please check your connection.");
//   }
// }

// // Render users in the table
// function renderUsers(users = allUsers) {
//   const table = document.getElementById("manageUsersTable");
//   if (!table) return;

//   // Clear existing rows (except header)
//   const tbody = table.querySelector('tbody');
//   if (tbody) {
//     tbody.innerHTML = '';
//   } else {
//     // If no tbody, clear all rows except first one (header)
//     while (table.rows.length > 1) {
//       table.deleteRow(1);
//     }
//   }

//   users.forEach((user, index) => {
//     const row = table.insertRow();
//     row.innerHTML = `
//       <td><input type="checkbox" class="userCheckbox" data-id="${user.id || user._id}"></td>
//       <td>${index + 1}</td>
//       <td>${user.name || user.fullName || 'N/A'}</td>
//       <td>${user.email || 'N/A'}</td>
//       <td>₦${user.balance || '0.00'}</td>
//       <td class="status">${user.status || 'Active'}</td>
//       <td>
//         <button onclick="toggleUserStatus(this, '${user.id || user._id}')">
//           ${user.status === 'Active' ? 'Deactivate' : 'Activate'}
//         </button>
//       </td>
//     `;
//   });
// }

// // Auto-load users when manage-users section is clicked
// setTimeout(() => {
//   const manageUsersLink = document.querySelector('a[data-target="manage-users"]');
//   if (manageUsersLink) {
//     manageUsersLink.addEventListener('click', () => {
//       setTimeout(loadUsers, 100); // Small delay to ensure section is shown
//     });
//   }
// }, 100);

// function toggleAllUsers(source) {
//   document.querySelectorAll(".userCheckbox").forEach(cb => cb.checked = source.checked);
// }

// function bulkFund() {
//   const selected = document.querySelectorAll("#manageUsersTable input[type='checkbox']:checked");
//   if (selected.length === 0) {
//     alert("Please select at least one user.");
//     return;
//   }
//   alert("Bulk Fund triggered for " + selected.length + " users");
// }

// function bulkEmail() {
//   const selected = document.querySelectorAll("#manageUsersTable input[type='checkbox']:checked");
//   if (selected.length === 0) {
//     alert("Please select at least one user.");
//     return;
//   }
//   alert("Bulk Email triggered for " + selected.length + " users");
// }

// function bulkDelete() {
//   const selected = document.querySelectorAll("#manageUsersTable input[type='checkbox']:checked");
//   if (selected.length === 0) {
//     alert("Please select at least one user to delete.");
//     return;
//   }

//   if (!confirm(`Are you sure you want to delete ${selected.length} selected users? This cannot be undone.`)) {
//     return;
//   }

//   alert("Bulk Delete triggered for " + selected.length + " users");
// }

// function bulkPinReset() {
//   const selected = document.querySelectorAll("#manageUsersTable input[type='checkbox']:checked");
//   if (selected.length === 0) {
//     alert("Please select at least one user to reset PIN.");
//     return;
//   }

//   if (!confirm("Are you sure you want to reset PINs for selected users?")) return;

//   selected.forEach(checkbox => {
//     const userId = checkbox.getAttribute("data-id");
//     console.log(`Resetting PIN for user ID: ${userId}`);
//   });

//   alert("Selected users' PINs have been reset.");
// }

// function toggleUserStatus(btn, userId) {
//   const row = btn.closest("tr");
//   const statusCell = row.querySelector(".status");
  
//   if (statusCell.textContent === "Active") {
//     statusCell.textContent = "Inactive";
//     btn.textContent = "Activate";
//   } else {
//     statusCell.textContent = "Active";
//     btn.textContent = "Deactivate";
//   }

//   // TODO: Make API call to update user status
//   console.log(`Toggling status for user ID: ${userId}`);
// }

// // ========== Create User ==========
async function createUser(event) {
  event.preventDefault();

  const name = document.getElementById("newUserName")?.value.trim();
  const email = document.getElementById("newUserEmail")?.value.trim();
  const phone = document.getElementById("newUserPhone")?.value.trim();
  const password = document.getElementById("newUserPassword")?.value.trim();

  if (!name || !email || !phone || !password) {
    alert("Please fill in all required fields.");
    return;
  }

  // Show loading state
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn?.textContent;
  if (submitBtn) {
    submitBtn.textContent = "Creating User...";
    submitBtn.disabled = true;
  }

  try {
    // Make API call to register user
    const response = await fetch("https://api.pvbonline.online/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Success - add user to the manage users table
      const table = document.getElementById("manageUsersTable");
      if (table) {
        const row = table.insertRow();
        
        row.innerHTML = `
          <td><input type="checkbox" class="userCheckbox" data-id="${data.user?.id || 'unknown'}"></td>
          <td>${table.rows.length}</td>
          <td>${name}</td>
          <td>${email}</td>
          <td>${phone}</td>
          <td class="status">Active</td>
          <td>
            <button onclick="toggleUserStatus(this)">Deactivate</button>
          </td>
        `;
      }

      alert(`User "${name}" created successfully!`);
      
      // Reset form
      const form = document.getElementById("createUserForm");
      if (form) form.reset();

    } else {
      // Handle API errors
      const errorMessage = data.message || data.error || "Failed to create user";
      alert(`Error: ${errorMessage}`);
    }

  } catch (error) {
    console.error("Error creating user:", error);
    alert("Network error. Please check your connection and try again.");
  } finally {
    // Reset button state
    if (submitBtn) {
      submitBtn.textContent = originalText || "Create User";
      submitBtn.disabled = false;
    }
  }
}

// // ========== Update User Profile ==========
// function updateUserProfile(event) {
//   event.preventDefault();

//   const name = document.getElementById("updateName")?.value.trim();
//   const email = document.getElementById("updateEmail")?.value.trim();
//   const phone = document.getElementById("updatePhone")?.value.trim();
//   const password = document.getElementById("updatePassword")?.value.trim();
//   const pin = document.getElementById("updatePin")?.value.trim();
//   const confirmPin = document.getElementById("confirmPin")?.value.trim();
//   const address = document.getElementById("updateAddress")?.value.trim();
//   const work = document.getElementById("updateWork")?.value.trim();
//   const status = document.getElementById("updateStatus")?.value;
//   const profilePic = document.getElementById("updateProfilePic")?.files[0];

//   if (!name || !email || !phone) {
//     alert("Name, Email, and Phone are required.");
//     return;
//   }

//   if (pin && pin.length !== 4) {
//     alert("PIN must be exactly 4 digits.");
//     return;
//   }

//   if (pin && pin !== confirmPin) {
//     alert("PIN and Confirm PIN do not match.");
//     return;
//   }

//   console.log({
//     name, email, phone, password, pin, address, work, status, profilePic
//   });

//   alert(`User "${name}" profile updated successfully!`);

//   const form = document.getElementById("updateUserForm");
//   if (form) form.reset();
// }

// // ========== Transaction History Filter ==========
// function filterTransactions() {
//   // Add your transaction filtering logic here
//   console.log("Filtering transactions...");
// }

// // ========== Notification System ==========
// async function fetchUnreadNotifications() {
//   try {
//     const res = await fetch('https://api.pvbonline.online/api/loan/unread-count');
//     const data = await res.json();
//     const badge = document.getElementById('notificationBadge');

//     if (badge) {
//       if (data.count > 0) {
//         badge.textContent = data.count;
//         badge.style.display = 'inline-block';
//       } else {
//         badge.style.display = 'none';
//       }
//     }
//   } catch (err) {
//     console.error('Error fetching notifications:', err);
//   }
// }

// // Refresh notifications every 30 seconds
// setInterval(fetchUnreadNotifications, 30000);

// // Mail icon click handler
// setTimeout(() => {
//   const mailIcon = document.querySelector('.mail-icon');
//   if (mailIcon) {
//     mailIcon.addEventListener('click', () => {
//       window.location.href = 'https://api.pvbonline.online/admin/loan-applications';
//     });
//   }
// }, 100);


// side bar tuggle

document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
  const sections = document.querySelectorAll(".section");

  // Hide all sections except dashboard
  sections.forEach(sec => {
    if(sec.id !== "dashboard") sec.style.display = "none";
  });

  // Function to remove active class from all links
  function clearActiveLinks() {
    sidebarLinks.forEach(link => link.classList.remove("active"));
  }

  // Toggle logic with active highlighting
  sidebarLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;

      // Show only target section
      sections.forEach(sec => {
        sec.style.display = (sec.id === targetId) ? "block" : "none";
      });

      // Update active link
      clearActiveLinks();
      link.classList.add("active");
    });
  });
});

// side bar tuggle end




// render user display in table

const token = localStorage.getItem("token"); // admin token
const manageUsersTable = document.getElementById("manageUsersTable");

// Pagination and search state
let currentPage = 1;
const pageSize = 10;
let totalPages = 1;
let searchQuery = "";

// Fetch users from backend
async function fetchUsers(page = 1, search = "") {
  try {
    const res = await fetch(`https://api.pvbonline.online/api/admin/users?page=${page}&limit=${pageSize}&search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();

    // Render table rows
    manageUsersTable.innerHTML = "";
    data.users.forEach((user, index) => {
      const balance = user.balances.savings + user.balances.current;
      manageUsersTable.innerHTML += `
        <tr>
          <td><input type="checkbox" data-id="${user._id}"></td>
          <td>${(page-1)*pageSize + index + 1}</td>
          <td>${user.fullname}</td>
          <td>${user.email}</td>
          <td>
            Savings: ₦${user.balances.savings}<br>
            Current: ₦${user.balances.current}<br>
            Total: ₦${balance}
          </td>
          <td>${user.status}</td>
          <td>
            <button onclick="editUser('${user._id}')">Edit</button>
            <button onclick="resetPin('${user._id}')">Reset PIN</button>
            <button onclick="deleteUser('${user._id}')">Delete</button>
            <button onclick="fundUser('${user._id}')">Fund</button>
          </td>
        </tr>
      `;
    });

    // Update total pages
    totalPages = data.totalPages;
    renderPagination();
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

// Search input
document.getElementById("searchUserInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  fetchUsers(1, searchQuery);
});

// Pagination controls
function renderPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.addEventListener("click", () => {
      currentPage = i;
      fetchUsers(currentPage, searchQuery);
    });
    paginationContainer.appendChild(btn);
  }
}

// Initial fetch
fetchUsers();





function handleSearch() {
  const search = document.getElementById("searchUsers").value;
  currentSearch = search;
  fetchUsers(1, currentSearch, currentSort, currentOrder);
}

function handleSort() {
  currentSort = document.getElementById("sortUsers").value;
  currentOrder = document.getElementById("sortOrder").value;
  fetchUsers(currentPage, currentSearch, currentSort, currentOrder);
}

function changePage(page) {
  if (page < 1 || page > totalPages) return;
  fetchUsers(page, currentSearch, currentSort, currentOrder);
}
// =====================
// Action Functions
// =====================

function editUser(userId) {
  // open modal or form to edit profile pic, name, email, phone, status
  console.log("Edit user:", userId);
}

function resetPin(userId) {
  // open modal or confirm reset
  console.log("Reset PIN for:", userId);
}

function deleteUser(userId) {
  // confirm then delete
  console.log("Delete user:", userId);
}

function fundUser(userId) {
  // open modal to choose account (savings/current), amount, description
  console.log("Fund user:", userId);
}
// render user display in table

async function editUser(userId) {
  try {
    const res = await fetch(`https://api.pvbonline.online/api/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const user = await res.json();

    document.getElementById("editUserId").value = user._id;
    document.getElementById("editFullName").value = user.fullname;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editPhone").value = user.phone;
    document.getElementById("editStatus").value = user.status;

    openModal("editUserModal");
  } catch (err) {
    console.error("Failed to fetch user:", err);
    alert("Failed to load user data");
  }
}

// Handle update form submission
document.getElementById("editUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const userId = document.getElementById("editUserId").value;
  const formData = new FormData();
  const profilePic = document.getElementById("editProfilePic").files[0];
  if (profilePic) formData.append("photo", profilePic);
  formData.append("fullname", document.getElementById("editFullName").value);
  formData.append("email", document.getElementById("editEmail").value);
  formData.append("phone", document.getElementById("editPhone").value);
  formData.append("status", document.getElementById("editStatus").value);

  try {
    const res = await fetch(`https://api.pvbonline.online/api/admin/users/${userId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ User updated successfully");
      closeModal("editUserModal");
      fetchUsers(currentPage, searchQuery); // refresh table
    } else {
      alert(data.message || "Failed to update user");
    }
  } catch (err) {
    console.error("Update failed:", err);
    alert("Error updating user");
  }
});
// edit/update user end


// resetPin
function resetPin(userId) {
  document.getElementById("resetUserId").value = userId;
  document.getElementById("newUserPin").value = "";
  document.getElementById("confirmUserPin").value = "";
  openModal("resetPinModal");
}

document.getElementById("resetPinForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = document.getElementById("resetUserId").value;
  const newPin = document.getElementById("newUserPin").value;
  const confirmPin = document.getElementById("confirmUserPin").value;

  if (newPin !== confirmPin) {
    alert("❌ PINs do not match!");
    return;
  }

  try {
    const res = await fetch(`https://api.pvbonline.online/api/admin/users/${userId}/reset-pin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ pin: newPin })
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ User PIN reset successfully");
      closeModal("resetPinModal");
    } else {
      alert(data.message || "Failed to reset PIN");
    }
  } catch (err) {
    console.error("Reset PIN failed:", err);
    alert("Error resetting user PIN");
  }
});

// reset pin end

// fund user
function fundUser(userId) {
  document.getElementById("fundUserId").value = userId;
  document.getElementById("fundAmount").value = "";
  document.getElementById("fundDate").value = new Date().toISOString().split("T")[0]; // default to today
  document.getElementById("fundDescription").value = "";
  document.getElementById("fundAccountType").value = "";
  openModal("fundUserModal");
}

document.getElementById("fundUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = document.getElementById("fundUserId").value;
  const accountType = document.getElementById("fundAccountType").value;
  const amount = parseFloat(document.getElementById("fundAmount").value);
  const date = document.getElementById("fundDate").value;
  const description = document.getElementById("fundDescription").value;

  if (!accountType) {
    alert("Please select an account type");
    return;
  }

  try {
    const res = await fetch(`https://api.pvbonline.online/api/admin/users/${userId}/fund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ accountType, amount, date, description })
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Account funded successfully");
      closeModal("fundUserModal");
      loadUsers(); // refresh user table to show updated balance
    } else {
      alert(data.message || "Failed to fund user");
    }
  } catch (err) {
    console.error("Fund user failed:", err);
    alert("Error funding user");
  }
});
// fund user end



// delete user
function deleteUser(userId) {
  document.getElementById("deleteUserId").value = userId;
  openModal("deleteUserModal");
}

async function confirmDeleteUser() {
  const userId = document.getElementById("deleteUserId").value;

  if (!userId) return;

  try {
    const res = await fetch(`https://api.pvbonline.online/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ User deleted successfully");
      closeModal("deleteUserModal");
      loadUsers(); // refresh the user table
    } else {
      alert(data.message || "Failed to delete user");
    }
  } catch (err) {
    console.error("Delete user failed:", err);
    alert("Error deleting user");
  }
}
// delete user end



// chart
    // Make sure this runs after DOM is fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    const socket = io("https://api.pvbonline.online"); // backend URL
    const adminId = "admin123"; // replace with actual logged-in admin ID

    // Join as admin
    socket.emit("joinAdmin", adminId);

    // Cache elements
    const chatBox = document.getElementById("chatBox");
    const openChatBtn = document.getElementById("openChat");
    const closeChatBtn = document.getElementById("closeChat");
    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const sendMessageBtn = document.getElementById("sendMessage");

    let activeVisitorId = null; // track the visitor we are replying to

    if (openChatBtn && chatBox) {
      openChatBtn.addEventListener("click", () => {
        chatBox.style.display = "block";
      });
    }

    if (closeChatBtn && chatBox) {
      closeChatBtn.addEventListener("click", () => {
        chatBox.style.display = "none";
      });
    }

    // Listen for visitor messages
    socket.on("chatMessage", (data) => {
      if (data.sender === "visitor") {
        activeVisitorId = data.visitorId || activeVisitorId; // save visitor session
        appendMessage("Visitor", data.text, "visitor");
      }
    });

    // Send admin reply
    function sendAdminMessage() {
      const text = chatInput.value.trim();
      if (!text || !activeVisitorId) return;

      socket.emit("adminMessage", { visitorId: activeVisitorId, text });
      appendMessage("You", text, "admin");
      chatInput.value = "";
    }

    if (sendMessageBtn) {
      sendMessageBtn.addEventListener("click", sendAdminMessage);
    }

    if (chatInput) {
      chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendAdminMessage();
      });
    }

    // Helper to append messages
    function appendMessage(sender, text, type) {
      if (!chatMessages) return;
      const div = document.createElement("div");
      div.classList.add("message", type);
      div.innerHTML = `<strong>${sender}:</strong> ${text}`;
      chatMessages.appendChild(div);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });