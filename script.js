// Function to calculate age from date of birth
function calculateAge(dob) {
    if (!dob) return "N/A";  // Handle missing date
    let birthDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--; // Reduce age if birth month/date hasn't happened yet this year
    }
    
    return age < 0 ? "Invalid" : age; // Prevent negative age
}

// Function to validate and submit the form
function validateAndSubmit() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;

    // Validation
    if (!firstname || !lastname || !email || !dob || !age || !phone || !address || !gender) {
        alert('All fields are required!');
        return;
    }

    if (!/^[A-Za-z]{4,}$/.test(firstname)) {
        alert('First Name must contain at least 4 alphabets.');
        return;
    }

    if (!/^[A-Za-z]{1,}$/.test(lastname)) {
        alert('Last Name must contain at least 1 alphabet.');
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert('Phone Number must contain exactly 10 digits.');
        return;
    }

    if (age < 10 || age > 99) {
        alert('Age must be a 2-digit number.');
        return;
    }

    // Save data to localStorage
    const userData = {
        firstname,
        lastname,
        email,
        dob,
        age: calculateAge(dob), // Calculate age from DOB
        phone, // Store phone number in normal form
        address,
        gender
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to index1.html
    window.location.href = 'index1.html';
}

// Function to load users into the table
function loadUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let tableBody = document.getElementById('userTableBody');

    if (users.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center;">No users found.</td></tr>`;
        return;
    }

    tableBody.innerHTML = users.map(user => 
        `<tr>
            <td>${user.firstname || "N/A"}</td>
            <td>${user.lastname || "N/A"}</td>
            <td>${user.email || "N/A"}</td>
            <td>${user.phone || "N/A"}</td> <!-- Phone number in normal form -->
            <td>${user.address || "N/A"}</td>
            <td>${user.dob || "N/A"}</td>
            <td>${user.age || "N/A"}</td> <!-- Age calculated from DOB -->
            <td>${user.gender || "N/A"}</td>
        </tr>`).join('');
}

// Function to clear all user data
function clearUsers() {
    if (confirm("Are you sure you want to delete all users?")) {
        localStorage.removeItem('users');
        loadUsers(); // Refresh the table
    }
}

// Load users when the page loads
window.onload = loadUsers;