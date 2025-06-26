document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

 
  window.showSignup = () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  };

  window.showLogin = () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  };

  
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

 
  const isValidName = (name) =>
    /^[A-Za-z\s]+$/.test(name);


  const isValidPassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!isValidName(fullName)) {
      alert("Full name should only contain letters and spaces.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (username.length < 4 || /\s/.test(username)) {
      alert("Username must be at least 4 characters and contain no spaces.");
      return;
    }

    if (!isValidPassword(password)) {
      alert("Password must be at least 6 characters, including a letter and a number.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(
      (u) => u.username === username || u.email === email
    );
    if (userExists) {
      alert("Username or Email already exists.");
      return;
    }

    users.push({ fullName, email, username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful. Please log in.");
    showLogin();
    signupForm.reset();
  });

 
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("loginUsername").value.trim();
    const passwordInput = document.getElementById("loginPassword").value;

    if (!usernameInput) {
      alert("Username or email is required.");
      return;
    }

    if (passwordInput.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) =>
        (u.username === usernameInput || u.email === usernameInput) &&
        u.password === passwordInput
    );

    if (validUser) {
      localStorage.setItem("loggedInUser", validUser.username);
      window.location.href = "stream-selector.html";
    } else {
      alert("Invalid login credentials.");
    }
  });
});
