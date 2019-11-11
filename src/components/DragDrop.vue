<template>
<el-container>
	<el-aside width="200px">
		<div>
				<h5>节点类型列表</h5>
				<el-row>
					<el-col>
						<drag v-for="item in categoryList"
							class="drag" :tag="'div'"
							:transfer-data="item"
							:key="item.type"
							@drag="_handleDrag(item.type, ...arguments)"
						>
							<el-button type="primary" class="btn-controller">
								{{ item.type }}
							</el-button>
						</drag>
						<!-- <drag class="drag" :tag="'div'" :transfer-data="{ type: 'vnf' }">
							<el-button type="primary" class="btn-controller">
								<i class="fa fa-play-circle-o" aria-hidden="true"></i>
								VNF
							</el-button>
						</drag> -->
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
			@drop="_handleDrop">
			<div class="drop-region" id="flowchart-demo">
				<template v-for="node in nodeList">
					<el-button v-for="item in node.itemList"
						type="default"
						class="draggable"
						:key="item.id"
						:id="item.id"
						:style="item.position"
						:node_type="node.node_type"
						:connections=""
					>
						{{ node.node_type }}_{{ item.index }}
						<i class="edit el-icon-edit"></i>
						<i class="close el-icon-close" aria-hidden="true" @click="_deleteNode(item.item_id)"></i>
					</el-button>
				</template>
				<!-- <el-card class="box-card draggable" v-for="(node, idx) in nodeList" :style="node.position"
					:id="node.id"
					:key="idx">
					<div slot="header" class="clearfix">
						<span>{{ node.type }}</span>
						<el-button style="float: right; padding: 3px 0" type="text">
							<i class="el-icon-close"></i>
						</el-button>
					</div>
					<div v-for="(item, idx) in node.itemList" :key="idx" class="text item">
						<span>{{ node.type }}_{{ idx }}</span>
						<div class="icon-wrap">
							<i class="el-icon-edit"></i>
							<i class="el-icon-remove"></i>
							<i class="el-icon-circle-plus"></i>
						</div>
					</div>
				</el-card> -->
			</div>
		</drop>
	</el-main>
	<el-dialog title="vnf" :visible="VNFDialogVisible" @close="_handleDialogClose('vnf')">
		<el-form ref="form" :model="formVNF" label-width="80px">
			<el-form-item label="VNF名称">
				<el-input v-model="formVNF.name"></el-input>
			</el-form-item>
			<el-form-item label="VNF item id">
				<el-input v-model="formVNF.item_id"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="onSubmit('VNF')">立即创建</el-button>
				<el-button @click="VNFDialogVisible=false">取消</el-button>
		</div>
	</el-dialog>
	<el-dialog title="vl" :visible="NetworkDialogVisible" @close="_handleDialogClose('Network')">
		<el-form ref="form" :model="formNetwork" label-width="80px">
			<el-form-item label="Network名称">
				<el-input v-model="formNetwork.name"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="onSubmit('Network')">立即创建</el-button>
				<el-button @click="NetworkDialogVisible=false">取消</el-button>
		</div>
	</el-dialog>
</el-container>
</template>

