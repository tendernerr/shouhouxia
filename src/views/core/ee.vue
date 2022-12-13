<template>
    <div class="heard_app">
        111111111
        <!-- 下拉刷新 -->
        <!-- <van-pull-refresh v-model="refreshing" :head-height="80" @refresh="onRefresh" value=""> -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="videoList">
                    <div style="overflow:hidden">
                        <div class="videoBOX" v-for="video in Videolists">
                            <div class="video_img" @click="videoTo(video)">
                                <div style="display: flex;justify-content: center;">
                                    <div style="width: 100%;"><img class="imgs"
                                            :src="video.video_src + '?vframe/jpg/offset/1'" /></div>
                                </div>
                                <div class="isVideo"></div>
                                <div class="Video_company">
                                    <div class="videoBg"> <img :src="video.logo_src" width="21px" height="21px"
                                            class="imgvideos" /></div>
                                    <div class="title"> {{ video.companyname }} </div>
                                </div>
                            </div>
                            <div style="margin: 20px 10px 0px 10px;line-height: 35px;">
                                <div class="province_tiltle">{{ video.title }}</div>
                                <div class="province_Icon">{{ video.address }} </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        </van-list>
        <!-- </van-pull-refresh> -->

    </div>
</template>

<script>
import { classifyIndex, videolists } from '@/api/user'
// import { mapState } from 'vuex'
export default {

    data() {
        return {
            search: require("@/assets/sousuo.png"),
            mapValue: null,
            experience: "",
            experienceList: [],
            mapList: [],
            Videolists: [],
            mapTitle: "地区",
            expTitle: "设备类型",
            value: '',
            loading: false,
            page: 1,
            pagesize: 10,
            finished: false,
            list: [],
        }
    },
    computed: {
        // ...mapState(['mapList'])
    },
    created() {
        this.getclassifyIndex();
    },
    mounted() {
        this.getvideolists();
    },
    methods: {
        onLoad() {
            // console.log(66)
            // 异步更新数据
            this.page += 1
            // console.log(this.page,"this.page")
            this.getvideolists()
            console.log(111)

            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
           
        },
        videoTo(data) {
            this.$router.push({ name: "play", query: { id: data.id } })
        },
        getclassifyIndex() {
            classifyIndex({
                type: "experience,citytwocategory"
            }).then(res => {
                if (res.data.code == 200) {
                    this.mapList = res.data.data.citytwocategory.map(item => {
                        return { text: item.label, value: item.value }
                    })
                    this.experienceList = res.data.data.experience.map(item => {
                        return { text: item.name, value: item.id }
                    })

                }
            })
        },
        getvideolists() {
            videolists({
                title: this.title,
                province: this.mapValue,
                householdaddress: this.householdaddress,
                type: this.experience,
                page: this.page,
                pagesize: this.pagesize,
            }).then(res => {
                this.isLoading = false
                // console.log(res, "自动化案例");
                if (res.data.code == 200) {
                    // this.Videolists = res.data.data;
                    this.Videolists = this.Videolists.concat(res.data.data.data);
                    console.log(this.Videolists, "wwww")
                    if (this.pagesize > this.Videolists) {
                        // console.log(this.Videolists, 22);
                        this.finished = true;
                    }

                }
                // this.total = res.data.total
                // if (this.Videolists.length >=this.total) {
                //         this.finished = false
                // }
                // this.finished=true
                this.loading = false // 加载状态结束
            })
                .catch(err => {
                    console.log(err)
                    // console.log(res);

                })
        },


    }
}
</script>

<style lang="scss" scoped>
.custom_app {
    // height: 100%;
    position: absolute;
    width: 100%;
    // background-color: rgba(243, 243, 243, 1);
}

::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-weight: bold;
}

::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}

.fixed_div {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 888888888;
}

::v-deep .van-field__left-icon {
    margin-right: 5px;
    margin-top: 3px;
}

::v-deep .van-search__content {
    border: 1px solid #d0d0d0;
    background: #FFF;
}

.nav_right_flex {
    display: flex;

    .nav_right_item {
        margin-left: 10px
    }
}

.nav_right_flex {
    display: flex;

    .nav_right_item {
        margin-left: 10px
    }
}


.right_img {
    width: 20px;
    height: 20px;
    background: url("@/assets/automationimg1.png") no-repeat;
    background-size: 18px 18px;
    position: relative;

    .right_img_icon {
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: #007aff;
        border-radius: 50%;
        right: -1px;
        bottom: -1px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

}

.icon_img {
    top: 1px;
    left: 1px;
}

.videoBOX {
    width: 44%;
    flex: 1;
    margin: 10px;
    // margin-top: 15px;
    // margin-left: 15px;

    box-shadow: 1px 2px 2px rgb(153 153 153 / 35%);
    // height: 309px;
    // border: 1px solid red;
    border-radius: 10px;
    border-width: 1px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border-color: rgba(230, 230, 230, 1);
    display: inline-block;
    float: left;

    .province_tiltle {
        color: #333;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        width: 150px;
        font-size: 12px;
        font-weight: bold;
        margin-top: -10px;
    }

    .video_img {
        min-height: 186px;
        border-radius: 10px;
        position: relative;

        .isVideo {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: absolute;
            top: 70px;
            right: 66px;
            background: url("@/assets/videoPlary.png") no-repeat;
            background-color: rgba(0, 0, 0, 0.5);
            background-size: 50%;
            background-position-x: 15px;
            background-position-y: 11px;
        }

        .Video_company {
            position: relative;
            bottom: -23px;
            color: red;
            font-size: 12px;
            display: flex;
            margin-left: 10px;
            align-items: center;



            .title {
                margin-left: 5px;
                color: #586470;
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                margin-left: 30px;
                margin-top: -40px;
            }
        }

        // background: url("@/assets/u34\ \(1\).svg") 0 no-repeat;
    }
}

.province_Icon {
    font-size: 10px;
    letter-spacing: 1px;
    color: #909090;
    line-height: 25px;
    background: url("@/assets/map.png") no-repeat;
    background-size: 15px 15px;
    background-position-x: 0px;
    background-position-y: 3px;
    text-indent: 2em;
    margin-top: -5px;
}

.imgs {
    width: 100%;
    height: 186px;
    border-radius: 10px;
    position: relative;
}

.imgvideos {
    position: absolute;
    top: -33px;
    left: 5px;
    border-radius: 14px;
}
</style>