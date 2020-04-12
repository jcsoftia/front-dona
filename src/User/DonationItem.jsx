import React, { useState, useContext } from "react";

import { AuthContext } from "../Shared/Context/auth_context";
import { useHttpClient } from "../Shared/hooks/http-hook";
import { useEffect } from "react";
import Card from "../Shared/Components/UIElements/Card";
import Button from "../Shared/Components/FormElements/Button";
import Modal from "../Shared/Components/UIElements/Modal";
import LoadingSpinner from "../Shared/Components/UIElements/LoadingSpinner";

import "./DonationItem.css";

const DonationItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDonatedWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDonatedHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDonatedHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `https://back-dona.herokuapp.com/donation/`,
        "PUT",
        JSON.stringify({
          id: props.id,
        }),
        {
          "auth-token": auth.token,
          'Content-Type': 'application/json'
        }
      );
      props.isDonated(props.id);
    } catch (err) {}
  };
  return (
    <div className="donation-item">
      <Modal
        show={showConfirmModal}
        onCancel={cancelDonatedHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footerContent={
          <>
            <Button inverse onClick={cancelDonatedHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDonatedHandler}>
              DELETE
            </Button>
          </>
        }
        className="modal_container-fixed"
      >
        <Card>

        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
        </Card>
      </Modal>
      <li className="donation-item">
        <Card className="">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="donation-item__info">
            <h2>{props.productName}</h2>
            <p>{props.description}</p>
            {!props.state ? (
              <Button onClick={showDonatedWarningHandler}>
                Marcar como donado
              </Button>
            ) : (
              <h2>Gracias por donar</h2>
            )}
          </div>
        </Card>
      </li>
    </div>
  );
};

export default DonationItem;
