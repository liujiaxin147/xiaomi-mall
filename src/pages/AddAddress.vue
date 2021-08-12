<template>
    <div>
    <NavHeader></NavHeader>
        <div style="margin-left: 50px">
            <a href="/Address" style="color: red;font-size: 16px">→收货地址设置←</a>
        </div>
    <div class="the-address">
        <div class="adr-tent" id="vue-address">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="tel">
                    <el-input type="text" v-model="ruleForm.tel" autocomplete="off" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio v-model="ruleForm.sex" label="男">男</el-radio>
                    <el-radio v-model="ruleForm.sex" label="女">女</el-radio>
                </el-form-item>
                <el-select placeholder="请选择" v-model="AddressList.address_name" @change="AddressChange">
                    <el-option v-for="item in AddressList" :label="item.address_name" :value="item.address_id">
                    </el-option>
                </el-select>&nbsp;
                <el-select placeholder="请选择" v-model="AddressChildList.address_name" @change="AddressChangeChild">
                    <el-option v-for="item in AddressChildList" :label="item.address_name" :value="item.address_id">
                    </el-option>
                </el-select>&nbsp;
                <el-select placeholder="请选择" v-model="AddressLastChildList.address_name">
                <el-option v-for="item in AddressLastChildList" :label="item.address_name" :value="item.address_id">
                </el-option>
            </el-select><br><br><br>
                <el-form-item label="详细地址" prop="address" style="width: 350px">
                    <el-input v-model.number="ruleForm.address"></el-input>
                </el-form-item>
                <el-form-item>
                    <button type="button" style="background: #3a8ee6;height:40px;width: 100px;" @click="RegisterForm('ruleForm')">添加</button>&nbsp;
                    <button type="button" style="background: #3a8ee6;height:40px;width: 100px" @click="resetForm('ruleForm')">重置</button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    </div>
</template>

