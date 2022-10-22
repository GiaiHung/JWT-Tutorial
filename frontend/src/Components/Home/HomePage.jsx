import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../helper/apiRequest'
import './home.css'

const HomePage = () => {
  //DUMMY DATA
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.login?.currentUser)
  const accessToken = useSelector((state) => state.auth.login?.currentUser?.accessToken)
  const userData = useSelector((state) => state.user?.allUsers)

  console.log(userData)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    if (accessToken) {
      getAllUsers(dispatch, accessToken)
    }
  }, [user, accessToken, dispatch, navigate])

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        <h2>Your role:</h2>
        {user?.admin ? 'Admin' : 'User'}
      </div>
      <div className="home-userlist">
        {userData?.map((user, index) => {
          return (
            <div className="user-container" key={index}>
              <div className="home-user">{user.username}</div>
              <div className="delete-user"> Delete </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default HomePage
