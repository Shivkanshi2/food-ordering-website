document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
    });
  }

  // Elements
  const bookingForm = document.getElementById('booking-form');
  const bookingStatus = document.getElementById('booking-status');
  const orderSummaryContainer = document.getElementById('order-summary-container');
  const orderSummary = document.getElementById('order-summary');
  const categoriesBooking = document.getElementById('categories-container-booking');
  const pickerError = document.getElementById('picker-error');

  // Your WhatsApp number (country code + number, no + or spaces) -> 91 + 6204170039
  const OWNER_WHATSAPP = '919939701019';

  // Menu Data
  const menuData = {
    "Classic Hot & Cold Drinks": [
      {name: "Chocolate super shake", price: 38},
      {name: "Strawberries Super Shake", price: 38},
      {name: "Orange Booster", price: 45},
      {name: "Purple Power House", price: 47},
      {name: "Signature cold coffee", price: 25},
      {name: "Fresh Lime Soda", price: 25},
      {name: "Masala cold-drink", price: 25},
      {name: "Hot Chocolate", price: 35},
      {name: "Tea / Coffee", price: 10}
    ],
    "Starters": [
      {name: "Crispy chicken fried", price: 62},
      {name: "Chicken Lollipop", price: 55},
      {name: "Chicken Wings", price: 55},
      {name: "Chicken Cheese-Balls", price: 47},
      {name: "Chicken Fingers", price: 45},
      {name: "Vegetable Spring-Roll", price: 30},
      {name: "Potato Cheese Shotz", price: 35}
    ],
    "Burger & Fries": [
      {name: "Veg Cheese Burger", price: 40},
      {name: "Paneer Cheese Burger", price: 45},
      {name: "Chicken Cheese Burger", price: 45},
      {name: "Peri-peri French Fries", price: 25}
    ],
    "Sandwiches": [
      {name: "Tomatoes & Cheese grill", price: 35},
      {name: "Chicken tikka Sandwich", price: 40}
    ],
    "Pasta (Veg - Non Veg)": [
      {name: "White Creamy sauce", price: 65},
      {name: "Red Basil Sauce Pasta", price: 55}
    ],
    "Chinese Cuisine": [
      {name: "Chicken Chilli (Dry/Gravy)", price: 60},
      {name: "Chicken Chowmin", price: 50},
      {name: "Mix Veg Chowmin", price: 40},
      {name: "Egg Chowmin", price: 45},
      {name: "Baby-Corn Chilli", price: 50},
      {name: "Paneer Chilli (Dry/Gravy)", price: 65}
    ],
    "Kebabs": [
      {name: "Malai Paneer Tikka", price: 80},
      {name: "Afghani Chicken Tikka", price: 90},
      {name: "Chicken Malai Tikka", price: 90},
      {name: "Chicken Hariyali Seekh", price: 90},
      {name: "Chicken Seekh Kebab", price: 90}
    ],
    "Fried Rice": [
      {name: "Vegetable Fried Rice", price: 45},
      {name: "Chicken Fried Rice", price: 50},
      {name: "Paneer Fried Rice", price: 50},
      {name: "Egg Fried Rice", price: 45}
    ],
    "Soups": [
      {name: "Hot & Sour Veg Soup", price: 30},
      {name: "Hot & Sour Chicken Soup", price: 30},
      {name: "Sweet Corn Soup", price: 30}
    ],
    "Fast-food Rolls": [
      {name: "Paneer Tikka Roll", price: 50},
      {name: "Veg Kathi Roll", price: 30},
      {name: "Chicken Roll", price: 50},
      {name: "Egg Roll", price: 40}
    ],
    "Momos": [
      {name: "Veg Steam Momo", price: 70},
      {name: "Chicken Steam Momo", price: 80},
      {name: "Paneer Steam Momo", price: 80}
    ],
    "Pizzas": [
      {name: "Margarita", price: 55},
      {name: "Veggie Delight", price: 75},
      {name: "Farmhouse", price: 80},
      {name: "Chicken Tikka Pizza", price: 99},
      {name: "BBQ Chicken", price: 110},
      {name: "Chicken Supreme", price: 145}
    ],
    "Breakfast": [
      {name: "Idli", price: 25},
      {name: "Chole Bhature", price: 60},
      {name: "Masala Dhosa", price: 50}
    ],
    "Currys (1 Portion)": [
      {name: "Mix Veg Kadhai", price: 40},
      {name: "Malai Kofta", price: 55},
      {name: "Paneer Tikka Masala", price: 80},
      {name: "Paneer Do-Pyaza", price: 70},
      {name: "Dal Tadka/Fry", price: 35},
      {name: "Dal Makhani", price: 45},
      {name: "Butter Chicken", price: 100},
      {name: "Chicken Tikka Masala", price: 100},
      {name: "Chicken Curry", price: 90},
      {name: "Egg Curry", price: 60}
    ],
    "Indian Bread": [
      {name: "Chapatti", price: 10},
      {name: "Butter Naan", price: 15},
      {name: "Garlic Naan", price: 25},
      {name: "Stuffed Kulcha", price: 30}
    ],
    "Breads (5/- extra for butter)": [
      {name: "Tawa roti", price: 10},
      {name: "Tandoori Roti", price: 10},
      {name: "Butter Garlic Naan", price: 35},
      {name: "Butter Naan", price: 35}
    ],
    "Rice": [
      {name: "Basmati Steam Rice", price: 45},
      {name: "Plain Steam Rice", price: 25},
      {name: "Jeera Steam Rice", price: 30}
    ],
    "Biryani Rice": [
      {name: "Veg Biryani", price: 50},
      {name: "Chicken Biryani", price: 70}
    ],
    "Side Items": [
      {name: "Special Boondi Raita", price: 20},
      {name: "Papad", price: 10},
      {name: "Green Salad", price: 25},
      {name: "Kesari Kheer", price: 35},
      {name: "Gulab Jamun", price: 20}
    ]
  };

  // Cart
  const cart = {};
  function initializeCart() {
    for (const category in menuData) {
      menuData[category].forEach(item => {
        if (!cart[item.name]) {
          cart[item.name] = { price: item.price, qty: 0 };
        }
      });
    }
  }

  function buildCategories(container) {
    container.innerHTML = '';
    Object.entries(menuData).forEach(([category, items]) => {
      const catDiv = document.createElement('div');
      catDiv.className = 'category';

      const heading = document.createElement('div');
      heading.className = 'category-heading';
      heading.innerHTML = `<span>${category}</span><span class="toggle-icon" aria-hidden="true">+</span>`;

      const itemsDiv = document.createElement('div');
      itemsDiv.className = 'category-items';

      items.forEach(food => {
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food-item';
        foodDiv.setAttribute('data-name', food.name);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'food-name';
        nameSpan.textContent = food.name;

        const priceSpan = document.createElement('span');
        priceSpan.className = 'food-price';
        priceSpan.textContent = '₹' + food.price;

        const qtyControls = document.createElement('div');
        qtyControls.className = 'qty-controls';

        const minusBtn = document.createElement('button');
        minusBtn.className = 'qty-btn';
        minusBtn.setAttribute('type', 'button');
        minusBtn.setAttribute('data-action', 'minus');
        minusBtn.setAttribute('data-name', food.name);
        minusBtn.textContent = '−';

        const qtyDisplay = document.createElement('span');
        qtyDisplay.className = 'qty-display';
        qtyDisplay.setAttribute('data-name', food.name);
        qtyDisplay.textContent = 0;

        const plusBtn = document.createElement('button');
        plusBtn.className = 'qty-btn';
        plusBtn.setAttribute('type', 'button');
        plusBtn.setAttribute('data-action', 'plus');
        plusBtn.setAttribute('data-name', food.name);
        plusBtn.textContent = '+';

        qtyControls.appendChild(minusBtn);
        qtyControls.appendChild(qtyDisplay);
        qtyControls.appendChild(plusBtn);

        foodDiv.appendChild(nameSpan);
        foodDiv.appendChild(priceSpan);
        foodDiv.appendChild(qtyControls);

        itemsDiv.appendChild(foodDiv);
      });

      heading.addEventListener('click', () => {
        const icon = heading.querySelector('.toggle-icon');
        const isOpen = itemsDiv.style.display === 'block';
        itemsDiv.style.display = isOpen ? 'none' : 'block';
        icon.textContent = isOpen ? '+' : '−';
      });

      catDiv.appendChild(heading);
      catDiv.appendChild(itemsDiv);
      container.appendChild(catDiv);
    });
  }

  function updateQtyDisplay(name) {
    const selector = `.qty-display[data-name="${CSS.escape(name)}"]`;
    categoriesBooking.querySelectorAll(selector).forEach(d => d.textContent = cart[name].qty);
  }

  function generateOrderSummary() {
    let summary = '';
    let total = 0;
    for (const [item, details] of Object.entries(cart)) {
      if (details.qty > 0) {
        const itemTotal = details.price * details.qty;
        summary += `${item} (${details.qty} x ₹${details.price}) = ₹${itemTotal}\n`;
        total += itemTotal;
      }
    }
    if (!summary) {
      orderSummary.textContent = '';
      orderSummaryContainer.style.display = 'none';
      return 0;
    }
    summary += `\nTotal: ₹${total}`;
    orderSummary.textContent = summary;
    orderSummaryContainer.style.display = 'block';
    return total;
  }

  function hasAtLeastOneItem() {
    return Object.values(cart).some(v => v.qty > 0);
  }

  // Status helpers
  function setStatus(type, text, showSpinner=false) {
    if (!bookingStatus) return;
    bookingStatus.className = `booking-status ${type}`;
    bookingStatus.textContent = '';
    if (showSpinner) {
      const sp = document.createElement('span');
      sp.className = 'spinner';
      bookingStatus.appendChild(sp);
    }
    const msg = document.createElement('span');
    msg.textContent = text;
    bookingStatus.appendChild(msg);
  }

  // +/- events (delegation)
  categoriesBooking.addEventListener('click', (e) => {
    const btn = e.target.closest('button.qty-btn');
    if (!btn) return;
    const action = btn.getAttribute('data-action');
    const name = btn.getAttribute('data-name');
    if (!name || !cart[name]) return;

    if (action === 'plus') {
      cart[name].qty++;
    } else if (action === 'minus' && cart[name].qty > 0) {
      cart[name].qty--;
    }
    updateQtyDisplay(name);
    generateOrderSummary();

    if (pickerError && hasAtLeastOneItem()) pickerError.style.display = 'none';
  });

  // Submit -> WhatsApp + status UI
  function handleBookingSubmit(event) {
    event.preventDefault();
    if (!hasAtLeastOneItem()) {
      if (pickerError) pickerError.style.display = 'block';
      categoriesBooking.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const total = generateOrderSummary();
    const params = {
      name: document.getElementById("namee").value.trim(),
      phone: document.getElementById("phonee").value.trim(),
      location: document.getElementById("locatione").value.trim(),
      date: document.getElementById("datee").value.trim(),
      time: document.getElementById("timee").value.trim(),
      request: document.getElementById("requestt").value.trim()
    };

    // Build a professionally formatted WhatsApp message (rich text)
    const orderItems = Object.entries(cart)
      .filter(([, d]) => d.qty > 0)
      .map(([name, d], i) => {
        const lineTotal = d.qty * d.price;
        return `${i + 1}. ${name}  —  ${d.qty} × ₹${d.price} = ₹${lineTotal}`;
      })
      .join('\n');

    const orderId = 'CC' + Date.now().toString().slice(-6);
    const totalDisplay = '₹' + total;

    const waMessage =
`*🍽️ The Coco Chilli — New Order*
━━━━━━━━━━━━━━━━━━━━
*👤 Name:* ${params.name}
*📞 Phone:* ${params.phone}
*📍 Location:* ${params.location}
*🗓️ Date/Time:* ${params.date || '-'} ${params.time || '-'}

*🧾 Items:*
${orderItems || '-' }
━━━━━━━━━━━━━━━━━━━━
*💰 Total:* ${totalDisplay}
*📝 Notes:* ${params.request || '-'}

*🆔 Order ID:* ${orderId}
Thank you for ordering with The Coco Chilli! 🙏`;

    const waURL = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;

    // Show "sending" UI, then open WhatsApp and show success + reset
    setStatus('status--sending', 'Opening WhatsApp...', true);

    const opened = window.open(waURL, '_blank');
    if (!opened) {
      // Popup blocked fallback
      window.location.href = waURL;
    }

    setTimeout(() => {
      setStatus('status--success', 'WhatsApp opened. Please send your order there.');
      if (bookingForm) bookingForm.reset();
      // Reset cart
      for (const item in cart) cart[item].qty = 0;
      categoriesBooking.querySelectorAll('.qty-display').forEach(d => d.textContent = '0');
      generateOrderSummary();
    }, 600);
  }

  if (bookingForm) bookingForm.addEventListener('submit', handleBookingSubmit);

  // Build menu
  initializeCart();
  buildCategories(categoriesBooking);

  // Close mobile menu on nav link
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    if (window.innerWidth <= 620 && mainNav && mainNav.classList.contains('active')) {
      setTimeout(() => mainNav.classList.remove('active'), 200);
    }
  });
});