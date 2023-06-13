import { useEffect } from 'react';
import useFetch from '../../Hooks/useFetch';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

type row = {
  ids: any;
  run_time: any;
  start_time: any;
  tempo: any;
};


function App(props:any) {
  const { task, addedSecs } = props;
  
  const url = `/task_trend?task=${task.task}`;
  const { statusText, data } = useFetch(url, [task, addedSecs])

  const lightWhite = 'rgb(230, 230, 230)';
  
  const initData = [
    {
      "idx": 0,
      "run_time": 3,
      "start_time": 1686409203000,
      "tempo": 60
    },
    {
      "idx": 1,
      "run_time": 3,
      "start_time": 1686409206000,
      "tempo": 60
    },
  ];

  const dateToTimestamp = (data:row[]) => {
    data.forEach((el) => {
      el.start_time = new Date(el.start_time).getTime();
    })
    return data;
  }
  
  
  useEffect(() => {

    let root = am5.Root.new("chartdiv");

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX:true
    }));

    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.2,
      baseInterval: {
        timeUnit: "second",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {}),
      visible: false,
    }));
    
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    let yRenderer = yAxis.get("renderer");
    yRenderer.grid.template.setAll({
      stroke: am5.color(lightWhite),
      strokeWidth: 1
    });
    yRenderer.labels.template.setAll({
      fill: am5.color(lightWhite),
      fillOpacity: 0.5,
    });


    let series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "tempo",
      valueXField: "start_time",
      tension: 0.5,
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      }),
    }));
    series.strokes.template.setAll({
      stroke: am5.color(0xFF0000),
      strokeWidth: 1.5
    });

    if (data && data.data.length <= 1) {
      series.data.setAll(initData);
    }
    else if (statusText == "OK") {
      const cleanData = dateToTimestamp(data.data)
      series.data.setAll(cleanData);
    }

    // series.appear(100);
    // chart.appear(100, 100); 

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
      <div
        id="chartdiv"
        style={{
          width: '100%',
          height: '300px',
          // flexGrow: 1,
          marginTop: '10px'
        }}
      />
  );
}
export default App;