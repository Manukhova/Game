import React from 'react'
import Cell from './Cell'
import Modal from './Modal'
import {start, keys} from './const'
import {getRow, getColumn, getInitialBoard} from './utils'

class MathPlosion extends React.Component {
	constructor (props) {
		super(props);

		const initialBoard = getInitialBoard();
		const boardSize = props.boardSize || 5;

		this.state = {
			gameState: 'NOT_STARTED',
			boardSize: boardSize,
			board: initialBoard,
			currentCell: 1,
			randomCell: 0,
			secondsLeft: start,
			isRight: null
		}

		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleAnswerClick = this.handleAnswerClick.bind(this);
		this.tick = this.tick.bind(this);
		this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);

		window.addEventListener('keydown', this.handleKeyPress)
		window.addEventListener('input', this.handleChange)
	}

	setRandomCell () {
		const {
      boardSize,
			randomCell,
			board
		} = this.state;

		let randomID = Math.floor(Math.random() * boardSize * boardSize);

		while (document.getElementById(`${randomID}`).value) {

			randomID = Math.floor(Math.random() * boardSize * boardSize);
			if (board.indexOf(null) === -1) {
				this.setState({
					gameState: 'WIN'
				});
				this.endGame();
				break;
			}
		}

		document.getElementById(`${randomID}`).parentNode.classList.add('random-cell');

		this.setState({
			randomCell: randomID
		})

	}

	startGame () {
		const {
			secondsLeft
		} = this.state;

		this.timer = setInterval(this.tick, 1000);
		this.setRandomCell();
		this.setState({
			secondsLeft: start,
  	});
	}

	endGame () {
      clearInterval(this.timer);
  }

  tick () {
      const {
        secondsLeft,
				gameState
      } = this.state;

			const time = secondsLeft - 1 > 0 ? secondsLeft - 1 : 0;

			if (time === 0) {
				this.setState({
					gameState: 'ENDED'
				});
				this.endGame();
			}

      this.setState({
				secondsLeft: time
			});
  }

	handleAnswerClick () {
		const {
			gameState,
			isRight,
			board,
		} = this.state

		if(isRight) {
			if (board.indexOf(null) === -1) {
				this.setState({
					gameState: 'WIN',
					isRight: null
				});
			} else {
				this.setState({
	        gameState: 'RIGHT_ANSWER',
					isRight: null
				});
			}
			this.endGame();
		} else {
			this.setState({
        gameState: 'WRONG_ANSWER',
				isRight: null
			});
			this.endGame();
		}
	}

	handleChange (e) {
		const {
			gameState,
			secondsLeft,
			boardSize,
			board,
			isRight
		} = this.state

		const index = parseInt(e.target.id);

		if (parseInt(e.target.value) === getRow(index) * getColumn(index)) {
				let currentBoard = board;
				currentBoard[index] = parseInt(e.target.value);
				this.setState({
						board: currentBoard,
						isRight: true
				});
		} else {
				this.setState({
					  isRight: false
				});
		}
  }

	handleKeyPress (e) {
		const {
			gameState,
			currentCell,
			boardSize,
			secondsLeft,
			board
		} = this.state

		let newCurrentCell = currentCell;

		switch (e.keyCode) {
			case keys.DOWN:
				newCurrentCell += boardSize;
				break;
			case keys.UP:
				newCurrentCell -= boardSize;
				break;
			case keys.RIGHT:
				newCurrentCell += 1;
				break;
			case keys.LEFT:
				newCurrentCell -= 1;
				break;
			case keys.ENTER:
			if(gameState === 'ENDED' || gameState === 'WIN') {
				let refreshBoard = getInitialBoard();
				this.setState({
					board: refreshBoard,
					gameState: 'STARTED'
				});
				this.startGame();
				break;
			} else {
				this.setState({
					gameState: 'STARTED'
				});
				this.startGame();
			}
				break;
			default:
  			document.querySelector('.current-cell input').focus();
				break;
		}

		if (newCurrentCell < 1 || newCurrentCell % boardSize === 0 || newCurrentCell > boardSize * boardSize - boardSize) {
			newCurrentCell = currentCell;
		}

		this.setState({
			currentCell: newCurrentCell
		})

    document.querySelector('.current-cell input').focus();
	}

	render () {
		const {
			gameState,
			board,
			boardSize,
			currentCell,
			randomCell,
			secondsLeft
		} = this.state;

		if (gameState === 'STARTED') {

			return (
	      <div className="cont">

				<div className="board"
					style={{
						width: boardSize * 60,
						height: boardSize * 60
					}}>

					{ board.map((cell, i) => {
							return (
								<Cell
									value={cell}
									id={i}
									isCurrent={i === currentCell}
								  isRandom={i === randomCell}	/>
							)
						})
					}
				</div>

				<div className="timer" style={{width: boardSize * 60}}>{secondsLeft}</div>

				 <div className="answer">
					 <button className="btn-answer" onClick={this.handleAnswerClick}>Press to answer</button>
				</div>

				</div>

			)
	  } else {
			return (
				<div className="modal">
					 <Modal gameState={gameState} />
					<div className="modal-overlay"></div>
				</div>
			)
		}
	}
}

export default MathPlosion
