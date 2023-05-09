import { Link, useLoaderData } from "react-router-dom";
import chocoBar from "./assets/chocolate-bar.png";
import { FaPlus } from "react-icons/fa";
import ChocolatesCard from "./components/ChocolatesCard";
import Swal from "sweetalert2";
import { useState } from "react";

function App() {
  const loadedChocolates = useLoaderData();
  const [allChocolate, setAllChocolate] = useState(loadedChocolates);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const options = { method: "DELETE" };

        fetch(
          `https://chocolate-management-server-hnmahamud.vercel.app/chocolates/${id}`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            const remailing = allChocolate.filter(
              (singleChoco) => singleChoco._id !== id
            );
            setAllChocolate(remailing);
            Swal.fire(
              "Deleted!",
              "Your chocolate has been deleted.",
              "success"
            );
          })
          .catch((err) => console.error(err));
      }
    });
  };
  return (
    <div className="w-[95%] md:w-[80%] mx-auto mt-12">
      <Link
        to="/add-chocolates"
        className="btn btn-outline btn-sm space-x-2 mb-4"
      >
        <FaPlus></FaPlus>
        <span>New Chocolate</span>
        <img src={chocoBar} alt="" />
      </Link>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allChocolate.map((singleChocolate) => (
              <ChocolatesCard
                key={singleChocolate._id}
                singleChocolate={singleChocolate}
                handleDelete={handleDelete}
              ></ChocolatesCard>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
