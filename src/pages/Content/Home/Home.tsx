import React from 'react'
import '../template-content.scss'
import './Home.scss'
import Card from '../Layout/Card'

// import { useAuth } from '../../../hooks/useAuth'

const Home = () => {

    return (
        <div className="content">
            <div className="home">
                <div className="text-initial">
                    <h1>KAOS Extension Catalogue </h1>
                    <h4>Last update: December 2021 </h4>
                    <p> 
                        Goal-oriented modelling is one of the most important research developments in Requirements 
                        Engineering field. While object-oriented analysis fits well to the late stages of requirement 
                        analysis, the goal-oriented analysis is more natural for the earlier stages where the organizational 
                        goals are analyzed to identify and justify software requirements and position them within the 
                        organizational system. Some goal-based modelling languages have been proposed, we can cite KAOS. 
                        Several KAOS extensions have been proposed to adapt KAOS to specific application areas, such as 
                        Aspects and adaptive systems.
                    </p>
                    <p>
                        Thus, we are interested in understand how KAOS extensions has been performed and improve this way. 
                        The KAOS Extensions catalogue is important to support the identifications of KAOS extensions and its 
                        constructs and easier reuse the extensions and its constructs. The KAOS extensions catalogue was populated 
                        initially with papers identified by a systematic literature review about KAOS extensions. It is maintained 
                        with suggestion of papers.
                    </p>
                    <p>
                        In this catalogue is possible to list the indexed extensions (an optional representation in form of a tree is available), 
                        list its constructs and perform search by author, title and application area. It is also possible to suggest papers to be 
                        introduced in catalogue.
                    </p>
                    <div>
                   
                    <ul><label>Team: </label>
                        <li>Enyo Gonçalves - Universidade Federal do Ceará (Brazil) - enyo@ufc.com.br</li>
                        <li>Pedro Rodrigues Carvalho Junior - Universidade Federal do Ceará (Brazil) - juniorsj33@gmail.com</li>
                    </ul>

                    </div>
                    
                </div>


            </div>
        </div>

    )
}

export default Home