import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';

const AUTH_TOKEN_LOCAL_STORAGE_KEY = 'library-auth-token';

const App = () => {
  const [page, setPage] = useState('authors');
  const [authToken, setAuthToken] = useState(
    localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY)
  );

  const handleLogin = (authToken) => {
    localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, authToken);
    setAuthToken(authToken);
    setPage('authors');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        {!authToken && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      {page === 'login' && <LoginForm onLogin={handleLogin} />}
    </div>
  );
};

export default App;
