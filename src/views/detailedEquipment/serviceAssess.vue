<template>
    <div class="appContent">
        <div class="top">
            <van-nav-bar title="售后评价" left-arrow @click-left="onClickLeft">
                <div class="nav_right_flex" slot="right">
                    <div class="nav_purchase">
                        <img src="@/assets/u56.png" />
                    </div>
                </div>
            </van-nav-bar>
            <div>
                <van-notice-bar class="service_noticeBar" :scrollable="false" text="提交售后评价或建议，督促鼓励企业做得更好" />
            </div>
            <div class="means_enterprise">
                <div class="kiy_div">
                    <div class="form_content_item">
                        <div class="tag"><label class="enterpriseTypes"></label></div>
                        <div class="title_label">请选择供应商: </div>
                        <div>
                            <select class="select_Industry">
                                <option v-for="(item,index) in supplierList" style="border-bottom: 0px;margin-top: 5px">
                                    {{item.companyname}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="kiy_divs">
                    <div class="form_content_item">
                        <div class="tag"></div>
                        <div class="title_label">售后人: </div>
                        <div><input placeholder="请输入姓名和工号" class="input_enterprise" /></div>
                    </div>
                </div>
                <div class="kiy_divs">
                    <div class="form_content_item">
                        <div class="tag"><label class="enterpriseTypes"></label></div>
                        <div class="title_label">问题解决情况: </div>
                        <div>
                            <div>
                                <select class="select_Industry">
                                    <option style="border-bottom: 0px;margin-top: 5px" value="已解决">已解决</option>
                                    <option style="border-bottom: 0px;margin-top: 5px" value="未解决">未解决</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="kiy_divs">
                    <div class="form_content_item">
                        <div class="tag"></div>
                        <div class="title_label">售后满意度: </div>
                        <div>
                            <div>
                                <van-radio-group v-model="radio" direction="horizontal" class="radio_Satisfaction" >
                                    <van-radio name="满意">满意</van-radio>
                                    <van-radio name="不满意">不满意</van-radio>
                                </van-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="Assess_Highlight" v-show="radio=='满意'" >
                        <div v-for="(att,index) in attitudeType1" @click="highlightsClick(att)" :class="att.isActive ? 'assess_active':''">{{att.lable}}</div>
                    </div>
                    <div class="Assess_Highlight" v-show="radio=='不满意'" >
                        <div v-for="(att,index) in attitudeType2" @click="highlightsClick(att)" :class="att.isActive ? 'assess_actives':''">{{att.lable}}</div>
                    </div>
                    <div class="form_Repurchase">
                        <div class="tag"></div>
                        <div class="title_Repurchase">近期是否有复购设备计划?</div>
                        <div style="">
                            <van-radio-group v-model="radio" direction="horizontal" class="Repurchase_Satisfaction">
                                <van-radio name="有">有</van-radio>
                                <van-radio name="无">无</van-radio>
                            </van-radio-group>
                        </div>
                    </div>
                    <div class="form_content_items">
                        <div class="tag"></div>
                        <div class="describe">售后原因描述：</div>
                        <div>
                            <textarea class="text_describe" placeholder="请输入您使用设备时遇到的问题"></textarea>
                        </div>
                    </div>
                    <div class="ser_button">
                        <div class="serviceButton">提交</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { selectSupplier, addSaleEvaluate } from '@/api/user'
export default {
    data() {
        return {
            radio: '满意',
            supplierList: [],
            num: 0,
            // 态度满意选项列表
            attitudeType1: [{ lable: '经验丰富', isActive: false }, { lable: '职业素养高', isActive: false }, { lable: '售后贴心', isActive: false }, { lable: '态度良好', isActive: false }, { lable: '速战速决', isActive: false }],
            // 态度不满意选项列表
            attitudeType2: [{ lable: '态度不好', isActive: false }, { lable: '工具不齐', isActive: false }, { lable: '现场未整理', isActive: false }, { lable: '其他', isActive: false }]
        }
    },
    created() {
        this.getselectSupplier();
    },
    methods: {
      
        //路径跳转
        onClickLeft() {
            this.$router.push('/core/management')
        },
        getselectSupplier() {
            let params = {}
            selectSupplier(params).then(res => {
                // console.log(res,"选择供应商");
                this.supplierList = res.data.data;
                // console.log(this.supplierList,"选择供应商");
            })
        },
        getaddSaleEvaluate() {
            let params = {

            }
            addSaleEvaluate(params).then(res => {
                console.log(res);
            })
        },
        highlightsClick(att) {
            // 浅拷贝
            att.isActive =!att.isActive;
            console.log(att);
            this.$forceUpdate();
        }
    }
}
</script>
<style lang="scss" scoped>
    // 样式呢呢自己 我切换写下逻辑
.assess_active {
    color: #3F97FF !important;
    background-color: rgba(233, 248, 255, 1) !important;
}
.assess_actives{
    color: #EA3800 !important;
    background-color: rgba(255, 233, 222, 1) !important;
}
::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}

