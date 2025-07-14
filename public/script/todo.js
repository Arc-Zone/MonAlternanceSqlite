document.querySelectorAll('li').forEach(li => {
  const checkbox = li.querySelector('input[type="checkbox"]');
  const id = li.dataset.id;

  const checkedState = localStorage.getItem('todo_' + id);

  if (checkedState === 'true') {
    checkbox.checked = true;
    li.style.textDecoration = "line-through";
    li.style.textDecorationThickness = "2px";
  } else {
    checkbox.checked = false;
    li.style.textDecoration = "none";
  }

  checkbox.addEventListener('change', () => {
    localStorage.setItem('todo_' + id, checkbox.checked);
    li.style.textDecoration = checkbox.checked ? "line-through" : "none";
    li.style.textDecorationThickness = checkbox.checked ? "2px" : "initial";
  });
});