<script>
    import NavHeader from "../components/NavHeader";
    export default {
        components: {NavHeader},
        data() {
            var validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名字'));
                } else {
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
            var validateAddress = (rule,value,callback)=>{
                if (value===''){
                    callback(new Error('详细地址不能为空'));
                }else{
                    callback();
                }
            };
            return {
                AddressList:[],
                AddressChildList:[],
                AddressLastChildList:[],
                ruleForm: {
                    name: '',
                    sex: '',
                    tel:'',
                    address:'',
                },
                rules: {
                    name: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    sex: [
                        { validator: validateSex, trigger: 'blur' }
                    ],
                    tel: [
                        { validator: validateTel, trigger: 'blur' }
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
        mounted() {
            this.axios.post("http://42.193.121.151:8000/commonAction/Address",{
            }).then((response)=>{
                this.AddressList = response.data
            },(error)=>{
                console.log(error)
            });
        },
        methods: {
            AddressChange:function(value){
                this.axios.post("http://42.193.121.151:8000/commonAction/AddressChild",{
                    "address_child":value
                }).then((response)=>{
                    this.AddressChildList = response.data
                },(error)=>{
                    console.log(error)
                })
            },
            AddressChangeChild:function(value){
                this.axios.post("http://42.193.121.151:8000/commonAction/AddressLastChild",{
                    "address_childLast":value
                }).then((response)=>{
                    this.AddressLastChildList = response.data
                },(error)=>{
                    console.log(error)
                })
            },
            Login(){
                this.$router.push({path:'/login'})
            },
            RegisterForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post("http://42.193.121.151:8000/commonAction/InsertAddress",{
                            'user_name':this.ruleForm.name,
                            'address_Top':this.AddressList.address_name,
                            'address_Child':this.AddressChildList.address_name,
                            'address_id':this.AddressLastChildList.address_name,
                            'user_sex':this.ruleForm.sex,
                            'user_tel':this.ruleForm.tel,
                            'address_detail':this.ruleForm.address,
                        }).then((respones)=>{
                            if (respones.data===1){
                                this.$message({
                                    message:'添加成功',
                                    type:'success',
                                    center:true,
                                    showClose:true
                                });
                                this.$router.push("/Address")
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

<style scoped>
    body, ol, ul, p, th, td, dl, dd, form, fieldset, legend, input, textarea, select, h1, h2, h3, h4, h5, h6 {
        margin: 0;
        padding: 0;
        font-weight: normal; }

    textarea {
        resize: none;
        outline: none;
        border: none; }

    textarea, select {
        font: 14px "Microsoft YaHei","SimSun","Arial Narrow",HELVETICA; }

    a {
        color: #666;
        text-decoration: none;
        font-size: 12px; }

    a:hover {
        text-decoration: none; }

    a:focus {
        text-decoration: none; }

    em, i {
        font-style: normal; }

    li {
        list-style: none; }

    img {
        display: block;
        _display: inline;
        border: 0;
        vertical-align: middle; }

    table {
        border-collapse: collapse;
        border-spacing: 0; }

    p {
        word-wrap: break-word; }

    input, button, select {
        margin: 0;
        padding: 0;
        outline: none;
        border: none;
        font: 14px "Microsoft YaHei","SimSun","Arial Narrow",HELVETICA; }

    html {
        min-width: 1100px; }

    .the-address, .the-address .adr-tent, .the-address .adr-tent .adr-table .table-thead .thh, .the-address .adr-tent .adr-table .table-tbody, .the-address .adr-tent .adr-table .table-tbody .item, .the-address .adr-tent .adr-table .table-tbody .item .tdd {
        overflow: hidden; }

    .the-address {
        margin: 0 auto; }

    .select {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; }

    .setChe, .setDefChe {
        background-repeat: no-repeat;
        background-size: cover;
        margin-right: .1rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        display: inline-block;
        background-color: transparent;
        border-radius: 0;
        background-size: contain;
        cursor: pointer; }

    .setChe {
        width: 18px;
        height: 18px; }

    .setDefChe {
        width: 14px;
        height: 14px;
        background-color: #fff;
        box-sizing: border-box; }

    .select {
        -moz-appearance: none;
        -webkit-appearance: none;
        padding-right: 30px;
        /*background: url("../images/ico-xiala.png") no-repeat scroll right center transparent;*/
        cursor: pointer; }

    [v-cloak] {
        display: none !important; }

    .the-address {
        width: 800px;
        margin-top: 40px;
        background-color: #fff; }
    .the-address .adr-tol {
        width: 100%;
        height: 42px;
        background-color: #e3f2fd;
        margin-bottom: 20px; }
    .the-address .adr-tol .tkk {
        height: 42px;
        line-height: 42px;
        margin-left: 5px; }
    .the-address .adr-tol .ico {
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        background-size: cover;
        margin-left: 15px;
        margin-top: 13px;
        float: left; }
    .the-address .adr-tent {
        height: auto; }
    .the-address .adr-tent .adr-table {
        width: 100%; }
    .the-address .adr-tent .adr-table .table-thead {
        width: 100%;
        height: 39px;
        border-bottom: 1px solid #dcdee3;
        background-color: #ebecf0; }
    .the-address .adr-tent .adr-table .table-thead .thh {
        text-align: left;
        border: 1px solid #dcdee3; }
    .the-address .adr-tent .adr-table .table-thead .thh .tn {
        padding: 12px 15px;
        display: inline-block; }
    .the-address .adr-tent .adr-table .table-tbody {
        width: 100%;
        height: auto; }
    .the-address .adr-tent .adr-table .table-tbody .item {
        box-sizing: border-box;
        text-align: left; }
    .the-address .adr-tent .adr-table .table-tbody .item:hover {
        background-color: #ebecf0; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd {
        box-sizing: border-box;
        border: 1px solid #dcdee3;
        border-top-color: transparent; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .ti {
        padding: 12px 14px;
        display: inline-block; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .tt {
        min-width: 50px;
        display: inline-block; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .handle {
        width: 70px; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .handle > * {
        display: inline-block; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .handle .line {
        margin: 0 5px;
        color: #dcdee3; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .handle .a-chg:hover {
        color: #f56954;
        text-decoration: underline; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .handle .i-del {
        cursor: pointer; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .handle .i-del:hover {
        color: #f56954; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .set-def {
        cursor: pointer;
        display: inline-block;
        text-decoration: none; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .set-def:hover {
        color: #f56954; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .set-def.cur {
        width: 80px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #f56954;
        cursor: default;
        border-radius: 3px;
        background: #ffd6cc;
        color: #e44135;
        text-align: center; }
    /*# sourceMappingURL=style.cssmap */
</style>
