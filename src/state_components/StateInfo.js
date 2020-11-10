import React, {useState, useEffect} from 'react';
import DistrictWiseData from './DistrictWiseData';
import '../App.css';
import '../spinner.css';

const StateInfo = props => {
    const [district_data, set_district_data] = useState([]);
    const [loading, set_loading] = useState(true);
    const [to_show, set_to_show] = useState("confirmed");
    const state = props.match.params.name;
    const state_info = props.location.state_info;


    useEffect(() =>{
        fetch("https://api.covid19india.org/state_district_wise.json")
        .then(
            res=>res.json())
        .then(data => {
            set_district_data(data[state]); 
            set_loading(false);
        })
        .catch(err=>
            console.log(err.toString()));
	},[state]);
	
    return(
        <div id="state_info">
        { loading ? 
        
        (
          <div className="spinner"></div>
        )

        :

        (
          <div className="container">
            <div className="row">
              <h1 align="center">{state} Data</h1>
            </div>

            <div className="row national_data">
              <h3>{state} state Numbers</h3>
              <div onMouseOver={() => {set_to_show("active")}} className="col-sm bg-light national_data_col">Active: <span className="badge bg-dark">{state_info.active}</span></div>
              <div onMouseOver={() => {set_to_show("confirmed")}} className="col-sm bg-light national_data_col">Confirmed: <span className="badge bg-primary">{state_info.confirmed}</span></div>
              <div onMouseOver={() => {set_to_show("deaths")}} className="col-sm bg-light national_data_col">Deaths: <span className="badge bg-danger">{state_info.deaths}</span></div>
              <div onMouseOver={() => {set_to_show("recovered")}} className="col-sm bg-light national_data_col">Recovered: <span className="badge bg-success">{state_info.recovered}</span></div>
            </div>

            <div className="row">
              <DistrictWiseData to_show={to_show} district_data={district_data.districtData} />
            </div>
          
          </div>
        )
        
        
        }
      </div>
    );
}

export default StateInfo;