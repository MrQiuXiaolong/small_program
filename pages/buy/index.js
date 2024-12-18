// pages/cart/index.js
import {getBaseUrl,getWxLogin,getUserProfile, requestUtils} from '../../utils/requestUtils' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'',
    cart:[],
    address:{},
    allCheck:false,
    totalPrice:0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    //获取baseUrl路径
    const baseUrl= getBaseUrl()
    //更新baseUrl路径
    this.setData({
      baseUrl
    })
   
    let address = wx.getStorageSync('address')
    
    this.setData({
      address
    })

    let cart = wx.getStorageSync('cart')||[]
    
    this.setCart(cart)
  
    
  },

  //订单
  async handlerOrderPay(){
  const token = wx.getStorageSync('token')
  if(!token){
    Promise.all([getWxLogin(),getUserProfile()]).then((res)=>{
      let loginParam={
        code:res[0].code,
        nickName:res[1].userInfo.nickName="宇宙无敌地狱火",
        avatarUrl:res[1].userInfo.avatarUrl="https://pic.imgdb.cn/item/67612bfdd0e0a243d4e528b0.jpg"
      }
      wx.setStorageSync('userInfo', res[1].userInfo)
  
      this.userLogin(loginParam)
    })    
  }else{
    console.log("<pages/buy/index> token存在 -------->"+token)
    this.createOrder()
  }

  
  
  },

  /**
   * 请求后端获取接口
   * @param {*} loginParam 参数
   */
  async userLogin(loginParam){
    const res = await requestUtils({url:'/user/wxLogin',data:loginParam,method:'POST'})
    let token = res.data.token

    if(res.code===200){
      wx.setStorageSync('token', token)
      this.createOrder()
    }
  },
 /**
  * 创建订单
  */ 
 async createOrder(){
    const totalPrice=this.data.totalPrice
    const address= this.data.address.provinceName+this.data.address.cityName+this.data.address.countyName+this.data.address.detailInfo
    const consignee=this.data.address.userName
    const telNumber=this.data.address.telNumber
    let orderDetail=[]
    this.data.cart.forEach(v=>{
      orderDetail.push({
        goodsId:v.id,
        goodsNumber:v.num,
        goodsPrice:v.price,
        goodsName:v.name,
        goodsPic:v.proPic
      })
    })
    const orderParam={
      totalPrice,
      address,
      consignee,
      telNumber,
      orderDetail
    }
    const res = await requestUtils({url:'/my/order/create',method:'POST',data:orderParam})
    console.log(res)
    if(res.code===500){
     wx.showModal({
       title: '异常',
       content: res.message,
     })
    }else if(res.code===200){
      wx.showToast({
        title: '购买成功',
      })
    }
    
 },


  /**
   * 全选 合计 结算 计算
   */
  setCart(cart){
    //过滤check为false的属性
    cart=cart.filter(v=>v.check);
    let totalPrice=0
    let totalNum =0
   
    cart.forEach((v)=>{
     
       totalNum += v.num
       totalPrice += v.num*v.price
      
    })
    
    
   
    this.setData({
      cart,
      totalNum,
      totalPrice
    })
  },

  //收货地址
  clickOnTheAddress(){
      wx.chooseAddress({
        success:(res)=>{
            console.log(res)
            wx.setStorageSync('address',res)
        }   
      })

  },

 


})