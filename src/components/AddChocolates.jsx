import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddChocolates = () => {
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const categoryValue = category;
    const photo = form.photoUrl.value;

    const newChocolate = { name, price, categoryValue, photo };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChocolate),
    };

    fetch(
      "https://chocolate-management-server-hnmahamud.vercel.app/chocolates",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        form.reset();
        if (response.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Chocolate Added Successfully!",
            icon: "success",
            confirmButtonText: "Cool",
          });
          navigate("/", { replace: true });
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="w-[95%] md:w-[80%] mx-auto mt-12">
      <Link to="/" className="btn btn-outline btn-sm space-x-2 mb-4">
        <FaLongArrowAltLeft></FaLongArrowAltLeft>
        <span>All Chocolates</span>
      </Link>
      <div className="bg-gray-200 py-12 rounded-md space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-semibold">New Chocolates</h3>
          <p className="text-gray-500">
            Use the below form to create your chocolates
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-[95%] md:w-[50%] mx-auto space-y-4"
        >
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            className="input input-bordered w-full"
          />
          <input
            name="price"
            type="text"
            placeholder="Price"
            required
            className="input input-bordered w-full"
          />
          <div className="md:flex md:gap-6 items-center bg-white w-full rounded-md px-3 py-1">
            <label className="label cursor-pointer">
              <span className="text-gray-400">Category:</span>
            </label>

            <label className="label cursor-pointer md:space-x-2">
              <input
                type="radio"
                name="category"
                value="Premium"
                onChange={() => setCategory("Premium")}
                required
                className="radio"
              />
              <span className="text-gray-400">Premium</span>
            </label>

            <label className="label cursor-pointer md:space-x-2">
              <input
                type="radio"
                name="category"
                value="Normal"
                onChange={() => setCategory("Normal")}
                required
                className="radio"
              />
              <span className="text-gray-400">Normal</span>
            </label>
          </div>

          <input
            name="photoUrl"
            type="text"
            placeholder="Photo URL"
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddChocolates;
