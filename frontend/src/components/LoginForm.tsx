import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";

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

const LoginForm = ({ setIsOpenLoginForm, setIsOpenModal }: FormProps) => {
  
  const {register, handleSubmit} = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data)
    setIsOpenModal(false);
    setIsOpenLoginForm(false);
  };

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
        />
        <TextField
          {...register("password")}
          fullWidth
          type="password"
          size="small"
          placeholder="Password"
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Login
        </Button>
      </StyledForm>
    </DialogContent>
  );
}

export default LoginForm;