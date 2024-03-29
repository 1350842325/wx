// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '我'
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onDayClick: function (event) {
    wx.navigateTo({
      url: '../day/day',
    })
  },
  onWeekClick: function (event) {
    wx.navigateTo({
      url: '../week/week',
    })
  },
  onMonthClick: function (event) {
    wx.navigateTo({
      url: '../month/month',
    })
  },
  onHarvestClick: function (event) {
    wx.navigateTo({
      url: '../harvest/harvest',
    })
  },
  onLogClick: function (event) {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onAdviceClick: function (event) {
    wx.navigateTo({
      url: '../advice/advice',
    })
  }
})