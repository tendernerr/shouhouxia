<template>
    <div>
        <div class="select"> 售后侠 为生产保驾护航</div>
        <div class="thirdparty">- -第三方售后监督平台 保障企业利益 护航企业生产- -</div>
        <div class="contentMiddle">
            <div class="authorization" @click="wxgetMobileCode">微信授权快速登录</div>
            <div class="account" @click="accountClick">账号密码登录</div>
        </div>
        <div style="margin-top: 30px;">
            <img src="@/assets/1.png"/>
        </div>
        <!-- <div class="register" @click="registerClick">新用户注册申请</div> -->

        <!-- dialog -->
        <van-dialog v-model="isFlagShow" title="请输入手机号" show-cancel-button @confirm="dialogSubmit">
            <div class="phoneInput">
                <van-cell-group>
                    <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
                    <van-field v-model="phoneCode" center clearable label="短信验证码" placeholder="请输入短信验证码">
                        <template #button>
                            <van-button size="small" type="primary" @click="verificationCode">{{ confirmContent }}
                            </van-button>
                        </template>
                    </van-field>
                </van-cell-group>
            </div>
        </van-dialog>
    </div>
</template>

<script>
import { wxLogin, wxGetUserInfo, wxBd, getWeixinConfig, phoneCodeGet } from '@/api/user';
import { Notify } from 'vant'
// import { mapMutations } from 'vuex';
// import request  from 'request';
export default {
    data() {
        return {
            confirmContent: "发送验证码", //倒计时之后按钮提示文字
            totalTime: 60, //倒计时30s
            phone: "",
            phoneCode: "", // 验证码
            isFlagShow: false,
            // appid:"wxd8a3674cc5c0fbbf"
            appid: "",
            app_secret: "",
            userObj: {}
        }
    },
    created() {
        if (this.$route.query.code) {
            console.log(this.$route.query.code);
            wxGetUserInfo({ code: this.$route.query.code }).then(res => {
                // 临时微信授权登录存个数据
                let userObj = res.data.data;
                this.userObj = res.data.data;

                // 如果已经绑定手机号
                // if (userObj.isBind) {
                if (userObj.isBind) {
                    if (userObj.userInfo) {
                        Notify({ type: 'success', message: `绑定微信成功` })
                        localStorage.setItem("userInfo", JSON.stringify({
                            ...userObj.userInfo,
                            isBind: userObj.isBind,
                        }))
                        localStorage.setItem("token", userObj.userInfo.token)
                        this.$router.push('/core/management')
                    } else {
                        this.wxbd(userObj);
                    }
                } else {
                    this.isFlagShow = true
                }
            })
        } else {
            let userInfo = JSON.parse(localStorage.getItem("userInfo")) || "";
            // 如果用户已经登录
            if (userInfo.token) {
                this.$router.push('/core/management')
            }
        }
    },
    methods: {
        // 倒计时
        verificationCode() {
            if (this.phone != "") {
                phoneCodeGet({
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
                        Notify({ type: 'danger', message: `验证码发送失败,联系管理员` })
                    }
                })

            } else {
                Notify({ type: 'danger', message: `请先输入手机号` })
            }
        },
        dialogSubmit() {
            if (this.phone == "") {
                Notify({ type: 'danger', message: `手机号不能为空！` })
            } else if (this.phoneCode == "") {
                Notify({ type: 'danger', message: `验证码不能为空！` })
            }
            else {
                this.wxbd(this.userObj)
            }
        },
        wxbd(userObj) {
            wxBd({
                phone: this.phone || "",
                openid: userObj.openid,
                unionid: userObj.unionid,
                nickname: userObj.nickname,
                avatar: userObj.avatar,
                code: this.phoneCode
            }).then(res => {
                if (res.data.code == 200) {
                    let userObj = res.data.data
                    Notify({ type: 'success', message: `绑定微信成功` })
                    localStorage.setItem("userInfo", JSON.stringify({
                        ...userObj 
                    }))
                    localStorage.setItem("token", userObj.token)
                    this.$router.push('/core/management')
                } else {
                    if (res.data.message == "该用户暂未注册，请先注册在登陆！") {
                        this.$router.push({ name: "userApplication" })
                    } else {
                        Notify({ type: 'danger', message: `${res.data.message}` })
                    }
                }
            })
        },
        //  ...mapMutations(['SET_USERINFO']),
        // 微信登录
        wxgetMobileCode() {
            getWeixinConfig({}).then(res => {
                console.log(res,"ddd")
                if (res.data.code == 200) {
                    this.appid = res.data.data.appid
                    console.log(this.appid,"11111")
                    this.app_secret = res.data.data.app_secret
                    console.log(this.app_secret,"222")
                    let redirect_uri = encodeURI(window.location.protocol + "//" + window.location.host + "" + window.location.pathname);
                    console.log(redirect_uri);
                    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                }
            })
            // let appid = "wx361c20ed19ecbfef";
            // let redirect_uri = encodeURI(location.href)
            // let app_secret = '851c9ba325c8b2aa699e82d1b318fdf4'

            // console.log(redirect_uri);
            // location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

            //  let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=https%3A%2F%2Fwww.hangyedaniu.com%2Fm%2Findex%2Findex&response_type=code&scope=snsapi_userinfo&state=oauth#wechat_redirect';
            // let url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid+"&secret="+app_secret+"&code="+redirect_uri+"&grant_type=authorization_code";
            // let url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $app_id . '&secret=' . $app_secret . '&code=' . $code . '&grant_type=authorization_code"
            // let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=https%3A%2F%2Fwww.hangyedaniu.com%2Fm%2Findex%2Findex&response_type=code&scope=snsapi_userinfo&state=oauth#wechat_redirect'
            // window.location.href = url
            // wxTo({url:"https://www.hangyedaniu.com/v1_0/sales/index/getUserInfo"}).then(res=>{
            //     alert(res);
            // })
        },
        wxLogin() {
            this.wxgetMobileCode();
            // wxLogin({
            //     username: 111,
            //     password: 222
            // }).then(res => {
            //     console.log(res);
            // })
        },
        accountClick() {
            this.$router.push("/login/account");
        },
        registerClick() {
            this.$router.push({ path: "userApplication" });
        }
    }
};
</script>

<style lang="scss" scoped>
.thirdparty {
    display: flex;
    justify-content: center;
    letter-spacing: 2px;
    font-size: 13px;
    margin-top: 20px;
}

.select {
    font-family: '微软雅黑 Bold', '微软雅黑', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 19px;
    letter-spacing: 2px;
    color: #606060;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.contentMiddle {
    width: 100%;
    margin-top: 30px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.authorization {
    width: 70%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 21px;
    background: #00B82E;
}

.account {
    width: 70%;
    margin-top: 10px;
    text-align: center;
    line-height: 40px;
    border-radius: 21px;
    background: #DADADA;
}

.register {
    margin-top: 30px;
    width: 100%;
    text-align: center;
    color: #409EFF;
    font-size: 14px;
    letter-spacing: 3px;
}
</style>