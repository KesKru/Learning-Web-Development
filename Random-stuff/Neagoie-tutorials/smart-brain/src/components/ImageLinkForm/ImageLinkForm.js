import React from 'react';

export default function ImageLinkForm({
  onInputChange,
  onPictureSubmit,
  inputValue
}) {
  return (
    <div className="row justify-content-center">
      {/* <form className="col-6"> */}
      <div className="col-6 form-group form-over-button">
        <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter image URL ..."
          onChange={onInputChange}
          value={inputValue}
        />
        <button
          type="submit"
          className="btn btn-outline-primary btn-block submit-button"
          onClick={onPictureSubmit}
        >
          Detect
        </button>
      </div>
      {/* </form> */}
    </div>
  );
}
