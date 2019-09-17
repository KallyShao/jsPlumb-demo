<template>
	<div>
		<drag class="drag" :tag="'span'" :transfer-data="{ example: 'tags' }">drag</drag>
		<drop class="drop"
			:class="{ over }"
			:tag="'span'"
			@dragover="over = true"
			@dragleave="over = false"
			@drop="handleDrop">
      <div class="drop-region">
        <form v-if="showForm" action="">
          姓名：<input type="text">
          密码：<input type="text">
          <button>提交</button>
        </form>
      </div>
		</drop>
	</div>
</template>

<script>
	export default {
		data () {
			return { 
        over: false,
        showForm: false
      };
		},
		methods: {
			handleDrop(data) {
        this.over = false;
        this.showForm = true;
			},
		},
	};
</script>

<style>
  .drop .drop-region {
    width: 100%;
    height: 100%;
  }
	.drop.over {
		border-color: #aaa;
		background: #ccc;
	}
</style>