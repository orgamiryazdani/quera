const leftSide = document.querySelector(".left-side");
const rightSide = document.querySelector(".right-side");

// InitialValues
let leftList = [
  { id: "item1", checked: false, title: "PHP" },
  { id: "item2", checked: false, title: "Python" },
  { id: "item3", checked: false, title: "Ruby" },
  { id: "item4", checked: false, title: "C++" },
];
let rightList = [
  { id: "item5", checked: false, title: "HTML" },
  { id: "item6", checked: false, title: "Css" },
  { id: "item7", checked: false, title: "JavaScript" },
  { id: "item8", checked: false, title: "Java" },
];

renderDom(leftList, rightList);

// Render Dom
function renderDom(leftListToRender, rightListToRender) {
  clearDom()
  leftListToRender.forEach((item) => {
    leftSide.innerHTML += `<div class="box">
        <input type="checkbox" class="input-box" id="${item.id}" />
        <label for="${item.id}">${item.title}</label>
        </div>`;
  });

  rightListToRender.forEach((item) => {
    rightSide.innerHTML += `<div class="box">
          <input type="checkbox" class="input-box" id="${item.id}" />
          <label for="${item.id}">${item.title}</label>
          </div>`;
  });

  const box = document.querySelectorAll(".input-box");
  const checkedToRight = document.querySelector(".checked-to-right");
  const allToRight = document.querySelector(".all-to-right");
  const checkedToLeft = document.querySelector(".checked-to-left");
  const allToLeft = document.querySelector(".all-to-left");

  box.forEach((item) => {
    item.addEventListener("click", () => {
      [...leftList, ...rightList].forEach((itemList) => {
        if (item.id === itemList.id) {
          if (item.checked) {
            itemList.checked = true;
          } else {
            itemList.checked = false;
          }
        }
      });
    });
  });


  if (leftList.length === 0) {
    checkedToRight.classList.add('disabled')
    checkedToRight.disabled = true
    allToRight.classList.add('disabled')
    allToRight.disabled = true
  } else {
    checkedToRight.classList.remove('disabled')
    checkedToRight.disabled = false
    allToRight.classList.remove('disabled')
    allToRight.disabled = false
  }

  if (rightList.length === 0) {
    checkedToLeft.classList.add('disabled')
    checkedToLeft.disabled = true
    allToLeft.classList.add('disabled')
    allToLeft.disabled = true
  } else {
    checkedToLeft.classList.remove('disabled')
    checkedToLeft.disabled = false
    allToLeft.classList.remove('disabled')
    allToLeft.disabled = false
  }


  checkedToRight.addEventListener("click", () => {
    let filteredListCheck = leftList.filter(
      (itemList) => itemList.checked
    );
    let filteredList = leftList.filter(
      (itemList) => itemList.checked == false
    );
    if (filteredListCheck.length > 0) {
      leftList = filteredList
      rightList.push(...filteredListCheck)
      renderDom(leftList, rightList)
      rightList.forEach((itemList) => {
        itemList.checked = false;
      });
    }

  })

  allToRight.addEventListener("click", () => {
    if (leftList.length > 0) {
      rightList.push(...leftList)
      leftList = []
      renderDom(leftList, rightList)
    }
  })

  checkedToLeft.addEventListener("click", () => {
    let filteredListCheck = rightList.filter(
      (itemList) => itemList.checked
    );
    let filteredList = rightList.filter(
      (itemList) => itemList.checked == false
    );
    if (filteredListCheck.length > 0) {
      rightList = filteredList
      leftList.push(...filteredListCheck)
      renderDom(leftList, rightList)
      leftList.forEach((itemList) => {
        itemList.checked = false;
      });
    }
  })

  allToLeft.addEventListener("click", () => {
    if (rightList.length > 0) {
      leftList.push(...rightList)
      rightList = []
      renderDom(leftList, rightList)
    }
  })

  registerEvents();
}

// Clear Dom
function clearDom() {
  document.querySelectorAll(".side").forEach((el) => {
    el.innerHTML = "";
  });
}

// Event
function registerEvents() { }