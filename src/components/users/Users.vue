<template>
  <el-table :data="usersData" stripe style="width: 100%">
    <el-table-column prop="username" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="email" label="邮箱" width="180">
    </el-table-column>
    <el-table-column prop="mobile" label="电话">
    </el-table-column>
    <el-table-column prop="mg_state" label="用户状态">
    </el-table-column>
    <el-table-column prop="do" label="操作">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      usersData: []
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: { pagenum: 1, pagesize: 3 },
          headers: { Authorization: localStorage.getItem('token') }
        })
        .then(res => {
          const { data, meta } = res.data
          if (meta.status === 200) {
            this.usersData = data.users
          }
        })
    }
  }
}
</script>

<style>
</style>
