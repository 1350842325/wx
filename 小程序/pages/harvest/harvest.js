var app = getApp();

function two_char(n) {
  return n >= 10 ? n : "0" + n;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [
      '电报的发明人是（     ）。',
      '霍克哈姆和英籍华裔学者（     ）提出了利用光纤进行信息传输的可能性和技术前途。',
      '于1973年在摩托罗拉公司发明了世界上第一部移动电话，经过20多年的研发和市场推广，移动电话已经成为全球最普及的便携式通信设备（     ）。',
      '有“Web之父”之处，（即万维网的发明者）是（     ）。',
      '第三代移动通信技术理论上最高的数据传输速率是（     ）。',
      '我们通常所说的2.5G是指（     ）。',
      '以下哪个技术不属于3G范畴？（     ）。',
      '以下（     ）最早上WCDMA。',
      '以下哪个是最成熟的3G技术（     ）。',
      '在人口密集的市区，最适合使用的小区结构是（     ）。',
      '我国现行采用的移动数字频段有（     ）。',
      '随着电信和信息技术的发展，国际上出现了所谓“三网融合”的趋势，下列不属于三网之一的是（     ）。',
      '家里的固定电话使用的是（     ）网络。',
      'GSM的中文意思是（    ）',
      'Claisen 酯缩合的缩合剂是强碱，用以增长碳链.从反应活性中心看,它们（   ）',
      '手机距离移动通信基站越近，手机在使用过程中对通话者的影响是（   ）',
      '在3G标准中，以MAP为基础，可以继承GSM网络的标准为（   ）',
      '中兴通讯的掌门人是（  ）',
      '中兴通讯研发的3G设备主要是（    ）技术．',
      '关于调制解调器的说法不正确的是(  )',
      '计算机网络最有吸引力的功能是(   )',
      '电话拨号上网时，需要使用(    )'],
    questionsA: [
      'A.贝尔',
      'A.杨振宁',
      'A.马丁库珀',
      'A.马丁库珀',
      'A.144kbps',
      'A.WCDMA',
      'A.EV-DO ',
      'A.日本 ',
      'A.WCDMA',
      'A.微蜂窝小区 ',
      'A.900MHz&1800MHz',
      'A.卫星通信网',
      'A.移动交换',
      'A. 全球移动通讯系统',
      'A.一个羧酸酯出羰基，一个醛出α-C ',
      'A．和距离没有关系 ',
      'A.WCDMA  ',
      'A.王建宙 ',
      'A．WCDMA',
      'A．英文名为Modem',
      'A．数据移动',
      'A．网关',
    ],
    questionsB: [
      'B.史端乔',
      'B.高锟',
      'B.史端乔',
      'B. 博纳斯李 ',
      'B.384kbps',
      'B.GSM',
      'B.HSPA ',
      'B.英国',
      'B. CDMA2000',
      'B.宏蜂窝小区 ',
      'B.900MHz',
      'B.计算机网(主要指互联网)',
      'B.互联网',
      'B.全球通讯系统',
      'B.一个羧酸酯出羰基，一个醇出α-C ',
      'B.电磁辐射当量越低、越安全',
      'B.GPRS',
      'B.侯为贵',
      'B．CDMA2000',
      'B．可以将模拟信号转换成数字信号',
      'B．资源共享 ',
      'B．路由器'],
    questionsC: [
      'C.莫尔斯',
      'C.姚期智',
      'C.贝尔',
      'C.恩格尔巴特',
      'C.2Mbps',
      'C.GSM+GPRS  ',
      'C.EDGE ',
      'C.韩国 ',
      'C.TD-SCDMA   ',
      'C.微微蜂窝小区',
      'C.1800M',
      'C.有线电视网',
      'C.固定交换',
      'C.全球通信移动系统',
      ' C.两个羧酸酯，一个出羰基，一个出α-C',
      ' C.电磁辐射当量越高、越不安全',
      'C.、CDMA2000  ',
      'C.王晓初',
      ' C．TD-SCDMA',
      'C．加快上网速度的设备',
      'C．分布信息处理 ',
      'C．网桥 '],
    questionsD: [
      'D.高斯',
      'D.梵高',
      'D.华罗庚',
      'D.特斯拉',
      'D.10Mkbps',
      'D.CDMA',
      'D.TD-HSDPA',
      'D.美国',
      'D.WiMAX',
      'D.宏蜂窝小区',
      'D.3600M',
      'D.无线电视网',
      'D.随机交换',
      ' D.全球通信互联系统',
      'D.两个醛或酮，一个出羰基，一个出α-C',
      'D.电磁辐射越高，越安全',
      'D.CDMA ',
      ' D.任正非',
      'D．WiMAX',
      'D．可以将数字信号转换成模拟信号',
      'D．提高系统可靠性',
      'D．在校园绿化带多植树'],
    answer: ['C', 'B', 'A', 'B', 'C', 'C', 'C', 'A', 'A', 'A', 'A', 'A', 'C', 'A', 'C', 'B', 'A', 'B', 'C', 'B', 'D', 'C'],
    questionbody: '',
    A: '',
    B: '',
    C: '',
    D: '',
    Ans: '',
    show: '',
    countj: true,
    bindcount: 0,
    errorcount: 0,
    rightcount: 0,
    count: 0,
    time: '',
    index: '',
  },

  /*设置计数器5分钟*/
  onLoad: function (options) {
    var sec = options.sec;
    var that = this;
    var si = setInterval(function () {
      if (sec > 0) {
        sec--;
        var date = new Date(0, 0)
        date.setSeconds(sec);
        var h = date.getHours(),
          m = date.getMinutes(),
          s = date.getSeconds();
        that.setData({
          time: two_char(h) + ":" + two_char(m) + ":" + two_char(s)
        })
      } else {
        var count = that.data.count;
        if (that.data.bindcount == 0) {
          wx.showModal({
            title: '提示：',
            showCancel: false,
            content: '您还未答题，请重新作答',
            success: function () {
              wx.switchTab({
                url: '../../pages/game/index',
              })
            }
          })
          clearInterval(si);
        } else {
          clearInterval(si);
          app.globalData.bindcount = that.data.bindcount;
          app.globalData.errorcount = that.data.errorcount;
          app.globalData.rightcount = that.data.rightcount;
          wx.redirectTo({
            url: '../../pages/game/end?count=' + count,
          })
        }
      }
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.refresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  refresh: function () {
    var that = this;
    var questions = that.data.questions;
    var questionsA = that.data.questionsA;
    var questionsB = that.data.questionsB;
    var questionsC = that.data.questionsC;
    var questionsD = that.data.questionsD;
    var answer = that.data.answer;
    var index = Math.floor(Math.random() * (questions.length - 1));
    if (questions.length > 0) {
      this.setData({
        questionbody: questions.splice(index, 1),
        A: questionsA.splice(index, 1),
        B: questionsB.splice(index, 1),
        C: questionsC.splice(index, 1),
        D: questionsD.splice(index, 1),
        Ans: answer.splice(index, 1),
        questions: questions,
        questionsA: questionsA,
        questionsB: questionsB,
        questionsC: questionsC,
        questionsD: questionsD,
        answer: answer,
        index: index,
        show: '',
        countj: true,
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '没题了',
      })
    }
  },
  disp: function (e) {
    var id = e.currentTarget.id;
    var num = e.currentTarget.dataset.num;
    var count = e.currentTarget.dataset.count;
    var bindcount = e.currentTarget.dataset.bindcount;
    var rightcount = e.currentTarget.dataset.rightcount;
    var errorcount = e.currentTarget.dataset.errorcount;
    if (this.data.countj) {
      if (id == num) {
        this.setData({
          show: '正确！',
          count: count + 5,
          countj: false,
          bindcount: bindcount + 1,
          rightcount: rightcount + 1,
        })
      } else {
        this.setData({
          show: '错误！' + '答案：' + num,
          count: count - 2,
          countj: false,
          bindcount: bindcount + 1,
          errorcount: errorcount + 1,
        })
      }
    }
  }
  
})