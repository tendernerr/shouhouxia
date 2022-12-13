<template>
    <div class="appContent">
        <van-nav-bar title="系统消息" left-arrow @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_purchase">
                    <img src="@/assets/u56.png" />
                </div>
            </div>
        </van-nav-bar>

        <div class="system">
            <div class="systemItem" v-for="item in getSystemTipList">
                <van-cell :title="item.title" :value="item.addtime" />
                <div class="content_replace">{{ item.content }}</div>
                <van-cell class="infoTo" title="查看详情" is-link @click="infoToClick"> </van-cell>
            </div>

        </div>
    </div>
</template>

<script >
import { getSystemTip } from '@/api/user'
export default {
    data() {
        return {
            getSystemTipList: [],
        }
    },
    created() {
        this.systemTip();
    },
    methods: {
        infoToClick() {
            this.$router.push("/mecomplaint");
        },
        systemTip() {
            getSystemTip({
                uid: 24,
                page: 1,
                pagesize: 25,
            }).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    this.getSystemTipList = res.data.data.list;
                }
            })
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

::v-deep .infoTo .van-cell__title {
    font-weight: 400;
}

::v-deep .van-panel__footer {
    padding: 0px;
}

::v-deep .van-panel__header-value {
    color: #6E6E6E;
}

::v-deep .van-cell__title {
    font-weight: bold;
}

.system {
    .system_item {
        .system_txt {
            padding: 10px 20px;
            font-size: 12px;
            color: #6E6E6E;
            line-height: 25px;
        }
    }

    .panel {
        // background-color: #fbfbfb;
    }

}

.systemItem {
    background: #FFFFFF;
}

.content_replace {
    letter-spacing: 1px;
    color: #6E6E6E;
    line-height: 25px;
    font-size: 12px;
    padding: 10px 15px 10px 15px;
    border-bottom: 1px solid #F5F6F8;
}

.infoTo {
    border-bottom: 1px solid #F5F6F8;
}
</style>