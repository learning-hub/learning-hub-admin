<template>
  <div>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>题库列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/problemlist' }">题库列表</el-breadcrumb-item>
         <el-breadcrumb-item>添加题库</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
          <el-alert
            title="添加题库信息"
            type="info"
            show-icon center>
          </el-alert>
          <el-steps :active="active>1?1:active-0" finish-status="success" :space="400" align-center @change="getrules">
            <el-step title="基本信息"></el-step>
            <el-step :title="stepname"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <el-tabs tab-position="left" v-model="active">
            <el-tab-pane label="基本参数" name="0" >
                <el-form
                :model="ProblemListdata"
                :rules="ProblemListRules"
                ref="list"
                label-width="130px"
                  >
                      <el-form-item label="名称" prop="title">
                        <el-input v-model="ProblemListdata.title"></el-input>
                      </el-form-item>
                      <el-form-item label="难度" prop="hard">
                        <el-input v-model.number="ProblemListdata.hard"></el-input>
                      </el-form-item>
                      <el-form-item label="标签" prop="tags">
                        <el-tag
                          :key="index"
                          v-for="(item,index) in ProblemListdata.tags"
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
                            v-model="ProblemListdata.is_disabled"
                            :active-value="1"
                            :active-false="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                      </el-form-item>
                      <el-form-item label="来源" prop="source">
                        <el-input v-model="ProblemListdata.source"></el-input>
                      </el-form-item>
                      <el-form-item label="提示" prop="hint">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemListdata.hint">
                        </el-input>
                      </el-form-item>
                      <el-form-item label="题型" prop="type">
                        <el-radio-group v-model="ProblemListdata.type">
                          <el-radio label="code">程序</el-radio>
                          <el-radio label="single">单选</el-radio>
                          <el-radio  label="multi">多选</el-radio>
                          <el-radio label="fill">填空</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="nextStep">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                      </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="单选" name="1" :disabled="!(ProblemListdata.type==='single')">
                <el-form
                  :model="ProblemList"
                  :rules="single"
                  ref="single"
                  label-width="130px"
                  :disabled="(active==='single')"
                >
                <el-form-item label="描述" prop="description">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.description">
                        </el-input>
                 </el-form-item>
                  <el-form-item label="单选题选项" prop="options">
                    <el-tag
                      :key="index1"
                      v-for="(item1,index1) in ProblemList.options"
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
                  <el-form-item label="单选题答案" prop="answer">
                     <el-select v-model="ProblemList.answer" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in ProblemList.options"
                        :key="index"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="goBack" icon="el-icon-arrow-left">上一步</el-button>
                    <el-button type="primary" @click="probelmListSure()">确 定</el-button>
                    <el-button @click="probelmListcancel()" type="danger">取 消</el-button>
                  </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="多选" name="2" :disabled="!(ProblemListdata.type==='multi')">
                <el-form
              :model="ProblemList"
              :disabled="(active==='multi')"
              :rules="multi"
              ref="multi"
              label-width="130px"
              >
              <el-form-item label="描述" prop="description">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.description">
                        </el-input>
                 </el-form-item>
                    <el-form-item label="多选题问题" prop="options" >
                <el-tag
                  :key="index1"
                  v-for="(item1,index1) in ProblemList.options"
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
              <el-form-item label="多选题答案" prop="answers" >
                <el-select
                  v-model="ProblemList.answers"
                  multiple
                  collapse-tags
                  style="margin-left: 20px;"
                  placeholder="请选择">
                  <el-option
                    v-for="(item,index) in ProblemList.options"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="goBack" icon="el-icon-arrow-left">上一页</el-button>
                <el-button type="primary" @click="probelmListSure()">确 定</el-button>
                <el-button @click="probelmListcancel()">取 消</el-button>
              </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="填空" name="3" :disabled="!(ProblemListdata.type==='fill')">
                <el-form
              :model="ProblemList"
              :disabled="(active==='fill')"
              :rules="fill"
              ref="fill"
              label-width="130px"
            >
            <el-form-item label="描述" prop="description">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.description">
                        </el-input>
                 </el-form-item>
                    <el-form-item label="关键字" prop="keywords">
                <el-tag
                  :key="index1"
                  v-for="(item1,index1) in ProblemList.keywords"
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
                    <el-form-item label="非关键字" prop="nokeywords">
                      <el-tag
                        :key="index2"
                        v-for="(item2,index2) in ProblemList.nokeywords"
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
                    <el-form-item>
                <el-button type="primary" @click="goBack" icon="el-icon-arrow-left">上一步</el-button>
                <el-button type="primary" @click="probelmListSure()">确 定</el-button>
                <el-button @click="probelmListcancel()" type="danger">取 消</el-button>
              </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="程序" name="4" :disabled="!(ProblemListdata.type==='code')">
              <el-form
              :model="ProblemList"
              :rules="code"
              ref="code"
              label-width="130px"
              :disabled="(active==='code')"
            >
                    <el-form-item label="描述" prop="description">
                        <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.description">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="输入说明" prop="input" >
                      <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.input">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="输出说明" prop="output" >
                      <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.output">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="输入参照" prop="sample_input">
                      <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.sample_input">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="输出参照" prop="sample_output">
                      <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.sample_output">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="限制时间(毫秒)" prop="time_limit">
                      <el-input v-model.number="ProblemList.time_limit"></el-input>
                    </el-form-item>
                    <el-form-item label="空间限制(兆字节)" prop="memory_limit">
                      <el-input v-model.number="ProblemList.memory_limit"></el-input>
                    </el-form-item>
                    <el-form-item label="程序源码" prop="src">
                      <el-input type="textarea" autosize placeholder="请输入内容" v-model="ProblemList.src">
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                <el-button type="primary" @click="goBack" icon="el-icon-arrow-left">上一步</el-button>
                <el-button type="primary" @click="probelmListSure()">确 定</el-button>
                <el-button @click="probelmListcancel()" type="danger">取 消</el-button>
              </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { addProblem } from '_Api/problem/addProblem.js'
