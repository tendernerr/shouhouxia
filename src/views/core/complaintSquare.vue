<template>
    <div class="square_app">
        <div>
            <van-nav-bar title="投诉广场" left-arrow @click-left="onClickLeft">
                <div class="nav_right_flex" slot="right">
                    <div class="nav_right_item">
                        <div class="pro_complaint" @click="complaintClick">我的投诉</div>
                    </div>
                </div>
            </van-nav-bar>
            <van-notice-bar wrapable :scrollable="false" left-icon="" text="为及时妥善处理客户投诉，现将投诉处理结果公布如下：" />
            <div class="squares" v-for="(item,index) in complaintSquare">
                <div class="square_conten">{{item.text}}</div>
                <div class="content_timee">{{item.addtime}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getComplaintSquare } from '@/api/user'
export default {
    data() {
        return {
          complaintSquare:[],
        }
    },
    created() {
        this.ComplaintSquare();
    },
    methods: {
        ComplaintSquare() {
               getComplaintSquare({}).then(res=>{
                    console.log(res);
                    this.complaintSquare=res.data.data;
                })
        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/core/management')
        },
        complaintClick(){
            this.$router.push('/salesComplaints/mecomplaint')
        }
    }
}
</script>

<style lang="scss" scoped>
.square_app {
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

.pro_complaint {
    letter-spacing: 1px;
    color: #409EFF;
    line-height: 25px;
}

::v-deep .van-notice-bar--wrapable {
    background-color: rgba(255, 233, 222, 1);
}

::v-deep .van-notice-bar--wrapable {
    padding: 6px 16px;
}

::v-deep .van-notice-bar__content {
    transition-duration: 0s;
    font-size: 11px;
    height: 16px;
    line-height: 18px;
    letter-spacing: 1px;
    color: #F75D5D;
    margin-left: 43px;
}

.squares {
    background: #FFFFFF;
}

.square {
    border-top: 6px solid #EEEEEE;
    background: #FFFFFF;
}

.square_conten {
    color: #333333;
    letter-spacing: 1px;
    font-size: 14px;
    line-height: 25px;
    padding: 25px;
}

.content_timee {
    font-size: 15px;
    letter-spacing: 1px;
    line-height: 10px;
    color: #8C8C8C;
    margin-top: -27px;
    padding: 12px;
    display: flex;
    justify-content: flex-end;
}
</style>