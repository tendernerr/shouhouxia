<template>
  <div>
    <div class="afterSales">云售后用户申请</div>
    <div class="form_Content">
      <div class="form-content-box">


        <div class="form_content_item">
          <div class="tag"><label class="enterpriseTypesNone"></label></div>
          <div class="title_label">公司名称 : </div>
          <div> <input v-model="company_name" class="corporateName" /> </div>
        </div>
        <div class="form_content_item">
          <div class="tag"><label class="enterpriseTypes"></label></div>
          <div class="title_label">企业类型 : </div>
          <div> <select style="width: 203px;height: 24px;outline: none;" v-model="company_type">
              <option style="border-bottom: 0px;margin-top: 5px" value="设备生产方">设备生产方</option>
              <option value="设备使用方">设备使用方</option>
            </select></div>
        </div>
        <div class="form_content_item">
          <div class="tag"><label class="enterpriseTypes"></label></div>
          <div class="title_label">联系人 : </div>
          <div> <input class="corporateName" v-model="contact_name" /> </div>
        </div>
        <div class="form_content_item">
          <div class="tag"><label class="enterpriseTypes"></label></div>
          <div class="title_label">联系电话 : </div>
          <div> <input class="corporateName" v-model="phone" /> </div>
        </div>
        <div style="margin-left: 35px;">
          <div class="signIn" @click="getsalesRegisterApply">立即申请使用</div>
        </div>
      </div>
    </div>
    <div class="desc">
      <div>注册说明：</div>
      <div class="instructions">提交申请后，工作人员会在1小时内联系您，请注意来电提醒，感谢您的使用！</div>
    </div>
    <!-- <van-button type="primary" text="组件调用" @click="showNotify" /> -->
    <van-notify v-model="show" type="success">
      <van-icon name="bell" style="margin-right: 4px;" />
      <span>提交成功，请注意来电提醒</span>
    </van-notify>
  </div>
</template>

<script>
import { salesRegisterApply } from '@/api/user'
import { Notify } from 'vant'
export default {
  data() {
    return {
      company_name: "", // 公司名称
      company_type: "", // 企业类型.
      contact_name: "", // 联系人
      phone: "", //联系电话
      show: false,
    }
  },
  created() {
    // this.getsalesRegisterApply();
  },
  methods: {
    getsalesRegisterApply() {
      if (!this.company_name) {
        Notify({ type: 'danger', message: '请输入公司名称' })
      } else if (!this.company_type) {
        Notify({ type: 'danger', message: '请选择企业类型' })
      } else if (!this.contact_name) {
        Notify({ type: 'danger', message: '请输入联系人' })
      } else if (!this.phone) {
        Notify({ type: 'danger', message: '请输入联系电话' })
      } else {
        salesRegisterApply({
          company_name: this.company_name,
          company_type: this.company_type,
          contact_name: this.contact_name,
          phone: this.phone
        }).then(res => {
          console.log(res);
          if (res.status == 200) {
            this.showNotify();
            this.clear();
          } else {
            Notify({ type: 'danger', message: '提交失败' })
          }
        })
      }

    },
    // 简单清空
    clear() {
      this.company_name = ""
      this.company_type = ""
      this.contact_name = ""
      this.phone = ""
    },
    showNotify() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 1000000);
    },
  },

}
</script>

<style lang="scss" scoped>
::v-deep {
  .van-notify--success {
    margin-top: 50px;
    background-color: rgba(240, 249, 235, 1);
    height: 50px;
    color: #67C23A;
    margin-left: 18px;
    width: 90%;
  }
}

::v-deep .van-icon-bell:before {
  background-size: 18px;
  content: url('@/assets/u27.svg')
}

.form-content-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;

}

.form_Content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;


  .form_content_item {
    display: flex;
    justify-content: left;
    // margin: 6px 0;
    margin: 20px 32px 0px 0px;

    .title_label {
      width: 80px;
    }

    .tag {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0px;
      width: 20px;
      padding: 0px 10px 0px 0px;
    }

    .enterpriseTypes {
      margin-right: 5px;
    }

    .title_label {
      margin-right: 5px;
    }

    div {
      display: inline-block;

    }

    option {
      margin-top: 3px;
    }
  }

}

.afterSales {
  color: #8B837B;
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  margin-top: 50px;
}

.signIn {
  width: 150px;
  height: 30px;
  line-height: 30px;
  background: #409EFF;
  margin-top: 30px;
  text-align: center;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 14px;
}

.enterpriseTypes {
  margin-top: 30px;
}

label.enterpriseTypes:before {
  content: '* ';
  color: red;
}

.desc {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;
  padding: 0 43px;
  letter-spacing: 1px;
  line-height: 25px;
  font-size: 13px;

  .instructions {

    text-align: left;
  }
}
</style>