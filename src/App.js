import React, {Component} from 'react';

import './App.css';

class App extends Component {
 
  constructor(props) {
      super(props);
      this.state = {
          list: [],
          len: 0,
          swaps: 0,
          passes : 0,
          sorting: false,
          currentIndex: 0,
          isAddButtonVisible : true,
          isStartButtonDisabled : true,
          disabled: false,
          swapped: false
      };
  }


  addItem() {
    this.setState({ list: [...this.state.list, ""] })
    this.setState({ len: this.state.len + 1 })
  }
 
  handleChange(e, index) {
    this.state.list[index] = e.target.value
    this.setState({ list: this.state.list })

  }

  inputValidation() {
    let validInput = true;
    var re = new RegExp("^([a-zA-Z0-9]){1,9}$");
    this.state.list.some(function (item) {
      if (!re.test(item)) {
        return validInput =  false;
      }
    });
    return validInput;
  }

  handleStartClick = () => {
    if (!this.inputValidation())
      return alert("Please make sure inputs is filled out correctly.");
    if (this.state.sorting) {
        return false;
    } else {
        this.setState({
          isAddButtonVisible: false,
          disabled: true,
          isStartButtonDisabled: true
        })
        this.sort();
    }
  }

  finished = () => {
    this.setState({ 
      sorting: false,
      passes: this.state.passes + 1,
      isStartButtonDisabled: true
     });
     alert('Finished Sorting');
  }
  sort = () => {
      if (this.state.currentIndex === this.state.len - 1) {  
          if (this.state.swapped === false) {
            return this.finished();
          }
          this.setState({
            currentIndex: 0,
            passes: this.state.passes + 1,
            len: this.state.len - 1,
            swapped: false
          })
      }
      if (this.state.len === 1)
        return this.finished();
      this.setState({ sorting: true })
      let swapped = false;
      let currentIndex = this.state.currentIndex;
      let list = this.state.list;
      this.applyComparisonIndicator();
      if (list[currentIndex] > list[currentIndex + 1]) {
          this.applyHighlightToSwappingItems();
          let temp = list[currentIndex];
          list[currentIndex] = list[currentIndex + 1];
          list[currentIndex + 1] = temp;
          swapped = true;
          this.setState({ 
            swaps: this.state.swaps + 1,
            list: list,
            swapped: swapped
          });
      }
      this.setState({ currentIndex: this.state.currentIndex + 1 });
      if (swapped)
        setTimeout(this.removeHighlightFromSwappedItems, 1000);
      setTimeout(this.removeComparisonIndicator, 1000);
      setTimeout(this.sort, 2000);
  }

  removeHighlightFromSwappedItems = () => {
    document.querySelectorAll('input').forEach((el) => el.classList.remove('highlight'));
  }

  applyHighlightToSwappingItems() {
    document.querySelector("#text-" + this.state.currentIndex).classList.add('highlight');
    document.querySelector("#text-" + (this.state.currentIndex + 1)).classList.add('highlight');
  }

  applyComparisonIndicator() {
    document.querySelector("#bubble-" + this.state.currentIndex).classList.add('comparison');
    document.querySelector("#bubble-" + (this.state.currentIndex + 1)).classList.add('comparison');
  }

  removeComparisonIndicator = () => {
    document.querySelectorAll('div').forEach((el) => el.classList.remove('comparison'));
  }

  refreshClick() {
    window.location.reload();
  }

  render() {
      return (
          <div className='container'>
             <h1>Bubble Sort</h1>
             <h3>Add numbers or characters A-z (limit 8), then press Begin to bubble sort them.</h3>
             <div className='list-container'>
              {
                this.state.list.map((item, index) => {
                  return (
                      <div id={`bubble-${index}`} key={index}>
                        <input id={`text-${index}`} onChange={(e) => this.handleChange(e, index)} value = {item} disabled = {(this.state.disabled)? "disabled" : ""}/>
                      </div>
                  )
                })
              }
             </div>
             {
               <button className="add" onClick={(e) => this.addItem(e)} disabled = {(this.state.isAddButtonVisible && this.state.len < 8 ? false : true )}>Add Item</button>
             }
             {
              <button className="start" onClick={this.handleStartClick} disabled = {(this.state.isStartButtonDisabled && this.state.len < 3) ? true : false } >Begin</button>
             }

              <button className="reset" onClick={this.refreshClick} >Reset</button>
              <p>swaps:  {this.state.swaps}</p>
              <p>passes: {this.state.passes}</p>
          </div>
      );
  }
}

export default App;


