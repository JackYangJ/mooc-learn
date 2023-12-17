<template>
  <div class="wrap">
    <div class="middle">
      <div class="title">Welcome back....</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="loginType === 'login' ? rules : forgetRules"
        label-position="right"
        label-width="100px"
        style="max-width: 460px"
      >
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name" placeholder="username" />
        </el-form-item>
        <el-form-item v-if="loginType === 'login'" label="" prop="password">
          <el-input v-model="ruleForm.password" placeholder="password" type="password" />
        </el-form-item>
        <el-form-item label="" prop="verificationCode">
          <el-input v-model="ruleForm.verificationCode" placeholder="verification code" />
        </el-form-item>
        <div v-html="imgSvg" @click="getCaptcha"></div>
      </el-form>
      <a class="forget" @click="forgetPass">forgot password</a>
      <template v-if="loginType === 'login'">
        <div class="button login">Login</div>
        <div class="button sign-up">Sign up for an account</div>
      </template>
      <template v-else>
        <div class="button login">Send Email</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import axios from 'axios';
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  name: string
  password: string,
  verificationCode: string
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  password: '',
  verificationCode: '',
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input Activity password', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  verificationCode: [
    { required: true, message: 'Please input Activity verificationCode', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
})

const forgetRules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  verificationCode: [
    { required: true, message: 'Please input Activity verificationCode', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
})

// submit data validate
const submitForm = async (formEl: FormInstance | undefined) => {
  console.log('submitForm')
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const getCaptcha = async function () {
  axios.get('http://localhost:3000/getCaptcha').then(res => {
    console.log(res);
    if (res.data.code === 200) {
      imgSvg.value = res.data.msg;
    }
  })
}

const loginType = ref<String>('login')
const forgetPass = function() {
  loginType.value = 'forgetPass'
}

// const labelPosition = ref<FormProps['labelPosition']>('right')

const imgSvg = ref('')
onMounted(() => {
  getCaptcha()
})

</script>
<style scoped lang="scss">
  .wrap{
    background: #2b2a2a;
    height: 100%;
    width: 100%;
    .middle{
      margin: 0 auto;
      width: 300px;
      padding-top: 100px;
      .title{
        font-size: 30px;
        color: #ffffff;
        margin-bottom: 25px;
      }
      :deep .el-form {
        .el-form-item__content{
          margin-left: 0px !important;
          margin-bottom: 10px;
          .el-input__wrapper{
            border-radius: 32px;
            background: #3e3e3e;
          }
        }
      }
      .forget{
        font-size: 16px;
        color: #b4b4b4;
        text-decoration: underline;
        margin-top: 5px;
        margin-bottom: 5px;
        cursor: pointer;
      }
      .button{
          border-radius: 32px;
          line-height: 32px;
          text-align: center;
          font-size: 15px;
          width: 100%;
          height: 32px;
          margin-top: 15px;
        &.login{
          background: #9946c7;
          color: #ffffff;
        }
        &.sign-up{
          background: #2b2a2a;
          border: 1px solid #e4e4e4;
        }
      }
    }
  }
</style>