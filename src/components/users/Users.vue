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
          <el-button type="primary" plain size="mini" icon="el-icon-edit" @click='editUser(scope.row)'></el-button>
          <el-button type="primary" plain size="mini" icon="el-icon-delete" @click='delUser(scope.row.id)'></el-button>
          <el-button type="success" plain size="mini">
            <i class="el-icon-check"></i>分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-size='pagesize' :current-page="currentpage" background layout="prev, pager, next" :total="total" @current-change='changePage'>
    </el-pagination>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" @close='closeAddForm'>
      <el-form :model="addUserForm" :rules="addrules" ref="addUserForm">
        <el-form-item label="用户名" prop='username' label-width='120px'>
          <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password' label-width='120px'>
          <el-input v-model="addUserForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email' label-width='120px'>
          <el-input v-model="addUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop='mobile' label-width='120px'>
          <el-input v-model="addUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑用户" :visible.sync="aditFormVisible" @close='closeEditForm'>
      <el-form :model="editUserForm" :rules="editRules" ref="editUserForm">
        <el-form-item label="用户名" prop='username' label-width='120px'>
          <el-input disabled v-model="editUserForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email' label-width='120px'>
          <el-input v-model="editUserForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop='mobile' label-width='120px'>
          <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="aditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="uptateUser">确 定</el-button>
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
      currentpage: 1,
      total: 0,
      query: '',
      dialogFormVisible: false,
      aditFormVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        id: -1,
        username: '',
        email: '',
        mobile: ''
      },
      addrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      },
      editRules: {
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号码格式不正确',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    // 请求全部数据
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
          const { data, meta } = res.data
          if (meta.status === 200) {
            this.usersData = data.users
            this.total = data.total
            this.currentpage = data.pagenum
          }
        })
    },
    // 分页切换
    changePage(currentpage) {
      this.getUsers(currentpage)
    },
    // 修改启用
    changestatus(id, status) {
      this.$http.put(`users/${id}/state/${status}`).then(res => {
        // console.log(res)
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
    // 搜索
    queryUser() {
      this.currentpage = 1
      this.getUsers()
    },
    // 展示添加对话框
    showAddDialog() {
      this.dialogFormVisible = true
    },
    // 关闭添加对话框并重置对话框
    closeAddForm() {
      this.$refs.addUserForm.resetFields()
    },
    // 关闭编辑对话框并重置对话框
    closeEditForm() {
      this.$refs.editUserForm.resetFields()
    },
    // 添加功能
    addUser() {
      this.$refs.addUserForm.validate(valid => {
        if (valid) {
          this.$http.post('/users', this.addUserForm).then(res => {
            // console.log(res)
            const { meta } = res.data
            if (meta.status === 201) {
              this.dialogFormVisible = false
              this.getUsers(this.currentpage)
            }
          })
        } else {
          return false
        }
      })
    },
    // 删除功能
    delUser(id) {
      this.$confirm('您确定删除此用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`users/${id}`).then(res => {
            // console.log(res)
            const { meta } = res.data
            if (meta.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.usersData.splice(
                this.usersData.findIndex(item => {
                  return item.id === id
                }),
                1
              )
              if (this.usersData.length === 0) {
                this.getUsers(--this.currentpage)
              }
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 展示编辑功能
    editUser(userData) {
      this.aditFormVisible = true
      for (const key in this.editUserForm) {
        this.editUserForm[key] = userData[key]
      }
    },
    // 编辑功能
    uptateUser() {
      this.$refs.editUserForm.validate(valid => {
        if (valid) {
          const { id, email, mobile } = this.editUserForm
          this.$http.put(`users/${id}`, { email, mobile }).then(res => {
            if (res.data.meta.status === 200) {
              this.aditFormVisible = false
              this.getUsers(this.currentpage)
            }
          })
        } else {
          return false
        }
      })
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
