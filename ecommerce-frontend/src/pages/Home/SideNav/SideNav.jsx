import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./SideNav.css";
import { faBars, faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "components/UserSidebar/UserSidebar";
import { Button } from "react-bootstrap";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import CollapsedNav from "./CollapsedNav";
import DesktopNav from "./DesktopNav";

export default function SideNav() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [loading, setLoading] = useState(true);
  const [biznesiEmri, setBiznesiEmri] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [kategoriteNenkategorite, setKategoriteNenkategorite] = useState([]);
  const [kompaniteKategorite, setKompaniteKategorite] = useState([]);
  const [showUserSidebar, setShowUserSidebar] = useState(false);


  const userDetails = localStorage.getItem("userDetails");

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/TeDhenatBiznesit/getTeDhenat")
        .then((response) => {
          setBiznesiEmri(response.data.emriBiznesit);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(
          "https://localhost:7061/api/Kategoria/shfaqKategoriteDheNenkategorite"
        )
        .then((response) => {
          setKategoriteNenkategorite(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7061/api/Kompania/shfaqKompaniteKategorite")
        .then((response) => {
          setKompaniteKategorite(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const openSidebar = () => {
    if (userDetails) {
      setShowUserSidebar(true);
    } else {
      setShowUserSidebar(false);
      navigate("/LogIn");
    }
  };

  const closeSidebar = () => {
    setShowUserSidebar(false);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        className="fixed-nav"
        sx={{
          backgroundColor: "#000004",
          zIndex: 20,
        }}
      >
        <Toolbar className="navigation-main">
          {isMobile && (
            <button className="hamburger-icon" onClick={toggleNav} aria-label="Open navigation menu">
              <FontAwesomeIcon icon={isNavOpen? faTimes:faBars} />
            </button>
          )}
          {isMobile && isNavOpen && <CollapsedNav 
          categories={kategoriteNenkategorite}
          companies={kompaniteKategorite}
          handleClose={()=>setIsNavOpen(false)}
          />}
          <Link to="/">
            <Typography
              variant="h6"
              sx={{ color: "#a7a1fd", fontSize: "26px" , marginLeft: isMobile? '40px':'0px' }}
              component="div"
            >
              {loading ? (
                <div className="loading" style={{ padding: "5px" }}>
                  <TailSpin
                    height="40"
                    width="40"
                    color="#322b9c"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                <>{biznesiEmri}</>
              )}
            </Typography>
          </Link>
          <div className="navigation-options">
            {
              !isMobile && 
              <DesktopNav 
              kategoriteNenkategorite={kategoriteNenkategorite}
              kompaniteKategorite={kompaniteKategorite}
              />
            }
            <div className="user-options">
              <div className="userlogo">
                <Button
                  onClick={openSidebar}
                  className="openUserSidebar"
                  id="openUserSidebar"
                  style={{
                    backgroundColor: "inherit",
                    border: "none",
                    padding: "0px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      width: "30px",
                      height: "30px",
                      paddingRight: "5px",
                      color: "#a7a1fd",
                      margin:"0 auto"
                    }}
                    className="icon"
                  />
                </Button>
                <UserSidebar
                  placement="end"
                  handleClose={closeSidebar}
                  show={showUserSidebar}
                />
              </div>
              <div className="usercart">
                <Link to="/Cart">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ width: "30px", height: "30px", color: "#a7a1fd" ,margin:"0 auto"}}
                    className="icon"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
