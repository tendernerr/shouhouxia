<template>
    <div class="equipment_app">
        <div>
            <van-nav-bar title="我的设备" />
        </div>
        <div>
            <van-search shape="round" background="#FFFFFF" placeholder="请输入关键词" />
            <div style="padding-bottom: 55px;">
                <div class="equipment_content" v-for="(item,index) in equipment">
                    <div class="equipment_name">
                        <div>{{item.device_name}}</div>
                        <div class="legal_person">
                            <div class="legal_img"></div>
                            <div style="margin-left: 10px;" @click="dial(item.mobile)">{{item.contact}}:{{item.post}}
                            </div>
                        </div>
                    </div>
                    <div class="equipmen_box">
                        <div class="equipment_companys">
                            <div>
                                <span>供应商：</span>
                                <span class="company" @click="companyClick(item)">{{item.companyname}}>></span>
                            </div>
                            <!-- <div class="dedicated_line">
                            <div>售后专线</div>
                        </div> -->
                        </div>
                        <div class="equipment_company">
                            <span>购置时间：{{item.delivertime}}</span>
                        </div>
                        <div class="equipment_see">
                            <div :class="item.mainActive? 'aterContent_DIVAcitve' : ''">
                                <span>保养日期：{{item.maintaininfo}}</span>
                            </div>
                            <!-- <div class="intelligence">
                            <div>智能售后</div>
                        </div> -->
                        </div>
                        <!-- <div :class="item.active == 1 ? 'aterContent_DIVAcitve' : ''"> -->
                        <div class="equipment_company">
                            <span>尾款日期：{{item.endmoney}}</span>
                        </div>
                        <div class="equipment_see">
                            <!-- <div>
                            <span>质保日期：{{item.warrantytime}}</span>
                        </div> -->
                            <div :class="item.warranActive ? 'aterContent_DIVAcitve' : ''">
                                <span>质保日期：{{item.warrantytime}}</span>
                            </div>
                            <div class="see" @click="afterSalesClick(item)">
                                <div>查看详细售后</div>
                            </div>
                        </div>
                    </div>
                    <div class="view_update">
                        <div>设备动态：该设备已更新换代，</div>
                        <div class="view_now">立即查看>></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import { deviceList } from '@/api/user'
export default {
    data() {
        return {
            equipment: [],
        }
    },
    created() {
        this.getdeviceList();
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
        dial(phone) {
            window.location.href = `tel:${phone}`;
        },
        companyClick(data) {
            this.$router.push({ path: "/core/informationDetails", query: { id: data.comid } });
        },
        afterSalesClick(data) {
            this.$router.push({ path: "/detailedEquipment/afterSales", query: { id: data.id } });
        },
        getdeviceList() {
            deviceList({}).then(res => {
                if (res.data.code == 200) {
                    let currDate = this.getNowFormatDate();
                    console.log(currDate);
                    this.equipment = res.data.data.list.map(item=>{
                        if(item.maintaininfo==currDate.replaceAll("/", "-")){
                            item.mainActive = true;
                        }
                        if(item.maintaininfo==currDate.replaceAll("/", "-")){
                            item.warranActive = true;
                        }
                        return item
                    });
                    console.log(this.equipment);
                }
            })
        }
    }
} 
</script>

<style lang="scss" scoped>
.equipment_app {
    height: 100%;
    position: absolute;
    width: 100%;
    background-color: rgba(243, 243, 243, 1);
}

.aterContent_DIVAcitve {
    color: red;
}

::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-weight: bold;
}

.equipmen_box {
    margin-top: -15px;
    line-height: 25px;
    padding: 2px;
    border-bottom: 1px solid #D7D7D7;
}

.equipment_content {
    border-top: 6px solid #EEEEEE;
    background: #FFFFFF;

}

.equipment_contents {
    border-top: 6px solid #EEEEEE;
    background: #FFFFFF;

}

.equipment_companys {
    display: flex;
    margin-top: 10px;
    font-size: 13px;
    padding: 16px 5px 0px 20px;
    line-height: 24px;
    justify-content: space-between;
}

.equipment_company {
    padding: 0px 0px 0px 20px;
}

.equipment_company span {
    font-size: 13px;
    line-height: 24px;
}

.company {
    color: #409EFF;
}

.equipment_name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 5px 0px 20px;
}

.legal_person {
    border: 1px solid;
    font-size: 14px;
    text-align: center;
    color: #409EFF;
    padding: 2px 2px 2px 22px;
    border-radius: 6px;
    display: flex;
    height: 20px;
    align-items: center;
    justify-content: center;

    .legal_img {
        width: 16px;
        height: 16px;
        background-image: url(../../assets/images/u22.svg);
        margin-left: -10px;
    }

}

.dedicated_line {
    background-color: rgba(215, 215, 215, 1);
    border-radius: 5px;
    width: 20%;
    height: 25px;
    line-height: 26px;
    font-size: 12px;
    text-align: center;
    color: #333333;
}

.equipment_intelligence {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 5px 0px 20px;
    font-size: 13px;
}

.intelligence {
    width: 25%;
    background: #409EFF;
    border-radius: 5px;
    text-align: center;
    color: #FFFFFF;
    font-size: 12px;
}

.equipment_see {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 5px 0px 20px;
    font-size: 13px;
}

.see {
    width: 25%;
    background: #409EFF;
    border-radius: 5px;
    text-align: center;
    color: #FFFFFF;
    font-size: 12px;
}

.view_update {
    font-size: 13px;
    display: flex;
    padding: 0px 0px 0px 20px;
    line-height: 40px;
    height: 40px;

    .view_now {
        color: #409EFF;
    }
}
</style>