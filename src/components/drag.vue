<template>
<el-container>
	<el-aside width="200px">
		<div>
				<h5>节点类型列表</h5>
				<el-row>
					<el-col>
						<!-- <drag v-for="item in categoryList"
							class="drag" :tag="'div'"
							:transfer-data="item"
							:key="item.type"
							@drag="_handleDrag(item.type, ...arguments)"
						>
							<el-button type="primary" class="btn-controller">
								{{ item.type }}
							</el-button>
						</drag> -->
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
        <template>
          <button id="drag-test" class="draggable">drag</button>
          <button id="drag-test0" class="draggable">drag0</button>
        </template>
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
</el-container>
</template>

<script>
import jsPlumb from 'jsplumb';
import jsPlumbConfig from '@/utils/jsPlumbConfig.js';
import nodeTemplate from '@/utils/jsPlumbData.js';
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
				obj: {},
				nodePosition: {}
      };
		},
		methods: {
      _handleDrop() {

			},
						getBaseConfig() {
				return Object.assign({}, jsPlumbConfig.baseStyle);
			},
			main() {
				const me = this;
				this.jInstance = jsplumb.getInstance({
					Container:"flowchart-demo"
        });
        this.jInstance.draggable('drag-test', {
          containment: 'parent'
				});
				this.jInstance.draggable('drag-test0', {
          containment: 'parent'
        });

				const instance = this.jInstance;
				this.jInstance.importDefaults({
					// ReattachConnections: true,
					ConnectionsDetachable: false,
					// isSource: true,
        	// isTarget: true
				});
					const config = this.getBaseConfig();

				this.jInstance.addEndpoint('drag-test', {
					// anchor: 'Bottom',
					isSource: true,
					isTarget: true,
					// anchor:[ "Continuous" ]
				}, config);
				this.jInstance.addEndpoint('drag-test0', {
					// anchor: 'Bottom',
					isSource: true,
					isTarget: true,
					// anchor:[ "Continuous" ]
				}, config);
				this.jInstance.bind("connection", function(info) {
					console.log(info);
				});
			},
			onSubmit(name) {

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
</style>