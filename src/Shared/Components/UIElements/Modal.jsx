import React, { useState } from "react";
import reactDOM from "react-dom";

import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import Button from "../FormElements/Button";
import "./Modal.css";
import { useEffect } from "react";

const ModalOverLay = (props) => {
  const [buttonOn, setButtonOn] = useState("");
  const [showContent, setShowContent] = useState(true);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setSuccess(props.success);
    setError(props.error);
    return () => {};
  }, [props.success, props.error]);

  const content = (
    <div
      className={`modal_container ${props.className} ${
        buttonOn ? "f-end" : "f-center"
      }`}
    >
      <div className={`modal `} style={props.style}>
        <header className={`modal__header ${props.headerClass}`}>
          <h2>{props.header}</h2>
        </header>
        <form
          onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
        >
          <CSSTransition
            in={showContent}
            timeout={300}
            classNames="content"
            unmountOnExit
            onEnter={() => setButtonOn(false)}
            onExited={() => setButtonOn(true)}
          >
            <div className={`modal__content ${props.contentClass}`}>
              {props.children}
            </div>
          </CSSTransition>
          <footer className={`modal__footer ${props.footerClass}`}>
            {success ? (
              <span style={{ color: "green" }}>{props.footer}</span>
            ) : error ? (
              <span style={{ color: "red" }}>{props.footer}</span>
            ) : (
              <span>{`${props.footer || ""}`}</span>
            )}
            {props.footerContent}
            {props.hideButton ? buttonOn ? (
              <Button size="small" onClick={() => setShowContent(true)}>
                Up
              </Button>
            ) : (
              <Button size="small" onClick={() => setShowContent(false)}>
                Down
              </Button>
            ):""}
          </footer>
        </form>
      </div>
    </div>
  );
  return reactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <>
      {props.backdrop && <Backdrop onClick={props.onCancel || null} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        appear={true}
        timeout={800}
        classNames="fade"
      >
        <ModalOverLay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
