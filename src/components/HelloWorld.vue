<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
          <div>
            <h5>节点类型列表</h5>
            <el-row>
              <el-col>
                <el-button type="primary" class="btn-controller">
                  <i class="fa fa-play-circle-o" aria-hidden="true"></i>
                  语音播报
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-button type="primary" class="btn-controller">
                  <i class="fa fa-navicon" aria-hidden="true"></i>
                  菜单
                </el-button>
              </el-col>
            </el-row>
          </div>
      </el-aside>
      <el-main>
        <div class="col-md-11 bg-success min-height" id="drop-bg">

        </div>
      </el-main>
    </el-container>

    <div class="container-fluid">
      <div class="row">
        <div id="side-buttons" class="col-md-1 bg-info min-height">
          <div id="main">
            <div class="flowchart-demo" id="flowchart-demo">
                <div class="window" id="flowchartWindow1">1
                </div>
                <div class="window" id="flowchartWindow2">2
                </div>
                <div class="window" id="flowchartWindow3">3
                </div>
                <div class="window" id="flowchartWindow4">4
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsPlumb from 'jsplumb';
// import 'jquery-ui-dist/jquery-ui';

// import $ from 'jquery';

// require('jquery-ui/themes/base/core.css');
// require('jquery-ui/themes/base/menu.css');
// require('jquery-ui/themes/base/autocomplete.css');
// require('jquery-ui/themes/base/theme.css');
// var autocomplete = require('jquery-ui/ui/widgets/autocomplete');


const uuidv1 = require('uuid/v1');
const jsplumb = jsPlumb.jsPlumb;

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      areaId: '#drop-bg'
    }
  },
  methods: {
    // 主要入口
    main() {
      const jInstance = jsplumb.getInstance({
             DragOptions: { cursor: 'pointer', zIndex: 2000 },
            PaintStyle: { stroke: 'red', strokeWidth: 3 },  //配置自己拖拽小点的时候连接线的默认样式
            Endpoint: ["Dot", {radius: 5}], //这个是控制连线终端那个小点的半径
            // EndpointStyle : { fill : "red" }, //这个是控制连线终端那个小点的样式
            // EndpointHoverStyle  : { fill : "blue" }, //这个是控制连线终端那个小点的样式
            Connector: ["Flowchart",{curviness:70}],
            ConnectionOverlays: [
                [ "Arrow", { location: 1 } ],
                [ "Label", {
                    location: 0.5,
                    label: "hehe",
                    id: "label",
                    cssClass: "aLabel"
                }]
            ],
            Container:"flowchart-demo"
      });
      // jInstance.setContainer('diagramContainer');

          jInstance.draggable($('.window' ));
          jInstance.addEndpoint('flowchartWindow1',{uuid:1 , anchor: "TopCenter",  isSource:true});
          jInstance.addEndpoint('flowchartWindow2',{uuid:2 ,anchor:'Right', isTarget:true});
          jInstance.addEndpoint('flowchartWindow3',{anthors:'Right', isTarget:true});
          // let line = jInstance.connect({uuids: ["1", "2"], editable: true})
          jInstance.connect({
            uuids:[1,2],  //根据uuid进行连接
            paintStyle: { stroke: 'red', strokeWidth: 3 },  //线的样式
            endpointStyle: { fill: 'blue', outlineStroke: 'darkgray', outlineWidth: 2 },//点的样式
            overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ]   //覆盖物 箭头 及 样式
          })






        // $('.btn-controller').draggable({
        //   helper: 'clone',
        //   scope: 'ss'
        // })

        // $(this.areaId).droppable({
        //   scope: 'ss',
        //   drop: function (event, ui) {
        //     // this.dropNode(ui.draggable[0].dataset.template, ui.position)
        //   }
        // })

        // $('#app').on('click', function (event) {
        //   event.stopPropagation()
        //   event.preventDefault()
        //   eventHandler(event.target.dataset)
        // })

        // 单点击了连接线上的X号
        // jsPlumb.bind('dblclick', function (conn, originalEvent) {
        //   DataDraw.deleteLine(conn)
        // })

        // 当链接建立
        // jsPlumb.bind('beforeDrop', function (info) {
        //   return connectionBeforeDropCheck(info)
        // })

        // 让退出节点可拖动
        // addDraggable(fixedNodeId.end)
        // initBeginNode()
        // initEndNode()

        // DataProcess.inputData(data.nodeList)
        // DataDraw.draw(data.nodeList)
    },
    // 放入拖动的节点
    dropNode(template, position) {
      position.left -= $('#side-buttons').outerWidth()
      position.id = uuid.v1()
      position.generateId = uuid.v1
      var html = renderHtml(template, position)

      $(areaId).append(html)

      this.initSetNode(template, position.id)
    },
      // 初始化节点设置
    initSetNode (template, id) {
      addDraggable(id)

      if (template === 'tpl-audio') {
        setEnterPoint(id)
        setExitPoint(id)
      } else if (template === 'tpl-menu') {
        setEnterPoint(id + '-heading')
        setExitMenuItem(id)
      }
    }
  },
  mounted() {
    const me = this;
    jsplumb.ready(function() {
      me.main();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

.flowchart-demo {
    width: 800px;
    height: 600px;
    border: 1px solid #000;
    position: relative;
}
.flowchart-demo .window {
    border: 1px solid #346789;
    box-shadow: 2px 2px 19px #aaa;
    -o-box-shadow: 2px 2px 19px #aaa;
    -webkit-box-shadow: 2px 2px 19px #aaa;
    -moz-box-shadow: 2px 2px 19px #aaa;
    -moz-border-radius: 0.5em;
    border-radius: 0.5em;
    opacity: 0.8;
    filter: alpha(opacity=80);
    text-align: center;
    position: absolute;
    background-color: #eeeeef;
    color: black;
    font-family: helvetica;
    font-size: 0.9em;
    line-height: 60px;
    width: 60px;
    height: 60px;
}
.flowchart-demo .window:hover {
    box-shadow: 2px 2px 19px #444;
    -o-box-shadow: 2px 2px 19px #444;
    -webkit-box-shadow: 2px 2px 19px #444;
    -moz-box-shadow: 2px 2px 19px #444;
    opacity: 0.6;
    filter: alpha(opacity=60);
}
.flowchart-demo .active {
    border: 1px dotted green;
}
.flowchart-demo .hover {
    border: 1px dotted red;
}

#flowchartWindow1 {
    top: 34em;
    left: 5em;
}
#flowchartWindow2 {
    top: 7em;
    left: 36em;
}
#flowchartWindow3 {
    top: 27em;
    left: 48em;
}
#flowchartWindow4 {
    top: 23em;
    left: 22em;
}
#drop-bg {
  height: 100%;
}
</style>
