import { useState, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { UserContext } from '../../contexts/userContext';
import { getUserDoc } from '../../utils/firebase';
import './style.scss';
import axios from 'axios'
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase'
import { redirect } from 'react-router-dom';



const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(["nbk"]);
    //const [isLoggedIn, setisLoggedIn] = useState(false);
    useEffect(() => {
        if (cookies["nbk"]) navigate("/dashboard")
        else navigate("/signin")
    }, [cookies])
    //useEffect(() => {
    //     // Checking if user is not loggedIn
    //     if (cookies.nbk) {
    //       Navigate("/dashboard");
    //     } else {
    //       Navigate("/login");
    //     }
    //   }, [Navigate, cookies.nbk]);


    const { setCurrentUser } = useContext(UserContext);


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const user = await signInWithGooglePopup();
        try {
            //setCookie('Name', name, { path: '/' });
            setCurrentUser(user);
            setCookie("nbk", user.uid, { path: "/" });
            //console.log('user', user)
            // console.log('cookie : ', cookies)
            await createUserDocumentFromAuth(user);
            //console.log('i am navigating')
            resetFormFields();
            // <Navigate to='/dashboard'/>
            if (user) {
                user.getIdToken().then((tkn) => {
                    // set access token in session storage
                    //  console.log(tkn)
                    sessionStorage.setItem("accessToken", tkn);
                    //setAuthorizedUser(true);
                })
            }
            await getUserDoc(user)
            //console.log(user);
        }
        catch {
            console.log('error')
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(email, password)
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            console.log(user);

            const res = await getUserDoc(user)
            console.log("res ", res)
            console.log(res);
            setCurrentUser(user);
            setCookie("nbk", user.uid, { path: "/" });
            //setCookie("user", user, {expires: 1})
            // console.log(response);
            console.log(res);
            sessionStorage.setItem("email", user.email);
            sessionStorage.setItem("userInfo", res);

            //console.log(cookies)

            resetFormFields();
            if (user) {
                user.getIdToken().then((tkn) => {
                    // set access token in session storage
                    console.log(tkn)
                    sessionStorage.setItem("accessToken", tkn);
                    //setAuthorizedUser(true);
                })
            }

            //<redirect to='/dashboard'/>

            // <Navigate to="/dashboard" />
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className='box-form'>
            <div className="left">
                <div className="overlay">
                    <h1>Manage Your Employees.</h1>
                    <p>Best Way to Manage your Employees</p>
                    <span className='spanning'>
                        <p>Login with Google</p>
                        <button type='button' className="googleSignIn" onClick={signInWithGoogle}>Google Sign in</button>

                    </span>
                </div>
            </div>
            <div className='right'>
                <h2>Already have an account?</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={handleSubmit}>
                    <div className='inputs'>
                        <input type='email' label='Email' required onChange={handleChange} name='email' value={email} placeholder='email' />
                        <input type='password' label='Password' required onChange={handleChange} name='password' value={password} placeholder='password' />
                    </div>
                    <div className="remember-me--forget-password">
                        <p>forget password?</p>
                    </div>
                    <button type='submit' className='buttonLogin'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default SignInForm;