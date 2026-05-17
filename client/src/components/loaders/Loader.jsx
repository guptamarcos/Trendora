import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader size={40} />
    </div>
  );
}

export default Loader;
