//import logo from './logo.svg';
import './App.css';

import Timer from './Component/Timer/Timer';

import Setting from './Component/Setting/Setting';

import './Component/Setting/Setting.css';

import logoImage from './logo.png';

import { HashRouter, Routes , Route } from 'react-router-dom';


function App() {
  return(
      <div className="App">
      <header className="App-header">
        <p className='title'>
          Pomodoro Manager
        </p>
          <HashRouter>
            <Routes>
              <Route exact path='/' element={<Top />} />
              <Route exact path='/setting' element={<Setting />} />
              <Route exact path='/about' element={<About />} />
            </Routes>
          </HashRouter>
        <p>
          Produced by e1q23079
        </p>
      </header>
    </div>
  )
};

const Top = () => {
  return(
    <Timer />
  )
};

const back = () => {
  window.location.href = '/#/setting'
}

const About = () => {
  return(
    <>
      <img src={logoImage} alt='logo'/>
      <p className='parts btn longBtn' onClick={back}>BACK</p> 
    </>
  )
}

export default App;
