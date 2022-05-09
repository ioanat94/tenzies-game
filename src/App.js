import React from 'react'
import Die from './components/Die'

function App() {
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.floor((Math.random() * 6) + 1))
    }
    return newDice
  }

  const [dice, setDice] = React.useState(allNewDice())

  const diceElements = dice.map(die => <Die value={die} />)

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
