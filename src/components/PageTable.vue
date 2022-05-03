<template>
  <div>
    <el-table v-bind="$attrs" @sort-change="handleSortChange">
      <slot />
    </el-table>
    <div class="page-table-pagination" v-if="pageOptions.total > 0">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageOptions.pageNum"
          :page-sizes="[10, 20, 50]"
          :page-size="pageOptions.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageOptions.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTable',
  inheritAttrs: false,
  props: {
    pageOptions: {
      type: Object,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('current-change', val)
    },
    handleSizeChange(val) {
      this.$emit('size-change', val)
    },
    handleSortChange({ column, prop, order }) {
      const newOrder = order === 'ascending' ? 'ASC' : order === 'descending' ? 'DESC' : ''
      this.$emit('sort-change', { column, prop, orderBy: newOrder })
    }
  }
}
</script>

<style scoped>
.page-table-pagination {
  text-align: right;
  margin-top: 6px;
}
</style>