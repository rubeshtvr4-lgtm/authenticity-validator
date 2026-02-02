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
                // Success! Save token AND username
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.user.username); // <--- NEW LINE
                window.location.href = 'home.html'; 
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
// --- VERIFY LOGIC ---
const verifyForm = document.getElementById('verifyForm');
if (verifyForm) {
    verifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const docId = document.getElementById('docIdInput').value.trim();
        const resultDiv = document.getElementById('verifyResult');
        const statusText = document.getElementById('statusText');
        const fileName = document.getElementById('fileName');
        const uploadDate = document.getElementById('uploadDate');

        if (!docId) return alert("Please enter a Document ID");

        try {
            // Show loading state
            resultDiv.style.display = "block";
            statusText.innerText = "Checking database...";
            statusText.style.color = "yellow";
            fileName.innerText = "---";
            uploadDate.innerText = "---";

            // Send request to server
            // We assume the route is /api/verify/:id
            const res = await fetch(`/api/verify/${docId}`);
            const data = await res.json();

            if (res.ok) {
                // Document Found!
                statusText.innerText = "✅ Authentic & Verified";
                statusText.style.color = "#00ff00"; // Green
                fileName.innerText = data.filename || "Unknown File";
                uploadDate.innerText = new Date(data.uploadDate).toLocaleString();
            } else {
                // Document Not Found or Fake
                statusText.innerText = "❌ Invalid / Not Found";
                statusText.style.color = "red";
                fileName.innerText = "N/A";
                uploadDate.innerText = "N/A";
            }
        } catch (err) {
            console.error(err);
            statusText.innerText = "❌ Server Error";
            statusText.style.color = "red";
        }
    });
}