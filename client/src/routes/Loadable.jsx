import { Suspense } from "react";
import { ClipLoader } from "react-spinners";


const Loadable = (Component,fallback) => {
  return function WrappedComponent(props) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export default Loadable;
