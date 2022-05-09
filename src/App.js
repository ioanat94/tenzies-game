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

  return (
    <main className='App'>
      <div className='App--container'>
        {diceElements}
      </div>
    </main>
  );
}

export default App;
