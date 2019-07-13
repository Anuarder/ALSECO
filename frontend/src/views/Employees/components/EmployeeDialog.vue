<template>
    <dialog-component @close="closeDialog">
        <div class="employee-dialog">
            <div class="employee-dialog_form">
                <div class="input-block">
                    <label>Фамилия: </label>
                    <input 
                        type="text" 
                        placeholder="Введите фамилию" 
                        v-model="current_employee.last_name">
                </div>
                <div class="input-block">
                    <label>Имя: </label>
                    <input 
                        type="text" 
                        placeholder="Введите имя" 
                        v-model="current_employee.first_name">
                </div>
                <div class="input-block">
                    <label>Отчество: </label>
                    <input 
                        type="text" 
                        placeholder="Введите отчество" 
                        v-model="current_employee.middle_name">
                </div>
            </div>
            <!-- ТАБЛИЦА МАТЕРИАЛЬНЫХ ЦЕННОСТЕЙ СОТРУДНИКА -->
            <div class="employee-dialog_table">
                <div class="employee-dialog_table-title">
                    Список выданных матеральных ценностей:
                </div>
                <div class="employee-dialog_table-add">
                    <button @click="openNewStuffList" v-if="!add_stuff_form && !new_employee">
                        Открыть список имущества
                    </button>
                    <button @click="giveStuffToEmployee" v-if="add_stuff_form">
                        Добавить
                    </button>
                    <button @click="pushStuff" v-if="!add_stuff_form && new_employee">
                        Добавить
                    </button>
                    <select v-model="new_stuff" v-if="add_stuff_form || new_employee">
                        <option value="">
                            Выберите
                        </option>
                        <option 
                            v-for="(item, i) in stuff"
                            :key="i"
                            :value="item">
                            {{item.name}}
                        </option>
                    </select>
                </div>
                <table-component :headers="stuff_headers">
                    <template v-slot:body>
                        <div
                            class="table-data"
                            v-for="(item, i) in current_employee_stuff"
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
                                        @click="updateStuff()">
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
                    </template>
                </table-component>
            </div>
            <div class="employee-dialog_actions">
                <button 
                    class="error_button" 
                    @click="closeDialog">
                    Отмена
                </button>
                <button 
                    class="success_button"
                    @click="saveChanges">
                    Сохранить
                </button>
            </div>
        </div>
    </dialog-component>
</template>
<script>
import "./employee_dialog.scss"
import EmployeeServices from "@/services/Employee"
import StuffMixin from "@/mixins/Stuff";
export default {
    props: {
        employee_id: Number,
        new_employee: Boolean
    },
    mixins: [StuffMixin],
    data(){
        return {
            current_employee: {},
            current_employee_stuff: []
        }
    },
    created(){
        if(!this.new_employee){
            this.getEmployeeByID(this.employee_id);
        }
    },
    methods: {
        async getEmployeeByID(id){
            try{
                let response =  await EmployeeServices.getEmployeeByID(id);
                this.current_employee = {
                    id: response.data.id,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    middle_name: response.data.middle_name
                }
                this.current_employee_stuff = [];
                for(let item of response.data.stuff){
                    this.current_employee_stuff.push({
                        isEdit: false,
                        ...item
                    });
                }
            }catch(err){
                console.log(err);
            }
        },
        async saveChanges(){
            try{
                let response;
                if(!this.new_employee){
                    response = await EmployeeServices.updateEmployee({
                        id: this.current_employee.id,
                        first_name: this.current_employee.first_name,
                        last_name: this.current_employee.last_name,
                        middle_name: this.current_employee.middle_name
                    });
                }else{
                    response = await EmployeeServices.addEmployee({
                        first_name: this.current_employee.first_name,
                        last_name: this.current_employee.last_name,
                        middle_name: this.current_employee.middle_name,
                        stuff: this.current_employee_stuff
                    });
                }
                if(response.data.status && !this.new_employee){
                    this.getEmployeeByID(this.employee_id);
                }else{
                    console.log(response);
                }
                this.closeDialog();
            }catch(err){
                console.log(err.response);
            }
        },
        pushStuff(){
            if(this.new_stuff){
                if(this.current_employee_stuff.indexOf(this.new_stuff) == -1){
                    this.current_employee_stuff.push(this.new_stuff);
                }
            }
        },
        closeDialog(){
            this.$emit("close");
        }
    }
}
</script>