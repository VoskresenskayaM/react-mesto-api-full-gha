import { useState } from 'react'

const useForm = (inisialState) => {

    const [form, setForm] = useState(inisialState)
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const input = e.target
        setForm({
            ...form,
            [input.name]: input.value
        })
        setErrors({
            ...errors,
            [input.name]: input.validationMessage

        })
    }
    return { form, errors, handleChange }
}
export default useForm;