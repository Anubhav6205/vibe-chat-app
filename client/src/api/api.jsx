import axios from "axios";
import { API_URL as url, DEMO_MODE } from "../config";
import { demoApi } from "../demo/demoBackend";

export const addUser = async (data) => {
  if (DEMO_MODE) return demoApi.addUser(data);
  try {
    await axios.post(`${url}/addUser`, data);
  } catch (error) {
    console.log(`Error while adding user:${error}`);
  }
};

export const getUser = async () => {
  if (DEMO_MODE) return demoApi.getUser();
  try {
    let users = await axios.get(`${url}/getUser`);
    return users.data;
  } catch (error) {
    console.log(`Error while fetching user:${error}`);
  }
};

export const setConversation = async (data) => {
  if (DEMO_MODE) return demoApi.setConversation(data);
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (error) {
    console.log(`Error in setting conversation :${error}`);
  }
};

export const getConversation = async (data) => {
  if (DEMO_MODE) return demoApi.getConversation(data);
  try {
    const response = await axios.post(`${url}/conversation/get`, data);
    return response.data;
  } catch (error) {
    console.log(`Error in getting conversation :${error}`);
  }
};

export const newMessage = async (data) => {
  if (DEMO_MODE) return demoApi.newMessage(data);
  try {
    const response = await axios.post(`${url}/message/add`, data);
    return response.data;
  } catch (error) {
    console.log(`Error in sending message :${error}`);
  }
};

export const getMessages = async (id) => {
  if (DEMO_MODE) return demoApi.getMessages(id);
  try {
    //id is the params
    let response = await axios.get(`${url}/messages/get/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Error in getting message:${error}`);
  }
};

export const uploadFile = async (data) => {
  if (DEMO_MODE) return demoApi.uploadFile(data);
  try {
    return await axios.post(`${url}/file/upload`, data);
  } catch (error) {
    console.log(`Error in uploading file:${error}`);
  }
};

export const addAboutUser = async (data) => {
  if (DEMO_MODE) return demoApi.addAboutUser(data);
  try {
    await axios.post(`${url}/aboutUser/add`, data);
    console.log(`About set successfully in api.jsx`);
  } catch (error) {
    console.log(`Error in setting about:${error}`);
  }
};

export const getAboutUser = async (sub) => {
  if (DEMO_MODE) return demoApi.getAboutUser(sub);
  try {
    const response = await axios.get(`${url}/aboutUser/get`, {
      params: { sub: sub },
    });
    return response.data;
  } catch (error) {
    console.log(`Error in getting about: ${error}`);
  }
};
