const searchInput = document.querySelector(".search-box input");
const shopCards = document.querySelectorAll(".shop-card");

/* البحث */

searchInput.addEventListener("keyup", function () {

    let value = searchInput.value.toLowerCase();

    shopCards.forEach(function (card) {

        let shopName = card.querySelector("h3").textContent.toLowerCase();

        if (shopName.includes(value)) {
            card.parentElement.style.display = "block";
        } else {
            card.parentElement.style.display = "none";
        }

    });

});

/* التصنيفات */

const categories = document.querySelectorAll(".category");

categories.forEach(function (category) {

    category.addEventListener("click", function () {

        let selectedCategory = category.textContent;

        shopCards.forEach(function (card) {

            let cardCategory = card.dataset.category;

            if (
                selectedCategory === "الكل" ||
                cardCategory === selectedCategory
            ) {
                card.parentElement.style.display = "block";
            } else {
                card.parentElement.style.display = "none";
            }

        });

    });

});

/* السلايدر */

const shops = document.getElementById("shops");

function scrollRightBtn() {
    shops.scrollBy({
        left: 320,
        behavior: "smooth"
    });
}

function scrollLeftBtn() {
    shops.scrollBy({
        left: -320,
        behavior: "smooth"
    });
}

/* تكبير الكارت الموجود في المنتصف */

function updateActiveCard() {

    const cards = document.querySelectorAll(".shop-card");

    let center = shops.scrollLeft + (shops.offsetWidth / 2);

    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach(function (card) {

        let cardCenter =
            card.offsetLeft + (card.offsetWidth / 2);

        let distance =
            Math.abs(center - cardCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }

        card.classList.remove("active");

    });

    if (closestCard) {
        closestCard.classList.add("active");
    }

}

shops.addEventListener("scroll", updateActiveCard);

/* عند فتح الصفحة */

window.addEventListener("load", () => {

    shops.scrollLeft = 0;

    const cards = document.querySelectorAll(".shop-card");

    cards.forEach(card => {
        card.classList.remove("active");
    });

    if (cards.length > 0) {
        cards[0].classList.add("active");
    }

});

/* إضافة التصنيف تلقائياً على الكروت */

document.querySelectorAll(".shop-card").forEach(card => {

    const category = card.dataset.category;

    const badge = document.createElement("span");

    badge.classList.add("category-badge");

    badge.textContent = category;

    if (category === "مطاعم")
        badge.style.background = "#ff6b35";

    if (category === "جزارة")
        badge.style.background = "#e63946";

    if (category === "صيدليات")
        badge.style.background = "#2ecc71";

    if (category === "سوبر ماركت")
        badge.style.background = "#f1c40f";

    if (category === "مستلزمات منزلية")
        badge.style.background = "#9b59b6";

    if (category === "محلات أخرى")
        badge.style.background = "#3498db";

    card.prepend(badge);

});

document.querySelector(".next").addEventListener("click", scrollRightBtn);
document.querySelector(".prev").addEventListener("click", scrollLeftBtn);


function getLocation() {

    if (!navigator.geolocation) {
        alert("المتصفح لا يدعم تحديد الموقع");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            window.location.href =
                `https://www.google.com/maps?q=${lat},${lng}`;

        },
        function(error) {

            alert(
                "يرجى فتح الموقع في متصفح Chrome أو Safari للسماح بتحديد الموقع."
            );

        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}
