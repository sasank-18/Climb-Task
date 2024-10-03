import { useState } from "react";
import UserForm from "./UserForm";
import PropTypes from "prop-types";

const Header = ({ DataToBeUpdated, setUpdatedData }) => {
  const [activeUserForm, setActiveUserForm] = useState(false);
  return (
    <section className="w-full py-4 flex justify-between">
      <p className="font-bold text-2xl text-green-500">Manage User</p>

      <button
        onClick={() => setActiveUserForm(!activeUserForm)}
        className="bg-green-500 whitespace-nowrap px-4 py-2 rounded-md"
      >
        Add User
      </button>
      {activeUserForm && (
        <UserForm
          DataToBeUpdated={DataToBeUpdated}
          setUpdatedData={setUpdatedData}
          activeUserForm={activeUserForm}
          setActiveUserForm={setActiveUserForm}
        />
      )}
    </section>
  );
};

export default Header;


Header.propTypes = {
    DataToBeUpdated: PropTypes.object, // Adjust to match the shape of the data
    setUpdatedData: PropTypes.func.isRequired, // Required function
  };
  