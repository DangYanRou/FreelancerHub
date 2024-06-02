import React from "react";
import "./styles/Heading.css";

const sizes = {
  xs: "text-[45px] font-semibold md:text-[41px] sm:text-[35px]",
};

const Heading = ({ children, className = "", size = "xs", as, ...restProps  }) => {
  const Component = as || "h6";

  return (
    <Component  className={`headingComponent text-black-900 font-poppin  ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export default Heading ;
