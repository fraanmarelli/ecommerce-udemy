import React, { useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import Layout from "../core/Layout";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //   //destructure user and token from Local Storage
  const { user, token } = isAuthenticated();

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success"> {name} is created </h3>;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <h3 className="text-danger">
          {" "}
          {name} is already created. Try different.{" "}
        </h3>
      );
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        {" "}
        Continue to Dashboard{" "}
      </Link>
    </div>
  )

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted"> Name </label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={handleChange}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  return (
    <Layout title="Create Category" description={`Logged as ${user.name}!`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
        {showSuccess()}
        {showError()}
        {goBack()}
      </div>
    </Layout>
  );
};

export default AddCategory;
