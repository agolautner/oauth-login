import './App.css';
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import { useEffect } from 'react';
const axios = require('axios');

//openID flow
const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getToken = async () => {
    let code = searchParams.get('code');
    console.log(code);
    const response = await axios.post('http://localhost:4000/api/login', {
      code //sending the authorization code to the backend
    });
    console.log(response);
  }

  useEffect(() => {
    getToken();
  }, [])

  return <div>LOGIN</div>
}

const Home = () => {
  return (
    <div>
        <h2>HOME</h2>
        <button onClick={
          () => window.open(`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=145780615357-3qqh0fjm48r5t2af090fjdpqi7dl9s40.apps.googleusercontent.com&scope=openid%20email&redirect_uri=http://localhost:3000/callback`)
        }>Log in with Google</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/callback' element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;

//base url: https://accounts.google.com/o/oauth2/v2/auth