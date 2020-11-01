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
       
       const dist = Object.entries(districts).map(district=>{
            return district
        })

       set_data(
        dist
       );

       set_filter_data(dist);


   },[districts]);

   useLayoutEffect(()=> {
       set_data(
           filter_data.filter(district => {
               return district[0].toLowerCase().includes(search_text)
           })
       );
   },[search_text, filter_data]);

   const handle_change = e => {
       set_text(e.target.value.toLowerCase());
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