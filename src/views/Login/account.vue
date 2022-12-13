<template>
    <div>
        <div class="select"> 云售后 为生产保驾护航</div>
        <div class="InputBox">
            <input v-model="phone" class="phoneNumber" placeholder="请输入手机号码" type="text" />
            <input v-model="pwd" class="password" type="password" placeholder="请输入密码" />
            <div class="signIn" @click="loginClick">立即登录</div>
        </div>
        <!-- <div class="register" @click="registerClick">新用户注册申请</div> -->
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { getlogin } from '@/api/user'
import { Notify } from 'vant'
export default {
    data() {
        return {
            phone: "",
            pwd: ""
        }
    },
    created() {
        // this.login();
    },
    methods: {
        ...mapMutations(['SET_USERINFO']),
        registerClick() {
            this.$router.push("/login/userApplication");
        },
        login() {

        },
        loginClick() {
            
            getlogin({
                phone: this.phone,
                pwd: this.pwd,
                id:422,
            }).then(res => {
                if (res.data.code == 200) {
                    this.SET_USERINFO(res.data.data)
                    localStorage.setItem("userInfo", JSON.stringify(res.data.data))
                    localStorage.setItem("token", res.data.data.token)
                    // setTimeout(() => {
                    //延迟2秒后跳转
                    this.$router.push({ path: "/core/management" })
                    let token = res.data.token;
                    // console.log(token);
                    // }, 2000);
                } else {
                    Notify({ type: 'danger', message: res.data.message });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.select {
    color: #8B837B;
    font-weight: bold;
    font-size: 32px;
    text-align: center;
    margin-top: 150px;
}

.InputBox {
    margin-top: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.phoneNumber {
    border: 1px solid #DFDFDF;
    width: 70%;
    height: 30px;
    text-indent: 1em;
}

.password {
    border: 1px solid #DFDFDF;
    width: 70%;
    height: 30px;
    margin-top: 25px;
    text-indent: 1em;
}

.signIn {
    width: 70%;
    height: 40px;
    line-height: 40px;
    background: #409EFF;
    margin-top: 30px;
    text-align: center;
    border-radius: 8px;
    color: #FFFFFF;
    font-size: 14px;
}

.register {
    margin-top: 30px;
    // width: 120px;
    width: 100%;
    text-align: center;
    // margin-left: 35%;
    color: #409EFF;
    font-size: 14px;
    letter-spacing: 3px;
}
</style>