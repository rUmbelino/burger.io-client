// @ts-nocheck

export const getFormValues = (elements: HTMLFormControlsCollection) => {
    const values = {}
    Array.from(elements).forEach((input) => {
        const key = input.getAttribute('name')
        if (key !== null) {
            const isObjectList = key.includes('_')
            if (isObjectList) {
                const [listKey, index, itemKey] = key.split('_')
                const updatedList = values[listKey] || []
                const entry = { [itemKey]: (input as HTMLInputElement).value }
                updatedList[index] = { ...updatedList[index], ...entry }
                values[listKey] = updatedList
            } else {
                values[key] = (input as HTMLInputElement).value
            }
        }
    })

    return values
}