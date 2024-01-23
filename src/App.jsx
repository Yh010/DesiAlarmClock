import './App.css'
import Alarm from './components/Alarm'
import SongsearchButton from './components/SongsearchButton'

function App() {

  return (
    <>
      <div className='flex justify-between'>
        <SongsearchButton />
        <Alarm/>
        
      </div>
      
    </>
  )
}

export default App
