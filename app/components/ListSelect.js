import React, { useState } from "react";
import Button from "react-bootstrap/cjs/Button";

const ListSelect = ({
  emails,
  setHideIAPrompt,
  setShowMainContainer,
  hideList,
  setHideEmailForm,
  setHideList,
  setDataUser,
  dataUser
}) => {
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  }
  const click = async () => {
    setHideEmailForm(false);
    setHideList(true)
    setShowMainContainer(true);
  };
  const back = () => {
    setHideList(true)
    setShowMainContainer(false)
    setHideIAPrompt(false)
  }
  return (
    <>
      <div
        hidden={hideList}
        className={"buttons-list-container list-container"}
      >
        {emails?.map((email, index) => (
          <label key={index} className="list-mp-row">
            <input
              id="representativeList-checkbox"
              type="checkbox"
              onChange={handleChange}
              className="form-check-input"
              value={email.name}
              name="privacyType"
            />
            <h5 className="list-mp-row-info">{email.name}</h5>
          </label>
        ))}
              <div className="btn-container-checklist">
              <Button
            id="representativeList-button"
            className="continue-button"
            size={"lg"}
            onClick={back}
          >
            Back
          </Button>
          <Button
            id="representativeList-button"
            className="continue-button"
            size={"lg"}
            onClick={click}
          >
            Continue
          </Button>
      </div>
      </div>

    </>
  );
};

export default ListSelect;
