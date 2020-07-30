const app = getApp();
Page({
  data:{

  },
  scroll:function(e){
    // console.log(e.detail);
  },
  sliderChanging:function(e){
    console.log(e.detail.value)
  },
  onReady:function(){

    // 创建InnerAudioContext实例
    var audioCtx = wx.createInnerAudioContext();

    //设置音频资源地址
    audioCtx.src="http://m801.music.126.net/20200728154337/3abfabb857ac260e88f3beb401998f74/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/2270179822/2491/6dd5/eafd/7db3a42de108d4d1dbb91fb71d024c28.mp3";

    //当开始播放时，输出调试信息
    audioCtx.onPlay(function(){
      console.log("开始播放")
    })

    //当发生错误时，输出调试信息
    audioCtx.onError(function(res){
      console.log(res.errMsg);//错误信息
      console.log(res.errCode);//错误码
    })
    audioCtx.play();
  }

})