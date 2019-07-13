import Api from '@/services/Api'

export default {
    getStuff(){
        return Api().get("/getStuff");
    },
    giveStuffToEmployee(payload){
        return Api().put("/giveStuffToEmployee", payload);
    },
    updateStuff(payload){
        return Api().put("/updateStuff", payload);
    },
    deleteStuff(id){
        return Api().delete(`/deleteStuff/${id}`)
    },
    addNewStuff(payload){
        return Api().post('/addNewStuff', payload);
    }
}