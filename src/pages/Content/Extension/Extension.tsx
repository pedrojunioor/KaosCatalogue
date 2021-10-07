import React, { useRef, useState } from 'react'
import Card from '../Layout/Card'
import '../template-content.scss'
import './Extension.scss'
import ExtensionsList from '../../../data/Extensions.json'

const Extension = () => {

    const state = ExtensionsList;

    function getExtensions() {
        Object.keys(state).forEach(item =>{
            console.log(item)
        })
    }
            // return <Card key={extension.id} titulo={extension.name} color="#bdc3c7" className="cardextension">
            //     <div className="extension">
            //         <div >
            //             <span>Author: </span>
            //                 {extension.author}
            //         </div>
            //         <div >
            //             <span>Source: </span>
            //                {extension.source}                    
            //         </div>
            //         <div >
            //             <span>Date Publication: </span>
                        
            //                 {extension.datePublication}
                        
            //         </div>
            //         <div >
            //             <span>Aplication Area: </span>
            //                 {extension.aplicationArea}
            //         </div>
            //     </div>
            // </Card>

    //     })
    // }
    // function getExtensios() {
    //     return ExtensionsList.map(extension => {
    //         return <Card key={extension.id} titulo={extension.name} color="#bdc3c7" className="cardextension">
    //             <div className="extension">
    //                 <div >
    //                     <span>Author: </span>
    //                         {extension.author}
    //                 </div>
    //                 <div >
    //                     <span>Source: </span>
    //                        {extension.source}                    
    //                 </div>
    //                 <div >
    //                     <span>Date Publication: </span>
                        
    //                         {extension.datePublication}
                        
    //                 </div>
    //                 <div >
    //                     <span>Aplication Area: </span>
    //                         {extension.aplicationArea}
    //                 </div>
    //             </div>
    //         </Card>

    //     })
    // }


    return (
        <div className="content">
            <div className="home">
                {() => getExtensions()}
            </div>
        </div>
    )
}

export default Extension