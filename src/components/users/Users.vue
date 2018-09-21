<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span='6'>
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click='queryUser'></el-button>
        </el-input>
      </el-col>
      <el-col :span='4'>
        <el-button type="success" plain @click="showAddDialog">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="usersData" stripe style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change='changestatus(scope.row.id,scope.row.mg_state)'>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="do" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
          <el-button type="primary" plain size="mini" icon="el-icon-delete"></el-button>
          <el-button type="success" plain size="mini">
            <i class="el-icon-check"></i>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-size='pagesize' :current-page="currentpage" background layout="prev, pager, next" :total="total" @current-change='changePage'>
    </el-pagination>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="userform">
        <el-form-item label="用户名" label-width='120px'>
          <el-input v-model="userform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width='120px'>
          <el-input v-model="userform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width='120px'>
          <el-input v-model="userform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width='120px'>
          <el-input v-model="userform.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  data() {
    return {
      usersData: [],
      pagesize: 2,
      currentpage: 2,
      total: 0,
      query: '',
      dialogFormVisible: false,
      userform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers(currentpage = 1) {
      this.$http
        .get('/users', {
          params: {
            pagenum: currentpage,
            pagesize: this.pagesize,
            query: this.query || ''
          }
        })
        .then(res => {
          console.log(res)
          const { data, meta } = res.data
          if (meta.status === 200) {
            this.usersData = data.users
            this.total = data.total
          }
        })
    },
    changePage(currentpage) {
      this.getUsers(currentpage)
    },
    changestatus(id, status) {
      console.log(status)
      console.log(id)
      this.$http.put(`users/${id}/state/${status}`).then(res => {
        console.log(res)
        const { data, meta } = res.data
        if (meta.status === 200) {
          if (data.mg_state === 0) {
            this.$message({
              message: '禁用成功',
              type: 'warning',
              duration: 1000
            })
          } else if (data.mg_state === 1) {
            this.$message({
              message: '启用成功',
              type: 'success',
              duration: 1000
            })
          }
        }
      })
    },
    queryUser() {
      this.currentpage = 1
      this.getUsers()
    },
    showAddDialog() {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>
.el-breadcrumb {
  padding-left: 10px;
  line-height: 40px;
  font-size: 18px;
  background-color: #d4dae0;
}
</style>
