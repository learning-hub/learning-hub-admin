<template>
  <el-dialog
    title="编辑题"
    :visible="probelmListVisible"
    @update:visible="$emit('update:probelmListVisible', !probelmListVisible)"
    width="50%"
    @close="problemListClose"
    ><!-- 标签页 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="程序题" name="code" :disabled="!(activeName === 'code')">
        <el-form
          :disabled="!(activeName === 'code')"
          :model="ProblemList"
          :rules="ProblemListRules"
          ref="code"
          label-width="130px"
        >
          <el-form-item label="名称" prop="title">
            <el-input v-model="ProblemList.title"></el-input>
          </el-form-item>
          <el-form-item label="难度" prop="hard">
            <el-input v-model.number="ProblemList.hard"></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-tag
              :key="index"
              v-for="(item,index) in ProblemList.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(item)"
            >
              {{ item }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </el-form-item>
          <el-form-item label="是否禁用" prop="is_disabled">
              <el-switch
                v-model="ProblemList.is_disabled"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-input v-model="ProblemList.source"></el-input>
          </el-form-item>
          <el-form-item label="提示" prop="hint">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.hint">
            </el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.description">
            </el-input>
          </el-form-item>
           <el-form-item label="输入说明" prop="data.input">
             <el-input type="textarea" v-model.number="ProblemList.data.input"></el-input>
           </el-form-item>
          <el-form-item label="输出说明" prop="data.output">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.data.output">
            </el-input>
          </el-form-item>
          <el-form-item label="输入参照" prop="data.sample_input">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.data.sample_input">
            </el-input>
          </el-form-item>
          <el-form-item label="输出参照" prop="data.sample_output">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.data.sample_output">
            </el-input>
          </el-form-item>
          <el-form-item label="限制时间(毫秒)" prop="data.time_limit">
            <el-input v-model="ProblemList.data.time_limit"></el-input>
          </el-form-item>
           <el-form-item label="空间限制(兆字节)" prop="data.memory_limit">
            <el-input v-model="ProblemList.data.memory_limit"></el-input>
          </el-form-item>
          <el-form-item label="程序源码" prop="data.src">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.data.src">
            </el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="多选题" name="multi" :disabled="!(activeName==='multi')">
          <el-form
          :disabled="!(activeName==='multi')"
          :model="ProblemList"
          :rules="ProblemListRules"
          ref="multi"
          label-width="130px"
        >
          <el-form-item label="名称" prop="title">
            <el-input v-model="ProblemList.title"></el-input>
          </el-form-item>
          <el-form-item label="难度" prop="hard">
            <el-input v-model.number="ProblemList.hard"></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-tag
              :key="index"
              v-for="(item,index) in ProblemList.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(item)"
            >
              {{ item }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </el-form-item>
          <el-form-item label="是否禁用" prop="is_disabled">
              <el-switch
                v-model="ProblemList.is_disabled"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-input v-model="ProblemList.source"></el-input>
          </el-form-item>
          <el-form-item label="提示" prop="hint">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.hint">
            </el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.description">
            </el-input>
          </el-form-item>
          <el-form-item label="多选题问题" prop="data.options">
            <el-tag
              :key="index1"
              v-for="(item1,index1) in ProblemList.data.options"
              closable
              :disable-transitions="false"
              @close="opitonsclose(item1)"
              type='danger'
            >
              {{ item1 }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputoptionsVisible"
              v-model="inputoptions"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="opitonsConfirm"
              @blur="opitonsConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showopitons"
              >+ New Tag</el-button>
          </el-form-item>
          <el-form-item label="多选题答案" prop="data.answers">
            <el-select
              v-model="ProblemList.data.answers"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="(item,index) in ProblemList.data.options"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          </el-form>
      </el-tab-pane>
      <el-tab-pane label="单选题" name="single" :disabled="!(activeName==='single')">
           <el-form
          :model="ProblemList"
          :rules="ProblemListRules"
          ref="single"
          label-width="130px"
           :disabled="!(activeName === 'single')"
        >
          <el-form-item label="名称" prop="title">
            <el-input v-model="ProblemList.title"></el-input>
          </el-form-item>
          <el-form-item label="难度" prop="hard">
            <el-input v-model.number="ProblemList.hard"></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-tag
              v-for="(item,index) in ProblemList.tags"
              :key="index"
              closable
              :disable-transitions="false"
              @close="handleClose(item)"
            >
              {{ item }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </el-form-item>
          <el-form-item label="是否禁用" prop="is_disabled">
              <el-switch
                v-model="ProblemList.is_disabled"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-input v-model="ProblemList.source"></el-input>
          </el-form-item>
          <el-form-item label="提示" prop="hint">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.hint">
            </el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.description">
            </el-input>
          </el-form-item>
          <el-form-item label="单选题问题" prop="data.options">
            <el-tag
              :key="index1"
              v-for="(item1,index1) in ProblemList.data.options"
              closable
              :disable-transitions="false"
              @close="opitonsclose(item1)"
              type='danger'
            >
              {{ item1 }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputoptionsVisible"
              v-model="inputoptions"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="opitonsConfirm"
              @blur="opitonsConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showopitons"
              >+ New Tag</el-button>
          </el-form-item>
          <el-form-item label="单选题答案" prop="data.answer">
             <el-select v-model="ProblemList.data.answer" placeholder="请选择">
                <el-option
                  v-for="(item,index) in ProblemList.data.options"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
          </el-form-item>
           </el-form>
      </el-tab-pane>
      <el-tab-pane label="填空题" name="fill" :disabled="!(activeName==='fill')">
           <el-form
          :disabled="!(activeName==='fill')"
          :model="ProblemList"
          :rules="ProblemListRules"
          ref="fill"
          label-width="130px"
        >
          <el-form-item label="名称" prop="title">
            <el-input v-model="ProblemList.title"></el-input>
          </el-form-item>
          <el-form-item label="难度" prop="hard">
            <el-input v-model.number="ProblemList.hard"></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-tag
              :key="index"
              v-for="(item,index) in ProblemList.tags"
              closable
              :disable-transitions="false"
              @close="handleClose(item)"
            >
              {{ item }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </el-form-item>
          <el-form-item label="是否禁用" prop="is_disabled">
              <el-switch
                v-model="ProblemList.is_disabled"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-input v-model="ProblemList.source"></el-input>
          </el-form-item>
          <el-form-item label="提示" prop="hint">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.hint">
            </el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.description">
            </el-input>
          </el-form-item>
          <el-form-item label="关键字" prop="data.keywords">
            <el-tag
              :key="index1"
              v-for="(item1,index1) in ProblemList.data.keywords"
              closable
              :disable-transitions="false"
              @close="keywordsclose(item1)"
              type='danger'
            >
              {{ item1 }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputoptionsVisible"
              v-model="inputoptions"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="keywordsConfirm"
              @blur="keywordsConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showopitons"
              >+ New Tag</el-button>
          </el-form-item>
          <el-form-item label="非关键字" prop="data.nokeywords">
            <el-tag
              :key="index2"
              v-for="(item2,index2) in ProblemList.data.nokeywords"
              closable
              :disable-transitions="false"
              @close="nokeywordsclose(item2)"
               type="success"
            >
              {{ item2 }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputanswersVisible"
              v-model="inputanswer"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="nokeywordsConfirm"
              @blur="nokeywordsConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showanswers"
              >+ New Tag</el-button>
          </el-form-item>
          </el-form>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:probelmListVisible', false),clearProblemId()"
        >取 消</el-button
      >
      <el-button type="primary" @click="probelmListSure()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getProblem } from '_Api/problem/getProblem.js'
import { editProblem } from '_Api/problem/editProblem.js'
export default {
  props: ['probelmListVisible', 'probelmId', 'getproblem'],
  data () {
    var validatePass = (rule, value, callback) => {
      // console.log(value)
      if (value.length < 2) {
        callback(new Error('请最少添加2个标签'))
      } else {
        callback()
      }
    }
    var mulit = (rule, value, callback) => {
      // console.log(value.length)
      if (value.length < 2) {
        callback(new Error('请最少添加2个标签'))
      } else {
        callback()
      }
    }
    return {
      // from数据
      ProblemList: {
        data: { }
      },
      // 表单规则
      ProblemListRules: {
        title: { required: true, message: '请输入名称', trigger: 'blur' },
        'data.keywords': [
          { required: true, message: '请输入关键字', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        'data.answers': [
          { required: true, message: '请输入回答', trigger: 'blur' },
          { validator: mulit, trigger: 'blur' }
        ],
        'data.nokeywords': [
          { required: true, message: '请输入非关键字', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        'data.answer': [
          { required: true, message: '请输入单选题答案', trigger: 'blur' }
        ],
        hard: [
          { required: true, message: '请输入题的难度', trigger: 'blur' },
          { type: 'number', message: '题的难度必须为数字值' }
        ],
        tags: [
          { required: true, message: '请选择标签', trigger: 'blur' }
        ],
        source: [
          { required: true, message: '请输入来源', trigger: 'blur' }
        ],
        'data.options': [
          { required: true, message: '请输入问题', trigger: 'blur' },
          { validator: mulit, trigger: 'blur' }
        ],
        hint: [
          { required: true, message: '请输入提示', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        'data.input': { required: true, message: '请输入说明', trigger: 'blur' },
        'data.output': [
          { required: true, message: '请输数说明', trigger: 'blur' }
        ],
        'data.sample_input': [
          { required: true, message: '请输入参照', trigger: 'blur' }
        ],
        'data.sample_output': [
          { required: true, message: '请输出参照', trigger: 'blur' }
        ],
        'data.time_limit': [
          { required: true, message: '请输入限制时间', trigger: 'blur' }
        ],
        'data.memory_limit': [
          { required: true, message: '请输入空间限制', trigger: 'blur' }
        ],
        'data.src': [
          { required: true, message: '请输入程序源码', trigger: 'blur' }
        ]
      },
      // 当前标签页
      activeName: 'code',
      // 输入框是否显示
      inputVisible: false,
      inputoptionsVisible: false,
      inputanswersVisible: false,
      // tag标签的输入框的值
      inputValue: '',
      // 输入问题选项
      inputoptions: '',
      // 输入回答
      inputanswer: ''
    }
  },
  watch: {
    probelmId: async function (v) {
      if (!v) {
        return
      }
      const result = await getProblem(v)
      // console.log(result.data)
      this.activeName = result.data.type
      this.ProblemList = result.data
    }
  },
  methods: {
    // 清空prop的id值
    clearProblemId () {
      this.$emit('update:probelmId', null)
    },
    // 删除tag
    handleClose (index) {
      console.log(index)
      this.ProblemList.tags.splice(this.ProblemList.tags.indexOf(index), 1)
    },
    opitonsclose (index) {
      this.ProblemList.data.options.splice(this.ProblemList.data.options.indexOf(index), 1)
    },
    answersclose (index) {
      this.ProblemList.data.answers.splice(this.ProblemList.data.answers.indexOf(index), 1)
    },
    keywordsclose (index) {
      this.ProblemList.data.keywords.splice(this.ProblemList.data.keywords.indexOf(index), 1)
    },
    nokeywordsclose (index) {
      this.ProblemList.data.nokeywords.splice(this.ProblemList.data.nokeywords.indexOf(index), 1)
    },
    // 显示输入框
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    showopitons () {
      this.inputoptionsVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    showanswers () {
      this.inputanswersVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 输入框的事件
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.ProblemList.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    opitonsConfirm () {
      const inputoptions = this.inputoptions
      if (inputoptions) {
        this.ProblemList.data.options.push(inputoptions)
      }
      this.inputoptionsVisible = false
      this.inputoptions = ''
    },
    answersConfirm () {
      const inputanswer = this.inputanswer
      if (inputanswer) {
        this.ProblemList.data.answers.push(inputanswer)
      }
      this.inputanswersVisible = false
      this.inputanswer = ''
    },
    keywordsConfirm () {
      const inputoptions = this.inputoptions
      if (inputoptions) {
        this.ProblemList.data.keywords.push(inputoptions)
      }
      this.inputoptionsVisible = false
      this.inputoptions = ''
    },
    nokeywordsConfirm () {
      const inputanswer = this.inputanswer
      if (inputanswer) {
        this.ProblemList.data.nokeywords.push(inputanswer)
      }
      this.inputanswersVisible = false
      this.inputanswer = ''
    },
    // 修改信息APi
    async editmessage () {
      const result = await editProblem(this.probelmId, this.ProblemList.type, this.ProblemList)
      if (result.errcode !== 0) return this.$message.error(result.errmsg)
      this.$message.success('修改题库成功')
    },
    // 确定按钮
    probelmListSure () {
      if (this.activeName === 'code') {
        this.$refs.code.validate((valid) => {
          if (!valid) return this.$message.error('请输入正确的信息')
          this.editmessage()
          this.getproblem()
          this.$emit('update:probelmListVisible', false)
        })
      } else if (this.activeName === 'single') {
        this.$refs.single.validate((valid) => {
          if (!valid) return this.$message.error('请输入正确的信息')
          this.editmessage()
          this.getproblem()
          this.$emit('update:probelmListVisible', false)
        })
      } else if (this.activeName === 'multi') {
        this.$refs.multi.validate((valid) => {
          if (!valid) return this.$message.error('请输入正确的信息')
          this.editmessage()
          this.getproblem()
          this.$emit('update:probelmListVisible', false)
        })
      } else {
        this.$refs.fill.validate((valid) => {
          if (!valid) return this.$message.error('请输入正确的信息')
          this.editmessage()
          this.getproblem()
          this.$emit('update:probelmListVisible', false)
        })
      }
      this.clearProblemId()
    },
    // 关闭对话框
    problemListClose () {
      if (this.activeName === 'code') {
        this.$refs.code.resetFields()
      } else if (this.activeName === 'single') {
        this.$refs.single.resetFields()
      } else if (this.activeName === 'multi') {
        this.$refs.multi.resetFields()
      } else {
        this.$refs.fill.resetFields()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag{
    margin-left: 10px;
}
.input-new-tag{
    margin-left: 10px;
    width: 98%;
}
.button-new-tag{
    margin-left: 10px;
}
</style>
