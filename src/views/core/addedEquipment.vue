<template>
    <div>
        <van-nav-bar title="新增设备" left-arrow @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <!-- <div class="nav_right_item" @click="navClik">
                    <img src="../../assets/u112.png" width="26px" height="26px" />
                </div> -->
            </div>
        </van-nav-bar>
        <div>
            <div class="content">
                亲爱的供应商，为了贵公司生产的设备能更好的服务于我方生产作业，最大程度降低因设备故障给双方带来的经济损失，我们要求您入驻到互联网云售后平台——“售后侠”，为我方提供云售后服务！
            </div>
            <div class="contentName" v-for="item in getuse">{{item.comapany_name}}</div>
            <div class="afterTitle">- - 为什么选择售后侠 - -</div>
            <div class="add_Equipment">
                <div class="left">
                    <div class="leftDiv">
                        <img src="../../assets/u103.png" />

                    </div>
                    <div class="rightName">售后文档在线查阅</div>
                    <div class="rightinstructions">
                        设备使用说明书、设备维保详细内容、设备故障排查说明；

                    </div>
                    <div class="rightinstructions">售后服务贴心化：<div style="color: #409EFF;">13549851</div>
                    </div>
                </div>
                <div class="right">
                    <div class="rightDiv">
                        <img src="../../assets/u107.png" />

                    </div>
                    <div class="rightName">售后通知及时化</div>
                    <div class="rightinstructions">
                        通过公众号、手机短信、智能秘书电话等方式及时通知到供求双方，避免出现大的机器故障，最终导致设备停机！
                    </div>
                </div>
            </div>
            <div style="display: flex;justify-content: center;margin-top: 50px;padding: 0px 0px 40px 0px;">
                <div class="officialAccount">
                    <div class="official" @click="officialClick">点击进入行业大牛公众号</div>
                </div>
            </div>
        </div>
        <van-overlay :show="show" @click="show = false">
            <!-- <div class="imglys">
                <img src="../../assets/u112.png" class="imgly" />
            </div> -->
            <img src="../../assets/u114.png" class="imgovr" />
            <div class="overlay">去邀请设备供应商入驻售后侠，接受平台的售后监督吧！</div>
        </van-overlay>
    </div>
</template>

<script>
import { getUser } from '@/api/user'
export default {
    data() {
        return {
            show: false,
            getuse:[],
        }
    },
    created() {
        this.show = true
        this.getuserList();
    },
    methods: {
        getuserList(){
            getUser({}).then(res=>{
                    console.log(res);
                    this.getuse=res.data
                })
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        imgesClick() {

        },
        navClik(){
            // this.$router.push('/core/addedEquipment')
        },
        officialClick() {
            window.location.href = 'https://www.hangyedaniu.com/m/member/login'
        }

    }
}
</script>

<style lang="scss" scoped>
.imglys {
    border-width: 0px;
    position: absolute;
    left: 325px;
    top: 0px;
    width: 60px;
    height: 60px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border: none;
    border-radius: 50px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    display: flex;
    box-shadow: none;
    align-items: center;
    justify-content: center;
}

.imgly {
    width: 35px;
    height: 35px;
}

.overlay {
    font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    letter-spacing: 3px;
    color: rgb(255, 255, 255);
    line-height: 40px;
    padding: 70px 30px 0px 30px;

}

.imgovr {
    width: 50.57px;
    height: 50.57px;
    transform: rotate(35deg);
    position: relative;
    left: 290px;
    top: 63px;
}

.official {
    font-size: 16px;
    letter-spacing: 1px;
    color: #FFFFFF;
}

.officialAccount {
    border-width: 0px;
    width: 255px;
    height: 46px;
    background: inherit;
    background-color: rgb(22, 155, 213);
    border: none;
    border-radius: 20px;
    box-shadow: none;
    font-size: 16px;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.rightinstructions {
    font-size: 10px;
    letter-spacing: 1px;
    line-height: 25px;
    color: #757575;
}

.rightName {
    font-size: 12px;
    letter-spacing: 2px;
    color: #409EFF;
    text-align: center;
}

.rightDiv {
    display: flex;
    justify-content: center;
    padding: 15px 0px 15px 0px;
}

.leftDiv {
    display: flex;
    justify-content: center;
    padding: 15px 0px 15px 0px;
}

.right {
    width: 156px;
    height: 183px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(233, 248, 255, 1);
    border-radius: 0px;
    -moz-box-shadow: 5px 5px 5px rgba(233, 248, 255, 1);
    -webkit-box-shadow: 5px 5px 5px rgb(233 248 255);
    box-shadow: 5px 5px 5px rgb(233 248 255);

    img {
        border-width: 0px;
        width: 25px;
        height: 25px;
        background: inherit;
        background-color: rgba(64, 158, 255, 1);
        border: none;
        border-radius: 5px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
}

.left {
    width: 156px;
    height: 183px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(233, 248, 255, 1);
    border-radius: 0px;
    -moz-box-shadow: 5px 5px 5px rgba(233, 248, 255, 1);
    -webkit-box-shadow: 5px 5px 5px rgb(233 248 255);
    box-shadow: 5px 5px 5px rgb(233 248 255);

    img {
        border-width: 0px;
        width: 25px;
        height: 25px;
        background: inherit;
        background-color: rgba(64, 158, 255, 1);
        border: none;
        border-radius: 5px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
}

.add_Equipment {
    display: flex;
    padding: 20px 10px 0px 10px;
    justify-content: space-around;
}

.afterTitle {
    font-family: "Arial Normal", "Arial", sans-serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 1px;
    color: #409EFF;
    text-align: center;
    font-size: 20px;
    margin-top: 30px;
}

.contentName {
    letter-spacing: 1px;
    font-size: 14px;
    line-height: 23px;
    color: #878787;
    display: flex;
    justify-content: flex-end;
    padding: 5px 20px 0px 30px;
}

.content {
    font-size: 13px;
    color: #6A6A6A;
    letter-spacing: 1px;
    line-height: 25px;
    padding: 20px 15px 0px 30px;
}

::v-deep .van-icon {
    color: #6A6A6A;
    font-size: 25px;
}

::v-deep .van-nav-bar__text {
    color: #353535;
}

::v-deep .van-nav-bar__title {
    font-size: 18px;
}
</style>