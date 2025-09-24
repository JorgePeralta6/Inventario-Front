import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateUser, getUsers } from "../../services";

export const useUserSettings = (userId) => {
    const [userSettings, setUserSettings] = useState()

    const fetchUserSettings = async () => {
        const response = await getUsers();
    
        if (response.error) {
            return toast.error(
                response.e?.response?.data || 'Ocurrió un error al obtener la data del usuario'
            );
        }
    
        const user = response.data.find(u => u._id === userId);
    
        if (!user) {
            return toast.error('Usuario no encontrado');
        }
    
        setUserSettings({
            id: user._id,
            email: user.email,
            name: user.name,
            password: user.password,
            phone: user.phone,
            surname: user.surname,
            username: user.username
        });
    };
    

    const saveSettings = async (data) => {
        const response = await updateUser(data.id, data)

        if (response.error) {
            return toast.error(
                response.e?.response?.data || 'Ocurrió un error al actualizar la información del usuario',
                {
                    style: { background: 'red', color: 'white' }
                }
            )
        }

        toast.success('Información actualizada correctamente', {
            style: { background: 'green', color: 'white' }
        })

        await fetchUserSettings()
    }

    useEffect(() => {
        if (userId) {
            fetchUserSettings()
        }
    }, [userId])

    return {
        isFetching: !userSettings,
        userSettings,
        saveSettings
    }
}
