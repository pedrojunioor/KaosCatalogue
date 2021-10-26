import React,{useState, useEffect} from 'react'

import Card from '../Layout/Card'
import './Extensions.scss'
import {database} from '../../../services/firebase'

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
    id: string,
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



const ReportedExtension = () => {

    const [extensions,setExtensions] = useState<Extension[]>([])

    function getExtensios(extensions : Extension[]) {
        return extensions.map(extension => {
            return <div key={extension.title} className="extensions">
                <span>{extension.title} </span>
                <span>{extension.author} </span>
                <span>{extension.link}</span>
                <span>{extension.reportedby}</span>
            </div>

        })
    }

    useEffect(() => {
        const extensionRef = database.ref(`reportedextensions`);
        
        extensionRef.on('value', extension => {
            console.log(extension.val().constructs);
            const databaseExtension = extension.val()
            const firebaseExtensions:FirebaseExtensions = databaseExtension ?? {}; 
            const parsedExtension = Object.entries(firebaseExtensions).map(([key,value]) => {
                return{
                    id: key,
                    title: value.title,
                    author: value.author,
                    link: value.link,
                    reportedby: value.userName
                }
            })
            setExtensions(parsedExtension)
        })

    },[]);

    return (
        <div className="content">
            <Card titulo="Reported Extensions">
                <div className="caption">
                    <span>Title</span>
                    <span>Author</span>
                    <span>Link</span>
                    <span>Reported By</span>
                </div>
                <div>
                    {getExtensios(extensions)}
                </div>
            </Card>
        </div>
    )
}

export default ReportedExtension