import { useNavigate } from "react-router-dom";

function Product({ product }) {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trendora/products/${product._id}`);
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <img
        src={product?.productImage?.url}
        className="h-[32.5vh] rounded-lg"
        alt={product?.name}
      />

      <h5 className="text-xs my-2 font-outfit">
        {product?.name}
      </h5>

      <h6 className="text-xs font-outfit">
        ${product?.price}
      </h6>
    </div>
  );
}

export default Product;