import React from 'react'

const Lang = ({language, setLanguage}) => {
    const handleClick = (e) => {
        setLanguage(e.target.innerText)
    }

    return (
        <div className="lang btn-group" role="group">
            <button 
            className={`btn ${language === 'ENG' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={handleClick}
            >
                ENG
            </button>
            <button 
            className={`btn ${language === 'RUS' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={handleClick}
            >
                RUS
            </button>
        </div>
    )
}

export default Lang