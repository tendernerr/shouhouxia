<template>
    <div>
        <div>
             <van-nav-bar title="新增设备" left-arrow>
                <div class="nav_right_flex" slot="right">
                    <div class="nav_purchase">
                        <img src="@/assets/u56.png"  class="nav_img"/>
                    </div>
                </div>
            </van-nav-bar>
        </div>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title{
    font-size: 20px;
}
::v-deep  .van-nav-bar .van-icon{
    color: #A3A3A3;
    font-size: 20px;
}
.nav_img{
    background-image: url(../../assets/images/u10.svg);
}
</style>