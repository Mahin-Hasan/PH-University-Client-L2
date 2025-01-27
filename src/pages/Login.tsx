import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { register, handleSubmit } = useForm();
  const [login] = useLoginMutation();
  // console.log("error", error);
  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      // console.log(res);
      toast.success("User Logged in Successfully✅", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error(`something went wrong!!`, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        {/* <label htmlFor="id">ID:</label> */}
        {/* <input type="text" id="id" {...register("id")} /> */}
        <PHInput label="ID:" type="text" name="id" />
        {/* <label htmlFor="password">Password:</label> */}
        <PHInput label="Password:" type="password" name="password" />
        <Button htmlType="submit">Login</Button>
        {/* in antd button type submit does not work */}
      </PHForm>
    </Row>
  );
};

export default Login;
