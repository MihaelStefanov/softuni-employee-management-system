import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Search from './components/Search'
import UserList from './components/UserList'
import Pagination from './components/Pagination'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

      <Header />

      <main className="main">
        <section className="card users-container">

          <Search/>

          <UserList/>

          <Pagination/>

        </section>

      </main>
      <Footer />

    </div>
  )
}

export default App
