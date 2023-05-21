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
  margin-bottom: 7%;
`;
  
type RegFormProps = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpenLoginForm: React.Dispatch<React.SetStateAction<boolean>>
}

type FormValues = {
  username: string,
  password: string,
  password_confirm: string
}

const RegistrationForm = ({ setIsOpenModal, setIsOpenLoginForm }: RegFormProps) => {

  const {register, handleSubmit} = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data)
    setIsOpenModal(false);
  };

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
        />
        <TextField
          {...register("password")}
          fullWidth
          type="password"
          size="small"
          placeholder="Password"
        />
        <TextField
          {...register("password_confirm")}
          fullWidth
          type="password"
          size="small"
          placeholder="Confirm Password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Registration
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