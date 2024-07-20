import React ,{useEffect} from 'react'
import axios from 'axios'
function HomePage() {

  const getUserData = async () => {
    try {
      const response = await axios.post('/api/v1/user/getUserData',{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <h1>HomePage</h1>
  )
}

export default HomePage;