::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-weight: bold;
}

.service_noticeBar {
    font-size: 12px;
    letter-spacing: 2px;
    color: #FF6600;
}

.means_enterprise {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    background-color: #FFF;
}

.kiy_div {
    width: 100%;
}

.text_describe {
    border-color: rgb(204, 204, 204);
    width: 222px;
    height: 139px;
    margin-top: 4px;
    letter-spacing: 1px;
    color: #CCCCCC;
    font-size: 13px;
    text-align: left;
    padding: 8px;
}

::v-deep .form_Repurchase div {
    display: flex;
    align-items: center;

}

.form_Repurchase {
    display: flex;
    justify-content: left;
    margin-top: 20px;
    // padding: 10px 15px 10px 12px;

    .title_label {
        width: 100px;
        margin-right: 5px;
    }

    .tag {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0px;
        width: 20px;
        padding: 0px 10px 0px 0px;
    }

    option {
        margin-top: 3px;
    }
}

.form_content_items {
    display: flex;
    justify-content: left;
    margin-top: 20px;
    // padding: 10px 15px 10px 12px;

    .title_label {
        width: 100px;
        margin-right: 5px;
    }

    .tag {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0px;
        width: 20px;
        // padding: 0px 10px 0px 0px;
    }


    div {
        display: inline-block;
    }

    option {
        margin-top: 3px;
    }

}

.form_content_item {
    display: flex;
    justify-content: left;
    margin-top: 10px;
    // padding: 10px 15px 10px 12px;

    .title_label {
        width: 100px;
        margin-right: 5px;
    }

    .tag {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0px;
        width: 20px;
        padding: 0px 10px 0px 0px;
    }


    div {
        display: inline-block;
    }

    option {
        margin-top: 3px;
    }
}

.select_Industry {
    width: 200px;
    height: 24px;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
}

::v-deep .form_content_item .title_label {
    font-family: '微软雅黑', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    letter-spacing: 1px;
    text-align: left;
}

label.enterpriseTypes:before {
    content: '* ';
    color: red;
}

::v-deep .form_content_item .enterpriseTypes {
    font-size: 30px;
    margin-right: -10px;
    margin-top: 37px;
}

.input_enterprise {
    width: 194px;
    height: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
    font-size: 12px;
    letter-spacing: 1px;
    color: #595959;
    line-height: 11px;
    padding-left: 12px;
}

.kiy_divs {
    margin-top: 20px;
    width: 100%;
}

.radio_Satisfaction {
    display: flex;
}

::v-deep .form_content_items div {
    display: flex;

}

::v-deep .form_content_item div {
    display: flex;
    align-items: center;

}

::v-deep .van-icon-success:before {
    content: none;
}

.Assess_Highlight {
    display: flex;
    margin-left: 120px;
    flex-wrap: wrap;
    margin-top: 10px;
    min-width: 40%;

    div {
        font-size: 10px;
        letter-spacing: 1px;
        color: rgb(155, 155, 155);
        line-height: 20px;
        background-color: rgb(236, 236, 236);
        text-align: center;
        border-radius: 3px;
        margin-top: 11px;
        width: 70px;
        height: 20px;
        margin-left: 10px;
    }
}


.title_Repurchase {
    font-size: 14px;
}

.Repurchase_Satisfaction {
    margin-left: 10px;
}

::v-deep .van-radio__icon .van-icon {
    width: 14px;
    height: 14px;
}

::v-deep .van-radio__label {
    font-size: 14px;
}

.ser_button {
    display: flex;
    justify-content: center;
    margin-top: 80px;
}

.serviceButton {
    background-color: rgb(22, 155, 213);
    border-radius: 10px;
    letter-spacing: 1px;
    color: #FFF;
    width: 35%;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
</style>