// DOM要素の取得
const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// CSSクラス名の定数
const CSS_CLASSES = {
  TODO_ITEM: "list-group-item todo-item d-flex align-items-center",
  TODO_TEXT: "todo-text flex-grow-1 ms-3",
  TODO_ACTIONS: "todo-actions",
  CUSTOM_CHECKBOX: "custom-checkbox",
  ACTION_BTN: "action-btn",
  EDIT_BTN: "edit-btn",
  SAVE_BTN: "save-btn",
  DELETE_BTN: "delete-btn",
  EDIT_INPUT: "form-control edit-input",
  COMPLETED: "completed",
  CHECKED: "checked",
};

// メッセージ定数
const MESSAGES = {
  EMPTY_INPUT: "文字を入力してください",
};

/**
 * ToDoアイテムを作成する関数
 * @param {string} text - タスクのテキスト
 * @param {boolean} checked - チェック状態
 * @returns {HTMLElement} - 作成されたli要素
 */
const createTodoItem = (text, checked = false) => {
  const li = document.createElement("li");
  li.className = CSS_CLASSES.TODO_ITEM;

  const checkBox = createCheckBox();
  checkBox.checked = checked;

  const span = document.createElement("span");
  span.className = CSS_CLASSES.TODO_TEXT;
  span.textContent = text;

  const editBtn = createEditButton(li, span);
  const delBtn = createDeleteButton(li);

  const buttonGroup = document.createElement("div");
  buttonGroup.className = CSS_CLASSES.TODO_ACTIONS;
  buttonGroup.appendChild(editBtn);
  buttonGroup.appendChild(delBtn);

  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(buttonGroup);

  // チェックボックスの状態変更時の処理
  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      span.classList.add(CSS_CLASSES.COMPLETED);
      buttonGroup.style.display = "none";
    } else {
      span.classList.remove(CSS_CLASSES.COMPLETED);
      buttonGroup.style.display = "";
    }
  });

  // 初期状態の設定
  if (checked) {
    checkBox.checked = true;
    checkBox.classList.add(CSS_CLASSES.CHECKED);
    span.classList.add(CSS_CLASSES.COMPLETED);
    buttonGroup.style.display = "none";
  }

  return li;
};

/**
 * 編集ボタンを作成する関数
 * @param {HTMLElement} li - 親要素
 * @param {HTMLElement} span - テキスト要素
 * @returns {HTMLElement} - 編集ボタン
 */
const createEditButton = (li, span) => {
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = `${CSS_CLASSES.ACTION_BTN} ${CSS_CLASSES.EDIT_BTN}`;
  editButton.textContent = "Edit";

  // 編集に切り替える処理
  const toEditMode = () => {
    if (li.querySelector('input[type="text"]')) return;

    const checkBox = li.querySelector('input[type="checkbox"]');
    if (checkBox) checkBox.style.display = "none";

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = CSS_CLASSES.EDIT_INPUT;
    editInput.value = span.textContent;

    editButton.textContent = "Save";
    editButton.className = `${CSS_CLASSES.ACTION_BTN} ${CSS_CLASSES.SAVE_BTN}`;

    // 既存のイベントリスナーを削除して新しいものを追加
    editButton.removeEventListener("click", toEditMode);
    editButton.addEventListener("click", toSaveMode);

    li.replaceChild(editInput, span);
    editInput.focus();
  };

  // 保存に切り替える処理
  const toSaveMode = () => {
    const editInput = li.querySelector("input[type='text']");
    if (!editInput) return;

    if (!editInput.value.trim()) {
      alert(MESSAGES.EMPTY_INPUT);
      editInput.focus();
      return;
    }

    span.textContent = editInput.value;
    li.replaceChild(span, editInput);

    editButton.textContent = "Edit";
    editButton.className = `${CSS_CLASSES.ACTION_BTN} ${CSS_CLASSES.EDIT_BTN}`;

    // 既存のイベントリスナーを削除して新しいものを追加
    editButton.removeEventListener("click", toSaveMode);
    editButton.addEventListener("click", toEditMode);

    const checkBox = li.querySelector('input[type="checkbox"]');
    if (checkBox) checkBox.style.display = "";
  };

  editButton.addEventListener("click", toEditMode);
  return editButton;
};

/**
 * 削除ボタンを作成する関数
 * @param {HTMLElement} parent - 削除対象の親要素
 * @returns {HTMLElement} - 削除ボタン
 */
const createDeleteButton = (parent) => {
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = `${CSS_CLASSES.ACTION_BTN} ${CSS_CLASSES.DELETE_BTN}`;
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    parent.remove();
  });
  return deleteButton;
};

/**
 * カスタムチェックボックスを作成する関数
 * @returns {HTMLElement} - カスタムチェックボックス
 */
const createCheckBox = () => {
  const checkBox = document.createElement("div");
  checkBox.className = CSS_CLASSES.CUSTOM_CHECKBOX;
  checkBox.addEventListener("click", () => {
    checkBox.checked = !checkBox.checked;
    if (checkBox.checked) {
      checkBox.classList.add(CSS_CLASSES.CHECKED);
    } else {
      checkBox.classList.remove(CSS_CLASSES.CHECKED);
    }
    // チェンジイベントをトリガー
    const event = new Event("change");
    checkBox.dispatchEvent(event);
  });
  return checkBox;
};

/**
 * 追加ボタンのクリックイベント
 */
addButton.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) {
    alert(MESSAGES.EMPTY_INPUT);
    return;
  }
  todoList.appendChild(createTodoItem(text));
  input.value = "";
  saveTodos();
});

  if (text.length > 50) {
    alert("50文字以内で入力してください");
    return;
  }

  const exists = Array.from(list.children).some((li) => {
    const span = li.querySelector("span");
    return span && span.textContent === text;
  });
  if (exists) {
    alert("同じ内容のタスクが既に存在します");
    return;
  }

  try {
    list.appendChild(createTodoItem(text));
    input.value = "";
    saveTodos();
  } catch (e) {
    alert("タスクの追加に失敗しました: " + e.message);
  }
});
