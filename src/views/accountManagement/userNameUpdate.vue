<template>
    <div class="appContent">
        <van-nav-bar title="修改用户名" left-arrow @click="UserNameClick" @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_purchase">
                    <img src="@/assets/u56.png" />
                </div>
            </div>
        </van-nav-bar>
        <div class="tips">
            用户名修改后,登录用户名也会同步修改哦!
        </div>
        <div class="infoUpdate">
            <van-cell-group>
                <van-field v-model="name" placeholder="请输入用户名" />
            </van-cell-group>
            <div class="submit">
                <van-button type="info" round class="btn" @click="submit">提交</van-button>

            </div>
        </div>
    </div>
</template>

<script >
import { Notify } from 'vant'
import {getmodifyUser} from '@/api/user'
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            value: "",
            name:"",
            // 不同状态的模拟
            status:0
        }
    },
    methods:{
         ...mapMutations(['LoginOut']),
        submit(){
             getmodifyUser({
                 uid:this.$store.state.userInfo.id,
                 name:this.name
            }).then(res=>{
                console.log(res)
            // if(this.status == 0){
            //     Notify({ type: 'danger', message: '新用户名不能和旧用户名一样' });
            // }
            if(res.data.code == 200){
               localStorage.setItem("userInfo",JSON.stringify({
                ...JSON.parse(localStorage.getItem('userInfo')),
                name:this.name
               }))
                // 如果修改成功 退出登录
                // this.LoginOut();
                // this.$router.push({ name: 'managementaccount' })
                // 因为go不会刷新页面
                // this.$router.go(-1)
                location.href = "/shx/accountManagement/managementaccount"
                 Notify({ type: 'success', message: '修改成功' });
            }
            else{
                Notify({ type: 'danger', message: res.data.message });
            }
            })
          
        },
        UserNameClick(){
            alert(1)
             if(to=="managementaccount"){
                this.$router.push({path:"/managementaccount/managementaccount"})
            }
        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/accountManagement/managementaccount')
        } 
    }
}
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-weight: bold;
}

::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}
.appContent {
    background-color: rgba(243, 243, 243, 1);
    height: 100%;
    position: absolute;
    width: 100%;
}

.infoUpdate {
    background-color: #FFF;
    height: 100%;
    padding: 10px;
}

.tips {
    height: 40px;
    color: #7B7B7B;
    font-size: 14px;
    line-height: 40px;
    text-indent: 2em;
}

.submit {
    width: 100%;
    height: 80px;
    background-color: #FFF;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
        width: 80%;
    }
}

</style><template>
    <div class="appContent">
        <van-nav-bar title="修改用户名" left-arrow @click="UserNameClick" @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_purchase">
                    <img src="@/assets/u56.png" />
                </div>
            </div>
        </van-nav-bar>
        <div class="tips">
            用户名修改后,登录用户名也会同步修改哦!
        </div>
        <div class="infoUpdate">
            <van-cell-group>
                <van-field v-model="name" placeholder="请输入用户名" />
            </van-cell-group>
            <div class="submit">
                <van-button type="info" round class="btn" @click="submit">提交</van-button>

            </div>
        </div>
    </div>
</template>

<script >
import { Notify } from 'vant'
import {getmodifyUser} from '@/api/user'
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            value: "",
            name:"",
            // 不同状态的模拟
            status:0
        }
    },
    methods:{
         ...mapMutations(['LoginOut']),
        submit(){
             getmodifyUser({
                 uid:this.$store.state.userInfo.id,
                 name:this.name
            }).then(res=>{
                console.log(res)
            // if(this.status == 0){
            //     Notify({ type: 'danger', message: '新用户名不能和旧用户名一样' });
            // }
            if(res.data.code == 200){
               localStorage.setItem("userInfo",JSON.stringify({
                ...JSON.parse(localStorage.getItem('userInfo')),
                name:this.name
               }))
                // 如果修改成功 退出登录
                // this.LoginOut();
                // this.$router.push({ name: 'managementaccount' })
                // 因为go不会刷新页面
                // this.$router.go(-1)
                location.href = "/shx/accountManagement/managementaccount"
                 Notify({ type: 'success', message: '修改成功' });
            }
            else{
                Notify({ type: 'danger', message: res.data.message });
            }
            })
          
        },
        UserNameClick(){
            alert(1)
             if(to=="managementaccount"){
                this.$router.push({path:"/managementaccount/managementaccount"})
            }
        },
        //路径跳转
        onClickLeft() {
            this.$router.push('/accountManagement/managementaccount')
        } 
    }
}
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-weight: bold;
}

::v-deep .van-nav-bar .van-icon {
    color: #A3A3A3;
    font-size: 20px;
}
.appContent {
    background-color: rgba(243, 243, 243, 1);
    height: 100%;
    position: absolute;
    width: 100%;
}

.infoUpdate {
    background-color: #FFF;
    height: 100%;
    padding: 10px;
}

.tips {
    height: 40px;
    color: #7B7B7B;
    font-size: 14px;
    line-height: 40px;
    text-indent: 2em;
}

.submit {
    width: 100%;
    height: 80px;
    background-color: #FFF;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
        width: 80%;
    }
}

</style>