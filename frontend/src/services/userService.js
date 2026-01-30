import axiosInstance from '../api/axiosInstance.js'

export const userService = {
    getAllUsers: async () => {
        try {
            const response = await axiosInstance.get('/users')
            return response.data
        } catch (error) {
            console.error('Lỗi khi lấy danh sách users:', error)
            return []
        }
    },

    getUserById: async (id) => {
        try {
            const response = await axiosInstance.get(`/users/${id}`)
            return response.data
        } catch (error) {
            console.error('Lỗi khi lấy user:', error)
            throw error
        }
    },

    createUser: async (userData) => {
        const response = await axiosInstance.post('/users', userData)
        return response.data
    },

    updateUser: async (id, userData) => {
        const response = await axiosInstance.put(`/users/${id}`, userData)
        return response.data
    },

    deleteUser: async (id) => {
        await axiosInstance.delete(`/users/${id}`)
    }
}
