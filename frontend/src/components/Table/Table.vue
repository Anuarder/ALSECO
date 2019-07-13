<template>
    <div class="table-component">
        <div class="table">
            <div class="table-headers">
                <div
                    class="table_header"
                    v-for="(item, i) in headers"
                    :key="i"
                    @click="handleHeaderClick(item)">
                    {{item.title}}
                </div>
            </div>
            <div class="table-body">
                <slot name="body"></slot>
            </div>
        </div>
        <div class="table-actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>
<script>
import "./table.scss"
export default {
    props: {
        headers: Array
    },
    methods: {
        handleHeaderClick(item){
            this.$emit("headerClick", item);
        }
    }
}
</script>