const input = document.getElementById("todo-input");
const add_button = document.getElementById("add-button");
const list = document.getElementById("todo-list");
let list_id = 0;

// 編集ボタンを作成する関数
const createEditButton = (li, span) => {
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.textContent = "編集する";

  // 編集に切り替える処理
  const toEditMode = () => {
    if (li.querySelector("input")) return;
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = span.textContent;
    editButton.textContent = "保存する";
    editButton.onclick = toSaveMode;
    li.replaceChild(editInput, span);
    editInput.focus();
  };

  // 保存に切り替える処理
  const toSaveMode = () => {
    const editInput = li.querySelector("input");
    if (!editInput) return;
    if (!editInput.value.trim()) {
      alert("文字を入力してください");
      editInput.focus();
      return;
    }
    span.textContent = editInput.value;
    li.replaceChild(span, editInput);
    editButton.textContent = "編集する";
    editButton.onclick = toEditMode;
  };

  editButton.onclick = toEditMode;
  return editButton;
};

// ToDoアイテムを作成する関数
const createTodoItem = (text) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  li.appendChild(span);
  li.appendChild(createEditButton(li, span));
  li.appendChild(createDeleteButton(li));
  return li;
};

// 削除ボタンを作成する関数
const createDeleteButton = (parent) => {
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "削除する";
  deleteButton.addEventListener("click", () => {
    parent.remove();
  });
  return deleteButton;
};

// 追加ボタンのクリックイベント
add_button.addEventListener("click", () => {
  const text = input.value;
  if (!text) {
    alert("文字を入力してください");
    return;
  }
  list.appendChild(createTodoItem(text));
  input.value = "";
});
