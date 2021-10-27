import React,{useState, FormEvent} from 'react'
import {useParams} from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import {database} from '../../../services/firebase'
import './Constructs.scss'
type extensionParams = {
    id: string
}

const FormConstruct = () => {

    const user = useAuth()
    const params = useParams<extensionParams>();
    const extensionId = params.id;

    const [conceptState, setConceptState] = useState('')
    const [descriptionState, setDescriptionState] = useState('')
    const [typeState, setTypeState] = useState('')
    const [formState, setFormState] = useState('')
    // const [classificationState, setClassificationState] = useState('')
    const [areaState, setAreaState] = useState('')

    async function handleSendConstruct(event: FormEvent){
        event.preventDefault()

        if(!user){
            return
        }

        const construct = {
            register: user.user?.name,
            concept: conceptState,
            description: descriptionState,
            type: typeState,
            form: formState,
            area: areaState,
            IdExtension: extensionId
        }

        await database.ref(`extensions/${extensionId}/constructs`).push(construct)
        setConceptState('')
        setDescriptionState('')
        setTypeState('')
        setAreaState('')
        setFormState('')
    }

    return (
        <div className="content">
            <div>
            <div className="form-input">
                    <form onSubmit={handleSendConstruct}>
                        <label>Concept</label>
                        <input
                            type="text"
                            placeholder="Concept"
                            onChange={event => setConceptState(event.target.value)}
                            value={conceptState}
                        />
                        <label>Description</label>
                        <input
                            type="text"
                            placeholder="Author"
                            onChange={event => setDescriptionState(event.target.value)}
                            value={descriptionState}
                        />
                        <div className="input-select">
                            <label>Form</label>
                            <select value={formState} onChange={event =>setFormState(event.target.value)}>
                                <option value="Journal">Journal</option>
                                <option value="Conference">Conference</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="input-select">
                            <label>Source</label>
                            <select value={typeState} onChange={event =>setTypeState(event.target.value)}>
                                <option value="Journal">Journal</option>
                                <option value="Conference">Conference</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="input-select">
                            <label>ApplicationArea</label>
                            <select value={areaState} onChange={event =>setAreaState(event.target.value)}>
                                <option value="Journal">Journal</option>
                                <option value="Conference">Conference</option>
                                <option value="Workshop">Workshop</option>
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

export default FormConstruct