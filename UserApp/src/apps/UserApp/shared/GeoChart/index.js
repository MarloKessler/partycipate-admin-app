import "./style.css"
import { useEffect, useRef } from "react"
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"


am4core.useTheme(am4themes_animated)


export function GeoChart({ data=[], className="", ...props }) {
    const cartElementContainerRef = useRef()
    const cartElementRef = useRef()
    var chart
    var polygonSeries
    var heatLegend


    useEffect(() => {
        const chartEl = cartElementRef.current
        if (!chartEl) return
        
        chart = am4core.create(chartEl, am4maps.MapChart)
        configureChart(chart)
        polygonSeries = addPolygonSeries(chart)
        heatLegend = addHeatLegend(chart, polygonSeries)
        return () => chart.dispose()
    }, [])


    // Color preference listener
    useEffect(() => {
        const mql = window.matchMedia("(prefers-color-scheme: dark)")
        adaptChartColorScheme(mql.matches)
        const listener = event => adaptChartColorScheme(event.matches)
        mql.addEventListener("change", listener)
        return () => mql.removeEventListener("change", listener)
    }, [])


    function adaptChartColorScheme(isDark) {
        // Configure zoom control
        const backgroundColor = isDark ? "#999" : "#ddd"
        const strokeColor = isDark ? "#ddd" : "#0000"
        chart.zoomControl.plusButton.background.fill = am4core.color(backgroundColor)
        chart.zoomControl.plusButton.background.stroke = am4core.color(strokeColor)
        chart.zoomControl.minusButton.background.fill = am4core.color(backgroundColor)
        chart.zoomControl.minusButton.background.stroke = am4core.color(strokeColor)
        chart.zoomControl.slider.children.each(element => {
            element.background.fill = am4core.color(backgroundColor)
            element.background.stroke = am4core.color(strokeColor)
        })
        if (polygonSeries) {
            let polygonTemplate = polygonSeries.mapPolygons.template
            polygonTemplate.fill = am4core.color(isDark ? "#777" : "#d9d9d9")
            polygonTemplate.stroke = am4core.color(isDark ? "#bbb" : "#fff")
        }
        addData()
        chart.smallMap.series.pop()
        chart.smallMap.series.push(polygonSeries)
    }


    function addData() {
        const copyOfDataArray = data.slice(0, data.length)
        polygonSeries.data = copyOfDataArray
        // Set value for each undefinded to 0; needs to be in a timeout because am4Chart needs to add missing countries.
        setTimeout(() => copyOfDataArray.forEach(data => {if (data.value === undefined) data.value = 0}), 100)
    }
    


    // Resize if chart width passes 900px.
    useEffect(() => {
        function resizeContainer() {
            const container = cartElementContainerRef.current
            if (!container) return
            if (container.offsetWidth >= 900) container.classList.add("large")
            else container.classList.remove("large")
        }
        resizeContainer()
        window.addEventListener("resize", resizeContainer)
        return () => window.removeEventListener("resize", resizeContainer)
    }, [])
    

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
    chart.smallMap.background.fill = am4core.color("#0000")
}


function addPolygonSeries(chart) {
    let polygonSeries = new am4maps.MapPolygonSeries()
    // Configure series
    polygonSeries.useGeodata = true
    chart.series.push(polygonSeries)
    chart.chartContainer.wheelable = false
    // Exclude Antarctica
    polygonSeries.exclude = ["AQ"]
    // Configure heatmap
    polygonSeries.heatRules.push({
        "property": "fill",
        "target": polygonSeries.mapPolygons.template,
        "min": am4core.color("#deeced"),
        "max": am4core.color("#243e42")
    })

    // Configure series
    polygonSeries.mapPolygons.template.tooltipText = "{name}: {value} Participants"
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