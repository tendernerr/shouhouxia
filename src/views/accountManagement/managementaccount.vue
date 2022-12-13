<template>
    <div class="appContent">
        <div class="top">
            <van-nav-bar title="账号管理" left-arrow @click-left="onClickLeft">
                <div class="nav_right_flex" slot="right">
                    <div class="nav_purchase"  @click="imgClick">
                        <img src="@/assets/u56.png" />
                    </div>
                </div>
            </van-nav-bar>
            <div>
                <div>
                    <van-cell title="修改账号" is-link @click="updateTo('user')">
                        <div slot="default">
                            {{ this.$store.state.userInfo.name }}
                        </div>
                    </van-cell>
                </div>
                <div class="mentaccount_password">
                    <van-cell title="修改密码" is-link @click="updateTo('pass')"> </van-cell>
                </div>
                <!-- <div></div> -->

            </div>
        </div>
        <div class="bottom">
            <div>
                <van-cell title="手机认证" is-link @click="updateTo('phoneAuth')">
                    <div slot="default">
                        {{userInfo.phone}}
                    </div>
                </van-cell>
            </div>
            <div class="tips">
                第三方账号绑定后可以使用绑定的账号快速登录
            </div>
            <div class="wxAuth">
                <!-- 如果vuex内保存的 绑定状态为false的话 就是没绑定微信 -->
                <van-cell title="微信" is-link @click="wxAuth" v-if="!userInfo.isBind">
                    <div slot="default">
                        未绑定
                    </div>
                </van-cell>
                <!-- 绑定了 -->
                <van-cell title="微信" is-link @click="unWxAuth" v-if="userInfo.isBind">
                    <div slot="default">
                        解除绑定
                    </div>
                </van-cell>
            </div>
            <div class="systemMessage">
                <van-cell title="系统消息" is-link @click="updateTo('systemInfo')">
                </van-cell>
            </div>
            <div class="loginLog">
                <van-cell title="登录日志" is-link @click="updateTo('loginLog')">
                </van-cell>
            </div>
            <div class="feedback">
                <van-cell title="建议反馈" is-link @click="updateTo('feedback')">
                </van-cell>
            </div>
        </div>
        <div class="loginOut">
            <van-button type="info" round class="btn" @click="loginExit">退出登录</van-button>
            

        </div>
        <!-- 绑定微信 -->
        <van-dialog v-model="wxShow" title="微信认证" show-confirm-button>
            <div class="wx_dialog">
                <!-- <div class="title"> 微信认证 </div> -->
                <div class="desc"> 长按图片识别二维码关注公众号完成绑定 </div>
                <div class="codeImg">
                    <van-image width="100" height="100" :src="shxBdImg" />
                </div>
                <div class="txt">
                    微绑定后即可随时随地接收最新消息通知，还可使用微信快速登录网站
                </div>
            </div>
        </van-dialog>
        <!-- 解除绑定 -->
        <van-dialog v-model="unWxShow" title="系统提示" @confirm="unWxBind" show-cancel-button>
            <div class="wx_dialog">
               <div>解绑后无法使用微信快速登录网站，是否确定解绑？</div>
            </div>
        </van-dialog>
    </div>
</template>

<script>
    import { unBindWeixin } from '@/api/user'
import { mapMutations,mapState } from 'vuex';
import { Notify } from 'vant'
import { Dialog } from 'vant';
export default {
    data() {
        return {
            shxBdImg:require("@/assets/shx.jpg"),
            default: "u15271650939",
            wxShow: false,
            unWxShow:false,
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created() {
        console.log("登录后的用户数据", this.$store.state.userInfo);
    },
    methods: {
        ...mapMutations(["LoginOut"]),
        loginExit() {
            Dialog.confirm({
                title: '是否退出登录',
                message: '此操作将会清空该设备保存的数据',
            }).then(() => {
                    this.LoginOut();
                    console.log(222);
                    Notify({ type: 'success', message: `退出成功` })
                    this.$router.push({ name: 'management' })

                    this.getloginOut();

                    // on confirm
                })
                .catch(() => {
                    // on cancel
                    
                });
        },
        // 微信解绑点击事件
        unWxBind(){
            unBindWeixin({}).then(res=>{
                console.log(res);
                if(res.data.code==200){
                    Notify({ type: 'success', message: `解绑成功` })
                    this.userInfo.isBind =false;
                    localStorage.setItem("userInfo",JSON.stringify({...this.userInfo,isBind:false}) );
                }else{
                    Notify({ type: 'danger', message: res.data.message })
                }
            })
        },
        // 微信解绑toggle（打开和关闭的切换的意思）
        unWxAuth(){
            // unWxShow 默认为false 如果是false 点击 他就会变成true 如果是true 点击就会变false 这样就会有展开和关闭的效果
            this.unWxShow = !this.unWxShow;
        },
        // 微信绑定toggle
        wxAuth() {
            this.wxShow = !this.wxShow
        },
        // 修改的跳转
        updateTo(to) {
            // 跳转到修改账号
            if (to == 'user') {
                this.$router.push({ path: "/managementaccount/userNameUpdate" })
            }
            // 跳转到修改密码
            if (to == 'pass') {
                this.$router.push({ path: "/managementaccount/passWrodUpdate" })
            }
            // 跳转到手机认证
            if (to == "phoneAuth") {
                this.$router.push({ path: "/managementaccount/phoneAuth" })
            }
            // 跳转到系统消息
            if (to == "systemInfo") {
                this.$router.push({ path: "/managementaccount/systemInfo" })
            }
            // 跳转到登录日志
            if (to == "loginLog") {
                this.$router.push({ path: "/managementaccount/loginLog" })
            }
            // 跳转到建议反馈
            if (to == "feedback") {
                this.$router.push({ path: "/managementaccount/feedback" })
            }
        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/core/management')
        },
        getloginOut(){
            loginOut({}).then(res=>{
                console.log(res,"微信授权退出");
            })
        },
        imgClick(){
            if(this.hashLogin){
                // 如果登录
                this.$router.push("/core/management");
            }else{
                // 登录失败
                this.$router.push({
                    name:"account"
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wx_dialog {
    padding: 0 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .title {
        text-align: center;
    }

    .desc {
        color: #FF6600;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
    }

    .codeImg {
        text-align: center;
    }

    .txt {
        text-align: center;
        color: #6E6E6E;
        line-height: 20px;
        font-size: 12px;
        justify-content: center;
    }
}

.appContent {
    background-color: rgba(243, 243, 243, 1);
    height: 100%;
    position: absolute;
    width: 100%;
}

.loginOut {
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


.bottom {
    margin-top: 10px;

    .tips {
        height: 40px;
        color: #7B7B7B;
        font-size: 14px;
        line-height: 40px;
        text-indent: 2em;
    }

    .wxAuth {
        margin-bottom: 10px;
    }
}

::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-weight: bold;
}

::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}

.mentaccount_password {}
</style>