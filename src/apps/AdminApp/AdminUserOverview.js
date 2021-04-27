import Server from "../Server"
import { ListView } from "../utilElements"


export function AdminUserOverview() {
    const handleFilter = (user, searchInput) => user.name.toLowerCase().includes(searchInput) || user.email.toLowerCase().includes(searchInput)
    return (
        <ListView 
            title="Users"
            errorMessage="We are sorry, the users couldn't be loaded!"
            listItemContent={user => 
                <div style={{ textAlign: "start" }}> 
                    <p style={{ margin: "0" }}>{user.name}</p>
                    <small>{user.email}</small>
                </div>
            }
            linkForItem={user => `${process.env.REACT_APP_PATH_SURVEY_OVERVIEW}/${user.id}`}
            onLoad={Server.admin().getUsers}
            onFilter={handleFilter}
        />
    )
}

