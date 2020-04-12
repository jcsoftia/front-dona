import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./FormHelp.css";
import Input from "../Shared/Components/FormElements/Input";
import Button from "../Shared/Components/FormElements/Button";
import Modal from "../Shared/Components/UIElements/Modal";
import Card from "../Shared/Components/UIElements/Card";
import CheckBox from "../Shared/Components/FormElements/CheckBox";
import { useForm } from "../Shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../Shared/Utils/Validators";

const FormHelp = (props) => {
  const API_KEY = "AIzaSyAyJ821gbXvSLBEGuS0W51orqQq5YCZCLo";
  const inputProvince = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [checked, setChecked] = useState(false);
  const [footerMessage, setFooterMessage] = useState(
    "we will be grateful to you"
  );

  const [formState, inputHandler, setFormData] = useForm(
    {
      province: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      dni: {
        value: "",
        isValid: false,
      },
      productName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    // console.log(e);
    setSending(true);
    try {
      const data = await fetch(`https://back-dona.herokuapp.com/users/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isDonor: checked,
          dni: formState.inputs.dni.value,
          location: props.location,
          province: !checked ? formState.inputs.province.value : "==",
          name: !checked ? formState.inputs.name.value : "==",
          cellphone: !checked ? formState.inputs.cellphone.value : "000000000",
          products: [
            {
              productName: formState.inputs.productName.value,
              description: formState.inputs.description.value,
            },
          ],
        }),
      });

      if (data.status === 400) {
        setSuccess(false);
        throw new Error(await data.text());
      } else {
        setFooterMessage("Thank you so much");
        setTimeout(() => {
          history.push("/");
        }, 1000);
        setError(false);
        setSuccess(true);
      }
    } catch (Error) {
      setError(true);
      setFooterMessage(`${Error}`);
      console.log("error", Error);
    }
    setSending(false);
  };

  const isChecked = (e) => {
    setChecked(e);
  };

  // Searh in Google Maps
  const searchInMaps = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formState.inputs.province.value
        )}&key=${API_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };


  // Changing the pin in the map
  useEffect(() => {
      let setTime = null;
      if (loaded) {
        const getData = async () => {
          setTime = setTimeout(async () => {
            if (
              formState.inputs.province.value === inputProvince.current.value
            ) {
              const geolocation = await searchInMaps();
              console.log("geolocation", geolocation);
              if (geolocation) {
                if (geolocation.results.length > 0) {
                  props.handleLocation(
                    geolocation.results[0].geometry.location.lat,
                    geolocation.results[0].geometry.location.lng
                  );
                }
              } else {
                console.log("cant load gmaps");
                setError(true);
              }
            }
          }, 500);
        };
        getData();
      }
      setLoaded(true);
      return () => {
        clearTimeout(setTime);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formState.inputs.province.value]
  );

  return (
    <Modal
      show={loaded}
      header={<CheckBox isChecked={isChecked} />}
      onCancel={false}
      footer={footerMessage}
      className="modal_container-start"
      success={success}
      error={error}
      hideButton={true}
      backdrop={!formState.inputs.province.value}
    >
      <Card className="d-flex">
        {!checked && (
          <Input
            element="input"
            id="province"
            ref={inputProvince}
            label="State / Province"
            name="province"
            value={formState.inputs.province.value}
            onInput={inputHandler}
            validators={[]}
          />
        )}
        {!checked && (
          <Input
            element="input"
            id="name"
            label="Full Name"
            name="name"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
        )}
        <Input
          element="input"
          id="dni"
          label="DNI"
          className={!checked && "dm-6"}
          name="dni"
          onInput={inputHandler}
          validators={[]}
        />
        {!checked && (
          <Input
            element="input"
            id="cellphone"
            label="cellphone"
            type="number"
            name="cellphone"
            className="dm-6"
            onInput={inputHandler}
            validators={[]}
          />
        )}
        <Input
          element="input"
          id="productName"
          label="productName"
          type="text"
          name="productName"
          onInput={inputHandler}
          validators={[]}
        />
        <Input
          id="description"
          label="description"
          type="textarea"
          name="description"
          onInput={inputHandler}
          validators={[]}
        />
        <Button className="mt-2" disabled={sending} onClick={submit}>
          {sending ? "Sending" : "Donar"}
        </Button>
      </Card>
    </Modal>
  );
};

export default FormHelp;
