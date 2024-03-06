import axios from 'axios';

import React from 'react'
import { useState } from 'react'
import { Table } from 'react-bootstrap';

const App = () => {
  const[name, setName]=useState(" ");
  const[email, setEmail]=useState(" ");
  const[address, setAddress]=useState(" ");
  const[university, setUniversity]=useState(" ");
  const[password, setPassword]=useState(" ");

  const [responseData, setresponseData]=useState(null);

  const [ reeData, setreeData]=useState([]);


  const handleName =(e)=>{
    setName(e.target.value);
  }

  const handleEmail =(e)=>{
    setEmail(e.target.value);
  }

  const handleAddress =(e)=>{
    setAddress(e.target.value);
  }

  const handleUniversity =(e)=>{
    setUniversity(e.target.value);
  }

  const handlePassword =(e)=>{
    setPassword(e.target.value);
  }

  const handleSubmit =async(e)=>{
    e.preventDefault();
    
    try{
      const response = await axios.post("http://localhost:3002/create", { 
        name,
        email,
        address,
        university,
        password,

      })

      setresponseData(response.data);

    }catch(error){
      console.log(error.message);
    }
  }

  const getData = async()=>{
    const readData = await axios.get("http://localhost:3002/read");
    setreeData(readData.data);

  }

  const handleButton = ()=>{
    getData();
  }

  const handleRemove=async(row)=>{
    try{
      await axios.delete(`http://localhost:3002/delete/${row._id}`)
      getData();


    }catch(error){
      console.log(error.message);

    }

    

  }

  const handleUpdate =async(row)=>{
    setName(row.name);
    setEmail(row.email);
    setAddress(row.address);
    setUniversity(row.university);
    setPassword(row.password);

    try{
      await axios.put(`http://localhost:3002/update/${row._id}`,{
        name,
        email,
        address,
        university,
        password,
      })
      getData();


    }catch(error){
      console.log(error.message);
    }
  }
  return (
    <div>
      <h1> Registration From</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" >Name: </label>
          <input type="text" name="name" value={name} onChange={handleName}/>
        </div> <br/>

        <div>
          <label htmlFor="email" >Email: </label>
          <input type="text" name="email" value={email} onChange={handleEmail}/>
        </div> <br/>

        <div>
          <label htmlFor="address" >Address: </label>
          <input type="text" name="address" value={address} onChange={handleAddress}/>
        </div> <br/>

        <div>
          <label htmlFor="university" >University: </label>
          <input type="text" name="university" value={university} onChange={handleUniversity}/>
        </div> <br/>

        <div>
          <label htmlFor="password" >Password: </label>
          <input type="text" name="password" value={password} onChange={handlePassword}/>
        </div> <br/>

        <button type="submit"> Register </button>
      </form>

      <Table style={{border: "3px, solid, green"}}>
        <thead>
          <tr>
            <th>Name</th> <br/>
            <th>Email</th> <br/>
            <th>Address</th> <br/>
            <th>University</th> <br/>
            <th>Password</th> <br/>
          </tr>
        </thead>
        <tbody>
          { responseData &&(
            <tr>
              <td> { responseData.name} </td>
              <td> { responseData.email} </td>
              <td> { responseData.address} </td>
              <td> { responseData.university} </td>
              <td> { responseData.password} </td>
            </tr>
          )}
        </tbody>

      </Table>

      <h1> Storage all Data </h1>
      <button onClick={handleButton }>Read Data </button>

      <Table style={{border: "3px, solid, red"}}>
        <thead>
          <tr>
            <th>Name</th> <br/>
            <th>Email</th> <br/>
            <th>Address</th> <br/>
            <th>University</th> <br/>
            <th>Password</th> <br/>
          </tr>
        </thead>
        <tbody>
          {reeData.map(re =>{
            return <tr>
              <td> { re.name} </td>
              <td> { re.email} </td>
              <td> { re.address} </td>
              <td> { re.university} </td>
              <td> { re.password} </td>
              <td> <button onClick={()=>{handleUpdate(re)}} >Update </button> </td>
              <td> <button onClick={()=>{handleRemove(re)}}> Remove </button> </td>
            </tr>

          })
      }
        </tbody>

      </Table>
      
      
    </div>
  )
}

export default App
