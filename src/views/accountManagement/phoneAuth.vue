<template>
    <div class="appContent">
        <van-nav-bar title="手机认证" left-arrow   @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_purchase">
                    <img src="@/assets/u56.png" />
                </div>
            </div>
        </van-nav-bar>
        <van-notice-bar left-icon="info" :scrollable="false">当前手机号已验证，修改手机后您的登录手机号将同步修改</van-notice-bar>

        <div class="infoUpdate">
            <van-cell-group>
                <van-field v-model="phone" placeholder="请输入新的手机号" />
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="code" placeholder="请输入验证码">
                    <div slot="button" class="codeLink" @click="verificationCode">
                        {{ confirmContent }}
                    </div>
                </van-field>
            </van-cell-group>

            <div class="submit">
                <van-button type="info" round class="btn" @click="getauthMobile">提交</van-button>

            </div>
        </div>
    </div>
</template>

<script >
import { authMobile, sendAuthSms } from '@/api/user'
import { Notify } from 'vant'
export default {
    data() {
        return {
            confirmContent: "获取验证码",
            totalTime: 60, //倒计时60s
            phone: "",
            // 不同状态的模拟
            status: 0,
            code: '',
        }
    },
    methods: {
        verificationCode() {
            if (this.phone != "") {
                sendAuthSms({
                    phone: this.phone
                }).then(res => {
                    if (res.data.code == 200) {
                        // 发送成功进入倒计时 
                        Notify({ type: 'success', message: `验证码发送成功，请到手机上确认` })
                        this.confirmContent = this.totalTime + "s";
                        let clock = window.setInterval(() => {
                            this.totalTime--;
                            this.confirmContent = this.totalTime + "s";
                            if (this.totalTime <= 0) {
                                this.confirmContent = "重新发送验证码";
                                this.totalTime = 60;
                                clearInterval(clock);
                            }
                        }, 1000);
                    } else {
                        Notify({ type: 'danger', message: `${res.data.message}` })
                    }
                })

            } else {
                Notify({ type: 'danger', message: `请先输入手机号` })
            }
        },
        resetForm(){
            this.phone = "",
            this.code = ""
        },
        getauthMobile() {
            if (!this.phone) {
                Notify({ type: 'danger', message: '请输入手机号' });
            } else if (!this.code) {
                Notify({ type: 'danger', message: '请输入验证码' });
            } else {
                let params = {
                    phone: this.phone,
                    code: this.code
                }
                authMobile({ ...params }).then(res => {
                    if (res.data.code == 200) {
                        Notify({ type: 'success', message: `修改手机号成功` })
                        this.$router.push({ name: 'managementaccount' })
                        this.resetForm();
                    } else {
                        Notify({ type: 'danger', message: `${res.data.message}` });
                    }
                })
            }

        },
           //路径跳转
           onClickLeft() {
            this.$router.push('/accountManagement/managementaccount')
        }

    }
}
</script>

<style lang="scss" scoped>
.codeLink {
    color: #409EFF;
}

.appContent {
    background-color: rgba(243, 243, 243, 1);
    height: 100%;
    position: absolute;
    width: 100%;
}

.infoUpdate {
    background-color: #FFF;
    height: 100%;
    padding: 10px;
}

.tips {
    height: 40px;
    color: #7B7B7B;
    font-size: 14px;
    line-height: 40px;
    text-indent: 2em;
}

.submit {
    width: 100%;
    height: 80px;
    background-color: #FFF;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
        width: 80%;
    }
}
</style>