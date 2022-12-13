<template>
    <div>
        <van-nav-bar title="二手市场" left-arrow left-text="返回" @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_right_item">
                    <van-icon name="ellipsis" />
                </div>
            </div>
        </van-nav-bar>
        <div class="markets" @click="detailsClick(item)" v-for="item in secondhand">
            <div class="markets_sell">
                <div v-if="item.is_sale==1">我要出售</div>
            </div>
            <div class="markets_wantTobuy">
                <div v-if="item.is_sale==2">我要采购</div>
            </div>
            <div class="market">
                <div class="marketName"> {{ item.title }}</div>
                <div class="marketContent">{{ item.note }}...</div>
                <div class="marketTime">
                    <div>{{ item.district }}</div>
                    <div>{{ item.add_time }}</div>
                </div>
            </div>
        </div>
        <div class="img" @click="releaseClick">
            <img src="../../assets/u143.svg" />
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
import { getSecondMarketList } from '@/api/user'
export default {

    data() {
        return {
            secondhand: []
        }
    },
    created() {
        this.getseList();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        detailsClick(data) {
            this.$router.push({ path: '/core/secondhandDetails', query: { id: data.id } })
        },
        releaseClick() {
            this.$router.push('/core/releaseinformation')

        },
        getseList() {
            getSecondMarketList({
                page: 1,
                pagesize: 25,
            }).then(res => {
                this.secondhand = res.data.data.list
            })
        }


    }
}
</script>

<style lang="scss" scoped>
.img {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
    padding: 0px 0px 50px 0px;
}

.marketTime {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    letter-spacing: 1px;
    line-height: 20px;
}

.marketContent {
    font-size: 10px;
    letter-spacing: 1px;
    line-height: 20px;
}

.marketName {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    letter-spacing: 1px;
}

.market {
    padding: 10px 10px 10px 12px;
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