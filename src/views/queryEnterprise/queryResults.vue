<template>
    <div>
        <van-nav-bar title="查企业" left-arrow>
            <div class="nav_right_flex" slot="right">
                <div class="nav_right_item">
                    <van-icon name="chat-o" />
                </div>
            </div>     
        </van-nav-bar>
            <div class="enterprise_Name">
            <input class="enterprise_Name_input" placeholder="请输入企业名称" />   
            </div>
            <div class="tips" v-if="list.length>0"> 已经为您搜索到{{list.length}}条数据</div>
            <div class="tips_no" v-if="list.length==0"> </div>
            <div class="enterprise_content" v-if="list.length>0">
                数据
            </div>
            <div class="enterprise_contents" v-if="list.length==0">
                <div class="enterpris_sorry">抱歉，找不到该企业售后信息</div>
                <div class="supervise">邀请企业共同接受售后监督<span class="invitation">去邀请</span></div>
            </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                list:[]
            }
        }
    }
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title{
    font-size: 18px;
    font-weight: bold;
}
::v-deep  .van-nav-bar .van-icon{
    color: #A3A3A3;
    font-size: 20px;
}
.tips{
    height: 40px;
    color: #000;
    line-height: 40px;
        background-color: rgba(243, 243, 243, 1);

}
.enterprise_Name{
   background:#FFF;
   height: 100px;
   padding: 0 20px ;
   display: flex;
   justify-content: center;
   align-items: center;
   .enterprise_Name_input{
    height: 35px;
    width: 100%;
    border: rgba(229, 229, 229, 1) 1px solid;
    text-indent: 2em;
    background-image: url(../../assets/images/search.svg);
    background-repeat: no-repeat;
    background-position-y: 10px;
    background-position-x: 10px;
   }
}
.enterprise_contents{
    text-align: center;
}
.enterpris_sorry{
    font-size: 20px;
    letter-spacing: 1px;
    line-height: 25px;
}
.supervise{
    letter-spacing: 1px;
    color: #828282;
    line-height: 25px;
}
.invitation{
    font-size: 18px;
    letter-spacing: 1px;
    color: #409EFF;
    line-height: 25px;
}
</style>