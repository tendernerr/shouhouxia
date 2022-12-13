import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login/authLogin'
  },
  {
    path: '/login/authLogin',
    name: 'authorization',
    component: () => import('../views/login/authorization.vue')
  },
  // 登录方式
  {
    path: '/login/account',
    name: 'account',
    component: () => import('../views/login/account.vue')
  },
  // 新用户申请
  {
    path: '/login/userApplication',
    name: 'userApplication',
    component: () => import('../views/login/userApplication.vue')
  },

  // 查企业  查看没有
  {
    path: '/queryEnterprise/queryResults',
    name: 'queryResults',
    component: () => import('../views/queryEnterprise/queryResults.vue')
  },
  // video 播放页
  {
    path: '/video/play',
    name: 'play',
    component: () => import('../views/caseVideo/index.vue')
  },
  // video 播放页
  {
    path: '/video/play',
    name: 'plays',
    component: () => import('../views/caseVideo/indexs.vue')
  },
  {
    path: '/core',
    name: "core",
    redirect: '/core/management',
    component: () => import('../views/core/index.vue'),
    children: [
      // 自动化案例
      {
        path: '/caseVideo/automationCase',
        name: 'automationCase',
        component: () => import('../views/caseVideo/automationCase.vue')
      },
      // 管理中心
      {
        path: '/core/management',
        name: 'management',
        component: () => import('../views/core/management.vue')
      },
      // 查企业  查看有
      {
        path: '/queryEnterprise/querySales',
        name: 'querySales',
        component: () => import('../views/queryEnterprise/querySales.vue')
      },
    ]
  },
  // 我的设备
  {
    path: '/detailedEquipment/equipment',
    name: 'equipment',
    component: () => import('../views/detailedEquipment/equipment.vue')
  },
  // 发布采购
  {
    path: '/core/purchaseRelease',
    name: 'purchaseRelease',
    component: () => import('../views/core/purchaseRelease.vue')
  },
  // 售后投诉
  {
    path: '/salesComplaints/complaint',
    name: 'complaint',
    component: () => import('../views/salesComplaints/complaint.vue')
  },
  // 我的投诉 
  {
    path: '/salesComplaints/mecomplaint',
    name: 'mecomplaint',
    component: () => import('../views/salesComplaints/mecomplaint.vue')
  },
  // 投诉广场
  {
    path: '/core/complaintSquare',
    name: 'complaintSquare',
    component: () => import('../views/core/complaintSquare.vue')
  },

  // 售后详情
  {
    path: '/detailedEquipment/afterSales',
    name: 'afterSales',
    component: () => import('../views/detailedEquipment/afterSales.vue')
  },
  //新增设备
  {
    path: '/core/newQquipment',
    name: 'newQquipment',
    component: () => import('../views/core/newQquipment.vue')
  },
  //自动化案例
  {
    path: '/caseVideo/automationCase',
    name: 'automationCase',
    component: () => import('../views/caseVideo/automationCase.vue')
  },
  // 企业资料
  {
    path: '/core/information',
    name: 'information',
    component: () => import('../views/core/information.vue')
  },
  // 账号管理
  {
    path: '/accountManagement/managementaccount',
    name: 'managementaccount',
    component: () => import('../views/accountManagement/managementaccount.vue')
  },
  // 修改账号
  {
    path: '/managementaccount/userNameUpdate',
    name: 'userNameUpdate',
    component: () => import('../views/accountManagement/userNameUpdate.vue')
  },
  // 修改密码
  {
    path: '/managementaccount/passWrodUpdate',
    name: 'passWrodUpdate',
    component: () => import('../views/accountManagement/passWrodUpdate.vue')
  },
  // 手机认证
  {
    path: '/managementaccount/phoneAuth',
    name: 'phoneAuth',
    component: () => import('../views/accountManagement/phoneAuth.vue')
  },
  // 系统消息
  {
    path: '/managementaccount/systemInfo',
    name: 'systemInfo',
    component: () => import('../views/accountManagement/systemInfo.vue')
  },
  // 登录日志
  {
    path: '/managementaccount/loginLog',
    name: 'loginLog',
    component: () => import('../views/accountManagement/LoginLog.vue')
  },
  // 建议反馈
  {
    path: '/managementaccount/feedback',
    name: 'feedback',
    component: () => import('../views/accountManagement/feedback.vue')
  },
  //查询企业的详情
  {
    path: '/core/informationDetails',
    name: 'informationDetails',
    component: () => import('../views/core/informationDetails.vue')
  },
  // 微信绑定页
  {
    path: '/wxbind/wxbd',
    name: 'wxbd',
    component: () => import('../views/wxbind/wxbd.vue')
  },
  //售后评价

  {
    path: '/detailedEquipment/serviceAssess',
    name: 'serviceAssess',
    component: () => import('../views/detailedEquipment/serviceAssess.vue')
  },
  //了解平台监督机制>>(公司详情)
  {
    path: '/core/announcementDetails',
    name: 'announcementDetails',
    component: () => import('../views/core/announcementDetails.vue')
  },
  //售后联络人
  {
    path: '/core/serviceLiaison',
    name: 'serviceLiaison',
    component: () => import('../views/core/serviceLiaison.vue')
  },
  //二手市场
  {
    path: '/core/secondhand',
    name: 'secondhand',
    component: () => import('../views/core/secondhand.vue')
  },
  //二手市场详情
  {
    path: '/core/secondhandDetails',
    name: 'secondhandDetails',
    component: () => import('../views/core/secondhandDetails.vue')
  },
  //二手市场发布
  {
    path: '/core/releaseinformation',
    name: 'releaseinformation',
    component: () => import('../views/core/releaseinformation.vue')
  },
  //新增设备跳转页
  {
    path: '/core/addEquipment',
    name: 'addEquipment',
    component: () => import('../views/core/addEquipment.vue')
  },
  //新增设备
  {
    path: '/core/addedEquipment',
    name: 'addedEquipment',
    component: () => import('../views/core/addedEquipment.vue')
  },

  //测试
  {
    path: '/core/ee',
    name: 'ee',
    component: () => import('../views/core/ee.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || '';
  // const token = localStorage.token;
  // console.log(userInfo);
  if (userInfo.token) {
    next()
  } else {
    console.log(to.path);
    if (to.path == '/login/authLogin') {
      next()
    } else if (to.path == '/login/account') {
      next()
    } else if (to.path == '/login/userApplication') {
      next()
    } else if (to.path == '/core/informationDetails') {
      next()
    } else if (to.path == '/core/announcementDetails') {
      next()
    }
    else if (to.path == '/core/management') {
      next()
    }
    else if (to.path == '/caseVideo/automationCase') {
      next()
    }
    else if (to.path == '/queryEnterprise/querySales') {
      next()
    }
    else if (to.path == '/core/complaintSquare') {
      next()
    }
    else if (to.path == '/video/play') {
      next()
    }
    else if (to.path == '/core/secondhand') {
      next()
    }
    else if (to.path == '/core/purchaseRelease') {
      next()
    }
   
    else {
      next({
        path: '/login/authLogin'
      })
    }
  }
})
export default router
