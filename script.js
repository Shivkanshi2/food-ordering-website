document.addEventListener('DOMContentLoaded', function() {
      // Mobile menu toggle
      const navToggle = document.getElementById('navToggle');
      const mainNav = document.getElementById('main-nav');
      if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
          mainNav.classList.toggle('active');
        });
      }
      
      function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }

      function formatTime(date) {
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
      }

      function setCurrentDateTime() {
        const now = new Date();
        const dateField = document.getElementById('datee');
        const timeField = document.getElementById('timee');
        const managerDate = document.getElementById('manager-date');
        const managerTime = document.getElementById('manager-time');
        
        if (dateField) dateField.value = formatDate(now);
        if (timeField) timeField.value = formatTime(now);
        if (managerDate) managerDate.value = formatDate(now);
        if (managerTime) managerTime.value = formatTime(now);
      }

      // Initialize date/time
      setCurrentDateTime();
      
      // Update time every minute
      setInterval(setCurrentDateTime, 60000);

      // Initialize QR Code
      function initQRCode() {
        try {
          // Create QR code pointing directly to your booking section
          new QRCode(document.getElementById('qr-code'), {
            text:"https://thecocochilli.netlify.app#booking",
            width: 140,
            height: 140,
            colorDark: "#8b1d1d",  // Your maroon color
            colorLight: "#ffffff",  // White background
            correctLevel: QRCode.CorrectLevel.H
          });
        } catch (error) {
          console.error('Error generating QR code:', error);
          // Fallback - show a message if QR code fails
          document.getElementById('qr-code').innerHTML = '<p>Scan to order</p>';
        }
      }

      const bookingForm = document.getElementById('booking-form');
      const bookingStatus = document.getElementById('booking-status');
      const orderSummaryContainer = document.getElementById('order-summary-container');
      const orderSummary = document.getElementById('order-summary');
      const categoriesBooking = document.getElementById('categories-container-booking');
      const pickerError = document.getElementById('picker-error');
      
      // Manager elements
      const loginForm = document.getElementById('login-form');
      const managerEmail = document.getElementById('manager-email');
      const managerPassword = document.getElementById('manager-password');
      const loginError = document.getElementById('login-error');
      const managerActions = document.getElementById('manager-actions');
      const managerOrderBtn = document.getElementById('manager-order-btn');
      const managerPrintBtn = document.getElementById('manager-print-btn');
      const managerOrderSection = document.getElementById('manager-order-section');
      const managerOrderForm = document.getElementById('manager-order-form');
      const managerCategories = document.getElementById('manager-categories-container');
      const managerOrderSummary = document.getElementById('manager-order-summary');
      const managerOrderSummaryContainer = document.getElementById('manager-order-summary-container');
      const managerOrderStatus = document.getElementById('manager-order-status');
      const managerSubmitBtn = document.getElementById('manager-submit-btn');
      const closeManagerBtn = document.getElementById('close-manager');
      const managerSection = document.querySelector('.manager-section');

      // WhatsApp number (91 + 9939701019)
      const OWNER_WHATSAPP = '919939701019';

      // Menu Data
