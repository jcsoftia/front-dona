import React from "react";
import Card from "../Shared/Components/UIElements/Card.jsx";
// import SocialMedia from "./SocialMedia";

import { CSSTransition } from "react-transition-group";

import "./About.css";

const About = () => {
  return (
    <main className="about">
      <CSSTransition
        in={true}
        mountOnEnter
        unmountOnExit
        appear={true}
        timeout={800}
        classNames="fade"
      >
        <Card>
          <div className="container">
            <h1>
              SONQQO{" "}
              <span role="img" aria-label="heart">
                💚
              </span>{" "}
            </h1>
            <div className="about__content">
              <h2 className="about__subtitle">¿QUE ES?</h2>
              <p>
                Sonqqo es una plataforma sin fines de lucro desarrollada por un
                grupo de voluntarios que buscan dar su grano de arena para poder
                sobrellevar la crisis por la que el mundo está pasando{" "}
              </p>

              <h2 className="about__subtitle">¿PARA QUÉ SIRVE?</h2>
              <p>
                Busca conectar a personas que quieran hacer donaciones de cosas que ya no usan en casa con personas cercanas que lo necesiten, de una manera sencilla y
                rápida{" "}
              </p>

              <h2 className="about__subtitle">¿QUÉ PUEDES DONAR?</h2>
              <p>
              Puedes donar todo lo que pienses que ayudara a otra persona: un libro usado, unos platos que no te sirven, un gatito, una pulsera, un masetero, recuerda que lo que dones deberá estar en un estado aceptable y que donando puedes Reciclar y apoyar al mas necesitado al mismo tiempo
              </p>
            </div>
          </div>
        </Card>
      </CSSTransition>

      {/* <div className="container">
        <h1>VOLUNTARIOS</h1>
        <CSSTransition
          in={true}
          mountOnEnter
          unmountOnExit
          appear={true}
          timeout={800}
          classNames="fade"
        >
          <div className="voluntarios">
            <Card className="voluntario">
              <img
                src={`https://www.gravatar.com/avatar/8775adf57f3d243d891b973a8a08aca7`}
                className="img-voluntario"
                alt=""
              />
              <h1>Juan Carlos Valencia Lopez</h1>
              <p>Front-End Developer</p>
              <a href="www.google.com">ajcarlos032@gmail.com</a>
              <SocialMedia />
            </Card>
            <Card className="voluntario">
              <img
                src="https://www.gravatar.com/avatar/f63a9c45aca0e72ade0782a6b1dff40b?d=identicon"
                className="img-voluntario"
                alt=""
              />
              <h1>Ernesto Angulo Jimenez</h1>
              <p>Back-End Developer</p>
              <a href="www.google.com">Email</a>
              <SocialMedia />
            </Card>
            <Card className="voluntario">
              <img
                src="https://www.gravatar.com/avatar/f63a9c45aca0e7e7de0782a6b1dff40b?d=identicon"
                className="img-voluntario"
                alt=""
              />
              <h1>Percy Campos</h1>
              <p>Nose</p>
              <a href="www.google.com">Email</a>
              <SocialMedia />
            </Card>
            <Card className="voluntario">
              <img
                src="https://www.gravatar.com/avatar/d57a8be8cb9219609905da25d5f3e50a?d=identicon"
                className="img-voluntario"
                alt=""
              />
              <h1>Dan</h1>
              <p>Marketing</p>
              <a href="www.google.com">Email</a>
              <SocialMedia />
            </Card>
          </div>
        </CSSTransition>
      </div> */}

      <Card className="footer">
        <p>Peru Soft - {new Date().getFullYear()}</p>
      </Card>
    </main>
  );
};

export default About;
