export default {
  data() {
    return {
      rolesList: [],
      rolesForm: {
        id: -1,
        roleName: '',
        roleDesc: ''
      },
      roleFormVisible: false
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 请求角色列表
    async getRolesList() {
      const res = await this.$http.get('/roles')
      // console.log(res)
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.rolesList = data
      }
    },

    // 显示修改对话框
    editRole(roleData) {
      this.roleFormVisible = true
      for (const key in this.rolesForm) {
        this.rolesForm[key] = roleData[key]
      }
    },

    // 修改功能
    async updateRole() {
      const { id, roleName, roleDesc } = this.rolesForm
      const res = await this.$http.put(`roles/${id}`, { roleName, roleDesc })
      const { meta } = res.data
      if (meta.status === 200) {
        this.roleFormVisible = false
        const currentRole = this.rolesList.find(item => item.id === id)
        currentRole.roleName = roleName
        currentRole.roleDesc = roleDesc
      }
    },

    // 删除功能
    delRole(id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$http.delete(`roles/${id}`)
          // console.log(res)
          const { meta } = res.data
          if (meta.status === 200) {
            const index = this.rolesList.findIndex(item => item.id === id)
            this.rolesList.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
