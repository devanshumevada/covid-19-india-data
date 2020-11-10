import React, {useState, useEffect} from 'react';
import StateWiseData from './StateWiseData';
import './spinner.css';
import './App.css';

const App = () => {
  const [loading, set_loading] = useState(true);
  const [national_data, set_national_data] = useState({});
  const [state_data, set_state_data] = useState([]);
  const [to_show, set_to_show] = useState("confirmed");

  const get_data = async() => {
    const resp = await fetch("https://api.covid19india.org/data.json");
    const data = await resp.json();
    set_national_data(data.statewise[0]);
    set_state_data(data.statewise.slice(1));
    set_loading(false);
  }

  useEffect(()=> {
    get_data();
  },[]);


  return(
    <div id="App">
        { loading ? 
        
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
              <div onMouseOver={() => {set_to_show("active")}} className="col-sm bg-light national_data_col">Active: <span className="badge bg-dark">{national_data.active}</span></div>
              <div onMouseOver={() => {set_to_show("confirmed")}} className="col-sm bg-light national_data_col">Confirmed: <span className="badge bg-primary">{national_data.confirmed}</span></div>
              <div onMouseOver={() => {set_to_show("deaths")}} className="col-sm bg-light national_data_col">Deaths: <span className="badge bg-danger">{national_data.deaths}</span></div>
              <div onMouseOver={() => {set_to_show("recovered")}} className="col-sm bg-light national_data_col">Recovered: <span className="badge bg-success">{national_data.recovered}</span></div>
            </div>

              <StateWiseData state_data={state_data} to_show={to_show} />
          
          </div>
        )
        
        
        }
      </div>
  );
}

export default App;
