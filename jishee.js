// JSON-г гаднаас уншина
fetch("jishee.json")
  .then(r => r.json())
  .then(data => init(data))
  .catch(err => console.error("JSON алдаа:", err));

function init(data) {
  // Header actions
  const actions = document.querySelectorAll(".pill-btn");
  const labels = [data.header.phoneLabel, data.header.orderLabel, data.header.reserveLabel];
  actions.forEach((btn, i) => { btn.textContent = labels[i]; });

  // Header actions navigation
  document.querySelector('[data-action="call"]').addEventListener("click", () => {
    window.location.href = `tel:${data.header.phoneNumber}`;
  });
  document.querySelector('[data-action="order"]').addEventListener("click", () => {
    window.location.href = data.links.order;
  });
  document.querySelector('[data-action="reserve"]').addEventListener("click", () => {
    window.location.href = data.links.reserve;
  });

  // Hero
  document.getElementById("hero-title").textContent = data.hero.title;
  document.getElementById("hero-tagline").textContent = data.hero.tagline;
  const viewMenuBtn = document.getElementById("view-menu");
  viewMenuBtn.textContent = data.hero.cta;
  viewMenuBtn.addEventListener("click", () => {
    document.querySelector(".menus").scrollIntoView({ behavior: "smooth" });
  });

  // Mission
  document.getElementById("mission-title").textContent = data.mission.title;
  document.getElementById("mission-text-1").textContent = data.mission.text1;
  document.getElementById("mission-text-2").textContent = data.mission.text2;

  // Gallery
  document.getElementById("gallery-title").textContent = data.gallery.title;
  const g = document.getElementById("gallery-grid");
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

  // Menus
  document.getElementById("menus-title").textContent = data.menus.title;
  const mg = document.getElementById("menus-grid");
  data.menus.items.forEach(item => {
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

  // Footer
  const fl = document.getElementById("footer-links");
  data.footer.links.forEach(txt => {
    const span = document.createElement("span");
    span.textContent = txt;
    fl.appendChild(span);
  });
  document.getElementById("footer-address").textContent = data.footer.address;
  document.getElementById("footer-hours").textContent = data.footer.hours;
  document.getElementById("footer-copy").textContent = data.footer.copy;
  const devBtn = document.querySelector('[data-action="dev"]');
  devBtn.textContent = data.footer.devLabel;
  devBtn.addEventListener("click", () => { window.location.href = data.footer.devUrl; });
}
document.querySelector('[data-action="facebook"]').addEventListener("click", () => {
  window.open("https://www.facebook.com/AdachiRestaurant/", "_blank");
});
document.querySelector('[data-action="instagram"]').addEventListener("click", () => {
  window.open("https://www.instagram.com/adachirestaurant/", "_blank");
});