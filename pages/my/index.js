// pages/my/index.js
import {getBaseUrl,getWxLogin,getUserProfile, requestUtils} from '../../utils/requestUtils' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //判断是否有token
    const token = wx.getStorageSync('token')
    if(!token){
      wx.showModal({
        title: '友情提示',
        content: '请授权登录,享受更多服务😀',
       success:()=>{
        Promise.all([getWxLogin(),getUserProfile()]).then((res)=>{
          let loginParam={
            code:res[0].code,
            nickName:res[1].userInfo.nickName="宇宙无敌地狱火",
            avatarUrl:res[1].userInfo.avatarUrl="https://pic.imgdb.cn/item/67612bfdd0e0a243d4e528b0.jpg"
          }
          wx.setStorageSync('userInfo', res[1].userInfo)
      
          this.userLogin(loginParam)
          this.setData({
            userInfo:res[1].userInfo
          })
        })    
       }
      })
    }else{
      console.log("token已存在")
      const userInfo = wx.getStorageSync('userInfo')
      console.log(userInfo)
      this.setData({
        userInfo
      })
    }

  },

  async userLogin(loginParam){
    const res = await requestUtils({url:'/user/wxLogin',data:loginParam,method:'POST'})
    let token = res.data.token

    if(res.code===200){
      wx.setStorageSync('token', token)
    }
  },

  contactUs(){
   
    wx.showModal({
      title: '关于我们',
      content: '我们的手机商城致力于为用户提供高品质的手机及配件，涵盖各大品牌和型号。通过专业的服务和优惠的价格，我们为顾客提供便捷的购物体验，致力于成为您信赖的手机购物平台。',
      showCancel: false,
    })
  }

  
})