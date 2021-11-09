import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import { database } from '../../../services/firebase'
import Card from '../Layout/Card'
import FormConstruct from './FormConstruct'
import Modal from 'react-modal';
import { storage } from '../../../services/firebase'
import './Constructs.scss'

type Construct = {
    area: string,
    concept: string,
    description: string,
    form: string,
    register: string,
    type: string
    IdExtension?: string
    image: string,
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

    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [showImage, setShowImage] = useState('')

    const handleChange = (event: any) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleUpload = () => {
        if (image !== null) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image)

            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                },
                error => {
                    console.log(error)
                },
                () => {
                    storage
                        .ref('images')
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            database.ref(`/extensions/${extensionId}/constructs/${constructId}`).update(
                                { image: url }
                            )
                        })
                }
            )
        }
    }

    // async function handleSendConstruct(event: FormEvent) {
    //     event.preventDefault()

    //     await database.ref(`extensions/${extensionId}/constructs`).update(
    //         {image: url}
    //     )

    // }

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
                    if (item === 'area') {
                        return <Card titulo="Application Area">
                            <span>{construct[item]}</span>
                        </Card>
                    }
                    if (item === 'concept') {
                        return <Card titulo="Concept">
                            <span>{construct[item]}</span>
                        </Card>
                    }
                    if (item === 'description') {
                        return <Card titulo="Description">
                            <span>{construct[item]}</span>
                        </Card>
                    }
                    if (item === 'form') {
                        return <Card titulo="Form">
                            <span>{construct[item]}</span>
                        </Card>
                    }
                    if (item === 'register') {
                        return <Card titulo="Register">
                            <span>{construct[item]}</span>
                        </Card>
                    }
                    if (item === 'type') {
                        return <Card titulo="Type">
                            <span>{construct[item]}</span>
                        </Card>
                    }
                    if (item === 'image') {
                        return <Card titulo="Image">
                            <div className="image-area">
                                <img className="img-construct" src={construct[item] || 'https://placeholder.pics/svg/100/FFF/000/not-image'} alt="Image-Construct" />
                                {admin && <div>
                                    <progress value={progress} max="100" />
                                    <input type="file" onChange={handleChange} />
                                    <Button onClick={handleUpload}>Upload</Button>
                                </div>}

                            </div>
                            
                        </Card>
                    }
                    else {
                        return <Card titulo={item}>
                            <span>{construct[item]}</span>
                        </Card>
                    }
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
                    type: databaseExtension.type,
                    image: databaseExtension.image
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

            {/* <div>
                <progress value={progress} max="100" />
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload}>Upload</button>
            </div> */}



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