import { useEffect, useState } from 'react'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Search from './components/Search'
import UserList from './components/UserList'
import Pagination from './components/Pagination'
import CreateUserModal from './components/CreateUserModal'
import DeleteUserModal from './components/DeleteUserModal'

function App({ }) {
  const [UsersList, SetUsersList] = useState([]);
  const [createUserState, SetCreateUserState] = useState(false);
  const [deleteUserState, SetDeleteUserState] = useState(false);
  const [deteteUserCurId, SetDeteteUserCurId] = useState('');

  const [forceRefresh, setForceRefresh] = useState(false);

  const [curUserData, SetcurUserData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/users')
      .then(response => response.json())
      .then(data => {
        SetUsersList(Object.values(data));
      })
      .catch(err => console.log(err))
  }, [forceRefresh]);

  const CreateUserHandler = () => {
    SetCreateUserState(true);
  }

  const CloseHandler = () => {
    SetCreateUserState(false);
    SetDeleteUserState(false)
    SetcurUserData({});
    setForceRefresh(state => state = !state);
  }

  const AddUserSubmitHandler = (event) => {
    event.preventDefault();
    SetcurUserData({});
    setForceRefresh(state => state = !state);

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

  const callBackUserId = (userId) => {
    SetCreateUserState(true);
    fetch(`http://localhost:3030/jsonstore/users/${userId}`)
      .then(response => response.json())
      .then(data => SetcurUserData(data))

    console.log('callBack!!: ', userId);
  }

  useEffect(() => {
    console.log('curUserData!!: ', curUserData);
  }, [curUserData]);
  

  const deleteModalOpen = (CurUserId) => {
    SetDeteteUserCurId(CurUserId);
    SetDeleteUserState(true);
  }

  const deleteHandler = (CurUserId) => {
    fetch(`http://localhost:3030/jsonstore/users/${CurUserId}`,  {
      method: 'DELETE',
      headers: {
        'content-type': 'aplication/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);

      }).catch(err => alert(err))

    console.log(`On delete work !>>!?: `, CurUserId);

    SetDeleteUserState(false);
    setForceRefresh(state => state = !state);
  }

  return (
    <div>

      <Header />

      <main className="main">
        <section className="card users-container">

          <Search />

          <UserList 
          UsersList={UsersList}
          callBack={callBackUserId}
          deleteModalOpen={deleteModalOpen}
          />
          <button className="btn-add btn" onClick={CreateUserHandler}>Add new user</button>

          <Pagination />

        </section>

        {createUserState && <CreateUserModal
          onClose={CloseHandler}
          onSubmit={AddUserSubmitHandler}
          userData={curUserData}
          />}

          {deleteUserState && <DeleteUserModal
          onClose={CloseHandler}
          onDelete={deleteHandler}
          userData={curUserData}
          userId={deteteUserCurId}
          />}
          
          {/* {curUserData && Object.keys(curUserData).length > 0 && 
        <CreateUserModal onClose={CloseHandler} onSubmit={AddUserSubmitHandler} userData={curUserData} />} */}

      </main>
      <Footer />

    </div>
  )
}

export default App
