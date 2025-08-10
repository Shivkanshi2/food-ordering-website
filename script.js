// NAV TOGGLE
// Wrap code in DOMContentLoaded and add null checks
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('main-nav');
  
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      console.log('Menu toggled!'); // Debug log
    });
  }
});


// SMOOTH SCROLL for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - 78;
    window.scrollTo({ top, behavior: 'smooth' });
    if (window.innerWidth <= 620 && mainNav) mainNav.style.display = '';
  });
});

// BOOKING FORM
const SERVICE_ID = 'service_njc4r8n';
const TEMPLATE_ID = 'template_eq4p1uo';
const USER_ID = 'mkPJURxinqutBfyPj';

const bookingForm = document.getElementById('booking-form');
const bookingStatus = document.getElementById('booking-status');
const orderSummaryContainer = document.getElementById('order-summary-container');
const orderSummary = document.getElementById('order-summary');

// Initialize cart object
const cart = {};

// Function to generate order summary from cart
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
  
  if (summary === '') {
    orderSummaryContainer.style.display = 'none';
    return '';
  }
  
  summary += `\nTotal: ₹${total}`;
  orderSummary.textContent = summary;
  orderSummaryContainer.style.display = 'block';
  return summary;
}

// Function to generate HTML formatted order summary for email
function generateOrderSummaryText() {
  let summary = '';
  let total = 0;
  
  for (const [item, details] of Object.entries(cart)) {
    if (details.qty > 0) {
      const itemTotal = details.price * details.qty;
      summary += `${item} (${details.qty} x ₹${details.price}) = ₹${itemTotal}<br>`;
      total += itemTotal;
    }
  }
  
  return summary || 'No items selected';
}

// Function to calculate order total
function calculateOrderTotal() {
  let total = 0;
  for (const [item, details] of Object.entries(cart)) {
    if (details.qty > 0) {
      total += details.qty * details.price;
    }
  }
  return `₹${total}`;
}

// Modified handleBookingSubmit to include cart items
function handleBookingSubmit(event) {
  event.preventDefault();

  bookingStatus.textContent = 'Sending booking...';
  bookingStatus.style.color = '#444';

  const params = {
    name: document.getElementById("namee").value.trim(),
    email: document.getElementById("emaill").value.trim(),
    people: document.getElementById("peoplee").value.trim(),
    phone: document.getElementById("phonee").value.trim(),
    date: document.getElementById("datee").value.trim(),
    time: document.getElementById("timee").value.trim(),
    request: document.getElementById("requestt").value.trim(),
    order_summary: generateOrderSummaryText(),
    order_total: calculateOrderTotal()
  };

  emailjs.send(SERVICE_ID, TEMPLATE_ID, params, USER_ID)
    .then(function(res) {
      console.log('EmailJS response', res);
      bookingStatus.textContent = 'Booking request sent successfully! We will call to confirm.';
      bookingStatus.style.color = 'green';
      bookingForm.reset();
      // Clear the cart after successful submission
      for (const item in cart) {
        cart[item].qty = 0;
      }
      generateOrderSummary();
      renderCart();
    })
    .catch(function(error) {
      console.error('EmailJS error', error);
      bookingStatus.textContent = 'Failed to send booking. Please try again or call us.';
      bookingStatus.style.color = 'crimson';
    });
}

// Attach event listener to form submit
bookingForm.addEventListener('submit', handleBookingSubmit);

// Complete Menu Data
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
    {name: "Egg Chowmein", price: 45},
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

const categoriesContainer = document.getElementById('categories-container');
const cartItemsDiv = document.getElementById('cart-items');
const cartTotalDiv = document.getElementById('cart-total');

// Initialize cart for all menu items
function initializeCart() {
  for (const category in menuData) {
    menuData[category].forEach(item => {
      if (!cart[item.name]) {
        cart[item.name] = {price: item.price, qty: 0};
      }
    });
  }
}

