<template>
    <div>
        <div>
            <van-nav-bar title="售后详情" left-arrow @click-left="onClickLeft">
                <div class="nav_right_flex" slot="right">
                </div>
            </van-nav-bar>
            <div>
                <div class="equipment">
                    <div class="equipment_name">{{ afterDeatail.device_name }}</div>
                    <div class="legal_person">
                        <div style="margin-left: 10px;" >{{afterDeatail.contact.contact}}:{{afterDeatail.contact.post}}</div>
                    </div>
                </div>
                <div class="equipment_content">
                    <div>供应商：<span class="equipment_supplier">{{ afterDeatail.companyname }}>></span></div>
                    <div>设备型号：{{ afterDeatail.device_model }}</div>
                    <div>购置时间：{{ afterDeatail.delivertime }}</div>
                </div>
                <div class="aterContent">
                    <div v-for="item in afterContent" class="aterContent_DIV"
                        :class="item.active == 1 ? 'aterContent_DIVAcitve' : ''">
                        <div class="leftDate"> {{ item.date }}</div>
                        <div class="rightAfter"> {{ item.text }}</div>
                    </div>
                    <!-- <div v-for="items in customContent" class="aterContent_DIV">
                        <div class="leftDate"> {{ items.date }}</div>
                        <div class="rightAfter"> {{ items.text }}</div>
                    </div> -->
                </div>
            </div>
            <div class="call_div">
                <img class="call_img" src="@/assets/u19.svg" />
                <div class="call_now" @click="shoutClick(afterDeatail.contact.mobile)">立即呼叫</div>
            </div>
        </div>
    </div>
</template>

<script>
import { deviceShow } from '@/api/user'
export default {
    data() {
        return {
            afterDeatail: {
                contact:{}
            },
            afterContent: [],
            // customContent: []
        }
    },
    created() {
        // console.log(this.$route.query.id);
        this.getdeviceShow();
    },
    methods: {
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "/";
            var year = date.getFullYear();//年
            var month = date.getMonth() + 1;//月
            var strDate = date.getDate(); //日
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        getdeviceShow() {
            deviceShow({
                id: this.$route.query.id
            }).then(res => {
                if (res.data.code == 200) {
                    let thisDate = this.getNowFormatDate().replaceAll("/", "-")
                    // this.customContent = res.data.data.bodyInfo.othertip;
                    this.afterDeatail = res.data.data.headInfo
                    console.log(this.afterDeatail,"222");
                    // let obj = res.data.data.bodyInfo;
                    // delete obj['othertip'];
                    let obj = { ...res.data.data.bodyInfo }
                    console.log(obj,"sss");
                    res.data.data.bodyInfo.othertip.forEach((item, index) => {
                        obj[`othertip${index}`] = item
                    });
                    delete obj['othertip'];
                    let datalist = Object.values(obj).sort(function (a, b) {
                       
                        return a.date > b.date ? 1 : -1
                    })
                    this.afterContent = datalist.map(item=>{
                        if (thisDate ==item.date) {
                            item['active'] = 1
                        }
                        return item;
                    })

                    // console.log("事件", this.afterContent);
                }
                // this.afterSales=res.data.data.headInfo;
                // console.log(res);
                // console.log(this.afterSales);
            })
        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/detailedEquipment/equipment')
        },
        shoutClick(phone){
            window.location.href = `tel:${phone}`;
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-weight: bold;
}

::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}

.aterContent_DIVAcitve {
    color: red;
}

.aterContent {
    padding: 20px;
    font-size: 12px;
    color: #646464;
    margin-bottom: 40px;

    div {
        margin: 15px 0;
    }

    .leftDate {
        text-align: left;
    }

    .rightAfter {
        text-indent: 3em;
    }
}

.equipment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px 0px 20px;
}

.equipment_name {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 25px;
    color: #333333;
}

.legal_person {
    border: 1px solid;
    font-size: 14px;
    // width: 25%;
    text-align: center;
    color: #409EFF;
    padding: 2px 5px 2px 0px;
    border-radius: 6px;
    display: flex;
    height: 20px;
    align-items: center;
    justify-content: center;
}

.equipment_content {
    font-family: '微软雅黑', sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    font-size: 12px;
    letter-spacing: 1px;
    line-height: 25px;
    margin-left: 20px;
}

.equipment_supplier {
    color: #409EFF;
    font-size: 12px;
    letter-spacing: 1px;
    line-height: 25px;
}

.call_now {
    font-size: 16px;
    letter-spacing: 2px;
    color: #409EFF;
    line-height: 25px;
    margin-left: 10px;
}

.call_img {
    width: 18px;
    height: 21px;
}

.call_div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #EEEEEE;
    padding: 15px;
    position: fixed;
    bottom: 0px;
    width: 100%;
    background: #FFF;
}
</style>