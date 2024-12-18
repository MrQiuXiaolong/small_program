// pages/order/index.js
import {requestUtils,getBaseUrl}from '../../utils/requestUtils'
Page({

  data: {
    orderList:[]
  },
  onShow(){
    this.orderList()
  },
  async orderList(){
    const res = await requestUtils({url:'/my/order/list',method:'POST'})
    this.setData({
      orderList:res.data.message
    })
  }
})