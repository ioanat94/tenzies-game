import React from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'

function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function reroll() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
        die : 
        generateNewDie()
    }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }
  
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  const diceElements = dice.map(die => (
    <Die 
      key={die.id} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)} 
    />
  ))

  return (
    <main className='App'>
      <h1 className='App--title'>Tenzies</h1>
      <p className='App--instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='App--container'>
        {diceElements}
      </div>
      <button className='App--button' onClick={reroll}>Roll</button>
    </main>
  );
}

export default App;
