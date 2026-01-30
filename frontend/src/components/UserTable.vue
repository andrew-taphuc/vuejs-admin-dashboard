<script>
import { ref, onMounted } from 'vue'
import { userService } from '../services/userService'
import AddUserForm from './AddUserForm.vue'
import NotificationModal from './NotificationModal.vue'

export default {
    components: { AddUserForm, NotificationModal },
    setup() {
        const users = ref([])
        const showAddForm = ref(false)
        const editUser = ref(null)
        const isModalOpen = ref(false)

        const fetchUsers = async () => {
            try {
                users.value = await userService.getAllUsers()
            } catch (error) {
                console.error(error)
            }
        }

        const openAddForm = () => {
            editUser.value = null
            showAddForm.value = true
        }
        const openEditForm = (user) => {
            editUser.value = user
            showAddForm.value = true
        }
        const closeAddForm = () => {
            showAddForm.value = false
            editUser.value = null
        }
        const onUserSaved = () => {
            closeAddForm()
            fetchUsers()
        }

        const deleteUser = async (user) => {
            if (!confirm(`Bạn có chắc muốn xóa nhân viên "${user.last_name} ${user.first_name}"?`)) return
            try {
                await userService.deleteUser(user.id)
                await fetchUsers()
            } catch (error) {
                console.error(error)
                alert('Không thể xóa nhân viên.')
            }
        }

        onMounted(() => {
            fetchUsers()
        })

        return {
            users,
            showAddForm,
            editUser,
            isModalOpen,
            fetchUsers,
            openAddForm,
            openEditForm,
            closeAddForm,
            onUserSaved,
            deleteUser
        }
    },

    methods: {
        fullname(first, last) {
            return `${last} ${first}`
        },
        formatDOB(dateStr) {
            if (!dateStr) return ''
            const date = new Date(dateStr)
            if (isNaN(date)) return dateStr
            const day = ('0' + date.getDate()).slice(-2)
            const month = ('0' + (date.getMonth() + 1)).slice(-2)
            const year = date.getFullYear()
            return `${day}/${month}/${year}`
        },
        formatDateTime(dateStr) {
            if (!dateStr) return ''
            const date = new Date(dateStr)
            if (isNaN(date)) return dateStr
            return date.toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).replace(',', '')
        }
    }
}
</script>

<template>
    <b><h1>Thông tin nhân viên</h1></b>
    <div class="toolbar">
        <button type="button" class="add-user-button" @click="openAddForm">Thêm nhân viên</button>
        <button type="button" class="add-user-button secondary" @click="isModalOpen = true">Hiện notification đơn giản</button>
    </div>

    <AddUserForm
        :show="showAddForm"
        :edit-user="editUser"
        @close="closeAddForm"
        @saved="onUserSaved"
    />
    <NotificationModal v-if="isModalOpen" @close="isModalOpen = false" />

    <div class="table-container">
        <table class="user-table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Employee Code</th>
                    <th>Full Name</th>
                    <th>DOB</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Job Title</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.id }}</td>
                    <td>{{ user.employee_code }}</td>
                    <td>{{ fullname(user.first_name, user.last_name) }}</td>
                    <td>{{ formatDOB(user.dob) }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.gender }}</td>
                    <td>{{ user.job_title }}</td>
                    <td>{{ formatDateTime(user.created_at) }}</td>
                    <td>{{ formatDateTime(user.updated_at) }}</td>
                    <td class="actions">
                        <button type="button" class="btn-edit" @click="openEditForm(user)">Sửa</button>
                        <button type="button" class="btn-delete" @click="deleteUser(user)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
}
.add-user-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}
.add-user-button.secondary {
    background-color: #2196F3;
}
.add-user-button:hover {
    opacity: 0.9;
}
.user-table {
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px 20px;
    width: 100%;
    box-sizing: border-box;
}
.user-table h1 { text-align: center; margin-bottom: 0; }
table { border-collapse: collapse; width: 100%; }
thead { background-color: #f3f4f6; }
th, td { padding: 8px; border: 1px solid #ccc; text-align: left; }
.table-container {
    margin-top: 20px;
    overflow-x: auto;
    max-height: 500px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    background-color: #f3f4f6;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
.actions { white-space: nowrap; }
.btn-edit, .btn-delete {
    padding: 4px 10px;
    margin-right: 4px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
}
.btn-edit { background: #2196F3; color: #fff; }
.btn-edit:hover { background: #1976D2; }
.btn-delete { background: #f44336; color: #fff; }
.btn-delete:hover { background: #d32f2f; }
</style>
