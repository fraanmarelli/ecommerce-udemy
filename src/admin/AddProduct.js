import React, { useState, useEffect } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import Layout from "../core/Layout";
import { createProduct } from "./apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
      console.log([...formData])
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4> Post Photo </h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange("photo")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="form-control">
        <label className="text-muted">Product Description</label>
        <textarea
          type="text"
          className="form-control"
          value={description}
          onChange={handleChange("description")}
        />
      </div>
      <div className="form-control">
        <label className="text-muted">Price</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={handleChange("price")}
        />
      </div>
      <div className="form-control">
        <label className="text-muted">Category</label>
        <select
          type="text"
          className="form-control"
          onChange={handleChange("category")}
        >
          <option value={"61fd59ffff58e852e2a42106"}> Books </option>
          <option value={"61feb3931508c5a536bf5544"}> Shoes </option>
        </select>
      </div>
      <div className="form-control">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={handleChange("quantity")}
        />
      </div>
      <div className="form-control">
        <label className="text-muted">Shipping</label>
        <select
          type="text"
          className="form-control"
          onChange={handleChange("shipping")}
        >
          <option value={"0"}> No </option>
          <option value={"1"}> Yes </option>
        </select>
      </div>
      <button className="btn btn-outline-primary">Create</button>
    </form>
  );

  return (
    <Layout
      title="Add new product"
      description={`Add a product and start selling!`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newPostForm()}</div>
      </div>
    </Layout>
  );
};

export default AddProduct;
