<template>

  <el-row type="flex" class="row-bg form-box" justify="center" align="middle">
    <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4" class="login-form">
      <el-form label-position="top" :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item class="button-box">
          <el-button type="primary" @click="submitForm">立即登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

  </el-row>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
        }
      })
    },
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>
<style>
.form-box {
  height: 100%;
  background-color: #2d434c;
}
.login-form {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  min-width: 380px;
}
.button-box {
  text-align: center;
}
.button-box button:last-child {
  margin-left: 50px;
}
</style>
