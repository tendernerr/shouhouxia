<template>
    <div class="appContent">
        <van-nav-bar title="登录日志" left-arrow @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_purchase">
                    <img src="@/assets/u56.png" />
                </div>
            </div>
        </van-nav-bar>

        <div class="loginLog">
            <div class="loginLog_item" v-for="item in loginLogList">
                <div class="login_top">
                    <div class="title"> 登录时间 :<span> {{ item.addtime }}</span></div>
                    <div class="map"> {{ item.address }} </div>
                </div>
                <div class="login_bottom">
                    <div class="ip"> 登录ip :<span> {{ item.ip }}</span> </div>
                    <div class="ie"> {{ item.source }} </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script >
import { getLoginLog } from '@/api/user';
import { Toast } from 'vant';

export default {
    data() {
        return {
            loginLogList: [],

        }
    },
    created() {
        this.LoginLog();
    },
    methods: {
        LoginLog() {
            getLoginLog({
                uid: '24',
                page: 1,
                pagesize: 10
            }).then(res => {
                // 如果获取成功
                if (res.data.code == 200) {
                    this.loginLogList = res.data.data.list
                } else {
                    Toast(res.data.message)
                }
            })
        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/accountManagement/managementaccount')
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title {
    font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
}

::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}

.appContent {
    background-color: rgba(243, 243, 243, 1);
    height: 100%;
    position: absolute;
    width: 100%;
}

.loginLog {
    .loginLog_item {
        display: flex;
        flex-direction: column;
        background-color: #FFF;
        padding: 10px;
        line-height: 25px;
        font-size: 12px;
        color: #6E6E6E;
        border-bottom: 1px solid #ebedf0;

        .login_top {
            display: flex;
            justify-content: space-between;
            color: #6E6E6E;
        }

        .login_bottom {
            display: flex;
            justify-content: space-between;
            color: #6E6E6E;
        }
    }
}
</style>