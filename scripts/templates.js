function getRestaurantInfoHtml(nameFirst, nameSecond, formattedRating, reviewCount) {
    return `
        <h1 class="restaurantName">
            <span class="nameAccent">${nameFirst}</span><span class="nameDark">${nameSecond}</span>
        </h1>
        <div class="rating">★ ${formattedRating} <span class="reviewCount">(${reviewCount})</span></div>
    `;
}

function getCategoryLinkHtml(category) {
    return `<a href="#${category.id}">${category.name}</a>`;
}

function getMobileNavHtml(homeActiveClass, burgerActiveClass, badgeHtml) {
    return `
        <a href="index.html" class="mobileNavButton ${homeActiveClass}">
            <img src="img/Home.png" alt="" class="navIconImg" aria-hidden="true" />
            <span class="navLabel">Home</span>
        </a>
        <a href="reviews.html" class="mobileNavButton">
            <img src="img/Profile.png" alt="" class="navIconImg" aria-hidden="true" />
            <span class="navLabel">Bewertungen</span>
        </a>
        <a href="index.html#burger" class="mobileNavButton ${burgerActiveClass}">
            <img src="img/orders.png" alt="" class="navIconImg" aria-hidden="true" />
            <span class="navLabel">Menü</span>
        </a>
        <button class="mobileNavButton" type="button" id="mobileNavCartButton" aria-label="Warenkorb">
            ${badgeHtml}
            <img src="img/basket.png" alt="" class="navIconImg" aria-hidden="true" />
            <span class="navLabel">Warenkorb</span>
        </button>
    `;
}

function getCategorySectionHtml(category) {
    return `
        <div class="categoryHeader">
            <span aria-hidden="true">${category.icon}</span>
            <h2>${category.name}</h2>
        </div>
        <ul class="dishList"></ul>
    `;
}

function getDishCardHtml(dish, formattedPrice) {
    return `
        <li class="dishCard">
            <img class="dishImage" src="${dish.image}" alt="${dish.name}"/>
            <div class="dishInfo">
                <div class="dishHeader">
                    <h3 class="dishName">${dish.name}</h3>
                    <span class="dishPrice">${formattedPrice}</span>
                </div>
                <p class="dishDescription">${dish.description}</p>
                <button class="addToBasketButton" type="button" data-id="${dish.id}">In den Warenkorb</button>
            </div>
        </li>
    `;
}

function getCartItemHtml(item, formattedTotalPrice) {
    return `
        <li class="cartItem" data-id="${item.dish.id}">
            <div class="cartItemName">${item.quantity} x ${item.dish.name}</div>
            <div class="cartItemBottom">
                <div class="cartItemControls">
                    <button type="button" class="quantityButton" data-action="decrease" aria-label="Menge verringern / löschen">🗑</button>
                    <span class="cartItemQuantity">${item.quantity}</span>
                    <button type="button" class="quantityButton" data-action="increase" aria-label="Menge erhöhen">+</button>
                </div>
                <div class="cartItemPrice">${formattedTotalPrice}</div>
            </div>
        </li>
    `;
}

function getReviewCardHtml(review, starsHtml) {
    return `
        <li class="reviewCard">
          <div class="reviewHeader">
            <strong class="reviewName">${review.name}</strong>
            <span class="reviewRating">${starsHtml}</span>
          </div>
          <p class="reviewText">${review.text}</p>
          <span class="reviewDate">${review.date}</span>
        </li>
    `;
}
