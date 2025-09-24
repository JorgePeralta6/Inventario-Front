import { useState } from "react";
import toast from "react-hot-toast";
import { getUsers as getUsersRequest } from "../../services";

export const useUsers = () => {
    const [users, setUsers] = useState(null)

    const getUsers = async(isLogged = false) => {

        const usersData = await getUsersRequest();

        if(usersData.error){
            return toast.error(
                channelsData.e?.response?.data || 'Ocurrio un error al leer los usuarios'
            )
        }

        if(!isLogged){
            return setUsers({
                users: usersData.data.users
            })
        }

        setUsers({
            users: usersData.data.users
        })

    }

    return {
        getUsers,
        isFetching: !Boolean(users),
        allUsers: users?.users
    }
}