import React, { ReactNode } from "react";
import "./Centered.css";

interface CenteredProps {
  children?: ReactNode;
}

const styles = {
  container: {
    backgroundImage: `url("bg.jpg")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'
  }
};

const Centered = ({ children }: CenteredProps) => {
  return <div className="_centered" style={{backgroundImage: `url("bg.jpg")`,backgroundRepeat: "repeat-y" ,backgroundSize:"cover"
  }}>{children}</div>;
};

export default Centered;
