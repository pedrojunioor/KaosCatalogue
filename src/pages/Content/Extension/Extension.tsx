import React, { useState, useEffect, FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import { database } from '../../../services/firebase'
import Card from '../Layout/Card'
import FormConstruct from '../Constructs/FormConstruct'
import FormExtensionEdit from '../Form/FormExtensionEdit'
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
    definitionofconcepts: string,
    link: string
}

type extensionParams = {
    id: string
}

const Extension = () => {

    const { user, isLoggedIn } = useAuth()
    const history = useHistory()
    const params = useParams<extensionParams>();
    const extensionId = params.id;
    console.log(extensionId)

    const [constructs, setConstructs] = useState<Construct[]>([])
    const [extension, setExtension] = useState<Extension>()
    const [title, setTitle] = useState('')
    const [admin, setAdmin] = useState<boolean>(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalEditIsOpen, setEditIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    function openModalEdit() {
        setEditIsOpen(true);
    }

    function closeModalEdit() {
        setEditIsOpen(false);
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

    function getConstructs(constructs: Construct[]) {
        return constructs.map((construct, i) => {
            return <div key={construct.id} className="constructs">
                <span>{i + 1}</span>
                <span>{construct.name} </span>
                <span>{construct.meaning} </span>
                <span>{construct.conect}</span>
                <span>{construct.register}</span>
                <Button onClick={e => handleJoinConstruct(e, construct.id)}>Detail</Button>
            </div>
        })
    }

    async function handleJoinConstruct(event: FormEvent, idConstruct: string) {
        event.preventDefault();
        if (idConstruct.trim() === '') {
            return
        }
        const constructRef = await database.ref(`extensions/${extensionId}/constructs/${idConstruct}`).get()
        if (!constructRef.exists()) {
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

    function showExtension(extension: Extension) {

        if (extension !== undefined) {
            return Object.keys(extension).map(item => {
                if (extension[item] !== undefined) {
                    if (item === 'title') {
                        return
                    }
                    if (item === 'applicationArea') {
                        return <Card titulo="Application Area">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'author') {
                        return <Card titulo="Author">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'datePublication') {
                        return <Card titulo="Year Publication">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'extensionDerivative') {
                        return <Card titulo="Extension Derivative">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'extensionBase') {
                        return <Card titulo="Extension Base">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'source') {
                        return <Card titulo="Source">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'sourceLocation') {
                        return <Card titulo="Source Location">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'validationForm') {
                        return <Card titulo="Validation Form">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'metamodelcompleteness') {
                        return <Card titulo="Metamodel Completeness">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'syntaxlevel') {
                        return <Card titulo="Syntax level">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'toolsuport') {
                        return <Card titulo="Tool Suport">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'definitionofconcepts') {
                        return <Card titulo="Definition of Concepts">
                            <span>{extension[item]}</span>
                        </Card>
                    }
                    if (item === 'link') {
                        return <Card titulo="Link">
                            <a href={`${extension[item]}`}>
                                <svg xmlns="http://www.w3.org/2000/svg"  className="h-6 w-6" fill="none" width={'32px'} height={'32px'} stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </Card>
                    }
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
                            name: value.name,
                            meaning: value.meaning,
                            conect: value.conect,
                            register: value.register

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
                console.log(databaseExtension)
                const parsedExtension = {
                    title: databaseExtension.title,
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
                    definitionofconcepts: databaseExtension.definitionofconcepts,
                    link: databaseExtension.link
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
                    <span>Name</span>
                    <span>Meaning</span>
                    <span>Kind</span>
                    <span>Register</span>

                </div>
                <div>
                    {getConstructs(constructs)}
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
                    <Button
                        className="button-add-construct"
                        onClick={openModalEdit}>
                        Edit
                    </Button>
                </div>}

            {admin && <div className="modal">
                <Modal
                    isOpen={modalEditIsOpen}
                    onRequestClose={closeModalEdit}
                    contentLabel="Example Modal">
                    <Button onClick={closeModalEdit}>X</Button>
                    <FormExtensionEdit data={extension} idExtension={extensionId} />
                </Modal>
            </div>}

            {admin && <div className="modal">
            
                <Modal
                    className="modal-style"
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal">
                    {/* <Button onClick={closeModal}>X</Button> */}
                    <FormConstruct />
                
                </Modal>
            </div>}


        </div>
    )
}

export default Extension