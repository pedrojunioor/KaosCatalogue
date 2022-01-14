import React from 'react';
import './Modal.scss'
import business from '../../../data/Endpoint_State.json'

interface props {
    selected?: string,
}

const Modal = (props: props) => {
    function showInfos(item: string[]) {
        return item.map(i => {
            return <p>{i}</p>
        }
        )
    }

    function showInfo(item: string) {
        return <p>{item}</p>
    }

    function mountModal() {
        return business.map(bus => {
            if (bus.id === props.selected) {
                return <table className="layout">
                    <tr>
                        <th>
                            <strong>ID: </strong>{showInfo(props.selected)}
                        </th>
                        <th>
                            <strong>NAME:</strong> {showInfo(bus.name)}
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <strong>CODE:</strong> {showInfo(bus.code)}
                        </th>
                        <th>
                            <strong>CITIES:</strong> {showInfos(bus.cities)}
                        </th>
                    </tr>

                </table>

            }
        })
    }


    return (
        <>
            {mountModal()}
        </>
    )
}

export default Modal