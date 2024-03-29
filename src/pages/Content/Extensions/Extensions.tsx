import React, { useState, FormEvent, useEffect } from 'react'

import Card from '../Layout/Card'
import './Extensions.scss'
import { useHistory } from 'react-router-dom'
import { Button } from '../../../component/Button'
import { database } from '../../../services/firebase'
import ExtensionsSelected from '../ExtensionsSelected/ExtensionSelected'
import Modal from 'react-modal';

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
    source: string,
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
    source: string,
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
    const [filterState, setFilterState] = useState('title')
    const [parseState, setParseState] = useState<String>('')
    const [extensions, setExtensions] = useState<Extension[]>([])
    const [selected, setSelected] = useState<Extension[]>([])


    useEffect(() => {
        if (filterState === 'toolsuport') {
            if (parseState.trim() === '') {
                setParseState('YES')
            }
        }
        if (filterState === 'source') {
            if (parseState.trim() === '') {
                setParseState('journal')
            }
        }
        else {
            setParseState('')
        }
    }, [filterState])


    function getExtensions(extensions: Extension[]) {
        return extensions.map((extension, i) => {
            return <div key={extension.title} className="extensions">
                <span>{i + 1}</span>
                <span>{extension.title} </span>
                <span>{extension.author} </span>
                <span>{extension.datePublication}</span>
                <span>{extension.source}</span>
                <Button onClick={e => handleJoinExtension(e, extension.id)}>Detail</Button>
            </div>
        })
    }

    //BUSCANDO TODAS AS EXTENSOES NO BANCO DE DADOS
    useEffect(() => {
        const extensionRef = database.ref(`extensions`);
        extensionRef.on('value', extension => {
            const databaseExtension = extension.val()
            const firebaseExtensions: FirebaseExtensions = databaseExtension ?? {};

            const parsedExtension = Object.entries(firebaseExtensions).map(([key, value]) => {
                return {
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
    }, []);

    //ACESSANDO A PAGINA DE UMA EXTENSAO EXPEDICIFCA
    async function handleJoinExtension(event: FormEvent, idExtension: string) {
        event.preventDefault();
        if (idExtension.trim() === '') {
            return
        }
        const extensionRef = await database.ref(`extensions/${idExtension}`).get()
        if (!extensionRef.exists()) {
            alert("Extension not found")
            return;
        }
        history.push(`/extension/${idExtension}`)
    }


    //FILTRANDO EXTENSOES
    async function handleJoinExtensionSearchNew(event: FormEvent) {
        event.preventDefault();
        if (parseState.trim() === '') {
            const extensionRef = database.ref(`extensions`);
            extensionRef.on('value', extension => {
                const databaseExtension = extension.val()
                const firebaseExtensions: FirebaseExtensions = databaseExtension ?? {};
                const parsedExtension = Object.entries(firebaseExtensions).map(([key, value]) => {
                    return {
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
        }

        const extensionRef = database.ref(`extensions`);
        extensionRef.on('value', extension => {
            const databaseExtension = extension.val()
            const firebaseExtensions: FirebaseExtensions = databaseExtension ?? {};
            let selecionados: any = {}
            const parsedExtension = Object.entries(firebaseExtensions).map(([key, value]) => {
                if (value[filterState].toLowerCase().includes(parseState.toLowerCase())) {
                    selecionados[key] = {
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
                }
            })
            const selectedExtension = Object.entries(selecionados).map(([key, value]) => {
                return {
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
            setExtensions(selectedExtension)
            if (selectedExtension.length === 0) {
                setParseState('')
            }

        })



    }

    useEffect(() => {
        console.log(filterState)
        console.log(parseState)
    }, [parseState, filterState])


    function mountInput(place: string) {

        if (place === 'title') {
            return <div className="input-text">
                <input
                    type="text"
                    placeholder="Enter the Title"
                    onChange={event => { setParseState(event.target.value) }}
                    value={parseState.toString()}
                />
            </div>
        }
        if (place === 'author') {
            return <div className="input-text">
                <input
                    type="text"
                    placeholder="Enter the Author"
                    onChange={event => { setParseState(event.target.value) }}
                    value={parseState.toString()}
                />
            </div>
        }
        if (place === 'applicationArea') {
            return <div className="input-select">
                <select
                    value={parseState.toString()}
                    onChange={(event) => setParseState(event.target.value)}
                >
                    <option value="">-</option>
                    <option value="Adaptive Systems">Adaptive Systems</option>
                    <option value="Web Services">Web Services</option>
                    <option value="Aspects">Aspects</option>
                    <option value="Risks">Risks</option>
                    <option value="Safety">Safety</option>
                    <option value="Autonomic Systems">Autonomic Systems</option>
                    <option value="Organizational Business Process">
                        Organizational/Business Process
                    </option>
                    <option value="Security Privacy Vulnerability">
                        Security/Privacy/Vulnerability
                    </option>
                    <option value="Business continuity">Business continuity</option>
                    <option value="Escalabilidade">Escalabilidade</option>
                    <option value="Ambient Systems">Ambient Systems</option>
                    <option value="Others">Others</option>
                </select>
            </div>

            // <div className="input-text">
            //     <input
            //         type="text"
            //         list="areas"
            //         placeholder="Enter the Application Area"
            //         onChange={event => { setParseState(event.target.value) }}
            //         value={parseState.toString()}
            //     />
            //     <datalist id="areas">
            //         <option value="Adaptive Systems" />
            //         <option value="Web Services" />
            //         <option value="Aspects" />
            //         <option value="Risks" />
            //         <option value="Safety" />
            //         <option value="Autonomic Systems" />
            //         <option value="Organizational Business Process" />
            //         <option value="Security Privacy Vulnerability" />
            //         <option value="Business Continuity" />
            //         <option value="Ambient Systems" />
            //         <option value="Others" />
            //     </datalist>
            // </div>
        }
        if (place === 'datePublication') {
            return <div className="input-text">
                <input
                    type="text"
                    placeholder="Enter Year of Publication"
                    onChange={event => { setParseState(event.target.value) }}
                    value={parseState.toString()}
                />
            </div>
        }
        if (place === 'source') {
            return <div className="input-select">
                <select value={parseState.toString()} onChange={(event) => setParseState(event.target.value)}>
                    <option value="journal">Journal</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="others">Others</option>
                </select>
            </div>

            // <div className="input-text">
            //     <input
            //         type="text"
            //         list="sources"
            //         placeholder="Enter the Source"
            //         onChange={event => { setParseState(event.target.value) }}
            //         value={parseState.toString()}
            //     />
            //     <datalist id="sources">
            //         <option value="Journal" />
            //         <option value="Conference" />
            //         <option value="Workshop" />
            //         <option value="Others" />

            //     </datalist>
            // </div>
        }
        if (place === 'toolsuport') {

            return <div className="input-select" >
                <select value={parseState.toString()} onChange={(event) => setParseState(event.target.value)}>
                    <option value="YES">YES</option>
                    <option value="NOT">NOT</option>
                </select>
            </div>
        }
        else {
            return <div className="input-text">
                <input
                    type="text"
                    placeholder="---------"
                    onChange={event => { setParseState(event.target.value) }}
                    value={parseState.toString()}
                />
            </div>
        }
    }

    function notFound() {
        return <Card>
            <h1 style={{ font: 'bold' }}>Extension not found</h1>
        </Card>
    }

    return (
        <div className="content">
            <form className="menu-busca" onSubmit={handleJoinExtensionSearchNew} >
                <div className="input-select">
                    <select value={filterState} onChange={(event) => { setFilterState(event.target.value) }}>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="datePublication">Year</option>
                        <option value="applicationArea">Application Area</option>
                        <option value="source">Source</option>
                        <option value="toolsuport">Tool Support</option>
                    </select>
                </div>

                {mountInput(filterState)}
                <div>
                    <Button type="submit"> Search</Button>
                </div>
            </form >
            {getExtensions(extensions).length > 0 &&
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 40px' }}>
                    <h1 style={{ border: '1px solid #000', padding: '8px', borderRadius: '10px' }}>Showing {getExtensions(extensions).length}  results found </h1>
                </div>}
            {getExtensions(extensions).length > 0 ? <Card titulo="Extensions">
                <div className="caption-extensions">
                    <span>-</span>
                    <span>Title</span>
                    <span>Author</span>
                    <span>Date</span>
                    <span>Source</span>
                </div>
                <div>
                    {getExtensions(extensions)}

                </div>
            </Card> : notFound()}
            <div>

            </div>
        </div >
    )
}

export default Extensions