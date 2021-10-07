import './Navbar.scss'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../component/Button'

const Navbar = () => {

    const history = useHistory()
    const { user, sigInWithGoogle } = useAuth()
    
    useEffect(()=>{
        console.log(user)
    },[user])
    console.log(user)

    async function handleCreateExtension() {
        if (!user) {
            await sigInWithGoogle()
        }
        history.push('/extensions/new')
    }

    return (
        <div className="template-navbar">
            <div className="navbar">
                <Button onClick={() => { history.push('/extensions') }}>
                    Extensions
                </Button>
                <Button onClick={() => { history.push('/extension')}}>
                    Extension
                </Button>

                <Button onClick={() => { history.push('/constructs') }}>
                    Constructs
                </Button>

                <Button onClick={() => { history.push('/construct')}}>
                    Construct
                </Button>

                <Button onClick={handleCreateExtension}>
                    Form Extensions
                </Button>
                <Button onClick={() => { history.push('/extensions/report')}}>
                    Form Report
                </Button>
            </div>
        </div>
    )
}

export default Navbar