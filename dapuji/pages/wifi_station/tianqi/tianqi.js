var myCharts = require("../../../utils/wxcharts.js")//引入一个绘图的插件
var lineChart_hum = null
var lineChart_light = null
var lineChart_tempe = null
var app = getApp()

Page({
  data: {
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },


  //把拿到的数据转换成绘图插件需要的输入格式
  convert: function () {
    var categories = [];
    var tempe = [];

    var length = app.data.yumi.datapoints.length
    for (var i = 0; i < length; i++) {
      categories.push(app.data.yumi.datapoints[i].at.slice(11,19));
      tempe.push(app.data.yumi.datapoints[i].value);
      tempe.push(null);
    }
    return {
      categories: categories,
      tempe: tempe
    }
  },

  onLoad: function () {
    var wheatherData = this.convert();
    
    //得到屏幕宽度
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var wheatherData = this.convert();

    //新建温度图表
    lineChart_tempe = new myCharts({
      canvasId: 'humidity',
      type: 'line',
      categories: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      animation: true,
      legend: false,
      background: '#f5f5f5',
      series: [{
        data: wheatherData.tempe,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true,
        gridColor: '#FFFFFF'
      },
      yAxis: {
        format: function (val) {
          return " "
        },
        min: 3, max: 11
      },
      width: windowWidth,
      height: 80,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        pointColor: '#f5f5f5',
        lineStyle: 'curve'
      }
    });
  },


})
