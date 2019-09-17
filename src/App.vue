<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <drag-drop></drag-drop>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import DragDrop from './components/DragDrop.vue';

export default {
  name: 'app',
  components: {
    HelloWorld,
    DragDrop
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html {
		font-family: 'Arial', sans-serif;
	}
	body {
		padding: 40px 90px;
		line-height: 1.5;
	}
	.section {
		margin-top: 30px;
		margin-bottom: 50px;
	}
	.drag, .drop {
		box-sizing: border-box;
		display: inline-block;
		border-radius: 10px;
		width: 100px;
		height: 100px;
		background: #ccc;
		vertical-align: middle;
		margin-right: 20px;
		position: relative;
		padding: 5px;
		padding-top: 35px;
		text-align: center;
		margin: 3px;
	}
	.drag {
		color: #fff;
		cursor: move;
		background: #777;
		border-right: 2px solid #666;
		border-bottom: 2px solid #666;
	}
	.drop {
		background: #eee;
		border-top: 2px solid #ccc;
		border-left: 2px solid #ddd;
		width: 500px;
		height: 500px;
	}
</style>
