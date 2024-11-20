document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".sidebar");
    const myModal = new bootstrap.Modal(document.getElementById("popupMenu"));
    const breakpointLg = 992;
  
    function toggle() {
      const w = window.innerWidth; // Use vanilla JS for window width
      if (w < breakpointLg) {
        myModal.toggle();
      } else {
        sidebar.classList.toggle("vlabs-hidden"); // Simplified toggle logic
      }
    }
  
    function simulationHeaderToggle() {
      const dropdown = document.querySelector(".simulation-header .dropdown .backdrop");
      if (dropdown) { // Check if the dropdown element exists
        dropdown.classList.toggle("vlabs-hidden"); // Toggle the visibility class
      }
    }
  
    // Ensure the simulation header logic runs only if .simulation-header exists
    if (document.querySelector(".simulation-header")) {
      window.addEventListener("click", ({ target }) => {
        if (!(target.closest(".navbar-toggler") || target.closest(".nav-menu"))) {
          const dropdown = document.querySelector(".simulation-header .dropdown .backdrop");
          if (dropdown) {
            dropdown.classList.add("vlabs-hidden"); // Hide the dropdown if not clicking on toggler or menu
          }
        }
      });
    }
  
    // Function to highlight the current menu item
    const setActiveItem = (id) => {
      const menu = document.getElementById(id);
      let marked = false;
      Array.from(menu.children)
        .filter((mi) => Array.from(mi.children)[0].href === window.location.href)
        .forEach((mi) => {
          Array.from(mi.children)[0].classList.add("current-item");
          marked = true;
        });
      if (!marked) {
        Array.from(Array.from(menu.children)[0].children)[0].classList.add("current-item");
      }
    };
  
    // Set the active item in both the sidebar and popup menu
    setActiveItem("popupMenuItems");
    setActiveItem("menu");
  
    // Attach the toggle function to the navbar-toggler button
    document.querySelector('.navbar-toggler').addEventListener('click', toggle);
  });
  