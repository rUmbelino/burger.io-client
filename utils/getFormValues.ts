
export const getFormValues = (elements: HTMLFormControlsCollection) => {
    const values = {}
    Array.from(elements).forEach((input) => {
        const key = input.getAttribute('name')
        if (key !== null) {
            // @ts-ignore
            values[key] = (input as HTMLInputElement).value
        }
    })

    return values
}