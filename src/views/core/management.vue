<template>
    <div class="my_app">
        <div>
            <van-nav-bar title="管理中心" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
                <div class="nav_right_flex" slot="right">
                    <div class="nav_right_item">
                        <div class="right_img">
                            <div class="right_img_icon">
                                <van-icon name="success" color="#FFFFFF" size="10" class="icon_img" />
                            </div>
                        </div>
                    </div>
                    <div class="nav_right_item">
                        <img src="@/assets/head_more_ico_wh.53485aa.png" width="15px" height="15px" />
                    </div>
                </div>
            </van-nav-bar>
            <div class="content">
                <div class="large_content">
                    <div class="businessCard" v-if="isLogin">
                        <div><img src="../../assets/empty_logo.jpg" class="businessCard_img" /></div>

                        <div class="contents">
                            <div class="corporateName">{{ userInfo.comapany_name }}</div>
                            <div class="content_legal">
                                <div>{{ userInfo.contact_name }}&nbsp;|&nbsp;</div>
                                <div>{{ userInfo.contact_post }}</div>
                            </div>
                            <div class="wxcation" v-show="userInfo.isBind">
                                <img src="@/assets/wx_auth_ico.a309a2e.svg" class="imgwx" />
                                <div class="Wechatcation">微信已认证</div>
                            </div>
                            <div class="wxcations" v-show="!userInfo.isBind" @click="UnauthorizedClick">
                                <img src="@/assets/微信.png" class="imgwxno" />
                                <div class="Wechatcation">微信未认证</div>
                            </div>
                        </div>
                    </div>
                    <div class="businessCards" v-if="!isLogin">
                        <div><img src="../../assets/empty_logo.jpg" class="businessCard_img" /></div>
                        <div style="margin-left: 10px;" @click="registerClick('authorization')">
                            <div class="register">点击登录/注册></div>
                            <div class="service">登录后享受更多服务</div>
                        </div>
                    </div>
                </div>
                <div class="box_4">
                    <div class="item" @click="itemTo('purchaseRelease')">
                        <div class="ico ic6"></div>
                        <div class="txt">我要采购</div>
                    </div>
                    <div class="item" @click="processingClick">
                        <div class="ico ic2"></div>
                        <div class="txt">外发加工</div>
                    </div>
                    <div class="item" @click="afterSalesgClick('complaint')">
                        <div class="ico ic3"></div>
                        <div class="txt">售后投诉</div>
                    </div>
                    <div class="item">
                        <div class="ico ic4" @click="equipmentClick('equipment')"></div>
                        <div class="txt">我的设备</div>
                    </div>
                    <div class="item" @click="secondhandClick">
                        <div class="ico ic1"></div>
                        <div class="txt">二手市场</div>
                    </div>
                </div>
                <div class="notice">
                    <div class="bghr"> </div>
                    <van-cell is-link title="基础用法">
                        <div slot="title" class="cell-flex">
                            <div class="tag"> 通知 </div>
                            <div class="context" v-if="!hasMessage">{{ oneSystemTip.content }}
                            </div>
                        </div>
                    </van-cell>
                    <div class="bghr"> </div>
                </div>
                <div class="setting-List">
                    <van-cell is-link title="基础用法">
                        <!-- <div slot="title" class="cell-flex" @click="queryClick('querySales')">
                            <div class="icon">
                                <img src="@/assets/u82.png" />
                                <van-icon class="iconFont" name="chat-o" />
                            </div>
                            <div class="title"> 查询企业售后 </div>
                        </div> -->
                        <div slot="title" class="cell-flex" @click="queryClick('querySales')">
                            <div class="icon">
                                <img src="@/assets/u82.png" />
                            </div>
                            <div class="title"> 我是供应商 </div>
                        </div>
                    </van-cell>
                    <van-cell is-link title="基础用法">
                        <div slot="title" class="cell-flex" @click="complaintSquareClick('complaintSquare')">
                            <div class="icon">
                                <img src="@/assets/u76.png" />
                                <!-- <van-icon class="iconFont" name="chat-o" /> -->
                            </div>
                            <div class="title"> 投诉广场 </div>
                        </div>

                    </van-cell>
                    <van-cell is-link title="基础用法">
                        <div slot="title" class="cell-flex" @click="addClick('addEquipment')">
                            <div class="icon">
                                <img src="@/assets/u62.png" />
                                <!-- <van-icon class="iconFont" name="chat-o" /> -->
                            </div>
                            <div class="title"> 新增设备 </div>
                        </div>

                    </van-cell>
                    <van-cell is-link title="基础用法">
                        <div slot="title" class="cell-flex" @click="informationClick('information')">
                            <div class="icon">
                                <img src="@/assets/u38.png" />
                                <!-- <van-icon class="iconFont" name="chat-o" /> -->
                            </div>
                            <div class="title"> 企业管理 </div>
                        </div>

                    </van-cell>
                    <van-cell is-link title="基础用法">
                        <div slot="title" class="cell-flex" @click="serviceAssessClick('serviceAssess')">
                            <div class="icon">
                                <img src="@/assets/u79.png" />
                                <!-- <van-icon class="iconFont" name="chat-o" /> -->
                            </div>
                            <div class="title">售后管理</div>
                        </div>

                    </van-cell>
                    <van-cell is-link title="基础用法">
                        <div slot="title" class="cell-flex" @click="managementaccountClick('managementaccount')">
                            <div class="icon">
                                <img src="@/assets/u43.png" />
                            </div>
                            <div class="title"> 账号管理 </div>
                        </div>

                    </van-cell>
                </div>
                <van-dialog v-model="wxShow" title="微信认证" show-confirm-button>
                    <div class="wx_dialog">
                        <div class="desc"> 长按图片识别二维码关注公众号完成绑定 </div>
                        <div class="codeImg">
                            <van-image width="100" height="100" :src="shxBdImg" />
                        </div>
                        <div class="txt">
                            微绑定后即可随时随地接收最新消息通知，还可使用微信快速登录网站
                        </div>
                    </div>
                </van-dialog>
            </div>

        </div>

    </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState } from 'vuex'
