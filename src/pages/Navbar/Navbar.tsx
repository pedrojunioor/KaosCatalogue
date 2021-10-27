import './Navbar.scss'
import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../component/Button'

const Navbar = () => {

    const history = useHistory()
    const { user, sigInWithGoogle, isLoggedIn } = useAuth()
    const [admin,setAdmin] = useState<boolean>(false)
    
    async function isLoggedToReport() {
        if (!isLoggedIn()) {
            await sigInWithGoogle()
        }
        history.push('/extensions/report')
    }

    function isAdmin() {
        if(user === undefined) {
            setAdmin(false)
        }
        else if(isLoggedIn()) {
            if (user?.emaill === "kaoscatalogue@gmail.com") {
                setAdmin(true)
            }           
        }
    }

    useEffect(() =>{
        isAdmin()
    },[user])

    return (
        <div className="template-navbar">
            <div className="navbar">
                <Button onClick={() => { history.push('/extensions') }}>
                    Extensions
                </Button>
                <Button onClick={() => { history.push('/constructs') }}>
                    Constructs
                </Button>
                {admin && <Button onClick={() => { history.push('/reportedextensions') }}>
                    Reported Extensions
                </Button>}
                {admin && <Button onClick={() => {history.push('./extensions/new')}}>
                    Form Extensions
                </Button>
                }
                <Button onClick={isLoggedToReport}>
                    Form Report
                </Button>
            </div>
        </div>
    )
}

export default Navbar