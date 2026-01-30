<script>
import { ref, watch } from 'vue'
import { userService } from '../services/userService'

export default {
    props: {
        show: { type: Boolean, default: false },
        editUser: { type: Object, default: null }
    },
    emits: ['close', 'saved'],
    setup(props, { emit }) {
        const form = ref({
            first_name: '',
            last_name: '',
            dob: '',
            employee_code: '',
            email: '',
            gender: 'male',
            job_title: '',
            phone: ''
        })
        const loading = ref(false)
        const errorMessage = ref('')

        const isEditMode = () => !!props.editUser?.id

        const resetForm = () => {
            form.value = {
                first_name: '',
                last_name: '',
                dob: '',
                employee_code: '',
                email: '',
                gender: 'male',
                job_title: '',
                phone: ''
            }
            errorMessage.value = ''
        }

        const loadUserIntoForm = (user) => {
            if (!user) return
            form.value = {
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                dob: user.dob ? user.dob.slice(0, 10) : '',
                employee_code: user.employee_code || '',
                email: user.email || '',
                gender: user.gender || 'male',
                job_title: user.job_title || '',
                phone: user.phone || ''
            }
        }

        watch(() => props.show, async (isShow) => {
            if (isShow) {
                resetForm()
                if (props.editUser?.id) {
                    try {
                        const user = await userService.getUserById(props.editUser.id)
                        loadUserIntoForm(user)
                    } catch (e) {
                        errorMessage.value = 'Không tải được thông tin nhân viên.'
                    }
                }
            }
        })

        const closeForm = () => emit('close')
        const stopProp = (e) => e.stopPropagation()

        const submit = async () => {
            errorMessage.value = ''
            loading.value = true
            try {
                if (isEditMode()) {
                    await userService.updateUser(props.editUser.id, form.value)
                } else {
                    await userService.createUser(form.value)
                }
                emit('saved')
                closeForm()
            } catch (err) {
                errorMessage.value = err.response?.data?.error || 'Có lỗi xảy ra. Vui lòng thử lại.'
            } finally {
                loading.value = false
            }
        }

        return {
            form,
            loading,
            errorMessage,
            isEditMode,
            closeForm,
            stopProp,
            submit
        }
    }
}
</script>

<template>
    <Teleport to="body">
        <div v-if="show" class="modal-overlay" @click="closeForm">
            <div class="modal-box" @click="stopProp">
                <div class="modal-header">
                    <h2>{{ isEditMode() ? 'Sửa nhân viên' : 'Thêm nhân viên mới' }}</h2>
                    <button type="button" class="btn-close" @click="closeForm" aria-label="Đóng">&times;</button>
                </div>
                <form @submit.prevent="submit" class="form-body">
                    <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
                    <div class="form-row">
                        <label for="first-name">Tên <span class="required">*</span></label>
                        <input id="first-name" v-model="form.first_name" type="text" required maxlength="50" placeholder="VD: An" />
                    </div>
                    <div class="form-row">
                        <label for="last-name">Họ <span class="required">*</span></label>
                        <input id="last-name" v-model="form.last_name" type="text" required maxlength="50" placeholder="VD: Nguyễn" />
                    </div>
                    <div class="form-row">
                        <label for="dob">Ngày sinh</label>
                        <input id="dob" v-model="form.dob" type="date" />
                    </div>
                    <div class="form-row">
                        <label for="employee-code">Mã nhân viên <span class="required">*</span></label>
                        <input id="employee-code" v-model="form.employee_code" type="text" required maxlength="20" placeholder="VD: EMP001" />
                    </div>
                    <div class="form-row">
                        <label for="email">Email <span class="required">*</span></label>
                        <input id="email" v-model="form.email" type="email" required maxlength="100" placeholder="VD: an@example.com" />
                    </div>
                    <div class="form-row">
                        <label for="gender">Giới tính <span class="required">*</span></label>
                        <select id="gender" v-model="form.gender" required>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <label for="job-title">Chức vụ</label>
                        <input id="job-title" v-model="form.job_title" type="text" maxlength="100" placeholder="VD: Backend Developer" />
                    </div>
                    <div class="form-row">
                        <label for="phone">Số điện thoại</label>
                        <input id="phone" v-model="form.phone" type="tel" maxlength="20" placeholder="VD: 0901234567" />
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn-cancel" @click="closeForm">Hủy</button>
                        <button type="submit" class="btn-submit" :disabled="loading">
                            {{ loading ? 'Đang xử lý...' : (isEditMode() ? 'Cập nhật' : 'Thêm nhân viên') }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    box-sizing: border-box;
}
.modal-box {
    background: #fff;
    border-radius: 8px;
    max-width: 480px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #eee;
}
.modal-header h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
}
.btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    color: #666;
    padding: 0 4px;
}
.btn-close:hover { color: #333; }
.form-body { padding: 20px; }
.error-msg { color: #c00; font-size: 0.9rem; margin: 0 0 12px 0; }
.form-row { margin-bottom: 14px; }
.form-row label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    font-size: 0.9rem;
}
.required { color: #c00; }
.form-row input,
.form-row select {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
}
.form-row input:focus,
.form-row select:focus {
    outline: none;
    border-color: #4CAF50;
}
.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid #eee;
}
.btn-cancel {
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    font-size: 0.95rem;
}
.btn-cancel:hover { background: #f5f5f5; }
.btn-submit {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    background: #4CAF50;
    color: #fff;
    cursor: pointer;
    font-size: 0.95rem;
}
.btn-submit:hover:not(:disabled) { background: #45a049; }
.btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
</style>
