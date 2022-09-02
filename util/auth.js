import axios from 'axios'

export const createUser = async (input,data) => {
      const response = await axios.post(`${process.env.REACT_APP_FIREBASE_URL}/accounts:${data}?key=${process.env.REACT_APP_FIREBASE_KEY}`, input)
     return response
   
}
export const login = async (input,data) => {
      const response = await axios.post(`${process.env.REACT_APP_FIREBASE_URL}/accounts:${data}?key=${process.env.REACT_APP_FIREBASE_KEY}`, input)
      return response
    
 }
