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
    // console.log(user.id)

    const [titleState, setTitleState] = useState('')
    const [authorState, setAuthorState] = useState('')
    const [datePublicationState, setDatePublicationState] = useState()
    const [sourceState, setSourceState] = useState()
    const [aplicationAreaState, setAplicationAreaState] = useState()
    
    async function handleCreateExtension(event: FormEvent) {
      event.preventDefault();
    //   console.log('title',title)
    //   console.log('author',author)
    //   console.log('date',datePublication)
    //   console.log('source',source)
    //   console.log('aplicationArea',aplicationArea)

    const extensionRef = database.ref('entensions')
    const firebaseExtension = await extensionRef.push({
        userId: user.id,
        title: titleState,
        author: authorState,
        datePublication: datePublicationState,
        source: sourceState,
        aplicationArea: aplicationAreaState
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
                                <option value="Article">Article</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="input-select">
                            <label>Aplication Area:</label>
                            <select value={aplicationAreaState} onChange={event =>setAplicationAreaState(event.target.value)}>
                                <option value="Area1">Area1</option>
                                <option value="Area2">Area2</option>
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