export default {
    methods: {
        getStuffQuantity(stuff){
            return stuff.length;
        },
        getStuffTotalPrice(stuff){
            let price = 0;
            for(let item of stuff){
                price += item.price
            }
            return price;
        },
    }
}