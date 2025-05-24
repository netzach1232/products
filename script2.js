document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summary = document.getElementById("cartSummary");
    const qtyEl = document.getElementById("totalQuantity");
    const amountEl = document.getElementById("totalAmount");

    if (!summary || cart.length === 0) {
        if (summary) summary.style.display = "none";
        return;
    }

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    qtyEl.textContent = `🛒 ${totalQuantity} פריטים`;
    amountEl.textContent = `₪${totalAmount.toFixed(2)} לתשלום`;

    summary.style.display = "flex";
});

function proceedToCheckout() {
    alert("נמשיך לעמוד תשלום או טופס...");
    // window.location.href = "checkout.html";
}

function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const qtyEl = document.getElementById("totalQuantity");
    const amountEl = document.getElementById("totalAmount");
    const summary = document.getElementById("cartSummary");

    if (!summary || cart.length === 0) {
        if (summary) summary.style.display = "none";
        return;
    }

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    qtyEl.textContent = `🛒 ${totalQuantity} פריטים`;
    amountEl.textContent = `₪${totalAmount.toFixed(2)} לתשלום`;

    summary.style.display = "flex";
}