import { mapMutations } from 'vuex';
import { hasLogin, getSystemTip } from '@/api/user'
export default {
    components: {
    },

    computed: {
        ...mapState(['userInfo'])
    },
    created() {
        // 持久化
        let userInfo = JSON.parse(localStorage.getItem("userInfo")) || "";
        // 如果用户已经登录
        if (userInfo.token) {
            this.SET_USERINFO(userInfo);
        }
        this.hasList();
        document.title = "售后侠"
        this.getSystemList();
    },
    data() {
        return {
            show: true,
            imgIcon: require("@/assets/head_user_ico.png"),
            wxShow: false,
            shxBdImg: require("@/assets/shx.jpg"),
            isLogin: false,
            oneSystemTip: {},
            hasMessage: false,
        }
    },
    methods: {
        getSystemList() {
            getSystemTip({
                uid: 24,
                page: 1,
                pagesize: 25,
            }).then(res => {
                if (res.data.code == 200) {
                    this.oneSystemTip = res.data.data.oneSystemTip
                }
                console.log(this.oneSystemTip, "ddd")
            })
        },
        ...mapMutations(['SET_USERINFO']),
        // 跳转逻辑处理
        itemTo(text) {
            if (text == "purchaseRelease") {
                this.$router.push({ name: "purchaseRelease" })
            }
        },
        onClickLeft() {
            // alert(123123123)

        },
        onClickRight() { },
        processingClick() {
            if (this.isLogin) {
                this.$notify('该功能正在开发中，敬请期待......');
            } else {
                this.$router.push({ name: 'authorization' })
            }

        },
        //二手市场
        secondhandClick() {
            this.$router.push({ name: "secondhand" })
        },
        //售后投诉跳转
        afterSalesgClick(text) {
            if (this.isLogin) {
                if (text == "complaint") {
                    this.$router.push({ name: "complaint" })
                }
            } else {
                this.$router.push({ name: 'authorization' })
            }
        },
        //我的设备跳转逻辑
        equipmentClick(text) {
            if (this.isLogin) {
                if (text == "equipment") {
                    this.$router.push({ name: "equipment" })
                }
            } else {
                this.$router.push({ name: 'authorization' })
            }
        },
        //查询企业售后
        queryClick(text) {
            // if (text == "querySales") {
            //     this.$router.push({ name: "querySales" })
            // }
            window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg3MzcxODMwMQ==&scene=117#wechat_redirect'
            // window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg3MzcxODMwMQ==&scene=117#wechat_redirect'
        },
        //投诉广场
        complaintSquareClick(text) {
            if (text == "complaintSquare") {
                this.$router.push({ name: "complaintSquare" })
            }
        },
        //账号管理
        managementaccountClick(text) {
            if (this.isLogin) {
                if (text == "managementaccount") {
                    this.$router.push({ name: "managementaccount" })
                }
            } else {
                this.$router.push({ name: 'authorization' })
            }
        },
        addClick(text) {
            if (this.isLogin) {
                if (text == "addEquipment") {
                    this.$router.push({ name: "addEquipment" })
                }
            } else {
                this.$router.push({ name: 'authorization' })
            }
        },
        informationClick(text) {
            if (this.isLogin) {
                if (text == "information") {
                    this.$router.push({ name: "information" })
                }
            } else {
                this.$router.push({ name: 'authorization' })
            }
        },
        serviceAssessClick(text) {
            if (this.isLogin) {
                if (text == "serviceAssess") {
                    this.$router.push({ name: 'serviceAssess' })
                }
            } else {
                this.$router.push({ name: 'authorization' })
            }
        },
        UnauthorizedClick() {
            this.wxShow = true;
            console.log(111);
        },
        registerClick(data) {
            // alert(1)
            // this.$router.push({ path: '/core/informationDetails', query: { id: data.id } })
            this.$router.push({ name: 'authorization', query: { id: 422 }  })
        },
        hasList() {
            hasLogin({}).then(res => {
                // console.log(res);
                this.isLogin = res.data.data.isLogin
                // console.log(this.isLogin, 'this.isLogin');
            })
        }

    }
};
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

