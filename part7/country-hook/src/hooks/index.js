import { useEffect, useState } from "react"
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return

    axios.get(`https://restcountries.com/v2/name/${name}?fullText=true`)
      .then(response => {
        setCountry({ found: true, data: response.data[0] })
      })
      .catch(error => {
        setCountry({ found: false })
      })
  }, [name])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}