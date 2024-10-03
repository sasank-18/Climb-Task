import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addUserSchema = z.object({
  firstName: z.string().min(2, { message: "First Name is required" }),
  lastName: z.string().min(2, { message: "Last Name is required" }),
  phone: z
    .string()
    .min(10, { message: "Phone Number must be at least 10 digits" })
    .max(15, { message: "Phone Number cannot exceed 15 digits" })
    .regex(/^\d+$/, { message: "Phone Number must contain only numbers" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  department: z.string().min(1, { message: "Department is required" }),
});

const UserForm = ({
  dataToBeEdited,
  type,
  prevData,
  DataToBeUpdated,
  setUpdatedData,
  activeUserForm,
  setActiveUserForm,
}) => {
  const [formLoading, setFormLoading] = useState(false);
  const arrName = dataToBeEdited?.name.split(" ");
  console.log("dataToBeEdited", dataToBeEdited);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      firstName: arrName?.[0] || "",
      lastName: arrName?.[1] || "",
      phone: dataToBeEdited?.["phone no."] || "",
      email: dataToBeEdited?.email || "",
      role: dataToBeEdited?.type || "",
      location: dataToBeEdited?.location || "",
      department: dataToBeEdited?.function || "",
    },
  });

  const submitForm = (value) => {
    if (errors.email) {
      return setError("email", {
        type: "manual",
        message: "Email is already registered",
      });
    }
    setFormLoading(true);
    try {
      if (type === "edit") {
        let modifiedData = prevData?.map((item) => {
          if (item?.id === dataToBeEdited?.id) {
            return {
              id: dataToBeEdited.id,
              name: value.firstName + " " + value.lastName,
              "phone no.": value.phone,
              type: value.role,
              location: value.location,
              function: value.department,
              email: value.email,
            };
          }
          return item;
        });
        setUpdatedData(modifiedData);
      } else {
        setUpdatedData((prevData) => [
          ...prevData,
          {
            id: prevData.length + 1,
            name: value.firstName + " " + value.lastName,
            "phone no.": value.phone,
            type: value.role,
            location: value.location,
            function: value.department,
            email: value.email,
          },
        ]);
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      setFormLoading(false);
      setActiveUserForm(false);
    }
  };

  const handleChangeEmail = (e) => {
    if (type) return;
    const data = DataToBeUpdated?.find((data) => {
      return data.email === e.target.value;
    });
    console.log(data);
    if (data) {
      return setError("email", {
        type: "manual",
        message: "Email is already registered",
      });
    } else {
      clearErrors("email");
      setValue("email", e.target.value);
    }
  };

  return (
    <section
      onClick={() => {
        setActiveUserForm(!activeUserForm);
      }}
      className="w-full h-full fixed top-0 px-8 left-0 z-20 backdrop-blur-[1px] flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="max-h-[70%] w-full relative  max-w-[60%] max-md:max-w-[100%] px-8 py-6 rounded-sm overflow-auto UserForm bg-gray-200   "
      >
        <div className="flex flex-wrap gap-2 justify-between ">
          <p className=" font-bold text-lg mb-3 ">
            {type === "edit" ? "Edit User Form " : "Add User Form"}
          </p>
          <p className="italic text-xs text-zinc-800">
            All fields are mandatory *
          </p>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex max-md:flex-col gap-x-8 gap-y-4 mb-4 flex-wrap">
            <article className="flex-1">
              <p>First Name*</p>
              <input
                {...register("firstName")}
                type="text"
                placeholder="First Name"
                className="w-full px-2 py-2 rounded-md outline-none"
              />
              <p className="bg-gray-200 text-xs text-red-600  m-0">
                {" "}
                {errors?.firstName && errors.firstName.message}
              </p>
            </article>
            <article className="flex-1">
              <p>Last Name*</p>
              <input
                {...register("lastName")}
                type="text"
                placeholder="Last Name"
                className="w-full px-2 py-2 rounded-md outline-none"
              />
              <p className="bg-gray-200 text-xs text-red-600  m-0">
                {" "}
                {errors?.lastName && errors.lastName.message}
              </p>
            </article>
          </div>
          <div className="flex max-md:flex-col gap-x-8 gap-y-4 mb-4 flex-wrap">
            <article className="flex-1">
              <p>Phone*</p>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Phone Number"
                className="w-full px-2 py-2 rounded-md outline-none"
              />
              <p className="bg-gray-200 text-xs text-red-600  m-0">
                {" "}
                {errors?.phone && errors.phone.message}
              </p>
            </article>
            <article className="flex-1">
              <p>Email Id*</p>
              <input
                {...register("email")}
                onChange={handleChangeEmail}
                type="email"
                placeholder="Email ID"
                className="w-full px-2 py-2 rounded-md outline-none"
              />

              <p className="bg-gray-200 text-xs text-red-600  m-0">
                {" "}
                {errors?.email && errors.email.message}
              </p>
            </article>
          </div>
          <div className="flex max-md:flex-col gap-x-8 gap-y-4 mb-4 flex-wrap">
            <article className="flex-1">
              <p>Role*</p>
              <input
                {...register("role")}
                type="text"
                placeholder="Role"
                className="w-full px-2 py-2 rounded-md outline-none"
              />
              <p className="bg-gray-200 text-xs text-red-600  m-0">
                {" "}
                {errors?.role && errors.role.message}
              </p>
            </article>
            <article className="flex-1">
              <p>Location*</p>
              <input
                {...register("location")}
                type="text"
                placeholder="Location"
                className="w-full px-2 py-2 rounded-md outline-none"
              />
              <p className="bg-gray-200 text-xs text-red-600  m-0">
                {" "}
                {errors?.location && errors.location.message}
              </p>
            </article>
          </div>
          <div className="flex relative max-md:flex-col gap-x-8 gap-y-4  flex-wrap">
            <article className="flex-1">
              <p>Department*</p>
              <input
                {...register("department")}
                type="text"
                placeholder="Department"
                className="w-full px-2 py-2 rounded-md outline-none"
              />
              <p className="bg-gray-200 text-xs text-red-600  m-0">
                {" "}
                {errors?.department && errors.department.message}
              </p>
            </article>
            <button
              type="submit"
              className="flex-1  max-md:sticky bottom-0  font-bold  rounded-md text-white bg-black mt-6 py-2"
            >
              {formLoading === true ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserForm;

UserForm.propTypes = {
  dataToBeEdited: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    "phone no.": PropTypes.string,
    type: PropTypes.string,
    location: PropTypes.string,
    function: PropTypes.string,
    email: PropTypes.string,
  }),
  type: PropTypes.string,
  prevData: PropTypes.arrayOf(PropTypes.object),
  setUpdatedData: PropTypes.func.isRequired,
  activeUserForm: PropTypes.bool.isRequired,
  setActiveUserForm: PropTypes.func.isRequired,
};
