import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import TableRender from './components/TableRender'
import { Input } from 'antd'


let data = [
  {
      "id" : 1,
      "name" : "Recuiter Artissary",
      "phone no." : 6370508882,
      "type" :  "Recuiter",
      "location" : "Goregaon, Mumbai,Maharashtra, India", 
      "function" : "Business Development team",
      "email" : "sasank@gmail.com"
  },
  {
      "id" : 2,

      "name" : "Maxediited12 Singh",
      "phone no." : 6370508882,
      "type" :  "Recuiter",
      "location" : "Goregaon, Mumbai,Maharashtra, India", 
      "function" : "Consulting",
      "email" : "registory@email.com"
  },
  {
      "id" : 3,
      "name" : "Rahul Captchatest",
      "phone no." : 6370508882,
      "type" :  "Employee",
      "location" : "Bengaluru, Karnataka, India", 
      "function" : "Beta Testing",
      "email" : "rahul@email.com"

  }
]


function App() {
const [updatedData, setUpdatedData] = useState(data)
  const [inputValue, setInputValue] = useState("")
const handleChange = (e) =>{
    setInputValue(e.target.value)
    const searchedData = data.filter((data)=> data.email.includes(e.target.value))
    setUpdatedData(searchedData);
}

useEffect(()=>{
    if(inputValue) return 
    data = updatedData
}, [updatedData])

return (
    <>
    <main className="max-md:px-10 w-full min-h-screen lg:px-28">

    <Header DataToBeUpdated = {updatedData} setUpdatedData = {setUpdatedData}/>
    <Input placeholder="Search by email" onChange={handleChange} value={inputValue}  className="mb-8 mt-4" />
    <TableRender setUpdatedData = {setUpdatedData}  data = {updatedData} />
  
    </main>
    </>
  )

}

export default App
