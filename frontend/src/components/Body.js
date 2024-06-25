import React, { useEffect, useState } from 'react';
import './Body.css';
import Sidebar from './Sidebar';
import JournalCard from './JournalCard';

export default function Body({ data }) {
  const emailID = data.email;
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    content: [
      {
        title: "",
        description: ""
      }
    ]
  });
  async function fetchData() {
    try {
      await fetch(`http://localhost:12345/user/${data.email}`).then((response => response.json())).then((data) => setUserData(data))
    } catch (error) {
      console.error('Error fetching entries:', error.message);
    }
  }

  async function deleteHandler(id){
    await fetch(`http://localhost:12345/delete/${id}`,{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
  }

  useEffect(() => {
    fetchData();
  });



  return (
    <section className="body">
      <div className="elementsRow row m-0">
        <div className='col sidebarMain'>
          <Sidebar data={data}/>
        </div>
        <div className='col me-4'>
          <h3 className='text-center text-light m-5'>Welcome {userData.firstName}</h3>
          <div className="d-flex flex-wrap gap-3 my-2 m-lg-4 m-2 m-sm-2 m-md-3">
            {userData.content && userData.content.map((item) => {
              return (
                  <JournalCard emailID={emailID} id={item._id} title={item.title} description={item.description} onDelete={deleteHandler} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
