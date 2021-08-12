<template>
    <div>
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple-dark">
                <img :src="ImgSrcIndex">
            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="18"><div class="grid-content bg-purple">
                <img :src="ImgSrc" style="width: 100%;height:500px">
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="ruleForm.username" autocomplete="off" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
                        <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="电话" prop="tel">
                        <el-input type="text" v-model="ruleForm.tel" autocomplete="off" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="ruleForm.age" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码" prop="zjhm">
                        <el-input v-model.number="ruleForm.zjhm" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birth">
                        <div class="block">
                            <el-date-picker
                                    v-model="ruleForm.birth"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="家庭地址" prop="address" style="width: 350px">
                        <el-input v-model.number="ruleForm.address"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="RegisterForm('ruleForm')">注册</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <a href="javascript:;" @click="Login" style="margin-left: 20px">已有账号,去登录</a>
                    </el-form-item>
                </el-form>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            var validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }else {
                    callback();
                }
            };
            var validateSex = (rule,value,callback)=>{
                if (value===''){
                    callback(new Error('请选择性别'));
                }else{
                    callback();
                }
            };
            var validateTel = (rule,value,callback)=>{
                if (value===''){
                    callback(new Error('请填写手机号'));
                }else{
                    callback();
                }
            };
            var validateAge = (rule,value,callback)=>{
                if (value===''){
                    callback(new Error('请填写年龄'));
                }else{
                    callback();
                }
            };
            var validateZjhm = (rule,value,callback)=>{
                if (value===''){
                    callback(new Error('请填写证件号码'));
                }else{
                    callback();
                }
            };
            var validateBirth = (rule,value,callback)=>{
                if (value===''){
                    callback(new Error('请选择出生日期'));
                }else{
                    callback();
                }
            };
            var validateAddress = (rule,value,callback)=>{
                if (value===''){
                    callback(new Error('联系地址不能为空'));
                }else{
                    callback();
                }
            };
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    sex: '',
                    tel:'',
                    age:'',
                    zjhm:'',
                    birth:'',
                    address:'',
                },
                rules: {
                    username: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    sex: [
                        { validator: validateSex, trigger: 'blur' }
                    ],
                    tel: [
                        { validator: validateTel, trigger: 'blur' }
                    ],
                    age: [
                        { validator: validateAge, trigger: 'blur' }
                    ],
                    zjhm: [
                        { validator: validateZjhm, trigger: 'blur' }
                    ],
                    birth: [
                        { validator: validateBirth, trigger: 'blur' }
                    ],
                    address: [
                        { validator: validateAddress, trigger: 'blur' }
                    ],
                },
                ImgSrc:require('@/assets/phone/login-bg.jpg'),
                ImgSrcIndex:require('@/assets/phone/login-logo.png'),
                isShow:false,
            };
        },
        methods: {
            Login(){
              this.$router.push({path:'/login'})
            },
            RegisterForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post("http://42.193.121.151:8000/commonAction/register",{
                            'user_name':this.ruleForm.username,
                            'user_pass':this.ruleForm.password,
                            'user_sex':this.ruleForm.sex,
                            'user_tel':this.ruleForm.tel,
                            'user_age':this.ruleForm.age,
                            'user_zjhm':this.ruleForm.zjhm,
                            'user_birth':this.ruleForm.birth,
                            'user_address':this.ruleForm.address,
                        }).then((respones)=>{
                            if (respones.data===1){
                                this.$message({
                                    message:'注册成功',
                                    type:'success',
                                    center:true,
                                    showClose:true
                                });
                                this.$refs.ruleForm.resetFields()
                            }
                        },(error)=>{
                            console.log(error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
