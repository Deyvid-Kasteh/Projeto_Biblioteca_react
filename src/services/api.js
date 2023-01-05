import axios from "axios";


// export const api = axios.create({
//     baseURL: 'https://projeto-biblioteca-react-server.vercel.app/src/server.js'
// });


export const api = axios.create({
  baseURL: "http://localhost:5000",
});


export const createSession = async (email, password) => {
    return api.post('/sessions', { email, password })
};