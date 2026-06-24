function renderReviews() {
    const list = document.getElementById("reviewList");
    list.innerHTML = reviews.map(review => {
        const starsHtml = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
        return getReviewCardHtml(review, starsHtml);
    }).join("");
}
