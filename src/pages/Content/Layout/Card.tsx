import './Card.scss'
import React from 'react'



function Card(props : any){
    return(
        <div className="Card" style={{borderColor: props.color || '#000'}}>
            <div className="Label" style={{backgroundColor: props.color || '#000'}}>
                {props.titulo}
            </div>
            <div className="Conteudo" >
                {props.children}
            </div>
            
        </div>
    )
}

export default Card