import React from 'react';
import StateWiseData from './StateWiseData';
import './spinner.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      national_data:null,
      state_data:null,
      to_show: "confirmed"
    }
  }


  get_data = async() => {
    const resp = await fetch("https://api.covid19india.org/data.json");
    const data = await resp.json();
    this.setState({
      national_data:data.statewise[0],
      state_data: data.statewise.slice(1),
      loading:false
    });
  }

  componentDidMount = () => {
    this.get_data();
  }

  set_to_show = to_show => {
    this.setState({
      to_show
    });
  }


  render() {
    return(
          <div id="App">
        { this.state.loading ? 
        
        (
          <div className="spinner"></div>
        )

        :

        (
          <div className="container">
            <div className="row">
              <h1 align="center">Covid 19 India Data</h1>
            </div>

            <div className="row national_data">
              <h3>National Numbers</h3>
              <div onMouseOver={() => {this.set_to_show("active")}} className="col-sm bg-light national_data_col">Active: <span className="badge bg-dark">{this.state.national_data.active}</span></div>
              <div onMouseOver={() => {this.set_to_show("confirmed")}} className="col-sm bg-light national_data_col">Confirmed: <span className="badge bg-primary">{this.state.national_data.confirmed}</span></div>
              <div onMouseOver={() => {this.set_to_show("deaths")}} className="col-sm bg-light national_data_col">Deaths: <span className="badge bg-danger">{this.state.national_data.deaths}</span></div>
              <div onMouseOver={() => {this.set_to_show("recovered")}} className="col-sm bg-light national_data_col">Recovered: <span className="badge bg-success">{this.state.national_data.recovered}</span></div>
            </div>

              <StateWiseData state_data={this.state.state_data} to_show={this.state.to_show} />
          
          </div>
        )
        
        
        }
      </div>
        
    );
  }
}


export default App;
