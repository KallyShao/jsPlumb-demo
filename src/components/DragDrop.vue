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
				</el-col>
			</el-row>
		</div>
	</el-aside>
	<el-main>
		<el-row class="nsd-info">
			<el-col>
				<div>nsd info</div>
			</el-col>
		</el-row>
		<el-row class="operation-btn">
			<el-col>
				<div class="pull-right">
					<el-button type="primary" size="mini">校验</el-button>
					<el-button type="primary" size="mini">导出</el-button>
					<el-button type="primary" size="mini">提交</el-button>
				</div>
			</el-col>
		</el-row>
		<el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
			<el-tab-pane
				:key="item.name"
				v-for="(item, index) in editableTabs"
				:label="item.title"
				:name="item.name"
			>
				<el-row>
					<el-col>
						<div class="temp-save">
							<el-button type="success" size="mini" class="pull-right">保存</el-button>
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<div class="deploy-flavor-info">
							{{ item.deployInfo }}
						</div>
					</el-col>
				</el-row>
			</el-tab-pane>
			<drop class="drop"
				:class="{ over }"
				:tag="'div'"
				ref="dropRegion"
				@dragover="over = true"
				@dragleave="over = false"
				@drop="_handleDrop">
					<div class="drop-region" id="flowchart-demo">
						<template v-for="(node, key) in nodeList">
							<el-button v-for="item in node.itemList"
								type="default"
								class="draggable"
								:key="item.id"
								:id="item.id"
								:item_id="item.item_id"
								:style="item.position"
								:node_type="key"
							>
								{{ item.item_id }}
								<i class="edit el-icon-edit"></i>
								<i class="close el-icon-close" aria-hidden="true" @click="_deleteNode(item.item_id)"></i>
							</el-button>
						</template>
					</div>
			</drop>

		</el-tabs>
	</el-main>
	<el-dialog title="vnf" :visible="VNFDialogVisible" @close="_handleDialogClose('vnf')">
		<el-form ref="form" :model="formVNF" label-width="80px">
			<el-form-item label="VNF名称">
				<el-input v-model="formVNF.name"></el-input>
			</el-form-item>
			<el-form-item label="VNF item id">
				<el-input v-model="formVNF.item_id"></el-input>
			</el-form-item>
			<el-form-item v-for="item in formVNF.cpInfoList" :label="item.name" :key="item.item_id">
				<el-input v-model="item.item_id"></el-input>
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
			<el-form-item label="Network id">
				<el-input v-model="formNetwork.item_id"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="onSubmit('Network')">立即创建</el-button>
				<el-button @click="NetworkDialogVisible=false">取消</el-button>
		</div>
	</el-dialog>
	<el-dialog title="subnet" :visible="SubnetDialogVisible" @close="_handleDialogClose('Subnet')">
		<el-form ref="form" :model="formSubnet" label-width="80px">
			<el-form-item label="Subnet名称">
				<el-input v-model="formSubnet.name"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="onSubmit('Subnet')">立即创建</el-button>
				<el-button @click="SubnetDialogVisible=false">取消</el-button>
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
const config = Object.assign({}, jsPlumbConfig.baseStyle);

	export default {
		data () {
			return {
        over: false,
				showForm: false,
				VNFDialogVisible: false,
				NetworkDialogVisible: false,
				SubnetDialogVisible: false,
				formVNF: {
					name: '',
					item_id: '',
					cpInfoList: [
						{
							name: 'cp0',
							item_id: 'cp_itemid_0'
						},
						{
							name: 'cp1',
							item_id: 'cp_itemid_1'
						}
					]
				},
				formNetwork: {
					name: '',
					item_id:  ''
				},
				formSubnet: {
					name: '',
					item_id:  ''
				},
				categoryList: [],
				nodeList: {},
				// nodeList: {
				// 	VNF: {
				// 		type: 'VNF',
				// 		properties: [],
				// 		connections: {},
				// 		itemList: []
				// 	},
				// 	CP: {
				// 		type: 'CP',
				// 		properties: [],
				// 		connections: {},
				// 		itemList: []
				// 	}
				// },
				tempItemObj: {},
				nodePosition: {},
				submitNodeTemplate:{},
				editableTabsValue: '1',
        editableTabs: [
					{
          title: 'Deploy 1',
					name: '1',
					deployInfo: 'deployInfo__0'
        }, {
          title: 'Deploy 2',
					name: '2',
					deployInfo: 'deployInfo__1'
        }],
        tabIndex: 2
      };
		},
		methods: {
			// 节点拖拽，添加断点
			itemInitial(id) {
				this.jInstance.draggable(id, {
					containment: 'parent'
				});
				this.jInstance.addEndpoint(id, {
					// anchor: 'Bottom',
					isSource: true,
					isTarget: true
				}, config);
			},
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
				}
			},
			main() {
				const me = this;

				this.jInstance = jsplumb.getInstance({
					Container:"flowchart-demo"
				});
				this.jInstance.importDefaults({
					// ReattachConnections: true,
					ConnectionsDetachable   : false,
				});
					// 判断能否连接
					this.jInstance.bind('beforeDrop', function(info) {
						const endpoints = info.connection.endpoints;
						const dropEnd = info.dropEndpoint;
						const sourceNodeType = endpoints[0].element.attributes.getNamedItem('node_type').value;
						const targetNodeType = dropEnd.element.attributes.getNamedItem('node_type').value;

						// 判断目标节点是否允许和源节点连接
						let connections = [];
						const sourceNode = me.nodeList[sourceNodeType];
						for (let k in sourceNode.connections) {
							connections.push(k);
						}
						if (connections.includes(targetNodeType)) {
							return true;
						} else {
							me.$alert('不能连接！');
							return false;
						}
					});
				// 2个节点建立连接的事件
				this.jInstance.bind("connection", function(info) {
					// console.log(info);
					const sourceNodeType = info.source.attributes.getNamedItem('node_type').value;
					const targetNodeType = info.target.attributes.getNamedItem('node_type').value;

					const sourceItemId = info.source.attributes.getNamedItem('item_id').value;
					const targetItemId = info.target.attributes.getNamedItem('item_id').value;

					const sourceNodeItem = me.submitNodeTemplate[sourceNodeType] ? me.submitNodeTemplate[sourceNodeType] : [];
					const targetNodeItem = me.submitNodeTemplate[targetNodeType] ? me.submitNodeTemplate[targetNodeType] : [];

					// 将source item id添加至source节点，target id添加至source节点的connection
					const sourceItemIds = [];
					sourceNodeItem.map(item => {
						sourceItemIds.push(item.item_id);
					});

					if (sourceItemIds.find(id => id === sourceItemId)) {
						sourceNodeItem.map(item => {
							if (item.item_id === sourceItemId) {
								item.connections[targetNodeType] = item.connections[targetNodeType] ? item.connections[targetNodeType] : [];
								item.connections[targetNodeType].push(targetItemId);
							}
						});
					} else {
						sourceNodeItem.push({
							item_id: sourceItemId,
							connections: {
								[ targetNodeType ]: [ targetItemId ]
							}
						});
					}

					// 添加相应的target节点信息
					const targetItemIds = [];
					targetNodeItem.map(item => {
						targetItemIds.push(item.item_id);
					});

					if (targetItemIds.find(id => id === targetItemId)) {
						targetNodeItem.map(item => {
							if (item.item_id === targetItemId) {
								item.connections[sourceNodeType] = item.connections[sourceNodeType] ? item.connections[sourceNodeType] : [];
								item.connections[sourceNodeType].push(sourceItemId);
							}
						});
					} else {
						targetNodeItem.push({
							item_id: targetItemId,
							connections: {
								[ sourceNodeType ]: [ sourceItemId ]
							}
						});
					}
					me.submitNodeTemplate[sourceNodeType] = sourceNodeItem;
					me.submitNodeTemplate[targetNodeType] = targetNodeItem;
					// console.log('建立连接=====');
					// console.log(me.submitNodeTemplate);
				});

				this.jInstance.bind('dblclick', function (conn, originalEvent) {
					// console.log(conn);
					// console.log(conn.getAttachedElements());
					const sourceId = conn.sourceId;
					const targetId = conn.targetId;
					const endpoints = conn.getAttachedElements();
					let sourceInfo = {};
					let targetInfo = {};
					endpoints.map(item => {
						const id = item.element.attributes.getNamedItem('id').value;
						const nodeType = item.element.attributes.getNamedItem('node_type').value;
						const itemId = item.element.attributes.getNamedItem('item_id').value;
						if (id === sourceId) {
							sourceInfo = {
								id: id,
								node_type: nodeType,
								item_id: itemId
							};
						} else if (id === targetId) {
							targetInfo = {
								id: id,
								node_type: nodeType,
								item_id: itemId
							};
						}
					});

					me.$confirm('确定删除所点击的链接吗？').then(() => {
						me.jInstance.deleteConnection(conn);
						// 删除submitNodeTemplate中的连线关系
						const sourceNodeItem = me.submitNodeTemplate[sourceInfo.node_type];
						const targetNodeItem = me.submitNodeTemplate[targetInfo.node_type];
						// 删除source节点connections中的target id
						sourceNodeItem.map(item => {
							if (item.item_id === sourceInfo.item_id) {
								for (let k in item.connections) {
									if (k === targetInfo.node_type) {
										const idx = item.connections[k].findIndex(val => {
											return val === targetInfo.item_id;
										});
										item.connections[k].splice(idx, 1);
									}
								}
							}
						});
						// 删除target节点connections中的source id
						targetNodeItem.map(item => {
							if (item.item_id === targetInfo.item_id) {
								for (let k in item.connections) {
									if (k === sourceInfo.node_type) {
										const idx = item.connections[k].findIndex(val => {
											return val === sourceInfo.item_id;
										});
										item.connections[k].splice(idx, 1);
									}
								}
							}
						});
						me.submitNodeTemplate[sourceInfo.node_type] = sourceNodeItem;
						me.submitNodeTemplate[targetInfo.node_type] = targetNodeItem;
						// console.log(me.submitNodeTemplate);
					})
					.catch(() => {

					})
				});
			},
			_handleDrop(data, ev) {
				console.log(ev);
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
				this.tempItemObj = {
					item_id: this['form'+name].item_id,
					id: uuidv1(),
					position: this.nodePosition
				};
				this.nodeList[name].itemList.push(this.tempItemObj);

				// 添加cp节点
				if (name === 'VNF') {
					const cpList = this.formVNF.cpInfoList;
					cpList.map(cp => {
						this.nodeList['CP'].itemList.push({
								id: uuidv1(),
								item_id: cp.item_id,
								position: {

								}
						});
					});
				}

				this[name + 'DialogVisible'] = false;

				this.$nextTick(() => {
					this.itemInitial(this.tempItemObj.id);
					// cp与vnf连线
					if (name === 'VNF') {
						this.nodeList['CP'].itemList.map(cp => {
							this.itemInitial(cp.id);

							// this.submitNodeTemplate['CP'].push({
							// 	item_id: cp.item_id,
							// 	connections: {
							// 		VNF: 
							// 	}
							// });
						});
					}
				});
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
				if (key !== 'CP') {
					this.categoryList.push({
						type: key
					});
				}
				// 初始化节点数据
				for (let k in nodeTypes) {
					nodeTypes[k].itemList = [];
				}
				this.nodeList = nodeTypes;
				// this.nodeList.push({
				// 	node_type: key,
				// 	itemList: [],
				// 	connections: nodeTypes[key].connections
				// });
			}
			// console.log(this.nodeList);
		},
		mounted() {
			const me = this;
			jsplumb.ready(function() {
				me.main();
			});
			console.log(this.$refs.dropRegion);
			this.$nextTick(() => {
				const dropRegionTop = this.$refs.dropRegion.getBoundingClientRect().top;
				const dropRegionLeft = this.$refs.dropRegion.getBoundingClientRect().left;
				console.log(dropRegionTop);
				console.log(dropRegionLeft);
			});
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
	}
  .drop-region {
    width: 100%;
		min-height: 1000px;
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