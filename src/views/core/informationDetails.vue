<template>
    <div class="large">
        <van-nav-bar title="公司详情" left-arrow @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_right_item">
                    <div class="right_img">
                        <div class="right_img_icon">
                            <!-- <van-icon name="success" color="#FFFFFF" size="10" class="icon_img"/> -->
                        </div>
                    </div>
                </div>
                <div class="nav_right_item">
                    <img src="@/assets/automationImg.png" width="15px" height="15px" class="imgss" />
                </div>
            </div>
        </van-nav-bar>
        <div class="large_Frame">
            <van-notice-bar class="large_bar" :scrollable="true">我们敢于让第三方监督平台监督我们的售后，</van-notice-bar>
            <div class="large_form" @click="largeformClick">了解平台监督机制>></div>
        </div>
        <div class="merchant">
            <div class="merchantInfo">
                <div class="merchantInfo_left">
                    <div class="large_company">{{ details.companyname }}</div>
                    <div class="merchantInfo_auth">
                        <div class="Nameplate">行业大牛</div>
                        <div><img src="@/assets/u7.png" style="width:16px;height:18px;" /></div>
                        <div><img src="@/assets/u43 (1).png" /></div>
                        <div class="score"> 售后评分:<span class="num">&nbsp;{{ details.score }}</span></div>
                    </div>
                    <div class="merchantInfo_auth_tag">
                        <div>擅长：</div>
                        <div class="merchantInfo_auth_item" v-for="item in details.householdaddress">{{ item }}</div>
                    </div>
                </div>
                <div class="merchantInfo_right">
                    <div>
                        <img src="@/assets/empty_logo.jpg" style="width:80px;height:80px" />
                    </div>
                </div>
            </div>
            <div class="desc">主营产品： <span>{{ details.main_product }}</span> </div>
        </div>
        <div class="box_2">
            <div class="cell">企业认证</div>
            <div class="cell">多重审核</div>
            <div class="cell">信誉担保</div>
            <div class="cell">违规严惩</div>
            <!-- <div class="auth_imgs"> -->
            <!-- <img style="width:15px;height:15px; margin-left: -327px;" src="@/assets/job_show_auth_ico.1590172.png" /> -->
            <div class="auth">
                <div class="auth_ico"></div>
                <div class="auth_size">认证</div>
            </div>
            <!-- </div> -->
            <div class="bg_box"></div>
        </div>
        <div style="background:#FFF;">
            <van-tabs v-model="active" color="#1787fb" title-active-color="#1787fb">
                <van-tab title="公司介绍">
                    <div class="brief_introduction">公司简介</div>
                    <div class="abundant">
                        {{ details.content }}</div>
                    <div class="companyStyle" v-if="hasImgList">
                        <div id="brief_wind">公司采风</div>
                        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                            <van-swipe-item v-for="itemImg in details.img_list">
                                <div class="swiper_item">
                                    <img style="width:100%;height:250px" :src="itemImg.img_src" />
                                </div>
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                    <div class="box_4" v-if="base_info.address != ''">
                        <div class="put">
                            <div class="brief_address">公司地址</div>
                            <!-- <div class="distance" v-if="distance != ''">距您{{ distance }}</div> -->
                            <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
                        </div>
                        <div class="address">
                            {{ base_info.address }}
                        </div>
                        <div class="bg">
                            <div class="box" @click="locationToBdmap">
                                <div class="tx1">{{ base_info.companyname }}</div>
                                <div class="tx2">{{ base_info.address }}</div>
                            </div>
                        </div>
                    </div>
                    <div style="display:flex; position: fixed; bottom: 0px;  width: 100%;">
                        <div class="complaint_square" @click="squareClick">查看投诉广场</div>
                        <div class="introduce_love" @click="getaddBeckon"> <img src="@/assets/u45.svg" width="24px"
                                height="20px" />
                            <div style="margin-left: 10px;">{{ this.details.beckon }}</div>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="客户反馈">
                    <div style="margin-bottom: 40px;">
                        <div>
                            <div style="margin-top: 12px;">
                                <div v-for="(select, index) in custSelect"
                                    :class="select.isActive ? 'praise' : 'poor_evaluation'">
                                    {{ select.name }}</div>
                            </div>
                            <!-- ({{ select.count }}) -->
                            <!-- 上面的点击事件 @click="selectScreen(select)" -->
                            <!-- <div style="display:flex;margin-top: 12px;">
                                <div class="praise">职业素养高(3)</div>
                                <div class="poor_evaluation">态度不好(0)</div>
                                <div class="poor_evaluation">工具不全(0)</div>
                                <div class="poor_evaluation">现场未整理(0)</div>
                            </div> -->
                            <!-- <div style="margin-top: 15px;">zheg
                                <div class="Rating_Title"> 售后侠<span style="color: #FF8E50;"> 售后评分标准</span>:</div>
                                <div class="Rating_content">
                                    <div> 1.客户签订合同后，是否主动为客户创建云售后服务文档； </div>
                                    <div> 2.是否定期回访客户设备使用情况； </div>
                                    <div> 3.是否按时准点提醒客户给设备做保养和检修； </div>
                                    <div> 4.设备发生严重故障时是否履行合同约定时间上门维修；</div>
                                </div>
                            </div> -->
                        </div>
                        <div v-for="(item, index) in customerFeedback" style="clear:both;margin-top: 10px;">
                            <div style="border-bottom:1.4px solid #E6E6E6;padding: 0px 0px 10px 0px;">
                                <div class="Scoring_div">
                                    <div style="display: flex;align-items: center;">
                                        <img src="@/assets/u46.png" width="48px" height="45px" />
                                        <div class="Scoring_company">{{ item.comapany_name }}</div>
                                    </div>
                                    <!-- <div class="Scoring_company">深圳****公司</div> -->
                                    <div class="Scoring_equipment">
                                        <span style="color: #FF4000;margin-left: 150px;">{{ item.score }}分</span>
                                    </div>
                                </div>
                                <div style="margin-top: 15px;margin-left: 15px;">
                                    <div class="Scoring_equipment">设备名称：<span style="font-size: 14px;color: #6A6A6A;">{{
                                            item.device_name
                                    }}</span></div>
                                    <!-- <div class="Scoring_equipment">用户评分：<span style="color: #FF4000;">{{ item.score
                                    }}分</span></div> -->
                                    <div class="Scoring_equipment">购买时间：<span>{{ item.addtime }}</span></div>
                                    <!-- <div class="Scoring_equipment">主营产品：<span style="color: #6A6A6A;">{{
                                    item.main_product
                                    }}</span></div> -->
                                    <div class="Scoring_equipment">主营产品：<span style="color: #409EFF;"
                                            @click="tempImgShow(item)">立即查看>></span></div>
                                </div>
                            </div>
                        </div>
                        <div style="display:flex; position: fixed; bottom: 0px;  width: 100%;">
                            <div class="complaint_square"> 查看投诉广场</div>
                            <div class="introduce_love" @click="getaddBeckon"> <img src="@/assets/u45.svg" width="24px"
                                    height="20px" />
                                <div style="margin-left: 10px;">{{ this.details.beckon }}</div>
                            </div>
                        </div>
                    </div>

                </van-tab>
                <van-tab title="视频">
                    <div v-for="video in videoList">
                        <div class="videoBOX" @click="videoClick(video)">
                            <div class="video_img">
                                <img class="imgs" :src="video.video_src + '?vframe/jpg/offset/1'" />
                                <div class="isVideo"></div>
                                <div class="Video_company">
                                    <div class="title"> {{ video.companyname }} </div>
                                </div>
                            </div>
                            <div style="margin: 20px 10px 0px 10px;">
                                <div class="province_tiltle">{{ video.title }}</div>
                                <div class="province_Icon">{{ video.address }} </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="contact" @click="handlePoster">
            联系方式
        </div>
        <van-dialog v-model="show" show-cancel-button>
            <div class="aboutUs">联系我们</div>
            <div class="contact_Information">
                <div style=" display: flex;">联系人<div style="margin-left:15px;">{{ details.contact.contact }}</div>
                </div>
                <div style=" display: flex;">岗位<div style="margin-left:26px;">{{ details.contact.post }}</div>
                </div>
                <div style=" display: flex;">电话<div style="margin-left:26px;color: #409EFF;"
                        @click="dialMobile(details.contact.mobile)">{{ details.contact.mobile }}</div>
                </div>
                <div style=" display: flex;">微信<div style="margin-left:26px;">{{ details.contact.weixin }}</div>
                </div>
                <div style=" display: flex;">邮箱<div style="margin-left:26px;">{{ details.contact.email }}</div>
                </div>
            </div>
        </van-dialog>
        <!-- 图片展示 -->

        <!-- <van-overlay :show="imgShow" @click="imgClose"> -->
        <!-- <div class="wrapper">
                <img :src="item.name" style="width:100px;height:100px" v-for="item in tempImgDetail" />
            </div> -->
        <van-image-preview v-model="showImg" :images="result" @change="onChange">
        </van-image-preview>
        <!-- </van-overlay> -->

        <!--
      <div> <div>
          <div class="box_4" v-if="base_info.address != ''">
            <div class="address">
              {{ base_info.address }}
            </div>
            <div class="bg">
              <div class="box" style="width: 96%;" @click="locationToBdmap">
                <div class="tx1">{{ base_info.companyname }}</div>
                <div class="tx2">{{ base_info.address }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    -->
    </div>
</template>

<script>
import { Notify } from 'vant';
import { getCompanyAfterSalesShow, getFeedback, getShortVideoList, addBeckon } from '@/api/user'
export default {
    data() {
        return {
            showImg: false,
            index: 0,
            // images: [],
            center: { lng: 0, lat: 0 },
            zoom: 3,
            active: 0,
            base_info: {},
            distance: '',
            details: {
                contact: {
                    contact: ""
                }
            },
            custSelect: [],
            customerFeedback: [],
            videoList: [],
            num: 0,
            show: false,
            // 图片展开逻辑
            imgShow: false,
            tempImgDetail: [], // 存放临时图片数据
            hasImgList: false,
            result: [],
        }
    },
    // computed:{
    //     fabulous(){
    //         return this.details.beckon
    //     }
    // },
    mounted() {
        //   console.log(this.$route.query)
        // this.CompanyAfterSalesList();
        this.CompanyAfterSalesShow();
        this.Feedback();
        this.ShortVideoList();
    },
    methods: {
        onChange(index) {
            this.index = index;
        },
        videoClick(data) {
            this.$router.push({ name: "plays", query: { id: data.id } })
        },
        // 筛选
        selectScreen(data) {
            // 浅拷贝 永远等于相反值 如果是 true就会改成false
            data.isActive = !data.isActive
            // 重新搜索
            this.feedQuery();
        },
        // 图片关闭
        imgClose() {
            // this.imgShow = false;
            this.showImg = false;
        },
        // 图片展开
        tempImgShow(data) {
            // 图片数据赋值给临时数据集合
            this.tempImgDetail = data.product_img
            this.result = []
            this.tempImgDetail.forEach(el => {
                this.result.push(el.name)
            })
            // console.log(this.result, "result");
            // console.log(this.tempImgDetail, "tempImgDetail");
            // 展开图片
            // this.imgShow = true;
            if (this.result == '') {
                Notify({ type: 'success', message: '暂无图片' });
            } else {
                this.showImg = true;
            }


        },
        handler({ BMap, map }) {
            // console.log(BMap, map)
            this.center.lng = 116.404
            this.center.lat = 39.915
            this.zoom = 15
        },
        maponLoad() {

        },
        //查询详情数据
        CompanyAfterSalesShow() {
            getCompanyAfterSalesShow({ id: this.$route.query.id }).then(res => {
                // console.log(res, "查询详情数据");
                this.details = res.data.data;
            })
        },
        dialMobile(phone) {
            window.location.href = `tel:${phone}`;
        },
        locationToBdmap() {
            if (!this.base_info.map_lat || !this.base_info.map_lng) {
                return false
            }
            let url =
                'http://api.map.baidu.com/marker?location=' +
                this.base_info.map_lat +
                ',' +
                this.base_info.map_lng +
                '&title=' +
                this.base_info.companyname +
                '&content=' +
                this.base_info.address +
                '&output=html'
            window.location.href = url
        },
        async fetchData(next_method = null) {
            const params = {
                id: this.query_id
            }
            let res = await http.get(api.companyshow, params)
            const {
                base_info,
                field_rule,
                img_list,
                report,
                fans,
                watch_percent,
                has_attention
            } = { ...res.data }
            this.field_rule = field_rule
            this.base_info = base_info
            this.contacts = res.data.base_info.contact
            this.business = res.data.base_info.business
            this.img_list = img_list
            this.report = report
            this.fans = fans
            this.watch_percent = watch_percent
            this.has_attention = has_attention
            let wechatShareInfo = {
                companyname: base_info.companyname,
                district: base_info.district_text,
                nature: base_info.nature_text,
                trade: base_info.trade_text,
                imgUrl: base_info.logo_src
            }
            wxshare(wechatShareInfo, 'companyshow', location.href)
            this.getPosition(this.base_info.map_lat, this.base_info.map_lng)
            if (next_method !== null) {
                this[next_method]()
            } else {
                this.getJoblist()
            }
        },
        feedQuery() {
            let arr = this.custSelect.filter(item => {
                return item.isActive == true;
            })
            getFeedback({
                comid: this.$route.query.id,
                satisfaction: arr.map(item => {
                    return item.name
                })
            }).then(res => {
                if (res.data.code == 200) {
                    this.customerFeedback = res.data.data.data;

                }
            })
        },
        //客户反馈
        Feedback() {
            getFeedback({
                comid: this.$route.query.id,
            }).then(res => {
                // console.log(res, "客户反馈");
                this.customerFeedback = res.data.data.data;
                this.custSelect = res.data.data.select.map(item => {
                    item.isActive = true
                    return item
                });
            })
        },
        //视频
        ShortVideoList() {
            //    this.fabulous+=this.fabulous
            getShortVideoList({
                comid: this.$route.query.id,
            }).then(res => {
                // console.log(res, "视频");
                this.videoList = res.data.data;
            })
        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/queryEnterprise/querySales')
        },
        largeformClick() {
            // console.log((this.$route.query.id));
            // this.$router.push('/core/announcementDetails')
            this.$router.push({ path: '/core/announcementDetails', query: { comid: this.$route.query.id } })
        },
        //公司介绍投诉广场（跳转）
        squareClick() {
            this.$router.push('/core/complaintSquare')
        },
        //点赞接口
        getaddBeckon() {
            // this.details.beckon += 1
            let params = {
                id: this.$route.query.id,
            }
            addBeckon(params).then(res => {
                if (res.data.code == 200) {
                    if (res.data.message == "谢谢点赞！") {
                        Notify({ type: 'primary', message: '取消点赞成功!' });
                        this.details.beckon -= 1
                    } else {
                        Notify({ type: 'primary', message: '点赞成功' });
                        this.details.beckon += 1
                    }

                    // this.details.beckon -= 1
                } else {

                }
            })
        },
        handlePoster() {
            // console.log(1);
            this.show = true
        },

    }
}

</script>

<style lang="scss" scoped>
::v-deep .van-image-preview {
    z-index: 8889 !important;
}

.imgs {
    width: 100%;
    height: 186px;
    border-radius: 10px;
    position: relative;
}

::v-deep {
    .van-overlay {
        z-index: 8889 !important;
    }

    .van-dialog {
        z-index: 8890 !important;
    }

    .van-notice-bar {
        width: 137%
    }
}

::v-deep .van-nav-bar__right {
    font-size: 20px;
    cursor: pointer;
}

::v-deep .van-nav-bar .van-icon {
    color: #333333;
    font-size: 22px;
}

::v-deep .van-nav-bar__title {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
}

.abundant {
    color: #333333;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 25px;
    margin: 18px 20px 0px 20px;
}

.aboutUs {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;
    letter-spacing: 1px;
    color: #333333;
    margin: 12px;
}

.contact_Information {
    color: #6c6c6c;
    font-size: 15px;
    line-height: 25px;
    margin: 12px;

}

.right_img {
    background: url("@/assets/automationimg1.png") no-repeat;
    width: 36px;
    height: 22px;
    background-size: 18px 18px;
    position: absolute;
    left: 20px;
    top: 15px;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 120px;
    height: 120px;
    background-color: #fff;
}

.imgss {
    margin-left: 35px;
}

.givethe_thumbs {
    color: #FFF;
    width: 50%;
    background-color: rgba(255, 142, 80, 1);
    height: 40px;
    box-shadow: none;
    line-height: 40px;
    text-align: center;
    font-size: 13px;
}

.complaint_square {
    color: #FFF;
    width: 50%;
    background-color: rgba(64, 158, 255, 1);
    height: 40px;
    box-shadow: none;
    line-height: 40px;
    text-align: center;
    font-size: 13px;
}

.introduce_love {
    color: #FFF;
    display: flex;
    width: 50%;
    background-color: rgb(255, 142, 80);
    height: 40px;
    box-shadow: none;
    line-height: 40px;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.map {
    width: 100%;
    height: 200px;
}

.province_tiltle {
    line-height: 25px;
    font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;
    letter-spacing: 1px;
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
}

.videoBOX {
    overflow: hidden;
    height: 255px;
    width: 165px;
    margin-top: 15px;
    margin-left: 15px;
    box-shadow: 5px 5px 5px rgb(153 153 153 / 35%);
    // height: 268px;
    border: 1px solid red;
    border-radius: 10px;
    border-width: 1px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border-color: rgba(230, 230, 230, 1);
    display: inline-block;
    float: left;

    .video_img {
        width: 165px;
        height: 186px;
        border-radius: 10px;
        border: 1px solid;
        position: relative;

        .isVideo {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: absolute;
            top: 70px;
            right: 65px;
            background: url("@/assets/videoPlary.png") no-repeat;
            background-color: rgba(0, 0, 0, 0.5);
            background-size: 50%;
            background-position-x: 15px;
            background-position-y: 11px;
        }

        .Video_company {
            position: absolute;
            bottom: -23px;
            color: red;
            font-size: 12px;
            display: flex;
            margin-left: 10px;
            align-items: center;

            .title {
                margin-left: 5px;
                color: #575757;
                -webkit-line-clamp: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                margin-right: 5px;
            }
        }

        // background: url("@/assets/u34\ \(1\).svg") 0 no-repeat;
    }
}





.Scoring_div {
    display: flex;
    margin-left: 10px;
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;
}

.Scoring_company {
    color: #6A6A6A;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 35px;
    margin-left: 10px;
}

.Scoring_equipment {
    letter-spacing: 1px;
    line-height: 35px;
    color: #4A4A4A;
    padding-right: 12px;
}

.Rating_Title {
    font-family: '微软雅黑', sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    font-size: 14px;
    letter-spacing: 2px;
    margin-left: 10px;
    line-height: 25px;
}

.Rating_content {
    margin-left: 10px;
    font-size: 11px;
    color: #6E6E6E;
    margin-top: 10px;
    letter-spacing: 2px;
    line-height: 25px;
    font-family: '微软雅黑', sans-serif;
}

.praise {
    font-size: 12px;
    letter-spacing: 1px;
    color: #409EFF;
    line-height: 20px;
    background: #E9F8FF;
    margin-left: 12px;
    padding: 2px;
    border-radius: 5px;
    float: left;
    width: 105px;
    margin-bottom: 10px;
    text-align: center;
}

.poor_evaluation {
    font-size: 12px;
    letter-spacing: 1px;
    color: #FFFF;
    line-height: 24px;
    background: #D9D9D9;
    margin-left: 12px;
    // padding: 2px 10px;
    border-radius: 5px;
    float: left;
    width: 105px;
    margin-bottom: 10px;
    text-align: center;
}

.contact {
    //   background-color: rgba(0, 0, 0, 0.5);
    // width: 40px;
    // height: 40px;
    // color: #FFF;
    // border-radius: 50%;
    // padding: 5px;
    // font-size: 14px;
    // text-align: center;
    // position: fixed;
    // z-index: 8;
    // top: 580px;
    // right: 30px;
    // cursor: pointer;
    position: fixed;
    z-index: 1;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    right: 10px;
    bottom: 65px;
    font-size: 14px;
    color: #fff;
    line-height: 20px;
    text-align: center;
    padding: 5px;
}

.companyStyle {
    padding: 20px;
    background-color: #FFF;

    .swiper_item {
        position: relative;
    }
}

.box_2 {
    position: relative;
    // width: 100%;
    background-color: #eef9ff;
    overflow: hidden;
    padding-left: 35px;

    .cell {
        width: 80px;
        float: left;
        font-size: 13px;
        color: #5f82a7;
        padding: 10px 0;
        background: url('@/assets/images/done_ico_blue.svg') 0 center no-repeat;
        background-size: 12px;
        text-align: center;
        text-indent: 20px;
        background-position-x: 8px;

    }

    .auth_imgs {
        background: url("@/assets/job_show_auth_ico.1590172.png") no-repeat top center;
        background-size: 15px 15px;
    }

    .auth {
        position: absolute;
        left: 0px;
        z-index: 8888;

        .auth_ico {

            top: 10px;
            left: 3px;
            font-size: 12px;
            z-index: 8;
            display: inline-block;
            height: 34px;
            background-position-y: 0px;
            margin-left: 17px;
            width: 15px;
            height: 14px;
            background: url("@/assets/job_show_auth_ico.1590172.png") 0 center no-repeat;
            background-size: 13px 13px;
        }

        .auth_size {
            position: absolute;
            top: 14px;
            left: 4px;
            font-size: 11px;
            width: 40px;
            color: #FFF;
        }
    }


    .bg_box {
        position: absolute;
        left: -18px;
        top: 1px;
        width: 40px;
        height: 100%;
        background: linear-gradient(to right, #3b9dfe, #6fc9ff);
        z-index: 1;
        transform: rotate(50deg);
    }
}

.box_4 {
    padding: 0px 20px 20px 20px;
}

.large {
    // background-color: rgba(243, 243, 243, 1);
    // height: 100%;
    position: absolute;
    width: 100%;
}

.merchant {
    background-color: #FFF;
    padding: 10px;

    .desc {
        margin-top: 10px;
        font-size: 10px;
        letter-spacing: 1px;
        color: #909090;
        line-height: 20px;
    }

    .merchantInfo {
        display: flex;

        justify-content: space-between;

        .merchantInfo_right {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .merchantInfo_left {
            .merchantInfo_auth_tag {
                display: flex;
                align-items: center;
                color: #7F7F7F;
                font-size: 12px;

                .merchantInfo_auth_item {
                    color: #409EFF;
                    background-color: rgba(233, 248, 255, 1);
                    margin-right: 5px;
                    padding: 0px 0px 0px 10px;
                }
            }

            .merchantInfo_auth {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 10px 0;
                font-size: 12px;
                color: #7F7F7F;

                div {
                    margin-right: 5px;

                }

                .score {
                    margin-left: 10px;

                    .num {
                        font-size: 16px;
                        color: #FF8E50;
                    }
                }

                .Nameplate {
                    color: #FFF;
                    font-size: 14px;
                    padding: 2px 8px;
                    background: linear-gradient(270deg, rgba(255, 255, 255, 1) -0%, rgba(255, 156, 122, 1) -0%, rgba(255, 85, 28, 1) 49%, rgba(255, 64, 0, 1) 96%);
                }
            }

            .large_company {
                font-family: 'Arial Normal', 'Arial', sans-serif;
                font-weight: 400;
                font-style: normal;
                font-size: 17px;
                letter-spacing: 1px;
                margin: 10px 0;
                // line-height: 30px;
            }
        }

    }
}



.large_Frame {
    display: flex;
    width: 100%;
    align-items: center;
    background: #E9F3FF;

    .large_bar {
        color: rgb(255, 142, 80);
        font-family: 微软雅黑, sans-serif;
        font-weight: 400;
        background: #E9F3FF;
    }

    .large_form {
        width: 100%;
        font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑', sans-serif;
        font-weight: 700;
        font-size: 14px;
        color: #409EFF;
    }
}

// .large_company {
//     font-family: 'Arial Normal', 'Arial', sans-serif;
//     font-weight: 400;
//     font-style: normal;
//     font-size: 17px;
//     letter-spacing: 1px;
// }
::v-deep .van-tab--active {
    font-size: 20px;
    font-weight: 700;
}

::v-deep .van-tab {
    font-size: 20px;
    font-weight: 700;
    color: #323233;
}

.brief_introduction {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    letter-spacing: 1px;
    margin: 10px 0px 0px 20px;
}

.brief_content {
    color: #333333;
    font-size: 12px;
    letter-spacing: 1px;
    line-height: 25px;
    margin: 20px 20px 0px 20px;
}

#brief_wind {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    letter-spacing: 1px;
}

::v-deep .companyStyle .swiper_item[data-v-255b43bc] {
    margin-top: 20px;
}

.brief_address {
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    letter-spacing: 1px;
    margin-bottom: 10px;
}
</style>