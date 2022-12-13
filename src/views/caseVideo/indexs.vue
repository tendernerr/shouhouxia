<template>
    <div class="video">
        <!-- 导航 -->
        <van-nav-bar left-arrow @click-left="onClick">
            <div slot="title" class="nav_title">
                <div class="nav_title_item" v-for="(item, index) in navTitleType" @click="navtitleActive(index)"
                    :class="navTitleActive == index ? 'nav_title_itemActive' : ''">
                    {{ item }}
                </div>

            </div>
            <div class="nav_right_flex" slot="right" @click-left="onClickLeft">
                <div class="nav_right_item">
                    <div class="right_img">
                        <div class="right_img_icon">
                            <van-icon name="success" color="#FFFFFF" size="10" class="icon_img" />
                        </div>
                    </div>
                </div>
                <div class="nav_right_item">
                    <img src="@/assets/head_more_ico_wh.53485aa.png" width="15px" height="15px" />
                </div>
            </div>
        </van-nav-bar>
        <VideoPlay ref="playVideo"></VideoPlay>
    </div>
</template>

<script >
import { videolists, videoDetail } from '@/api/user'
import VideoPlay from "./videoPlay.vue";
export default {
    data() {
        return {
            // navTitleType: ["热门", "最新", "附近"],
            navTitleType: [],
            navTitleType: [],
            navTitleActive: 1,
            videolist: [],
        }
    },
    mounted() {
        // 查询列表
        videolists({

        }).then(res => {
            // 获取到一个播放列表方便我们有下面滚动的东西
            this.videolist = res.data.data.map(item => {
                return {
                    url: item.video_src,
                    cover: item.video_src + '?vframe/jpg/offset/1',
                    follow: false,
                    loveCount: 24,
                    shareCount: 12,
                    name: item.companyname,
                    title: item.title,
                    avatar_src:item.avatar_src,
                    buyShopList: [...item.job_list]
                }
            });
            // 然后查询单个详情
            this.getvideolists();

        })
    },
    methods: {
        navtitleActive(idx) {
            this.navTitleActive = idx;
        },
        // 查询id详情
        getvideolists() {
            // 查询的接口
            videoDetail({
                id: this.$route.query.id, // 路由来的ID
                type: 1
            }).then(res => { 
                if (res.data.code == 200) {
                    // 查询出单个详情后 他是一个对象
                    let item = res.data.data
                    // 给播放组件赋值 播放的肯定第一个必须使我们详情来的 数组里面首个插入 再把列表查询出来的放在后面
                    // 举个例子
                    this.$refs.playVideo.videoList = [{
                        url: item.video_src,
                        cover: item.video_src + '?vframe/jpg/offset/1',
                        follow: false,
                        loveCount: 24,
                        shareCount: 12,
                        name: item.companyname,
                        title: item.title,
                        avatar_src:item.avatar_src,
                        buyShopList: [...item.job_list]
                    }, ...this.videolist]
                }
            })

        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/caseVideo/automationCase')
        },
        onClick(data){
            console.log(data,"data");
            this.$router.go(-1);
            // this.$router.push({ path: '/core/informationDetails', query: { id: data.id } })
        },

    },
    components: {
        VideoPlay
    }
}
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}

.nav_right_flex {
    display: flex;

    .nav_right_item {
        margin-left: 10px
    }
}

.nav_title {
    width: 200px;
    display: flex;
    justify-content: space-around;

    .nav_title_item {
        cursor: pointer;
    }

    .nav_title_itemActive {
        font-weight: bold;
    }
}

::v-deep {
    .van-hairline--bottom::after {
        border-bottom-width: 0px;
    }

    .van-nav-bar__title {
        color: #FFF;

    }

    .van-nav-bar {
        position: absolute;
        top: 0;
        width: 100%;
        background-color: rgba(255, 255, 255, 0);
    }
}

.right_img {
    width: 20px;
    height: 20px;
    background: url("@/assets/head_user_ico.png") no-repeat;
    background-size: 18px 18px;
    position: relative;

    .right_img_icon {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #007aff;
        border-radius: 50%;
        right: -1px;
        bottom: -1px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

}
</style>