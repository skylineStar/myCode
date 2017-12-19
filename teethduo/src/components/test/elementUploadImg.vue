<!-- element-ui upLoad  kyy -->
<template>
  <div>
	  	<el-upload
	  :action="upURL"
	  list-type="picture-card"
	  :on-preview="handlePictureCardPreview"
	  :on-remove="handleRemove"
	    :on-success="newhandlesuccess"
	   >
	  <i class="el-icon-plus"></i>
	</el-upload>
	<!--upImgelem(n)//"https://jsonplaceholder.typicode.com/posts/"   upURL action="https://jsonplaceholder.typicode.com/posts/"-->
	<el-dialog :visible.sync="dialogVisible" size="tiny">
	  <img width="100%" :src="dialogImageUrl" alt="">
	</el-dialog>
		<input type="button" value="上传" class="claOK" @click="newSubmitForm">
	</div>
</template>
<script>
import { config_param } from '../../assets/js/config_param';

export default {
	data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        upURL:config_param.base_path+'/webApp/mpform/upload/ecmre',
        imgFileList:[]
      };
    },
  methods: {
      handleRemove(file, fileList) {
        console.log("handleRemove------------"+file, fileList);
        console.log(file);
        
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
			newSubmitForm () {
				console.log(this.imgFileList);
      },
      newhandlesuccess(res, rawFile) {
      	console.log(res);
      	var key=(data.uploadImageRequestVoList)[0].key;
				this.imgFileList.push(key);
				console.log(this.imgFileList);
    }
      
  }
}
</script>
<!--<style scoped src="../../assets/csms.css"></style>-->
<style >
  /*@import '../../assets/css/csms.css'*/ 
</style>
