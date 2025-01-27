import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const [login, { error }] = useLoginMutation();
  // console.log("error", error);
  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    // const toastId = toast.loading("Logging in");
    // try {
    //   const userInfo = {
    //     id: data.id,
    //     password: data.password,
    //   };
    //   const res = await login(userInfo).unwrap();
    //   const user = verifyToken(res.data.accessToken) as TUser;
    //   dispatch(setUser({ user, token: res.data.accessToken }));
    //   // console.log(res);
    //   toast.success("User Logged in Successfully✅", {
    //     id: toastId,
    //     duration: 2000,
    //   });
    //   navigate(`/${user.role}/dashboard`);
    // } catch (err) {
    //   toast.error(`something went wrong!!`, {
    //     id: toastId,
    //     duration: 2000,
    //   });
    // }
  };

  return (
    <PHForm onSubmit={onSubmit}>
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
    </PHForm>
  );
};

export default Login;
