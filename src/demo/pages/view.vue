<template>
  <div class="view-user-wrapper">
    <div class="view-user">
      <h2>{{ user.name }} <span class="role">({{ user.role }})</span></h2>
      <ul>
        <li><strong>Status:</strong> {{ user.status }}</li>
        <li><strong>Last Active:</strong> {{ user.lastActive }}</li>
        <li><strong>Contact:</strong> {{ user.contact || '—' }}</li>
        <li><strong>Description:</strong> {{ user.description || 'No description available.' }}</li>
      </ul>
      <button class="btn-back" @click="$router.back()">← Back</button>
    </div>
  </div>
</template>

<script setup>
// In a real app, fetch this from Vue Router or Pinia/store
// For now, simulate a static view
const user = {
  name: 'Alice Johnson',
  role: 'Admin',
  status: 'locked',
  lastActive: '2025-05-06 14:22',
  contact: 'email',
  description: 'Handles user permissions and system configurations.'
}
</script>

<style scoped>
.view-user-wrapper {
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.view-user {
  max-width: 600px;
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  padding: 2rem 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  font-size: 1rem;
  color: #1f2937;
}
.view-user h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 1rem;
}
.role {
  font-size: 1rem;
  font-weight: 400;
  color: #6b7280;
}
ul {
  list-style: none;
  padding: 0;
  line-height: 2;
}
.btn-back {
  margin-top: 2rem;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 0.5em 1.2em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.btn-back:hover {
  background-color: #2563eb;
}

/* Dark Mode */
.dark-mode .view-user-wrapper {
  background: linear-gradient(135deg, #1f2937, #111827);
}
.dark-mode .view-user {
  background-color: #1e293b;
  color: #f1f5f9;
}
.dark-mode .btn-back {
  background-color: #10b981;
}
.dark-mode .btn-back:hover {
  background-color: #059669;
}
</style>
