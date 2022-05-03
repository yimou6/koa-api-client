<template>
  <div class="manage-container">
    <el-form inline>
      <el-form-item label="名称" prop="good_name">
        <el-input v-model="form.good_name"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price_min">
        <el-input v-model="form.price_min" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item prop="price_max">
        <el-input v-model="form.price_max" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio-button :label="0">上架中</el-radio-button>
          <el-radio-button :label="1">已下架</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="handleClose">重置</el-button>
        <el-button type="success" icon="el-icon-plus">添加商品</el-button>
      </el-form-item>
    </el-form>

    <page-table :data="tableData" :page-options="pageOptions">
      <el-table-column label="用户名" prop="user_name"></el-table-column>
      <el-table-column label="昵称" prop="nick_name"></el-table-column>
      <el-table-column label="邮箱" prop="email" sortable></el-table-column>
      <el-table-column label="角色" prop="level" sortable></el-table-column>
      <el-table-column label="性别" prop="sex" sortable></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" @click="handleModify(row)">修改</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </page-table>
  </div>
</template>

<script>
import PageTable from '@/components/PageTable'
import axios from '@/plugins/axios'
export default {
  name: 'ManageUser',
  components: { PageTable },
  data() {
    return {
      form: {
        good_name: '',
        price_min: '',
        price_max: '',
        status: 0
      },
      tableData: [],
      pageOptions: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      orderBy: ''
    }
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleModify(row) {
      console.log(row)
    },
    handleSearch() {
      this.pageOptions.pageNum = 1
      this.getList()
    },
    handleClose() {
      this.form.status = 0
      this.form.good_name = ''
      this.form.price_max = ''
      this.form.price_min = ''
    },
    getList() {
      axios.post('/users', {
        pageNum: this.pageOptions.pageNum,
        pageSize: this.pageOptions.pageSize,
        orderBy: this.orderBy,
        ...this.form
      }).then(res => {
        const { code, data, count } = res
        if (code === 0) {
          this.tableData = data
          this.pageOptions.total = count
        }
      })
    }
  }
}
</script>

<style scoped>

</style>