<template>
    <div id="app">
        <transition 
            name="fade"
            mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import "./styles/root_styles.scss"
export default {}
</script>
