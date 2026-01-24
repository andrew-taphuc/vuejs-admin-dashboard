<script>
import { ref, onMounted } from 'vue'
import { userService } from '../services/userService'

export default {
    setup() {
        const users = ref([])

        const fetchUsers = async () => {
            try {
                users.value = await userService.getAllUsers()
            } catch (error) {
                // handle error if necessary
                console.error(error)
            }
        }

        onMounted(() => {
            fetchUsers()
        })

        return {
            users
        }
    },

    methods: {
        fullname(first, last) {
            return `${last} ${first}`;
        },

        formatDOB(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            if (isNaN(date)) return dateStr;
            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },

        formatDateTime(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            if (isNaN(date)) return dateStr;
            // Sử dụng toLocaleString cho định dạng thông minh ngày/tháng/năm và giờ:phút kiểu Việt Nam
            return date.toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }).replace(',', '');
        }
    }
}
</script>

<template>
    <div>
        <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Employee Code</th>
                <th>Full Name</th>
                <!-- <th>First Name</th> -->
                <th>DOB</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Job Title</th>
                <th>Created At</th>
                <th>Updated At</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ fullname(user.first_name, user.last_name) }}</td>
                <!-- <td>{{ user.first_name }}</td> -->
                <td>{{ formatDOB(user.dob) }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.employee_code }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.gender }}</td>
                <td>{{ user.job_title }}</td>
                <td>{{ formatDateTime(user.created_at) }}</td>
                <td>{{ formatDateTime(user.updated_at) }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<style>
    table {
      border-collapse: collapse;
      width: 100%;
    }
  
    thead {
      background-color: #f3f4f6;
    }
  
    th, td {
      padding: 8px;
      border: 1px solid #ccc;
      text-align: left;
    }
  </style>