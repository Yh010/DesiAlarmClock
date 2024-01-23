
import { useState,useEffect } from 'react'
import './App.css'
import Alarm from './components/Alarm'
import SongsearchButton from './components/SongsearchButton'

function App() {
  const [flag, setFlag] = useState(1);
  useEffect(() => {
    
  }, [flag])
  function getFlagValue(data) {
    if (data) {
        console.log("yes u did it yash,data ");
    }
  
  }


  return (
    <>
      <div className='flex justify-between'>
        <div>
          {/*           <Navbar /> */}
          
          <SongsearchButton/>
        </div>
        <div>
          
        </div>
        
        <Alarm getFlagValue={getFlagValue} />
        
      </div>
      
    </>
  )
}

export default App
