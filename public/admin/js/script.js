// Button status thêm sửa xóa
const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  let url = new URL(window.location.href); // tạo đường link gửi lên be

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href; // chuyển hướng lại sang link đã tạo
    });
  });
}
// hết thêm sửa xóa

// Form Search

const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}

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

// Button change status
const buttonChange = document.querySelectorAll("[button-change-status]");
if (buttonChange.length > 0) {
  const formChangeStatus = document.querySelector("[form-change-status ]");
  const dataPath = formChangeStatus.getAttribute("data-path");
  buttonChange.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurren = button.getAttribute("data-status");
      const dataId = button.getAttribute("data-id");

      const statusChange = statusCurren == "active" ? "inactive" : "active";

      const action = `${dataPath}/${statusChange}/${dataId}?_method=PATCH`; //them duoi ?_metho=patch de submit form = phuong thuc patch
      formChangeStatus.action = action;
      formChangeStatus.submit();
    });
  });
}

// End button change status

// Check box multi
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
  const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']");
  const inputsId = checkBoxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkBoxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;

      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End checkbox multi

// Form changeMulti
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();
    const type = event.target.elements.type.value;
    if (type == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");
      if (!isConfirm) {
        return;
      }
    }
    const inputsChecked = document.querySelectorAll("input[name='id']:checked");
    if (inputsChecked.length > 0) {
      const ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputsChecked.forEach((input) => {
        const id = input.value;
        if (type == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });
      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi");
    }
  });
}
// End Form changeMulti

// Delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
console.log(buttonDelete);
if (buttonDelete.length > 0) {
  const deleteItem = document.querySelector("[form-delete-item]");
  const path = deleteItem.getAttribute("data-path");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa bản ghi này ??");
      if (isConfirm == true) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;
        deleteItem.action = action;
        deleteItem.submit();
      }
    });
  });
}
// end delete item

const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert

// Preview Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]"
  );

  uploadImageInput.addEventListener("change", (event) => {
    const [file] = uploadImageInput.files;
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// End Preview Image
// Sort
const sort = document.querySelector("[sort]");
if (sort) {
  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");

  // Sắp xếp
  sortSelect.addEventListener("change", () => {
    const [sortKey, sortValue] = sortSelect.value.split("-");

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href;
  });

  // Xóa sắp xếp
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");

    window.location.href = url.href;
  });

  // Thêm selected cho option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  if (sortKey && sortValue) {
    const string = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(
      `option[value="${string}"]`
    );
    optionSelected.selected = true;
    // optionSelected.setAttribute("selected", true);
  }
}
// End Sort

// permissions
const tablePermissions = document.querySelector("[table-permissions]");
// Submit Data
if (tablePermissions) {
  // Submit Data
  const buttomSubmit = document.querySelector("[button-submit]");
  buttomSubmit.addEventListener("click", () => {
    const roles = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          roles.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          if (input.checked) {
            roles[index].permissions.push(name);
          }
        });
      }
    });
    const formChangePermissions = document.querySelector(
      "[form-change-permissions]"
    );
    const inputRoles = formChangePermissions.querySelector(
      "input[name='roles']"
    );
    inputRoles.value = JSON.stringify(roles);
    formChangePermissions.submit();
  });

  //Data Default
  const divRecords = document.querySelector("[data-records]");
  if (divRecords) {
    const records = JSON.parse(divRecords.getAttribute("data-records"));
    records.forEach((record, index) => {
      const permissions = record.permissions;

      permissions.forEach((permission) => {
        const row = tablePermissions.querySelector(
          `[data-name="${permission}"]`
        );
        const input = row.querySelectorAll("input")[index];
        input.checked = true;
      });
    });
  }
}
//end permissions
