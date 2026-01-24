<script setup>
import { ref, reactive, computed } from 'vue'

const age = ref(0);
const student = reactive({
    name: 'Ta Hong Phuc',
    age: 22,
    id: '20225906'
})
const increase = () => {
    age.value++
}
const dzai = () => {
    student.name = "Phuc dzai vai chuong!"
}

const firstName = ref('Phúc')
const lastName = ref('Nguyễn')

// Không, value truyền vào hàm set không phải là phần return của get.
// value là giá trị mới mà bạn muốn gán cho fullName, tức là chuỗi mà bạn gán (vd: fullName.value = "Nguyễn Văn A").
// Còn hàm get trả về giá trị hiện tại của fullName (vd: "Nguyễn Phúc").
// fullName là một computed property hai chiều, get và set hoạt động riêng biệt.
const fullName = computed({
    get() {
        // Lấy giá trị hiện tại của fullName từ lastName và firstName
        return `${lastName.value} ${firstName.value}`
    },
    set(value) {
        // value là chuỗi mới mà bạn muốn gán cho fullName
        // Nó không phải là return của get, mà là giá trị bạn gán, ví dụ:
        // fullName.value = "Nguyễn Văn A" thì value là "Nguyễn Văn A"
        const parts = value.split(' ')
        lastName.value = parts[0]
        firstName.value = parts.slice(1).join(' ')
    }
})

const fullName3 = computed({
    get() {
        console.log(lastName.value + '--' + firstName.value)

        return `${lastName.value} ${firstName.value}`
    },
    set(value) {
        const parts = value.split(' ')
        lastName.value = parts[0]
        firstName.value = parts.slice(1).join(' ')
    }
})
</script>

<template>
    <h1>Age: {{ age }}</h1>
    <b><button @click="increase">+</button></b>
    <div>Thong tin sinh vien:
        <ul>
            <li>Ho va ten: {{ student.name }}</li>
            <li>Tuoi: {{ student.age }}</li>
            <li>MSSV: {{ student.id }}</li>
        </ul>
    </div>
    <b><button @click="dzai">Lam cho anh ay dep trai nao</button></b>
    <h1>{{ fullName }}</h1>
    <h1>{{ fullName3 }}</h1>
    <input v-model="fullName3" />
<p>{{ fullName }}</p>
    <br><br><br>
</template>