let cart = [];

// init app after page load
function init() {
    loadRestaurantAssets();
    renderRestaurantInfo();
    renderCategoryNav();
    renderMobileNav();
    setEventListeners();
    renderMenu();
    renderCart();
}

// load hero image and restaurant logo
function loadRestaurantAssets() {
    const heroImage = document.getElementById('heroImage');
    const restaurantLogo = document.getElementById('restaurantLogo');

    if (heroImage && restaurant.heroImage) {
        heroImage.src = restaurant.heroImage;
    }

    if (restaurantLogo && restaurant.restaurantLogo) {
        restaurantLogo.src = restaurant.restaurantLogo;
        restaurantLogo.alt = `${restaurant.name} Logo`;
    }
}

// render restaurant name, rating and description
function renderRestaurantInfo() {
    const nameRow = document.querySelector('.restaurantNameRow');
    if (nameRow) {
        const parts = restaurant.name.split(' ');
        const rating = restaurant.rating.toString().replace('.', ',');
        nameRow.innerHTML = getRestaurantInfoHtml(parts[0], parts[1] || '', rating, restaurant.reviewCount);
    }

    const desc = document.querySelector('.restaurantDescription');
    if (desc) desc.textContent = restaurant.description;
}

// render category nav links
function renderCategoryNav() {
    const nav = document.querySelector('.categoryNav');
    if (!nav) return;

    nav.innerHTML = menu.map(category => getCategoryLinkHtml(category)).join('');
}

// render mobile bottom nav with cart badge
function renderMobileNav() {
    const nav = document.querySelector('.mobileNav');
    if (!nav) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = totalItems > 0 ? `<span class="cartBadge">${totalItems}</span>` : '';
    const homeClass = location.pathname.endsWith('index.html') || location.pathname === '/' ? 'mobileNavButtonActive' : '';
    const burgerClass = location.hash.includes('burger') ? 'mobileNavButtonActive' : '';

    nav.innerHTML = getMobileNavHtml(homeClass, burgerClass, badge);

    const cartBtn = document.getElementById('mobileNavCartButton');
    if (cartBtn) cartBtn.addEventListener('click', openCartDialog);
}

// attach all event listeners
function setEventListeners() {
    document.querySelector(".menu").addEventListener("click", handleMenuClick);
    document.getElementById("cartItems").addEventListener("click", handleCartClick);
    document.getElementById("dialogCartItems").addEventListener("click", handleCartClick);
    document.getElementById("cartBuyNow").addEventListener("click", buyNow);
    document.getElementById("closeCartDialog").addEventListener("click", closeCartDialog);
    document.getElementById("cartDialog").addEventListener("click", handleDialogBackdropClick);
}

// handle clicks on addtobasket buttons
function handleMenuClick(event) {
    const button = event.target.closest(".addToBasketButton");
    if (button) {
        const dishId = Number(button.dataset.id);
        addToCart(dishId);
    }
}

// handle increase decrease and remove in cart
function handleCartClick(event) {
    const button = event.target.closest("button");
    if (!button) return;

    const cartItem = button.closest(".cartItem");
    if (!cartItem) return;

    const dishId = Number(cartItem.dataset.id);
    const action = button.dataset.action;

    if (action === "increase") changeQuantity(dishId, 1);
    else if (action === "decrease") changeQuantity(dishId, -1);
    else if (action === "remove") removeFromCart(dishId);
}

// add dish to cart or increase quantity
function addToCart(dishId) {
    const dish = menu.flatMap(category => category.dishes).find(dish => dish.id === dishId);
    if (!dish) return;

    const existingItem = cart.find(item => item.dish.id === dishId);
    if (existingItem) existingItem.quantity++;
    else cart.push({ dish, quantity: 1 });

    renderCart();
}

// remove dish completely from cart
function removeFromCart(dishId) {
    cart = cart.filter(item => item.dish.id !== dishId);
    renderCart();
}

