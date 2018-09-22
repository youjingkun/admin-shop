<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="rights-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="rightsList">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column property="authName" label="权限名称" width="120">
      </el-table-column>
      <el-table-column property="path" label="路径" width="120">
      </el-table-column>
      <el-table-column property="level" label="层级">
        <template slot-scope="scope">
          <span v-if='scope.row.level==0'>一级</span>
          <span v-else-if='scope.row.level==1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      const res = await this.$http.get('rights/list')
      console.log(res)
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.rightsList = data
      }
    }
  }
}
</script>

<style>
.rights-breadcrumb {
  line-height: 40px;
  background-color: #d4dae0;
  font-size: 18px;
  padding-left: 10px;
}
</style>
