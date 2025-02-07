console.log("okeee");
// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const pages = button.getAttribute("button-pagination");
      url.searchParams.set("page", pages);
      window.location.href = url.href;
    });
  });
}
// end Pagination

// Thanh tìm kiếm search

const search = document.querySelector(".open-search");
const searchHeader = document.querySelector(".open-search-header");

const toggole = () => {
  searchHeader.classList.toggle("hidden");
};
search.addEventListener("click", toggole);

searchHeader.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) {
    toggole();
  }
});

// end search

// table-cart
const tableCart = document.querySelector("[table-cart]");
if (tableCart) {
  const inputQuantity = tableCart.querySelectorAll("input[name='quantity']");
  inputQuantity.forEach((input) => {
    input.addEventListener("change", () => {
      const productId = input.getAttribute("item-id");
      const quantity = input.value;
      window.location.href = `/cart/update/${productId}/${quantity}`;
    });
  });
}
// end table-cart

// pay
const buttonPay = document.querySelector("#pay-check");
// const payMethod = document.querySelector('input[name="pay"]:checked').value;
// console.log("buttonPay", buttonPay);
// console.log("payMethod", payMethod);
buttonPay.addEventListener("click", (event) => {
  event.preventDefault();
  // if (payMethod === "1") {
  //   // Thanh toán trực tiếp
  //   window.location.href = `/checkout/order`; // Thay thế bằng link thực tế
  // } else {
  //   // Thanh toán online
  //   window.location.href = "/checkout/online-payment"; // Thay thế bằng link thực tế
  // }
  window.location.href = "/checkout/checkOrder";
});

//end pay
