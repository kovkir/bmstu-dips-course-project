import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

import "../ModalWindows/ModalWindows.css";
import AuthService from '../../services/AuthService';
import { TextHeader } from "../Texts/TextHeader";
import { InputRow } from "../Inputs/InputRow";
import { useAuthorizationForm } from "../../hooks/useForms/useAuthorizationForm";
import { AuthorizeFormButton } from '../Buttons/AuthorizeFormButton';


interface AuthorizationPageProps {
	changeIsAuth: (value: boolean) => void
}

export function Authorization({ changeIsAuth }: AuthorizationPageProps) {
	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
	};

	const keyDownHandler = async (event: React.KeyboardEvent) => {
		if (event.key === "Escape") {
			await auth();
		}
	}

	const auth = async () => {
    if (fieldsCheck()) {
      const response = await AuthService.login(login, password);
      if (response) {
        setErrorMsg(response);
      } else {
				changeIsAuth(true);
        navigate("/");
      }
    }
  };

	const navigate = useNavigate();

	const { 
		login,
		password,
		errorMsg,
		invalidLogin,
		invalidPassword,
		setLogin,
		setPassword,
		setErrorMsg,
		setInvalidLogin,
		setInvalidPassword,
		fieldsCheck,
	} = useAuthorizationForm()

	return (
		<>
			<div className="authorization-window">
				<form 
					onSubmit={ submitHandler } 
					onKeyDown={ keyDownHandler }
				>
					<TextHeader text="Авторизация"/>
					
					<div className="mb-5">
						<InputRow
							label="Логин*"
							value={ login }
							setValue={ setLogin }
							isInvalidRow={ invalidLogin }
							helperText="Обязательное поле"
							keyDownHandler={ () => setInvalidLogin(false) }
						/>
					</div>

					<InputRow
						label="Пароль*"
						value={ password }
						setValue={ setPassword }
						type="password"
						isInvalidRow={ invalidPassword }
						helperText="Обязательное поле"
						keyDownHandler={ () => setInvalidPassword(false) }
					/>

					{ errorMsg &&
						<Alert
							sx={{fontWeight: 1000}}
							severity="error"
							className="mt-5"
						>
							{ errorMsg }
						</Alert>
					}

					<div className="h-11 mt-5 flex flex-col justify-center">
						<AuthorizeFormButton 
							text="Войти"
							onClick={ auth }
						/>
					</div>
				</form>
			</div>
		</>
	)
}
