<template>
    <div class="Lisp">
        <div>
            <van-nav-bar title="选择售后联络人" left-arrow @click-left="onClickLeft">
                <div class="nav_right_flex" slot="right">
                    <div class="nav_purchase">
                    </div>
                </div>
            </van-nav-bar>
            <div class="after_sales">
                <img style="margin-left: 10px;" src="@/assets/u31.svg" />
                <div class="Liaison" @click="LiaisonClick">选择售后联络人</div>
            </div>
            <div>
                <div class="divs_Liaison">
                    <div class="name_Liaison">
                        <div>孙杰</div><img src="@/assets/u101.png" class="img_Liaison" @click="sheetClick" />
                    </div>
                    <div class="phone_Liaison">18507330762</div>
                </div>
                <div class="choicess">
                    <van-checkbox-group v-model="result">
                        <van-checkbox name="b" class="select_All">选择联络人</van-checkbox>
                    </van-checkbox-group>
                    <div class="choice_del" @click="delClick">删除</div>
                </div>
            </div>
            <div style="margin-top: 6px;">
                <div class="divs_Liaison">
                    <div class="name_Liaison">
                        <div>张三</div><img src="@/assets/u101.png" class="img_Liaison" />
                    </div>
                    <div class="phone_Liaison">18507330762</div>
                </div>
                <div class="choicess">
                    <van-checkbox-group v-model="result">
                        <van-checkbox name="c" class="select_All">选择联络人</van-checkbox>
                    </van-checkbox-group>
                    <div class="choice_del" @click="delClick">删除</div>
                </div>
            </div>
            <div style="margin-top: 6px;">
                <div class="divs_Liaison">
                    <div class="name_Liaison">
                        <div>李四</div><img src="@/assets/u101.png" class="img_Liaison" />
                    </div>
                    <div class="phone_Liaison">18507330762</div>
                </div>
                <div class="choicess">
                    <van-checkbox-group v-model="result">
                        <van-checkbox  class="select_All">选择联络人</van-checkbox>
                    </van-checkbox-group>
                    <div class="choice_del">删除</div>
                </div>
            </div>
            <div class="call_div">
                <van-checkbox-group v-model="result">
                    <van-checkbox name="slect" class="selectAll">全选</van-checkbox>
                </van-checkbox-group>
                <div class="Selected">已选中<span>2</span>位联系人</div>
                <div class="preserve_data" @click="contactSubmit">确定联系人</div>
            </div>
            <!-- 删除弹窗 -->
            <van-dialog v-model="isSucces" class="sussesDialog" :show-confirm-button="false" :show-cancel-button="false"
                width="70%">
                <div slot="default" class="content">
                    <div class="del_Liaisons">确定删除联络人吗？</div>
                    <div class="cancelADD">
                        <div class="cancel" @click="cancelClick">取消</div>
                        <div class="delete" @click="delentClick">删除</div>
                    </div>
                </div>
            </van-dialog>
            <!-- 编辑弹窗 -->
            <van-action-sheet v-model="showAction">
                <div style="width: 375px;height: 280px;">
                    <div class="postSale_Liaison">售后联络人</div>
                    <div class="kiy_div">
                        <div class="form_content_item">
                            <div style="display: flex;align-items: center;">
                                <div class="tag"><label class="enterpriseTypes"></label></div>
                                <div class="title_label">联系人</div>
                                <van-field v-model="value" input-align="left" />
                            </div>
                        </div>
                    </div>
                    <div class="kiy_div">
                        <div class="form_content_item">
                            <div style="display: flex;align-items: center;">
                                <div class="tag"><label class="enterpriseTypes"></label></div>
                                <div class="title_label">联系电话</div>
                                <van-field v-model="value1" input-align="left" />
                            </div>
                        </div>
                    </div>
                    <van-radio-group  v-model="radio">
                        <van-radio class="select_Alls">选择该联系人</van-radio>
                    </van-radio-group>
                    <div>
                        <div class="preserve_button" @click="completeSubmit">完成</div>
                    </div>
                </div>
            </van-action-sheet>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            result: ['a', 'b', 'c', 'd', 'slect'],
            isSucces: false,
            showAction: false,
            value: '刘戏',
            value1: '150809990756',
            radio:'0'
        }
    },
    methods: {
        LiaisonClick() {

        },
        contactSubmit() {

        },
        delClick() {
            this.isSucces = true
        },
        delentClick() {
            this.isSucces = false
        },
        cancelClick() {
            this.isSucces = false;
        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/core/information')
        },
        sheetClick() {
            console.log(1);
            this.showAction = true;
        },
        completeSubmit() {
            this.showAction = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.preserve_button {
    background: inherit;
    background-color: rgb(64, 158, 255);
    border-radius: 20px;
    letter-spacing: 1px;
    color: #FFF;
    width: 80%;
    display: flex;
    justify-content: center;
    padding: 10px 10px 10px 6px;
    margin: 30px;
}

.form_content_item {
    display: flex;
    // justify-content: left;
    padding: 10px 15px 0px 0px;
    margin-left: 10px;
    justify-content: center;
    border-bottom: 1px solid rgba(240, 240, 240, 1);

    .title_label {
        width: 100px;
        font-size: 14px;
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

::v-deep .van-field__control {
    padding-left: 20px;
}

.postSale_Liaison {
    color: #333333;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 1px;
    text-align: center;
    padding-top: 20px;
    font-size: 18px;
}

.sussesDialog {
    border-radius: 8px !important;

    .content {
        padding: 27px;
        text-align: center;
        height: 100px;

        .text {
            margin-bottom: 24px;
            font-size: 16px;
            letter-spacing: 1px;
            line-height: 28px;
        }
    }
}

.enterpriseTypes {
    margin-right: -5px;
    margin-top: 18px;
    font-size: 27px;
}

label.enterpriseTypes:before {
    content: '* ';
    color: red;
}

.cancelADD {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 30px;
}

.cancel {
    width: 94px;
    height: 30px;
    letter-spacing: 1px;
    color: #409EFF;
    background: #FFF;
    border-radius: 5px;
    border: 1px solid #409EFF;
    line-height: 30px;
}

.delete {
    background: rgba(64, 158, 255, 1);
    color: #FFF;
    width: 94px;
    height: 30px;
    border-radius: 5px;
    letter-spacing: 1px;
    line-height: 30px;
}

.Lisp {
    height: 100%;
    position: absolute;
    width: 100%;
    background-color: rgba(243, 243, 243, 1);
}

::v-deep .van-nav-bar .van-icon {
    color: #171717;
    font-size: 30px;
}

.call_div {
    display: flex;
    align-items: center;
    padding: 15px;
    position: fixed;
    bottom: 0px;
    width: 100%;
    background: #FFF;
}

.del_Liaisons {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
    letter-spacing: 1px;
    font-size: 18px;
    padding-top: 10px;
}

.preserve_data {
    background-color: rgb(22, 155, 213);
    border-radius: 20px;
    letter-spacing: 1px;
    color: #FFF;
    width: 30%;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    padding: 10px 10px 10px 10px;
}

.Selected {
    font-size: 12px;
    letter-spacing: 1px;
    color: #757575;
    margin-left: 45px;
}

.after_sales {
    display: flex;
    align-items: center;
    margin-top: 10px;
    background: #FFF;
    padding-left: 10px;
}

.Liaison {
    margin-left: 10px;
    letter-spacing: 1px;
    color: #FF8E50;
}

.selectAll {
    font-size: 14px;
}

.name_Liaison {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-family: "微软雅黑 Bold", 微软雅黑, sans-serif;
    justify-content: space-between;
}

.divs_Liaison {
    padding-left: 25px;
    padding-top: 15px;
    border-bottom: 1px solid rgba(219, 219, 219, 1);
    padding-bottom: 8px;
    background: #FFF;
}

.img_Liaison {
    width: 19px;
    height: 19px;
    margin-right: 20px;
}

.choicess {
    display: flex;
    align-items: center;
    padding-left: 20px;
    justify-content: space-between;
    background: #FFF;
    padding-top: 8px;
    padding-bottom: 8px;

    // min-width: 90%;
    ::v-deep .van-checkbox__label {
        color: #7F7F7F !important;
    }
}

.phone_Liaison {
    margin-top: 10px;
    font-size: 12px;
    letter-spacing: 1px;
    color: #5B5B5B;
}

.imgs_Liaison {
    width: 18px;
    height: 18px;
}

// .choice_Liaison {
//     font-size: 10px;
//     letter-spacing: 1px;
//     color: #7F7F7F;
//     margin-left: -215px;
// }

.choice_del {
    font-size: 10px;
    letter-spacing: 1px;
    color: #7F7F7F;
    margin-right: 20px;
}

.select_All {
    font-size: 10px;
    letter-spacing: 1px;

}

.select_Alls {
    font-size: 14px;
    letter-spacing: 1px;
    padding-left: 20px;
    padding-top: 15px;

    .van-checkbox__label {
        color: #000 !important;
    }
}

::v-deep .van-checkbox__icon--checked .van-icon {
    color: #fff;
    background-color: #FF8E50;
    border-color: #FF8E50;
    width: 18px;
    height: 18px;
    font-size: 12px;
    line-height: 17px;
}
::v-deep .van-radio__icon--checked .van-icon{
    color: #fff;
    background-color: #FF8E50;
    border-color: #FF8E50;
    width: 18px;
    height: 18px;
    font-size: 12px;
    line-height: 17px;
}
</style>