// change quantity or remove if zero
function changeQuantity(dishId, delta) {
    const item = cart.find(item => item.dish.id === dishId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(dishId);
    } else {
        renderCart();
    }
}

// render menu categories and dishes
function renderMenu() {
    const menuContainer = document.querySelector(".menu");
    menuContainer.innerHTML = "";

    menu.forEach(category => {
        const section = document.createElement("section");
        section.className = "category";
        section.id = category.id;
        section.innerHTML = getCategorySectionHtml(category);
        const dishList = section.querySelector(".dishList");
        dishList.innerHTML = category.dishes
            .map(dish => getDishCardHtml(dish, formatPrice(dish.price)))
            .join("");
        menuContainer.appendChild(section);
    });
}

// render desktop cart and update related components
function renderCart() {
    const cartList = document.getElementById("cartItems");
    const emptyMessage = '<li class="cartEmptyMessage">Dein Warenkorb ist noch leer.</li>';

    cartList.innerHTML = cart.length === 0
        ? emptyMessage
        : cart.map(item => getCartItemHtml(item, formatPrice(item.dish.price * item.quantity))).join("");

    updateTotals('cart');
    renderCartDialog();
    updateAddButtons();
    renderMobileNav();
}

// render mobile cart dialog content
function renderCartDialog() {
    const dialog = document.getElementById("cartDialog");
    const emptyMessage = '<li class="cartEmptyMessage">Dein Warenkorb ist noch leer.</li>';

    dialog.querySelector("#dialogCartItems").innerHTML = cart.length === 0
        ? emptyMessage
        : cart.map(item => getCartItemHtml(item, formatPrice(item.dish.price * item.quantity))).join("");

    updateTotals('dialog');

    const buyNowBtn = document.getElementById("dialogBuyNow");
    if (buyNowBtn) buyNowBtn.addEventListener("click", buyNow);
}

// update totals and order button label
function updateTotals(prefix) {
    const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
    const total = subtotal + restaurant.deliveryFee;
    const label = cart.length > 0 ? `Jetzt bestellen (${formatPrice(total)})` : "Jetzt bestellen";

    document.getElementById(`${prefix}Subtotal`).textContent = formatPrice(subtotal);
    document.getElementById(`${prefix}Total`).textContent = formatPrice(total);
    document.getElementById(`${prefix}BuyNow`).textContent = label;

    if (prefix === 'dialog') {
        document.getElementById("dialogDeliveryFee").textContent = formatPrice(restaurant.deliveryFee);
    }
}

// update menu buttons to show quantity in cart
function updateAddButtons() {
    document.querySelectorAll(".addToBasketButton").forEach(button => {
        const dishId = Number(button.dataset.id);
        const cartItem = cart.find(item => item.dish.id === dishId);

        if (cartItem) {
            button.textContent = `${cartItem.quantity} im Warenkorb`;
            button.classList.add("addedToBasket");
        } else {
            button.textContent = "In den Warenkorb";
            button.classList.remove("addedToBasket");
        }
    });
}

// place order and show confirmation
function buyNow() {
    if (cart.length === 0) return;
    cart = [];
    renderCart();
    closeCartDialog();
    showOrderConfirmed();
}

// open mobile cart dialog
function openCartDialog() {
    document.getElementById("cartDialog").showModal();
}

// close mobile cart dialog
function closeCartDialog() {
    const dialog = document.getElementById("cartDialog");
    if (dialog.open) dialog.close();
}

// close dialog on backdrop click
function handleDialogBackdropClick(event) {
    const dialog = document.getElementById("cartDialog");
    if (event.target === dialog) {
        dialog.close();
    }
}

// show order confirmation and auto close
function showOrderConfirmed() {
    document.getElementById("orderConfirmedDialog").showModal();
    setTimeout(() => {
        document.getElementById("orderConfirmedDialog").close();
    }, 4000);
}

// format price
function formatPrice(price) {
    return price.toFixed(2).replace(".", ",") + "€";
}
