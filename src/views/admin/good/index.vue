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
        <el-select v-model="form.status" clearable>
          <el-option :value="0" label="上架中"></el-option>
          <el-option :value="1" label="已下架"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="default" icon="el-icon-refresh" @click="handleClose">重置</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleAdd">添加商品</el-button>
      </el-form-item>
    </el-form>

    <page-table :data="tableData"
                :page-options="pageOptions"
                @current-change="currentChange"
                @size-change="sizeChange"
                @sort-change="sortChange">
      <el-table-column label="名称" prop="good_name"></el-table-column>
      <el-table-column label="简介" prop="good_desc"></el-table-column>
      <el-table-column label="价格" prop="price" sortable="custom"></el-table-column>
      <el-table-column label="库存" prop="stock" sortable="custom"></el-table-column>
      <el-table-column label="上架状态" prop="status" sortable="custom">
        <template slot-scope="{ row }">
          <el-tag type="success" :closable="false" v-if="row.status === 0">上架中</el-tag>
          <el-tag type="danger" :closable="false" v-else>已下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否banner商品" prop="banner" sortable="custom">
        <template slot-scope="{ row }">
          <el-tag type="success" :closable="false" v-if="row.banner === 1">首页轮播展示</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" @click="handleModify(row)">修改</el-button>
          <el-button type="text" @click="handleDel(row)">删除</el-button>
        </template>
      </el-table-column>
    </page-table>

    <modify ref="modify" @refresh="getList"></modify>
  </div>
</template>

<script>
import PageTable from '@/components/PageTable'
import Modify from './Modify'
import axios from '@/plugins/axios'
export default {
  name: 'ManageGood',
  components: { PageTable, Modify },
  data() {
    return {
      form: {
        good_name: '',
        price_min: '',
        price_max: '',
        status: ''
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
      this.$refs.modify.show('修改商品信息', row)
    },
    handleAdd() {
      this.$refs.modify.show('添加商品')
    },
    handleSearch() {
      this.pageOptions.pageNum = 1
      this.getList()
    },
    handleClose() {
      this.form.status = ''
      this.form.good_name = ''
      this.form.price_max = ''
      this.form.price_min = ''
    },
    handleDel(row) {
      this.$confirm(`是否确认删除商品【${row.good_name}】？`, '提示').then(() => {
        axios.delete('/good', {
          data: { id: row.id }
        }).then(res => {
          const { code, msg } = res
          if (code === 0) {
            this.$message.success(msg)
            this.getList()
          }
        })
      })
    },
    getList() {
      axios.post('/good/list', {
        pageNum: this.pageOptions.pageNum,
        pageSize: this.pageOptions.pageSize,
        orderBy: this.orderBy,
        ...this.form
      }).then(res => {
        const { code, data = [], count = 0 } = res
        if (code === 0) {
          this.tableData = data
          this.pageOptions.total = count
        }
      })
    },
    currentChange(pageNum) {
      this.pageOptions.pageNum = pageNum
      this.getList()
    },
    sizeChange(pageSize) {
      this.pageOptions.pageSize = pageSize
      this.getList()
    },
    sortChange({ prop, orderBy }) {
      this.pageOptions.pageNum = 1
      this.orderBy = prop + ' ' + orderBy
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>