import { useState } from 'react';
import './App.css'

type ToDoType = {
  text: string;
  id: number;
  completed: boolean;
}

function App() {
  // const [count, setCount] = useState(0);
  const [inputText, setText] = useState('');
  const [toDo, setToDo] = useState<ToDoType[]>([]);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const addToDo = () => {
    setToDo([
      ...toDo,
      {
        text: inputText,
        id: toDo.length + 1,
        completed: false
      }
    ]);
    // console.log(toDo)
  }

  const completedTask = (id: number) => {
    setToDo(
      toDo.map((item) => {
        if(item.id === id){
          return {...item, completed: !item.completed};
        } 
        return item;
      })
    );
  } 

  return (
    <>
        <input type="text" onChange={onChangeText} />
        {/* <p>{inputText}</p> */}
        <button onClick={addToDo}>
          Add ToDo
        </button>
        <ul>
          {toDo.map((todo) => 
            <li key={todo.id} onClick={() => completedTask(todo.id)}>
              <p>{todo.text}</p>
              <input type="checkbox" checked = {todo.completed} />
            </li>)}
        </ul>
    </>
  )
}

export default App
