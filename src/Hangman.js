import React, { Component } from "react";
import { randomWord } from './words.js'
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  //Constructor = method that is automatically called during creation of an object from a class  
  constructor(props) {
    super(props); //call the constructor of the parent class
    this.state = { 
      nWrong: 0, 
      guessed: new Set(), 
      answer: randomWord()}; //random word imported from words.js

    this.handleGuess = this.handleGuess.bind(this); //Value of "this" inside the constructor is of the individual component
    this.reset = this.reset.bind(this); //Value of "this" inside the constructor is of the individual component
  }

  //Reset the game
  reset(){
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    })
  }

  // guessedWord: show current-state of word:
    // if guessed letters are {a,p,e}, show "app_e" for "apple"
  guessedWord() {
    return this.state.answer
      .split("") //Split answer into substrings
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_")); //pass the ltr or _ 
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1) //nWrong starts with 0 - Add 0 if the answer includes the guessed value & Add one if not
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr} //add the key - no duplicates so the ltr is fine
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  // Render Game
  render() {
    const { images } = this.props;
    const { nWrong, answer } = this.state;
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
    let gameState = this.generateButtons();
    if(isWinner) gameState = 'You Win! :)';
    if (gameOver) gameState = 'You Lose :(';

    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={images[nWrong]} alt={altText} />
        <p>Guessed Wrong: {nWrong} </p>
        <p className='Hangman-word'>{!gameOver ? this.guessedWord() : answer}</p>
        <p className='Hangman-btns'>{gameState}</p>
        <button id="reset" onClick={this.reset}>Restart?</button>
      </div>
    );
  }
}

export default Hangman;
