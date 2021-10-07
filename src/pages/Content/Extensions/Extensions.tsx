import React, { useRef, useState } from 'react'
import Card from '../Layout/Card'
import '../template-content.scss'
import './Extensions.scss'
import ExtensionsList from './data/ExtensionsList.js'
import { Button } from '../../../component/Button'

const Extensions = () => {

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

    return (
        <div className="content">
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
    )
}

export default Extensions