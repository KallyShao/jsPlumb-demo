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
							:key="item.name"
							@drag="_handleDrag(item.name, ...arguments)"
						>
							<el-button type="primary" class="btn-controller">
								{{ item.label }}
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
				<el-button v-for="item in itemList"
					type="default"
					class="draggable"
					:key="item.id"
					:id="item.id"
					:style="item.pos"
				>
				{{ item.text }}
				<i class="close el-icon-close" aria-hidden="true" @click="_deleteNode(item.id)"></i>
				</el-button>
			</div>
		</drop>
	</el-main>
	<el-dialog title="vnf" :visible="vnfDialogVisible" @close="_handleDialogClose('vnf')">
		<el-form ref="form" :model="formVNF" label-width="80px">
			<el-form-item label="VNF名称">
				<el-input v-model="formVNF.name"></el-input>
			</el-form-item>
			<el-form-item label="VNF id">
				<el-input v-model="formVNF.id"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="onSubmit('vnf')">立即创建</el-button>
				<el-button @click="vnfDialogVisible=false">取消</el-button>
		</div>
	</el-dialog>
	<el-dialog title="vl" :visible="cpDialogVisible" @close="_handleDialogClose('cp')">
		<el-form ref="form" :model="formVL" label-width="80px">
			<el-form-item label="cp名称">
				<el-input v-model="formVL.name"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="onSubmit('cp')">立即创建</el-button>
				<el-button @click="cpDialogVisible=false">取消</el-button>
		</div>
	</el-dialog>
	<el-dialog title="router" :visible="routerDialogVisible" @close="_handleDialogClose('router')">
		<el-form ref="form" :model="formRouter" label-width="80px">
			<el-form-item label="router名称">
				<el-input v-model="formRouter.name"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="onSubmit('vl')">立即创建</el-button>
				<el-button @click="routerDialogVisible=false">取消</el-button>
		</div>
	</el-dialog>
</el-container>
</template>

<script>
import jsPlumb from 'jsplumb';
import jsPlumbConfig from '@/utils/jsPlumbConfig.js';
import nodeInfo from '@/utils/jsPlumbData.js';
const uuidv1 = require('uuid/v1');
const jsplumb = jsPlumb.jsPlumb;

	export default {
		data () {
			return {
        over: false,
				showForm: false,
				vnfDialogVisible: false,
				cpDialogVisible: false,
				routerDialogVisible: false,
				formVNF: {
					name: ''
				},
				formVL: {
					name: ''
				},
				formRouter: {
					name: ''
				},
				categoryList: [
					{
						label: 'VNF',
						name: 'vnf',
						isTarget: false,
						isSource: true
					},
					{
						label: 'CP',
						name: 'cp',
						isTarget: true,
						isSource: true
					},
					{
						label: 'Network',
						name: 'network',
						isTarget: true,
						isSource: false
					},
					{
						label: '子路由',
						name: 'sub-router',
						isTarget: true,
						isSource: false
					}
				],
				itemList: [],
				obj: {}
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
				this.jInstance.bind("connection", function(info) {
					// console.log(info);
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
				let name = data.name;
				let visible = name + 'DialogVisible';
        this.over = false;
				this[visible] = true;

				this.obj = {
					id: uuidv1(),
					text: data.label,
					isTarget: data.isTarget,
					isSource: data.isSource,
					pos: {
						top: ev.pageY + 'px',
						left: ev.pageX - 200 + 'px'
					}
				};
			},
			_handleDrag(name, transferData, ev) {
				// console.log(transferData);
			},
			onSubmit(name) {
				this.itemList.push(this.obj);
				const config = this.getBaseConfig();
				this.$nextTick(() => {
					this.jInstance.draggable(this.obj.id, {
						containment: 'parent'
					});
					this.itemList.map(item => {
						if (item.isTarget) {
							this.jInstance.addEndpoint(item.id, {
								// anchor: 'TopCenter',
								isTarget: true,
								isSource: false,
								uuid: item.id
							}, config);
						}
						if (item.isSource) {
							this.jInstance.addEndpoint(item.id, {
								// anchor: 'Bottom',
								isSource: true,
								isTarget: false,
								uuid: item.id,
								endpointStyle: { fill: 'blue', outlineStroke: 'darkgray', outlineWidth: 2 }
							}, config);
						}
					});
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
  .el-button {
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

</style>