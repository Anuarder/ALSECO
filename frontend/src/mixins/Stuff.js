import StuffServices from "@/services/Stuff"
export default {
    data() {
        return {
            stuff_headers: [
                {
                    title: "ID",
                    value: "id"
                },
                {
                    title: "Название",
                    value: "name"
                },
                {
                    title: "Стоимость",
                    value: "price"
                },
            ],
            current_stuff: null,
            edit_stuff: false,
            add_stuff_form: false,
            new_stuff: '',
            stuff: []
        }
    },
    created(){
        if(this.new_employee){
            this.getStuff();
        }
    },
    methods: {
        openEditStuff(item) {
            item.isEdit = true;
            this.current_stuff = {
                ...item
            };
        },
        cancelUpdateStuff(item) {
            item.isEdit = false;
            this.current_stuff = null;
        },
        openNewStuffList() {
            this.add_stuff_form = true;
            this.getStuff();
        },
        async getStuff() {
            try {
                let response = await StuffServices.getStuff();
                this.stuff = [];
                for(let item of response.data.stuff){
                    this.stuff.push({
                        isEdit: false,
                        ...item
                    });
                }
            } catch (err) {
                console.log(err);
            }
        },
        async giveStuffToEmployee() {
            try {
                let response = await StuffServices.giveStuffToEmployee({
                    employee_id: this.current_employee.id,
                    id: this.new_stuff.id
                });
                if(this.current_employee){
                    if(response.data.status){
                        this.getEmployeeByID(this.current_employee.id);
                    }
                }else{
                    this.getStuff();
                }
            } catch (err) {
                console.log(err.response);
            }
        },
        async updateStuff() {
            try {
                let response = await StuffServices.updateStuff(this.current_stuff);
                if(this.current_employee){
                    if(response.data.status){
                        this.getEmployeeByID(this.current_employee.id);
                    }
                }else{
                    console.log('update')
                    this.getStuff();
                }
            } catch (err) {
                console.log(err);
            }
        },
        async deleteStuff(item) {
            try {
                let confirmation = confirm(`Удалить ${item.name}?`);
                if(confirmation){
                    let response = await StuffServices.deleteStuff(item.id);
                    if(this.current_employee){
                        if(response.data.status){
                            this.getEmployeeByID(this.current_employee.id);
                        }
                    }else{
                        this.getStuff();
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },
    }
};