import { useState } from 'react'
import './App.css'
import { Wrapper } from './components/Wrapper'
import type { Task } from './types';
import { TaskDisplay } from './components/TaskDisplay';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      {tasks.map((task) => <TaskDisplay task={task} />)}
      <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
      <button onClick={() => {
        if (inputValue === '') return;
        setTasks([...tasks, {
          name: inputValue,
          priority: 1,
          status: 'todo'
        }]);
        setInputValue('');
      }}>
        Add Task
      </button>
    </>
  )
}

export default App
