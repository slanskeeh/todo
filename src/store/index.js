import create from "zustand";

const useStore = create((set) => ({
  todos: [
    {
      id: 0,
      title: "First TODO",
      description: "This is your first todo!",
    },
    {
      id: 1,
      title: "Second TODO",
      description: "This is your second todo!",
    },
  ],
  addTodo: (todo) =>
    set((state) => ({
      todos: [
        {
          id: Math.random() * 100,
          title: todo.title,
          description: todo.description,
        },
        ...state.todos,
      ],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

export default useStore;
