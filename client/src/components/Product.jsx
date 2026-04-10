function Product({product}){
    
    return (
        <div>
            <img src={`${product?.productImage?.url}`} className="h-[32.5vh]"></img>
            <h5 className="text-xs my-2 font-outfit">{product?.name}</h5>
            <h6 className="text-xs font-outfit" >${product?.price}</h6>
        </div>
    )
};

export default Product;