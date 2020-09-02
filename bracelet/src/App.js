import React, { useState, useReducer } from 'react';
import './App.css';
import './bootstrap.css';
import './style.css';

function Footer() {
  return (
    <div className="text-center">
      <span role="img" aria-label="created by">🎵: Matt Watson | 🤖: Danny Faught</span>
    </div>
  );
}

function Scale() {
  return (
    <Circle />
  )
}

function Scales() {
  return (
    <div className="text-center">
      <span><Scale /></span>
    </div>
  )
}

function Proceed(props) {
  return(<div className="btn btn-secondary rounded-circle text-center proceed"
              onClick={() => props.handleProceedClick()}>&gt;</div>);
}

function Dot(props) {
  const {isClicked, backgroundColor, dotSize} = useDotState();

  return (
    <div className="rounded-circle text-center dot"
          style={{backgroundColor: props.id === 0 ? "black" : isClicked === true ? "black" : "white",
                  width: `${dotSize}em`,
                  height: `${dotSize}em`,
                  transform: `rotate(${props.rotate}deg) translate(${props.translate})`}}
          onClick={() => {props.handleClick(props.id);}}>
    </div>
  );
}

function Circle(props) {
  const dots = new Array(12);
  for (let i = 0; i < 12; ++i) {
    dots.push(
      <Dot key={i}
          id={i}
          rotate={30 * i - 90}
          translate="8rem"
          handleClick={props.handleClick}
      />
    );
  }

  return (
    <div className="circle">
      {dots}
      <Proceed handleProceedClick={props.handleProceedClick}/>
    </div>
  );
}

function Chord(props) {
  return (
    <div className="text-center chord"><h1><small>{props.chordName}</small></h1></div>
  );
}

function Menu() {
  return(
    <div className="d-inline mx-5 float-right">Menu</div>
  );
}

function Title() {
  return(
    <div className="d-inline display-3 mx-5">Bracelet</div> 
  );
}

function TopBar() {
  return(
    <div className="rounded">
      <Title />
      <Menu />
    </div>
  );
}

function useDotState(id) {
  const [isClicked, setIsClicked] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [dotSize, setDotSize] = useState(4)

  if (id === 0) {
    setIsClicked(true);
  }

  return {
    isClicked,
    backgroundColor,
    dotSize
    }
}

function useChordState() {
  const [chordName, setChordName] = useState("Please Create a Chord");
  const [chord, setChord] = useState([0]);

  return {
    chordName,
    setChordName,
    chord
  }
}

function App() {
  const {chordName, setChordName, chord} = useChordState();
  const [chordValid, setChordValid] = useState(false);

  function handleDotClick(id) {
    if(id !== 0){
      if (chord.includes(id)) {
        chord.splice(chord.indexOf(id), 1);
        setChordName(chord.toString());
      }
      else {
        chord.push(id);
        setChordName(chord.toString());
      }
    }
  }

  function handleProceedClick() {
    setChordValid(true);
  }

  return (
    <div className="container-fluid">
        <div className="row">
          <div className="col">
            <TopBar />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Chord chordName={chordName} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Circle handleClick={handleDotClick} handleProceedClick={handleProceedClick}/> 
          </div>
        </div>
        {chordValid ? <div className="row"><div className="col"><Scales /></div></div> : null }
        <div className="row">
          <div className="col">
            <Footer />
          </div>
        </div>
    </div>
  );
}

export default App;
