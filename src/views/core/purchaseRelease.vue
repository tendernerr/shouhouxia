<template>
    <div>
        <div class="purchase_app">
            <van-nav-bar title="发布采购" left-arrow @click-left="onClickLeft">
                <div class="nav_right_flex" slot="right">
                    <div class="nav_purchase">
                        <img src="@/assets/u56.png" />
                    </div>
                </div>
            </van-nav-bar>
            <div class="">
                <div class="form_content_item">
                    <div class="tag"><label class="enterpriseTypes"></label></div>
                    <div class="form_content_type">
                        <div class="form_content_type_label"> 我要采购: </div>
                        <div class="form_content_type_input"> <input v-model="device_name" placeholder="请输入您要采购的设备名称"
                                class="form_content_name" /> </div>
                    </div>

                </div>
                <div class="form_content_item">
                    <div class="tag"><label class="enterpriseTypes"></label></div>
                    <div class="form_content_type">
                        <div class="form_content_type_label"> 联系电话: </div>
                        <div class="form_content_type_input" id="tel"> <input v-model="phone" placeholder="请输入您要联系电话"
                                class="form_content_name" /> </div>
                    </div>

                </div>
                <div>
                    <div class="form_content_describe">请描述您的需求：</div>
                    <textarea class="form_content_input" v-model="note" placeholder="填写需求描述，供应商报价更快、更准确" rows="10"
                        cols="30"></textarea>
                </div>
            </div>
            <div class="release"><button @click="formSubmit">快速发布</button></div>
        </div>
        <div style="margin-top: 30px;">
            <div style="display: flex;">
                <div><img src="@/assets/u10.png" class="pro_img" /></div>
                <div>
                    <span class="pro_information">供应商多</span>
                    <span class="pro_describe">汇集10万+高质量自动化设备厂家，为您提供丰富的自动化成功案例</span>
                </div>
            </div>
            <div style="display: flex; margin-top: 20px;">
                <div><img src="@/assets/u12.png" class="pro_img" /></div>
                <div>
                    <span class="pro_information">客户精准</span>
                    <span class="pro_describe">专业工程师整理提炼采购需求，为您高效精准匹配优质供应商</span>
                </div>
            </div>
            <div style="display: flex;margin-top: 20px;color: #4A4A4A;">
                <div><img src="@/assets/u15.png" class="pro_imgs" /></div>
                <div>
                    <span class="pro_information">有保障</span>
                    <span class="pro_describes">提供贴心售后服务有保障</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { getPurchase } from '@/api/user'
import { mapState } from 'vuex'
import { Notify } from 'vant'
import { Dialog } from 'vant';
export default {
    data() {
        return {
            device_name: "", // 设备名称
            phone: '', //手机号码
            note: "", // 需求描述
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        // 清理from
        formClear() {
            this.device_name = '';
            this.phone = '',
                this.note = "";
        },
        formSubmit() {
            if (!this.device_name) {
                Dialog.alert({
                    message: '请填写设备名称！',
                }).then(() => {
                });

            }
            if (!this.phone) {
                Dialog.alert({
                    message: '请填写手机号码！',
                }).then(() => {
                });

            }
            //判断手机号格式是否正确
            // var tel = document.getElementById('')
            // this.phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
            // if (!this.phone) {
            //     Dialog.alert({
            //         message: '请填写电话号码！',
            //     }).then(() => {
            //     });

            // }


            // else if (!this.note) {
            //     Dialog.alert({
            //         message:'请填写需求描述！',
            //     }).then(() => {
            //     });
            // }
            else {
                getPurchase({
                    device_name: this.device_name,
                    phone: this.phone,
                    note: this.note,
                    uid: this.userInfo.id
                }).then(res => {
                    var phoneReg = /(^1\d{10}$)|(^[0-9]\d{7}$)/;

                    if (!phoneReg.test(this.phone)) {
                        Dialog.alert({
                            message: '手机号码格式错误',
                        }).then(() => {
                        });
                    } else
                        if (res.data.code == 200) {
                            Dialog.alert({
                                title: '发布成功',
                                message: '预计30分钟内平台项目经理会联系您，请注意来电提醒！！',
                            }).then(() => {
                                this.formClear();

                            });

                        } else {
                            // Notify({ type: 'danger', message: `${res.data.message}` });
                        }
                })
            }

        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/core/management')
        }
    }
}
</script>
<!-- getPurchase -->
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

.purchase_app {
    padding: 20px;
}

.nav_purchase img {
    margin-top: 10px;
}

label.enterpriseTypes:before {
    content: '* ';
    color: red;
    font-size: 30px;
}

.tag {
    padding-top: 15px;
    width: 15px;
}

.form_content_item {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.form_content_type {
    font-size: 12px;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    width: 93%;

    .form_content_type_label {
        width: 75px;
    }

    .form_content_type_input {
        width: 100%;
    }
}

.form_content_name {
    font-size: 13px;
    height: 30px;
    width: 100%;
    border: 0px;
    color: #D4D4D4;
    border-bottom: 1px solid rgb(232, 232, 232);
    margin-left: 10px;
}

.form_content_describe {
    font-family: emoji;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: left;
    letter-spacing: 1px;
    line-height: 50px;
}

.form_content_input {
    font-weight: 400;
    font-size: 13px;
    width: 100%;
    color: #A2A2A2;
    height: 170px;
    background: inherit;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(246, 246, 246);
    border-radius: 5px;
    box-shadow: 2px 2px 5px #eaeaea;
    padding: 10px 20px 0px 20px;
}

.release button {
    width: 100%;
    height: 36px;
    background: inherit;
    background-color: rgb(64, 158, 255);
    border: none;
    color: #FFFFFF;
    border-radius: 20px;
    border-width: 0px;
    box-shadow: none;
    font-size: 18px;
    letter-spacing: 1px;
    margin-top: 30px;
}

.pro_information {
    font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑', sans-serif;
    font-weight: 700;
    color: rgb(8, 8, 8);
    padding-right: 10px;
}

.pro_img {
    width: 25px;
    height: 25px;
    padding: 5px 12px 0px 20px;
}

.pro_imgs {
    width: 25px;
    height: 25px;
    padding: 0px 12px 0px 20px;
}

.pro_describe {
    letter-spacing: 3px;
    margin-top: 20px;
    color: #4A4A4A;
    font-size: 14px;
    line-height: 30px;
}

.pro_describes {
    letter-spacing: 3px;
    font-size: 14px;
    color: #4A4A4A;
}
</style>