import React from 'react'
import Buttons from "./components/buttons";
import Dict from "./components/dict";
import Lang from "./components/lang";
import Words from "./components/words";

function App() {
  const [isHidden, setIsHidden] = React.useState(true)
  const [currWordIndex, setCurrWordIndex] = React.useState(0)
  const [language, setLanguage] = React.useState('ENG')
  const [dictionary, setDictionary] = React.useState([])

  return (
    <div className="App">
      <div className="options">
        <Dict setDictionary={setDictionary}/>
        <Lang language={language} setLanguage={setLanguage}/>
      </div>
      <Words 
      dictionary={dictionary} 
      isHidden={isHidden} 
      currWordIndex={currWordIndex}
      language={language}
      />
      <Buttons 
      isHidden={isHidden} 
      setIsHidden={setIsHidden}
      currWordIndex={currWordIndex}
      setCurrWordIndex={setCurrWordIndex}
      dictionary={dictionary}
      />
    </div>
  );
}

export default App;
