function Paper() {
  return (
    <img src="images/paper.png" className="button-img" ></img>
  );
}
function Rock() {
  return (
    <img src="images/rock.png" className="button-img" ></img>
  );
}
function Scissors() {
  return(
  <img src="images/scissors.png" className="button-img" ></img>
  );
}
function Lizard() {
  return(
  <img src="images/lizard.png" className="button-img" ></img>
  );
}
function Spock() {
  return(
  <img src="images/spock.png" className="button-img" ></img>
  );
}

const Link = ReactRouterDOM.Link;

const Route = ReactRouterDOM.Route;

function Button(){
  return (
    <ReactRouterDOM.HashRouter>
       <button className="link"><Link to="/rules">Rules</Link></button>
      <Route path="/rules" exact component={Rules} />
    </ReactRouterDOM.HashRouter>
  )
}

function Rules(){
  return (
    <div className="rules">
      <h1>Rules</h1>
      <div className="images">
        <img src="images/rules.png"></img>
        <img src="images/sheldon.jpg"></img>
      </div>
    </div>
  )
}

const choices = [
  {id: 1, name: 'rock', component: Rock},
  {id: 2, name: 'paper', component: Paper},
  {id: 3, name: 'scissors', component: Scissors},
  {id: 4, name: 'lizard', component: Lizard},
  {id: 5, name: 'spock', component: Spock}
];


function App() {
  const [userChoice, setUserChoice] = React.useState(null);
  const [computerChoice, setComputerChoice] = React.useState(null);
  const [wins, setWins] = React.useState(0);
  const [losses, setLosses] = React.useState(0);
  const [gameState, setGameState] = React.useState(null);

  React.useEffect(()=> {
    restartGame();
  }, []);

  function restartGame(){
    setGameState(null);
    setUserChoice(null);
    const randomChoice = choices[Math.floor(Math.random()* choices.length)];
    setComputerChoice(randomChoice);
  }

  function handleUserChoice(choice){
    const chosenChoice = choices.find(c=> c.id == choice);
    setUserChoice(chosenChoice);

    if(computerChoice.id == chosenChoice.id){
      setGameState('draw');
    }else if(
      chosenChoice.name == "scissors" && (computerChoice.name == "spock" || computerChoice.name == "rock") ||
      chosenChoice.name == "spock" && (computerChoice.name == "paper" || computerChoice.name == "lizard") ||
      chosenChoice.name == "paper" && (computerChoice.name == "scissors" || computerChoice.name == "lizard") ||
      chosenChoice.name == "lizard" && (computerChoice.name == "scissors" || computerChoice.name == "rock") ||
      chosenChoice.name == "rock" && (computerChoice.name == "spock" || computerChoice.name == "paper")
    ){
        setGameState('lose');
        setLosses(losses => losses+1)
    }else{
      setGameState('win');
      setWins(wins => wins+1)
    }
  }

  function renderComponent(choice) {
    const Component = choice.component;
    return <Component />
  }

  function showRules(){
    return <Button />
  }

  return (
    <div className="app">
      <img src="images/bg.jpg" alt="" className="bg"></img>
      <div className="info">
        <h2>Rock. Paper. Scissors. Lizard. Spock.</h2>
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins == 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses == 1 ? 'Loss' : 'Losses'}</span>
          </div>
        </div>
      </div>

      {gameState && (
      <div className={`game-state ${gameState}`} 
      onClick={()=>restartGame()}
      >
        <div>
          <div className="game-state-content">
            <p>{renderComponent(userChoice)}</p>
            <p>{gameState == 'draw' ? 'draw' : `You ${gameState}!`}</p>
            <p>{renderComponent(computerChoice)}</p>
          </div>
          <button>Play Again</button>
        </div>
      </div>
      )}
      <div className="choices">
        <div>You</div>
        <div />
        <div>Computer</div>

        <div className="grid-container">
          <button className="rock" onClick={()=>{handleUserChoice(1)}}>
            <Rock />
          </button>
          <div id="paper">
          <button className="paper" onClick={()=>{handleUserChoice(2)}}>
            <Paper />
          </button>
          </div>
          <button className="scissors" onClick={()=>{handleUserChoice(3)}}>
            <Scissors />
          </button>
          <button className="lizard" onClick={()=>{handleUserChoice(4)}}>
            <Lizard />
          </button>
          <button className="spock" onClick={()=>{handleUserChoice(5)}}>
            <Spock />
          </button>
        </div>

        <div className="vs">vs</div>

        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
      <div className="btn">
        <Button />
      </div>
    </div>
  );
}


const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);