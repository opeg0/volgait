import React from 'react'

const DictList = ({isLoading, setDictionary}) => {
    const [dictList, setDictList] = React.useState([])

    React.useEffect(() => {
        if(!isLoading){
            fetch('http://volga-it-22/get-list.php')
                .then(res => res.json())
                .then(data => setDictList(Object.values(data)))
        }    
    }, [isLoading])

    const handleChange = (e) => {
        if(e.target.value === '0') return;

        const data = new FormData()
        data.append('dictName', e.target.value)

        fetch('http://volga-it-22/change-dict.php', {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => setDictionary(data))
    }

    return (
        <div className="dictionary__list">
            <select className="form-select" defaultValue={0} onChange={handleChange}>
                <option value="0">Выбрать словарь</option>
                {dictList?.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </div>
    )
}

export default DictList