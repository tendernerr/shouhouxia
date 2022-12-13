<template>
    <div class="app_body">
        <div>
            <van-nav-bar title="我的投诉" left-arrow  @click-left="onClickLeft">
                <div class="nav_right_flex" slot="right">
                    <div class="nav_right_item">
                        <div class="pro_mecomplaint" @click="mecomplaintClick">我要投诉</div>
                    </div>
                </div>
            </van-nav-bar>
            <div class="contentds" v-for="(item,index) in list" :key="index">
                <div class="content_complaint">
                    <div class="content_complaintName">
                        <div>投诉设备：</div>
                        <div>{{item.device_name}}</div>
                    </div>
                    <div class="content_handle" v-if="item.audit==0">待审核</div>
                    <div class="content_handles" v-if="item.audit==1">已审核</div>
                </div>
                <div class="content_explain">
                    <div class="content_explainSpan">投诉说明:</div>
                    <div class="content_Span">{{item.note}}</div>
                </div>
                <div class="content_timee">{{item.addtime}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMySalesComplaint,getDeviceList } from '@/api/user'
export default {
  computed: {
        ...mapState(['userInfo','hashLogin'])
    },
    data() {
        return {
            total: 0,  //总条数
            currentPage: 1,  //条数
            pagesize: 10, //当前页码
            list:[],
            actions:[]
        }
    }, 
    mounted(){
         
        this.deviceList();
    },
    methods: {
        deviceList(){
            getDeviceList({uid: this.userInfo.id}).then(res=>{
               if (res.data.code == 200) {
                    this.actions = res.data.data.map(item => {
                        return {
                            name: item.device_name,
                            ...item
                        }
                    });
                    this.mySalesComplaint()
                }
            })
        },
        mecomplaintClick() {
            if(this.hashLogin){
                // 如果登录
                this.$router.push("/salesComplaints/complaint");
            }else{
                // 登录失败
                this.$router.push({
                    name:"account"
                });
            }
        },
        mySalesComplaint() {
            getMySalesComplaint({
            }).then(res => {    
                if(res.data.code==200){
                    this.list = res.data.data.list.map(item=>{
                        this.actions.forEach(items=>{
                            if(item.comid = items.id){
                                item.devname = items.device_name;
                            }
                        })
                        return item;
                    })
                }
            })
        },
         //路径跳转
        onClickLeft(){
            this.$router.push('/salesComplaints/complaint')
        }

    },
}
</script>


<style lang="scss" scoped>
.app_body {
    height: 100%;
    position: absolute;
    width: 100%;
    background-color: rgba(243, 243, 243, 1);
}

::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-weight: bold;
}

::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}

.pro_mecomplaint {
    font-size: 12px;
    letter-spacing: 1px;
    color: #409EFF;
    line-height: 25px;
}

.contentds {
    background: #FFFFFF;
}

.contentd {
    border-top: 6px solid #EEEEEE;
    background: #FFFFFF;
}

.content_complaint {
    display: flex;
    justify-content: space-between;
    padding: 12px;
}

.content_complaintName {
    display: flex;
    font-weight: 700;
    color: #000000;
    font-size: 14px;
}

.content_handle {
    font-weight: 400;
    font-size: 13px;
    color: #EE0A24;
}

.content_handles {
    font-size: 13px;
    color: rgba(68, 104, 10, 0.996078431372549);
}

.content_explain {
    padding: 12px;
}

.content_explainSpan {
    color: #000000;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 25px;
}

.content_Span {
    color: #464646;
    letter-spacing: 1px;
    line-height: 25px;
    font-size: 14px;
    word-break: break-word;
    height: 35px;
}

.content_timee {
    font-size: 14px;
    letter-spacing: 1px;
    color: #7F7F7F;
    line-height: 10px;
    padding: 12px;
    display: flex;
    justify-content: flex-end;
}

.content_official {
    font-size: 12px;
    letter-spacing: 1px;
    color: #409EFF;
    line-height: 25px;
    padding: 12px;
    border-top: 1px solid;
    border-color: rgba(240, 240, 240, 1);
}
</style>