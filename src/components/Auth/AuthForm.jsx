import { Link } from 'react-router-dom';
import { useAuth } from '../../state/UserContext.jsx';
import { InputControl, FormButton } from '../Forms/FormControls.jsx';
import { useForm } from '../Forms/useForm.js';

import styles from './AuthForm.css';

export default function AuthForm({ mode = 'signin' }) {
  const { signUp, signIn, error } = useAuth();
  const [credentials, handleChange] = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await type.action(credentials);
  };

  const signin = {
    prompt: 'Sign into your account',
    button: 'Sign In',
    switch: {
      prompt: 'Need to create an account?',
      link: 'signup',
    },
    action: signIn,
  };

  const signup = {
    prompt: 'Create an account',
    button: 'Sign Up',
    switch: {
      prompt: 'Already have an account?',
      link: '../',
    },
    action: signUp,
  };

  const modes = { signin, signup };
  const type = modes[mode];

  return (
    <form className={styles.AuthForm} onSubmit={handleSubmit}>
      <h2>{type.prompt}</h2>

      <InputControl
        label="Email"
        name="email"
        type="email"
        required
        value={credentials.email}
        onChange={handleChange}
      />

      <InputControl
        label="Password"
        name="password"
        type="password"
        required
        value={credentials.password}
        onChange={handleChange}
      />

      <FormButton>{type.button}</FormButton>

      <p className="error">{error}</p>

      <nav>
        <Link to={type.switch.link}>{type.switch.prompt}</Link>
      </nav>
    </form>
  );
}
