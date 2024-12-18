// pages/category/index.js
import {getBaseUrl,requestUtils} from '../../utils/requestUtils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'',
    leftMenu:[],
    rightContainer:[],
    currentIndex:0,
  },
  //总数据
  Cate:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取到baseUrl路径
    const baseUrl = getBaseUrl()
    //更新baseUrl路径
    this.setData({
      baseUrl
    })
    this.getMenu()
  },
  /**
   * 监听页面显示
   */
    onShow:function(){
    //let index = app.globalData.index

    let index= wx.getStorageSync('index')
    if(index!=-1){
      this.getCates2(index);
      //app.globalData.index=-1;
      wx.setStorageSync('index',-1)
    }
    
  },

  async getCates2(index){
    const baseUrl = getBaseUrl()
    const res = await requestUtils({url:'/bigType/findCategories',method:'GET'});
    this.Cate=res.data.message;
    let leftMenu = this.Cate.map(v=>v.name)
    let rightContainer=this.Cate[index].smallTypes
    this.setData({
      leftMenu,
      rightContainer,
      currentIndex:index,
      baseUrl
    })
  },
    
  /**
   * 左侧数据
   */
  async getMenu(){
    const res = await requestUtils({url:'/bigType/findCategories',method:'GET'});
    this.Cate=res.data.message;
    let leftMenu = this.Cate.map(v=>v.name)
    let rightContainer=this.Cate[0].smallTypes
    this.setData({
      leftMenu,
      rightContainer
    })
  },
  /**
   * 切换样式
   * @param {*} event  前端传递过来的数据
   */
  getSwitch(event){
   const {index:currentIndex} = event.target.dataset
   let rightContainer=this.Cate[currentIndex].smallTypes
   this.setData({
    currentIndex,
    rightContainer
   })
  }
  
})