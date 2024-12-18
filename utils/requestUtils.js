const baseUrl="http://localhost:8080"
let ajaxTime=0
/**
 * 定义baseUrl
 */
export const getBaseUrl=()=>{
    return baseUrl
}
/**
 * 获取用户登录
 */
export const getWxLogin=()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
          timeout:5000,
          success: (res) => {
           resolve(res)
          },
          fail:(err)=>{
            reject(err)
          }

        })
    })
}

/**
 * 获取用户信息
 */
export const getUserProfile=()=>{
    return new Promise((resolve,reject)=>{
      wx.getUserProfile({
        desc:'获取用户信息',
        success: (res) => {
          resolve(res)
         },
         fail:(err)=>{
           reject(err)
         }
      })
    })
}

/**
 * 请求的工具类
 * @param {*} prams 传入的url method ...一系列请求参数 
 */
export const requestUtils=(prams)=>{
  
  let header= {...prams.header}
 
 if(prams.url.includes('/my/')){
   //header["token"] 是给header对象添加一个属性
   header["token"]=wx.getStorageSync('token')
 }


  var start = new Date().getTime()
  ajaxTime++
  wx.showLoading({
    title: '加载中',
  })
  //模拟延迟加载
  while(true) {
    if(new Date().getTime()-start > 1*300) break
  }
  


  return new Promise((resolve,reject)=>{
    wx.request({
      // ...解构  意思为所以参数，全部
      ...prams,
      header,
      url:baseUrl+prams.url,
      success:(res)=>{
       resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{
        ajaxTime--
        if(ajaxTime==0){
          wx.hideLoading()
        }
       
      }
    })
  })

}