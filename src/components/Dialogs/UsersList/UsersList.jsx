

import UsersListItem from './UsersListItem'

const UsersList = ({users}) => {
    
    const usersList = users.length ? users.map(user => <UsersListItem {...user} key={user._id}/>) : <p class='message'>No registered users found</p>
    return (
        <ul>
            {usersList}
        </ul>
    )
}

export default UsersList