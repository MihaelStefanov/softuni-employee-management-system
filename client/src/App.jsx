import { useEffect, useState } from 'react'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Search from './components/Search'
import UserList from './components/UserList'
import Pagination from './components/Pagination'
import CreateUserModal from './components/CreateUserModal'
import DeleteUserModal from './components/DeleteUserModal'
import DetailsUserModal from './components/DetailsUserModal'

function App() {
  const [UsersList, SetUsersList] = useState([]);

  const [createUserState, SetCreateUserState] = useState(false);
  const [deleteUserState, SetDeleteUserState] = useState(false);
  const [datailsState, SetDatailsState] = useState(false);

  const [curUserData, SetcurUserData] = useState({});

  // const [deteteUserCurId, SetDeteteUserCurId] = useState('');

  const [forceRefresh, setForceRefresh] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/users')
      .then(response => response.json())
      .then(data => {
        SetUsersList(Object.values(data))
      })

  }, [forceRefresh]);


  const CreateUserHandler = () => {
    SetCreateUserState(true);
  }

  const CloseHandler = () => {
    SetCreateUserState(false);
    SetDeleteUserState(false)
    SetDatailsState(false)
    SetcurUserData({});
    setForceRefresh(state => state = !state);
  }

  const AddUserSubmitHandler = (event) => {
    event.preventDefault();
    SetcurUserData({});
    setForceRefresh(state => state = !state);

    const formData = new FormData(event.target);
    
    const userData = Object.fromEntries(formData);
    console.log(`userData in add User: `, userData['city']);

    const sortedData = {
        "_id": userData['_id'],
        "firstName": userData['firstName'],
        "lastName": userData['lastName'],
        "email": userData['email'],
        "phoneNumber": userData['phoneNumber'],
        "createdAt": new Date(),
        "updatedAt": userData['updatedAt'],
        "imageUrl": userData['imageUrl'],
        "address": {
            "country": userData['country'],
            "city": userData['city'],
            "street": userData['street'],
            "streetNumber": userData['streetNumber']
        }
    }

    fetch('http://localhost:3030/jsonstore/users', {
      method: 'POST',
      headers: {
        'content-type': 'aplication/json',
      },
      body: JSON.stringify(sortedData)

    })
      .then(response => response.json())
      .then(result => {
        console.log(result);

      })

    SetCreateUserState(false);
  }

  const callBackUserId = (method, userId) => {
    if (method == "edit") {
      SetCreateUserState(true);
    }
    else if (method == "info") {
      SetDatailsState(true);
    }
    else if (method == "delete") {
      SetDeleteUserState(true);
    }

    fetch(`http://localhost:3030/jsonstore/users/${userId}`)
      .then(response => response.json())
      .then(data => SetcurUserData(data))

    console.log('callBack id !!: ', userId );

  }

  useEffect(() => {
    console.log('curUserData!! in the app!!! : ', curUserData);
    console.log('UsersList!! in the app!!! : ', UsersList);
  }, [curUserData]);

  const deleteHandler = () => {
    fetch(`http://localhost:3030/jsonstore/users/${curUserData['_id']}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'aplication/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);

      }).catch(err => alert(err))

    console.log(`On delete work !>>!?: `, curUserData['_id']);

    SetDeleteUserState(false);
    setForceRefresh(state => state = !state);
  }

  //todo  get curUserData from custom hook
  // const detailsHandler = (curUserData) => {

  //   // SetDatailsState(true);
  // }


  return (
    <div>

      <Header />

      <main className="main">
        <section className="card users-container">

          <Search />

          <UserList
            UsersList={UsersList}
            callBack={callBackUserId}
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
        />}

        {
          datailsState && <DetailsUserModal
            onClose={CloseHandler}
            userData={curUserData}
          />
        }

        {/* {curUserData && Object.keys(curUserData).length > 0 && 
        <CreateUserModal onClose={CloseHandler} onSubmit={AddUserSubmitHandler} userData={curUserData} />} */}

      </main>
      <Footer />

    </div>
  )
}

export default App
