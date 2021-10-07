import './FormReport.scss'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import '../template-content.scss'


const FormReport = () => {

    const history = useHistory()
    const { user, sigInWithGoogle } = useAuth()
    
    async function handleCreateExtension() {
        if (!user) {
            await sigInWithGoogle()
        }
        history.push('/extensions/new')
    }

    return (
        <div className="content">
            <form action="" className="form-report">
                <label>
                    Nome:
                </label>
                <input type="text" className="text" />
                <label>
                    Link:
                </label>
                <input type="text" className="text" />
                <label>
                    Data de publicação:
                </label>
                <input type="text" className="text" />
                <div>
                <button type="submit" className="submit">
                    Enviar
                </button>
                </div>
             
            </form>

        </div>
    )
}

export default FormReport