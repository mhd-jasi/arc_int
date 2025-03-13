// Preloader Functionality
window.addEventListener("load", function() {
    setTimeout(() => {
      document.getElementById("preloader").style.opacity = "0";
      setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
      }, 500); // Smooth fade-out effect
    }, 2000); // Keep loader visible for 2 seconds
  });
  