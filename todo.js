const input = document.getElementById("todo-input");
const button = document.getElementById("add-button");
const list = document.getElementById("todo-list");

let list_id = 0;

button.addEventListener("click", () => {
  const text = input.value;
  if (!text) return;

  const li = document.createElement("li");
  const del = document.createElement("button");
  console.log(del);
  li.textContent = text;
  li.id = list_id;
  del.textContent = "削除する";
  del.addEventListener("click", () => {
    const target = document.getElementById(li.id);
    target.remove();
  });

  li.appendChild(del);
  list.appendChild(li);

  input.value = "";
  list_id++;
});
