// pages/cart/index.js
import {getBaseUrl,requestUtils} from '../../utils/requestUtils' 
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
  /**
   * 复选框
   */
  handlerCheck(event){
    const {id}= event.currentTarget.dataset
    
    const {cart} = this.data
    const index = cart.findIndex(v=>v.id==id)
    cart[index].check=!(cart[index].check)
    this.setCart(cart)
    
  },
  /**
   * 全选
   */
  handlerSelectAll(){
    let {cart,allCheck} = this.data
    allCheck=!allCheck
    cart.forEach(v=>v.check=allCheck)
    this.setCart(cart)
  },

  /**
   * + -操作
   */
  handlerNum(options){
    const {event,id}=options.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(v=>v.id===id) 
      cart[index].num+=event 
      if(cart[index].num<=0){
        console.log("小于0")
        cart[index].num=0
        wx.showModal({
          title: '系统提示',
          content: '你是否要删除',
          cancelColor: 'cancelColor',
          success:(res)=>{
            if(res.confirm){
              //splice从下标指定地方删除一个元素
              cart.splice(index,1)
              this.setCart(cart)
            }else{
              cart[index].num+=1
              this.setCart(cart)
            }
          }
        })
      }
    this.setCart(cart)
  },

  /**
   * 全选 合计 结算 计算
   */
  setCart(cart){
    let allCheck=true
    let totalPrice=0
    let totalNum =0
    cart.forEach((v)=>{
      if(v.check){
        
       totalNum += v.num
       totalPrice += v.num*v.price

      }else{
        allCheck=false
      }
    })
    allCheck=cart.length!=0?allCheck:false
    
   
    this.setData({
      cart,
      allCheck,
      totalNum,
      totalPrice
    })
    //设置到缓存当中
    wx.setStorageSync('cart', cart)
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
  //结算
  handlerPay(){
    const {address,totalNum}= this.data
    if(!address){
      wx.showToast({
        title: '请选择收获地址',
        icon:'none'
      })
      return
    }

    if(totalNum===0){
      wx.showToast({
        title: '请添加商品',
        icon:'none'
      })
      return
    }

    wx.navigateTo({
      url: '/pages/buy/index',
    })

  }

})