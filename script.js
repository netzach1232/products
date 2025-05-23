document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const allProducts = Array.from(document.querySelectorAll("#allProducts .product"));
    const noResultsMessage = document.getElementById("noResultsMessage");

    // טוען חיפוש שמור
    const savedSearch = localStorage.getItem("savedSearch");
    if (savedSearch) {
        searchInput.value = savedSearch;
        triggerSearch();
    }

    // שומר חיפוש בהקלדה
    searchInput.addEventListener("input", () => {
        localStorage.setItem("savedSearch", searchInput.value);
    });

    // לחיצת אנטר
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            triggerSearch();
        }
    });
});

// מופעל גם מהאייקון
function triggerSearch() {
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.trim().toLowerCase();
    const allProducts = Array.from(document.querySelectorAll("#allProducts .product"));
    const noResultsMessage = document.getElementById("noResultsMessage");

    let found = false;

    allProducts.forEach(product => {
        const name = product.querySelector(".product-name").textContent.toLowerCase();
        const description = product.getAttribute("data-description").toLowerCase();

        if (name.includes(query) || description.includes(query)) {
            product.style.display = "block";
            if (!found) {
                found = true;
                // גלילה למוצר הראשון שנמצא
                product.scrollIntoView({ behavior: "smooth", block: "center" });

                // ניקוי שדה החיפוש
                searchInput.value = "";
                localStorage.removeItem("savedSearch");
            }
        } else {
            product.style.display = "none";
        }
    });

    // תוצאה או הודעה
    if (!found) {
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
    }
}

function toggleAbout() {
    const banner = document.getElementById("aboutBanner");

    if (banner.style.display === "none" || banner.style.display === "") {
        banner.style.display = "block";
        // מונע גלילה ברקע כשהבאנר פתוח (אופציונלי)
        document.body.style.overflow = "hidden";
    } else {
        banner.style.display = "none";
        document.body.style.overflow = ""; // מחזיר גלילה
    }
}


function triggerSearch() {
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.trim().toLowerCase();
    const allProducts = Array.from(document.querySelectorAll("#allProducts .product"));
    const noResultsMessage = document.getElementById("noResultsMessage");
    const backToAllWrapper = document.getElementById("backToAllWrapper");

    let found = false;

    allProducts.forEach(product => {
        const name = product.querySelector(".product-name").textContent.toLowerCase();
        const description = product.getAttribute("data-description").toLowerCase();

        if (name.includes(query) || description.includes(query)) {
            product.style.display = "block";
            if (!found) {
                found = true;
                product.scrollIntoView({ behavior: "smooth", block: "center" });

                searchInput.value = "";
                localStorage.removeItem("savedSearch");
            }
        } else {
            product.style.display = "none";
        }
    });

    // הצגת הודעת אין תוצאות
    noResultsMessage.style.display = found ? "none" : "block";

    // ✅ חשוב: מציג את כפתור החזרה אחרי חיפוש
    backToAllWrapper.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.getElementById("backToAllBtn");
    const allProducts = Array.from(document.querySelectorAll("#allProducts .product"));
    const noResultsMessage = document.getElementById("noResultsMessage");
    const backToAllWrapper = document.getElementById("backToAllWrapper");
    const searchInput = document.getElementById("searchInput");

    backBtn.addEventListener("click", () => {
        allProducts.forEach(p => p.style.display = "block");
        noResultsMessage.style.display = "none";
        backToAllWrapper.style.display = "none";
        searchInput.value = "";
        localStorage.removeItem("savedSearch");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll("#allProducts .product");

    products.forEach(product => {
        product.addEventListener("click", () => {
            const name = product.querySelector(".product-name").textContent;
            const description = product.getAttribute("data-description");
            const price = product.getAttribute("data-price");
            const imageSrc = product.querySelector("img").getAttribute("src");

            // מציב את המידע בבאנר
            document.getElementById("previewName").textContent = name;
            document.getElementById("previewDescription").textContent = description;
            document.getElementById("previewPrice").textContent = "₪" + price;
            document.getElementById("previewImage").setAttribute("src", imageSrc);
            document.getElementById("previewImage").setAttribute("alt", name);

            // מציג את הבאנר
            document.getElementById("productPreviewBanner").style.display = "flex";
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const backToTopBtn = document.getElementById("backToTop");

    // מאזין לגלילה
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // לחיצה על הכפתור כבר קיימת ב-HTML שלך: onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
});

function proceedToOrder() {
    // לוקח את שם המוצר מהבאנר של התיאור
    const productName = document.getElementById("previewName").textContent;

    // מזין את שם המוצר לשדה הנסתר בטופס ההזמנה
    document.getElementById("selectedProductInput").value = productName;

    // מציג את טופס ההזמנה
    document.getElementById("orderFormModal").style.display = "flex";

    // מסתיר את באנר התיאור
    document.getElementById("productPreviewBanner").style.display = "none";
}

function proceedToOrder() {
    const productName = document.getElementById("previewName").textContent;
    const quantity = document.getElementById("productQuantity").value;

    // מציג את עיגול הטעינה
    const spinner = document.getElementById("loadingSpinner");
    spinner.style.display = "block";

    // מחכה 1.5 שניות ואז עובר לטופס
    setTimeout(() => {
        spinner.style.display = "none";

        // ממלא את הטופס עם פרטי המוצר והכמות
        document.getElementById("selectedProductInput").value = productName + " (כמות: " + quantity + ")";

        // מציג את טופס ההזמנה
        document.getElementById("orderFormModal").style.display = "flex";

        // מסתיר את באנר התצוגה
        document.getElementById("productPreviewBanner").style.display = "none";
    }, 400); // זמן טעינה – אפשר לשנות
}

