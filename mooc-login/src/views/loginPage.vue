<template>
  <el-form
    label-position="right"
    label-width="100px"
    :model="formLabelAlign"
    style="max-width: 460px"
  >
    <el-form-item label="用户名">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.password" />
    </el-form-item>
    <el-form-item label="验证码">
      <el-input v-model="formLabelAlign.verificationCode" />
      <div v-html="imgSvg"></div>
    </el-form-item>
  </el-form>
  <el-button type="primary">点击登陆</el-button>
  <el-button>忘记密码</el-button>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import axios from 'axios';
// import type { FormProps } from 'element-plus'

// const labelPosition = ref<FormProps['labelPosition']>('right')

const formLabelAlign = reactive({
  name: '',
  password: '',
  verificationCode: '',
})
const imgSvg = ref('')
onMounted(() => {
  axios.get('http://localhost:3000/getCaptcha').then(res => {
    console.log(res);
    if (res.data.code === 200) {
      imgSvg.value = res.data.msg;
    }
  })
})
</script>