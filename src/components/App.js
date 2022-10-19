import "../styles/css/app.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import Properties from "./Properties";
import AddProperty from "./AddProperty";
import SavedFavourites from "./SavedFavourites";

const App = () => {
  const initialState = {
    properties: [],
    alert: {
      message: "",
      isSuccess: false,
    },
    userID: "",
  };

  const [userID, setUserID] = useState(initialState.userID);
  const [properties, setProperties] = useState(initialState.properties);
  const [alert, setAlert] = useState(initialState.alert);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/PropertyListing`)
      .then(({ data }) => setProperties(data))
      .catch(() => {
        setAlert({
          message: "Server error. Please try again later.",
          isSuccess: false,
        });
      });
  }, []);

  const handleLogin = (response) => {
    const thisUserId = response.userID;
    setUserID(thisUserId);
    window.localStorage.setItem("userID", thisUserId);
  };

  const thisUserId = window.localStorage.getItem("userID");

  if (thisUserId && !userID) {
    setUserID(thisUserId);
  }

  const handleLogout = () => {
    setUserID("");
    window.localStorage.removeItem("userID");
    window.FB.logout();
  };

  if (properties.length === 0) {
    return (
      <div className="App">
        <NavBar
          handleLogin={handleLogin}
          userID={userID}
          handleLogout={handleLogout}
        />
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="App">
      <NavBar
        handleLogin={handleLogin}
        userID={userID}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Properties
              userID={userID}
              properties={properties}
              setProperties={setProperties}
              alert={alert}
              setAlert={setAlert}
            />
          }
        />
        <Route
          path="saved-favourites"
          element={<SavedFavourites properties={properties} />}
        />
        <Route path="add-property" element={<AddProperty />} />
      </Routes>
    </div>
  );
};

export default App;
