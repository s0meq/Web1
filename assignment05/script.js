document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const links = document.querySelectorAll("nav a");

  function loadPage(page) {
    fetch(page)
      .then(res => res.text())
      .then(data => {
        main.innerHTML = data;
        // aktiivinen linkki
        links.forEach(a => a.classList.remove("active"));
        document.querySelector(`nav a[data-page="${page}"]`).classList.add("active");
      });
  }

  // Linkkien kuuntelu
  links.forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      loadPage(a.dataset.page);
    });
  });

  // Ladataan oletuksena etusivu
  loadPage("home.html");
});
