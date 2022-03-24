import React from 'react'

const DictLoad = ({isLoading, setIsLoading}) => {
    const handleChange = (e) => {
        const data = new FormData()
        data.append('file', e.target.files[0])

        setIsLoading(true);

        fetch('http://volga-it-22/csv.php', {
            method: 'POST',
            body: data
        })
            .then(res => res.text())
            .then(data => {
                data !== 'ok' 
                ? alert('Такой словарь уже есть')
                : alert('Словарь загружен')
            })
            .finally(() => setIsLoading(false))
    }
    return (
        <button className="dictionary__load btn btn-secondary" disabled={isLoading} >
            <input className="form-control" type="file" id="formFile" onChange={handleChange} />
            {isLoading ? 'Загрузка...' : 'Загрузить словарь'}
        </button>
    )
}

export default DictLoad