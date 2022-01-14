import { BrowserRouter } from 'react-router-dom';

import Routes from './routes'
import Header from './pages/Header/Header'
import Navbar from './pages/Navbar/Navbar'
import Footer from './pages/Footer/Footer'
import './App.scss'
import { AuthContextProvider } from './contexts/AuthContexts';
// import {Provider} from 'react-redux'
// import { createStore, applyMiddleware} from 'redux';
// import rootReducer  from './redux/reducers'
// import ReduxThunk from 'redux-thunk'

function App() {

    return (
        <div className="App">
           {/* <Provider store={createStore(rootReducer, {}, applyMiddleware(ReduxThunk))}> */}
           <BrowserRouter>
                <AuthContextProvider>
                    <Header />
                    <Navbar />
                    <Routes />
                    {/* <Footer /> */}
                </AuthContextProvider>
                </BrowserRouter>
           {/* </Provider>          */}
        </div>
    );
}



export default App;
