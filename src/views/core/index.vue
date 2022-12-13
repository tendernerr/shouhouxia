<template>
    <div class="management">
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="nav">
            <van-tabbar v-model="active" @change="onChange">
                <van-tabbar-item>
                    <!-- 0 -->
                    <span>自定义案列</span>
                    <template #icon="props">
                        <img src="@/assets/menuIcon1.png" style="width: 33px;height: 30px;" />
                    </template>
                </van-tabbar-item>
                <van-tabbar-item>
                    <!-- 1 -->
                    <span>查询企业售后</span>
                    <template #icon="props">
                        <img src="@/assets/menuIcon2.png" style="width: 33px;height: 30px;">
                    </template>
                </van-tabbar-item>
                <van-tabbar-item icon="setting-o">
                    <!-- 2 -->
                    <span>管理中心</span>
                    <template #icon="props">
                        <img src="@/assets/menuicon3.png" style="width: 33px;height: 30px;" />
                    </template>
                </van-tabbar-item>
            </van-tabbar>
        </div>

    </div>
</template>

<script type=“text/javascript”>
export default {
    watch:{
        // 监听里面有2个回调参数 nld是最新监听到的参数 old 是上一次监听到的参数
        '$route':{
            immediate: true,
            handler(nld,old) {
                // 然后我们监听路由的name值 也就是routes里面定义的name名字
                if(nld.name=="automationCase"){
                    this.active=0
                }
                if(nld.name=="querySales"){
                    this.active=1
                }
                if(nld.name=="management"){
                    this.active=2
                }
         }  
        }  
    },
    data() {
        return {
            active: 2,// 默认为2的话他显示的是管理中心 刷新后默认
        }
    },
    methods:{
        onChange(v){
              if(v==0){
               this.$router.push({name:"automationCase"})
            }
            if(v==1){
               this.$router.push({name:"querySales"})
            }
            if(v==2){
                this.$router.push({name:"management"})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.nav {}
</style>