 function toggleMenu() {
      const nav = document.getElementById("nav-links");
      nav.classList.toggle("active");
    }

   
  function logout() {
    localStorage.removeItem("isLoggedIn"); 
    window.location.href = "index.html";   
  }