.my_app {
    background-color: rgb(243, 243, 243);
}

.nav_right_flex {
    display: flex;

    .nav_right_item {
        margin-left: 10px
    }
}

::v-deep .van-nav-bar__right {
    font-size: 20px;
    cursor: pointer;
}

.icon_img {
    top: 1px;
    left: 1px;
}

.right_img {
    width: 20px;
    height: 20px;
    background: url("@/assets/head_user_ico.png") no-repeat;
    background-size: 18px 18px;
    position: relative;

    .right_img_icon {
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: #007aff;
        border-radius: 50%;
        right: -1px;
        bottom: -1px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

}


.content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 750px;

    .bghr {
        background-color: rgb(243, 243, 243);
        height: 5px;
    }
}

.box_4 {
    display: flex;
    width: 100%;
    background-color: #ffffff;
    padding-bottom: 17.5px;
    margin-top: 20px;

    .item {
        .txt {
            font-size: 12px;
            color: #292b32;
        }

        .ico {
            &.ic6 {
                background: url("../../assets/purchase.png") center 0 no-repeat;
                background-size: 40px;
            }

            &.ic4 {
                background: url("../../assets/machining.png") 0 no-repeat;
                background-size: 40px;
            }

            &.ic3 {
                background: url("../../assets/complaint.png") 0 no-repeat;
                background-size: 40px;
            }

            &.ic2 {
                background: url("../../assets/equipment.png") 0 no-repeat;
                background-size: 40px;
            }

            &.ic1 {
                background: url("../../assets/monitor.png") 0 no-repeat;
                background-size: 40px;
            }

            display: inline-block;
            width: 40px;
            height: 40px;
        }

        flex: 1;
        text-align: center;
    }
}

