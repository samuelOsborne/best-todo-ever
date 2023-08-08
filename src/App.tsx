import { useEffect } from 'react';
import { useAuth } from './components/auth';
import { useNavigate } from 'react-router-dom';
import { TaskList } from './components/TaskList';

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const license = window.localStorage.getItem('licenseKey');

    if (!license) {
      navigate('/');
    }
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <>
      <TaskList />
    </>
  )
}

export default App
