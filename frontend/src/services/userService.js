import axiosInstance from '../api/axiosInstance.js'

export const userService = {
    getAllUsers: async () => {
        try {
            const response = await axiosInstance.get('/users');
            // Backend trả về mảng users trực tiếp
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy danh sách users:', error);
            // Trả về mảng rỗng thay vì throw để UI không bị crash
            return [];
        }
    }
}