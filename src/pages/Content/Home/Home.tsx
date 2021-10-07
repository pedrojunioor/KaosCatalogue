import React from 'react'
import '../template-content.scss'
import './Home.scss'
import Card from '../Layout/Card'

// import { useAuth } from '../../../hooks/useAuth'

const Home = () => {

    return (
        <div className="content">
            <div className="home">
                <Card title="Welcome" color="#bdc3c7">
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Enim dicta ut aspernatur culpa eius rerum consectetur id
                            magnam sequi! Aliquid hic voluptatum minus magnam ullam
                            similique laudantium saepe vitae veritatis?
                        </p>
                        <ul>
                            <li><span>Enyo José Tavares</span></li>
                            <li><span>Pedro Rodrigues de Carvalho Junior</span></li>
                        </ul>
                    </div>

                </Card>

            </div>
        </div>

    )
}

export default Home