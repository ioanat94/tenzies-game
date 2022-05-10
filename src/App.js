import React from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'

function App() {
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor((Math.random() * 6) + 1), 
        isHeld: false, 
        id: nanoid()
      })
    }
    return newDice
  }

  const [dice, setDice] = React.useState(allNewDice())

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} />)

  function reroll() {
    setDice(allNewDice())
  }

  return (
    <main className='App'>
      <div className='App--container'>
        {diceElements}
      </div>
      <button className='App--button' onClick={reroll}>Roll</button>
    </main>
  );
}

export default App;