function renderCategories() {
  categoriesContainer.innerHTML = '';
  Object.entries(menuData).forEach(([category, items]) => {
    // Create category heading div
    const catDiv = document.createElement('div');
    catDiv.className = 'category';

    const heading = document.createElement('div');
    heading.className = 'category-heading';
    heading.textContent = category;

    // Add toggle icon
    const toggleIcon = document.createElement('span');
    toggleIcon.textContent = '+';
    toggleIcon.style.fontWeight = 'bold';
    heading.appendChild(toggleIcon);

    catDiv.appendChild(heading);

    // Create container for items
    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'category-items';

    items.forEach(food => {
      const foodDiv = document.createElement('div');
      foodDiv.className = 'food-item';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'food-name';
      nameSpan.textContent = food.name;

      const priceSpan = document.createElement('span');
      priceSpan.className = 'food-price';
      priceSpan.textContent = '₹' + food.price;

      // Quantity controls
      const qtyControls = document.createElement('div');
      qtyControls.className = 'qty-controls';

      const minusBtn = document.createElement('button');
      minusBtn.className = 'qty-btn';
      minusBtn.textContent = '−';
      minusBtn.title = `Decrease quantity of ${food.name}`;

      const qtyDisplay = document.createElement('span');
      qtyDisplay.className = 'qty-display';
      qtyDisplay.textContent = cart[food.name].qty;

      const plusBtn = document.createElement('button');
      plusBtn.className = 'qty-btn';
      plusBtn.textContent = '+';
      plusBtn.title = `Increase quantity of ${food.name}`;

      qtyControls.appendChild(minusBtn);
      qtyControls.appendChild(qtyDisplay);
      qtyControls.appendChild(plusBtn);

      foodDiv.appendChild(nameSpan);
      foodDiv.appendChild(priceSpan);
      foodDiv.appendChild(qtyControls);

      itemsDiv.appendChild(foodDiv);

      // Event listeners for + and - buttons
      plusBtn.addEventListener('click', () => {
        cart[food.name].qty++;
        qtyDisplay.textContent = cart[food.name].qty;
        renderCart();
        generateOrderSummary();
      });

      minusBtn.addEventListener('click', () => {
        if (cart[food.name].qty > 0) {
          cart[food.name].qty--;
          qtyDisplay.textContent = cart[food.name].qty;
          renderCart();
          generateOrderSummary();
        }
      });
    });

    catDiv.appendChild(itemsDiv);
    categoriesContainer.appendChild(catDiv);

    // Toggle show/hide items on heading click
    heading.addEventListener('click', () => {
      if (itemsDiv.style.display === 'block') {
        itemsDiv.style.display = 'none';
        toggleIcon.textContent = '+';
      } else {
        itemsDiv.style.display = 'block';
        toggleIcon.textContent = '−';
      }
    });
  });
}

function renderCart() {
  cartItemsDiv.innerHTML = '';
  let total = 0;
  let index = 0;
  
  for (const [name, {price, qty}] of Object.entries(cart)) {
    if (qty > 0) {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.style.animationDelay = `${index * 0.1}s`;
      
      const nameDiv = document.createElement('div');
      nameDiv.className = 'cart-item-name';
      nameDiv.textContent = name;

      const qtyDiv = document.createElement('div');
      qtyDiv.className = 'cart-item-qty';
      qtyDiv.textContent = qty;

      const priceDiv = document.createElement('div');
      priceDiv.className = 'cart-item-price';
      priceDiv.textContent = `₹${price * qty}`;

      // Add remove button
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = '&times;';
      removeBtn.className = 'remove-item';
      removeBtn.style.cssText = `
        background: none;
        border: none;
        color: #ff6b6b;
        font-size: 1.2em;
        cursor: pointer;
        margin-left: 10px;
        transition: all 0.2s;
      `;
      removeBtn.addEventListener('mouseover', () => {
        removeBtn.style.transform = 'scale(1.3)';
        removeBtn.style.color = '#ff0000';
      });
      removeBtn.addEventListener('mouseout', () => {
        removeBtn.style.transform = 'scale(1)';
        removeBtn.style.color = '#ff6b6b';
      });
      removeBtn.addEventListener('click', () => {
        cart[name].qty = 0;
        itemDiv.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
          renderCart();
          generateOrderSummary();
        }, 300);
      });

      itemDiv.appendChild(nameDiv);
      itemDiv.appendChild(qtyDiv);
      itemDiv.appendChild(priceDiv);
      itemDiv.appendChild(removeBtn);

      cartItemsDiv.appendChild(itemDiv);
      total += price * qty;
      index++;
    }
  }

  cartTotalDiv.textContent = `Total: ₹${total}`;
  
  // Add animation for empty cart
  if (cartItemsDiv.innerHTML === '') {
    cartItemsDiv.style.animation = 'fadeIn 0.5s ease';
  }
}

// Initialize and render everything
initializeCart();
renderCategories();
renderCart();

