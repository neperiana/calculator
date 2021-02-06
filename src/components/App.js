// React
import React, { Component } from 'react';

// CSS
import './App.css';

// bootstrap
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

// eval wrapper
function resolve(givenFormula) {
  let formula = givenFormula.replace("✕", "*").replace("÷", "/");
  return (eval(formula));
}

// Main App Component
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      formula: '',
      result: '0.0000',
    };
    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  handleInteraction(key) {
    switch(key) {
      case "C":
        this.setState({ 
          formula: '',
          result: '0.0000',
        });
        break;
      case "=":
        let fresh_result = resolve(this.state.formula);
        this.setState({ 
          formula: '',
          result: fresh_result.toFixed(4),
        });
        break;
      default:
        let new_formula = this.state.formula;

        if (['✕','÷','+','-'].includes(key)){
          // if first operator after result
          if (new_formula === "") new_formula = this.state.result;

          new_formula += " " + key + " ";
        } else {
          new_formula += key;
        }

        this.setState({ 
          formula: new_formula,
        });
        break;
    }
  }
  handleButtonPress(event){
    let key = event.target.id;
    this.handleInteraction(key);
  }
  // TO DO: fix key interactions
  handleKeyPress(event){
    let key = event.key.toUpperCase().replace('ENTER','=').replace('*','✕').replace('/','÷');
    let calculator_keys = ['(',')','C','7','8','9','÷','4','5','6','✕','1','2','3','-','0','.','=','+'];
    if (calculator_keys.includes(key)) {
      this.handleInteraction(key);
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  render() {
    return (
    <div id="App">
      <div></div>
      <div id="calculator">
        <DisplayComponent formula={this.state.formula} result={this.state.result}/>
        <ButtonsContainer onClick={this.handleButtonPress} />
      </div>
      <footer>
        <p>	&#169; 2021, camila.</p>
      </footer>
    </div>
    );
  }
}

// Display
const DisplayComponent = props => {
  return (
      <div id="display">
          <Alert variant="secondary" id="displayAlert">
            <p id="p-formula">{props.formula}</p>
            <p id="p-result">{props.result}</p>
          </Alert>
      </div>
  );
};

// operation buttons + size
const operations = {
  0:{'(':'info',')':'info','C':'danger',},
  1:{'7':'light','8':'light','9':'light','÷':'info',},
  2:{'4':'light','5':'light','6':'light','✕':'info',},
  3:{'1':'light','2':'light','3':'light','-':'info',},
  4:{'0':'light','.':'light','=':'success','+':'info',},
}

// Buttons
const ButtonsRow = props => {
  return (
      <div className="buttons-row-container" id="row-{props.row}">
        { 
          Object.keys(operations[props.row]).map(
            ([i])=> 
              <Button 
                variant={operations[props.row][i]} 
                onClick={props.onClick}
                id={i}
                key={i}
                className={ i==="C" ? 'big-button' : 'normal-button'} 
              >{i}</Button>
          )
        }
      </div>
  );
};

const ButtonsContainer = props => {
  return (
      <div id="buttons-container">
        { 
          Object.keys(operations).map(
            ([k])=> 
              <ButtonsRow row={k} onClick={props.onClick}/>
          )
        }
      </div>
  );
};

export default App;
