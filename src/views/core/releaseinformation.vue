<template>
    <div>
        <van-nav-bar title="发布信息" left-arrow left-text="返回" @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_right_item">
                    <van-icon name="ellipsis" />
                </div>
            </div>
        </van-nav-bar>
        <div>
            <div class="release">
                <span class="red">*</span>
                <van-radio-group v-model="is_sale" direction="horizontal">
                    <van-radio name="1">我要出售</van-radio>
                    <van-radio name="2">我要求购</van-radio>
                </van-radio-group>
            </div>
            <div class="information">
                <div class="releaseTitle">
                    <span class="red">*</span>
                    <div style="margin-left: 15px;">发布标题</div>
                </div>
                <van-field v-model="title" placeholder="标题建议开头带有出售/求购字眼" />
            </div>
            <div class="information">
                <div class="releaseTitle">
                    <span class="red"></span>
                    <div style="margin-left: 15px;">出售/求购价格</div>
                </div>
                <van-field v-model="price" placeholder="请输入价格，未输入默认为电议" />
            </div>
            <div class="information">
                <div class="informations">
                    <span class="red"></span>
                    <div class="name">所在地区</div>
                </div>
                <!-- <van-field v-model="district" is-link readonly placeholder="请选择" @click="show = true" />
                <van-popup v-model="show" round position="bottom">
                
                </van-popup> -->
        <van-field v-model="district" is-link readonly label="请选择" placeholder="请选择" @click="show = true" />
        <van-popup v-model="show" round position="bottom">
            <van-cascader title="请选择" :options="options" @close="show = false" @change="onChange"
                @finish="onFinish" :field-names="{ text: 'name', value: 'name' }" />
        </van-popup>
            </div>
            <div class="demandDiv">
                <div class="demand">
                    <div>请输入详细需求：</div>
                </div>
                <van-field v-model="note" type="textarea" show-word-limit />
            </div>
        </div>
        <div class="de">
            <div class="Phones">
                <div style="font-size: 16px;">联系方式</div>
                <div class="namePhone">填写联系方式让采购者更好的联系你</div>
                <div style="display: flex;justify-content: flex-end;">
                    <van-radio-group v-model="radios" direction="horizontal">
                        <van-radio name="1" style="font-size:12px">同企业信息</van-radio>
                    </van-radio-group>
                </div>
            </div>
            <div class="information">
                <div class="releaseTitle">
                    <span class="red">*</span>
                    <div style="margin-left: 15px;">您的姓名</div>
                </div>
                <van-field v-model="name" placeholder="请输入您的姓名" />
            </div>
            <div class="information">
                <div class="releaseTitle">
                    <span class="red">*</span>
                    <div style="margin-left: 15px;">电话号码</div>
                </div>
                <van-field v-model="phone" placeholder="请输入电话号码" />
            </div>
            <div class="information">
                <div class="releaseTitle">
                    <span class="red"></span>
                    <div style="margin-left: 15px;">公司名称</div>
                </div>
                <van-field v-model="companyname" placeholder="请输入您的公司名称" />
            </div>
        </div>
        <div class="addDiv">
            <div class="add" @click="addClick">立即发布</div>
        </div>
    </div>
</template>
<style>
body {
    height: 100%;
    background-color: #EFEFF4;
}
</style>
<script>
import { insertSecondMarket, marketIndex } from '@/api/user'
import { Notify } from 'vant';
export default {
    data() {
        return {
            is_sale: '',  //选择
            title: '',//标题
            price: '', //出售价格
            phone: '',//电话号码
            companyname: '',//公司名称
            note: '', //详细需求
            name: '', //姓名
            district: '', //地区
            show: false,
            options: [],
            radios: '',
        }
    },
    created() {
        this.marketList()
    },
    methods: {
        marketList() {
            marketIndex({ type: 'citycategorys' }).then(res => {
                this.options = res.data.data.province_lists
                console.log(this.options, "r");

            })
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        detailsClick() {
            this.$router.push('/core/secondhand')
        },
        onFinish({selectedOptions}) {
            // console.log(selectedOptions, "selectedOptions");
            //公司地址
            this.show = false;
            this.district = selectedOptions.map((options) => options.name).join('/');

            // console.log(this.district);
        },
        onChange({ value, selectedOptions, tabIndex }) { },
        addClick() {
            if (this.is_sale == "") {
                Notify({ type: 'danger', message: `请选择我要采购或我要求购` });
            } else if (this.title == "") {
                Notify({ type: 'danger', message: `请输入发布标题` });
            } else if (this.name == "") {
                Notify({ type: 'danger', message: `请输入您的姓名` });
            } else if (this.phone == "") {
                Notify({ type: 'danger', message: `请输入电话电话` });
            } else {
                insertSecondMarket({
                    is_sale:this.is_sale,
                    title: this.title,
                    price: this.price,
                    phone: this.phone,
                    companyname: this.companyname,
                    note: this.note,
                    name: this.name,
                    district: this.district,
                }).then(res => {
                    this.second = res.data.data
                    // console.log(this.second, "r");
                    this.$router.push('/core/secondhand')
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.addDiv {
    display: flex;
    justify-content: center;
    padding: 20px 0px 20px 0px;
    background: #FFFF;
}

.add {
    border: none;
    color: rgb(255, 255, 255);
    width: 60%;
    background-image: inherit;
    background-position: inherit;
    background-size: inherit;
    background-repeat: inherit;
    background-attachment: inherit;
    background-origin: inherit;
    background-clip: inherit;
    background-color: rgba(22, 155, 213, 1);
    border-radius: 3px;
    box-shadow: none;
    font-size: 16px;
    letter-spacing: 3px;
    text-align: center;
    line-height: 38px;
}

::v-deep .van-radio__icon {
    font-size: 15px;
}

.Phones {
    padding: 10px 0px 10px 40px;
    background: #FFF;
}

.namePhone {
    letter-spacing: 1px;
    color: #999999;
    font-size: 14px;
    margin-top: 5px;
}

.de {
    margin-top: 5px;
}

::v-deep .van-field--min-height .van-field__control {
    border: 1px solid rgba(195, 195, 195, 1);
    padding: 0px;
    margin-left: -4px;
    margin-top: 5px;
    height: 100px;
}

.information {
    ::v-deep .van-cell {
        border-bottom: 1px solid rgb(217, 217, 217);
        padding: 5px 5px 5px 45px;
    }
}

.demandDiv {
    background-color: #FFF;

    ::v-deep .van-cell {
        padding: 5px 5px 15px 45px;
    }
}

.demand {
    letter-spacing: 1px;
    padding: 10px 30px 0px 40px;
}

.informations {
    display: flex;
    align-items: center;
    padding: 10px 30px 0px 30px;
    background: #FFF;
}



.red {
    color: red;
    margin-top: 12px;
    padding-left: 12px;
}

.releaseTitle {
    display: flex;
    align-items: center;
    padding: 10px 5px 0px 10px;
    background-color: #FFF;
}

.release {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #FFF;

    ::v-deep .van-radio--horizontal {
        margin-right: 12px;
        padding: 0px 30px 0px 30px;
    }
}



::v-deep .van-nav-bar__arrow {
    color: #353535;
    font-size: 25px;
}

::v-deep .van-nav-bar__text {
    color: #353535;
}

::v-deep .van-nav-bar__title {
    font-size: 18px;
}
</style>