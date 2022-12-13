<template>
    <div>
        <van-nav-bar title="详情" left-arrow left-text="返回" @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_right_item">
                    <van-icon name="ellipsis" />
                </div>
            </div>
        </van-nav-bar>

        <div>
            <div class="markets">
                <div class="title">
                    <div v-if="second.is_sale == 1" class="markets_sell">我要出售</div>
                    <div v-if="second.is_sale == 2" class="markets_wantTobuy">我要采购</div>
                    <div class="titleName">{{ second.title }}</div>
                </div>
                <div class="market">
                    <div class="marketName">{{ second.price }} </div>
                    <div class="marketTime">
                        <div>{{ second.district }}</div>
                        <div>{{ second.add_time }}</div>
                    </div>
                </div>
            </div>
            <div class="details">
                <div class="detailsName">详细需求</div>
                <div class="detailsContent">
                    {{ second.note }}
                </div>
            </div>
            <div class="contactmode">
                <div class="contactmodeName">联系方式</div>
                <div class="contactmodeContent">
                    <div class="modeContent">
                        <div>联系人：</div>
                        <div>{{ second.name }}</div>
                    </div>
                    <div class="modeContent">
                        <div>手机号：</div>
                        <div style="color: #409EFF;" @click="phoneClick(second.phone)">点击查看电话号码</div>
                    </div>
                </div>
            </div>

            <div class="immediatelyContact" @click="phoneClick(second.phone)">
                <div>立即联系</div>
            </div>
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
import { getSecondMarketShow } from '@/api/user'
export default {

    data() {
        return {
            second: {},
        }
    },
    created() {
        this.getSecList();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        getSecList() {
            getSecondMarketShow({ id: this.$route.query.id }).then(res => {
                this.second = res.data.data
                console.log(this.second, "r");
            })
        },
        phoneClick(phone) {
            window.location.href = `tel:${phone}`;
        }
    }
}
</script>

<style lang="scss" scoped>
.titleName {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    letter-spacing: 1px;
    margin-left: 10px;
}

.title {
    display: flex;
    align-items: center;

}

.immediatelyContact {
    border-width: 0px;
    width: 375px;
    height: 41px;
    background: inherit;
    background-color: rgba(255, 142, 80, 1);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 16px;
    letter-spacing: 3px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    position: fixed;
    bottom: 0px;
    width: 100%;
}

.modeContent {
    display: flex;
    align-items: center;
    letter-spacing: 1px;
    color: #686868;
    font-size: 14px;
    line-height: 25px;
    margin-top: 5px;
}

.contactmode {
    background: #FFF;
    margin-top: 5px;
    padding: 15px 15px 20px 15px;
}

.contactmodeName {
    font-size: 16px;
    letter-spacing: 2px;
    line-height: 25px;
}

.contactmodeContent {
    letter-spacing: 1px;
    color: #686868;
}

.detailsContent {
    font-size: 12px;
    letter-spacing: 2px;
    color: #686868;
    line-height: 20px;
    margin-top: 10px;
}

.detailsName {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    letter-spacing: 1px;

}

.details {
    background: #FFF;
    margin-top: 5px;
    padding: 15px 15px 20px 15px;
}

.marketTime {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    letter-spacing: 1px;
    line-height: 20px;
    margin-top: 5px;

}

.marketContent {
    font-size: 10px;
    letter-spacing: 1px;
    line-height: 20px;
}

.marketName {
    font-style: normal;
    font-size: 14px;
    letter-spacing: 1px;
    display: flex;
    justify-content: flex-end;
}

.market {
    padding: 0px 10px 10px 12px;
    background-color: #FFF;
}

.markets {
    background: #FFF;
    margin-top: 5px;
}

.markets_wantTobuy {
    font-size: 10px;
    letter-spacing: 1px;
    color: #FFF8F8;
    line-height: 17px;
    border-width: 0px;
    width: 56px;
    height: 17px px;
    display: flex;
    background: inherit;
    background-color: rgba(247, 93, 93, 1);
    border: none;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 10px;
    letter-spacing: 1px;
    color: #FFF8F8;
    line-height: 17px;
    justify-content: center;
}

.markets_sell {
    font-size: 10px;
    letter-spacing: 1px;
    color: #FFF8F8;
    line-height: 17px;
    border-width: 0px;
    width: 56px;
    height: 17px px;
    display: flex;
    background: inherit;
    background-color: rgba(71, 183, 98, 1);
    border: none;
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 10px;
    letter-spacing: 1px;
    color: #FFF8F8;
    line-height: 17px;
    justify-content: center;
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