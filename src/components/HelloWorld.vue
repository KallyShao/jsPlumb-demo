<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div id="side-buttons" class="col-md-1 bg-info min-height">
          <div>
            <h5>节点类型列表</h5>
            <a class="btn btn-success btn-controler" href="#" data-template="tpl-audio" role="button">
              <i class="fa fa-play-circle-o" aria-hidden="true"></i>
              语音播报</a>
            <a class="btn btn-success btn-controler" href="#" data-template="tpl-menu" role="button">
              <i class="fa fa-navicon" aria-hidden="true"></i>
              菜单</a>
           
          </div>
        </div>
        <div class="col-md-11 bg-success min-height" id="drop-bg">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsPlumb from 'jsplumb';

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
      jsPlumb.setContainer('diagramContainer')

        $('.btn-controler').draggable({
          helper: 'clone',
          scope: 'ss'
        })

        $(this.areaId).droppable({
          scope: 'ss',
          drop: function (event, ui) {
            this.dropNode(ui.draggable[0].dataset.template, ui.position)
          }
        })

        $('#app').on('click', function (event) {
          event.stopPropagation()
          event.preventDefault()
          eventHandler(event.target.dataset)
        })

        // 单点击了连接线上的X号
        jsPlumb.bind('dblclick', function (conn, originalEvent) {
          DataDraw.deleteLine(conn)
        })

        // 当链接建立
        jsPlumb.bind('beforeDrop', function (info) {
          return connectionBeforeDropCheck(info)
        })

        // 让退出节点可拖动
        // addDraggable(fixedNodeId.end)
        // initBeginNode()
        // initEndNode()

        // DataProcess.inputData(data.nodeList)
        DataDraw.draw(data.nodeList)
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
    jsPlumb.ready(function() {
      this.main();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
