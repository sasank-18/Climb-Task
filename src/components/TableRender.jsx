import {Table } from "antd"
import UserForm from "./UserForm"
import {  useState } from "react"
import PropTypes from "prop-types"


const TableRender = ({ setUpdatedData,data}) => {
    const [activeUserForm, setActiveUserForm] = useState(false)
    const [dataToBeEdited, setDataToBeEdited] = useState();
    const cols = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Phone no.',
          dataIndex: 'phone no.',
          key: 'phone no.',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Location',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: 'Function',
          dataIndex: 'function',
          key: 'function',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <div size="middle">
              <a onClick={()=>{
                setDataToBeEdited(record);
                setActiveUserForm(!activeUserForm)}}>🖋️Edit User</a>
            </div>
          )
        },
      ]

  return (
    <div className="overflow-x-scroll my-5">
    <Table columns={cols}  dataSource={data}  />

    {activeUserForm && <UserForm type="edit" prevData = {data} setUpdatedData={setUpdatedData} dataToBeEdited = {dataToBeEdited} activeUserForm={activeUserForm} setActiveUserForm={setActiveUserForm}/>}

  </div>  )
}

export default TableRender


TableRender.propTypes = {
    setUpdatedData: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        "phone no.": PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        function: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
  