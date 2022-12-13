<template>
    <div class="appContent">
        <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft">
            <div class="nav_right_flex" slot="right">
                <div class="nav_purchase">
                    <img src="@/assets/u56.png" />
                </div>
            </div>
        </van-nav-bar>
        <van-notice-bar left-icon="info" :scrollable="false">账号密码修改成功后,请记住新密码方便下次登录时使用</van-notice-bar>

        <div class="infoUpdate">
            <van-cell-group>
                <van-field v-model="olPassword" placeholder="原密码" />
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="newPassword" placeholder="新密码" />
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="newPasswords" placeholder="确认密码" />
            </van-cell-group>
            <div class="submit">
                <van-button type="info" round class="btn" @click="submit">提交</van-button>

            </div>
        </div>
    </div>
</template>

<script >
import { Notify } from 'vant'
import { getmodifyPwd } from '@/api/user'
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
            olPassword: "", // 旧密码
            newPassword: "", // 新密码
            newPasswords: "", // 重复新密码
            // 不同状态的模拟
            status: 0
        }
    },
    methods: {
        ...mapMutations(['LoginOut']),
        submit() {
            // 校验 -- 旧密码不能和新密码一样
            if (this.olPassword == this.newPassword) {
                Notify({ type: 'danger', message: '新密码不能和旧密码一样' });
            }
            // 校验 -- 新密码 和 重复新密码不一样
            else if (this.newPassword != this.newPasswords) {
                Notify({ type: 'danger', message: '重复新密码和新密码不匹配' });
            } else {
                // 如果说正常的情况下
                getmodifyPwd({
                    uid: this.$store.state.userInfo.id,
                    oldPwd: this.olPassword,
                    newPwd: this.newPassword,
                    reNewPwd: this.newPasswords
                }).then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.LoginOut();
                        this.$router.push({ name: 'account' })
                        Notify({ type: 'success', message: '修改成功' });
                    }
                    else {
                        Notify({ type: 'danger', message: res.data.message });
                    }
                })
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