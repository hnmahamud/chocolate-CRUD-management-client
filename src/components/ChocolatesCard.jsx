import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaWindowClose } from "react-icons/fa";

const ChocolatesCard = ({ singleChocolate, handleDelete }) => {
  const { _id, photo, name, price, categoryValue } = singleChocolate;
  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={photo} />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{categoryValue}</td>
      <td>{price}</td>
      <td>
        <div className="flex gap-4">
          <Link to={`/update-chocolates/${_id}`}>
            <FaEdit className="w-5 h-5"></FaEdit>
          </Link>
          <button onClick={() => handleDelete(_id)}>
            <FaWindowClose className="w-5 h-5"></FaWindowClose>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ChocolatesCard;
