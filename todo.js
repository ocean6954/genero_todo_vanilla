const input = document.getElementById("todo-input");
const add_button = document.getElementById("add-button");
const list = document.getElementById("todo-list");
let list_id = 0;

// ToDoアイテムを作成する関数
const createTodoItem = (text, checked = false) => {
  const li = document.createElement("li");
  li.className = "list-group-item todo-item d-flex align-items-center";

  const checkBox = createCheckBox();
  checkBox.checked = checked;

  const span = document.createElement("span");
  span.className = "todo-text flex-grow-1 ms-3";
  span.textContent = text;

  const editBtn = createEditButton(li, span);
  const delBtn = createDeleteButton(li);

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "todo-actions";
  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(delBtn);

  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(buttonGroup);

  // チェックボックスの表示制御
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      span.classList.add("completed");
      buttonGroup.style.display = "none";
    } else {
      span.classList.remove("completed");
      buttonGroup.style.display = "";
    }
  });

  // 初期状態の設定
  if (checked) {
    checkBox.checked = true;
    checkBox.classList.add("checked");
    span.classList.add("completed");
    buttonGroup.style.display = "none";
  }

  return li;
};

// 編集ボタンを作成する関数
const createEditButton = (li, span) => {
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "action-btn edit-btn";
  editButton.textContent = "Edit";

  // 編集に切り替える処理
  const toEditMode = () => {
    if (li.querySelector('input[type="text"]')) return;

    const checkBox = li.querySelector('input[type="checkbox"]');
    if (checkBox) checkBox.style.display = "none";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "form-control edit-input";
    editInput.value = span.textContent;

    editButton.textContent = "Save";
    editButton.className = "action-btn save-btn";
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

    editButton.textContent = "Edit";
    editButton.className = "action-btn edit-btn";
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
  deleteButton.className = "action-btn delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    parent.remove();
  });
  return deleteButton;
};

// カスタムチェックボックスを作成する関数
const createCheckBox = () => {
  const checkBox = document.createElement("div");
  checkBox.className = "custom-checkbox";
  checkBox.addEventListener("click", () => {
    checkBox.checked = !checkBox.checked;
    if (checkBox.checked) {
      checkBox.classList.add("checked");
    } else {
      checkBox.classList.remove("checked");
    }
    // チェンジイベントをトリガー
    const event = new Event("change");
    checkBox.dispatchEvent(event);
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
