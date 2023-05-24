import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Button,
  Typography,
  TextField,
  DialogContent
} from "@mui/material";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  jostyfi-content: center;
  align-items: center;
  gap: 1rem;
`;
  
type FormProps = {
  setIsOpenLoginForm: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

type FormValues = {
  username: string,
  password: string
}

const schema = yup.object({
  username: yup.string().required().min(2, "min 2 symbol").max(60, "max 60 symbol"),
  password: yup
    .string()
    .min(8, "min 8 symbol")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "must contain one symbol(!,@,#), number, letter"
    )
    .required("validation:errors.email.required"),
});

const LoginForm = ({ setIsOpenLoginForm, setIsOpenModal }: FormProps) => {
  
  const {register, handleSubmit, formState: { errors, isValid }} = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data)
    setIsOpenLoginForm(false);
    setIsOpenModal(false);
  };

  const handleClose = () => {
    console.log("close")
    setIsOpenLoginForm(false);
    setIsOpenModal(false);
  }

  return (
    <DialogContent sx={{ padding: "10%"}}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Login
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
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isValid}
        >
          Login
        </Button>

        <Button
          onClick={handleClose}
          fullWidth
        >
          Close
        </Button>

      </StyledForm>

    </DialogContent>
  );
}

export default LoginForm;