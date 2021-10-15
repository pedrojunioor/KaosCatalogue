import React,{useState, FormEvent, useEffect} from 'react'

import Card from '../Layout/Card'
import './Extensions.scss'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import {database, firebase} from '../../../services/firebase'

type Construct = {
    id: string,
    area: string,
    concept: string,
    description: string,
    form: string,
    register: string,
    type: string
}

type FirebaseExtensions = Record<string, {
    applicationArea: string,
    author: string,
    constructs: Construct[],
    datePublication: string,
    extensionBase: string,
    extensionDerivative: string,
    source:string,
    sourceLocation: string,
    title: string,
    userId: string,
    validationForm: string,
    metamodelcompleteness: string,
    syntaxlevel: string,
    toolsuport: string,
    definitionofconcepts: string
}>

type Extension = {
    id: string,
    applicationArea: string,
    author: string,
    constructs?: Construct[],
    datePublication: string,
    extensionBase: string,
    extensionDerivative: string,
    source:string,
    sourceLocation: string,
    title: string,
    userId: string,
    validationForm: string,
    metamodelcompleteness: string,
    syntaxlevel: string,
    toolsuport: string,
    definitionofconcepts: string
}



const Extensions = () => {

    const history = useHistory()
    const { user, sigInWithGoogle } = useAuth()
    const [filterState, setFilterState] = useState('')
    const [extensions,setExtensions] = useState<Extension[]>([])

    function getExtensios(extensions : Extension[]) {
        return extensions.map(extension => {
            return <div key={extension.title} className="extensions">
                <span>{extension.title} </span>
                <span>{extension.author} </span>
                <span>{extension.datePublication}</span>
                <span>{extension.source}</span>
                <Button onClick={e => handleJoinExtension(e,extension.id)}>Detalhes</Button>
            </div>

        })
    }


    
    async function handleJoinExtensionSearch(event: FormEvent){
        event.preventDefault();
        if(filterState.trim() === '') {
            return
        }
        const extensionRef = await database.ref(`extensions/${filterState}`).get()
        console.log(extensionRef)
        if(!extensionRef.exists()){
            alert("Extension not found")
            return;
        }
        history.push(`/extension/${filterState}`)
    }

    async function handleJoinExtension(event: FormEvent, idExtension: string){
        event.preventDefault();
        if(idExtension.trim() === '') {
            return
        }
        const extensionRef = await database.ref(`extensions/${idExtension}`).get()
        if(!extensionRef.exists()){
            alert("Extension not found")
            return;
        }
        history.push(`/extension/${idExtension}`)
    }


    useEffect(() => {
        const extensionRef = database.ref(`extensions`);
        
        extensionRef.on('value', extension => {
            console.log(extension.val().constructs);
            const databaseExtension = extension.val()
            const firebaseExtensions:FirebaseExtensions = databaseExtension ?? {}; 
            const parsedExtension = Object.entries(firebaseExtensions).map(([key,value]) => {
                return{
                    id: key,
                    applicationArea: value.applicationArea,
                    author: value.author,
                    datePublication: value.datePublication,
                    extensionBase: value.extensionBase,
                    extensionDerivative: value.extensionDerivative,
                    source: value.source,
                    sourceLocation: value.sourceLocation,
                    title: value.title,
                    userId: value.userId,
                    validationForm: value.validationForm,
                    metamodelcompleteness: value.metamodelcompleteness,
                    syntaxlevel: value.syntaxlevel,
                    toolsuport: value.toolsuport,
                    definitionofconcepts: value.definitionofconcepts
                }
            })
            setExtensions(parsedExtension)
        })

    },[]);

    return (
        <div className="content">
            <form className="menu-busca" onSubmit={handleJoinExtensionSearch} >
                <div className="input-select">
                    <select value={filterState} onChange={event =>setFilterState(event.target.value)}>
                        <option value="author">Author</option>
                        <option value="year">Year</option>
                        <option value="applicationarea">ApplicationArea</option>
                        <option value="source">Source</option>
                    </select>
                </div>
                <div className="input-text">
                 <input
                        type="text"
                        placeholder="..."
                        onChange={event => setFilterState(event.target.value)}
                        value={filterState}
                    />
                </div>
                <div>
                    <Button type="submit"> Search</Button>
                </div>
                   
                   
            </form>

            <Card titulo="Extensions">
                <div className="caption">
                    <span>Title</span>
                    <span>Author</span>
                    <span>Date</span>
                    <span>Source</span>
                </div>
                <div>
                    {getExtensios(extensions)}
                </div>

            </Card>


        </div>
    )
}

export default Extensions