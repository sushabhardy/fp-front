
import React, {Component} from 'react';

class TextInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
      className: 'fp-input'
    }

    console.log(props);

    this.handleChange = this.handleChange.bind(this);
    this.getInputRef = this.getInputRef.bind(this);
    this.labelOnClick = this.labelOnClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      className: event.target.value ? 'fp-input fp-input--filled' : 'fp-input'
    });
  }

  getInputRef(ref) {
    this.inputRef = ref;
  }

  labelOnClick(){
    this.inputRef.focus()
  }

  render(){
    return (
      <div class="fp-input-wrapper">
        <input 
          ref = {this.getInputRef}
          className={this.state.className} 
          type="text" 
          value={this.state.value}  
          onChange={this.handleChange}
        />
        <label onClick={this.labelOnClick}>
          {this.props.placeholder}
        </label>
      </div>
    );
  }
}

export default TextInput;