import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Search from './components/Search'
import UserList from './components/UserList'
import Pagination from './components/Pagination'
import CreateUserModal from './components/CreateUserModal'

function App() {
  const [createUserState, SetCreateUserState] = useState(false);

  const CreateUserHandler = () => {
    SetCreateUserState(true);
  }

  const CloseHandler = () => {
    SetCreateUserState(false);
  }

  const AddUserSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const userData = Object.fromEntries(formData);

    console.log('userData: ', userData);


    fetch('http://localhost:3030/jsonstore/users', {
      method: 'POST',
      headers: {
        'content-type': 'aplication/json',
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);

      })

      SetCreateUserState(false);
  }

  return (
    <div>

      <Header />

      <main className="main">
        <section className="card users-container">

          <Search />

          <UserList />
          <button className="btn-add btn" onClick={CreateUserHandler}>Add new user</button>

          <Pagination />

        </section>

        {createUserState && <CreateUserModal onClose={CloseHandler} onSubmit={AddUserSubmitHandler} />}

      </main>
      <Footer />

    </div>
  )
}

export default App
