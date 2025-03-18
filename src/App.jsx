import { useState, useCallback } from 'react';
import './App.css';
import AgeRequester from './components/age-requester/age-requester-v2.jsx';
import Header from './containers/header/header.jsx';

function App() {

  const [temp, setTemp] = useState(false);

  const handleDisplay= useCallback(() => {
    setTemp(t => !t);
  })

  return (
    <>
      <Header />
      <main>
        <button onClick={handleDisplay}>{temp ? 'Caché' : 'Afficher'}</button>
        {temp && (
          <AgeRequester firstname='Davit' />
        )}
      </main>
    </>
  );
}

export default App;
