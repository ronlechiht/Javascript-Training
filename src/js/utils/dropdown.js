import { createElement } from "./dom";

export const createDropdownBtn = () => {
  let dropdownBtn = createElement("div", "dropdown-btn");
  let dot1 = createElement("div", "dot");
  let dot2 = createElement("div", "dot");
  let dot3 = createElement("div", "dot");
  dropdownBtn.append(dot1, dot2, dot3);
  dropdownBtn.onclick = (e) => {
    let clickedDropdownBtn = e.target.closest(".dropdown-btn");
    if (!clickedDropdownBtn.nextElementSibling.classList[1]) {
      //Hide another dropdown menu if exist
      let existDropdownMenu = document.querySelector(
        ".dropdown-menu.visibility-visible",
      );
      if (existDropdownMenu)
        existDropdownMenu.classList.remove("visibility-visible");
      //Display clicked dropdown menu
      clickedDropdownBtn.nextElementSibling.classList.add("visibility-visible");
    } else {
      clickedDropdownBtn.nextElementSibling.classList.remove(
        "visibility-visible",
      );
    }
  };
  return dropdownBtn;
};

export const createDropdownMenu = () => {
  let dropdownMenu = createElement("ul", "dropdown-menu");
  let editOption = createElement("li", "edit-customer");
  editOption.innerHTML = "Edit";
  editOption.onclick = "openEditModal()";
  let removeOption = createElement("li", "remove-customer");
  removeOption.innerHTML = "Remove";
  dropdownMenu.append(editOption, removeOption);
  return dropdownMenu;
};
