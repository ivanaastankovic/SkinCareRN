class Product {
    constructor(productId, userId, name, imageUrl, description, price, color){
        this.productId = productId;
        this.userId = userId;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;

        this.color=color;
    }
}


export default Product;