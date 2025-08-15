
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
            text: "https://meek-baklava-b8a10e.netlify.app/#booking",
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

      // WhatsApp number (91 + 9939701019)
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
        const params = {
          name: document.getElementById(`${formPrefix}-name`).value.trim(),
          phone: document.getElementById(`${formPrefix}-phone`).value.trim(),
          location: document.getElementById(`${formPrefix}-location`).value.trim(),
          date: document.getElementById(`${formPrefix}-date`).value.trim(),
          time: document.getElementById(`${formPrefix}-time`).value.trim(),
          request: document.getElementById(`${formPrefix}-request`).value.trim()
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

        const waMessage = `* The Coco Chilli*
*Main Road Torpa*
*(Khunti)*
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


Thank you for your visit`;

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
        
        // For manager form, skip validation
        if (formPrefix === 'manager') {
          const waMessage = generateOrderSummaryText(formPrefix, cartData);
          const waURL = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;

          setStatus(statusElement, 'status--sending', 'Opening WhatsApp...', true);

          const opened = window.open(waURL, '_blank');
          if (!opened) {
            window.location.href = waURL;
          }

          setTimeout(() => {
            setStatus(statusElement, 'status--success', 'WhatsApp opened. Please send your order there.');
            // Reset manager cart
            for (const item in managerCart) managerCart[item].qty = 0;
            managerCategories.querySelectorAll('.qty-display').forEach(d => d.textContent = '0');
            generateOrderSummary('manager', managerCart, managerOrderSummary, managerOrderSummaryContainer);
          }, 600);
          return;
        }
        
        // For customer form, do validation
        const nameInput = document.getElementById(`${formPrefix}-name`);
        const phoneInput = document.getElementById(`${formPrefix}-phone`);
        const locationInput = document.getElementById(`${formPrefix}-location`);
        
        if (!nameInput.value.trim()) {
          nameInput.focus();
          return;
        }
        
        if (!phoneInput.value.trim()) {
          phoneInput.focus();
          return;
        }
        
        if (!locationInput.value.trim()) {
          locationInput.focus();
          return;
        }

        if (!hasAtLeastOneItem(cartData)) {
          if (pickerError) pickerError.style.display = 'block';
          categoriesBooking.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
          if (bookingForm) bookingForm.reset();
          // Reset cart
          for (const item in cart) cart[item].qty = 0;
          categoriesBooking.querySelectorAll('.qty-display').forEach(d => d.textContent = '0');
          generateOrderSummary('', cart, orderSummary, orderSummaryContainer);
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
    
