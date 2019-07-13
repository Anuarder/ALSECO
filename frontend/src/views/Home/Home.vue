<template>
    <div class="home-page page">
        <div class="home content">
            <div class="home_links">
                <router-link
                    class="home_link"
                    v-for="(item, i) in links"
                    :key="i"
                    :to="item.path">
                    <img :src="item.icon" alt="icon">
                    <h1>{{item.title}}</h1>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import "./home.scss"
import employees_icon from "@/assets/employees.svg";
import stuff_icon from "@/assets/stuff.svg";
export default {
    data(){
        return {
            links: [
                {
                    title: "Сотрудники",
                    icon: employees_icon,
                    path: "/employees"
                },
                {
                    title: "Имущество",
                    icon: stuff_icon,
                    path: "/stuff"
                }
            ]
        }
    }
}
</script>