export default {
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
      // 进度条名字
      stepname: '程序',
      // 验证规则
      ProblemListRules: {
        title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        hard: [
          { required: true, message: '请输入题的难度', trigger: 'blur' },
          { type: 'number', message: '题的难度必须为数字值' }
        ],
        tags: [
          { required: true, message: '请选择标签', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        source: [{ required: true, message: '请输入来源', trigger: 'blur' }],

        hint: [{ required: true, message: '请输入提示', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }]
      },
      // 步骤条
      active: '0',
      // from数据
      ProblemList: {
      },
      ProblemListdata: {
        is_disabled: 0,
        title: '',
        hint: '', // 提示
        source: '', // 来源
        tags: [], // 标签 如: 算法,数据结构
        hard: null, // 难度.
        type: ''
      },
      codedata: {
        description: '',
        input: '', // 输入说明
        output: '', // 输出说明
        sample_input: '', // 输入参照
        sample_output: '', // 输出参照
        time_limit: null, // 限制时间（毫秒）
        memory_limit: null, // 空间限制（兆字节）
        src: '' // 程序源码
      },
      // single
      singledata: {
        description: '',
        options: [],
        answer: ''
      },
      // multi
      multidata: {
        description: '',
        options: [],
        answers: []
      },
      // fill
      filldata: {
        description: '',
        keywords: [], // 答案里出现的关键字,JSON串
        nokeywords: [] // 答案里不能出现的关键字,JSON串
      },
      // 单选
      single: {
        // 单选
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入单选题答案', trigger: 'blur' }
        ],
        options: [
          { required: true, message: '请输入单选题问题', trigger: 'blur' },
          { validator: mulit, trigger: 'blur' }
        ]
      },
      // 填空
      fill: {
        // 填空
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入关键字', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        nokeywords: [
          { required: true, message: '请输入非关键字', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      // 多选
      multi: {
        // 多选
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        answers: [
          { required: true, message: '请输入回答', trigger: 'blur' },
          { validator: mulit, trigger: 'blur' }
        ],
        options: [
          { required: true, message: '请输入问题', trigger: 'blur' },
          { validator: mulit, trigger: 'blur' }
        ]
      },
      // 程序
      code: {
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ],
        input: [
          { required: true, message: '请输入说明', trigger: 'blur' }
        ],
        output: [
          { required: true, message: '请输数说明', trigger: 'blur' }
        ],
        sample_input: [
          { required: true, message: '请输入参照', trigger: 'blur' }
        ],
        sample_output: [
          { required: true, message: '请输出参照', trigger: 'blur' }
        ],
        time_limit: [
          { required: true, message: '请输入限制时间', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        memory_limit: [
          { required: true, message: '请输入空间限制', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值' }
        ],
        src: [
          { required: true, message: '请输入程序源码', trigger: 'blur' }
        ]
      },
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
  methods: {
    // 返回
    goBack () {
      this.active = '0'
      this.ProblemList = {}
    },
    // 下一步
    nextStep () {
      this.$refs.list.validate((voild) => {
        if (!voild) return this.$message.error('请输入合法信息')
        if (this.ProblemListdata.type === 'code') this.active = '4'
        else if (this.ProblemListdata.type === 'single') this.active = '1'
        else if (this.ProblemListdata.type === 'multi') this.active = '2'
        else this.active = '3'
      })
    },
    // 拼接规则
    getrules () {
      if (this.ProblemListdata.type === 'code') {
        this.ProblemList = this.codedata
        this.stepname = '程序'
      } else if (this.ProblemListdata.type === 'single') {
        this.ProblemList = this.singledata
        this.stepname = '单选'
      } else if (this.ProblemListdata.type === 'multi') {
        this.ProblemList = this.multidata
        console.log(this.ProblemList)
        this.stepname = '多选'
      } else {
        this.ProblemList = this.filldata
        this.stepname = '填空'
      }
    },
    // 删除tag
    handleClose (index) {
      this.ProblemListdata.tags.splice(this.ProblemListdata.tags.indexOf(index), 1)
    },
    opitonsclose (index) {
      this.ProblemList.options.splice(
        this.ProblemList.options.indexOf(index),
        1
      )
    },
    keywordsclose (index) {
      this.ProblemList.keywords.splice(
        this.ProblemList.keywords.indexOf(index),
        1
      )
    },
    nokeywordsclose (index) {
      this.ProblemList.nokeywords.splice(
        this.ProblemList.nokeywords.indexOf(index),
        1
      )
    },
    // 显示输入框
    showInput () {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    showopitons () {
      this.inputoptionsVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    showanswers () {
      this.inputanswersVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 输入框的事件
    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.ProblemListdata.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    opitonsConfirm () {
      const inputoptions = this.inputoptions
      if (inputoptions) {
        this.ProblemList.options.push(inputoptions)
      }
      this.inputoptionsVisible = false
      this.inputoptions = ''
    },
    answersConfirm () {
      const inputanswer = this.inputanswer
      if (inputanswer) {
        this.ProblemList.answers.push(inputanswer)
      }
      this.inputanswersVisible = false
      this.inputanswer = ''
    },
    keywordsConfirm () {
      const inputoptions = this.inputoptions
      if (inputoptions) {
        this.ProblemList.keywords.push(inputoptions)
      }
      this.inputoptionsVisible = false
      this.inputoptions = ''
    },
    nokeywordsConfirm () {
      const inputanswer = this.inputanswer
      if (inputanswer) {
        this.ProblemList.nokeywords.push(inputanswer)
      }
      this.inputanswersVisible = false
      this.inputanswer = ''
    },
    // 确定按钮
    probelmListSure () {
      console.log(this.ProblemList)
      if (this.ProblemListdata.type === 'code') {
        this.$refs.code.validate(async vaild => {
          if (!vaild) return this.$message.error('请输入合法信息')
          this.ProblemList = Object.assign(this.ProblemList, this.ProblemListdata)
          const result = await addProblem(this.ProblemList.type, this.ProblemList)
          if (result.errcode !== 0) return this.$message.error(result.errmsg)
          this.$message.success('题库添加成功')
          this.$router.push('/problemlist')
        })
      } else if (this.ProblemListdata.type === 'single') {
        this.$refs.single.validate(async vaild => {
          if (!vaild) return this.$message.error('请输入合法信息')
          this.ProblemList = Object.assign(this.ProblemList, this.ProblemListdata)
          console.log(this.ProblemList)
          const result = await addProblem(this.ProblemList.type, this.ProblemList)
          if (result.errcode !== 0) return this.$message.error(result.errmsg)
          this.$message.success('题库添加成功')
          this.$router.push('/problemlist')
        })
      } else if (this.ProblemListdata.type === 'multi') {
        this.$refs.multi.validate(async vaild => {
          if (!vaild) return this.$message.error('请输入合法信息')
          this.ProblemList = Object.assign(this.ProblemList, this.ProblemListdata)
          const result = await addProblem(this.ProblemList.type, this.ProblemList)
          if (result.errcode !== 0) return this.$message.error(result.errmsg)
          this.$message.success('题库添加成功')
          this.$router.push('/problemlist')
        })
      } else {
        this.$refs.fill.validate(async vaild => {
          if (!vaild) return this.$message.error('请输入合法信息')
          this.ProblemList = Object.assign(this.ProblemList, this.ProblemListdata)
          const result = await addProblem(this.ProblemList.type, this.ProblemList)
          if (result.errcode !== 0) return this.$message.error(result.errmsg)
          this.$message.success('题库添加成功')
          this.$router.push('/problemlist')
        })
      }
    },
    // 取消按钮
    probelmListcancel () {
      this.$refs.multi.resetFields()
      this.$refs.code.resetFields()
      this.$refs.fill.resetFields()
      this.$refs.single.resetFields()
      this.$refs.list.resetFields()
      this.$router.push('/problemlist')
    }
  }
}
</script>
<style lang="less" scoped>
.el-steps {
  margin: 20px 0;
}
.el-tag {
  margin-left: 10px;
}
.input-new-tag {
  margin-left: 10px;
  width: 98%;
}
.button-new-tag {
  margin-left: 10px;
}
.el-page-header {
  margin: 10px 0;
}
</style>
