<template>
    <transition name="fade">
        <div class="dialog-component">
            <div class="dialog">
                <div class="dialog_background" @click="closeDialog"></div>
                <div class="dialog-container">
                    <div class="dialog_close">
                        <i 
                            class="material-icons"
                            @click="closeDialog">
                            cancel
                        </i>
                    </div>
                    <div class="dialog-content">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import "./dialog.scss"
export default {
    data(){
        return{
            body: document.getElementsByTagName('body')[0],
        }
    },
    mounted(){
        this.body.style.overflow = "hidden";
    },
    beforeDestroy(){
       this.body.style.overflow = "auto";
    },
    methods: {
        closeDialog(){
            this.$emit('close');
        }
    }
}
</script>
