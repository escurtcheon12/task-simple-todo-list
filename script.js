const inputTodoList = document.getElementById("input-todo");
const inputSearchTodo = document.getElementById("input-search-todo");
const buttonAddTodoList = document.getElementById("button-todo-add");
const buttonSearchTodo = document.getElementById("button-search-todo");
const containerTodoList = document.getElementById("container-todolist");

let dataTodo = [];
let id = 1;

/* Add todo */
const addTodoList = () => {
  let data = {
    id,
    value: inputTodoList.value,
    checked: false,
  };

  dataTodo.push(data);
  id += 1;
  inputTodoList.value = "";
  renderDataTodolist(dataTodo);
};

const deleteTodoList = (index) => {
  dataTodo.splice(index, 1);
  renderDataTodolist(dataTodo);
};

/* Update todo */
const updateTodoList = (index, value) => {
  const editTodoList = prompt("Enter your new value", value);

  if (editTodoList) dataTodo[index]["value"] = editTodoList;

  renderDataTodolist(dataTodo);
};

/* Searching todo */
const searchTodoList = () => {
  let data = dataTodo.filter((item) => {
    if (
      inputSearchTodo.value.trim() !== "" &&
      item.value &&
      inputSearchTodo.value
    ) {
      return item.value
        .toLowerCase()
        .trim()
        .includes(inputSearchTodo.value.toLowerCase().trim());
    }
    return dataTodo;
  });

  renderDataTodolist(data);
};

/* Checkbox to incorrect / correct todo */
const checkboxTodoList = (index, checkboxElement, inputElement) => {
  if (checkboxElement) {
    if (checkboxElement.checked) {
      inputElement.innerHTML = `<s>${inputElement.textContent}</s>`;
      dataTodo[index]["checked"] = true;
    } else {
      inputElement.innerHTML = inputElement.textContent;
      dataTodo[index]["checked"] = false;
    }
  }
};

/* Create button to avoid repetition logic */
const createButtonTodoList = (icon, button_description) => {
  const button = document.createElement("button");
  button.innerHTML = icon;
  button.classList.add(`btn`, button_description);

  return button;
}

/* Display todo */
function renderDataTodolist(data) {
  containerTodoList.innerHTML = "";

  data.forEach((item, index) => {
    const cardTodoContainer = document.createElement("div");
    cardTodoContainer.classList.add("card-todolist");

    const leftCardGroupContainer = document.createElement("div");
    leftCardGroupContainer.classList.add("left-group-card-todolist");

    const checkboxTodo = document.createElement("input");
    checkboxTodo.type = "checkbox";

    const paragraphTodoValue = document.createElement("p");
    paragraphTodoValue.textContent = item.value;

    const rightCardGroupContainer = document.createElement("div");
    rightCardGroupContainer.classList.add(`right-group-card-todolist`);

    const buttonDelete = createButtonTodoList(
      "<i class='fa-solid fa-trash'></i>",
      "button-delete"
    );
    const buttonUpdate = createButtonTodoList(
      "<i class='fa-solid fa-pencil'></i>",
      "button-edit"
    );

    checkboxTodo.addEventListener("change", () =>
      checkboxTodoList(index, checkboxTodo, paragraphTodoValue)
    );
    buttonDelete.addEventListener("click", () => deleteTodoList(index));
    buttonUpdate.addEventListener("click", () =>
      updateTodoList(index, item.value)
    );

    cardTodoContainer.appendChild(leftCardGroupContainer);
    leftCardGroupContainer.appendChild(checkboxTodo);
    leftCardGroupContainer.appendChild(paragraphTodoValue);

    if (item.checked) {
      checkboxTodo.checked = item.checked;
      paragraphTodoValue.innerHTML = `<s>${paragraphTodoValue.textContent}</s>`;
    }

    cardTodoContainer.appendChild(rightCardGroupContainer);
    rightCardGroupContainer.appendChild(buttonUpdate);
    rightCardGroupContainer.appendChild(buttonDelete);
    containerTodoList.appendChild(cardTodoContainer);
  });
}

buttonAddTodoList.addEventListener("click", () => {
  if (inputTodoList.value != "") {
    addTodoList();
  }
});

buttonSearchTodo.addEventListener("click", () => {
  searchTodoList();
});
