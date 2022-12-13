<template>
    <div>
        <van-nav-bar left-arrow @click-left="onClickLeft" left-text="返回企业详情">
            <div class="nav_right_flex" slot="right">
                <div class="nav_right_item">
                    <div class="right_img">
                        <div class="right_img_icon">
                            <!-- <van-icon name="success" color="#FFFFFF" size="10" class="icon_img"/> -->
                        </div>
                    </div>
                </div>
            </div>
        </van-nav-bar>
        <div>
            <div class="supervisionMechanism"> 售后俠售后监督机制：</div>
            <div>
              <div class="buy_pment"> "<span style="color: #FF8E50;">售后侠</span>"是国内领先的第三方售后监督服务平台，为广大设备采购方免费提供售后监督服务；</div>
              <div class="buy_Equipment">买设备，找“售后俠”查询企业售后服务评分；“售后俠”提醒您：<span class="buy_span">请选择售后评分高的厂家；</span></div>
             <div style="margin-left: 20px;margin-top: 50px;">
                <div class="evaluate">企业售后评分规格：</div>
                <div class="specifications">
                    <div>1.是否为设备采购方创建电子售后表单（为采购方创建售后表单，表示设备供应商接受售后俠的监督）；</div>
                    <div>2.是否告知设备采购方可以通过第三方售后平台“售后俠”进行售后评分；</div>
                    <div>3.是否为采购方提供电子版设备使用说明、设备保养提醒及文件、耗材更换提醒及文件；</div>
                    <div>4.是否有对采购方进行设备保养提醒、耗材更换提醒等回访服务；</div>
                    <div>5.是否有按合同要求及时上门进行售后服务；</div>
                    <div>6.是否有让现场人员对上门售后服务做满意度打分；</div>
                    <div>7.是否积极回应或处理客户的投诉问题。</div>
                </div>
             </div>
            </div> 
            
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {

        }
    },
    created(){
        console.log(this.$route);
    },
    methods: {
        onClickLeft() {
            this.$router.push({path:'/core/informationDetails',query:{id:this.$route.query.comid}})
        }
    }
}
</script>

<style lang="scss" scoped>
.supervisionMechanism {
    font-family: '微软雅黑 Bold', '微软雅黑', sans-serif;
    font-weight: 700;
    letter-spacing: 3px;
    color: #060606;
    font-size: 14px;
    margin-left: 20px;
    margin-top: 20px;
}

::v-deeep .van-nav-bar__left {
    padding: none;
    background-color: red;
}

::v-deep .van-nav-bar .van-icon {
    color: #6A6A6A;
    font-size: 22px;
    margin-left: -15px;
}

::v-deep .van-nav-bar__text {
    color: #6A6A6A;
}
.evaluate{
    font-family: '微软雅黑 Bold', '微软雅黑', sans-serif;
    font-weight: 700;
    letter-spacing: 3px;
    font-size: 14px;
}
.specifications{
    font-size: 14px;
    font-family: '微软雅黑', sans-serif;
    font-weight: 400;
    letter-spacing: 2px;
    color: #6A6A6A;
    line-height: 25px;
    margin-top: 8px;

}
.buy_Equipment{
    font-family: '微软雅黑', sans-serif;
    font-weight: 400;
    letter-spacing: 2px;
    line-height: 25px;
    color: #333333;
    font-size: 14px;
    margin-left: 20px;
    margin-top: 10px;
}
.buy_span{
    font-family: '微软雅黑', sans-serif;
    font-weight: 400;
    letter-spacing: 2px;
    color: #FF8E50;
}
.buy_pment{
    font-size: 13px;
    font-family: '微软雅黑', sans-serif;
    font-weight: 400;
    letter-spacing: 2px;
    margin-left: 20px;
    margin-top: 10px;
}
</style>