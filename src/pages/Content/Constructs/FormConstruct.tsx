import React, { useState, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import { database } from '../../../services/firebase'


import './Constructs.scss'
type extensionParams = {
    id: string
}

const FormConstruct = () => {

    const user = useAuth()
    const params = useParams<extensionParams>();
    const extensionId = params.id;

    const [nameState, setNameState] = useState('')
    const [meaningState, setMeaningState] = useState('')
    const [conectState, setConectState] = useState('-')
    const [formState, setFormState] = useState('')
    const [applicationAreaState, setApplicationAreaState] = useState('')

    async function handleSendConstruct(event: FormEvent) {
        event.preventDefault()

        if (!user) {
            return
        }

        const construct = {
            register: user.user?.emaill,
            name: nameState,
            meaning: meaningState,
            // area: applicationAreaState,
            conect: conectState,
            IdExtension: extensionId,
            image: ""

        }

        await database.ref(`extensions/${extensionId}/constructs`).push(construct)

        setNameState('')
        setMeaningState('')
        setConectState('')

    }

    return (
        <div className="content">
            <div>
                <div className="form-input">
                    <form onSubmit={handleSendConstruct}>
                        <label>Construct Name</label>
                        <input
                            type="text"
                            placeholder="Concept"
                            onChange={event => setNameState(event.target.value)}
                            value={nameState}
                        />
                        <label>Meaning</label>
                        <input
                            type="text"
                            placeholder="Description"
                            onChange={event => setMeaningState(event.target.value)}
                            value={meaningState}
                        />

                        <div className="input-select">
                            <label>Link or Node</label>
                            <select
                                value={conectState}
                                onChange={(event) => setConectState(event.target.value)}
                            >
                                <option value="-">-</option>
                                <option value="Link">Link</option>
                                <option value="Node">Node</option>
                            </select>
                        </div>

                        <Button type="submit">
                            Submit Construct
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormConstruct