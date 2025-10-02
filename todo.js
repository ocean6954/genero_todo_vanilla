const input = document.getElementById("todo-input");
const add_button = document.getElementById("add-button");
const list = document.getElementById("todo-list");
let list_id = 0;

const createTodoItem = (text) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);
  li.appendChild(createDeleteButton(li));
  return li;
};

const createDeleteButton = (parent) => {
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "削除する";
  deleteButton.addEventListener("click", () => {
    parent.remove();
  });
  return deleteButton;
};

add_button.addEventListener("click", () => {
  const text = input.value;
  if (!text) {
    alert("文字を入力してください");
    return;
  }
  list.appendChild(createTodoItem(text));
  input.value = "";
});
