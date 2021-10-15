import React,{useState, FormEvent, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import {database, firebase} from '../../../services/firebase'
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
    source:string,
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
    
    applicationArea: string,
    author: string,
    constructs?: Construct[],
    datePublication: string,
    extensionBase: string,
    extensionDerivative: string,
    source:string,
    sourceLocation: string,
    title: string,
    userId: string,
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

    const { user, sigInWithGoogle } = useAuth()
    const params = useParams<extensionParams>();
    const extensionId = params.id;

    const [constructs,setConstructs] = useState<Construct[]>([])
    const [extension,setExtension] = useState<Extension>()
    const [title,setTitle] = useState('')

    const [showForm, setShowForm] = useState<boolean>(false)

    function isAdmin(){
        if(user?.emaill === "juniorsj33@gmail.com"){
            setShowForm(true)
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
    function showExtension(extension : Extension) {
        console.log('EXTENSAO',extension)
        if(extension !== undefined){
            return Object.keys(extension).map(item =>{
                console.log(item)
                    return <Card titulo={item}>
                        {extension[item]}
                    </Card>
                   
                       
            })
        }
    }



    // useEffect(()=>{
    //     showExtension(extension);
    // },[extension])
  
    useEffect(() => {
        const extensionRef = database.ref(`extensions/${extensionId}`);
        extensionRef.on('value', extension => {
            const databaseExtension = extension.val()
            const firebaseConstructs:FirebaseConstructs = databaseExtension.constructs ?? {};
            if(firebaseConstructs !== undefined){
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
                
            }
            
            
        })

    },[extensionId]);

    useEffect(() => {
        const extensionRef = database.ref(`extensions/${extensionId}`);
        extensionRef.on('value', extension => {
            const databaseExtension = extension.val()
            const parsedExtension = {
                    applicationArea: databaseExtension.applicationArea,
                    author: databaseExtension.author,
                    datePublication: databaseExtension.datePublication,
                    extensionDerivative: databaseExtension.extensionDerivative,
                    extensionBase: databaseExtension.extensionBase,
                    source: databaseExtension.source,
                    sourceLocation: databaseExtension.sourceLocation,
                    // title: databaseExtension.title,
                    // userId: databaseExtension.userId,
                    validationForm: databaseExtension.validationForm,
                    metamodelcompleteness: databaseExtension.metamodelCompletenessState,
                    syntaxlevel: databaseExtension.syntaxLevelState,
                    toolsuport: databaseExtension.toolSupportState,
                    definitionofconcepts: databaseExtension.definitionofConceptsState
                }
                setExtension(parsedExtension)
            }
            )  
        },[extensionId])

    return (
        <div className="content">
            
           
            {/* <Button
                onClick={()=>isAdmin()}>
                Add Construct
            </Button> */}
            
            <Card titulo={title}>
                <div className="Cards">
                    {showExtension(extension)}
                </div>
            </Card>
            
        
            
            {/* {showForm && <FormConstruct/>} */}
    
        </div>
    )
}

export default Extension