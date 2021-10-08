import React,{useState, FormEvent} from 'react'

import Card from '../Layout/Card'
import './Extensions.scss'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { Button } from '../../../component/Button'
import {database, firebase} from '../../../services/firebase'

import ExtensionsList from './data/ExtensionsList.js'



const Extensions = () => {

    const history = useHistory()
    const { user, sigInWithGoogle } = useAuth()
    const [filterState, setFilterState] = useState('')

    function getExtensios() {
        return ExtensionsList.map(extension => {
            return <div key={extension.title} className="extensions">
                <span>{extension.id} </span>
                <span>{extension.title} </span>
                <span>{extension.author} </span>
                <span>{extension.date} </span>
                <Button>Detalhes</Button>
            </div>

        })
    }

    async function handleJoinExtension(event: FormEvent){
        event.preventDefault();

        if(filterState.trim() === '') {
            return
        }

        const extensionRef = await database.ref(`extensions/${filterState}`).get()
        console.log(extensionRef)

        if(!extensionRef.exists()){
            alert("Extension not found")
            return;
        }

        history.push(`/extension/${filterState}`)
    }

    return (
        <div className="content">
        <h2>Extension List</h2>
            <form className="menu-busca" onSubmit={handleJoinExtension} >
                {/* <select value={filterState} onChange={event =>setFilterState(event.target.value)}>
                    <option value="author">Author</option>
                    <option value="year">Year</option>
                    <option value="applicationarea">ApplicationArea</option>
                    <option value="source">Source</option>
                </select> */}
                <input
                    type="text"
                    placeholder="..."
                    onChange={event => setFilterState(event.target.value)}
                    value={filterState}
                />
                <button type="submit">
                    Search
                </button>
            </form>
            
            <div>
            <Card>
                <div className="caption">
                    <span>ID</span>
                    <span>Title</span>
                    <span>Author</span>
                    <span>Date</span>
                    <span></span>
                </div>
                <div>
                    {getExtensios()}
                </div>

            </Card>

            </div>
            

        </div>
    )
}

export default Extensions