import "./style.css"
import { useEffect, useRef } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"


am4core.useTheme(am4themes_animated)


export default function GeoChart({ data=[], className="", ...props }) {
    const cartElementContainerRef = useRef()
    const cartElementRef = useRef()


    useEffect(() => {
        const chartEl = cartElementRef.current
        if (!chartEl) return
        
        let chart = am4core.create(chartEl, am4maps.MapChart)
        configureChart(chart)
        const copyOfDataArray = data.slice(0, data.length)
        let polygonSeries = addPolygonSeries(chart, copyOfDataArray)
        addHeatLegend(chart, polygonSeries)

        // Set value for each undefinded to 0; needs to be in a timeout because am4Chart needs to add missing countries.
        setTimeout(() => copyOfDataArray.forEach(data => {if (data.value === undefined) data.value = 0}), 10)
        return () => chart.dispose()
    }, [])


    // Resize if chart width passes 900px.
    useEffect(() => {
        if (!cartElementContainerRef.current) return
        const container = cartElementContainerRef.current
        if (container.offsetWidth >= 900) container.classList.add("large")
        else container.classList.remove("large")
    })
    

    return (
        <div ref={cartElementContainerRef} className={`geo-chart-container ${className}`} {...props}>
            <div ref={cartElementRef} className="geo-chart"/>
        </div>
    )
}


function configureChart(chart) {
    chart.geodata = am4geodata_worldLow
    chart.projection = new am4maps.projections.Mercator()
    chart.zoomControl = new am4maps.ZoomControl()
    chart.zoomControl.slider.height = 60
    chart.smallMap = new am4maps.SmallMap()
}


function addPolygonSeries(chart, data) {
    let polygonSeries = new am4maps.MapPolygonSeries()
    polygonSeries.useGeodata = true
    chart.series.push(polygonSeries)
    chart.chartContainer.wheelable = false
    // Exclude Antarctica
    polygonSeries.exclude = ["AQ"]
    // Append data
    polygonSeries.data = data    
    // Configure heatmap
    polygonSeries.heatRules.push({
        "property": "fill",
        "target": polygonSeries.mapPolygons.template,
        "min": am4core.color("#deeced"),
        "max": am4core.color("#243e42")
    })

    // Configure series
    polygonSeries.mapPolygons.template.tooltipText = "{name}: {value} Participants"
    chart.smallMap.series.push(polygonSeries)
    return polygonSeries
}


function addHeatLegend(chart, polygonSeries) {
    let heatLegend = chart.createChild(am4maps.HeatLegend)
    heatLegend.series = polygonSeries
    heatLegend.align = "center"
    heatLegend.valign = "top"
    heatLegend.dy = -15
    heatLegend.width = am4core.percent(60)
    heatLegend.valueAxis.renderer.opposite = true
    heatLegend.valueAxis.strictMinMax = false
    heatLegend.valueAxis.fontSize = 10
    return heatLegend
}