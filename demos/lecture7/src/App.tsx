import { useState } from 'react'
import './App.css'
import { Incrementor } from './components/Incrementor';
import { Decrementor } from './components/Decrementor';
import { Pokemon } from './components/Pokemon';

function App() {
  const [count, setCount] = useState(0);
  const [pokemon, setPokemon] = useState('');

  return (
    <>
      <div>
        Count is {count}
        <Decrementor count={count} setCount={setCount} />
        <Incrementor onClick={() => setCount(count + 1)} />
        <Pokemon name={pokemon} />
        <input value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
      </div>
    </>
  )
}

export default App
