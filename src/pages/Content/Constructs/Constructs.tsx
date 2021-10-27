import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import { database } from '../../../services/firebase'
import Card from '../Layout/Card'
import FormConstruct from '../Constructs/FormConstruct'
import Modal from 'react-modal';
import './Constructs.scss'

type Construct = {
    area: string,
    concept: string,
    description: string,
    form: string,
    register: string,
    type: string
    IdExtension?: string
}

type constructParams = {
    idExtension: string
    idConstruct: string
    }

const Constructs = () => {

    const params = useParams<constructParams>();
    
    const extensionId = params.idExtension;
    const constructId = params.idConstruct;
    

    const [construct, setConstruct] = useState<Construct>()

    function showConstruct(construct: Construct) {
        if (construct !== undefined) {
            return Object.keys(construct).map(item => {
                if (construct[item] !== undefined) {
                    return <Card titulo={item}>
                        <span>{construct[item]}</span>
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
        const constructRef = database.ref(`extensions/${extensionId}/constructs/${constructId}`);
        constructRef.on('value', construct => {
            const databaseExtension = construct.val()
            if (databaseExtension !== null) {
                const parsedExtension = {
                    area: databaseExtension.area,
                    concept: databaseExtension.concept,
                    description: databaseExtension.description,
                    form: databaseExtension.form,
                    register: databaseExtension.register,
                    type: databaseExtension.type
                }
                setConstruct(parsedExtension)
            }
        }
        )
    }, [constructId])

    return (
        <div className="content" >
            <Card titulo='Construct'>
                <div className="Cards">
                    {showConstruct(construct)}
                </div>
            </Card>
        </div>
    )
}

export default Constructs