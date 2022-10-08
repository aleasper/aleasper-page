import React from 'react';
import Square from './square.jsx';
import Score from './score.jsx';
import './style.css';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(3).fill(Array(3).fill(null)),
            playerTurn: true,
            winner: undefined,
            gameOver: false,
            gameOverShowed: false,
            resText: '',
        }
    }

    getWinner() {
        // rows
        for (let i = 0; i < this.state.squares.length; i++) {
            if (this.state.squares[i].reduce((acc, el) => {
                return acc + (el === this.state.squares[i][0] && el ? 1 : 0)
            }, 0) === this.state.squares[i].length) {
                return this.state.squares[i][0];
            }
        }
        // cols
        let i = 0;
        let counter = 0;
        for (let j = 0; j < this.state.squares[i].length; j++) {
            const comparedEl = this.state.squares[i][j];
            for (; i < this.state.squares.length; i++) {
                if (this.state.squares[i][j] === comparedEl && comparedEl) {
                    counter++;
                }
            }
            if (counter === this.state.squares.length) {
                return comparedEl;
            }
            counter = 0;
            i = 0;
        }
        // diagonal 
        for (let i = 0; i < this.state.squares.length; i++) {
            if (this.state.squares[i][i] === this.state.squares[0][0] && this.state.squares[i][i]) {
                counter++;
            }
        }
        if (counter === this.state.squares.length) {
            return this.state.squares[0][0];
        }
        counter = 0;
        for (let i = 0; i < this.state.squares.length; i++) {
            for (let j = 0; j < this.state.squares[i].length; j++) {
                if (i+j !== this.state.squares.length - 1) {
                    continue;
                }
                if (this.state.squares[i][j] === this.state.squares[0][this.state.squares[0].length - 1] && this.state.squares[i][j]) {
                    counter++;
                }
            }
        }
        if (counter === this.state.squares.length) {
            return this.state.squares[0][this.state.squares[0].length - 1];
        }
        console.log(this.state.squares);
        if (this.state.squares.every((v, i) => v.every(square => square !== null))) {
            return null;
        }

        return undefined;
    }

    async handleClick(i, j) {
        if (this.state.gameOver) {
            return;
        }
        const newSquares = JSON.parse(JSON.stringify(this.state.squares));
        newSquares[i][j] = 'x';
        return new Promise((resolve, reject) => {
            this.setState(
                {
                    squares: newSquares,
                    playerTurn: !this.state.playerTurn,
                }, 
                async () => {
                    if (await this.isGameEnded()) {
                        console.log('END', JSON.stringify(this.state.squares));
                        this.stopGame();
                        resolve();
                        return;
                    }
                    await this.executeAI();
                    if (await this.isGameEnded()) {
                        this.stopGame();
                    }
                    resolve();
                }
            );
        });
    }

    async placeRandom() {
        return new Promise((res, rej) => {
            const loop = () => {
                const i = Math.floor(Math.random() * this.state.squares.length);
                const j = Math.floor(Math.random() * this.state.squares[0].length);
                if (this.state.squares[i][j] === null) {
                    const newSquares = JSON.parse(JSON.stringify(this.state.squares));
                    newSquares[i][j] = 'o';
                    this.setState({
                        squares: newSquares,
                        playerTurn: !this.state.playerTurn,
                    },
                    () => res());
                } else {
                    setTimeout(loop, 10);
                }
            }
            loop();
        })
    }

    async executeAI() {
        await this.placeRandom();
    }

    async isGameEnded() {
        return new Promise((res, rej) => {
            const winner = this.getWinner();
            this.setState(
                {winner},
                () => {
                    res(winner !== undefined);
                }
            );
        })
    }

    renderSquare(el, i, j) {
        return (
            <Square 
                value={el} 
                key={i*10+j}
                onClick={() => this.handleClick(i, j)}
            />
        )
    }

    showGameEnd() {
        if (this.state.winner) {
            this.setState({resText: `Winner is ${this.state.winner}`});
        } else {
            this.setState({resText: `It's draw`});
        }
        this.setState({gameOverShowed: true});
    }

    componentDidUpdate() {
        if (this.state.gameOver && !this.state.gameOverShowed) {
            this.showGameEnd();
        }
    }

    stopGame() {
        return new Promise((res, rej) => {
            this.setState({gameOver: true}, () => res());
        });
    }

    renderField() {
        return (
            <>
            <Score
                text={this.state.resText}
            />
                <div> 
                    {
                        this.state.squares.map((row, i) => {
                            return (
                                <div 
                                    className='board__row'
                                    key={i}
                                >
                                    
                                    {
                                        row.map((el, j) =>  this.renderSquare(el, i, j))
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }

    render() {
        return (
            <div className='board'>
               {this.renderField()}
            </div>
        )
    }
}

export default Board;