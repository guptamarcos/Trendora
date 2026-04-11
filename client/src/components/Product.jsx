import { useNavigate } from "react-router-dom";

function Product({product}){
    const navigate = useNavigate();
    return (
        <div className="cursor-pointer"
            onClick={()=>{navigate(`/trendora/products/${product._id}`)}}>
            <img src={`${product?.productImage?.url}`} className="h-[32.5vh]"></img>
            <h5 className="text-xs my-2 font-outfit">{product?.name}</h5>
            <h6 className="text-xs font-outfit" >${product?.price}</h6>
        </div>
    )
};

export default Product;