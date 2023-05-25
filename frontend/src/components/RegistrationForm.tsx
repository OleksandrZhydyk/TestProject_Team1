import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../store/store";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Button,
  Typography,
  TextField,
  DialogContent
} from "@mui/material";
import { authActions } from "../store/slices/authSlice";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  jostyfi-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 7%;
`;
  
type RegFormProps = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
  setIsOpenLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

type FormValues = {
  username: string,
  password: string,
  password_confirm: string
}

const schema = yup.object({
  username: yup.string().required().min(2, "min 2 symbol").max(60, "max 60 symbol"),
  password: yup
    .string()
    .min(8, "min 8 symbol")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "must contain one symbol(!,@,#), number, uppercase letter"
    )
    .required("validation:errors.email.required"),
    password_confirm: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "does not match"
    ),
});

const RegistrationForm = ({ setIsOpenModal, setIsOpenLoginForm }: RegFormProps) => {

  const dispatch = useAppDispatch();

  const {register, handleSubmit, formState: { errors, isValid }} = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsOpenModal(false);
    const respons = await dispatch(authActions.register(data)).unwrap()
    
    if (respons.message) await dispatch(authActions.login({
      username: data.username,
      password: data.password,
    }));
  };

  const handleClose = () => {
    console.log("close")
    setIsOpenModal(false);
  }

  return (
    <DialogContent sx={{ padding: "10%"}}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Registration
        </Typography>
        <TextField
          {...register("username")}
          autoFocus
          fullWidth
          type="text"
          size="small"
          placeholder="Name"
          error={errors?.username ? true : false}
          helperText={errors?.username ? errors?.username?.message : ""}
        />
        <TextField
          {...register("password")}
          fullWidth
          type="password"
          size="small"
          placeholder="Password"
          error={errors?.password ? true : false}
          helperText={errors?.password ? errors?.password?.message : ""}
        />
        <TextField
          {...register("password_confirm")}
          fullWidth
          type="password"
          size="small"
          placeholder="Confirm Password"
          error={errors?.password_confirm ? true : false}
          helperText={errors?.password_confirm ? errors?.password_confirm?.message : ""}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isValid}
        >
          Registration
        </Button>

        <Button
          onClick={handleClose}
          fullWidth
        >
          Close
        </Button>
      </StyledForm>

      <Typography variant="caption" gutterBottom>
        Already have account?
        <Button
          sx={{ textTransform: "none", letterSpacing: 0}}
          size="small"
          variant="text"
          onClick={()=>{setIsOpenLoginForm(true)}}
        >
          Log in
        </Button>
      </Typography>
    </DialogContent>
  );
}

export default RegistrationForm;