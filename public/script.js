<<<<<<< HEAD
const form = document.getElementById('authForm');
const usernameInput = document.getElementById('username');
const title = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const toggleBtn = document.getElementById('toggleBtn');
const message = document.getElementById('message');

let isLogin = true;

// Toggle between Login and Signup modes
toggleBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    title.innerText = isLogin ? 'Login' : 'Sign Up';
    submitBtn.innerText = isLogin ? 'Login' : 'Sign Up';
    toggleBtn.innerText = isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login";
    usernameInput.style.display = isLogin ? 'none' : 'block';
    if (!isLogin) usernameInput.setAttribute('required', 'true');
    else usernameInput.removeAttribute('required');
    message.innerText = '';
});

// Handle Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = usernameInput.value;

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin ? { email, password } : { username, email, password };

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (res.ok) {
            message.className = 'success';
            message.innerText = data.message;
            if (isLogin) {
                // Save token and redirect
                localStorage.setItem('token', data.token);
                setTimeout(() => window.location.href = '/dashboard.html', 1000);
            } else {
                // If signup successful, switch to login view
                setTimeout(() => toggleBtn.click(), 1500);
            }
        } else {
            message.className = 'error';
            message.innerText = data.message || data.error;
        }
    } catch (err) {
        message.className = 'error';
        message.innerText = 'Server error. Please try again.';
    }
=======
const form = document.getElementById('authForm');
const usernameInput = document.getElementById('username');
const title = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const toggleBtn = document.getElementById('toggleBtn');
const message = document.getElementById('message');

let isLogin = true;

// Toggle between Login and Signup modes
toggleBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    title.innerText = isLogin ? 'Login' : 'Sign Up';
    submitBtn.innerText = isLogin ? 'Login' : 'Sign Up';
    toggleBtn.innerText = isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login";
    usernameInput.style.display = isLogin ? 'none' : 'block';
    if (!isLogin) usernameInput.setAttribute('required', 'true');
    else usernameInput.removeAttribute('required');
    message.innerText = '';
});

// Handle Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = usernameInput.value;

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin ? { email, password } : { username, email, password };

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await res.json();

        if (res.ok) {
            message.className = 'success';
            message.innerText = data.message;
            if (isLogin) {
                // Save token and redirect
                localStorage.setItem('token', data.token);
                setTimeout(() => window.location.href = '/dashboard.html', 1000);
            } else {
                // If signup successful, switch to login view
                setTimeout(() => toggleBtn.click(), 1500);
            }
        } else {
            message.className = 'error';
            message.innerText = data.message || data.error;
        }
    } catch (err) {
        message.className = 'error';
        message.innerText = 'Server error. Please try again.';
    }
>>>>>>> 04e92bd834593c8fa4360410d354b0903e4d7c24
});