.setting-List {
    .cell-flex {
        display: flex;
        align-items: center;

        .icon {
            margin-right: 20px;

            .iconFont {
                font-size: 22px;
            }
        }

        .title {
            font-size: 16px;
            color: #707070;
        }
    }
}

::v-deep .van-cell::after :last-child {
    border-bottom: 1px solid #ebedf0;
}

.notice {
    margin: 5px 0;

    .cell-flex {
        display: flex;
        align-items: center;

        .tag {
            margin-right: 10px;
            background-color: rgba(255, 245, 232, 1);
            border: 1px solid rgba(255, 104, 39, 1);
            border-radius: 30px;
            padding: 1px 10px;
            color: #FF6827;
        }

        .context {
            font-size: 14px;
            color: #4f4f4f;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
    }
}

::v-deep .van-hairline--bottom::after {
    border-bottom-width: 0px;
}

::v-deep .van-nav-bar__content {
    background: rgba(0, 0, 0, 0);
}

::v-deep .van-nav-bar .van-icon {
    color: #ADD4FD;
    font-size: 22px;
}

::v-deep .van-nav-bar__title {
    font-size: 20px;
    font-weight: bold;
    color: #FFFF;
    letter-spacing: 1px;
}

::v-deep .van-nav-bar {
    background: rgba(0, 0, 0, 0);
}

.large_content {
    background: #FFFFFF;
    height: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    background-image: url('@/assets/bg.png');
    background-size: 100% 100%;
}

.businessCard {
    width: 350px;
    height: 130px;
    margin: 20px auto;
    display: flex;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 0 10px #ebebeb;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    position: absolute;
    top: 50px;
}

.businessCards {
    width: 350px;
    height: 130px;
    margin: 20px auto;
    display: flex;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 0 10px #ebebeb;
    align-items: center;
    justify-content: flex-start;
    background: #FFFFFF;
    position: absolute;
    top: 50px;
}

.register {
    font-size: 18px;
    letter-spacing: 3px;
    color: #333333;
    margin-top: -10px;
}

.service {
    font-size: 14px;
    letter-spacing: 2px;
    color: #808080;
    margin-top: 10px;
}

.businessCard_img {
    margin-left: 10px;
    width: 68px;
    height: 68px;
}

.contents {
    width: 300px;
    margin-left: -15px;
    margin-top: 15px;
}

.content_legal {
    display: flex;
    align-items: center;
    height: 25px;
    margin-left: 25px;
    font-size: 12px;
    // margin-top: 5px;

    p {
        padding: 10px;
        height: 6px;
        line-height: 6px;
    }
}

.wxcation {
    align-items: center;
    margin-top: 2px;
    margin-left: -60px;
    flex-direction: column;
}

.wxcations {
    align-items: center;
    margin-top: 0px;
    margin-left: -20px;
    flex-direction: column;
}

.corporateName {
    font-size: 17px;
    color: #333333;
    font-weight: bold;
    overflow: hidden;
    margin-left: 20px;
    margin-top: -30px;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.imgwx {
    width: 15px;
    height: 15px;
    margin-left: -170px;
}

.imgwxno {
    width: 20px;
    height: 20px;
    margin-left: -168px;
}

.Wechatcation {
    font-size: 12px;
    margin-left: -85px;
    margin-top: -21px;
    color: #6F6F6F;

}

.buttonFunction {
    border-top: 1px solid #F3F3F3;
    height: 100px;
    margin-top: 10px;
    background-color: #FFF;
}

.functionImg {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
}

.functionWords {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 8px;
}

.icon>img {
    width: 20px;
    height: 20px;
}

::v-deep .van-notify {
    font-size: 17px;
    letter-spacing: 1px;
    color: #FFFFFF;
}
</style>    