// Menu Data (for dynamic rendering if needed)
// Corrected Menu Data (prices synced with HTML)
const menuData = {
  "Classic Drinks": [
    { name: "Chocolate super shake", price: 55 },
    { name: "Strawberry super shake", price: 55 },
    { name: "Vanilla Super Shake", price: 50 },
    { name: "Oreo Crunch Shake", price: 60 },
    { name: "Signature cold coffee", price: 45 },
    { name: "Fresh Lime Soda", price: 30 },
    { name: "Kitkat Shake", price: 65 },   // fixed
    { name: "Hot Chocolate", price: 45 },
    { name: "Tea", price: 10 },            // fixed
    { name: "Coffee", price: 25 }
  ],
  "Starters": [
    { name: "KFC Crispy fried chicken", price: 99 },
    { name: "Chicken Popcorn", price: 65 },
    { name: "Chicken Nuggets", price: 55 },
    { name: "Potato Cheese Shotz", price: 45 }
  ],
  "Burger & Fries": [
    { name: "BK Veg Burger", price: 40 },
    { name: "Paneer Cheese Burger", price: 48 },
    { name: "Chicken Cheese Burger", price: 50 },
    { name: "French Fries / peri-peri", price: 28 }  // fixed
  ],
  "Sandwich": [
    { name: "Veg Grilled Sandwich", price: 40 },
    { name: "Paneer cheese Sandwich", price: 48 },
    { name: "Chicken cheese Sandwich", price: 50 }
  ],
  "Pasta": [
    { name: "White Creamy sauce", price: 65 }, // fixed
    { name: "Red Basil Sauce Pasta", price: 55 }
  ],
  "Chinese": [
    { name: "Chicken Coco Chilli", price: 65 },
    { name: "Chicken Chilli Boneless", price: 75 },
    { name: "Paneer Chilli", price: 60 },
    { name: "Veg Chowmin", price: 40 },
    { name: "Mixed Chowmin", price: 50 } // fixed
  ],
  "Pizza": [
    { name: "Veggie Delight", price: 70 },
    { name: "Chicken Cheese Pizza", price: 90 },
    { name: "Chicken Cheese Supreme", price: 99 } // fixed
  ],
  "Soups": [
    { name: "Hot & Sour Veg Soup", price: 35 }, // fixed
    { name: "Hot & Sour Chicken Soup", price: 40 },
    { name: "Sweet Corn Soup", price: 40 } // fixed
  ],
  "Momos": [
    { name: "Veg Steam Momo", price: 70 }, // fixed
    { name: "Chicken Steam Momo", price: 80 }, // fixed
    { name: "Paneer steam Momo", price: 80 } // fixed
  ],
  "Kebabs": [
    { name: "Paneer Malai Tikka", price: 110 },
    { name: "Chicken Seekh Kebab", price: 120 },
    { name: "Chicken Malai Tikka", price: 130 }
  ],
  "Rolls": [
    { name: "Paneer Cheese Roll", price: 50 }, // fixed
    { name: "Veg Kathi cheese Roll", price: 30 }, // fixed
    { name: "Chicken cheese Roll", price: 50 },
    { name: "Egg Roll", price: 40 }
  ],
  "Breakfast": [
    { name: "Idli 3pcs", price: 25 },
    { name: "Masala Dosh", price: 50 },
    { name: "Chole Bhuture", price: 55 }
  ],
  "Veg & Non-veg Curry": [
    { name: "Mix Veg", price: 40 },
    { name: "Malai Kofta", price: 55 },
    { name: "Paneer Butter Masala", price: 60 }, // fixed
    { name: "Paneer Sahi-Korma", price: 60 },
    { name: "Mushroom Masala", price: 60 },
    { name: "Dal Fry / Dal Tadka", price: 35 },
    { name: "Dal Makhani", price: 45 },
    { name: "Butter Chicken", price: 68 }, // fixed
    { name: "Chicken Curry", price: 68 }, // fixed
    { name: "Egg Curry", price: 45 }, // fixed
    { name: "Mutton Curry", price: 120 }
  ],
  "Fried Rice": [
    { name: "Veg-Fried Rice", price: 40 },
    { name: "Chicken Fried Rice", price: 50 },
    { name: "Paneer Fried Rice", price: 48 }, // fixed
    { name: "Egg Fried Rice", price: 45 }
  ],
  "Rice/Roti": [
    { name: "Plain Steam Rice", price: 25 }, // fixed
    { name: "Jeera Fried Rice", price: 30 }, // fixed
    { name: "Plain Tawa Roti", price: 10 }
  ],
  "Biryani": [
    { name: "Veg Biryani", price: 50 },
    { name: "Chicken Biryani", price: 70 }
  ],
  "Sides Items": [
    { name: "Special Bundi Raita", price: 20 },
    { name: "Papad", price: 10 },
    { name: "Green Salad", price: 25 }, // fixed
    { name: "Sweet Kheer", price: 30 }, // fixed
    { name: "Gulab Jamun", price: 15 } // fixed
  ],
  "Thali": [
    { name: "Plain Veg-Thali", price: 50 },
    { name: "Plain Chicken Thali", price: 70 }, // fixed
    { name: "Plain Mutton Thali", price: 130 }
  ]
};

      // Carts
      const cart = {};
      const managerCart = {};
      
      function initializeCarts() {
        for (const category in menuData) {
          menuData[category].forEach(item => {
            if (!cart[item.name]) {
              cart[item.name] = { price: item.price, qty: 0 };
            }
            if (!managerCart[item.name]) {
              managerCart[item.name] = { price: item.price, qty: 0 };
            }
          });
        }
      }

      function buildCategories(container, cartData) {
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
            priceSpan.textContent = food.price; // Rupee hex added via CSS ::before

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
            qtyDisplay.textContent = cartData[food.name].qty;

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

      function updateQtyDisplay(name, cartData, container) {
        const selector = `.qty-display[data-name="${CSS.escape(name)}"]`;
        container.querySelectorAll(selector).forEach(d => d.textContent = cartData[name].qty);
      }

      function generateOrderSummaryText(formPrefix, cartData) {
        // For manager section, use empty values for customer info
        let name, phone, location;
        
        if (formPrefix === 'manager') {
          // For manager section, use empty/default values
          name = "";
          phone = "";
          location = "";
        } else {
          // For regular booking form, get values from form fields
          name = document.getElementById('namee').value.trim();
          phone = document.getElementById('phonee').value.trim();
          location = document.getElementById('locatione').value.trim();
        }
        
        // Get date/time and request fields
        const dateField = formPrefix ? `${formPrefix}-date` : 'datee';
        const timeField = formPrefix ? `${formPrefix}-time` : 'timee';
        const requestField = formPrefix ? `${formPrefix}-request` : 'requestt';

        const params = {
          name: name,
          phone: phone,
          location: location,
          date: document.getElementById(dateField).value.trim(),
          time: document.getElementById(timeField).value.trim(),
          request: document.getElementById(requestField).value.trim()
        };

        let summary = '';
        let total = 0;
        for (const [item, details] of Object.entries(cartData)) {
          if (details.qty > 0) {
            const itemTotal = details.price * details.qty;
            summary += `${item} (${details.qty} x \u20B9${details.price}) = \u20B9${itemTotal}\n`;
            total += itemTotal;
          }
        }
        
        if (!summary) {
          return '';
        }
        
        const orderId = 'CC' + Date.now().toString().slice(-6);
        const totalDisplay = '\u20B9' + total;

        const waMessage = `*The Coco Chilli
*Main Road Torpa
*(Khunti)
..................
* Invoice: ${orderId}
* Name: ${params.name}
* Phone: ${params.phone}
* Location: ${params.location}
* Date/Time: ${params.date || '-'} ${params.time || '-'}

* Items:

${summary || '-'}
* Notes: ${params.request || '-'}
━━━━━━━━━━━━━━━━━━━━
* Total: ${totalDisplay}


Thank you`;

        return waMessage;
      }

      function generateOrderSummary(formPrefix, cartData, summaryElement, containerElement) {
        const waMessage = generateOrderSummaryText(formPrefix, cartData);
        if (!waMessage) {
          summaryElement.textContent = '';
          containerElement.style.display = 'none';
          return 0;
        }
        
        summaryElement.textContent = waMessage;
        containerElement.style.display = 'block';
        
        // Calculate total
        let total = 0;
        for (const [, details] of Object.entries(cartData)) {
          if (details.qty > 0) {
            total += details.price * details.qty;
          }
        }
        return total;
      }

      function hasAtLeastOneItem(cartData) {
        return Object.values(cartData).some(v => v.qty > 0);
      }

      // Status helpers
      function setStatus(element, type, text, showSpinner=false) {
        if (!element) return;
        element.className = `booking-status ${type}`;
        element.textContent = '';
        if (showSpinner) {
          const sp = document.createElement('span');
          sp.className = 'spinner';
          element.appendChild(sp);
        }
        const msg = document.createElement('span');
        msg.textContent = text;
        element.appendChild(msg);
      }

      // Print invoice function
      function printInvoice() {
        const waMessage = generateOrderSummaryText('manager', managerCart);
        
        if (!waMessage.trim()) {
          alert("No order details found to print.");
          return;
        }

        // Create a new window in the same tab
        const printWindow = window.open('', '_self');
        printWindow.document.write('<html><head><title>The Coco Chilli - Order Invoice</title>');
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; padding: 20px; } pre { white-space: pre-wrap; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h1 style="color: #8b1d1d; text-align: center;">The Coco Chilli</h1>');
        printWindow.document.write('<pre>' + waMessage + '</pre>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        
        // Print after a small delay to ensure content is loaded
        setTimeout(() => {
          printWindow.print();
        }, 500);
      }

      // Handle quantity changes for both carts
      function handleQtyChange(event, cartData, container) {
        const action = event.target.getAttribute('data-action');
        const name = event.target.getAttribute('data-name');
        
        if (action === 'plus') {
          cartData[name].qty++;
        } else if (action === 'minus' && cartData[name].qty > 0) {
          cartData[name].qty--;
        }
        
        updateQtyDisplay(name, cartData, container);
        
        // Update the appropriate summary
        if (container === categoriesBooking) {
          generateOrderSummary('', cart, orderSummary, orderSummaryContainer);
        } else if (container === managerCategories) {
          generateOrderSummary('manager', managerCart, managerOrderSummary, managerOrderSummaryContainer);
        }
      }

      // Submit -> WhatsApp + status UI
      function handleBookingSubmit(event, formPrefix, cartData, statusElement) {
        event.preventDefault();
        
        // For manager section, skip the customer info validation
        if (formPrefix !== 'manager') {
          // Get the correct form elements based on formPrefix
          const nameInput = document.getElementById(formPrefix ? `${formPrefix}-name` : 'namee');
          const phoneInput = document.getElementById(formPrefix ? `${formPrefix}-phone` : 'phonee');
          const locationInput = document.getElementById(formPrefix ? `${formPrefix}-location` : 'locatione');
          
          if (!nameInput.value.trim()) {
            nameInput.focus();
            setStatus(statusElement, 'status--error', '');
            return;
          }
          
          if (!phoneInput.value.trim()) {
            phoneInput.focus();
            setStatus(statusElement, 'status--error', '');
            return;
          }
          
          if (!locationInput.value.trim()) {
            locationInput.focus();
            setStatus(statusElement, 'status--error', '');
            return;
          }
        }

        if (!hasAtLeastOneItem(cartData)) {
          if (pickerError) pickerError.style.display = 'block';
          if (formPrefix === 'manager') {
            managerCategories.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            categoriesBooking.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          setStatus(statusElement, 'status--error', 'Please select at least one item');
          return;
        }

        const waMessage = generateOrderSummaryText(formPrefix, cartData);
        const waURL = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;

        setStatus(statusElement, 'status--sending', 'Opening WhatsApp...', true);

        const opened = window.open(waURL, '_blank');
        if (!opened) {
          window.location.href = waURL;
        }

        setTimeout(() => {
          setStatus(statusElement, 'status--success', 'WhatsApp opened. Please send your order there.');
          if (formPrefix !== 'manager' && bookingForm) {
            bookingForm.reset();
          }
          // Reset cart
          if (formPrefix === 'manager') {
            for (const item in managerCart) managerCart[item].qty = 0;
            managerCategories.querySelectorAll('.qty-display').forEach(d => d.textContent = '0');
            generateOrderSummary('manager', managerCart, managerOrderSummary, managerOrderSummaryContainer);
          } else {
            for (const item in cart) cart[item].qty = 0;
            categoriesBooking.querySelectorAll('.qty-display').forEach(d => d.textContent = '0');
            generateOrderSummary('', cart, orderSummary, orderSummaryContainer);
          }
        }, 600);
      }

      // Manager login handler
      function handleManagerLogin(event) {
        event.preventDefault();
        
        const email = managerEmail.value.trim();
        const password = managerPassword.value.trim();
        
        if (email === 'bhardwajkumar0.2@gmail.com' && password === 'bk@6990') {
          // Successful login
          loginError.style.display = 'none';
          managerActions.style.display = 'block';
          
          // Clear password field
          managerPassword.value = '';
        } else {
          // Failed login
          loginError.style.display = 'block';
          managerActions.style.display = 'none';
        }
      }

      // Manager order button handler
      function handleManagerOrder() {
        managerOrderSection.style.display = managerOrderSection.style.display === 'block' ? 'none' : 'block';
      }

      // Show/hide manager section
      function toggleManagerSection(show) {
        if (show) {
          managerSection.style.display = 'block';
          document.body.style.overflow = 'hidden';
        } else {
          managerSection.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      }

      // Event listeners
      if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => handleBookingSubmit(e, '', cart, bookingStatus));
      }
      
      if (loginForm) {
        loginForm.addEventListener('submit', handleManagerLogin);
      }
      
      if (managerOrderBtn) {
        managerOrderBtn.addEventListener('click', handleManagerOrder);
      }
      
      if (managerPrintBtn) {
        managerPrintBtn.addEventListener('click', printInvoice);
      }
      
      if (managerSubmitBtn) {
        managerSubmitBtn.addEventListener('click', (e) => handleBookingSubmit(e, 'manager', managerCart, managerOrderStatus));
      }

      if (closeManagerBtn) {
        closeManagerBtn.addEventListener('click', () => toggleManagerSection(false));
      }

      // Handle manager link click
      document.querySelectorAll('a[href="#manager"]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          toggleManagerSection(true);
        });
      });

      // Quantity button event delegation for both carts
      if (categoriesBooking) { 
        categoriesBooking.addEventListener('click', (e) => {
          if (e.target.classList.contains('qty-btn')) {
            handleQtyChange(e, cart, categoriesBooking);
          }
        });
      }
      
      if (managerCategories) {
        managerCategories.addEventListener('click', (e) => {
          if (e.target.classList.contains('qty-btn')) {
            handleQtyChange(e, managerCart, managerCategories);
          }
        });
      }

      // Build menus and initialize carts
      initializeCarts();
      buildCategories(categoriesBooking, cart);
      buildCategories(managerCategories, managerCart);
      
      // Initialize QR code after everything is loaded
      initQRCode();

      // Close mobile menu on nav link
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        if (window.innerWidth <= 620 && mainNav && mainNav.classList.contains('active')) {
          setTimeout(() => mainNav.classList.remove('active'), 200);
        }
      });
    });