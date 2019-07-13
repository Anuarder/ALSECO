<template>
    <div class="employees-page page">
        <div class="employees content">
            <div class="employees_title page_title">
                Список сотрудников
            </div>
            <!-- ТАБЛИЦА СОТРУДНИКОВ -->
            <div class="employees_table page_table" @click="closeEmployeeContext">
                <table-component 
                    :headers="headers" 
                    @headerClick="sortTableBy">
                    <template v-slot:body>
                        <div
                            class="table-data"
                            v-for="(item, i) in tableData"
                            :key="i"
                            :class="item.selected ? 'table-data_selected' : ''"
                            @click="item.selected = !item.selected"
                            @dblclick="openEmployeeDialog(item)"
                            @contextmenu.prevent="openEmployeeContext(item, $event)">
                            <div class="table-data_item">
                                {{item.id}}
                            </div>
                            <div class="table-data_item">
                                {{`
                                    ${item.last_name}
                                    ${item.first_name[0]}.
                                    ${item.middle_name[0]}.
                                `}}
                            </div>
                            <div class="table-data_item">
                                {{getStuffQuantity(item.stuff)}}
                            </div>
                            <div class="table-data_item">
                                {{getStuffTotalPrice(item.stuff)}}
                            </div>
                        </div>
                    </template>
                    <template v-slot:actions>
                        <div class="add_button">
                            <button @click="openNewEmployeeDialog">
                                Добавить
                            </button>
                        </div>
                        <div class="pagination" v-if="table_size < tableSize">
                            <button 
                                class="pagination_previous"
                                @click="nextPage(-1)" 
                                :disabled="page_number == 0">
                                <i class="material-icons">
                                    keyboard_arrow_left
                                </i>
                            </button>
                            <button 
                                class="pagination_next"
                                @click="nextPage(1)" 
                                :disabled="page_number >= tableSize - 1">
                                <i class="material-icons">
                                    keyboard_arrow_right
                                </i>
                            </button>
                        </div>
                    </template>
                </table-component>
                <!-- ПОДРОБНАЯ ИНФОРМАЦИЯ О СОТРУДНИКЕ -->
                <employee-dialog
                    v-if="employee_dialog" 
                    :employee_id="current_employee_id"
                    :new_employee="new_employee"
                    @close="closeEmployeeDialog">
                </employee-dialog>
                <div 
                    class="employee-context" 
                    id="employee_context"
                    v-show="employee_context"
                    @click="deleteEmployee"> 
                    Удалить
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "./employees.scss"
import EmployeeServices from "@/services/Employee"
import ToolsMixin from "@/mixins/Tools";
export default {
    mixins:[ToolsMixin],
    components: {
        EmployeeDialog: () => import("./components/EmployeeDialog")
    },
    data(){
        return{
            headers: [
                {
                    title: "ID",
                    value: "id"
                },
                {
                    title: "ФИО",
                    value: "fullname"
                },
                {
                    title: "Количество",
                    value: "quantity"
                },
                {
                    title: "Общая стоимость",
                    value: "totalprice"
                },
            ],
            employees: [],
            table_size: 10,
            page_number: 0,
            current_employee_id: null,
            employee_dialog: false,
            new_employee: false,
            employee_context: false,
            next_to_delete: null,
        }
    },
    created(){
        this.getEmployees();
    },
    computed: {
        tableSize(){
            return Math.ceil(this.employees.length/this.table_size);
        },
        tableData(){
            const start = this.page_number * this.table_size
            const end = start + this.table_size;
            return this.employees.slice(start, end);
        }
    },
    methods: {
        async getEmployees(){
            try{
                this.employees = [];
                let response = await EmployeeServices.getEmployees();
                for(let item of response.data){
                    this.employees.push({
                        selected: false,
                        ...item
                    });
                }
            }catch(err){
                console.log(err);
            }
        },
        async deleteEmployee(){
            try{
                const employee = this.next_to_delete;
                const confirmation = confirm(`
                    Удалить ${employee.last_name} ${employee.first_name} ${employee.middle_name}?
                `);
                if(confirmation){
                    let response = await EmployeeServices.deleteEmployee(employee.id);
                    if(response.data.status){
                        this.getEmployees();
                        this.employee_context = false;
                    }
                }else{
                    this.employee_context = false;
                }
            }catch(err){
                console.log(err);
            }
        },
        openNewEmployeeDialog(){
            this.employee_dialog = true;
            this.new_employee = true;
        },
        // 
        openEmployeeDialog(item){
            this.current_employee_id = item.id;
            this.employee_dialog = true;
        },
        closeEmployeeDialog(){
            this.employee_dialog = false;
            this.new_employee = false;
            this.current_employee = null;
            this.current_stuff = null;
            this.edit_stuff = false;
            this.getEmployees();
        },
        // 
        openEmployeeContext(item, event){
            const contextmenu = document.getElementById('employee_context');
            contextmenu.style.top = `${event.clientY - 10}px`;
            contextmenu.style.left = `${event.clientX - 10}px`;
            this.next_to_delete = item;
            this.employee_context = true;
        },
        closeEmployeeContext(event){
            const contextmenu = document.getElementById('employee_context');
            const isClickOutSide = !contextmenu.contains(event.target);
            this.next_to_delete = null;
            if(isClickOutSide){
                this.employee_context = false;
            }
        },
        sortTableBy(item){
            if(item.value == "quantity"){
                this.employees.sort((a, b) => {
                    if(this.getStuffQuantity(a.stuff) < this.getStuffQuantity(b.stuff)){
                        return -1;
                    }else if(this.getStuffQuantity(a.stuff) > this.getStuffQuantity(b.stuff)){
                        return 1;
                    }else{
                        return 0;
                    }
                });
            }else if(item.value == "totalprice"){
                this.employees.sort((a, b) => {
                    if(this.getStuffTotalPrice(a.stuff) < this.getStuffTotalPrice(b.stuff)){
                        return -1;
                    }else if(this.getStuffTotalPrice(a.stuff) > this.getStuffTotalPrice(b.stuff)){
                        return 1;
                    }else{
                        return 0;
                    }
                });
            }else if(item.value == "fullname"){
                this.employees.sort((a, b) => {
                    if(a.last_name < b.last_name){
                        return -1;
                    }else if(a.last_name > b.last_name){
                        return 1;
                    }else{
                        return 0;
                    }
                });
            }else{
                this.employees.sort((a, b) => {
                    if(a.id < b.id){
                        return -1;
                    }else if(a.id > b.id){
                        return 1;
                    }else{
                        return 0;
                    }
                });
            }
        },
        nextPage(value){
            this.page_number += value;
        },
    }
}
</script>