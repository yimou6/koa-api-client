<template>
  <div class="container" v-loading="loading">
    <div class="addr-title">
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="visible = true">添加地址</el-button>
    </div>

    <el-row v-if="addressList.length > 0" :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="item of addressList" :key="item.id" style="margin-bottom: 10px">
        <el-card shadow="never" class="addr-card" :class="{ 'is-default': item.is_default }" @click.native="handleUpdate(item)">
          <h4>{{ item.consignee }}</h4>
          <div class="addr-phone">{{ item.phone }}</div>
          <div class="addr-text" :title="item.address">{{ item.address }}</div>
          <el-tag v-if="item.is_default" type="success" :closable="false" class="add-tag">默认</el-tag>
        </el-card>
      </el-col>
    </el-row>

    <el-empty v-else description="暂无收货人地址信息"></el-empty>

    <el-dialog :visible.sync="visible" :title="title" :close-on-click-modal="false" @close="handleClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" size="small">
        <el-form-item label="收货人" prop="consignee">
          <el-input v-model="form.consignee" placeholder="请输入收货人" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话(手机号)" :maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入收货地址" type="textarea" :maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="设为默认地址" prop="is_default">
          <el-radio-group v-model="form.is_default">
            <el-radio-button :label="true">是</el-radio-button>
            <el-radio-button :label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="danger" size="small" v-show="form.id" @click="handleDel">删除</el-button>
        <el-button type="default" size="small" @click="handleClose">取消</el-button>
        <el-button type="primary" size="small" @click="handleSubmit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  name: 'AddressManager',
  data() {
    return {
      addressList: [],
      loading: false,
      visible: false,
      title: '添加收货地址',
      form: {
        consignee: '',
        phone: '',
        address: '',
        is_default: false
      },
      rules: {
        consignee: [{ required: true, message: '请输入收货人', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        address: [{ required: true, message: '请输入收货地址', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleClose() {
      this.title = '添加收货地址'
      this.form.consignee = ''
      this.form.phone = ''
      this.form.address = ''
      this.form.is_default = false
      delete this.form.id
      this.$refs.form.clearValidate()
      this.visible = false
    },
    handleUpdate(row) {
      this.title = '修改收货地址信息'
      this.form.consignee = row.consignee
      this.form.phone = row.phone
      this.form.address = row.address
      this.form.address = row.address
      this.form.is_default = row.is_default
      this.form.id = row.id
      this.visible = true
    },
    handleDel() {
      this.$confirm('是否确认删除此收货信息?', '删除提示', {
        type: 'warning'
      }).then(() => {
        axios.delete('/address', {
          data: { id: this.form.id }
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.handleClose()
            this.getList()
          }
        })
      })
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let type = 'patch'
          if (this.title === '添加收货地址') {
            type = 'put'
          }
          axios[type]('/address', this.form).then(res => {
            const { code, msg } = res
            if (code === 0) {
              this.$message.success(msg)
              this.handleClose()
              this.getList()
            } else {
              this.$message.warning(msg)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        }
      })
    },
    getList() {
      axios.get('/address').then(res => {
        const { code, data } = res
        if (code === 0) {
          this.addressList = data || []
          this.$store.commit('SET_ADDRESS', this.addressList)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.addr-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
}

.addr-card {
  cursor: pointer;
  position: relative;
  &.is-default {
    border-color: #4396c2;
  }
  h4 {
    margin-top: 0;
    margin-bottom: 5px;
  }
  .addr-phone {
    font-weight: 300;
    font-size: 12px;
    color: #666666;
    margin-bottom: 10px;
  }
  .addr-text {
    font-size: 14px;
    color: #404040;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .add-tag {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>