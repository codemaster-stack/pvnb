
// chatBox
// Toggle chat box
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

// end chat Box

// toggle menu function button open/hide

function showSection(id) {
  // hide all .section and .form-section
  document.querySelectorAll('.section, .form-section').forEach(sec => sec.style.display = 'none');

  // show the one clicked
  const target = document.getElementById(id);
  if (target) target.style.display = 'block';
}

// Highlight the active menu item
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar a[data-target]");
  const sections = document.querySelectorAll(".section, .form-section");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // hide all sections
      sections.forEach(sec => sec.style.display = "none");

      // remove active class
      links.forEach(l => l.classList.remove("active"));

      // show the clicked section
      const targetId = link.getAttribute("data-target");
      const target = document.getElementById(targetId);
      if (target) target.style.display = "block";

      // add active class
      link.classList.add("active");
    });
  });

  // show dashboard by default
  document.getElementById("dashboard").style.display = "block";
  links[0].classList.add("active");
});

// Highlight the active menu item end

  // toggle menu function button open/hide end


  
  // Support both id variations (virtualCards OR virtual-cards)

  const virtualSection = document.getElementById('virtualCards') || document.getElementById('virtual-cards');
  const createForm = document.getElementById('createCardForm');
  const table = document.getElementById('virtualCardsTable').querySelector('tbody');

  // In-memory store (replace with backend integration later)
  let cards = [
    // sample card
    { id: genId(), number: '4242 4242 4242 4242', expiry: '2026-09', cvv: '123', user: 'John Doe', notes: 'Test card', blocked: false }
  ];

  // Utility: generate unique id
  function genId() {
    return 'vc_' + Math.random().toString(36).slice(2,9);
  }

  // Render cards list
  function renderCards() {
    table.innerHTML = '';
    cards.forEach((c, idx) => {
      const tr = document.createElement('tr');

      // mask card number except last 4 digits for display
      const masked = maskCard(c.number);

      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${masked}</td>
        <td>${c.expiry}</td>
        <td>${c.cvv}</td>
        <td>${escapeHtml(c.user)}</td>
        <td>${escapeHtml(c.notes || '')}</td>
        <td>${c.blocked ? '<strong style="color:red">Blocked</strong>' : '<span>Active</span>'}</td>
        <td>
          <button onclick="toggleBlock('${c.id}')">${c.blocked ? 'Unblock' : 'Block'}</button>
          <button onclick="deleteCard('${c.id}')">Delete</button>
        </td>
      `;
      table.appendChild(tr);
    });
  }

  // Mask card number leaving last 4 digits visible
  function maskCard(num) {
    const digits = num.replace(/\s+/g, '');
    if (digits.length <= 4) return digits;
    const last4 = digits.slice(-4);
    return '•••• •••• •••• ' + last4;
  }

  // Escape HTML to avoid injection when displaying text
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"'/]/g, function (s) {
      return ({
        '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;'
      })[s];
    });
  }

  // Create new card (client-side)
  function createCard(e) {
    e.preventDefault();
    const number = document.getElementById('cardNumber').value.trim();
    const expiry = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value.trim();
    const user = document.getElementById('cardUser').value.trim();
    const notes = document.getElementById('cardNotes').value.trim();

    // basic validation
    if (!number || !expiry || !cvv || !user) {
      alert('Please fill required fields.');
      return;
    }

    const newCard = {
      id: genId(),
      number,
      expiry,
      cvv,
      user,
      notes,
      blocked: false
    };

    // push to in-memory list and re-render
    cards.unshift(newCard);
    renderCards();

    // reset form
    createForm.reset();
  }

  // Toggle block/unblock
  function toggleBlock(id) {
    cards = cards.map(c => {
      if (c.id === id) c.blocked = !c.blocked;
      return c;
    });
    renderCards();
  }

  // Delete card
  function deleteCard(id) {
    if (!confirm('Delete this virtual card? This cannot be undone.')) return;
    cards = cards.filter(c => c.id !== id);
    renderCards();
  }

  // initial render
  renderCards();

  // Support both id variations (virtualCards OR virtual-cards) end

  // preview atm Card

function previewCard() {
  const number = document.getElementById('cardNumber').value.trim();
  const expiry = document.getElementById('expiryDate').value;
  const user = document.getElementById('cardUser').value.trim();
  const logoInput = document.getElementById('cardLogo');

  if (!number || !expiry || !user) {
    alert('Please fill required fields.');
    return;
  }

  // Update preview
  document.getElementById('previewNumber').textContent =
    '•••• •••• •••• ' + number.slice(-4);
  document.getElementById('previewUser').textContent = user;
  document.getElementById('previewExpiry').textContent =
    expiry.split('-')[1] + '/' + expiry.split('-')[0].slice(2);

  // Show logo if uploaded
  if (logoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('previewLogo').src = e.target.result;
    };
    reader.readAsDataURL(logoInput.files[0]);
  } else {
    document.getElementById('previewLogo').src = '';
  }

  // Show preview container (so the Send Email button appears)
  document.getElementById('cardPreview').style.display = 'block';
}

// Example send card function
function sendCardEmail() {
  const number = document.getElementById('cardNumber').value.trim();
  const user = document.getElementById('cardUser').value.trim();
  alert(`Card ending ${number.slice(-4)} sent to ${user}'s email!`);
}

// Close preview functionality
document.addEventListener('DOMContentLoaded', () => {
  const closePreviewBtn = document.getElementById('closePreview');
  const cardPreview = document.getElementById('cardPreview');

  if (closePreviewBtn && cardPreview) {
    closePreviewBtn.addEventListener('click', () => {
      // Hide preview
      cardPreview.style.display = 'none';

      // Reset preview values
      document.getElementById('previewNumber').textContent =
        '•••• •••• •••• 1234';
      document.getElementById('previewUser').textContent = 'Jane Doe';
      document.getElementById('previewExpiry').textContent = '09/26';
      document.getElementById('previewLogo').src = '';
      const notes = document.getElementById('cardNotes').value.trim();
      document.getElementById('previewNotes').textContent = notes || '';

    });
  }
});

// preview atm  card end

// Bank transaction
 let bankTransactions = [];

  function addBankTransaction(e) {
    e.preventDefault();
    const tx = {
      date: new Date().toISOString().split("T")[0],
      userId: document.getElementById("bankUserId").value.trim(),
      bank: document.getElementById("bankName").value.trim(),
      amount: document.getElementById("bankAmount").value.trim(),
      ref: document.getElementById("bankRef").value.trim(),
      status: document.getElementById("bankStatus").value
    };
    bankTransactions.unshift(tx);
    renderBankTransactions();
    e.target.reset();
  }

  function renderBankTransactions(list = bankTransactions) {
    const tbody = document.getElementById("bankTransactionTable");
    tbody.innerHTML = "";
    list.forEach(tx => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${tx.date}</td>
        <td>${tx.userId}</td>
        <td>${tx.bank}</td>
        <td>₦${tx.amount}</td>
        <td>${tx.ref}</td>
        <td>${tx.status}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function filterBankTransactions() {
    const search = document.getElementById("bankSearch").value.toLowerCase();
    const status = document.getElementById("bankStatusFilter").value;
    const from = document.getElementById("bankFrom").value;
    const to = document.getElementById("bankTo").value;

    let filtered = bankTransactions.filter(tx => {
      let match = true;

      if (search && !(tx.userId.toLowerCase().includes(search) || tx.ref.toLowerCase().includes(search))) {
        match = false;
      }
      if (status !== "all" && tx.status !== status) {
        match = false;
      }
      if (from && tx.date < from) {
        match = false;
      }
      if (to && tx.date > to) {
        match = false;
      }

      return match;
    });

    renderBankTransactions(filtered);
  }
  // end bank transaction


  // Store deposit transactions
let depositTransactions = [];

// Add deposit transaction
function addDepositTransaction(e) {
  e.preventDefault();

  const userId = document.getElementById("depositUserId").value.trim();
  const method = document.getElementById("depositMethod").value.trim();
  const amount = document.getElementById("depositAmount").value.trim();
  const ref = document.getElementById("depositRef").value.trim();
  const status = document.getElementById("depositStatus").value;
  const date = new Date().toLocaleString();

  const newTransaction = { date, userId, method, amount, ref, status };
  depositTransactions.push(newTransaction);

  renderDepositTransactions();
  document.getElementById("depositTransactionForm").reset();
}

// Render deposit transactions
function renderDepositTransactions(transactions = depositTransactions) {
  const table = document.getElementById("depositTransactionTable");
  table.innerHTML = "";

  transactions.forEach(t => {
    const row = `<tr>
      <td>${t.date}</td>
      <td>${t.userId}</td>
      <td>${t.method}</td>
      <td>${t.amount}</td>
      <td>${t.ref}</td>
      <td>${t.status}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

// Filter deposit transactions
function filterDepositTransactions() {
  const search = document.getElementById("depositSearch").value.toLowerCase();
  const status = document.getElementById("depositStatusFilter").value;
  const from = document.getElementById("depositFrom").value;
  const to = document.getElementById("depositTo").value;

  let filtered = depositTransactions.filter(t => {
    return (
      (t.userId.toLowerCase().includes(search) || t.ref.toLowerCase().includes(search)) &&
      (status === "all" || t.status === status)
    );
  });

  if (from) {
    filtered = filtered.filter(t => new Date(t.date) >= new Date(from));
  }
  if (to) {
    filtered = filtered.filter(t => new Date(t.date) <= new Date(to));
  }

  renderDepositTransactions(filtered);
}
// end deposit Transaction


// Store sent emails
let sentEmails = [];

// Send email via backend
document.getElementById("sendEmailForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const to = document.getElementById("emailTo").value.trim();
  const subject = document.getElementById("emailSubject").value.trim();
  const body = document.getElementById("emailBody").value.trim();
  const date = new Date().toLocaleString();

  if (!to || !subject || !body) {
    alert("Please fill in all fields before sending.");
    return;
  }

  try {
    // Send request to backend
    const res = await fetch("https://api.pvbonline.online/api/admin/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, body })
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Email sent successfully to ${to}!`);

      // Store in frontend log
      sentEmails.push({ date, to, subject, body });
      renderEmails();

      // Reset form
      document.getElementById("sendEmailForm").reset();
    } else {
      alert(`Failed: ${data.message || "Could not send email"}`);
    }
  } catch (err) {
    alert("Error sending email. Please try again.");
    console.error(err);
  }
});

// Render emails in the table
function renderEmails() {
  const table = document.getElementById("emailTable");
  table.innerHTML = "";

  sentEmails.forEach(e => {
    const row = `<tr>
      <td>${e.date}</td>
      <td>${e.to}</td>
      <td>${e.subject}</td>
      <td>${e.body}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

// end send email


// Example: Load users into Manage Users table
// Example Users
function toggleAllUsers(source) {
  document.querySelectorAll(".userCheckbox").forEach(cb => cb.checked = source.checked);
}

function bulkFund() {
  alert("Bulk Fund triggered");
}

function bulkEmail() {
  alert("Bulk Email triggered");
}

function bulkDelete() {
  alert("Bulk Delete triggered");
}

function toggleUserStatus(btn) {
  const row = btn.closest("tr");
  const statusCell = row.querySelector(".status");
  
  if (statusCell.textContent === "Active") {
    statusCell.textContent = "Inactive";
    btn.textContent = "Activate";
  } else {
    statusCell.textContent = "Active";
    btn.textContent = "Deactivate";
  }
}

function bulkToggleStatus() {
  document.querySelectorAll(".userCheckbox:checked").forEach(cb => {
    const row = cb.closest("tr");
    const statusCell = row.querySelector(".status");
    const btn = row.querySelector("button");

    if (statusCell.textContent === "Active") {
      statusCell.textContent = "Inactive";
      btn.textContent = "Activate";
    } else {
      statusCell.textContent = "Active";
      btn.textContent = "Deactivate";
    }
  });
}

// manage user


// bilk transaction pinre set
function bulkPinReset() {
  const selected = document.querySelectorAll("#manageUsersTable input[type='checkbox']:checked");
  if (selected.length === 0) {
    alert("Please select at least one user to reset PIN.");
    return;
  }

  if (!confirm("Are you sure you want to reset PINs for selected users?")) return;

  selected.forEach(checkbox => {
    const userId = checkbox.getAttribute("data-id");
    // TODO: Replace with backend API call
    console.log(`Resetting PIN for user ID: ${userId}`);
  });

  alert("Selected users' PINs have been reset.");
}
// end of bulk pin reset

// end of manage user



// create user
function createUser(event) {
  event.preventDefault();

  const name = document.getElementById("newUserName").value.trim();
  const email = document.getElementById("newUserEmail").value.trim();
  const phone = document.getElementById("newUserPhone").value.trim();
  const password = document.getElementById("newUserPassword").value.trim();

  if (!name || !email || !phone || !password) {
    alert("Please fill in all required fields.");
    return;
  }

  // Insert new user into Manage Users table
  const table = document.getElementById("manageUsersTable");
  const row = table.insertRow();
  
  row.innerHTML = `
    <td><input type="checkbox" class="userCheckbox"></td>
    <td>${table.rows.length}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td class="status">Active</td>
    <td>
      <button onclick="toggleUserStatus(this)">Deactivate</button>
    </td>
  `;

  alert(`User "${name}" created successfully!`);

  // Reset form
  document.getElementById("createUserForm").reset();

  // Optional: switch back to Manage Users section
  showSection("manage-users");
}
// end create user

// update userprofile
function updateUserProfile(event) {
  event.preventDefault();

  const name = document.getElementById("updateName").value.trim();
  const email = document.getElementById("updateEmail").value.trim();
  const phone = document.getElementById("updatePhone").value.trim();
  const password = document.getElementById("updatePassword").value.trim();
  const pin = document.getElementById("updatePin").value.trim();
  const confirmPin = document.getElementById("confirmPin").value.trim();
  const address = document.getElementById("updateAddress").value.trim();
  const work = document.getElementById("updateWork").value.trim();
  const status = document.getElementById("updateStatus").value;
  const profilePic = document.getElementById("updateProfilePic").files[0];

  if (!name || !email || !phone) {
    alert("Name, Email, and Phone are required.");
    return;
  }

  if (pin && pin.length !== 4) {
    alert("PIN must be exactly 4 digits.");
    return;
  }

  if (pin && pin !== confirmPin) {
    alert("PIN and Confirm PIN do not match.");
    return;
  }

  // Preview example of update
  console.log({
    name,
    email,
    phone,
    password,
    pin,
    address,
    work,
    status,
    profilePic
  });

  alert(`User "${name}" profile updated successfully!`);

  // Reset the form
  document.getElementById("updateUserForm").reset();
}

// end of update userprofile



// notification icon

async function fetchUnreadNotifications() {
    try {
        const res = await fetch('https://api.pvbonline.online/api/loan/unread-count');
        const data = await res.json();
        const badge = document.getElementById('notificationBadge');

        if (data.count > 0) {
            badge.textContent = data.count;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    } catch (err) {
        console.error('Error fetching notifications:', err);
    }
}

// Initial fetch
fetchUnreadNotifications();

// Refresh every 30s
setInterval(fetchUnreadNotifications, 30000);

// Optional: redirect to loan applications list when clicked
document.querySelector('.mail-icon').addEventListener('click', () => {
    window.location.href = 'https://api.pvbonline.online/admin/loan-applications';
});

//  end notification icon
