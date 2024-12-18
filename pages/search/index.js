// pages/search/index.js
import {requestUtils,getBaseUrl}from '../../utils/requestUtils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],
    isFocus:false, // 取消 按钮 是否显示
    inputValue:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  TimeId:-1,
  handlerInput(e){
    const {value}=e.detail;
    console.log(value.trim())
    //trim去除空格
    if(!value.trim()){
      this.setData({
        productList:[],
        isFocus:false
      })
      return
    }
    this.setData({
      isFocus:true
    })
    
    clearTimeout(this.TimeId)
    //用户每输入一个字符，都会清除之前的定时器并设置一个新的定时器。
    //停止一秒后发生请求
    this.TimeId=setTimeout(()=>{
      this.search(value)
    },1000)
    
    
  },
  async search(q){
    const res = await requestUtils({url:'/product/search',data:{q},method:'GET'})
    let {productList} = res.data
    this.setData({
      productList
    })
  },
  handleCancel(){
    this.setData({
      productList:[],
      isFocus:false, 
      inputValue:""
    })
  }
})