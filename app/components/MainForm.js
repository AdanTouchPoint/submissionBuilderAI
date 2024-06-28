"use client";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import ListSelect from "./ListSelect";
import AIPrompt from "./AIPrompt";
import EmailForm from "./EmailForm";
import ThankYou from "./ThankYou";
import { animateScroll as scroll } from "react-scroll";
import LoadingMainForm from "./LoadingMainForm";
const MainForm = ({
  leads,
  setLeads,
  dataUser,
  setDataUser,
  mp,
  emailData,
  clientId,
  states,
  typData,
  mainData,
  backendURLBase,
  endpoints,
  backendURLBaseServices,
  allDataIn,
  colors,
  formFields,
  emails,
}) => {
  const [hideEmailForm, setHideEmailForm] = useState(true);
  const [hideList, setHideList] = useState(true);
  const [showLoadSpin, setShowLoadSpin] = useState(false);
  const [showFindForm, setShowFindForm] = useState(false);
  const [hideIAPrompt, setHideIAPrompt] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(true);
  const [tac, setTac] = useState(false);
  const [showMainContainer, setShowMainContainer] = useState(false);
  const loading = (cl) => {
    scroll.scrollTo(1000);
    return <LoadingMainForm cl={cl} />;
  };
  const handleTerms = (e) => {
    if (e.target.checked === true) {
      setTac(true);
    } else {
      setTac(false);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  if (!mainData) return "loading datos";
  if (!mp) return "loading datos";
  return (
    <div className={"contenedor main-form-flex-container"}>
      <div className={"container instructions"}></div>
      <div className={"form-container"} hidden={showMainContainer}>
        <div className={"container container-content"}>
          {error ? (
            <Alert variant={"danger"}>
              Please fill all fields. Also, please make sure there are no spaces
              before of after your email or postcode.
            </Alert>
          ) : null}
          <Form
            name="fm-find"
            noValidate
            validated={validated}
            hidden={showFindForm}
          >
            <div className="instructions-container">
              <h3 className="main-texts-color main-text-title">
                {mainData.title}
              </h3>
              <p className="main-texts-color main-text-instruction">
                {mainData.instruction}
              </p>
            </div>
            {/* <h3 className="find-her-mp-text main-texts-color">{mainData.firstFormLabel1}</h3> */}
            <div className="fields-form">
              {formFields.map((field, key) => {
                return field.type !== "state" ? (
                  <Form.Group className="field" key={key}>
                    <Form.Label
                      className="select-label main-texts-color labels-text-format"
                      htmlFor={`emailInput-mainForm${key}`}
                    >
                      {field.label}*
                    </Form.Label>
                    <Form.Control
                      id={`emailInput-mainForm${key}`}
                      type={field.type === "emailUser" ? "email" : field.type}
                      placeholder={field.placeholder}
                      name={field.type === "name" ? "userName" : field.type}
                      onChange={handleChange}
                      className="input-color main-form-inputs"
                      required
                    />
                  </Form.Group>
                ) : states.length > 0 ? (
                  <Form.Group className={"field"} key={key}>
                    <Form.Label className="select-label">
                      {field.label}*
                    </Form.Label>
                    <Form.Select
                      aria-label="DefaulValue"
                      required
                      name={field.type}
                      id="stateSelect-mainForm"
                      onChange={handleChange}
                    >
                      <option key={"vacio"} value={""}>
                        {field.placeholder}
                      </option>
                      {states.sort().map((estate) => (
                        <option key={estate} value={estate}>
                          {estate}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                ) : (
                  <Form.Group className="field" key={key}>
                    <Form.Label className="select-label">
                      {field.label}*
                    </Form.Label>
                    <Form.Control
                      id="emailInput-mainForm"
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.type}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                );
              })}
            </div>
            <AIPrompt
              tac={tac}
              setHideIAPrompt={setHideIAPrompt}
              hideIAPrompt={hideIAPrompt}
              dataUser={dataUser}
              setDataUser={setDataUser}
              mainData={mainData}
              allDataIn={allDataIn}
              setShowMainContainer={setShowMainContainer}
              setHideList={setHideList}
              setTac={setTac}
            />
            {/* <Form.Group
              style={{ textAlign: "justify" }}
              className="field select-styles-form terms-and-cond-input"
              controlId="conditions"
            >
              <Form.Check
                name="conditions"
                onClick={handleTerms}
                className="links-checkboxes-color terms-and-cond-input"
                // bsPrefix="custom-checkbox"
                required
                label={
                  <a
                    target={"_blank"}
                    className="links-checkboxes-color"
                    rel={"noreferrer"}
                    href={mainData.termsAndConditionsURL}
                  >
                    Terms and Conditions
                  </a>
                }
              />
            </Form.Group> */}
            <Form.Group className="main-find-btn-container"></Form.Group>
      
            {showLoadSpin ? loading("spinner-containerB") : null}
          </Form>
        </div>
      </div>
      <ListSelect
        setValidated={setValidated}
        setError={setError}
        emails={emails}
        setShowFindForm={setShowFindForm}
        setHideIAPrompt={setHideIAPrompt}
        setShowMainContainer={setShowMainContainer}
        showMainContainer={showMainContainer}
        hideList={hideList}
        setHideEmailForm={setHideEmailForm}
        setHideList={setHideList}
        setDataUser={setDataUser}
        dataUser={dataUser}
        error={error}
      />
      <EmailForm
        allDataIn={allDataIn}
        setHideList={setHideList}
        setShowMainContainer={setShowMainContainer}
        setHideEmailForm={setHideEmailForm}
        hideEmailForm={hideEmailForm}
        leads={leads}
        setLeads={setLeads}
        setShowThankYou={setShowThankYou}
        setShowFindForm={setShowFindForm}
        dataUser={dataUser}
        setDataUser={setDataUser}
        setHideIAPrompt={setHideIAPrompt}
        emailData={emailData}
        clientId={clientId}
        backendURLBase={backendURLBase}
        endpoints={endpoints}
        backendURLBaseServices={backendURLBaseServices}
      />
      <ThankYou
        setShowFindForm={setShowFindForm}
        setShowThankYou={setShowThankYou}
        typData={typData}
        showThankYou={showThankYou}
        setShowMainContainer={setShowMainContainer}
        colors={colors}
      />
    </div>
  );
};
export default MainForm;
