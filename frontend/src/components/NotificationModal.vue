<script>
import { ref } from 'vue'

export default {
  name: 'NotificationModal',
  emits: ['close'],
  setup(props, { emit }) {
    const isOpen = ref(true)

    const closeModal = () => {
      isOpen.value = false
      emit('close')
    }

    return {
      isOpen,
      closeModal,
    }
  },
}
</script>

<template>
  <div class="notification-modal" v-if="isOpen">
    <div class="notification-modal__backdrop" @click="closeModal"></div>

    <div class="notification-modal__content">
      <h2 class="notification-modal__title">Thông báo</h2>
      <p class="notification-modal__message">
        Hi chào các bạn
      </p>

      <div class="notification-modal__actions">
        <button type="button" class="notification-modal__button" @click="closeModal">
          Đóng
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.notification-modal__backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.notification-modal__content {
  position: relative;
  background-color: #ffffff;
  padding: 24px 28px;
  border-radius: 10px;
  min-width: 320px;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  text-align: center;
}

.notification-modal__title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
}

.notification-modal__message {
  margin: 0 0 20px;
  font-size: 14px;
  color: #4b5563;
}

.notification-modal__actions {
  display: flex;
  justify-content: center;
}

.notification-modal__button {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, transform 0.1s ease-in-out;
}

.notification-modal__button:hover {
  background-color: #2563eb;
}

.notification-modal__button:active {
  transform: scale(0.97);
}
</style>
