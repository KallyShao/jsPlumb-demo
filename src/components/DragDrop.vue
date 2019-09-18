<template>
<el-container>
	<el-aside width="200px">
		 <div>
				<h5>节点类型列表</h5>
				<el-row>
					<el-col>
						<drag class="drag" :tag="'div'" :transfer-data="{ type: 'vnf' }">
							<el-button type="primary" class="btn-controller">
								<!-- <i class="fa fa-play-circle-o" aria-hidden="true"></i> -->
								VNF
							</el-button>
						</drag>
						<drag class="drag" :tag="'div'" :transfer-data="{ type: 'vl' }">
							<el-button type="primary" class="btn-controller">
								<!-- <i class="fa fa-navicon" aria-hidden="true"></i> -->
								VL
							</el-button>
						</drag>
						<drag class="drag" :tag="'div'" :transfer-data="{ type: 'router' }">
							<el-button type="primary" class="btn-controller">
								<!-- <i class="fa fa-navicon" aria-hidden="true"></i> -->
								路由
							</el-button>
						</drag>
						<drag class="drag" :tag="'div'" :transfer-data="{ type: 'sub-router' }">
							<el-button type="primary" class="btn-controller">
								<!-- <i class="fa fa-navicon" aria-hidden="true"></i> -->
								子路由
							</el-button>
						</drag>
					</el-col>
				</el-row>
			</div>
	</el-aside>
	<el-main>
		<drop class="drop"
			:class="{ over }"
			:tag="'div'"
			@dragover="over = true"
			@dragleave="over = false"
			@drop="handleDrop">
			<div class="drop-region" id="flowchart-demo">
				<el-button type="default" class="vnf" id="vnf1">vnf1</el-button>
				<el-button type="default" class="vnf"  id="vnf2">vnf2</el-button>
				<el-button type="default" class="vnf"  id="vnf3">vnf3</el-button>
				<!-- <div class="vnf" id="vnf1"><i class="el-icon-edit"></i></div>
				<div class="vnf" id="vnf2"><i class="el-icon-platform-eleme"></i></div>
				<div class="vnf" id="vnf3"><i class="el-icon-user-solid"></i></div> -->
			</div>
		</drop>
	</el-main>
	<el-dialog :title="dialogTitle" :visible="vnfDialogVisible" @close="_handleVnfDialogClose">
		<el-form ref="form" :model="formVNF" label-width="80px">
			<el-form-item label="VNF名称">
				<el-input v-model="formVNF.name"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button @click="vnfDialogVisible=false">取消</el-button>
		</div>
	</el-dialog>
</el-container>
</template>

<script>
import jsPlumb from 'jsplumb';
import jsPlumbConfig from '@/utils/jsPlumbConfig.js';

const jsplumb = jsPlumb.jsPlumb;

	export default {
		data () {
			return { 
        over: false,
				showForm: false,
				vnfDialogVisible: false,
				formVNF: {
					name: ''
				},
				dialogTitle: 'vnf信息',
				vnfInfoList: [
					{	
						id: 'vnf_1_out',
						text: 'vnf1',
						tag: 'el-button'
					},
					{	
						id: 'vnf_2_out',
						text: 'vnf2',
						tag: 'el-button'
					}
				]
      };
		},
		methods: {
			main() {
				const config = this.getBaseConfig();
				console.log(config);
				const jInstance = jsplumb.getInstance({
					Container:"flowchart-demo"
				});
				// const jInstance = jsplumb.getInstance({
				// 			// ConnectionOverlays: [
				// 			// 		[ "Arrow", { width: 8, length: 10, location: 1 } ]
				// 			// ],
				// 						connectorOverlays: [
				// 					[ "Arrow", { width: 8, length: 10, location: 1 } ]
				// 			],
				// 			Container:"flowchart-demo",
				// });

        jInstance.draggable($('.vnf'));
				jInstance.addEndpoint('vnf1',{uuid:1 , anchor: "TopCenter",  isSource:true}, config);
				jInstance.addEndpoint('vnf2',{uuid:2 ,anchor:'Right', isTarget:true, maxConnections: -1 }, config);
        jInstance.addEndpoint('vnf3',{anthors:'Right', isTarget:true, isSource: true }, config);
				
				jInstance.connect({
					uuids:[1,2],  //根据uuid进行连接
					// paintStyle: { stroke: 'red', strokeWidth: 2 },  //线的样式
					endpointStyle: { fill: 'blue', outlineStroke: 'darkgray', outlineWidth: 2 },//点的样式
					// overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ]   //覆盖物 箭头 及 样式
				});
			},
			getBaseConfig() {
				return Object.assign({}, jsPlumbConfig.baseStyle);
			},
			handleDrop(data, ev) {
				console.log(ev);
        this.over = false;
				// this.showForm = true;
				this.vnfDialogVisible = true;
			},
			onSubmit() {

			},
			_handleVnfDialogClose() {

			}
		},
		mounted() {
			const me = this;
			jsplumb.ready(function() {
				me.main();
			});
		}
	};
</script>

<style>
.el-container {
	min-height: 1000px;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 50px;
	}
	  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  
  .drop-region {
    width: 100%;
		height: 100%;
		position: relative;
	}
	.vnf {
		position: absolute;
	}
	#vnf1 {
		top: 4em;
    left: 5em;
	}
	#vnf2 {
    top: 7em;
    left: 16em;
	}
	#vnf3 {
   top: 7em;
    left: 8em;
	}
	.form-wrap {
		width: 400px;
		background: #fff;
		padding: 20px;
		border-radius: 5px;
	}
	/* .drop.over {
		border-color: #aaa;
		background: #ccc;
	} */

</style>