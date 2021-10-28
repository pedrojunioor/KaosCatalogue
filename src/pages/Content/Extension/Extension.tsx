import React, { useState, useEffect, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import { database } from '../../../services/firebase'
import Card from '../Layout/Card'
import FormConstruct from '../Constructs/FormConstruct'
import Modal from 'react-modal';

import './Extension.scss'

type FirebaseConstructs = Record<string, {
    area: string,
    concept: string,
    description: string,
    form: string,
    register: string,
    type: string
}>

type Construct = {
    id: string,
    area: string,
    concept: string,
    description: string,
    form: string,
    register: string,
    type: string,
    IdExtension: string
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

    applicationArea?: string,
    author: string,
    constructs?: Construct[],
    datePublication: string,
    extensionBase: string,
    extensionDerivative: string,
    source: string,
    sourceLocation: string,
    title?: string,
    userId?: string,
    validationForm: string,
    metamodelcompleteness: string,
    syntaxlevel: string,
    toolsuport: string,
    definitionofconcepts: string
}

type extensionParams = {
    id: string
}

const Extension = () => {

    const { user, isLoggedIn } = useAuth()
    const history = useHistory()
    const params = useParams<extensionParams>();
    const extensionId = params.id;

    const [constructs, setConstructs] = useState<Construct[]>([])
    const [extension, setExtension] = useState<Extension>()
    const [title, setTitle] = useState('')
    const [admin, setAdmin] = useState<boolean>(false)
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    function isAdmin() {
        if (user === undefined) {
            setAdmin(false)
        }
        else if (isLoggedIn()) {
            if (user?.emaill === "kaoscatalogue@gmail.com") {
                setAdmin(true)
            }
        }
    }

    useEffect(() => {
        isAdmin()
    }, [user])

    function getConstructs(constructs : Construct[]) {
        return constructs.map((construct,i)=> {
            return <div key={construct.id} className="constructs">
                <span>{i+1}</span>
                <span>{construct.area} </span>
                <span>{construct.concept} </span>
                <span>{construct.description}</span>
                <span>{construct.form}</span>
                <span>{construct.register}</span>
                <span>{construct.type}</span>
                <Button onClick={e => handleJoinConstruct(e,construct.id)}>Detail</Button>
            </div>
        })
    }

    async function handleJoinConstruct(event: FormEvent, idConstruct: string){
        event.preventDefault();
        if(idConstruct.trim() === '') {
            return
        }
        const constructRef = await database.ref(`extensions/${extensionId}/constructs/${idConstruct}`).get()
        if(!constructRef.exists()){
            alert("Extension not found")
            return;
        }
        history.push(`/extensions/${extensionId}/constructs/${idConstruct}`)
    }

    async function handleDeleteExtension() {
        if (window.confirm("Tem certeza que deseja deletar ?")) {
            await database.ref(`extensions/${extensionId}`).remove()
            history.push('/extensions')
        }
    }

    // function showExtension(extension : Extension) {
    //     if(extension !== undefined) {

    //         return <div key={extension.title} className="extensions">
    //             <span>{extension.title} </span>
    //             <span>{extension.author} </span>
    //             <span>{extension.datePublication}</span>
    //             <span>{extension.source}</span>
    //         </div>
    //     }
    //     else{
    //         return <div>
    //             AA
    //         </div>
    //     }
    // }

    function showExtension(extension: Extension) {

        if (extension !== undefined) {
            return Object.keys(extension).map(item => {
                if (extension[item] !== undefined) {
                    return <Card titulo={item}>
                        <span>{extension[item]}</span>
                    </Card>
                }
                else {
                    return <Card titulo={item}>
                        <span>---</span>
                    </Card>
                }
            }
            )
        }
    }

    useEffect(() => {
        const extensionRef = database.ref(`extensions/${extensionId}`);
        extensionRef.on('value', extension => {
            const databaseExtension = extension.val()
            if (databaseExtension !== null) {
                const firebaseConstructs: FirebaseConstructs = databaseExtension.constructs ?? {};
                if (firebaseConstructs !== undefined) {
                    const parsedExtension = Object.entries(firebaseConstructs).map(([key, value]) => {
                        return {
                            id: key,
                            area: value.area,
                            concept: value.concept,
                            description: value.description,
                            form: value.form,
                            register: value.register,
                            type: value.type

                        }
                    })
                    setTitle(databaseExtension.title)
                    setConstructs(parsedExtension)
                }
            }
        })

        return () => {
            extensionRef.off('value')
        }
    }, [extensionId]);

    useEffect(() => {
        const extensionRef = database.ref(`extensions/${extensionId}`);
        extensionRef.on('value', extension => {
            const databaseExtension = extension.val()
            if (databaseExtension !== null) {
                const parsedExtension = {
                    applicationArea: databaseExtension.applicationArea,
                    author: databaseExtension.author,
                    datePublication: databaseExtension.datePublication,
                    extensionDerivative: databaseExtension.extensionDerivative,
                    extensionBase: databaseExtension.extensionBase,
                    source: databaseExtension.source,
                    sourceLocation: databaseExtension.sourceLocation,
                    validationForm: databaseExtension.validationForm,
                    metamodelcompleteness: databaseExtension.metamodelcompleteness,
                    syntaxlevel: databaseExtension.syntaxlevel,
                    toolsuport: databaseExtension.toolsuport,
                    definitionofconcepts: databaseExtension.definitionofconcepts
                }
                setExtension(parsedExtension)

            }

        }
        )
    }, [extensionId])

    return (
        <div className="content">

            <Card titulo={title}>
                <div className="Cards">
                    {showExtension(extension)}
                </div>
            </Card>
            {constructs.length > 0 && <Card titulo="Constructs">
                <div className="caption-constructs">
                        <span>-</span>
                        <span>Area</span>
                        <span>Concept</span>
                        <span>Description</span>
                        <span>Register</span>
                        <span>Form</span>
                        <span>type</span>
                    </div>
                    <div>
                        { getConstructs(constructs)}
                    </div>
            </Card>}
            
            {admin &&
                <div className="admin-area">
                    <Button
                        className="button-add-construct"
                        onClick={openModal}>
                        Add Construct
                    </Button>
                    <Button
                        className="button-delete"
                        onClick={() => handleDeleteExtension()}>
                        Delete
                    </Button>
                </div>}
            {admin && <div className="modal">
                <Modal
                    className="modal-style"
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal">
                    {/* <button onClick={closeModal}>close</button> */}
                    <FormConstruct />
                </Modal>
            </div>}
        </div>
    )
}

export default Extension