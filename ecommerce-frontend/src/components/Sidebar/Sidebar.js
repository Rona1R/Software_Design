import React, {useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function Sidebar({ color, image, routes }) {
  const [biznesiEmri, setBiznesiEmri] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get("https://localhost:7061/api/TeDhenatBiznesit/getTeDhenat")
          // .then((response) => {
            setBiznesiEmri(response.data.emriBiznesit);
            setLoading(false);
          // });
        } catch (error) {
          console.error("Failed to load data:", error);
        }
      };
      
      fetchData();
    }, []);
    
    const location = useLocation();
    const activeRoute = (routeName) => {
      return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };
    const styles = {
      spinner: {
        marginLeft: "10px",
        border: "2px solid #f3f3f3",
        borderTop: "2px solid #3498db",
        borderRadius: "50%",
        width: "12px",
        height: "12px",
        animation: "spin 1s linear infinite",
      },
      "@keyframes spin": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    };
    
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <div className="logo-img">
            <FontAwesomeIcon
              icon={faShop}
              style={{ height: "30px", paddingRight: "25px" }}
            />
          </div>

          <Link className="simple-text homeLink" to="/">
            {loading ? <div style={styles.spinner}></div> :  biznesiEmri}
          </Link>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + "+" + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + "/" + prop.path}
                    className="nav-link"
                    ClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );

}

export default Sidebar;
