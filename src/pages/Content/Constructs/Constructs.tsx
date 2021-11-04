import React, { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import { database } from '../../../services/firebase'
import Card from '../Layout/Card'
import FormConstruct from '../Constructs/FormConstruct'
import Modal from 'react-modal';
import './Constructs.scss'

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
    IdExtension: string
}

type constructParams = {
    idExtension: string
    idConstruct: string
}

type extensionParams = {
    id: string
}

const Constructs = () => {

    const history = useHistory()
    const params = useParams<extensionParams>();
    const extensionId = params.id;

    const [constructs, setConstructs] = useState<Construct[]>([])

    async function handleJoinConstruct(event: FormEvent, IdExtension: string, IdConstruct: string) {
        event.preventDefault();
        if (IdExtension.trim() === '') {
            return
        }
        if (IdConstruct.trim() === '') {
            return
        }
        const constructRef = await database.ref(`extensions/${IdExtension}/constructs/${IdConstruct}`).get()
        if (!constructRef.exists()) {
            alert("Extension not found")
            return;
        }
        history.push(`/extensions/${IdExtension}/constructs/${IdConstruct}`)
    }

    function getConstructs(constructs: Construct[]) {
        return constructs.map((construct, i) => {
            if (construct !== undefined) {
                console.log('INTEIRO',construct)
                console.log('EXT', construct.id)
                console.log('CONS', construct.IdExtension)
                return <div key={construct.id} className="constructs">
                    <span>{i + 1}</span>
                    <span>{construct.area} </span>
                    <span>{construct.concept} </span>
                    <span>{construct.description}</span>
                    <span>{construct.form}</span>
                    <span>{construct.register}</span>
                    <span>{construct.type}</span>
                    <Button onClick={e => handleJoinConstruct(e, construct.IdExtension, construct.id)}>Detail</Button>
                </div>
            }
        })
    }

    useEffect(() => {
        const extensionRef = database.ref(`extensions`);
        extensionRef.on('value', extension => {
            const databaseExtension = extension.val()
            const parsed = Object.entries(databaseExtension).map(([key, value]) => {
                if (value.constructs) {
                    let chave = Object.entries(value.constructs).map(([key,value]) => {
                        return key
                    })
                    return {
                        id: chave[0],
                        area: Object.values(value.constructs)[0]['area'],
                        concept: Object.values(value.constructs)[0]['concept'],
                        description: Object.values(value.constructs)[0]['description'],
                        form: Object.values(value.constructs)[0]['form'],
                        register: Object.values(value.constructs)[0]['register'],
                        type: Object.values(value.constructs)[0]['type'],
                        IdExtension: Object.values(value.constructs)[0]['IdExtension']
                    }
                   
                }
            })

            setConstructs(parsed)
        })

        return () => {
            extensionRef.off('value')
        }
    }, [extensionId]);

    return (
        <Card titulo="Constructs">
            <div className="caption-constructs">
                <span>-</span>
                <span>Area</span>
                <span>Concept</span>
                <span>Description</span>
                <span>Form</span>
                <span>Register</span>
                <span>Type</span>
            </div>
            <div>
                {getConstructs(constructs)}
            </div>
        </Card>
    )
}

export default Constructs