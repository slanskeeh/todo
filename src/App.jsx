import useStore from "./store";
import { useState } from "react";
import { v4 as uniqueID } from "uuid";

import styles from "./styles/modules/App.module.scss";

function App() {
  const todos = useStore((state) => state.todos);
  const removeTodo = useStore((state) => state.removeTodo);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>TODOX</h1>
      <ul className={styles.todos}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.todo}>
            <p className={styles.todo__title}>{todo.title}</p>
            <p className={styles.todo__descr}>{todo.description}</p>
            <button
              className={styles.todo__button}
              onClick={() => removeTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.addButton} onClick={() => setIsAdding(true)}>
        Add TODO
      </button>
      {isAdding && <NewTodoModal setIsAdding={setIsAdding} />}
    </main>
  );
}

export default App;

const NewTodoModal = ({ setIsAdding }) => {
  const [data, setData] = useState({
    id: uniqueID(),
    title: "",
    description: "",
  });

  const [isValid, setIsValid] = useState({
    title: false,
    description: false,
  });

  const addTodo = useStore((state) => state.addTodo);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.value.length) {
      setIsValid((state) => ({
        ...state,
        [e.target.name]: true,
      }));
    } else {
      setIsValid((state) => ({
        ...state,
        [e.target.name]: false,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid.title && isValid.description) {
      addTodo(data);
      setIsAdding(false);
    }
  };

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Add TODO</h2>
          <button
            className={styles.modal__closeButton}
            onClick={() => setIsAdding(false)}
          >
            &times;
          </button>
        </div>
        <form className={styles.modal__form}>
          <input
            className={
              // isValid[0] ? styles.modal__input : styles.modal__input_invalid
              styles.modal__input
            }
            type="text"
            name="title"
            value={data.title}
            placeholder="Title"
            onChange={handleChange}
          />
          <input
            className={
              // isValid[0] ? styles.modal__input : styles.modal__input_invalid
              styles.modal__input
            }
            type="text"
            name="description"
            value={data.description}
            placeholder="Description"
            onChange={handleChange}
          />
          <button
            disabled={isValid[0] && isValid[1]}
            className={styles.modal__button}
            onClick={handleSubmit}
          >
            Add TODO
          </button>
        </form>
      </div>
      <div className={styles.overlay}></div>
    </>
  );
};
