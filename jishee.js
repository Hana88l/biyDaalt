// JSON-г гаднаас уншина
fetch("jishee.json")
  .then((r) => r.json())
  .then((data) => init(data))
  .catch((err) => console.error("JSON алдаа:", err));

function init(data) {
  // Header actions
  const actions = document.querySelectorAll(".pill-btn");
  const labels = [
    data.header.phoneLabel,
    data.header.orderLabel,
    data.header.reserveLabel,
  ];
  actions.forEach((btn, i) => {
    btn.textContent = labels[i];
  });

  // Header actions navigation
  const callBtn = document.querySelector('[data-action="call"]');
  if (callBtn)
    callBtn.addEventListener("click", () => {
      window.location.href = `tel:${data.header.phoneNumber}`;
    });
  const orderBtn = document.querySelector('[data-action="order"]');
  if (orderBtn)
    orderBtn.addEventListener("click", () => {
      window.location.href = data.links.order;
    });
  const reserveBtn = document.querySelector('[data-action="reserve"]');
  if (reserveBtn)
    reserveBtn.addEventListener("click", () => {
      window.location.href = data.links.reserve;
    });

  // Hero
  const heroTitle = document.getElementById("hero-title");
  if (heroTitle) heroTitle.textContent = data.hero.title;
  const heroTagline = document.getElementById("hero-tagline");
  if (heroTagline) heroTagline.textContent = data.hero.tagline;
  const viewMenuBtn = document.getElementById("view-menu");
  if (viewMenuBtn) {
    viewMenuBtn.textContent = data.hero.cta;
    viewMenuBtn.addEventListener("click", () => {
      document.querySelector(".menus").scrollIntoView({ behavior: "smooth" });
    });
  }

  // Mission
  const missionTitle = document.getElementById("mission-title");
  if (missionTitle) missionTitle.textContent = data.mission.title;
  const missionText1 = document.getElementById("mission-text-1");
  if (missionText1) missionText1.textContent = data.mission.text1;
  const missionText2 = document.getElementById("mission-text-2");
  if (missionText2) missionText2.textContent = data.mission.text2;

  // Gallery
  const galleryTitle = document.getElementById("gallery-title");
  if (galleryTitle) galleryTitle.textContent = data.gallery.title;
  const g = document.getElementById("gallery-grid");
  if (g && data.gallery?.images) {
    data.gallery.images.forEach((src, index) => {
      const items = document.createElement("div");
      const img = document.createElement("img");
      items.appendChild(img);
      items.className = "gallery-item";
      img.src = src;
      img.alt = "Gallery image";
      img.loading = "lazy";
      img.classList.add("rotate");
      if (index === 0) img.classList.add("img-top-left");
      if (index === 1) img.classList.add("img-center");
      if (index === 2) img.classList.add("img-bottom-left");
      if (index === 3) img.classList.add("img-bottom-center");
      if (index === 4) img.classList.add("img-top-right");
      g.appendChild(items);
    });
  }

  // Menus
  const menusTitle = document.getElementById("menus-title");
  if (menusTitle) menusTitle.textContent = data.menus.title;
  const mg = document.getElementById("menus-grid");
  if (mg && data.menus?.items) {
    data.menus.items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.label;
      img.loading = "lazy";
      const meta = document.createElement("div");
      meta.className = "card-meta";
      const label = document.createElement("div");
      label.className = "label";
      label.textContent = item.label;
      const go = document.createElement("button");
      go.className = "go-btn";
      go.textContent = "Open";
      go.addEventListener("click", () => {
        window.location.href = item.href;
      });
      meta.appendChild(label);
      meta.appendChild(go);
      card.appendChild(img);
      card.appendChild(meta);
      mg.appendChild(card);
    });
  }
  document.querySelectorAll("#menu-footer-menu li a").forEach((link) => {
    if (link.href === window.location.origin + window.location.pathname) {
      link.classList.add("active");
    }
  });

  const mobileFooter = document.getElementById("footer-mobile-bottom");
  function toggleFooter() {
    mobileFooter.classList.toggle("open");
  }
}

const brand = document.getElementById("brandToggle");
const menu = document.getElementById("megaMenu");

brand.addEventListener("click", () => {
  menu.classList.toggle("active");
  const items = menu.querySelectorAll("li");
  items.forEach((item) => {
    item.style.animation = "none";
    item.offsetHeight;
    item.style.animation = "";
  });
});

const authBtn = document.getElementById("authBtn");

// 👉 login хийсэн эсэхийг шалгана
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (isLoggedIn) {
  authBtn.textContent = "SIGN OUT";
  authBtn.href = "#";
} else {
  authBtn.textContent = "SIGN IN";
  authBtn.href = "./login/register.html";
}

// 👉 SIGN OUT дарах үед
authBtn.addEventListener("click", function (e) {
  if (isLoggedIn) {
    e.preventDefault();

    // logout
    localStorage.removeItem("isLoggedIn");

    // refresh эсвэл redirect
    window.location.href = "./index.html";
  }
});
