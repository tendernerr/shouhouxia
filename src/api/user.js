import {post,get,request} from '@/config/index';

// 微信登录
// export async function wxLogin(data){
//     return await get('/xxx/login',data)
// }
// export async function wxLogin(data){
//     return await request('post','/xxx/login',data)
// }
   
// 登录日志 
export async function getLoginLog(data){
    return await get('/v1_0/sales/member/getLoginLog',data)
}

//系统消息
export async function getSystemTip(data){
    return await get('v1_0/sales/member/getSystemTip',data)
}

//建议反馈
export async function getfeedBack(data){
    return await post('v1_0/sales/member/feedBack',data)
}
//修改账号
export async function getmodifyUser(data){
    return await post('v1_0/sales/member/modifyUser',data)
}
//修改密码
export async function getmodifyPwd(data){
    return await post('v1_0/sales/member/modifyPwd',data)
}
//手机号码登录
export async function getlogin(data){
    return await post('v1_0/sales/index/login',data)
}
//发布采购
export async function getPurchase(data){
    return await post('v1_0/sales/index/purchase',data)
}
// // 微信获取code
// export async function wxGetCode(data){
//     return await request('get','v1_0/sales/index/getCode',data)
// }
// 微信获取用户信息
export async function wxGetUserInfo(data){
    return await get('v1_0/sales/index/getUserInfo',data)
}
//售后投诉下拉
export async function getDeviceList(data){
    return await get('v1_0/sales/index/getDeviceList',data)
}
//上传图片（售后投诉）
export async function getUploadList(data){
    return await request('post','/v1_0/sales/index/upload',data)
}
// 售获取售后投诉（我的投诉）
export async function getMySalesComplaint(data){
    return await post('v1_0/sales/index/getMySalesComplaint',data)
}
// 添加售后投诉
export async function addSalesComplaint(data){
    return await post('v1_0/sales/index/addSalesComplaint',data)
}
//售后企业列表
export async function getCompanyAfterSalesList(data){
    return await get('v1_0/sales/index/getCompanyAfterSalesList',data)
}
//我的设备
export async function deviceList(data){
    return await get('v1_0/sales/index/deviceList',data)
}
//我的设备售后详情
export async function deviceShow(data){
    return await get('v1_0/sales/index/deviceShow',data)
}
//售后企业详情
export async function getCompanyAfterSalesShow(data){
    return await get('v1_0/sales/index/getCompanyAfterSalesShow',data)
}

//售后企业详情 (客户反馈)
export async function getFeedback(data){
    return await get('/v1_0/sales/index/getFeedback',data)
}

//售后企业详情 (视频)
export async  function getShortVideoList(data){
    return await get('/v1_0/sales/index/getShortVideoList',data)
}

//云售后立即申请 
export async  function salesRegisterApply(data){
    return await post('v1_0/sales/index/salesRegisterApply',data)
}

//云售后立即申请 
export async  function wxBd(data){
    return await post('v1_0/sales/index/bindWeixin',data)
}
//投诉广场
export async function getComplaintSquare(data){
   return await get('/v1_0/sales/index/getComplaintSquare',data)
}
//获取微信配置
export async function getWeixinConfig(data){
    return await get('/v1_0/sales/index/getWeixinConfig',data)
 }
//自动化案例下拉数据
export async function classifyIndex(data){
    return await get('/v1_0/sales/classify/index',data)
 }
//自动化案例
export async function videolists(data){
    return await get('/v1_0/sales/index/lists',data)
 }
 //自动化案例 详情
export async function videoDetail(data){
    return await get('/v1_0/sales/index/detail',data)
 }
// 发送手机验证码
export async function phoneCodeGet(data){
    return await post("/v1_0/sales/index/sendSms",data)
}
// 退出登录
export async function loginOut(data){
    return await post("/v1_0/sales/index/loginOut",data)
}
// 微信解除绑定
export async function unBindWeixin(data){
    return await post("/v1_0/sales/index/unBindWeixin",data)
}
//售后企业详情 点赞
export async function addBeckon(data){
    return await get("/v1_0/sales/index/addBeckon",data)
}
//提交手机认证
export async function authMobile(data){
    return await get("/v1_0/sales/member/authMobile",data)
}
//发送短信
export async function sendAuthSms(data){
    return await get("/v1_0/sales/member/sendAuthSms",data)
}
//企业管理 （所属行业）
export async function indexManagement(data){
    return await get("/v1_0/sales/classify/index",data)
}
//售后评价（选择供应商）
export async function selectSupplier(data){
    return await get("/v1_0/sales/member/selectSupplier",data)
}
//售后评价
export async function addSaleEvaluate(data){
    return await get("/v1_0/sales/member/addSaleEvaluate",data)
}
//企业管理获取
export async function companyManage(data){
    return await get("/v1_0/sales/index/companyManage",data)
}
//企业管理获取
export async function companyManages(data){
    return await post("/v1_0/sales/index/companyManage",data)
}
//用户是否登录
export async function hasLogin(data){
    return await post("/v1_0/sales/index/hasLogin",data)
}

//自动化案例投项目
export async function sendSalesInvestmentProject(data){
    return await post("/v1_0/sales/index/sendSalesInvestmentProject",data)
}
//二手市场列表
export async function getSecondMarketList(data){
    return await get("/v1_0/sales/second_market/getSecondMarketList",data)
}
//二手市场详情
export async function getSecondMarketShow(data){
    return await get("/v1_0/sales/second_market/getSecondMarketShow",data)
}
//二手市场新增
export async function insertSecondMarket(data){
    return await post("/v1_0/sales/second_market/insertSecondMarket",data)
}

//二手市场地区下拉列表
export async function marketIndex(data){
    return await get("/v1_0/sales/classify/index",data)
}
//获取用户信息
export async function getUser(data){
    return await get("/v1_0/sales/index/getUser",data)
}
// //系统消息
// export async function getSystemTip(data){
//     return await get("/v1_0/sales/member/getSystemTip",data)
// }
