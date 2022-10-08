import React from 'react';
import Square from './square.jsx';
import './style.css';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(3).fill(Array(3).fill(null)),
            playerTurn: true,
        }
    }

    getWinner() {
        // rows
        for (let i = 0; i < this.state.squares.length; i++) {
            if (this.state.squares[i].reduce((acc, el) => {
                return acc + (el === this.state.squares[i][0] ? 1 : 0)
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
                if (this.state.squares[i][j] === comparedEl) {
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
            if (this.state.squares[i][i] === this.state.squares[0][0]) {
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
                if (this.state.squares[i][j] === this.state.squares[0][this.state.squares[0].length - 1]) {
                    counter++;
                }
            }
        }
        if (counter === this.state.squares.length) {
            return this.state.squares[0][this.state.squares[0].length - 1];
        }

        return null;
    }

    handleClick(i, j) {
        const newSquares = JSON.parse(JSON.stringify(this.state.squares));
        newSquares[i][j] = 'x';
        console.log(JSON.stringify(newSquares));
        this.setState(
            {
                squares: newSquares,
                playerTurn: !this.state.playerTurn,
            }, 
            () => {
                this.executeAI();
                console.log(this.getWinner());
            }
        );
    }

    placeRandom() {
        const loop = () => {
            const i = Math.floor(Math.random() * this.state.squares.length);
            const j = Math.floor(Math.random() * this.state.squares[0].length);
            if (this.state.squares[i][j] === null) {
                const newSquares = JSON.parse(JSON.stringify(this.state.squares));
                newSquares[i][j] = 'o';
                this.setState({
                    squares: newSquares,
                    playerTurn: !this.state.playerTurn,
                });
                console.log(JSON.stringify(newSquares));
            } else {
                setTimeout(loop, 0);
            }
        }
        setTimeout(loop(), 500);
    }

    executeAI() {
        this.placeRandom();
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

    renderField() {
        return (
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