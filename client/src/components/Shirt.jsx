import { hero_img } from "../assets/Index";
function Shirt(){
    return (
        <div>
            <img src={hero_img} className="h-[32.5vh]"></img>
            <h5 className="text-xs my-2 font-outfit">Women Round Neck Cotton Top</h5>
            <h6 className="text-xs font-outfit" >$149</h6>
        </div>
    )
};

export default Shirt;