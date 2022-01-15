import { BrowserRouter } from 'react-router-dom';

import Routes from './routes'
import Header from './pages/Header/Header'
import Navbar from './pages/Navbar/Navbar'
import Footer from './pages/Footer/Footer'
import './App.scss'
import { AuthContextProvider } from './contexts/AuthContexts';

function App() {

    return (
        <div className="App">
          
           <BrowserRouter>
                <AuthContextProvider>
                    <Header />
                    <Navbar />
                    <Routes />
                    {/* <Footer /> */}
                </AuthContextProvider>
                </BrowserRouter>
       
        </div>
    );
}



export default App;
