import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PersonsList from './components/PersonsList'
import phonebook from './services/phonebook'
import Notification from './components/Notification'

const App = () => {

  //State values
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    phonebook
      .getAll()
      .then(initialData => setPersons(initialData))
      .catch(error => {
        console.error(error)
        showNotification("Failed to load contacts", 'error')
      })
  }, [])

  //Derived values
  const filteredResult = persons.filter(person =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  )

  //setNotification function to avoid timeout copypaste
  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  //Event handlers
  const handleSubmit = (event) => {
    event.preventDefault()

    const name = newName.trim()
    const number = newNumber.trim()

    if (!name) {
      showNotification("Name cannot be empty!", 'error')
      return;
    } else if (!number) {
      showNotification("Number cannot be empty!", 'error')
      return
    }

    const existingContact = persons.find(person => person.name.trim().toLowerCase() === name.toLowerCase())

    if (existingContact) {
      if (window.confirm(`${existingContact.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const changedContact = { ...existingContact, number }
        phonebook
          .update(existingContact.id, changedContact)
          .then(changedContact => {
            setPersons(persons.map(person => person.id === existingContact.id ? changedContact : person))
            setNewName("")
            setNewNumber("")
            showNotification(`Successfully updated ${existingContact.name}'s number`, 'success')
          })
          .catch(error => {
            console.error(error)
            showNotification(`Failed to update ${existingContact.name}'s number: Contact not found`, 'error')
          })
      }
      return
    }

    const isDuplicateNumber = persons.some(person => person.number === number)

    if (isDuplicateNumber) {
      showNotification(`${number} is already added to phonebook`, 'error')
      return
    }

    phonebook
      .create({ name, number })
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${name}`, 'success')
      })
      .catch(error => {
        console.error('Error: ', error)
        showNotification(`Failed to add ${name}: Server Error`, 'error')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchFilter(event.target.value.trim())
  }

  const handleRemoveContact = (id) => {
    const selectedContact = persons.find(person => person.id === id)
    phonebook
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error('Delete failed:', error)
        showNotification(`Information of ${selectedContact.name} has already been removed from server`, 'error')
      })
  }

  return (
    <main>
      <div className="inner-line"></div>
      <div className='wrapper' >
        <h1>Phonebook</h1>
        <Notification notification={notification} />
        <Filter onChange={handleSearchChange} />
        <Form
          onSubmit={handleSubmit}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          newName={newName}
          newNumber={newNumber}
        />
        <PersonsList filteredResult={filteredResult} handleRemove={handleRemoveContact} />
      </div>
    </main>
  )
}

export default App