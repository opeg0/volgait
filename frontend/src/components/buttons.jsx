import React from 'react'

const Buttons = ({isHidden, setIsHidden, currWordIndex, setCurrWordIndex, dictionary}) => {
    const toggleHidden = () => {
        setIsHidden(!isHidden)
    }

    const nextWord = () => {
        if(currWordIndex === dictionary.length - 1){
            setCurrWordIndex(0)
        }else{
            setCurrWordIndex(currWordIndex + 1)
        }
        setIsHidden(true)
    }

    return (
        <div className="buttons">
            <button className='btn btn-outline-primary' onClick={toggleHidden} disabled={!!!dictionary?.length}>
                {isHidden ? 'Показать' : 'Скрыть'} перевод
            </button>
            <button className='btn btn-primary' onClick={nextWord} disabled={!!!dictionary?.length}>
                Следущее слово
            </button>
        </div>
    )
}

export default Buttons