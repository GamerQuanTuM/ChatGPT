"use client"
import useSWR from 'swr'
import Select from 'react-select'

const fetchModels = async () => {
    const response = await fetch('/api/getEngines')
    const data = await response.json();
    return data;
}

export default function ModelSelection() {
    const { data: models, isLoading, error } = useSWR('models', fetchModels)
    const { data: model, mutate: setModel } = useSWR('model', {
        fallbackData: 'text-davinci-003'
    })

    if (error) return <div>Failed to load data</div>;
    if (!models) return <div>Loading data...</div>;
    return (
        <div className='mt-2'>
            <Select className='mt-2'
                options={models?.modelOptions}
                placeholder={model}
                defaultValue={model}
                isSearchable
                isLoading={isLoading}
                menuPosition='fixed'
                classNames={{
                    control: (state) => "bg-[#434654] border-[#434654]"
                }}
                onChange={e => setModel(e.value)}
            />
        </div>
    )
}
