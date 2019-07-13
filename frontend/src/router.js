import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home/Home.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/employees",
			name: "employees",
			component: () => import("./views/Employees/Employess")
		},
		{
			path: "/stuff",
			name: "stuff",
			component: () => import("./views/Stuff/Stuff.vue")
		},
	]
});