<script>
import jsPlumb from 'jsplumb';
import jsPlumbConfig from '@/utils/jsPlumbConfig.js';
import { nodeTemplate } from '@/utils/jsPlumbData.js';
const uuidv1 = require('uuid/v1');
const jsplumb = jsPlumb.jsPlumb;

	export default {
		data () {
			return {
        over: false,
				showForm: false,
				VNFDialogVisible: false,
				NetworkDialogVisible: false,
				routerDialogVisible: false,
				formVNF: {
					name: '',
					item_id: ''
				},
				formNetwork: {
					name: '',
					item_id:  ''
				},
				categoryList: [],
				// categoryList: [
				// 	{
				// 		type: 'VNF',
				// 	},
				// 	{
				// 		type: 'Network',
				// 	}
				// ],
				// nodeList: [],
				nodeList: [
					{
						node_type: 'VNF',
						itemList: [],
							"connections": {
								"CP": {
									"multiple": true,
									"required": false
								},
								"Network": {
									"multiple": true,
									"required": false
								},
								"TapService": {
									"required": false,
									"description": "requiredwhenneed_tapaasistrue"
								}
							}
					},
					{
						node_type: 'Network',
						itemList: []
					}
				],
				obj: {},
				nodePosition: {}
      };
		},
		methods: {
			main() {
				const me = this;
				this.jInstance = jsplumb.getInstance({
					Container:"flowchart-demo"
				});
				const instance = this.jInstance;
				this.jInstance.importDefaults({
					// ReattachConnections: true,
					ConnectionsDetachable   : false,
				});
				// 2个节点建立连接的事件
				this.jInstance.bind("connection", function(info) {
					// console.log(info);
					const sourceNodeType = info.source.attributes.getNamedItem('node_type').value;
					const targetNodeType = info.target.attributes.getNamedItem('node_type').value;
			

					// this.nodeList.map(node => {
					// 	if (node.node_type === )
					// })
				});
				// 判断能否连接
				this.jInstance.bind("beforeDrop", function(info) {
					console.log(info);
					const endpoints = info.connection.endpoints;
					const dropEnd = info.dropEndpoint;
					const sourceNodeType = endpoints[0].element.attributes.getNamedItem('node_type').value;
					const targetNodeType = dropEnd.element.attributes.getNamedItem('node_type').value;
					if (sourceNodeType === targetNodeType) {
						alert('同类型节点不能相连');
						return false;
					} else {
						return true;
					}
				});
				this.jInstance.bind('dblclick', function (conn, originalEvent) {
					// console.log(conn);
					me.$confirm('确定删除所点击的链接吗？').then(() => {
						instance.deleteConnection(conn);
					})
					.catch(() => {

					})
				});
			},
			getBaseConfig() {
				return Object.assign({}, jsPlumbConfig.baseStyle);
			},
			_handleDrop(data, ev) {
				let type = data.type;
				let visible = type + 'DialogVisible';
        this.over = false;
				this[visible] = true;

				this.nodePosition = {
					top: ev.pageY + 'px',
					left: ev.pageX - 200 + 'px'
				};
			},
			_handleDrag(name, transferData, ev) {
				// console.log(transferData);
			},
			onSubmit(name) {
				this.nodeList.map(node => {
					if (node.node_type === name) {
						const count = node.itemList.length;
						this.obj = {
							index: count + 1,
							item_id: this['form'+name].item_id,
							id: uuidv1(),
							position: this.nodePosition
						};
						node.itemList.push(this.obj);
					}
				});
				this[name + 'DialogVisible'] = false;
			},
			_handleDialogClose(name) {
				this[name + 'DialogVisible'] = false;
			},
			_deleteNode(id) {
				// 删除整个dom节点
				this.jInstance.remove(id);            
			}
		},
		created() {
			const nodeTypes = nodeTemplate.nodetypes;
			for (let key in nodeTypes) {
				this.categoryList.push({
					type: key
				});
				// 
				// this.nodeList.push({
				// 	node_type: key,
				// 	itemList: [],
				// 	connections: nodeTypes[key].connections
				// });
			}
			console.log(this.nodeList);
		},
		mounted() {
			const me = this;
			jsplumb.ready(function() {
				me.main();
			});
		},
		watch: {
			nodeList: {
				handler: function(newVal, oldVal) {
					const config = this.getBaseConfig();
					newVal.map(node => {
						node.itemList.map(item => {
							this.$nextTick(() => {
								this.jInstance.draggable(item.id, {
									containment: 'parent'
								});
								this.jInstance.addEndpoint(this.obj.id, {
									// anchor: 'Bottom',
									isSource: true,
									isTarget: true,
									uuid: this.obj.id,
									// anchor:[ "Continuous" ]
								}, config);
							});
						});
					});
				},
				deep: true
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  .el-button, .el-card {
		transition: 0s;
		-webkit-transition: 0s;
		position: relative;
	}
	.el-button .close {
		position: absolute;
		top: 2px;
		right: 2px;
		/* font-size: 16px; */
	}
  .drop-region {
    width: 100%;
		height: 100%;
		position: relative;
	}
	.draggable {
		position: absolute;
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
.drop-region /deep/ .el-card__header {
	padding: 8px 20px;
	color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
.drop-region /deep/ .el-card__body {
	padding: 20px 0 10px;
}
.text {
	font-size: 14px;
}
.item {
	padding: 0 10px 5px;
	margin-bottom: 12px;
	border-bottom: 1px solid #ddd;
}
.icon-wrap {
	float: right;
	i {
		&.el-icon-edit {
			margin-right: 5px;
		}
		&:hover {
			color: #bce8f1;
			cursor: pointer;
		}
	}
}
.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
.clearfix:after {
	clear: both
}
.box-card {
	width: 180px;
	border: 1px solid transparent;
	border-color: #bce8f1;
}
</style>