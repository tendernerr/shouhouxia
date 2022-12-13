<template>
    <div>
        <div>
            <van-nav-bar title="售后投诉" left-arrow @click-left="onClickLeft">
                <div class="nav_right_flex" slot="right">
                    <div class="nav_right_item">
                        <div class="pro_complaint" @click="complaintClick">我的投诉</div>
                    </div>
                </div>
            </van-nav-bar>
            <div>
                <van-cell is-link title="投诉设备" :value="activeActions" @click="show = true" :border="false" />
                <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
                <van-cell title="公司名称" :value="comapany_name" class="nav_name" />
                <div class="nav_name_textContent">
                    <van-cell title="投诉说明：" class="nav_name" />
                    <div class="nav_text"><textarea class="nav_textarea" v-model="note"
                            placeholder="请描述具体情况，有助于投诉快速处理（字数80字以内）"></textarea></div>
                </div>
            </div>
            <div>
                <van-cell>
                    <div slot="title"> 相关凭证: <span style="color: #969799;font-size: 12px;margin: 5px;"> (最多不超过6张)</span>
                    </div>
                </van-cell>
                <div style="padding: 0 20px;">
                    <van-uploader v-model="fileList" :after-read="afterRead" :before-delete="beforeDetale"
                        :preview-image="true" upload-icon="plus" />
                </div>
            </div>
            <div class="nav_buttons" ><button @click="applyClick">提交申请</button></div>
            <div>
                <template>
                    <van-overlay :show="show1" @click="show1 = false">
                        <div class="wrapper" @click.stop>
                            <div class="block"></div>
                        </div>
                    </van-overlay>
                </template>
            </div>
        </div>
        <!-- 成功的弹框 -->
        <van-dialog v-model="isSucces" class="sussesDialog" :show-confirm-button="false" :show-cancel-button="false"
            width="70%">
            <div slot="default" class="content">
                <div class="text">投诉成功，我们将第一时间受理您的投诉信息！</div>
                <div>
                    <van-button color="rgb(249,106,33)" plain round size="normal" style="width: 209px;height: 30px;"
                        @click="isSucces = false">知道了</van-button>
                </div>
            </div>
        </van-dialog>
        <div class="leftIcon" v-if="isSucces">
            <div><img src="@/assets/laba.png" style="height:25px;width:25px" /></div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { Notify } from 'vant'
import { ref } from 'vue';
import { Toast } from 'vant';
import { getDeviceList, getUploadList, addSalesComplaint } from '@/api/user'
export default {
    components: {
    },
    computed: {
        ...mapState(['userInfo','hashLogin'])
    },
    data() {
        return {
            isSucces: false,
            showDialog: false,
            show: false,
            show1: false,
            actions: [],
            activeActions: "",
            fileList: [],
            fileLists: [],
            comapany_name: '', // 公司名称
            comapanyObj: {},
            note: ""
        }
    },
    mounted() {
        this.getEviceList();
    },
    methods: {
        // 回调删除函数
        beforeDetale(data, curr) {
            this.fileLists.splice(curr.index, 1)
            this.fileList.splice(curr.index, 1)
        },
        afterRead(file) {
            // 此时可以自行将文件上传至服务器
            // 文件
            getUploadList({ ...file }).then(res => {
                if (res.code == 200) {
                    this.fileLists.push(res.data)
                }
            })
        },
        onSelect(item) {
            this.comapany_name = item.comapany_name
            this.comapanyObj = item;
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
            this.activeActions = item.name;
        },
        complaintClick() {
            if(this.hashLogin){
                // 如果登录
                this.$router.push("/salesComplaints/mecomplaint");
            }else{
                // 登录失败
                this.$router.push({
                    name:"account"
                });
            }
           
        },
        formClaer() {
            this.fileList = [];
            this.fileLists = [];
            this.comapany_name = "";
            this.comapanyObj = {};
            this.note = ""
        },
        applyClick() {
            if (JSON.stringify(this.comapanyObj) == "{}") {
                Notify({ type: 'danger', message: `请选择投诉设备！` });
            }else
            if (this.note.length < 1) {
                Notify({ type: 'danger', message: `请填写投诉说明！` });
            } 
            else {
                let imgArr = this.fileLists.map(item => {
                    return item.file_id
                })
                addSalesComplaint({
                    device_id:this.comapanyObj.id,
                    device_name: this.comapanyObj.device_name,
                    company_name: this.comapanyObj.comapany_name,
                    note: this.note,
                    img: imgArr,
                    comid: this.comapanyObj.comid
                }).then(res => {
                    if (res.data.code == 200) {
                        // Notify({ type: 'success', message: `新增成功！` });
                        this.isSucces = true
                        this.formClaer();
                    } else {
                        Notify({ type: 'danger', message: `新增失败！` });
                    }
                    console.log(res);
                })
            }

            // 
        },
        //获取投诉设备
        getEviceList() {
            getDeviceList({
                uid: this.userInfo.id
            }).then(res => {
                if (res.data.code == 200) {
                    this.actions = res.data.data.map(item => {
                        return {
                            name: item.device_name,
                            ...item
                        }
                    });
                }
            })
        },
        //路径跳转
        onClickLeft(){
            this.$router.push('/core/management')
        }
    }
};
</script>

<style lang="scss" scoped>
.sussesDialog {
    border-radius: 8px !important;

    .content {
        padding: 27px;
        text-align: center;

        .text {
            margin-bottom: 24px;
            font-size: 16px;
            letter-spacing: 1px;
            line-height: 28px;
        }
    }
}

.leftIcon {
    background-color: rgb(249, 106, 33);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 40px;
    top: 200px;
    border: 2px solid #FFF;
    z-index: 8888;
}

::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-weight: bold;
}

::v-deep {
    .van-uploader__upload {
        border: rgb(204, 204, 204) 2px dashed;
    }

    .van-cell::after {
        border-bottom: 0px solid #ebedf0;
    }
}

::v-deep .van-uploader__upload-icon {
    color: rgb(191, 191, 191);
    font-size: 45px;
    font-weight: bolder;
}

::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}

::v-deep .van-cell {
    font-size: 15px;
}

::v-deep .van-cell__value {
    font-size: 15px;
}

.pro_complaint {
    letter-spacing: 1px;
    color: #409EFF;
    line-height: 25px;
}

.nav_name {
    font-size: 15px;
}

.nav_name_textContent {
    display: flex;
    justify-content: center; // 水平居中
    padding: 0 0px;
    flex-direction: column;

    .nav_text {
        padding: 0 18px;

        .nav_textarea {
            letter-spacing: 1px;
            color: rgb(176, 176, 176);
            line-height: 25px;
            border-color: rgb(244, 244, 244);
            box-sizing: border-box;
            border-width: 1px;
            font-family: '微软雅黑', sans-serif;
            font-weight: 400;
            font-style: normal;
            font-size: 14px;
            text-align: left;
            width: 100%;
            margin: 0 auto;
            padding: 10px;
            height: 120px;
        }
    }

}

.nav_buttons button {
    color: #FFFFFF;
    background: #409EFF;
    border-radius: 5px;
    width: 50%;
    height: 40px;
    margin: 50px 0px 0px 100px;
    border: none;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 120px;
    height: 120px;
    background-color: #fff;
}
</style>