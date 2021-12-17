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
    name: string,
    meaning: string,
    conect: string,
    register: string,
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
                return <div key={construct.id} className="constructs">
                    <span>{i + 1}</span>
                    <span>{construct.name} </span>
                    <span>{construct.meaning} </span>
                    <span>{construct.conect}</span>
                    <span>{construct.register}</span>
                    <Button onClick={e => handleJoinConstruct(e, construct.IdExtension, construct.id)}>Detail</Button>
                </div>
            }
        })
    }

    useEffect(() => {
        const extensionRef = database.ref(`extensions`);
        extensionRef.on('value', extension => {
            const databaseExtension = extension.val()
            let construtores : any = []
            Object.entries(databaseExtension).forEach(([key, value]) => {
                if (value.constructs) {
                    // console.log('constructs',value.constructs)
                    Object.entries(value.constructs).forEach(([key, value]) => {
                        console.log('key',key)
                    })
             

                    Object.entries(value.constructs).forEach(([key,value]) =>{
                        console.log('key',key)
                        console.log('value',value)
                        construtores = [
                            ...construtores,
                            {key: key, value: value}
                        ]
                    })
                }
            })
           
         
            const parsed = Object.entries(construtores).map(([key, value]) =>{
                
                return {
                    id: value.key,
                    name: value.value.name,
                    meaning: value.value.meaning,
                    conect: value.value.conect,
                    register: value.value.register,
                    IdExtension: value.value.IdExtension
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
                <span>Name</span>
                <span>Meaning</span>
                <span>Conect</span>
                <span>Register</span>
            </div>
            <div>
                {getConstructs(constructs)}
            </div>
        </Card>
    )
}

export default Constructs