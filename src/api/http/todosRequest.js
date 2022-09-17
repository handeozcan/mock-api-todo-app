import { api } from "../axiosInstance";

const GetTodos = async () => {
  const result = await api.get();
  return result;
};

const GetSingleTodo = async (id) => {
  const result = await api.get(`${id}`);
  return result;
};

const AddTodo = async (data) => {
  const result = await api.post("", data);
  return result;
};

const UpdateTodo = async (id, data) => {
  const result = await api.put(`${id}`, data);
  return result;
};

const DeleteTodo = async (id) => {
  const result = await api.delete(`${id}`);
  return result;
};

export { GetTodos, GetSingleTodo, AddTodo, UpdateTodo, DeleteTodo };
