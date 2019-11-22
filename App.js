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
          l: 0,
          isVisible : true,
          disabled: false
      };
  }


  addItem(){
    this.setState({list: [...this.state.list,""]})
    this.setState({len: this.state.len+1})
  }
 
  handleChange(e, index){
    this.state.list[index]=e.target.value
    this.setState({list: this.state.list})

  }
  
  handleClick = () => {
      this.setState({
        isVisible: false
      })
      this.setState({
        disabled: true
      })
      if (this.state.sorting){

          return false
      }else{
          this.sort()
      }
  }

  sort = () => {
      this.setState({
          sorting: true
      })
      let l = this.state.l
      let temp = 0;
      let list = this.state.list;

      if (list[l] > list[l + 1]) {
          temp = list[l];
          list[l] = list[l + 1];
          list[l + 1] = temp;
          this.setState({swaps: this.state.swaps+1});
          this.setState({
              list: list
          })
      }

      l++;
      this.setState({
          l: l
      })
      if(l >= this.state.len){
          this.setState({
              l: 0
          })
          this.setState({
            passes: this.state.passes + 1
          })
          this.setState({
              len: this.state.len - 1
          })
      }
      if(this.state.len <=0){
          alert('Finished Sorting');

          this.setState({
              sorting: false
          })
      }else{
          setTimeout(this.sort, 400);
      }
  }

  render() {
      return (
          <div>
             <h1>Bubble Sort</h1>
             <h3>Add numbers or characters A-Z, then press begin to bubble sort them.</h3>
             {
               this.state.list.map((item,index)=>{
                 return (
                   <div key={index}>
                     <input onChange={(e)=>this.handleChange(e, index)} value={item} disabled = {(this.state.disabled)? "disabled" : ""}/>
                   </div>
                 )
               })
             }
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


