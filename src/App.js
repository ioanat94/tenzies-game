import React from 'react'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === dice[0].value)

    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function reroll() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
          die : 
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
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
      {tenzies && <Confetti />}
      <h1 className='App--title'>Tenzies</h1>
      <p className='App--instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='App--container'>
        {diceElements}
      </div>
      <button className='App--button' onClick={reroll}>{tenzies ? 'Restart' : 'Roll'}</button>
    </main>
  );
}

export default App;
