import './FormReport.scss'
import React from 'react'
import '../template-content.scss'
import UseForm from './UseForm'

const FormReport = () => {
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