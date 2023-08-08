import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from './auth';

export const Login = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [updatePasswordMode, setUpdatePasswordMode] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const errorMessageLabel = useRef<HTMLLabelElement>(null);

  const { signUp } = useAuth();
  const { logIn } = useAuth();
  const { user } = useAuth();
  const { updatePassword } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [navigate, user]);

  const checkInputs = (): boolean => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Check if email or password are empty and apply css error class to input fields
    if (!email || !password || email === '' || password === '') {
      if (!email || email === '') {
        emailRef.current?.classList.add('input-error');
        setErrorMessage('Please enter a valid email.')
      }
      if (!password || password === '') {
        passwordRef.current?.classList.add('input-error');
        setErrorMessage('Please enter valid password.')
      }
      return true;
    }
    setErrorMessage('')
    return false;
  }

  const handleLogin = async (event: any) => {
    event.preventDefault();

    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    if (checkInputs()) {
      return;
    }

    const { error } = await logIn({ email, password })

    if (error) {
      console.log(error);
      setErrorMessage(error.message);
      return;
    }
  };

  const handleCreate = async (event: any) => {
    event.preventDefault();

    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    if (checkInputs()) {
      return;
    }

    const { error } = await signUp({ email, password })

    if (error) {
      console.log(error);
      setErrorMessage(error.message);
      return;
    }
  }

  const enterUpdatePasswordMode = () => {
    setUpdatePasswordMode(true)
  }

  const handlePasswordUpdate = async () => {
    const password = passwordRef.current?.value;

    if (!password || password === '') {
      passwordRef.current?.classList.add('input-error');
      setErrorMessage('Please enter a valid password.');

      return;
    } else {
      setErrorMessage('');
    }

    const { error } = await updatePassword(password);

    if (error) {
      console.log(error);
      setErrorMessage(error.message);
      return;
    }
  }

  return (
    <>
      <div className="relative flex flex-col justify-center overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-center text-dark text-gray-600">best-todo-ever</h1>
          <label className="label">
            <span className="text-base label-text text-gray-600">Welcome</span>
          </label>
          <form className="space-y-4">
            {!updatePasswordMode && (
              <div>
                <label className="label">
                  <span className="text-base label-text">Email</span>
                </label>
                <input ref={emailRef} type="text" placeholder="Email Address" className="w-full input input-bordered input-primary" />
              </div>
            )
            }
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input ref={passwordRef} type="password" placeholder="Enter Password"
                className="w-full input input-bordered input-primary" />
            </div>
            {
              errorMessage !== '' && (
                <>
                  <span ref={errorMessageLabel} className="text-xs label-text text-error display-none">{errorMessage}</span>
                  <br />
                </>
              )
            }
            <a className="text-xs text-gray-600 hover:underline hover:text-blue-600" onClick={enterUpdatePasswordMode}>Forget Password?</a>
            {!updatePasswordMode && (
              <div className="flex flex-row gap-8 justify-center">
                <div>
                  <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
                <div>
                  <button className="btn btn-primary" onClick={handleCreate}>Create</button>
                </div>
              </div>
            )
            }
            {updatePasswordMode && (
              <div className="flex flex-row gap-8 justify-center">
                <div>
                  <button className="btn btn-primary" onClick={handlePasswordUpdate}>Update</button>
                </div>
              </div>
            )
            }
          </form>
        </div>
      </div>
    </>
  )
}