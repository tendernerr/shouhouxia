<template>
    <div class="appContent">
        <div class="top">
            <van-nav-bar title="企业资料" left-arrow @click-left="onClickLeft">
                <div class="nav_right_flex" slot="right">
                    <div class="nav_purchase" @click="informationImg">
                        <img src="@/assets/u56.png" />
                    </div>
                </div>
            </van-nav-bar>
            <div class="means_enterprise">
                <div class="kiy_div">
                    <div class="form_content_item">
                        <div class="tag"><label class="enterpriseTypes"></label></div>
                        <div class="title_label">企业名称 : </div>
                        <div><input v-model="contactPerson.comapany_name" placeholder="广东行牛信息科技有限公司"
                                class="input_enterprise" /></div>
                    </div>
                </div>
                <div class="kiy_div">
                    <div class="form_content_item">
                        <div class="tag"></div>
                        <div class="title_label">所属行业 : </div>
                        <div>
                            <select class="select_Industry" v-model="contactPerson.major">
                                <option style="border-bottom: 0px;margin-top: 5px"
                                    v-for="(item, index) in indexManagementList" :value="item.id">{{ item.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="kiy_div">
                    <div class="form_content_item" v-for="(item, index) in productList">
                        <div class="tag"></div>
                        <div class="forInput">
                            <van-field v-model="item.product" :label="index == 0 ? '主营产品' : ' '" input-align="left" />
                        </div>
                    </div>
                    <div class="additem" @click="addItem"> 继续添加+ </div>
                </div>
            </div>
            <div class="after_Data">
                <div class="Tips">提示：系统会自动为您保存的售后联络人创建售后侠新账号，用户可以通过微信授权登录售后侠与你信息同步</div>
                 <div style="display: flex; align-items: center;">
                    <div class="title">售后联络人（1）</div>   
                    <div style="display: flex; align-items: center;">
                        <img   style="margin-left: 10px;" src="@/assets/u31.svg"/>
                        <div  class="Liaison"  @click="LiaisonClick">选择售后联络人</div>
                    </div>
                </div>
                <van-cell-group>
                    <van-field v-model="contactPerson.contact_name" required label="联系人" input-align="right" />
                    <van-field v-model="contactPerson.contact_phone" required label="联系电话" type="tel" maxlength="11"
                        input-align="right" />
                </van-cell-group>
            </div>
            <div>
                <div class="preserve_data" @click="contactSubmit">保存资料</div>
            </div>
        </div>
    </div>
</template>
<script>
import { Notify } from 'vant';
import { mapState } from 'vuex';
import { indexManagement, companyManage,companyManages } from '@/api/user'
export default {
    data() {
        return {
            productList: [{}],
            indexManagementList: [],
            contactPerson: {
                major: "",
                contact_name: "",
                contact_phone: "",
                comapany_name: ""
            },
            tempPhone:""
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created() {
        this.getcompanyManage();
        this.getindexManagement();
    },
    methods: {
        // 保存
        contactSubmit(){
            let mainArr = this.productList.map(item=>{
                return item.product
            })
            let isDefault =  this.tempPhone==this.contactPerson.contact_phone?0:1
            companyManages({
                comapany_name:this.contactPerson.comapany_name,
                major:this.contactPerson.major,
                main_product:mainArr,
                is_default:isDefault
            }).then(res=>{
                if(res.data.code==200){
                    Notify({ type: 'success', message: '添加成功' });
                    location.reload();
                }else{
                    Notify({ type: 'danger', message: '添加失败' });
                }
            })
        },
        addItem() {
            this.productList.push({})
        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/core/management')
        },
        getindexManagement() {
            let params = {
                type: 'trade'
            }
            indexManagement(params).then(res => {
                // console.log(res, "设备");
                this.indexManagementList = res.data.data
            })
        }, 
        informationImg(){
            if(this.hashLogin){
                // 如果登录
                this.$router.push("/core/management");
            }else{
                // 登录失败
                this.$router.push({
                    name:"account"
                });
            }
        },
        getcompanyManage() {
            companyManage({}).then(res => {
                if (res.data.code == 200) {
                    this.$nextTick(function () {
                        let data = res.data.data;
                        this.tempPhone = data.contact_phone;
                        this.productList = res.data.data.main_product.map(item => {
                            return {
                                "product": item
                            }
                        })
                        this.contactPerson = { ...data, major: data.major };
                    })

                }
            })
        },
        LiaisonClick(){
            this.$router.push('/core/serviceLiaison')
        }
    }
}
</script>
<style lang="scss" scoped>
// .appContent {
//     background-color: rgb(243, 243, 243);
// }
::v-deep .forInput {
    div {
        display: flex !important;
    }
}

::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}

::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-weight: bold;
}

.form_content_item {
    display: flex;
    justify-content: left;
    // margin: 20px 32px 0px 0px;
    border-bottom: 1px solid rgba(240, 240, 240, 1);
    padding: 10px 15px 10px 12px;

    .title_label {
        width: 100px;
    }

    .tag {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 0px;
        width: 20px;
        padding: 0px 10px 0px 0px;
    }

    .enterpriseTypes {
        margin-right: -5px;
        margin-top: 35px;
    }

    .title_label {
        margin-right: 5px;
    }

    div {
        display: inline-block;
    }

    option {
        margin-top: 3px;
    }
}
.Tips{
    font-size: 10px;
    letter-spacing: 1px;
    color: #6F6F6F;
    line-height: 20px;
}
.Liaison{
    margin-left: 10px;letter-spacing: 1px;color: #FF8E50;
}
label.enterpriseTypes:before {
    content: '* ';
    color: red;
}

::v-deep .van-cell--required::before {
    position: absolute;
    left: 0px;
    color: #ee0a24;
    font-size: 27px;
    top: 17px;
    content: '*';
}

::v-deep label.enterpriseTypes[data-v-8de42e54]:before {
    color: #ee0a24;
    font-size: 27px;
    content: '*';
}

.means_enterprise {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 20px;
    background-color: #FFF;
}

.input_enterprise {
    text-align: center;
    width: 197px;
    height: 20px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
    font-size: 12px;
    letter-spacing: 1px;
    color: #595959;
    line-height: 11px;
}

.select_Industry {
    width: 203px;
    height: 24px;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(223, 223, 223, 1);
}

.kiy_div {

    width: 100%;

    .additem {
        letter-spacing: 1px;
        color: #409EFF;
        cursor: pointer;
        height: 50px;
        text-align: right;
        line-height: 50px;
        font-size: 14px;
    }
}

.after_Data {
    // margin-top: 5px;
    background-color: #FFF;
    padding: 0 20px;
    border-top: 6px solid #EEEEEE;

    .title {
        line-height: 50px;
    }
}

.preserve_data {
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
    margin-top: 220px;
}
</style>