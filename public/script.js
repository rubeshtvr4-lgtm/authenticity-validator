// --- LOGIN LOGIC ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Stop the page from reloading
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = loginForm.querySelector('button');

        try {
            btn.innerText = "Checking..."; // distinct feedback
            
            // Send data to server
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // Success! Save the key and go to dashboard
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html'; 
            } else {
                alert(data.message || "Login failed");
                btn.innerText = "Login";
            }
        } catch (err) {
            console.error(err);
            alert("Server error. Please try again.");
            btn.innerText = "Login";
        }
    });
}

// --- SIGNUP LOGIC ---
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Account created! Please log in.");
                window.location.href = 'index.html';
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Error signing up");
        }
    });
}