import React,{useState, FormEvent, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import {database, firebase} from '../../../services/firebase'
import FormConstruct from '../Constructs/FormConstruct'
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
    type: string
}

type extensionParams = {
    id: string
}

const Extension = () => {

    const { user, sigInWithGoogle } = useAuth()
    const params = useParams<extensionParams>();
    const extensionId = params.id;

    const [constructs,setConstructs] = useState<Construct[]>([])
    const [title,setTitle] = useState('')

 
    const [showForm, setShowForm] = useState<boolean>(false)

    function isAdmin(){
        if(user?.emaill === "juniorsj33@gmail.com"){
            setShowForm(true)
        }
    }

    useEffect(() => {
        const extensionRef = database.ref(`extensions/${extensionId}`);
        
        extensionRef.on('value', extension => {
            console.log(extension.val().constructs);
            const databaseExtension = extension.val()
            const firebaseConstructs:FirebaseConstructs = databaseExtension.constructs ?? {}; 
            const parsedExtension = Object.entries(firebaseConstructs).map(([key,value]) => {
                return{
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
        })

    },[extensionId]);
    


    return (
        <div className="content">
        <div>
            <h1>Extension {title}</h1>
            {constructs.length > 0 && <span> {constructs.length} Constructs</span> }
        </div>
           
            <Button
                onClick={()=>isAdmin()}>
                Add Construct
            </Button>
            {showForm && <FormConstruct/>}
            {JSON.stringify(constructs)}
        </div>
    )
}

export default Extension