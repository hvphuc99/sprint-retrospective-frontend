import userApi from "api/userApi";
import { setLoading } from "app/loadingSlice";
import Header from "components/Header";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProfileForm from "features/UserInfo/components/ProfileForm";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    const { firstName, lastName } = event;

    userApi
      .updateProfile(firstName, lastName)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    userApi
      .getProfile()
      .then((res) => {
        const { first_name, last_name } = res.user_info;
        setFirstName(first_name);
        setLastName(last_name);
        dispatch(setLoading(false));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <ProfileForm
        firstName={firstName}
        lastName={lastName}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Profile;
