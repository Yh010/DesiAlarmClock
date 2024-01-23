
import { useState,useEffect } from 'react'
import './App.css'
import Alarm from './components/Alarm'
import SongsearchButton from './components/SongsearchButton'

function App() {
  const [flag, setFlag] = useState(1);
  const [displayResults, setDisplayResults] = useState(false);

  useEffect(() => {
    if (flag === 1) {
      setDisplayResults(true);
    }
  }, [flag]);

  function getFlagValue(data) {
    if (data) {
      console.log("yes u did it yash,data ");
      setFlag(data);

    }
  
  }


  return (
    <>
      <div className='flex justify-between'>
        <div>
          {/*           <Navbar /> */}
          
          <SongsearchButton displayResults={displayResults} />
        </div>
        <div>
          
        </div>
        
        <Alarm getFlagValue={getFlagValue} />
        
      </div>
      
    </>
  )
}

export default App
