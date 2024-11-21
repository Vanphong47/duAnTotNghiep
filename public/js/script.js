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
