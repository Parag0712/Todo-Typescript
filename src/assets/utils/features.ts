export const saveLocal = (todos: TodoItemType[]): void => {
    localStorage.setItem("mytodos", JSON.stringify(todos));
}

// GetTodos
export const getTodos = (): TodoItemType[] => {
    const todos = localStorage.getItem("mytodos");
    return todos ? JSON.parse(todos) : [];
  };