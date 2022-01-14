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
    const [constructsSelected, setConstructsSelected] = useState<Construct[]>([])
    const [filterState, setFilterState] = useState('name')
    const [parseState, setParseState] = useState<String>('')


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

        if (constructsSelected.length > 0) {
            return constructsSelected.map((construct, i) => {
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
            let construtores: any = []
            Object.entries(databaseExtension).forEach(([key, value]) => {
                if (value.constructs) {

                    Object.entries(value.constructs).forEach(([key, value]) => {
                        construtores = [
                            ...construtores,
                            { key: key, value: value }
                        ]
                    })
                }
            })


            const parsed = Object.entries(construtores).map(([key, value]) => {

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

    async function handleJoinConstructsSearchNew(event: FormEvent, filter: string, parse: string) {
        event.preventDefault();

        const extensionRef = database.ref(`extensions`);
        extensionRef.on('value', extension => {
            const databaseExtension = extension.val()
            let construtores: any = []
            Object.entries(databaseExtension).forEach(([key, value]) => {
                if (value.constructs) {

                    Object.entries(value.constructs).forEach(([key, value]) => {
                        construtores = [
                            ...construtores,
                            { key: key, value: value }
                        ]
                    })
                }
            })

            let temp

            if (filter === 'name') {

                const parsed = construtores.filter(construct => construct.value.name.toLowerCase().includes(parse.toLowerCase()))

                temp = parsed
            }
            else if (filter === 'conect') {
                const parsed = construtores.filter(construct => construct.value.conect.toLowerCase().includes(parse.toLowerCase()))

                temp = parsed
            }

            const parsed = Object.entries(temp).map(([key, value]) => {

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
    }

    function mountInput(place: string) {

        if (place === 'name') {
            return <div className="input-text">
                <input
                    type="text"
                    placeholder="Enter the Name"
                    onChange={event => { setParseState(event.target.value) }}
                    value={parseState.toString()}
                />
            </div>
        }

        if (place === 'conect') {
            return <div className="input-text">
                <input
                    type="text"
                    list="conects"
                    // placeholder="Enter the Source"
                    onChange={event => { setParseState(event.target.value) }}
                    value={parseState.toString()}
                />
                <datalist id="conects">
                    <option value="Link" />
                    <option value="Node" />
                </datalist>
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

    return (
        <div>

            <form className="menu-busca" onSubmit={e => handleJoinConstructsSearchNew(e, filterState, parseState)} >
                <div className="input-select">
                    <select value={filterState} onChange={(event) => { setFilterState(event.target.value) }}>
                        <option value="name">Name</option>
                        <option value="conect">Connect</option>
                    </select>
                </div>

                {mountInput(filterState)}
                <div>
                    <Button type="submit"> Search</Button>
                </div>
            </form >
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
        </div>
    )
}

export default Constructs