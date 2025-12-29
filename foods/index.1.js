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
  const orderBtn = document.querySelector('[data-action="order"]');
  const orderBox = document.getElementById("order-section");
  const closeBtn = document.getElementById("closeOrder");

  orderBtn.addEventListener("click", () => {
  orderBox.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
  orderBox.classList.remove("show");
  });

  document.addEventListener("DOMContentLoaded", () => {
  const orderSection1 = document.getElementById("order-section1");
  const closeBtn = orderSection1.querySelector(".close-x");
  const dishForm = orderSection1.querySelector(".dish-form");
  const cartItems = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");
  let totalPrice = 0;

  // Popup хаах
  closeBtn.addEventListener("click", () => {
    orderSection1.style.display = "none";
  });

  // Form submit
    dishForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(dishForm);
    const size = formData.get("size");
    const additions = formData.getAll("additions");
    const other = formData.get("other");

    let price = size === "Double" ? 12 : 9;
    if (additions.includes("Extra Cheese")) price += 1.5;
    if (additions.includes("Bacon")) price += 2;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Beef Burger</strong> - ${size} - $${price.toFixed(2)}<br>
      Additions: ${additions.join(", ") , "none"}<br>
      Notes: ${other  ,"none"}
    `;
    cartItems.appendChild(li);

    totalPrice += price;
    totalPriceEl.textContent = `Total: $${totalPrice.toFixed(2)}`;

    orderSection1.style.display = "none";
    dishForm.reset();
  });
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
document.querySelector('[data-action="facebook"]').


// OPEN / CLOSE
document.getElementById("open-cart").onclick = () => toggleCart(true)
document.getElementById("close-cart").onclick = () => toggleCart(false)
overlay.onclick = () => toggleCart(false)

function toggleCart(open) {
  drawer.classList.toggle("active", open)
  overlay.classList.toggle("active", open)
}

document.querySelectorAll(".add").forEach(btn => {
  btn.onclick = () => {
    const p = btn.parentElement
    const id = p.dataset.id
    const name = p.dataset.name
    const price = +p.dataset.price

    const item = cart.find(i => i.id === id)
    item ? item.qty++ : cart.push({ id, name, price, qty: 1 })
    updateCart()
  }
})

function updateCart() {
  cartItems.innerHTML = ""
  let total = 0

  cart.forEach(item => {
    total += item.price * item.qty

    const div = document.createElement("div")
    div.className = "cart-item"
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <div class="qty">
          <button onclick="changeQty('${item.id}',-1)">➖</button>
          ${item.qty}
          <button onclick="changeQty('${item.id}',1)">➕</button>
        </div>
      </div>
      <div>
        $${item.price * item.qty}
        <button onclick="removeItem('${item.id}')">❌</button>
      </div>
    `
    cartItems.appendChild(div)
  })

  cartTotal.textContent = total
  cartCount.textContent = cart.reduce((s,i)=>s+i.qty,0)
  localStorage.setItem("cart", JSON.stringify(cart))
}

window.changeQty = (id, d) => {
  const item = cart.find(i => i.id === id)
  item.qty += d
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id)
  updateCart()
}

window.removeItem = id => {
  cart = cart.filter(i => i.id !== id)
  updateCart()
}

// CHECKOUT (DEMO)
document.querySelector(".stripe").onclick = () =>
  window.location.href = "https://stripe.com/payments/checkout"

document.querySelector(".paypal").onclick = () =>
  window.location.href = "https://www.paypal.com/checkout"

updateCart()


const stripe = Stripe("pk_test_xxxxx")

async function checkout(cart) {
  const res = await fetch("http://localhost:4242/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cart })
  })

  const { clientSecret } = await res.json()

  const elements = stripe.elements({ clientSecret })
  const paymentElement = elements.create("payment")
  paymentElement.mount("#payment-element")

  document.getElementById("payment-form").onsubmit = async e => {
    e.preventDefault()

    const { error, paymentIntent } =
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost/success.html"
        },
        redirect: "if_required"
      })

    if (!error) {
      await fetch("http://localhost:4242/save-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: paymentIntent.amount / 100,
          paymentIntentId: paymentIntent.id
        })
      })

      alert("Payment successful!")
    }
  }
}
checkout(cart)