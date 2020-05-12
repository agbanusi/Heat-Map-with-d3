let url='https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
let xml= new XMLHttpRequest()
xml.open('GET',url,true)
xml.send()
xml.onload=()=>{
    let json=JSON.parse(xml.responseText)
    let dataset=json.monthlyVariance
    let padding=80;
    let w=950;
    let h=680;
    let g=d3.timeParse('%m')
    let k = d3.timeFormat("%B")
    let month= dataset.map((i)=>{
        return g(i.month)
    })
    let year=dataset.map((i)=>i.year)
    let base=json.baseTemperature
    //
    let colors=['#7CB342','#CE93D8','#9C27B0','#FFAB91','#FFEB3B','#3F51B5','#9FA8DA','#2196F3','#90CAF9','#0091EA','#EF9A9A','#F48FB1','#4CAF50','#A5D6A7','#009688','#E91E63','#C5E1A5','#FFF59D','#FF9800','#80CBC4','#FFCC80','#F44336','#FF5722','#80D8FF','#B0BEC5']
    let range=['-7.0 to -6.5','-6.5 to -6','-6 to -5.5','-5.5 to -5','-5 to -4.5','-4.5 to -4','-4 to -3.5','-3.5 to -3','-3 to -2.5','-2.5 to -2','-2 to -1.5','-1.5 to -1','-1 to -0.5','-0.5 to 0','0 to 0.5','0.5 to 1','1 to 1.5','1.5 to 2','2 to 2.5','2.5 to 3','3 to 3.5','3.5 to 4','4 to 4.5','4.5 to 5','5.5 upwards']
    let num=['-6.5','-6.0','-5.5','-5.0','-4.5','-4.0','-3.5','-3.0','-2.5','-2.0','-1.5','-1.0','-0.5','0.0','0.5','1.0','1.5','2.0','2.5','3.0','3.5','4.0','4.5','5.0','']
    let xScale=d3.scaleLinear().domain([1753,2015]).range([padding,w-padding])
    let hScale=d3.scaleLinear().domain([1,12]).range([100,520])
    let yScale=d3.scaleLinear().domain([1,12]).range([80,500])
    let xAxis=d3.axisBottom(xScale).tickFormat(d3.format('d'))
    let yAxis=d3.axisLeft(hScale).tickFormat((m)=>{
      let b=g(m)
      return k(b)
    })
    let title=d3.select('.let').append('div')
      title.append('div').append('text').text('Monthly Global Land-Surface Temperature').attr('class','head').attr('id','title')
      title.append('div').append('text').text('1753 - 2015: base temperature 8.66℃').attr('class','head2').attr('id','description')
    let tool=d3.select('.let').append('div').attr('id','tooltip')
    let legend=d3.select('.let').append('svg').attr('id','legend').attr('height',50)
    let svg=d3.select('.let').append('svg').attr('width',w).attr('height',h)
    //console.log(colors.length)
    svg.selectAll('rect').data(dataset).enter().append('rect')
    .attr('x',(d,i)=>xScale(year[i]))
    .attr('y',(d,i)=>yScale(d.month))
    .attr('height',40)
    .attr('width',5)
    .attr('class','cell')
    .attr('data-month',(d,i)=>d.month-1)
    .attr('data-year',(d,i)=>year[i])
    .attr('data-temp',(d,i)=>d.variance+base)
    .style('fill',(d,i)=>{
        if(d.variance<=-6.5){
            return colors[0]
        }
        else if(-6.5<d.variance<=-6.0){
            return colors[1]
        }
        else if(-6.0<d.variance<=-5.5){
            return colors[2]
        }
        else if(-5.5<d.variance<=-5.0){
            return colors[3]
        }
        else if(-5.0<d.variance<=-4.5){
            return colors[4]
        }
        else if(-4.5<d.variance<=-4.0){
            return colors[5]
        }
        else if(-4.0<d.variance<=-3.5){
            return colors[6]
        }
        else if(-3.5<d.variance<=-3.0){
            return colors[7]
        }
        else if(-3.0<d.variance<=-2.5){
            return colors[8]
        }
        else if(-2.5<d.variance<=-2.0){
            return colors[9]
        }
        else if(-2.0<d.variance<=-1.5){
            return colors[10]
        }
        else if(-1.5<d.variance<=-1.0){
            return colors[11]
        }
        else if(-1.0<d.variance<=-0.5){
            return colors[12]
        }
        else if(-0.5<d.variance<=0.0){
            return colors[13]
        }
        else if(0.0<d.variance<=0.5){
            return colors[14]
        }
        else if(0.5<d.variance<=1.0){
            return colors[15]
        }
        else if(1.0<d.variance<=1.5){
            return colors[16]
        }
        else if(1.5<d.variance<=2.0){
            return colors[17]
        }
        else if(2.0<d.variance<=2.5){
            return colors[18]
        }
        else if(2.5<d.variance<=3.0){
            return colors[19]
        }
        else if(3.0<d.variance<=3.5){
            return colors[20]
        }
        else if(3.5<d.variance<=4.0){
            return colors[21]
        }
        else if(4.0<d.variance<=4.5){
            return colors[22]
        }
        else if(4.5<d.variance<=5.0){
            return colors[23]
        }
        else{
            return colors[24]
        }
    })
    .on('mouseover',(d,i)=>{
        tool.style('display','inline-block')
            .attr('data-year',year[i])
            .style('background-color','#B2DFDB')
            .style('color','black')
            .style('opacity',1)
            .html(year[i]+' in '+k(month[i])+' the variance is '+d.variance+'°C and the actual temperature is '+(base+d.variance)+'°C')
    })
    .on('mouseout',(d)=>{
        tool.style('display','inline-block')
            .style('opacity',0)
            .html()
    })
    d3.select('.let').selectAll('rect').data(dataset).append('title').text((d,i)=> year[i]+': '+k(month[i])+'\n the variance:'+d.variance+'°C, temperature: '+(base+d.variance)+'°C')
    svg.append('g').attr('transform','translate(0,'+(540)+')').attr('id','x-axis').call(xAxis);
    svg.append('g').attr('transform','translate('+(padding)+',0)').attr('id','y-axis').call(yAxis);
  
    legend.selectAll('rect').data(colors).enter().append('rect')
    .attr('x',(d,i)=>i*35+100).attr('y',10).attr('height',20).attr('width',35).attr('fill',(d,i)=>d).append('title').text((d,i)=>'Hexcode value: '+d+', The range of variance values: '+range[i])
    legend.selectAll('text').data(colors).enter().append('text').text((d,i)=>num[i]).attr('x',(d,i)=>(i*35)+120).attr('y',40)
        
}
