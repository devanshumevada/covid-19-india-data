import React, {useLayoutEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';

const Chart = props => {
    const district_data = props.data;
    const to_show = props.to_show;
    const search_text = props.search_text;

    const [data, set_data] = useState({});
    useLayoutEffect(()=>{
        /* 
            -> The data adapts to the change in to_show, district_data and search_text and updates the chart based on those changes
        */
        const labels = []
        const datasets = [
            {
                label: `${to_show} numbers`,
                data:[],
                backgroundColor: to_show==="deaths" ? "red" : to_show==="active" ? "black" : to_show==="recovered" ? "green" : "blue"
        
            }
        ];
        for (const district of district_data) {

                if (district[0].toLowerCase().includes(search_text)) {
                    labels.push(district[0]);
                    datasets[0].data.push(district[1][to_show==="deaths" ? "deceased" : to_show]);

                }
        }

        set_data({labels, datasets}); 


    },[to_show,district_data,search_text]); 

        return(
            <div id="chart">
               <Bar
                   data={data}
               />
            </div>
        );
    
}
export default Chart;