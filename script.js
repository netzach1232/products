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


function addToCart() {
    const name = document.getElementById("previewName").textContent;
    const description = document.getElementById("previewDescription").textContent;
    const price = document.getElementById("previewPrice").textContent.replace("₪", "").trim();
    const quantity = parseInt(document.getElementById("productQuantity").value);
    const image = document.getElementById("previewImage").getAttribute("src");

    const product = {
        name,
        description,
        price: parseFloat(price),
        quantity,
        image
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅ מאפס את סגירת הסרגל – כך שתמיד יופיע שוב אחרי שמירה
    localStorage.setItem("cartBarClosed", "false");

    updateCartCount(); // מציג את הסרגל ומעדכן כמות

    // סגירת תצוגת המוצר
    document.getElementById("productPreviewBanner").style.display = "none";
}


document.addEventListener("DOMContentLoaded", () => {
    renderCartItems(); // זה ירנדר את הכל נכון, כולל הכפתורים
});


function updateQuantity(index, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity = parseInt(newQuantity);
    localStorage.setItem("cart", JSON.stringify(cart));

    // עדכון מיידי של תצוגת הסל והסרגל
    renderCartItems(); // מציג מחדש את כל המוצרים עם הכמות החדשה
    updateCartSummary(); // מעדכן את הסרגל למטה
}


function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();     // מציג את המוצרים מחדש
    updateCartSummary();   // מעדכן את הסרגל
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    // מספר בעיגול בסל למעלה
    const badge = document.getElementById("cartCount");
    if (badge) {
        badge.textContent = total;
        badge.style.display = total > 0 ? "inline-block" : "none";
    }

    // סרגל למטה
    const bar = document.getElementById("floatingCartBar");
    const text = document.getElementById("floatingCartText");
    const closed = localStorage.getItem("cartBarClosed") === "true";

    if (bar && text) {
        text.textContent = `🛒 ${total} מוצרים בסל`;
        // רק אם יש פריטים וטרם סגרו את הבר
        if (total > 0 && !closed) {
            bar.style.display = "flex";
        } else {
            bar.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.getElementById("closeFloatingBar");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            document.getElementById("floatingCartBar").style.display = "none";
            localStorage.setItem("cartBarClosed", "true");
        });
    }

    updateCartCount(); // מריץ בתחילת הדף
});


function renderCartItems() {
    const cartContainer = document.getElementById("cartItems");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `
  <div style="text-align: center; padding: 40px;">
    <p style="font-size: xx-large; font-weight: bolder; color: red; margin: 0;">הסל שלך ריק</p>
  </div>
`;
        updateCartSummary();
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.style = `
            margin-bottom: 20px;
            border: 1px solid #ccc;
            padding: 15px;
            border-radius: 8px;
            background: #fff;
            text-align:right;
        `;

        itemDiv.innerHTML = `
    <div style="display: flex; flex-direction: row-reverse; gap: 20px; align-items: flex-start; font-weight: bolder;
    font-size: large;">

       <img src="${item.image}" style="
    max-width: 40%;
    max-height: 40%;
    height: auto;
    width: auto;
    object-fit: contain;
    border-radius: 6px;
    flex-shrink: 0;
">
        <!-- תוכן בצד ימין -->
        <div style="flex: 1; text-align: right; direction: rtl;">

            <div style="font-weight: bold;">${item.name}</div>
            <div style="height: 1px; background-color: #e0e0e0; margin: 6px 0; max-width: 85px;
"></div>

            <div>${item.description}</div>
            <div style="height: 1px; background-color: #e0e0e0; margin: 6px 0; max-width: 250px;
"></div>

            <div>מחיר: ₪${item.price.toFixed(2)}</div>
            <div style="height: 1px; background-color: #e0e0e0; margin: 6px 0; max-width: 250px;"></div>

            <label>כמות:</label>
            <div style="display: flex; align-items: center; gap: 10px; margin: 10px 0;">
                <button onclick="changeQuantity(${index}, -1)" class="qty-btn">➖</button>
                <span id="qty-${index}" class="qty-display">${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)" class="qty-btn">➕</button>
            </div>

            <button onclick="removeItem(${index})" style=" font-weight: bolder; font-size: 18px; margin-top: 10px; color:rgb(0, 0, 0); border-radius: 20%;
   border: none; background-color:rgb(118, 202, 236);">הסר</button>

        </div>
    </div>
`;


        cartContainer.appendChild(itemDiv);
    });

    updateCartSummary();
}

function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let newQty = cart[index].quantity + delta;

    if (newQty < 1) return;

    cart[index].quantity = newQty;
    localStorage.setItem("cart", JSON.stringify(cart));

    renderCartItems();      // מציג את כל המוצרים מחדש
    updateCartSummary();    // מעדכן את הסרגל
}
