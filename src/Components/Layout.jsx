// import React,{useContext} from "react";
import { Outlet, Link } from "react-router-dom";
// import { listContext } from "./Main";
import "./style.css";
const Layout = () => {
  // const{list}=useContext(listContext)  ;

  return (
    <div>
      <nav>
        <center>
          {" "}
          <img src="./icon.png" alt="" />
        </center>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/answer">Answers</Link>
        </li>

        {/* <Link to=":id">Specific Answer</Link> */}
      </nav>

      <Outlet />
      <footer>@React Routes</footer>
    </div>
  );
};

export default Layout;
