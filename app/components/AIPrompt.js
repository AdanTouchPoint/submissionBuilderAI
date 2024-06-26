"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/cjs/Col";
import Alert from "react-bootstrap/Alert";
import { useCompletion } from "ai/react";
import { animateScroll as scroll } from "react-scroll";
import LoadingMainForm from "./LoadingMainForm";

const AIPrompt = ({
  tac,
  dataUser,
  setDataUser,
  hideIAPrompt,
  setHideIAPrompt,
  mainData,
  allDataIn,
  setShowMainContainer,
  setHideList,
  setTac

}) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [requestCompletion, setRequestCompletion] = useState([]);
  const [ableGenIA, setAbleGenIA] = useState(true);
  const [iaPrompt, setIaPrompt] = useState("");
  const {
    complete,
    isLoading,
    handleSubmit,
  } = useCompletion({
    api: "/api/completion"
  });
  const handleTerms = (e) => {
    if (e.target.checked === true) {
      setTac(true);
    } else {
      setTac(false);
    }
  };
  const handlePromptChange = (e) => {
    setIaPrompt(e.target.value);
    if (!iaPrompt || iaPrompt === "") {
      setAbleGenIA(false);
    }
  };
  const loading = (cl) => {
    scroll.scrollTo(1000);
    return <LoadingMainForm cl={cl} />;
  };
  const isValidEmail = (email) => {
    if(!email){
      return false
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email.trim());
  };
  const clickAI = async (e) => {
    e.preventDefault();
    try {
      console.log(dataUser)
      if (!isValidEmail(dataUser.emailUser) || tac === false ||  Object.getOwnPropertyNames(dataUser).length === 0 || dataUser.userName === undefined  || dataUser.emailUser === undefined  ) {
        setError(true);
        return;
      }
      setValidated(true);
      setError(false);
      const validObject = { promptBase: mainData.promptAI, prompt: iaPrompt };
      const validString = await JSON.stringify(validObject);
      const text = await complete(validString);
      console.log(text);
      const response = JSON.parse(text);
      setRequestCompletion({ message: response.message });
      setDataUser({
        ...dataUser,
        subject: response.subject || "",
        message: response.message || "",
      });
      setShowMainContainer(true)
      setHideIAPrompt(true);
      setHideList(false);
    } catch (error) {
      console.error("Error in AI generation:", error);
    }
  };
  return (
    <>
      {isLoading == true ? (
        <div className="emailContainer">{loading("spinner-containerB")}</div>
      ) : (
        <div className={"IAInputContainer"} hidden={hideIAPrompt}>
          {error ? (
            <Alert variant={"danger"}>
              All fields are required, please fill in the missing ones.
            </Alert>
          ) : null}
          {console.log(allDataIn)}
          <Form
            name="fm-email"
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
          >
            <div>
              <>
              
              </>
              <div>
                <div>
                  <Col>
                    <Form.Group className="ia-input-container">
                      <Form.Label className="label-ia-prompt">
                      {mainData.intructionsAI
                    ? mainData.intructionsAI
                    : "Customer instructions for the user. Here the client explains to the user how this function works, and tells them to briefly describe what they want to say in the email."}
                      </Form.Label>
                      <Form.Control
                        id="message-emailform"
                        onChange={handlePromptChange}
                        as="textarea"
                        rows={12}
                        name="message"
                        defaultValue={iaPrompt}
                        className="email-ia-text-area"
                        required
                      />
                    </Form.Group>
                  </Col>
                </div>
                <Form.Group
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
            </Form.Group>
                <div
                  className={
                    "buttons-container-email-form btn-container-checklist"
                  }
                >
                  <Button
                    onClick={clickAI}
                    className={"button-email-form secundary-btn"}
                    disabled={ableGenIA}
                  >
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};

export default AIPrompt;
