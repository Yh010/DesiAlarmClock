
import './App.css'
import Alarm from './components/Alarm'
import Navbar from './components/Navbar'
import SongsearchButton from './components/SongsearchButton'

function App() {

  return (
    <>
      <div className='flex justify-between'>
        <div>
{/*           <Navbar /> */}
          <SongsearchButton />
        </div>
        
        <Alarm/>
        
      </div>
      
    </>
  )
}

export default App
