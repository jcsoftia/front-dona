import React, { useState, useContext } from "react";

import { AuthContext } from "../Shared/Context/auth_context";
import { useHttpClient } from "../Shared/hooks/http-hook";
import Card from "../Shared/Components/UIElements/Card";
import Button from "../Shared/Components/FormElements/Button";
import Modal from "../Shared/Components/UIElements/Modal";
import LoadingSpinner from "../Shared/Components/UIElements/LoadingSpinner";

import "./DonationItem.css";

const DonationItem = (props) => {
  const { isLoading, sendRequest } = useHttpClient();
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
              CANCELAR
            </Button>
            <Button danger onClick={confirmDonatedHandler}>
              DE ACUERDO
            </Button>
          </>
        }
        showButton={false}
        buttonOn={false}
        className="modal_container-fixed"
      >
        <Card>

        <p>
          ¿Estas seguro que deseas marcar como donado este producto?
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
              <h2 style={{color:'green'}} >Gracias por donar</h2>
            )}
          </div>
        </Card>
      </li>
    </div>
  );
};

export default DonationItem;
