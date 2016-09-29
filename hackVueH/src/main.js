import Vue from 'vue'
import Router from 'vue-router'
import { domain, fromNow } from './filters'
import App from './components/App.vue'
import NewsView from './components/NewsView.vue'
import ItemView from './components/ItemView.vue'
import UserView from './components/UserView.vue'

Vue.use(Router)

// 注册或获取全局过滤器
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)

//路由
var router = new Router()

router.map({
	'/news/:page': {
		component: NewsView
	},
	'user/:id': {
		component: UserView
	},
	'item/:id': {
		component: ItemView
	}
})
router.start(App, el)

// 启动一个启用了路由的应用。创建一个 App 的实例并且挂载到元素 el 。
// 参数
// App: Function | Object
// App 可以是 Vue 组件构造函数或者一个组件选项对象。如果是一个对象，路由会隐式的对其调用 Vue.extend 。这个组件会用来创建这个应用的根组件。
// el: String | Element
// 挂载应用的元素。可以是 CSS 选择符或者一个实际的元素
router.beforeEach(function() {
	window.scrollTo(0, 0)
})

router.redirect({
	'*': '/news/1'
})

router.start(App, '#app')