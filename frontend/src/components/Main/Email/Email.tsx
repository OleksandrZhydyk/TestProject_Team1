import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { MenuSVG } from "../../Header/Header.styled";
import sprite from "../../../images/svg-sprite/MenuSVG.svg";

export const Email: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const emailSchema = yup
    .string()
    .email("Введіть коректну електронну пошту")
    .required("Введіть електронну пошту");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const enteredEmail = formData.get("email") as string;

    emailSchema
      .validate(enteredEmail)
      .then((validEmail) => {
        console.log("Електронна пошта є валідною:", validEmail);
        setEmail(enteredEmail);
      })
      .catch((error) => {
        console.error("Помилка перевірки електронної пошти:", error.message);
      });
    setEmail("");
  };

  return (
    <Block>
      <Form onSubmit={onSubmit}>
        <InputEmail
          type="text"
          name="email"
          id="name"
          placeholder="email"
          value={email}
          onChange={handleChange}
        />
        <BtnSubmit type="submit">
          <MenuSVG>
            <use href={sprite + "#ArrowRight"}></use>
          </MenuSVG>
        </BtnSubmit>
      </Form>
    </Block>
  );
};

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;
  margin-bottom: 100px;
  margin-top: 40px;
  width: 570px;
  height: 200px;
  background: #e9e9e9;
`;

const Form = styled.form`
  display: flex;
  position: relative;
`;

const InputEmail = styled.input`
  width: 490px;
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #707070;
  background: #e9e9e9;
  outline: none;
  &::placeholder {
    font-family: "MontserratRegular";
    font-size: 20px;
    line-height: 28px;
  }
`;

const BtnSubmit = styled.button`
  position: absolute;
  right: 0px;
  bottom: 0px;
  background: transparent;
  border: 0;
  cursor: pointer;
`;
