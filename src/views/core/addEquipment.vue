<template>
    <div>
        <van-nav-bar title="新增设备" left-arrow @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_right_item">
                    <van-icon name="ellipsis" />
                </div>
            </div>
        </van-nav-bar>
        <div style="background-color: #FFF;">
            <div class="equipment">
                <img src="../../assets/24.png" width="34px" height="34px" />
                <div>工厂近期新增了一批设备？</div>
            </div>
            <div>
                <div class="equipment_content">
                    为了保障您后期设备的售后权益，请马上要求设备供应商接受“<span style="color: #FEAE41;">售后侠</span>”的监督！
                </div>
                <div class="equipment_supervise">
                    点击<span style="color:#409EFF">下方蓝色</span>文字，去邀请设备供应商入驻售侠，接受平台的售后监督吧~
                </div>
            </div>
            <div class="imges" @click="imgesClick"><img src="../../assets/45.png" /></div>
        </div>

        <div style="margin-top: 5px;">
            <img src="@/assets/1.png" />
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
export default {

    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        imgesClick() {
            this.$router.push('/core/addedEquipment')
        }

    }
}
</script>

<style lang="scss" scoped>
.imges {
    margin-top: 20px;
    width: 100%;
}

.equipment_supervise {
    letter-spacing: 1px;
    line-height: 25px;
    color: #484848;
    font-size: 14px;
    padding: 2px 30px 0px 30px;
}

.equipment_content {
    letter-spacing: 1px;
    line-height: 25px;
    color: #484848;
    font-size: 14px;
    padding: 2px 30px 0px 30px;
}

.equipment {
    display: flex;
    align-items: center;
    padding: 15px 15px 10px 30px;

    div:nth-child(2) {
        padding-left: 10px;
        color: rgb(217, 0, 27);
        font-size: 16px;
        font-family: 阿里巴巴普惠体, sans-serif;
    }
}

::v-deep .van-icon {
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