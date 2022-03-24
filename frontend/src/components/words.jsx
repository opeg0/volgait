import React from 'react'

const Words = ({dictionary, isHidden, currWordIndex, language}) => {
    const wordOriginal = language === 'ENG'
        ? dictionary[currWordIndex]?.Eng
        : dictionary[currWordIndex]?.Rus
    const wordTranslated = language === 'ENG'
        ? dictionary[currWordIndex]?.Rus
        : dictionary[currWordIndex]?.Eng
    return (
        <div className="words">
            {dictionary.length 
            ? <>
                <div className="words__original">
                    {wordOriginal}
                </div>
                <div className="word__translated">
                    {isHidden ? '????????' : wordTranslated}
                </div>
            </>
            : <div>
                Выберите словарь
            </div> 
            }
            
        </div>
    )
}

export default Words