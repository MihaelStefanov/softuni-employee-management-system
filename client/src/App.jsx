import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Search from './components/Search'
import UserList from './components/UserList'
import Pagination from './components/Pagination'
import CreateUserModal from './components/CreateUserModal'

function App() {
  const [count, setCount] = useState(0)

  const [createUserState, SetCreateUserState ] = useState(false);

  const CreateUserHandler = () => {
   SetCreateUserState(true);
  }

  const closeAddUserModalHandler = () => {
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

        {createUserState && <CreateUserModal onClose={closeAddUserModalHandler} />}

      </main>
      <Footer />

    </div>
  )
}

export default App
