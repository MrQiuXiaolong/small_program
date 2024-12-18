// pages/product_detail/index.js
import {getBaseUrl,requestUtils} from '../../utils/requestUtils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'',
    productObj:{},
    activeIndex:0
  },
  /**
   * 购物车数据
   */
  productInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const baseUrl = getBaseUrl()
    this.setData({
      baseUrl
    })
  
    this.getProductDetail(options.id)
  },

  //获取商品数据
  async getProductDetail(id){
     const res = await requestUtils({url:'/product/detail',data:{id},method:'GET',})
    
     this.productInfo=res.data.message
     this.setData({
      productObj:res.data.message
     })
  },
  //商品详情判断展示
  handlerItemTab(event){
    const {index} = event.currentTarget.dataset
   
    this.setData({
      activeIndex:index
    })
  },

  //立即购买
  handlerBuy(){
   this.handlerCartAdd()
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  //添加购物车
  handlerCartAdd(){
      let cart = wx.getStorageSync('cart')||[]

      //返回的是匹配到id当前数组的下标
      let index = cart.findIndex(v=>v.id==this.productInfo.id)
  
      if(index==-1){
        this.productInfo.num=1
        this.productInfo.check=true
        cart.push(this.productInfo)
      }else{
        cart[index].num++
      }
     
      //添加到缓存中
      wx.setStorageSync('cart', cart)
      wx.showToast({
        title: '加入购物车成功',
        icon:'success',
        mask:true
      })
  },

 

 
})