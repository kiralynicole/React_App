import { useEffect, useState } from 'react';

export function Todos() {
  const [todos, setTodos] = useState<
    [{ title: string; completed: boolean; _id: string }] | null
  >(null);

  useEffect(() => {
    fetch('http://localhost:8080/todos')
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  function addTodo() {
    fetch('http://localhost:8080/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: Math.random(),
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(console.log);
  }

  if (!todos) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <label>
              <input type="checkbox" defaultChecked={todo.completed} />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
      <button type="button" onClick={addTodo}>
        Add Todo
      </button>
    </>
  );
}
