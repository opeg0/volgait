import React from 'react'
import DictList from './dict-list'
import DictLoad from './dict-load'

const Dict = ({setDictionary}) => {
    const [isLoading, setIsLoading] = React.useState(false)

    return (
        <div className="dictionary">
            <DictList isLoading={isLoading} setDictionary={setDictionary}/>
            <DictLoad isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
    )
}

export default Dict