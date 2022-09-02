import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from "react-modal";
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { createUser, login } from '../../util/auth'
import { avatar } from '../../util/avatar'
import './style.css'

export default function SignupForm() {
    const navigate = useNavigate()
    const [showAvatar, setShowAvatar] = useState({})
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const [validation, setValidation] = useState('')

    const changeHandler = (e) => {
        setValidation('')
        setInput(
            {
                ...input,
                [e.target.name]: e.target.value
            }
        )
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        for (let key in input) {
            if (input[key] === '') {
                setValidation(`Please Enter ${key}`)
                Swal.fire({
                    icon: 'error',
                    title: `Please Enter ${key}`,
                })
                return
            }
        }
        if (!showAvatar.source) {
            setValidation('Please Select Avatar')
            Swal.fire({
                icon: 'error',
                title: `Please Select Avatar`,
            })
            return
        }
        try {
            await login(input, 'signInWithPassword')

            navigate('/weather', { state: showAvatar })
        }
        catch {
            setValidation('Please check your credentials')
            Swal.fire({
                icon: 'error',
                title: `Please check your credentials`,
            })
        }
    }

    const regiterHandler = async (e) => {
        e.preventDefault()
        for (let key in input) {
            if (input[key] === '') {
                setValidation(`Please Enter ${key}`)
                Swal.fire({
                    icon: 'error',
                    title: `Please Enter ${key}`,
                })
                return
            }
        }
        if (!showAvatar.source) {
            setValidation('Please Select Avatar')
            Swal.fire({
                icon: 'error',
                title: `Please Select an Avatar`,
            })
            return
        }
        try {
            await createUser(input, 'signUp')
            Swal.fire({
                icon: 'success',
                title: 'Successfully registered',
                showConfirmButton: false,
                timer: 1500
            })
        }
        catch {
            setValidation('This user is already registered')
            Swal.fire({
                icon: 'error',
                title: 'This user is already registered!',
                text: 'Try again with different user',
            })
        }
    }
    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const selectAvatarHandler = (item) => {
        setShowAvatar(item)
        toggleModal()
    }

    return (
        <div className='main'>
            <div className='content'>
                <form>
                    {/* <div className='validation'>{validation && validation}</div> */}
                    <div className='inputDiv'>
                        <label>Email:</label>
                        <input type='email' name='email' onChange={changeHandler} />
                    </div>
                    <div className='inputDiv'>
                        <label>Password:</label>
                        <input type='password' name='password' onChange={changeHandler} />
                    </div>
                    <div className='form-button'>
                        <button onClick={regiterHandler}>Register Now</button>
                        <button onClick={submitHandler}>Login</button>
                    </div>
                </form>
                <div className='avatar-image' onClick={toggleModal}>
                    {showAvatar.source ? <img src={showAvatar.source} alt='avatar' /> :
                        <>
                            <p>Select Avatar</p>
                            <FontAwesomeIcon icon={faAdd} />
                        </>
                    }

                </div>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                >
                    <div className='main-modal'>
                        {avatar.map(item => (
                            <div className='modal_image' onClick={() => selectAvatarHandler(item)}>
                                <img src={item.source} alt='avatar' className='img' />
                                <p>{item.weather}</p>
                            </div>
                        ))}
                    </div>
                    <button onClick={toggleModal}>Close model</button>
                </Modal>
            </div>
        </div>
    )
}
