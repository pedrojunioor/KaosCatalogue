import React, { useContext } from 'react'
import './Header.scss'
import { Link, useHistory } from 'react-router-dom'
import googleIcon from '../../assets/images/google-icon.svg'
import { AuthContext } from '../../contexts/AuthContexts'
import { useAuth } from '../../hooks/useAuth'

const Header = () => {

    const history = useHistory()
    const { user, sigInWithGoogle } = useAuth()

    async function singIn() {
        if (!user) {
            await sigInWithGoogle()
        }
        history.push('/')
    }


    return (
        <div className="template-catalogue">
            <div className="catalogue-header">
                <div className="initial">
                    <Link to="/"><span>KAOS Catalogue</span></Link>
                </div>
                <div className="user-area">
                    {user && <div className="user">
                        <img src={user?.avatar} alt="" />
                        <span>{user?.name}</span>
                    </div>}
                    {!user && <button
                        className="login-button"
                        onClick={singIn}>
                        <img src={googleIcon} alt="Logo do Google" />
                        Login
                    </button>}
                    {user && <button
                        className="login-button"
                        onClick={() => { alert("LOGOUT") }}>
                        <img src={googleIcon} alt="Logo do Google" />
                        Logout
                    </button>}
                </div>
            </div>
        </div>

    )
}

export default Header