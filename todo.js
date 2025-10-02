const input = document.getElementById("todo-input");
const add_button = document.getElementById("add-button");
const list = document.getElementById("todo-list");
let list_id = 0;

// ToDoアイテムを作成する関数
const createTodoItem = (text) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  const checkBox = createCheckBox();
  const editBtn = createEditButton(li, span);
  const delBtn = createDeleteButton(li);
  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  // チェックボックスの表示制御
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      editBtn.style.display = "none";
      delBtn.style.display = "none";
    } else {
      editBtn.style.display = "";
      delBtn.style.display = "";
    }
  });
  return li;
};

// 編集ボタンを作成する関数
const createEditButton = (li, span) => {
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.textContent = "編集する";

  // 編集に切り替える処理
  const toEditMode = () => {
    if (li.querySelector('input[type="text"]')) return;
    const checkBox = li.querySelector('input[type="checkbox"]');
    if (checkBox) checkBox.style.display = "none";
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
    const editInput = li.querySelector("input[type='text']");
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
    const checkBox = li.querySelector('input[type="checkbox"]');
    if (checkBox) checkBox.style.display = "";
  };

  editButton.onclick = toEditMode;
  return editButton;
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

// チェックボックスを作成する関数（横線機能付き）
const createCheckBox = () => {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.addEventListener("change", (e) => {
    const li = checkBox.closest("li");
    if (li) {
      if (checkBox.checked) {
        li.style.textDecoration = "line-through";
      } else {
        li.style.textDecoration = "";
      }
    }
  });
  return checkBox;
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
