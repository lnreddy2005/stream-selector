window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);

    if (!hash) {
      // No hash found — send back to main page
      window.location.href = "index.html";
      return;
    }

    const section = document.getElementById(hash);

    if (section) {
      section.classList.add('active');
    } else {

      document.body.innerHTML = `
        <h1 style="text-align:center;">❌ Invalid Course Selected</h1>
        <p style="text-align:center;">
          <a href="index.html" style="color:white;">← Back to Stream Selector</a>
        </p>`;
    }
  });
