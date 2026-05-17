import { Suspense } from "react";

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
