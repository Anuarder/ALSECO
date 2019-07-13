<template>
    <div class="stuff-page page">
        <div class="stuff content">
            <div class="stuff_title page_title">
                Список имущества компании
            </div>
            <div class="stuff_table page_table">
                 <table-component 
                    :headers="stuff_headers">
                    <template v-slot:body>
                        <div
                            class="table-data"
                            v-for="(item, i) in stuff"
                            :key="i">
                            <div class="table-data_item">
                                {{item.id}}
                            </div>
                            <div class="table-data_item">
                                <span v-if="!item.isEdit">
                                    {{item.name}}
                                </span>
                                <textarea 
                                    v-else
                                    type="text" 
                                    v-model="current_stuff.name">
                                </textarea>
                            </div>
                            <div class="table-data_item">
                                <span v-if="!item.isEdit">
                                    {{item.price}}
                                </span>
                                <input 
                                    v-else
                                    type="num"
                                    v-model="current_stuff.price">
                            </div>
                            <div class="table-data_item">
                                <div class="actions">
                                    <i 
                                        class="material-icons success_button" 
                                        v-if="!item.isEdit"
                                        @click="openEditStuff(item)">
                                        edit
                                    </i>
                                    <i 
                                        class="material-icons success_button" 
                                        v-else
                                        @click="updateStuff(item)">
                                        save
                                    </i>
                                    <i 
                                        class="material-icons error_button"
                                        v-if="!item.isEdit"
                                        @click="deleteStuff(item)">
                                        delete
                                    </i>
                                    <i 
                                        class="material-icons error_button"
                                        v-else
                                        @click="cancelUpdateStuff(item)">
                                        cancel
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div class="table-data" v-if="new_stuff_dialog">
                            <div class="table-data_item">
                            </div>
                            <div class="table-data_item">
                                <input 
                                    type="text"
                                    placeholder="Введите название"
                                    v-model="new_stuff_name">
                            </div>
                            <div class="table-data_item">
                                <input 
                                    type="num"
                                    placeholder="Введите цену"
                                    v-model="new_stuff_price">
                            </div>
                            <div class="table-data_item">
                                <div class="actions">
                                    <i 
                                        class="material-icons success_button" 
                                        @click="addNewStuff">
                                        save
                                    </i>
                                    
                                    <i 
                                        class="material-icons error_button"
                                        @click="closeNewStuffDialog">
                                        cancel
                                    </i>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-slot:actions>
                        <div class="add_button">
                            <button @click="openNewStuffDialog">
                                Добавить
                            </button>
                        </div>
                    </template>
                 </table-component>
            </div>
        </div>
    </div>
</template>
<script>
import "./stuff.scss"
import StuffMixin from "@/mixins/Stuff";
import StuffServices from "@/services/Stuff"
export default {
    mixins: [StuffMixin],
    data(){
        return{
            stuff: [],
            new_stuff_dialog: false,
            new_stuff_name: '',
            new_stuff_price: '',
        }
    },
    created(){
        this.getStuff();
    },
    methods: {
        openNewStuffDialog(){
            this.new_stuff_dialog = true;
        },
        closeNewStuffDialog(){
            this.new_stuff_dialog = false;
            this.new_stuff_name = '';
            this.new_stuff_price = '';
        },
        async addNewStuff(){
            try{
                let response = await StuffServices.addNewStuff({
                    name: this.new_stuff_name,
                    price: this.new_stuff_price
                });
                if(response.data.status){
                    this.getStuff();
                    this.closeNewStuffDialog();
                }
            }catch(err){
                console.log(err);
            }
        }
    }
}
</script>
