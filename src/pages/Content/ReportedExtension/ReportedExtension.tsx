import React,{useState, useEffect} from 'react'

import Card from '../Layout/Card'
import './ExtensionsReported.scss'
import {database} from '../../../services/firebase'
import { Button } from '../../../component/Button'
import Modal from 'react-modal';
import FormExtension from '../Form/FormExtension'

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
    definitionofconcepts: string,
    status: string
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
    definitionofconcepts: string,
    status: string
}

const ReportedExtension = () => {

    const [extensions,setExtensions] = useState<Extension[]>([])
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function getExtensios(extensions : Extension[]) {
        return extensions.map((extension,i) => {
            return <div key={extension.title} className="extensions">
                <span>{i+1}</span>
                <span>{extension.title} </span>
                <span>{extension.author} </span>
                <span>{extension.link}</span>
                <span>{extension.reportedby}</span>
                <span>{extension.status}</span>
                <div className="to-approve">
                    <Button 
                        className="button-approve"
                        onClick={()=> setIsOpen(true)}
                        >Aprrove</Button>
                    <Button 
                        className="button-reject"
                        onClick={()=> handleDeleteExtension(extension.id)}
                        >Reject</Button>
                </div>
            </div>
        })
    }

    async function handleDeleteExtension(extensionId: string) {
        if (window.confirm("Tem certeza que deseja deletar ?")) {
            await database.ref(`reportedextensions/${extensionId}`).remove()
        }
    }

    useEffect(() => {
        const extensionRef = database.ref(`reportedextensions`);
        
        extensionRef.on('value', extension => {
            const databaseExtension = extension.val()
            const firebaseExtensions:FirebaseExtensions = databaseExtension ?? {}; 
            const parsedExtension = Object.entries(firebaseExtensions).map(([key,value]) => {
                return{
                    id: key,
                    title: value.title,
                    author: value.author,
                    link: value.link,
                    reportedby: value.userName,
                    status: value.status
                }
            })
            setExtensions(parsedExtension)
        })

    },[]);

    return (
        <div className="content">
            <Card titulo="Reported Extensions">
                <div className="caption">
                    <span>-</span>
                    <span>Title</span>
                    <span>Author</span>
                    <span>Link</span>
                    <span>Reported By</span>
                    <span>Status</span>
                    <span>To approve</span>
                </div>
                <div>
                    {getExtensios(extensions)}
                </div>
            </Card>
            
            <Modal
                
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal">
                <Button onClick={closeModal}>X</Button>  
                <FormExtension />
            </Modal>
           
        </div>
    )
}

export default ReportedExtension