<template>
	<div id="wrapper">
		<div id="header">
			<a id="yc" href="http://www.ycombinator.com">
			  <img src="https://news.ycombinator.com/y18.gif">
			</a>
   <h1><a href="#/">Hacker News</a></h1>
			<span class="source">
			  Built with <a href="http://vuejs.org" target="_blank">Vue.js</a> |
			  <a href="https://github.com/vuejs/vue-hackernews" target="_blank">Source</a>
			</span>
		</div>
		<router-view 
			class="view"
			keep-alive
			transition
			transition-mode="out-in">		
			<!--如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数 -->
			<!-- transition-mode 特性用于指定两个动态组件之间如何过渡 -->
		</router-view>
	</div>
</template>

<style lang="stylus">
@import "../variables.styl"

html, body
  font-family Verdana
  font-size 13px
  height 100%

ul
  list-styke-type none
  padding 0
  margin 0

#wrapper
  background-color $bg
  position relative
  margin 0 auto
  width 85%

#header
	 background-color #f60
	 height 24px
	 position relative
	 h1
	 	 font-weight bold
	 	 font-size 13px
	 	 display inline-block
	 	 vertival-align middle
	 	 margin 0
	 .source
	 	 color #fff
	 	 font-size 11px
	 	 position absolute
	 	 top 4px
	 	 right 4px
	 	 a
	 	 	 color #fff
	 	 	 &:hover
	 	 	 	 text-decoration underline
	 	 	 	 
</style>