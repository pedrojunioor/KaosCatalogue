import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import { database } from '../../../services/firebase'
import Card from '../Layout/Card'
import FormConstruct from './FormConstruct'
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

const Construct = () => {

    const params = useParams<constructParams>();
    const history = useHistory();
    const { user, isLoggedIn } = useAuth()
    const [admin, setAdmin] = useState<boolean>(false)
    
    const extensionId = params.idExtension;
    const constructId = params.idConstruct;
    

    const [construct, setConstruct] = useState<Construct>()

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


    async function handleDeleteConstruct() {
        if (window.confirm("Tem certeza que deseja deletar ?")) {
            await database.ref(`/extensions/${extensionId}/constructs/${constructId}`).remove()
            history.push('/constructs')
        }
    }

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

            {admin &&
                <div className="admin-area">
                    <Button
                        className="button-delete"
                        onClick={() => handleDeleteConstruct()}>
                        Delete
                    </Button>
                </div>}
            
        </div>
    )
}

export default Construct