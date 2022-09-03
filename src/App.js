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
          isVisible : true,
          disabled: false
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

  handleClick = () => {
      this.setState({
        isVisible: false
      })
      this.setState({
        disabled: true
      })
      if (this.state.sorting) {

          return false
      } else {
          this.sort()
      }
  }

  sort = () => {
      if (this.state.currentIndex === this.state.len - 1) {
        this.setState({
            currentIndex: 0,
            passes: this.state.passes + 1,
            len: this.state.len - 1
      })
      }
      if (this.state.len === 1) {
          alert('Finished Sorting');
          this.setState({ sorting: false });
          return;
      }
      this.setState({ sorting: true })
      let swapped = false;
      let currentIndex = this.state.currentIndex
      let list = this.state.list;
      if (list[currentIndex] > list[currentIndex + 1]) {
          this.applyHighlightToSwappingItems();
          let temp = list[currentIndex];
          list[currentIndex] = list[currentIndex + 1];
          list[currentIndex + 1] = temp;
          this.setState({ swaps: this.state.swaps + 1 });
          this.setState({ list: list })
          swapped = true;
      }
      currentIndex ++;
      this.setState({ currentIndex: this.state.currentIndex + 1 });
      if (swapped)
        setTimeout(this.removeHighlightFromSwappedItems, 1000);
      setTimeout(this.sort, 2000);
  }

  removeHighlightFromSwappedItems = () => {
    document.querySelector("#text-" + this.state.currentIndex).classList.remove('highlight');
    document.querySelector("#text-" + (this.state.currentIndex - 1)).classList.remove('highlight');
  }

  applyHighlightToSwappingItems() {
    document.querySelector("#text-" + this.state.currentIndex).classList.add('highlight');
    document.querySelector("#text-" + (this.state.currentIndex + 1)).classList.add('highlight');
  }

  render() {
      return (
          <div className='container'>
             <h1>Bubble Sort</h1>
             <h3>Add numbers or characters A-Z, then press begin to bubble sort them.</h3>
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
               this.state.isVisible?
               <button onClick={(e)=>this.addItem(e)}>Add Item</button>
               :null
             }
             
              <button onClick={this.handleClick}>Begin</button>
              <p>swaps:  {this.state.swaps}</p>
              <p>passes: {this.state.passes}</p>
          </div>
      );
  }
}

export default App;


