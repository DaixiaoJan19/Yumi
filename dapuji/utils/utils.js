/**
* 获取移动端显示屏的宽和高,
* 参数：e,
* return viewSize (包含显示屏的宽和高)
*/
function getViewWHInfo(e) {
  var viewSize = {};
  var originalWidth = e.detail.width;//图片原始宽
  var originalHeight = e.detail.height;//图片原始高
  wx.getSystemInfo({
    success: function (res) {
      //读取系统宽度和高度
      var viewWidth = res.windowWidth;
      var viewHeight = res.windowHeight;
      console.log(originalWidth + " " + originalHeight);
      console.log("宽：" + viewWidth + "高" + viewHeight);
      viewSize.width = viewWidth;
      viewSize.height = viewHeight;
    }
  });
  return viewSize;
}
//导出接口--必须要写
module.exports = {
  getViewWHInfo: getViewWHInfo(e)
}