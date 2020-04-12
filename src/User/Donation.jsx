import React, { useEffect, useContext, useState } from "react";

import "./Donation.css";
import LoadingSpinner from '../Shared/Components/UIElements/LoadingSpinner'
import DonationList from './DonationList'

import { AuthContext } from "../Shared/Context/auth_context";
import { useHttpClient } from "../Shared/hooks/http-hook";

const Donation = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDonations, setLoadedDonations] = useState(null)
  const auth = useContext(AuthContext);
  useEffect(() => {
    
    const getDonations = async () => {
      try {
        const response = await sendRequest(`https://back-dona.herokuapp.com/donation/`, "GET", null, {
          "auth-token": auth.token,
        });
        setLoadedDonations(response)
      } catch (err) {}
    };
    getDonations();
  }, []);

  const isDonatedHandler = id => {
    const products = loadedDonations.products

    products.forEach((donation,key) => {
      donation["_id"] === id ? (donation["state"] = true):(console.log(''));
    });
    setLoadedDonations({
          ...loadedDonations,
          products: products
        })
  }

  return (
    <>
    
      {isLoading && (
          <div className="center">
          <LoadingSpinner asOverlay/>
          </div>
        )}
      {!isLoading && loadedDonations && (
        <div className="donation">
        <DonationList  items={loadedDonations.products} isDonated={isDonatedHandler} />
        </div>
      )}
      {/* <div className="donation"></div> */}
    </>
  );
};

export default Donation;
