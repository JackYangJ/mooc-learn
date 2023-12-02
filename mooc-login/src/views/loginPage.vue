<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-position="right"
    label-width="100px"
    style="max-width: 460px"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item label="验证码" prop="verificationCode">
      <el-input v-model="ruleForm.verificationCode" />
      <div v-html="imgSvg" @click="getCaptcha"></div>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="submitForm(ruleFormRef)">点击登陆</el-button>
  <el-button>忘记密码</el-button>
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

// const labelPosition = ref<FormProps['labelPosition']>('right')

const imgSvg = ref('')
onMounted(() => {
  getCaptcha()
})

</script>