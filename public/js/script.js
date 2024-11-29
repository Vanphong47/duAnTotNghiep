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
