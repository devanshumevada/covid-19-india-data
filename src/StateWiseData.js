import React, {useState,useLayoutEffect} from 'react';
import Map from './Map';
import { Link } from 'react-router-dom';
import './App.css';



const StateWiseData = props => {


    const state_data = props.state_data;
    const to_show = props.to_show;

    const [data, set_data] = useState([]);
    const [search_text, set_text] = useState("");

    useLayoutEffect(()=> {
        set_data(
            state_data.filter(
                state=>{
                    return (state.state.toLowerCase().includes(search_text));
                }
            )
        );
    },[search_text,state_data]);


    const handle_search_text_change = e => {
        set_text(e.target.value.toLowerCase());
    }


    return(
            <div id="StateWiseData">
                <Map state_data={state_data} to_show={to_show} />
                <div className="search_state">
                    <input onChange={handle_search_text_change} value={search_text} type="text" placeholder="Filter state" />
                </div>

                <div className="state_data">
                    {data.map(state=>{

                        return (
                            <div key={state.statecode} className="state_data_col">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{state.state}</h5>
                                        <p className="card-text"><span className="to_show_tag">{to_show}</span>: <span className={`badge ${to_show==="active" ? "bg-dark" : to_show==="confirmed" ? "bg-primary" : to_show==="recovered" ? "bg-success" : to_show==="deaths" ? "bg-danger" : ""}`}>{state[to_show]}</span></p>
                                        <Link  
                                        to={{
                                            pathname:`/state/${state.state}`,
                                            state_info:{
                                                active: state.active,
                                                confirmed: state.confirmed,
                                                deaths: state.deaths,
                                                recovered: state.recovered

                                            }
                                            
                                            }} 
                                        className={`btn btn-sm ${to_show==="active" ? "btn-dark" : to_show==="confirmed" ? "btn-primary" : to_show==="recovered" ? "btn-success" : to_show==="deaths" ? "btn-danger" : ""}`}>State Page</Link>
                                    </div>
                                </div>
                            </div>
                        );



                    })}

                </div>

        
        </div>
        
    );

}

export default StateWiseData;