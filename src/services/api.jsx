import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://inventario-back-oq4u.onrender.com/almacenadora/v1',
    timeout: 5000
})


apiClient.interceptors.request.use(

    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails) {
            const token = JSON.parse(useUserDetails).token
            config.headers['x-token'] = token;
            config.headers['x-token'] = token;
        }

        return config;
    },
    response => response,
    error => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event('token-expired'));
        }
        return Promise.reject(error);
    }
)

export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const register = async (data) => {
    try {
        const res = await apiClient.post('/auth/register', data);
        return {
            success: true,
            data: res.data
        };
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};



export const getProducts = async () => {
    try {
        return await apiClient.get('/products')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }

}

export const getCategories = async () => {
    try {
        return await apiClient.get("/categories");
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};

export const saveProducts = async (data) => {
    try {
        return await apiClient.post('/products', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const updateProducts = async (id, data) => {
    try {
        return await apiClient.put(`/products/${id}`, data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const deleteProducts = async (id, body) => {
    try {
        return await apiClient.delete(`/products/${id}`, { data: body });
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};



export const updateUser = async (userId, data) => {
    try {
        const response = await apiClient.put(`/users/${userId}`, data);
        return response;
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}



export const getUsers = async () => {
    try {
        return await apiClient.get('/users')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/users/${id}`)
        return response.data
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const deleteUser = async (userId) => {
    try {
        return await apiClient.delete(`/users/${userId}`)

    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getCategory = async (limite = 10, desde = 0) => {
    try {
        return await apiClient.get(`/categories?limite=${limite}&desde=${desde}`)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const saveCategory = async (data) => {
    try {
        return await apiClient.post('/categories', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const updateCategory = async (id, data) => {
    try {
        return await apiClient.put(`/categories/${id}`, data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const deleteCategory = async (id) => {
    try {
        return await apiClient.delete(`/categories/${id}`)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}



export const getMovimientos = async () => {
    try {
        return await apiClient.get('/movements/')
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const getMovimientosByDate = async (startDate, endDate) => {
    try {
        const url = `/movements/inventoryMovements?startDate=${startDate}&endDate=${endDate}`;
        return await apiClient.get(url);
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};

export const getMovimientoEntrada = async (data) => {
    try {
        return await apiClient.post('/movements/registerEntry', data);
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
};

export const getMovimientoSalida = async (data) => {
    try {
        return await apiClient.post('/movements/registerOutput', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}

export const updateMovement = async (id, data) => {
    try {
        return await apiClient.put(`/movements/${id}`, data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e,
        };
    }
}