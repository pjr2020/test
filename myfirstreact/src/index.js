import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
class Square extends React.Component {
  render() {
    return <button className="square" 
	onClick={() => { this.props.onClick() }}>
	{this.props.value}
	</button>;
  }
}

class Board extends React.Component {
	constructor(props)
	{
		super(props);
		this.state={squares:Array(9).fill(null),xIsNext:true,history: [{        squares: Array(9).fill(null),      }],}
		
	}
	handleClick(i)
	{
		const squares = this.state.squares.slice();; 
		if(squares[i] || calculateWinner(squares))
		{return;}
		else{
		squares[i] = this.state.xIsNext ? 'X' : 'O';    
		this.setState({squares: squares,xIsNext:!this.state.xIsNext});
		}
	}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} 
	onClick={() => this.handleClick(i)}/>;
  }
  jumpTo(move){
	  const squares=Array(9).fill(null);
	  this.setState({squares:squares,xIsNext:true})
	  
  }
  render() {
	const history = this.state.history;
    const current = history[history.length - 1];

    const moves = history.map((step, move) => {
		const desc = move ?'Go to move #' + move :'Go to game start';
		return (
        <li>
		<button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
		);
		});
	  
	  
	  
	const winner = calculateWinner(this.state.squares);
	let status;
	if(winner)
	{status='Winner: '+winner}
	else
	{
    status = "Next player: "+(this.state.xIsNext?'X':'O');
	}
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
	  <button onClick={() => this.jumpTo(0)}>restart</button>
      </div>

    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>

	<Game />
	<App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
