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
                text: "https://thecocochilli.netlify.app#booking",
                width: 140,
                height: 140,
                colorDark: "#8b1d1d", // Your maroon color
                colorLight: "#ffffff", // White background
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

    // Menu Data (Price for Chicken Pasta (Full) corrected to 90)
    const menuData = {
        "Drinks": [{
            "name": "Chocolate Milk-shake",
            "price": 65
        }, {
            "name": "Oreo Crunch Milk-Shake",
            "price": 65
        }, {
            "name": "Cold coffee",
            "price": 65
        }, {
            "name": "Fresh Lime Soda",
            "price": 60
        }],
        "Pizza": [{
            "name": "Paneer Tikka Pizza",
            "price": 99
        }, {
            "name": "Chicken Tandoori Pizza",
            "price": 109
        }],
        "Burger & Fries": [{
            "name": "Chicken Cheese Burger",
            "price": 75
        }, {
            "name": "Paneer cheese Burger",
            "price": 75
        }, {
            "name": "French Fries",
            "price": 40
        }, {
            "name": "BURGER FRIES COMBO",
            "price": 99
        }],
        "Rolls": [{
            "name": "Paneer Roll",
            "price": 60
        }, {
            "name": "Chicken Roll",
            "price": 65
        }, {
            "name": "Egg Roll",
            "price": 40
        }],
        "Sandwich": [{
            "name": "Paneer Tikka Sandwich",
            "price": 60
        }, {
            "name": "Chicken Tikka Sandwich",
            "price": 65
        }],
        "Coco Special": [{
            "name": "Coco Crispy fried chicken",
            "price": 180
        }, {
            "name": "Chicken Popcorn",
            "price": 130
        }, {
            "name": "Chicken Nuggets",
            "price": 170
        }, {
            "name": "Potato Cheese Shotz",
            "price": 70
        }],
        "Momos": [{
            "name": "Veg Steam Momo (Half)",
            "price": 35
        }, {
            "name": "Veg Steam Momo (Full)",
            "price": 70
        }, {
            "name": "Chicken Steam Momo (Half)",
            "price": 40
        }, {
            "name": "Chicken Steam Momo (Full)",
            "price": 80
        }],
        "Fried Rice": [{
            "name": "Veg-Fried Rice",
            "price": 45
        }, {
            "name": "Chicken Fried Rice",
            "price": 70
        }, {
            "name": "Paneer Fried Rice",
            "price": 75
        }, {
            "name": "Egg Fried Rice",
            "price": 50
        }],
        "Soups": [{
            "name": "Vegetable Soup",
            "price": 55
        }, {
            "name": "Chicken Soup",
            "price": 65
        }, {
            "name": "Sweet Corn Soup",
            "price": 55
        }],
        "Plain Thali": [{
            "name": "Veg-Thali",
            "price": 45
        }, {
            "name": "Chicken Thali",
            "price": 70
        }, {
            "name": "Mutton Thali",
            "price": 130
        }],
        "Chinese": [{
            "name": "Chicken Chilli (Half)",
            "price": 40
        }, {
            "name": "Chicken Chilli (Full)",
            "price": 80
        }, {
            "name": "Chicken Chilli Boneless (Half)",
            "price": 45
        }, {
            "name": "Chicken Chilli Boneless (Full)",
            "price": 90
        }, {
            "name": "Paneer Chilli (Half)",
            "price": 60
        }, {
            "name": "Paneer Chilli (Full)",
            "price": 120
        }, {
            "name": "Veg Chowmin (Half)",
            "price": 35
        }, {
            "name": "Veg Chowmin (Full)",
            "price": 70
        }, {
            "name": "Mixed Chowmin (Half)",
            "price": 60
        }, {
            "name": "Mixed Chowmin (Full)",
            "price": 120
        }],
        "Biryani": [{
            "name": "Veg Biryani (Half)",
            "price": 50
        }, {
            "name": "Veg Biryani (Full)",
            "price": 99
        }, {
            "name": "Chicken Biryani (Half)",
            "price": 70
        }, {
            "name": "Chicken Biryani (Full)",
            "price": 140
        }],
        "Pasta": [{
            "name": "Vegetable Pasta (Half)",
            "price": 45
        }, {
            "name": "Vegetable Pasta (Full)",
            "price": 80
        }, {
            "name": "Chicken Pasta (Half)",
            "price": 50
        }, {
            "name": "Chicken Pasta (Full)",
            "price": 80
        }] // <-- Price corrected here
    };

    // Carts
    const cart = {};
    const managerCart = {};

    function initializeCarts() {
        for (const category in menuData) {
            menuData[category].forEach(item => {
                if (!cart[item.name]) {
                    cart[item.name] = {
                        price: item.price,
                        qty: 0
                    };
                }
                if (!managerCart[item.name]) {
                    managerCart[item.name] = {
                        price: item.price,
                        qty: 0
                    };
                }
            });
        }
    }

    function buildCategories(container, cartData) {
        if (!container) return;
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
        let name, phone, location;

        if (formPrefix === 'manager') {
            name = document.getElementById('manager-name')?.value.trim() || "";
            phone = document.getElementById('manager-phone')?.value.trim() || "";
            location = document.getElementById('manager-location')?.value.trim() || "";
        } else {
            name = document.getElementById('namee').value.trim();
            phone = document.getElementById('phonee').value.trim();
            location = document.getElementById('locatione').value.trim();
        }

        const dateFieldId = formPrefix ? `${formPrefix}-date` : 'datee';
        const timeFieldId = formPrefix ? `${formPrefix}-time` : 'timee';
        const requestFieldId = formPrefix ? `${formPrefix}-request` : 'requestt';

        const params = {
            name: name,
            phone: phone,
            location: location,
            date: document.getElementById(dateFieldId).value.trim(),
            time: document.getElementById(timeFieldId).value.trim(),
            request: document.getElementById(requestFieldId).value.trim()
        };

        let summary = '';
        let total = 0;
        for (const [item, details] of Object.entries(cartData)) {
            if (details.qty > 0) {
                const itemTotal = details.price * details.qty;
                summary += `${item} (${details.qty} x ₹${details.price}) = ₹${itemTotal}\n`;
                total += itemTotal;
            }
        }

        if (!summary) {
            return '';
        }

        const orderId = 'CC' + Date.now().toString().slice(-6);
        const totalDisplay = '₹' + total;

        const waMessage = `The Coco Chilli\nMain Road Torpa\n(Khunti)\n..................\nInvoice: ${orderId}\nName: ${params.name}\nPhone: ${params.phone}\nLocation: ${params.location}\nDate/Time: ${params.date || '-'} ${params.time || '-'}\n\nItems:\n\n${summary || '-'}\nNotes: ${params.request || '-'}\n━━━━━━━━━━━━━━━━━━━━\nTotal: ${totalDisplay}\n\n\nThank you`;

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

    function setStatus(element, type, text, showSpinner = false) {
        if (!element) return;
        element.className = `booking-status ${type}`;
        element.innerHTML = '';
        if (showSpinner) {
            const sp = document.createElement('span');
            sp.className = 'spinner';
            element.appendChild(sp);
        }
        const msg = document.createElement('span');
        msg.textContent = text;
        element.appendChild(msg);
    }

    // ==========================================================
    // == MODIFIED PRINT FUNCTION STARTS HERE ==
    // ==========================================================
    function printInvoice() {
        const waMessage = generateOrderSummaryText('manager', managerCart);

        if (!waMessage.trim()) {
            alert("No order details found to print.");
            return;
        }

        // Open the invoice in a new tab (_blank) instead of the same tab (_self)
        const printWindow = window.open('', '_blank');
        
        // Check for popup blockers
        if (!printWindow) {
            alert("Please allow pop-ups for this site to print the invoice.");
            return;
        }

        printWindow.document.write('<html><head><title>The Coco Chilli - Order Invoice</title>');
        printWindow.document.write('<style>body { font-family: "Courier New", Courier, monospace; padding: 20px; font-size:14px; } pre { white-space: pre-wrap; font-family: inherit; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<pre>' + waMessage + '</pre>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();

        // Focus on the new window and print
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }
    // ========================================================
    // == MODIFIED PRINT FUNCTION ENDS HERE ==
    // ========================================================

    function handleQtyChange(event, cartData, container) {
        const action = event.target.getAttribute('data-action');
        const name = event.target.getAttribute('data-name');

        if (action === 'plus') {
            cartData[name].qty++;
        } else if (action === 'minus' && cartData[name].qty > 0) {
            cartData[name].qty--;
        }

        updateQtyDisplay(name, cartData, container);

        if (container === categoriesBooking) {
            generateOrderSummary('', cart, orderSummary, orderSummaryContainer);
        } else if (container === managerCategories) {
            generateOrderSummary('manager', managerCart, managerOrderSummary, managerOrderSummaryContainer);
        }
    }

    function handleBookingSubmit(event, formPrefix, cartData, statusElement) {
        event.preventDefault();

        if (formPrefix !== 'manager') {
            const nameInput = document.getElementById('namee');
            const phoneInput = document.getElementById('phonee');
            const locationInput = document.getElementById('locatione');

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
        }

        if (!hasAtLeastOneItem(cartData)) {
            if (pickerError) pickerError.style.display = 'block';
            const container = formPrefix === 'manager' ? managerCategories : categoriesBooking;
            container.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
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
            setStatus(statusElement, 'status--success', 'WhatsApp opened. Please send your order.');
            if (formPrefix !== 'manager' && bookingForm) {
                bookingForm.reset();
            }
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

    function handleManagerLogin(event) {
        event.preventDefault();
        const email = managerEmail.value.trim();
        const password = managerPassword.value.trim();

        if (email === 'bhardwajkumar0.2@gmail.com' && password === 'bk@6990') {
            loginError.style.display = 'none';
            managerActions.style.display = 'block';
            managerPassword.value = '';
        } else {
            loginError.style.display = 'block';
            managerActions.style.display = 'none';
        }
    }

    function handleManagerOrder() {
        managerOrderSection.style.display = managerOrderSection.style.display === 'block' ? 'none' : 'block';
    }

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

    document.querySelectorAll('a[href="#manager"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toggleManagerSection(true);
        });
    });

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