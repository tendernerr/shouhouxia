<template>
    <div class="appContent">
        <van-nav-bar title="建议反馈" left-arrow @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_purchase">
                    <img src="@/assets/u56.png" />
                </div>
            </div>
        </van-nav-bar>

        <div class="infoUpdate">
            <div class="title">意见类型</div>
            <div class="typeInfo">

                <div class="item" v-for="(item, index) in type" :key="index"
                    :class="typeAcitve == index ? 'itemActive' : ''" @click="typeAcitves(index)">{{ item }}</div>
            </div>
            <div class="title">反馈内容（必填）</div>
            <div class="textInfo">
                <van-field v-model="text" rows="8" autosize type="textarea" maxlength="50"
                    placeholder="请具体描述您要反馈的内容,以便我们及时处理,感谢您的支持" />
            </div>

            <div class="submit">
                <van-button type="info" round class="btn" @click="feedBack">提交</van-button>

            </div>
        </div>
    </div>
</template>

<script >
import { Notify } from 'vant'
import { getfeedBack } from '@/api/user'

export default {
    data() {
        return {
            text: "",
            type: ["建议", "意见", "求助", "投诉"],
            typeAcitve: 0,
            // 不同状态的模拟
            status: 0
        }
    },
    mounted() {
    },
    methods: {
        typeAcitves(idx) {
            this.typeAcitve = idx;
        },

        feedBack() {
            if (this.text != "") {
                getfeedBack({
                    type: this.type[this.typeAcitve],
                    content: this.text,
                    uid: 24,
                }).then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        Notify({ type: 'success', message: '感谢您的反馈，我们会尽快处理' });
                    } else {
                        Notify({ type: 'danger', message: `${res.data.message}` });
                    }
                })
            } else {
                Notify({ type: 'danger', message: `请填写反馈内容` });
            }

        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/accountManagement/managementaccount')
        }
    }
}
</script>

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

.appContent {
    background-color: rgba(243, 243, 243, 1);
    height: 100%;
    position: absolute;
    width: 100%;
}

::v-deep .textInfo .van-cell {
    border: 1px solid rgb(235 221 221);
}

.infoUpdate {
    background-color: #FFF;
    height: 100%;
    padding: 10px;

    .title {
        font-size: 16px;
        font-weight: 700;
        margin-left: 4px;
        clear: both;
    }

    .textInfo {
        margin-top: 10px;
    }

    .typeInfo {
        margin-top: 20px;
        margin-bottom: 60px;

        .item {
            color: #000;
            border: 1px solid #ebedf0;
            float: left;
            color: #AAAAAA;
            font-size: 14px;
            margin-right: 10px;
            padding: 4px 10px;
        }

        .itemActive {
            color: #409EFF;
            border: 0px solid #ebedf0;
            background-color: rgb(243, 249, 259);
        }
    }
}


.submit {
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
</style>