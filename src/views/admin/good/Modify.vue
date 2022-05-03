<template>
  <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false" @close="handleClose">

    <el-form :model="form" ref="form" :rules="rules" label-width="100px">

      <el-form-item label="名称" prop="good_name">
        <el-input v-model="form.good_name"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="good_desc">
        <el-input type="textarea" v-model="form.good_desc"></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="库存" prop="stock">
            <el-input type="text" v-model="form.stock"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="价格" prop="price">
            <el-input type="text" v-model="form.price"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio-button :label="0">上架中</el-radio-button>
              <el-radio-button :label="1">已下架</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="展示图片" prop="good_img">
        <ul class="el-upload-list el-upload-list--picture-card" v-for="(item, index) of allGoodImages" :key="index">
          <li class="el-upload-list__item is-ready">
            <div>
              <img class="el-upload-list__item-thumbnail" style="width: 100%;height: 100%" :src="typeof item === 'string' ? item : item.url">
              <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(item)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(item)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
            </div>
          </li>
        </ul>

        <el-upload action="#" :show-file-list="false" :auto-upload="false" :file-list="fileList" :on-change="fileOnChange">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item label="是否首页轮播" prop="banner">
        <el-radio-group v-model="form.banner">
          <el-radio-button :label="0">否</el-radio-button>
          <el-radio-button :label="1">是</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="banner图片" prop="banner_img">
        <el-upload
            :on-change="bannerFileOnChange"
            class="avatar-uploader"
            action="#"
            :auto-upload="false"
            :show-file-list="false">
          <div class="banner_img" v-if="imageUrl.url">
            <img :src="imageUrl.url" class="el-upload-list__item-thumbnail">
          </div>
          <el-button v-else type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

    </el-form>

    <div slot="footer">
      <el-button size="small" type="default" @click="handleClose">取消</el-button>
      <el-button size="small" type="primary" :loading="submitLoading" @click="handleSubmit">保存</el-button>
    </div>

    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-dialog>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'AddModify',
  data() {
    const validGoodImages = (rule, value, callback) => {
      if (this.fileList.length === 0 && this.showFileList.length === 0) {
        callback(new Error('请上传商品的展示图片'))
      } else {
        callback()
      }
    }
    return {
      title: '添加商品',
      visible: false,
      form: {
        good_name: '',
        good_desc: '',
        status: 0,
        banner: false,
        price: 0,
        stock: 0
      },
      rules: {
        good_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        good_desc: [{ required: true, message: '请输入商品简介', trigger: 'blur' }],
        stock: [{ required: true, message: '请输入商品库存', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        good_images: [{ validator: validGoodImages, trigger: 'change' }]
      },
      fileList: [],
      showFileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      submitLoading: false,
      imageUrl: {
        url: '',
        file: null
      }
    }
  },
  computed: {
    allGoodImages() {
      return this.showFileList.concat(this.fileList)
    }
  },
  methods: {
    show(title, data) {
      this.title = title
      if (data) {
        this.form.id = data.id
        this.form.good_name = data.good_name
        this.form.good_desc = data.good_desc
        this.form.status = data.status
        this.form.banner = data.banner
        this.form.price = data.price
        this.form.stock = data.stock
        this.showFileList = data.good_img
        this.imageUrl.url = data.banner_img
      }
      this.visible = true
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.updateOrAddGood()
        }
      })

    },
    updateOrAddGood() {
      const formData = new FormData()
      formData.append('good_name', this.form.good_name)
      formData.append('good_desc', this.form.good_desc)
      formData.append('status', this.form.status)
      formData.append('banner', this.form.banner)
      formData.append('price', this.form.price)
      formData.append('stock', this.form.stock)
      if (this.fileList.length > 0) {
        this.fileList.forEach(file => {
          formData.append('good_img', file.raw)
        })
      }
      formData.append('desc_img', this.showFileList.join(','))
      if (this.imageUrl.url) {
        formData.append('banner_img', this.imageUrl.file || this.imageUrl.url)
      }

      let method = 'put'
      if (this.title !== '添加商品') {
        method = 'patch'
        formData.append('id', this.form.id)
      }
      this.submitLoading = true
      axios[method]('/good', formData).then(res => {
        const { code, msg } = res
        if (code === 0) {
          this.$message.success(msg)
          this.handleClose()
          this.$emit('refresh')
        } else {
          this.$message.warning(msg)
        }
        this.submitLoading = false
      }).catch(err => {
        this.$message.error(err)
        this.submitLoading = false
      })
    },
    handleClose() {
      delete this.form.id
      this.form.status = 0
      this.form.banner = false
      this.form.price = 999
      this.form.stock = 0
      this.form.good_desc = ''
      this.form.good_name = ''
      this.fileList = []
      this.showFileList = []
      this.imageUrl.url = ''
      this.imageUrl.file = null
      this.$refs.form.clearValidate()
      this.visible = false
    },
    handleRemove(file) {
      if (typeof file === 'string') {
        const index = this.showFileList.findIndex(item => file === item)
        if (index !== -1) {
          this.showFileList.splice(index, 1)
        }
      } else {
        const index = this.fileList.findIndex(item => file.uid === item.uid)
        if (index !== -1) {
          this.fileList.splice(index, 1)
        }
      }
    },
    handlePictureCardPreview(file) {
      if (typeof file === 'string') {
        this.dialogImageUrl = file
      } else {
        this.dialogImageUrl = file.url
      }
      this.dialogVisible = true;
    },
    fileOnChange(file) {
      this.imageToBase64(file.raw).then(result => {
        this.fileList.push({
          ...file,
          url: result
        })
        console.log(this.fileList)
      })
    },
    bannerFileOnChange(file) {
      this.imageToBase64(file.raw).then(result => {
        this.imageUrl.url = result
        this.imageUrl.file = file.raw
      })
    },
    imageToBase64(file) {
      return new Promise((resolve) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          resolve(reader.result)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.banner_img {
  width: 100%;
  height: 128px;
  background-color: #ffffff;
  border: 1px solid #efefef;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>