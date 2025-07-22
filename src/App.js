import {ReactComponent as LogoSvg} from './ctslogo.svg';
import './App.css';
import PopUpCanvas from './Components/EntryPopUp'
import React, { useState, useEffect } from 'react';
import PopUp from './Components/Popup';
import Header from './Components/Header';
import ReactDOM from 'react-dom';
import {Container} from "react-bootstrap"; // For using Portals

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="App-logo" onClick={onClose}>
            <div className="App-logo" onClick={(e) => e.stopPropagation()}>
                {children}
                <button onClick={onClose}>Close</button>
            </div>
        </div>,
        document.getElementById('root') // Assuming a div with id 'modal-root' in your index.html
    );
};

function App() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Show popup as soon as component mounts
        setShowPopup(true);
    }, []);

  return (<>
      <Header />
    <main className="App">
        <Container>
          < LogoSvg />
        {showPopup && (
            <PopUp className='App-logo' onClose={() => setShowPopup(false)}>
                <PopUpCanvas onClose={() => setShowPopup(false)} />
            </PopUp>
        )}
        </Container>
    </main>
  </>);
}

export default App;
