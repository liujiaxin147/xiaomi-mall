<template>
    <div>
    <NavHeader></NavHeader>
    <!--the-address-->
    <div class="the-address">
        <el-button type="primary" @click="AddAddress">添加收货地址</el-button>
        <div class="adr-tent" id="vue-address">
            <table class="adr-table">
                <thead class="table-thead">
                <tr>
                    <th rowspan="1" class="thh" style="text-align: center">
                        <span class="tn">收货人</span>
                    </th>
                    <th rowspan="1" class="thh" style="text-align: center">
                        <span class="tn">所在地区</span>
                    </th>
                    <th rowspan="1" class="thh" style="text-align: center">
                        <span class="tn">详细地址</span>
                    </th>
<!--                    <th rowspan="1" class="thh" style="text-align: center">-->
<!--                        <span class="tn">邮编</span>-->
<!--                    </th>-->
                    <th rowspan="1" class="thh" style="text-align: center">
                        <span class="tn">电话/手机</span>
                    </th>
                    <th rowspan="1" class="thh" style="text-align: center">
                        <span class="tn">操作</span>
                    </th>
                    <th rowspan="1" class="thh" style="text-align: center">
                        <span class="tn">设置</span>
                    </th>
                </tr>
                </thead>
                <tbody class="table-tbody">
                <tr class="item" v-for="(item,i) in AddressData" :key="i">
                    <td class="tdd" style="text-align: center">
                <span class="ti">
                    <em class="tt">{{item.user_name}}</em>
                </span>
                    </td>
                    <td class="tdd" style="text-align: center">
                <span class="ti">
                    <em class="tt">{{item.address_parent}}   {{item.address_name}}   {{item.addressChild}}</em>
                </span>
                    </td>
                    <td class="tdd" style="text-align: center">
                <span class="ti">
                    <em class="tt">{{item.address_detail}}</em>
                </span>
                    </td>
<!--                    <td class="tdd" style="text-align: center">-->
<!--                <span class="ti">-->
<!--                    <em class="tt"></em>-->
<!--                </span>-->
<!--                    </td>-->
                    <td class="tdd" style="text-align: center">
                <span class="ti">
                    <em class="tt">{{item.user_tel}}</em>
                </span>
                    </td>
                    <td class="tdd" style="text-align: center">
                <span class="ti">
                     <div class="handle">
<!--                        <a href="javascript:;" class="a-chg">修改</a>-->
                         <el-button type="text" @click="updateAddress(item.address_detail_id)">修改</el-button>
                         <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                      <el-form>
                        <el-form-item label="收货人" :label-width="formLabelWidth">
                          <el-input autocomplete="off" v-model="AddressUpdateData.user_name">{{AddressUpdateData.user_name}}</el-input>
                        </el-form-item>
                        <el-form-item label="详细地址" :label-width="formLabelWidth">
                          <el-input autocomplete="off" v-model="AddressUpdateData.address_detail">{{AddressUpdateData.address_detail}}</el-input>
                        </el-form-item>
                        <el-form-item label="电话" :label-width="formLabelWidth">
                          <el-input autocomplete="off" v-model="AddressUpdateData.user_tel">{{AddressUpdateData.user_tel}}</el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="AddressUpdate">修 改</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                      </div>
                    </el-dialog>
                        <i class="line">|</i>
                         <el-popconfirm @confirm="pop(item.address_detail_id,i)"
                                 confirm-button-text='删除'
                                 cancel-button-text='取消'
                                 icon="el-icon-info"
                                 icon-color="red"
                                 title="确定要删除该收货地址吗？"
                         >
                        <el-button slot="reference">删除</el-button>
                        </el-popconfirm>
<!--                        <em class="i-del">删除</em>-->
                    </div>
                </span>
                    </td>
                    <td class="tdd" style="text-align: center">
                <span class="ti">
<!--                     <em class="set-def cur">默认地址</em>-->
                     <p class="set-def" v-if="item.address_state==1" style="color: blue">已默认</p>
                     <em class="set-def" v-else="item.address_state==0" @click="Default(item.address_detail_id)" style="cursor: pointer;color: red">设为默认收货地址</em>
                </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
</template>
<script>
    import NavHeader from "../components/NavHeader";
    export default {
        name: "",
        components: {NavHeader},
        data(){
            return{
                AddressData:[],
                AddressUpdateData:[],
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px'
            }
        },
        created() {
          this.axios.post("http://42.193.121.151:8000/commonAction/AddressData",{
          }).then((response)=>{
              this.AddressData = response.data
          },(error)=>{
              console.log(error)
          })
        },
        methods:{
            AddAddress(){
              this.$router.push("/AddAddress")
            },
            Default:function (address_detail_id) {
                this.axios.post("http://42.193.121.151:8000/commonAction/defaultAddress",{
                    "address_detail_id":address_detail_id,
                }).then((response)=>{
                    if (response.data>0){
                        location.reload()
                        this.$message({
                            message:'设置成功',
                            type:'success',
                            center:true
                        })
                    }
                },(error)=>{
                    console.log(error)
                })
            },
            pop:function (address_detail_id,i) {
                this.axios.post("http://42.193.121.151:8000/commonAction/deleteAddress",{
                    "address_detail_id":address_detail_id
                }).then((response)=>{
                    if (response.data === 1){
                        this.AddressData.splice(i,1)
                        this.$message({
                            type:"success",
                            message:'删除成功'
                        })
                    }
                },(error)=>{
                    console.log(error)
                })
            },
            updateAddress:function (address_detail_id) {
                this.dialogFormVisible = true;
                this.axios.post("http://42.193.121.151:8000/commonAction/AddressUpdateData",{
                    "address_detail_id":address_detail_id
                }).then((response)=>{
                    this.AddressUpdateData = response.data[0]
                },(error)=>{
                    console.log(error)
                })
            },
            AddressUpdate:function () {
                this.axios.post("http://42.193.121.151:8000/commonAction/AddressUpdate",{
                    "address_detail_id":this.AddressUpdateData.address_detail_id,
                    "user_name":this.AddressUpdateData.user_name,
                    "address_detail":this.AddressUpdateData.address_detail,
                    "user_tel":this.AddressUpdateData.user_tel,
                }).then((response)=>{
                    if (response.data === 1){
                        location.reload()
                        this.$message({
                            type:"success",
                            message:'修改成功'
                        })
                    }
                    console.log(response.data)
                },(error)=>{
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    em, i {
        font-style: normal; }
    table {
        border-collapse: collapse;
        border-spacing: 0; }
    /*input, button, select {*/
    /*    margin: 0;*/
    /*    padding: 0;*/
    /*    outline: none;*/
    /*    border: none;*/
    /*    font: 14px "Microsoft YaHei","SimSun","Arial Narrow",HELVETICA; */
    /*}*/
    .the-address {
        margin: 0 auto; }
    .the-address {
        width: 1200px;
        margin-top: 40px;
        background-color: #fff; }
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
    .the-address .adr-tent .adr-table .table-tbody .item:hover {
        background-color: #ebecf0; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd {
        box-sizing: border-box;
        border: 1px solid #dcdee3;
        border-top-color: transparent; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .ti {
        padding: 12px 14px;
        display: inline-block; }
    .the-address .adr-tent .adr-table .table-tbody .item .tdd .handle .line {
        margin: 0 5px;
        color: #dcdee3; }
    /*# sourceMappingURL=style.cssmap */
</style>
