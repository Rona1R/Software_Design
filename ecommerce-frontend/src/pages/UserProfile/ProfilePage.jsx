import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  faMedal,
  faUser,
  faStar,
  faTrophy,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProfilePage.css";
import Footer from "../Home/Footer";
import BreadcrumbComponent from "../../components/Additional/BreadcrumbComponent";
import SideNav from "pages/Home/SideNav/SideNav";
import {
  fetchUserDetails,
  updateUsername,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  verifyOldPassword,
} from "./UserDetails";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import { TailSpin } from "react-loader-spinner";
import{ Button }from "react-bootstrap";
import ShtoAdress from "components/Profili/Adresat/AddAddress";
import DefaultAdress from "components/Profili/Adresat/DefaultAddress";
import SavedAdresses from "components/Profili/Adresat/SavedAddresses";
import PhoneInput from "react-phone-input-2";

const ProfilePage = () => {
  const loggedUser = JSON.parse(localStorage.getItem('userDetails'));
 // console.log("Profile page rendered!!")
 // const userId = 1016;
  // const [userId, setUserId] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loading,setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [usernameEditable, setUsernameEditable] = useState(false);
  const [emailEditable, setEmailEditable] = useState(false);
  const [passwordEditable, setPasswordEditable] = useState(false);
  const [phoneEditable, setPhoneEditable] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [badgeName, setBadgeName] = useState("");
  const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  // const [previousUsername, setPreviousUsername] = useState(username);
  // const [previousEmail, setPreviousEmail] = useState(email);
  // const [previousPhoneNumber,setPreviousPhoneNumber] = useState(phone);
  const [refreshKey, setRefreshKey] = useState("");
  const [selectedTab,setSelectedTab] = useState("general");

  // useEffect(()=>{
  //   if(loggedUser)
  //   {
  //     setUserId(parseInt(loggedUser.userId));
  //   }
  // },[loggedUser])

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const badgeIcons = {
    "New User": faUser,
    "Active Contributor": faMedal,
    "Verified Buyer":faCheckCircle,
    "Best Costumer": faTrophy,
    "default": faStar,
  };
  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        // if (!userId) 
        //   {
        //     return
        //   };
            if(loggedUser.userId){
              const details = await fetchUserDetails(loggedUser.userId);
           
              setUsername(details.userName || "");
              setEmail(details.email || "");
              setPhone(details.phoneNumber || "");
              setProfilePicture(details.profilePicture);
              setBadgeName(details.badgeName);
              setLoading(false);    
            }
        // }
        // setPreviousUsername(details.userName || "");
        // setPreviousEmail(details.email || "");
      } catch (error) {
        console.error("Failed to load user details:", error);
      }
    };

    loadUserDetails();
  }, [refreshKey,loggedUser.userId]);

  const handleEdit = (field) => {
    switch (field) {
      case "username":
        setUsernameEditable(true);
        break;
      case "email":
        setEmailEditable(true);
        break;
      case "password":
        setPasswordEditable(true);
        break;
      case "phone":
        setPhoneEditable(true);
        break;
      default:
        break;
    }
    setEditable(true);
  };

  const handleSaveChanges = async () => {
    try {
      let hasError = false;

      if (usernameEditable) {
        const response = await updateUsername(loggedUser.userId, username);
        if (response.status === 400) {
          setUsernameError(response.error);
          // setUsername(previousUsername);
          hasError = true;
        } else {
          setUsernameError("");
          // setPreviousUsername(username);
          toast.success("Username was updated successfully!");
        }
      }

      if (emailEditable) {
        const response = await updateEmail(loggedUser.userId, email);
        if (response.status === 400) {
          setEmailError(response.error);
          // setEmail(previousEmail);
          hasError = true;
        } else {
          setEmailError("");
          // setPreviousEmail(email);
          toast.success("Email was updated successfully!");
        }
      }

      if (phoneEditable) {
        const response = await updatePhoneNumber(loggedUser.userId, phone);
        if (response.status === 400) {
          setPhoneNumberError(response.error);
          hasError = true;
        } else {
          setPhoneNumberError("");
          // setPreviousPhoneNumber(phone);
          toast.success("Phone number was updated successfully!");
        }
      }

      if (passwordEditable) {
        if (newPassword !== confirmPassword) {
          setPasswordChangeError("Passwords do not match.");
          return;
        }
        if (isOldPasswordValid) {
          const response = await updatePassword(loggedUser.userId, newPassword);
          if (response.status === 400) {
            setPasswordChangeError(response.error);
            hasError = true;
          } else {
            setPasswordChangeError("");
            toast.success("Password was updated successfully!");
          }
        } else {
          setPasswordChangeError("Old password is incorrect.");
          return;
        }
      }

      if (hasError) {
        return;
      }

      setUsernameEditable(false);
      setEmailEditable(false);
      setPasswordEditable(false);
      setPhoneEditable(false);
      setEditable(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  const handleCancel = () => {
    setEditable(false);
    setUsernameEditable(false);
    setEmailEditable(false);
    setPasswordEditable(false);
    setPhoneEditable(false);
    setRefreshKey(Date.now());
    // setUsername(previousUsername);
    // setEmail(previousEmail);
    // setPhone(previousPhoneNumber);

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setUsernameError("");
    setEmailError("");
    setPhoneNumberError("");
    setPasswordChangeError("");
  };

  async function handleProfilePictureChange(fotoUpdated) {
    if (fotoUpdated && typeof fotoUpdated !== "string") {
      const fotoData = new FormData();
      fotoData.append("foto", fotoUpdated);

      try {
        console.log("Updating profile picture with photo data: ", fotoData);
        await axios
          .put(
            `https://localhost:7061/api/User/Update-ProfilePicture/${loggedUser.userId}`,
            fotoData
          )
          .then(async (response) => {
            console.log(response);
            setRefreshKey(Date.now());
          })
          .catch((error) => {
            console.log(error);
            toast.error(
              "An error occurred while updating the profile picture."
            );
          });
      } catch (err) {
        console.log(err);
        toast.error(
          "Server error occurred while updating the profile picture."
        );
      }
    } else {
      console.log("Invalid or no photo provided.");
    }
  }

  const handleOldPasswordChange = async () => {
    try {
      const isValid = await verifyOldPassword(loggedUser.userId, oldPassword);
      setIsOldPasswordValid(isValid);
      if (!isValid) {
        setPasswordChangeError("Old password is incorrect.");
      } else {
        setPasswordChangeError("");
      }
    } catch (error) {
      console.error("Failed to verify old password:", error);
      setIsOldPasswordValid(false);
      setPasswordChangeError("Failed to verify old password.");
    }
  };

  const handleProfilePicReset = async () => {
    try {
      await axios
        .put(`https://localhost:7061/api/User/Reset-Profile-Pic/${loggedUser.userId}`)
        .then(() => {
          setRefreshKey(Date.now());
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {
        selectedTab === "add-address" && 
        (
          <ShtoAdress
          mbyllShto = {()=>setSelectedTab('saved-addresses')}
          />
        )
      }
      {
        selectedTab === "defaultAdress" &&
        <DefaultAdress 
        mbyll = {()=>setSelectedTab('general')}
        />

      }
      <SideNav />
       <div className="BreadcrumbContainer profile-page-breadcrumb">
          <BreadcrumbComponent
            path={[{ pageType: "profilePage", emri: "Account Settings" }]}
          />
        </div>
      <div className="container">
      {loading ? (
            <div className="loading" style={{height:"100vh"}}>
              <TailSpin
                height="260"
                width="120"
                color="#322b9c"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : ( 
        <>
        
        <h2 className="font-weight-bold mt-4 mb-5" id="resend">
          Account Settings
        </h2>
        <div className="row">
          <div className="col-md-4">
            <div className="list-group list-group-flush account-settings-links">
              <Button
               className={`list-group-item list-group-item-action settings-button ${selectedTab==='general'?'activeButton':''}`}
                // data-toggle="list"
                // href="#account-general"
                id="general"
                onClick={() => handleTabClick('general')}
                >
                General
              </Button>
              <Button
               className={`list-group-item list-group-item-action settings-button ${selectedTab==='saved-addresses'?'activeButton':''}`}
                // data-toggle="list"
                onClick={() => handleTabClick('saved-addresses')}
                // href="#account-change-password"
                

                >
                Saved Addresses
              </Button>
              <Button
                className={`list-group-item list-group-item-action settings-button ${selectedTab==='defaultAdress'?'activeButton':''}`}
                onClick={() => handleTabClick('defaultAdress')}
                // data-toggle="list"
                // href="#account-info"
                >
                Default Address
              </Button>
              <Button
                                className={`list-group-item list-group-item-action settings-button ${selectedTab==='add-address'?'activeButton':''}`}
                // className="list-group-item list-group-item-action settings-button"
                onClick={() => handleTabClick('add-address')}
                // data-toggle="list"
                // href="#account-social-links"
                >
                Add Address
              </Button>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                {
                  selectedTab !== "saved-addresses"?
                  (
                  <>
                    <div className="media" id="foto">
                    <div className="profilePicture">
                      <Avatar
                        alt="Profilepic"
                        src={`/images/` + profilePicture}
                        sx={{ width: 125, height: 120 }}
                        />
                    </div>
                    <div className="media-body">
                      <div className="profile-pic-buttons">
                        <div>
                          <label
                          // className="btn btn-outline-primary mb-2"
                          // style={{ padding: "8px 12px" }}
                          >
                            Change Profile Picture
                            <input
                              type="file"
                              className="account-settings-fileinput"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                handleProfilePictureChange(file);
                              }}
                              style={{ display: "none" }}
                              />
                          </label>
                        </div>
                        <button
                          type="button"
                          className="btn btn-default-md-btn-flat-mb-2"
                          id="reset"
                          onClick={handleProfilePicReset}
                          >
                          Reset
                        </button>
                      </div>
                      {/* <div className="text-light small">
                        Allowed JPG, JPEG, or PNG. Max size of 800K
                        </div> */}
                    </div>
                  </div>
                  <hr />
                  <form>
                    <div className="form-group">
                      <label className="form-label profile-label">Username</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control profile-input"
                          value={username || ""}
                          disabled={!usernameEditable}
                          onChange={(e) => setUsername(e.target.value)}
                          />
                        {!editable && (
                          <button
                          type="button"
                          className="btn btn-primary userButton"
                          onClick={() => handleEdit("username")}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      {usernameError && (
                        <p style={{ color: "red", marginTop: "5px" }}>
                          {usernameError}
                        </p>
                      )}
                    </div>
  
                    <div className="form-group">
                      <label className="form-label profile-label">E-mail</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control profile-input"
                          value={email || ""}
                          disabled={!emailEditable}
                          onChange={(e) => setEmail(e.target.value)}
                          />
                        {!editable && (
                          <button
                          type="button"
                          className="btn btn-primary userButton"
                          onClick={() => handleEdit("email")}
                          >
                            Edit
                          </button>
                        )}
                      </div>
                      {emailError && (
                        <p style={{ color: "red", marginTop: "5px" }}>
                          {emailError}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label profile-label">
                        Phone Number
                      </label>
                      <div className="input-group">
                      <div className="phone-input">
                        <PhoneInput
                          country={"xk"} 
                          value={phone || ""}
                          disabled={!phoneEditable}
                          onChange={(phone) => setPhone(phone)}
                          inputStyle={{ width: "100%",height:"40px" ,borderColor:"#655CDB"}}
                        />
                          {/* <input
                            type="text"
                            className="form-control profile-input"
                            value={phone || ""}
                            disabled={!phoneEditable}
                            onChange={(e) => setPhone(e.target.value)}
                            /> */}
                          {!editable && (
                            <button
                            type="button"
                            className="btn btn-primary userButton"
                            onClick={() => handleEdit("phone")}
                            >
                              Edit
                            </button>
                          )}
                      </div>
                      </div>
                      {/* {phoneNumberError && (
                        <p style={{ color: "red", marginTop: "5px" }}>
                          {phoneNumberError}
                        </p>
                      )} */}
                    </div>
                    {passwordEditable && (
                      <>
                        <div className="form-group">
                          <label className="form-label profile-label">
                            Old Password
                          </label>
                          <input
                            type="password"
                            className="form-control profile-input"
                            value={oldPassword || ""}
                            onChange={(e) => setOldPassword(e.target.value)}
                            onBlur={handleOldPasswordChange}
                            />
                        </div>
                        <div className="form-group">
                          <label className="form-label profile-label">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="form-control  profile-input"
                            value={newPassword || ""}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={!isOldPasswordValid}
                            />
                        </div>
                        <div className="form-group">
                          <label className="form-label profile-label">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="form-control profile-input"
                            value={confirmPassword || ""}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={!isOldPasswordValid}
                            />
                        </div>
                        {passwordChangeError && (
                          <p style={{ color: "red" }}>{passwordChangeError}</p>
                        )}
                      </>
                    )}
                    <div className="form-group">
                      {editable ? (
                        <div className="save-changes-cancel">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSaveChanges}
                            >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancel}
                            >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                        type="button"
                        className="btn btn-primary changePassword"
                        onClick={() => handleEdit("password")}
                        >
                          Change Password
                        </button>
                      )}
                    </div>
                  </form>
                  </>
                  ) :(
                    <SavedAdresses 
                    />
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title" id="achievment">
              <FontAwesomeIcon icon={faMedal} />
              Achievement Badge
            </h5>
            <div className="badge-list">
              <div className="badge-item">
                {/* <i className={badge.icon}></i> */}
                <FontAwesomeIcon icon={badgeIcons[badgeName] || badgeIcons["default"]} 
                className="icon-badge"
                />
                <span>{badgeName}</span>
              </div>
            </div>
          </div>
        </div>
      </>
      )}
      </div>
      <Footer />
    </>
  );
};
export default ProfilePage;
