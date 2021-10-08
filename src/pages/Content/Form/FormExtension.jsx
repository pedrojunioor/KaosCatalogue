// import '../template-content.scss'
import React,{useState, FormEvent} from 'react'
// import { FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import {database, firebase} from '../../../services/firebase'
import './Form.scss'

const FormExtension = () => {

    const history = useHistory()
    const { user, sigInWithGoogle } = useAuth()
    
    const [titleState, setTitleState] = useState('')
    const [authorState, setAuthorState] = useState('')
    const [datePublicationState, setDatePublicationState] = useState('')
    const [sourceState, setSourceState] = useState('')
    const [sourceLocationState, setSourceLocationState] = useState('')
    const [extensionDerivativeState,setExtensionDerivativeState] = useState('')
    const [extensionBaseState,setExtensionBaseState] = useState('')
    const [validationFormState,setValidationFormState] = useState('')
    const [applicationAreaState, setApplicationAreaState] = useState('')
    
    async function handleCreateExtension(event: FormEvent) {
      event.preventDefault();

    const extensionRef = database.ref('extensions')
    const firebaseExtension = await extensionRef.push({
        userId: user.id,
        title: titleState,
        author: authorState,
        datePublication: datePublicationState,
        source: sourceState,
        sourceLocation: sourceLocationState,
        extensionDerivative: extensionDerivativeState,
        extensionBase: extensionBaseState,
        validationForm: validationFormState,
        applicationArea: applicationAreaState,
    })

    }

    return (
        <div>
            <span className="title">KAOS extension registration form</span>
            <div className="main">

                <div className="form-input">
                    <form onSubmit={handleCreateExtension}>
                        <label>Titulo</label>
                        <input
                            type="text"
                            placeholder="Digite o Titulo"
                            onChange={event => setTitleState(event.target.value)}
                            value={titleState}
                        />
                        <label>Author</label>
                        <input
                            type="text"
                            placeholder="Author"
                            onChange={event => setAuthorState(event.target.value)}
                            value={authorState}
                        />
                        <label>Date Publication</label>
                        <input
                            type="date"
                            placeholder="DatePublication"
                            onChange={event => setDatePublicationState(event.target.value)}
                            value={datePublicationState}
                        />
                        <div className="input-select">
                            <label>Source</label>
                            <select value={sourceState} onChange={event =>setSourceState(event.target.value)}>
                                <option value="Journal">Journal</option>
                                <option value="Conference">Conference</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <label>Source Location</label>
                        <input
                            type="text"
                            placeholder="SourceLocation"
                            onChange={event => setSourceLocationState(event.target.value)}
                            value={sourceLocationState}
                        />
                        <div className="input-select">
                            <label>Form Validation</label>
                            <select value={validationFormState} onChange={event =>setValidationFormState(event.target.value)}>
                                <option value="casestudy">Case Study</option>
                                <option value="experiment">Experiment</option>
                                <option value="exampleofuse">Example of use</option>
                                <option value="quiz">Quiz</option>
                                <option value="notpresentedevaluation">Not presented evaluation</option>
                            </select>
                        </div>
                         <div className="input-select">
                            <label>Extension Derivative</label>
                            <select value={extensionDerivativeState} onChange={event =>setExtensionDerivativeState(event.target.value)}>
                                <option value="yes">Yes</option>
                                <option value="not">Not</option>
                            </select>
                        </div>
                        <label>Base Extension</label>
                        <input
                            type="text"
                            placeholder="Base Extension"
                            onChange={event => setExtensionBaseState(event.target.value)}
                            value={extensionBaseState}
                        />

                        <div className="input-select">
                            <label>Application Area:</label>
                            <select value={applicationAreaState} onChange={event =>setApplicationAreaState(event.target.value)}>
                                <option value="Adaptive Systems">Adaptive Systems</option>
                                <option value="webservices">Web Services</option>
                                <option value="aspects">Aspects</option>
                                <option value="risks">Risks</option>
                                <option value="safety">Safety</option>
                                <option value="autonomicsystems">Autonomic Systems</option>
                                <option value="organizational-businessprocess">Organizational/Business Process</option>
                                <option value="security-privacy-vulnerability">Security/Privacy/Vulnerability</option>
                                <option value="businesscontinuity">Business continuity</option>
                                <option value="escalabilidade">Escalabilidade</option>
                                <option value="ambientsystems">Ambient Systems</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <Button type="submit">
                            Cadastrar Extensão
                        </Button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default FormExtension