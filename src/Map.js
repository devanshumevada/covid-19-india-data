import React, {useState, useLayoutEffect} from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import FusionMaps from 'fusioncharts/maps/es/fusioncharts.india';
import World from 'fusioncharts/fusioncharts.maps';
import state_code_to_id_map from './helper/state_code_to_id_map';

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
ReactFC.fcRoot(FusionCharts, FusionMaps, World, FusionTheme);



const Map = props => {
    const state_data = props.state_data;
    const to_show = props.to_show;
    const [map_data, set_map_data] = useState({});

    useLayoutEffect(()=> {
        const data=[];
        for (let state in state_data) {
            data.push(
                {
                    "label":`${state_data[state].state}`,
                    "id": ''+state_code_to_id_map[state_data[state].statecode],
                    "value": `${state_data[state][to_show]}`,
                    "tooltext": `${state_data[state].state}: ${state_data[state][to_show]} ${to_show}`,

                }
            );
        }

        set_map_data({
            type: 'india',
            width: '100%',
            height: '700',
            dataFormat: 'json',
            dataSource:{
                "chart" : {
                    "caption": `Number of ${to_show} cases`,
                    "includevalueinlabels": "1",
                    "labelsepchar": ": ",
                    "entityFillHoverColor": to_show==="recovered" ? "#008000" : to_show==="confirmed" ? "#0000c4" : to_show==="deaths" ? "#d80000" : "#ffffff",
                    "theme":"candy"
                },

                "colorrange": {
                    "minvalue":"0",
                    "code":to_show==="recovered" ? "#CFDBC5" : to_show==="deaths" ? "#ff7676" : to_show==="confirmed" ? "#9d9dff" : "#ffffff",
                    
                },

                "data":data
            },

        });

    },[state_data,to_show]);

  

    return(
        <div id="map">
            <ReactFC {
                ...map_data
            } />
        </div>
    );
}



export default Map;