const util = require('../../utils/util.js')
const defaultLogName = {
  work: '工作',
  rest: '休息'
}
const actionName = {
  stop: '停止',
  start: '开始'
}

const initDeg = {
  left: 45,
  right:-45
}
const devicesId = "576315018" // 填写在OneNet上获得的devicesId 形式就是一串数字 例子:9939133
const api_key = "ZnAmtgUDSRR=WJExmOlyomR4yJc=" // 填写在OneNet上的 api-key 例子: VeFI0HZ44Qn5dZO14AuLbWSlSlI=
Page({

  data: {
    remainTimeText: '',
    timerType: 'work',
    log: {},
    completed: false,
    isRuning: false,
    leftDeg: initDeg.left,
    rightDeg: initDeg.right,
    modalHidden: true,
    judge: 1
  },

  onShow: function() {

    var judge = this.data.judge
    if (this.data.isRuning) return
    let workTime = util.formatTime(wx.getStorageSync('workTime'), 'HH')
    let restTime = util.formatTime(wx.getStorageSync('restTime'), 'HH')
    this.setData({
      workTime: workTime,
      restTime: restTime,
      remainTimeText: workTime + ':00'
    })
    wx.setNavigationBarTitle({
      title: '自定义'
    })
    var that = this
    var judge = that.data.judge
    var timer = setInterval(function() {
      that.getDeviceData(that)

    }, 3000)

    var timer1 = setInterval(function() {
      if (that.data.judge != 0) {
        
        let startTime = Date.now()
        let isRuning = that.data.isRuning
        let timerType = 'work'
        let showTime = that.data[timerType + 'Time']
        let keepTime = showTime * 60 * 1000
        let logName = that.logName || defaultLogName[timerType]
        var judge = that.data.judge
        
        if (!isRuning) {
          that.timer = setInterval((function() {
            that.updateTimer()
            that.startNameAnimation()
          }).bind(that), 1000)
        } else {
          that.stopTimer()
          
        }

        that.setData({
          isRuning: !isRuning,
          completed: false,
          timerType: timerType,
          remainTimeText: showTime + ':00',
          taskName: logName,


        })

        that.data.log = {
          name: logName,
          startTime: Date.now(),
          keepTime: keepTime,
          endTime: keepTime + startTime,
          action: actionName[isRuning ? 'stop' : 'start'],
          type: timerType
        }

        that.saveLog(that.data.log)

      } else {
        console.log(that.data.judge)
        that.setData({
          leftDeg: initDeg.left,
          rightDeg:initDeg.right
        })

        // clear timer
        that.timer && clearInterval(that.timer)
      }
    }, 3000)
  },


  getDeviceData: function(that) {
    var _this = this;
    wx.request({
      url: `https://api.heclouds.com/devices/${devicesId}/datastreams`,
      header: {
        'content-type': 'application/json',
        'api-key': api_key
      },
      success: function(res) {
        console.log(res.data);
        _this.setData({
          judge: res.data.data[3].current_value
        });
      },
      fail: function() {
        wx.showToast({
          title: '与服务器通信失败',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },

  startTimer: function(e) {
    let startTime = Date.now()
    let isRuning = this.data.isRuning
    let timerType = e.target.dataset.type
    let showTime = this.data[timerType + 'Time']
    let keepTime = showTime * 60 * 1000
    let logName = this.logName || defaultLogName[timerType]
    var judge = judge
    console.log(e)
    if (!isRuning) {
      this.timer = setInterval((function() {
        this.updateTimer()
        this.startNameAnimation()
      }).bind(this), 1000)
    } else {
      this.stopTimer()
      console.log(startTime)
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      timerType: timerType,
      remainTimeText: showTime + ':00',
      taskName: logName,
      figure: e.detail.value - 1

    })

    this.data.log = {
      name: logName,
      startTime: Date.now(),
      keepTime: keepTime,
      endTime: keepTime + startTime,
      action: actionName[isRuning ? 'stop' : 'start'],
      type: timerType
    }

    this.saveLog(this.data.log)
  },

  startNameAnimation: function() {
    let animation = wx.createAnimation({
      duration: 450
    })
    animation.opacity(0.2).step()
    animation.opacity(1).step()
    this.setData({
      nameAnimation: animation.export()
    })
  },

  stopTimer: function() {
    // reset circle progress
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    })

    // clear timer
    this.timer && clearInterval(this.timer)
  },

  updateTimer: function() {
    let log = this.data.log
    let now = Date.now()
    let remainingTime = Math.round((log.endTime - now) / 1000)
    let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
    let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
    let S = util.formatTime(Math.floor(remainingTime) % 60, 'SS')
    let halfTime

    // update text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime == 0) {
      this.setData({
        completed: true
      })
      this.stopTimer()
      return
    }

    // update circle progress
    halfTime = log.keepTime / 2
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
      })
    } else {
      this.setData({
        leftDeg: -135
      })
      this.setData({
        rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
      })
    }
  },

  changeLogName: function(e) {
    this.logName = e.detail.value
  },

  saveLog: function(log) {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(log)
    wx.setStorageSync('logs', logs)
  }
})