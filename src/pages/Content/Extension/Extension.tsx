import React, { useState, FormEvent, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import { database, firebase } from '../../../services/firebase'
import FormConstruct from '../Constructs/FormConstruct'
import './Extension.scss'
import Card from '../Layout/Card'

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

    const { user } = useAuth()
    const history = useHistory()
    const params = useParams<extensionParams>();
    const extensionId = params.id;

    const [constructs, setConstructs] = useState<Construct[]>([])
    const [extension, setExtension] = useState<Extension>()
    const [title, setTitle] = useState('')

    const [showForm, setShowForm] = useState<boolean>(false)

    function isAdmin() {
        if (user?.emaill === "juniorsj33@gmail.com") {
            setShowForm(true)
        }
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
            <div>
                <Button
                    onClick={() => isAdmin()}>
                    Add Construct
                </Button>
            </div>
            <div >
                <Button className="button-delete"
                    onClick={() => handleDeleteExtension()}>
                    Delete
                </Button>
            </div>
            {/* {showForm && <FormConstruct/>} */}
        </div>
    )
}

export default Extension