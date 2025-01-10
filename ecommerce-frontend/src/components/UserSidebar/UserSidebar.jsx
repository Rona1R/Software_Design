import Offcanvas from "react-bootstrap/Offcanvas";
import {
  faChartLine,
  faBookmark,
  faCreditCard,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import placeholderimg from "../../images/placeholder-image.jpg";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./UserSidebar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchUserDetails } from "pages/UserProfile/UserDetails";
import { useState } from "react";
import { useEffect } from "react";

const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "90px",
          "&:hover &:active": {
            color: "black",
          },
        },
      },
    },
    MuiListItemText :{
      styleOverrides:{
        primary: {
          color: "#0F0520",
          fontWeight: "bold", 
          fontSize:"larger"
        },
      }
    },
    MuiListItemIcon:{
      styleOverrides:{
        root:{
          fontWeight:"bold",
          color: "#0F0520",
        }
      }
    }
  },
});

function UserSidebar({ show, handleClose, ...props }) {
  const navigate = useNavigate();
  const [profilePic,setProfilePic] = useState(null)
  // const [userId,setUserId] = useState(null);
  const useri  = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
 
      const loadUserDetails = async () => {
        try {
          if(useri.userId){
            const details = await fetchUserDetails(parseInt(useri.userId));
            setProfilePic(details.profilePicture);
          }
        } catch (error) {
          console.error("Failed to load user details:", error);
        }
      };

      loadUserDetails();

  }, [useri.userId]);



  const handleLogOut = async () => {
    try {
      const response = await axios.post("https://localhost:7061/api/Authentication/logout",{});
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userDetails");
        navigate('/LogIn');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ zIndex: "1200" }}
      >
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="profilePicture">
            <Avatar
              alt="Profilepic"
              src={profilePic? "/images/"+(profilePic):placeholderimg}
              sx={{ width: 125, height: 120 }}
            />
          </div>
          <ThemeProvider theme={theme}>
            <div className="usersidebarList">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                className="userSidebarList"
              >
                <Link to="/ProfilePage" className="sidebarlink">
                  <ListItemButton>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account Settings"/>
                  </ListItemButton>
                </Link>
                {
                  (useri && 
                 ( useri.roles.includes("Admin") || useri.roles.includes("Menaxher")))&& (
                  <Link to="/admin/dashboard" className="sidebarlink">
                    <ListItemButton>
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faChartLine} />
                      </ListItemIcon>
                      <ListItemText primary="Dashboard" />{" "}
                    </ListItemButton>
                  </Link>
                  )
                }
                <Link to="/Cart" className="sidebarlink">
                  <ListItemButton>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faCartShopping} />
                    </ListItemIcon>
                    <ListItemText primary="Shopping Bag" />
                  </ListItemButton>
                </Link>
                <Link to="/Wishlist" className="sidebarlink">
                  <ListItemButton>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faBookmark} />
                    </ListItemIcon>
                    <ListItemText primary="Saved items" />
                  </ListItemButton>
                </Link>
                <Link to="/MyOrder" className="sidebarlink">
                  <ListItemButton>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faCreditCard} />
                    </ListItemIcon>
                    <ListItemText primary="Purchases" />
                  </ListItemButton>
                </Link>
                <ListItemButton onClick={handleLogOut}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </List>
            </div>
          </ThemeProvider>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default UserSidebar;

