import React, { useState, useRef, useEffect } from 'react'
import './App.css'

const App = () => {
  const photoInputref = useRef()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photo, setPhoto] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [nameIsValid, setNameIsValid] = useState(false)
  const [emailIsValid, setemailIsValid] = useState(false)
  const [photoIsValid, setphotoIsValid] = useState(false)
  const [touchedName, setTouchedName] = useState(false)
  const [touchedemail, setTouchedemail] = useState(false)
  const [touchedPhoto, setTouchedPhoto] = useState(false)

  useEffect(() => {
    if (nameIsValid) {
      setTouchedName(true)
      return
    }
    if (emailIsValid) {
      setTouchedemail(true)
      return
    }
    if (photoIsValid) {
      setTouchedPhoto(true)
      return
    }
  }, [nameIsValid, emailIsValid, photoIsValid])

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePhotoChange = (event) => {
    setPhoto(event.target.value)
  }

  // function for checking email validity
  const checkEmailValidity = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // function for checking photo validity
  const checkPhotoValidity = (file) => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    console.log(file)
    const fileExtension = file
      .split('.')
      .pop()
      .toLowerCase()
    return allowedExtensions.includes(fileExtension)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (name.trim() === '') {
      setErrorMessage('Please fill in all fields.')
      setNameIsValid(false)
    } else if (email.trim() === '') {
      setErrorMessage('Please fill in all fields.')
      setemailIsValid(false)
    } else if (!photo) {
      setErrorMessage('Please fill in all fields.')
      setphotoIsValid(false)
    } else if (!checkEmailValidity(email)) {
      setErrorMessage('Please enter a valid email address.')
      setemailIsValid(false)
    } else if (!checkPhotoValidity(photo)) {
      setErrorMessage('Please enter a valid photo.')
      setphotoIsValid(false)
    } else {
      setNameIsValid(true)
      setemailIsValid(true)
      setphotoIsValid(true)

      console.log('Name:', name)
      console.log('Email:', email)
      console.log('Photo:', photo)
      photoInputref.current.value = ''
      clearForm()
    }
  }

  const clearForm = () => {
    setName('')
    setEmail('')
    setErrorMessage('')
    setPhoto('')
  }

  const validName = !nameIsValid && touchedName
  const validEmail = !emailIsValid && touchedemail
  const validPhoto = !photoIsValid && touchedPhoto

  // const errorInputNameClasses = nameIsValid ? "" : "input-error";
  // const errorInputMailClasses = emailIsValid ? "" :  "input-error";
  // const errorInputPhotoClasses = photoIsValid ? "" :  "input-error";

  const errorInputNameClasses = validName ? 'input-error' : ''
  const errorInputMailClasses = validEmail ? 'input-error' : ''
  const errorInputPhotoClasses = validPhoto ? 'input-error' : ''

  return (
    <div className='user-form'>
      <div className='heading'>
        <h1>Input Form</h1>
      </div>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <ul type='none'>
          <li key={1}>
            <label>
              Name:
              <input
                type='text'
                value={name}
                onChange={handleNameChange}
                className={errorInputNameClasses}
              />
            </label>
          </li>

          <li key={2}>
            <label>
              Email:
              <input
                type='email'
                value={email}
                onChange={handleEmailChange}
                className={errorInputMailClasses}
              />
            </label>
          </li>

          <li key={3}>
            <label>
              Photo:
              <input
                type='file'
                onChange={handlePhotoChange}
                ref={photoInputref}
                className={errorInputPhotoClasses}
              />
            </label>
          </li>

          <li key={4}>
            <button type='submit' className='submit-button'>
              Submit
            </button>
          </li>
        </ul>
      </form>
    </div>
  )
}

export default App
