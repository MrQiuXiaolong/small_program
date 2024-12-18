// index.js
import {getBaseUrl,requestUtils} from '../../utils/requestUtils' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    baseUrl:'',
    bigType:[],
    bigType_row1:[],
    bigType_row2:[],
    isHostProductList:[],
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'http://localhost:8080/product/findSwiper',
    //   method:'GET',
    //   success:(res)=>{
       
    //     this.setData({
    //       swiperList:res.data.data.message
    //     })
    //   }
    // })
   //获取baseUrl路径
   const baseUrl= getBaseUrl()
   //更新baseUrl路径
   this.setData({
    baseUrl
   })

  this.getSwiperList()
  this.getBigType()
  this.getProductList()

  },
  onShow(){
    let index=-1;
    wx.setStorageSync('index',index)
  },

  /**
   * async .... await... await必须使用在async中
   * 这样代码就会像同步代码一样 await会等待promise 直到返回结果
   */
  async getSwiperList(){
    const res =await requestUtils({ url: '/product/findSwiper',method:'GET'})
      this.setData({
        swiperList:res.data.message,
      })
  },
  /**
   * 商品的大类
   * filter 数组过滤器 
   */
  async getBigType(){
    const res = await requestUtils({url:'/bigType/findAll',method:'GET'})
    const bigType = res.data.message
    const bigType_row1 = bigType.filter((item,index)=>{return index<5})
    const bigType_row2 = bigType.filter((item,index)=>{return index>=5})
    this.setData({
      bigType,
      bigType_row1,
      bigType_row2
    }) 
    
  },

  /**
   * 商品热卖
   */
  async getProductList(){
    const res = await requestUtils({url:'/product/findIsHost',method:'GET'});
    
    const isHostProductList=res.data.message
    this.setData({
      isHostProductList
    })
  },

  /**
   * 跳转
   * @param {*} event 
   */
  handlerJump(event){
    const {index} = event.currentTarget.dataset
    console.log(index)
    wx.setStorageSync('index', index)

    //以前
    const app = getApp()
    app.globalData.index=index
   
  }



})

