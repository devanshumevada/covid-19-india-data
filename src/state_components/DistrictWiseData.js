import React, {useEffect,useLayoutEffect, useState} from 'react';
import Chart from './Chart';
import '../App.css';

const DistrictWiseData = props => {

    const districts = props.district_data;
    const to_show = props.to_show;

    const [data, set_data] = useState([]);
    const [search_text, set_text] = useState("");
    const [filter_data, set_filter_data] = useState([]);


    useEffect(()=>{
       /* 
            -> The district data is in the form of objects of objects. For eg - {{'dist_1':{}}, {'dist_2':{}}}

            -> The result of the operation that is being stored in the variable dist will convert the into the following format:
                ["dist_name", {active: ACTIVE_CASES_NUMBER, confirmed: CONFIRMED_CASES_NUMBERS, deaths: DEATHS_CASES_NUMBERS, recovered: RECOVERED CASES NUMBERS}]
       */
       
       const dist = Object.entries(districts).map(district=>{
            return district
        });

       set_data(
        dist
       );

       set_filter_data(dist);


    },[districts]);

    // Updating synchronously because with asynchronous update using useEffect, there was this flickering issue
    useLayoutEffect(()=> {

        /* 
            -> Two copies of district we have basically : filter_data and data (Please refer above to the useState hook definitions)

            -> So as soon as a change in search_text is detected, the search results that are being filtered based upon the search text
               are applied or updated as the value of the data variable so that the updated search results are being looped through in
               the jsx in the render method.

            -> So basically with this approach we are not altering the original district data copy.

        */
       set_data(
           filter_data.filter(district => {
               return district[0].toLowerCase().includes(search_text)
           })
       );
    },[search_text, filter_data]);

    const handle_change = e => {
        set_text(e.target.value.toLowerCase().trim());
    }

   return(
       <div id="DistrictWiseData">
            <div className="chart_div">
                <Chart search_text={search_text} data={data} to_show={to_show} />
            </div>
            <div className="district_search">
                <input type="text" onChange={handle_change} placeholder="Filter District" />
            </div>

            <div className="district_data">
                {data.map((district,index)=>{
                        return(
                            <div key={index} className="district_data_col">
                            <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{district[0]}</h5>
                                            <p className="card-text"><span className="to_show_tag">{to_show}</span>: <span className={`badge ${to_show==="active" ? "bg-dark" : to_show==="confirmed" ? "bg-primary" : to_show==="recovered" ? "bg-success" : to_show==="deaths" ? "bg-danger" : ""}`}>{to_show==="deaths" ? district[1]["deceased"]: district[1][to_show]}</span></p>
                                        </div>
                                    </div>
                            </div>
                        );
                     
                })}
            </div>
        
       </div>
   );
}

export default DistrictWiseData;