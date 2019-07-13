import Api from '@/services/Api'

export default {
    getEmployees(){
        return Api().get("/getEmployees");
    },
    getEmployeeByID(id){
        return Api().get(`/getEmployeeByID/${id}`);
    },
    updateEmployee(payload){
        return Api().put('/updateEmployee', payload);
    },
    addEmployee(payload){
        return Api().post('/addEmployee', payload);
    },
    deleteEmployee(id){
        return Api().delete(`/deleteEmployee/${id}`);
    }
}