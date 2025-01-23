import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/api/authApi";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const [login, { data, error, isError, isLoading }] = useLoginMutation();
  console.log("Data", data);
  console.log("error", error);
  const onSubmit = (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    login(userInfo);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Login</Button>
      {/* in antd button type submit does not work */}
    </form>
  );
};

export default Login;
