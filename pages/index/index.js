//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    item:0,
    tab:0,
    playlist:[{
      id:1,
      title:'丢了你',
      singer:'井胧',
      src:"/pagesA/audio/diuleni.mp3",
      coverImgUrl:"/pages/images/mh.jpg"
    },{
      id:2,
      title:'你是人间四月天',
      singer:'解忧邵帅',
      src:"/pages/audio/siyuetian.mp3",
      coverImgUrl:"/pages/images/mh.jpg"
    },{
      id:3,
      title:'爸爸妈妈',
      singer:'李荣浩',
      src:"/pages/audio/bbmm.mp3",
      coverImgUrl:"/pages/images/mh.jpg"
    },{
      id:4,
      title:'还是分开',
      singer:'张叶雷',
      src:"/pagesB/audio/haishifenkai.mp3",
      coverImgUrl:"/pages/images/mh.jpg"
    }],
    state:'paused',
    playindex:0,
    play:{
      currentTime:"00:00",
      duration:"00:00",
      percent:0,
      title:"",
      singer:"",
      coverImgUrl:'/pages/images/mh.jpg'
    },
    audioCtx:null
  },
  play:function(){
    // console.log('play......')
    this.audioCtx.play();
    // console.log(this.audioCtx)
    this.setData({state:'running'});
  },
  pause:function(){
    // console.log('pause.......')
    this.audioCtx.pause();
    this.setData({state:'paused'});
  },
  next:function(){
    let index = this.data.playindex>=this.data.playlist.length-1?0:this.data.playindex+1;
    this.setMusic(index);
    if(this.data.state === 'running'){
      this.play();
    }
  },
  change:function(e){
    this.setMusic(e.currentTarget.dataset.index);
    this.play();
  },
  changePage:function(e){
    // console.log(e.currentTarget.dataset)
    this.setData({
      tab:e.currentTarget.dataset.page,
      item:e.currentTarget.dataset.page
    })
  },
  onReady:function(){
    let _that = this;
    //自动选择播放列表中的第1个曲目
    this.audioCtx = wx.createInnerAudioContext();
    
    //播放失败检测
    this.audioCtx.onError(function(){
      console.log('播放失败：'+_that.audioCtx.src)
    })

    //播放完成自动换下一曲
    this.audioCtx.onEnded(function(){
      _that.next();
    })

    //自动更新播放进度
    this.audioCtx.onPlay(function(){
        console.log("开始")
    })
    this.audioCtx.onTimeUpdate(function(){
      console.log("监测。。。。")
      _that.setData({
        'play.duration':formatTime(_that.audioCtx.duration),
        'play.currentTime':formatTime(_that.audioCtx.currentTime),
        'play.percent':_that.audioCtx.currentTime/_that.audioCtx.duration*100
      })
    })

    this.audioCtx.onStop(function(){
      console.log("停止。。。。")
    })
    console.log(this.audioCtx)

    //默认选择第1曲
    this.setMusic(2);

    //格式化时间
    function formatTime(time){
      var minute = Math.floor(time/60)%60;
      var second = Math.floor(time)%60;
      return (minute<10?'0'+minute:minute)+':'+(second<10?'0'+second:second)
    }
  },
  setMusic(index){
    var music = this.data.playlist[index];
    this.audioCtx.src = music.src;
    this.setData({
      playindex:index,
      'play.title':music.title,
      'play.singer':music.singer,
      'play.coverImgUrl':music.coverImgUrl,
      'play.currentTime':"00:00",
      'play.duration':"00:00",
      'play.percent':0
    })
  },
  sliderChange(e){
    var second = e.detail.value * this.audioCtx.duration/100;
    this.audioCtx.seek(second);
  },
  changeItem(e){
    this.setData({
      item:e.target.dataset.item
    })
  },
  changeTab(e){
    this.setData({
      tab:e.detail.current
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})


