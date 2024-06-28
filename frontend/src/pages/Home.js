import React, { useState, useEffect } from "react";

const HelloWorld = () => {
  // const [data, setData] = useState([]);
  // const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(BACKEND_SERVER + "helloworld");
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const jsonData = await response.json();
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [BACKEND_SERVER]); 

  return (
    <div>
      HelloWorld
    </div>
  );
};

export default HelloWorld;


const LoginForm = () => (
  <div className="login">
    <form>
      <label htmlFor="chk" aria-hidden="true">Login</label>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button>Login</button>
    </form>
  </div>
);

const LoginFormComponent = () => (
  <div className="main">
    <LoginForm />
  </div>
);
