<template>
    <div class="heard_app">
        <div>
            <van-nav-bar title="查企业" left-arrow @click-left="onClickLeft">
                <div class="nav_right_flex" slot="right">
                    <div class="nav_right_item">
                        <img src="@/assets/u56.png" />
                    </div>
                </div>
            </van-nav-bar>
            <van-search v-model="key" placeholder="请输入企业名称" @search="search" />
        </div>
        <!-- <van-loading size="50px" v-show="isLoading" class="straining">加载中...</van-loading> -->

        <div class="enterprise_contents" v-if="checkEnterprise.length == 0 && isLoading == false">
            <div class="enterprise_imgs">
                <div> <img src="@/assets/u18.svg" /></div>
                <div style="margin-left:15px;">
                    <div class="enterpris_sorry">抱歉，找不到该企业售后信息</div>
                    <div class="supervise">邀请企业共同接受售后监督<span class="invitation">去邀请</span></div>
                </div>
            </div>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="gold_medal" v-show="checkEnterprise.length > 0">
                <div class="gold_head">
                    <img src="@/assets/u32.png" />
                    <div style="margin-left: 5px;">高评分企业</div>
                </div>

                <div class="gold_heads" v-for="(item, index) in checkEnterprise">
                    <div class="content_total" @click="informationClick(item)">
                        <div><img src="@/assets/empty_logo.jpg" class="empty_logo" /></div>
                        <div class="content_Title">
                            <div class="content_Name">
                                <div>{{ item.companyname }}</div>
                                <!-- <div><img src="@/assets/u25.png" class="content_Img" /></div> -->
                                <div>
                                    <img :src="item.setmeal_icon" class="content_Img" v-if="item.setmeal_icon" />
                                </div>
                            </div>
                            <div class="content_Partone">售后评分:<div class="content_score">{{ item.score }}</div>
                            </div>
                            <div class="content_Partone">擅长:
                                <div class="content_goodAt" v-for="household in item.householdaddress">{{ household
                                }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="tail_end">
                        <div class="tail_see" v-if="item.jobnum > 0">查看：<span class="tail_link">{{ item.jobname
                        }}</span>等{{ item.jobnum || '' }} 个案例</div>
                        <div class="tail_see" v-if="item.jobnum == 0"> 案例视频({{ item.videoCount }})</div>
                        <div>
                            <van-icon name="arrow" class="tail_cion" />
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
    </div>
</template>

<script>
import { getCompanyAfterSalesList } from '@/api/user'
export default {
    data() {
        return {
            checkEnterprise: [],
            key: '',
            list: [],
            loading: false,
            finished: false,
            isLoading: true,
            count: 0,
            page: 0,
            pagesize: 10,
        };
    },
    created() {
        // this.CompanyAfterSalesList();
    },
    methods: {
        //回调
        search(value) {
            this.key = value;
            this.CompanyAfterSalesList();
        },
        informationClick(data) {
            this.$router.push({ path: '/core/informationDetails', query: { id: data.id } })
        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/core/management')
        },
        onLoad() {
            // console.log(66)
            // 异步更新数据
            // if(!this.isLoading){
                this.page += 1
            // }
            console.log(this.page,"this.page")
            this.CompanyAfterSalesList()
        },
       
        CompanyAfterSalesList(init) {
            this.isLoading = true
            getCompanyAfterSalesList({
                page: this.page,
                pagesize: this.pagesize,
                key: this.key
            }).then(res => {
                this.isLoading = false
                if (res.data.code == 200) {
                    this.checkEnterprise = this.checkEnterprise.concat(res.data.data.list)
                    // console.log(this.checkEnterprise, 22);
                }
                // console.log(res.data.data.list.length,"d")
                if (this.pagesize > res.data.data.list.length) {
                    this.finished = true;
                }

                // this.total = res.data.total
               
                // if (this.checkEnterprise.length <= this.total) {
                //     if (res.data.total === 0) {
                //         this.finished = true
                //     }
                //     else {
                //         this.finished = false
                //     }
                // }
                // this.finished=true
                this.loading = false // 加载状态结束
            })
                .catch(err => {
                    console.log(err)
                    // console.log(res);

                })
        },
    },
};
</script>

<style lang="scss" scoped>
.heard_app {
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

::v-deep .van-icon {
    color: #CACACA;
    font-size: 15px;
}

.straining {
    text-align: center;
}

.enterprise_Name {
    background: #FFF;
    height: 95px;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    .enterprise_Name_input {
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

.gold_medal {
    background: #FFF;
}

.gold_heads {
    padding: 8px;
    border-bottom: 10px solid rgba(243, 243, 243, 1);
}

.gold_head {
    height: 50px;
    border-bottom: 1px solid rgb(243, 243, 243);
    line-height: 50px;
    display: flex;
    margin-left: 10px;
    align-items: center;
    margin-top: 10px;

    img {
        width: 18px;
        height: 18px;
    }
}

.content_total {
    display: flex;
    align-items: center;
    // margin-left: 20px;
    // margin-top: 15px
}

.empty_logo {
    width: 70px;
    height: 70px;
}

.content_Title {
    margin-left: 10px;
    padding-top: 12px;
}

.content_Name {
    display: flex;
    color: #333333;
}

.content_Img {
    margin-left: 8px;
    width: 20px;
    height: 20px;
}

.content_Partone {
    display: flex;
    color: #7F7F7F;
}

.content_score {
    color: #FF8E50;
    margin-top: 3px;
    margin-left: 10px;
}

.content_goodAt {
    font-size: 12px;
    background: rgb(233, 248, 255);
    // height: 25px;
    // line-height: 17px;
    margin-left: 10px;
    text-align: center;
    color: #409EFF;
}

.content_good {
    font-size: 14px;
    background: rgb(233, 248, 255);
    width: 40px;
    height: 25px;
    line-height: 17px;
    text-align: center;
    color: #409EFF;
    margin-left: 10px;
}

.tail_end {
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
}

.tail_see {
    align-items: center;
    // margin-left: 20px;
    margin-top: 18px;
    font-size: 14px;
    color: #7F7F7F;
}

.tail_link {
    color: #409EFF;
    padding: 5px;
}

.tail_cion {
    height: 20px;
    margin-top: 20px;
    // margin-left: 84px;
}

.gold_medalOne {
    //    border-top: 10px solid #F3F3F3;
    //    border-bottom: 10px solid #F3F3F3;
    background: #FFFF;
}

.enterprise_contents {
    text-align: center;
    background: #FFF;
    height: 100%;
    display: flex;
    margin-top: 10px;
    padding-top: 100px;
    flex-direction: column;
}

.enterpris_sorry {
    letter-spacing: 1px;
    line-height: 25px;
    font-size: 16px;
    margin-left: -40px;
}

.supervise {
    letter-spacing: 1px;
    color: #828282;
    line-height: 25px;
    font-size: 16px;
}

.invitation {
    font-size: 18px;
    letter-spacing: 1px;
    color: #409EFF;
    line-height: 25px;
}

.enterprise_imgs {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>