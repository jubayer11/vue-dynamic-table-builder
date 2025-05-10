<template>
  <div class="dialog-overlay">
    <div class="dialog-box approve">
      <h3 class="dialog-title">✅ Approve Request</h3>
      <p class="dialog-message">Are you sure you want to approve this request?</p>
      <div class="dialog-actions">
        <button class="btn btn-cancel" @click="$emit('close')">Cancel</button>
        <button class="btn btn-confirm">Approve</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.dialog-box {
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  animation: fadeInScale 0.3s ease;
}

.dialog-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #047857;
  margin-bottom: 1rem;
}

.dialog-message {
  color: #374151;
  margin-bottom: 1.5rem;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1.2rem;
  font-size: 0.875rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-cancel {
  background-color: #f3f4f6;
  color: #374151;
}

.btn-cancel:hover {
  background-color: #e5e7eb;
}

.btn-confirm {
  background-color: #d1fae5;
  color: #047857;
}

.btn-confirm:hover {
  background-color: #a7f3d0;
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
