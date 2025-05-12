<template>
  <div class="view-user-wrapper">
    <div class="view-user">
      <div class="demo-header">
        <h2 class="demo-title">👤 User Profile View</h2>
        <p class="demo-description">
          This page showcases a single user detail layout for read-only viewing.
          In a real app, the data should be fetched from Pinia, Vuex, a composition function, or route params —
          but here it’s hardcoded for demo purposes.
        </p>
      </div>

      <h2>{{ user.name }} <span class="role">({{ user.role }})</span></h2>
      <ul>
        <li><strong>Status:</strong> {{ user.status }}</li>
        <li><strong>Last Active:</strong> {{ user.lastActive }}</li>
        <li><strong>Contact:</strong> {{ user.contact || '—' }}</li>
        <li><strong>Description:</strong> {{ user.description || 'No description available.' }}</li>
      </ul>
      <button class="btn-back" @click="$router.back()">← Back</button>

      <div class="demo-footer">
        <p>
          🧠 <strong>Note:</strong> This view is statically defined, but you can easily integrate dynamic sources
          like global state (Pinia/Vuex), route params, or custom composables.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @component ViewUser
 * @description
 * A simple read-only user view page displaying selected user details.
 * In this demo, the user data is hardcoded. In real use cases, you'd likely fetch it
 * using route parameters, global state (Pinia/Vuex), or composables.
 */

const user = {
  name: 'Alice Johnson',
  role: 'Admin',
  status: 'locked',
  lastActive: '2025-05-06 14:22',
  contact: 'email',
  description: 'Handles user permissions and system configurations.'
};
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

.demo-header {
  margin-bottom: 2rem;
  text-align: center;
}

.demo-title {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(to right, #3b82f6, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.demo-description {
  font-size: 0.95rem;
  color: #4b5563;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
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

.demo-footer {
  margin-top: 2rem;
  padding: 1rem;
  font-size: 0.85rem;
  color: #374151;
  border-left: 4px solid #6366f1;
  background-color: #f1f5f9;
  border-radius: 0.5rem;
}

/* 🌙 Dark Mode */
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

.dark-mode .demo-footer {
  background-color: #1f2937;
  border-color: #4f46e5;
  color: #cbd5e1;
}

.dark-mode .demo-description {
  color: #cbd5e1;
}

/* 📱 Minor Responsive Tweak */
@media (max-width: 480px) {
  .view-user {
    padding: 1.5rem 1.25rem;
  }

  .demo-title {
    font-size: 1.25rem;
  }

  .view-user h2 {
    font-size: 1.25rem;
  }

  .demo-description {
    font-size: 0.9rem;
  }

  .btn-back {
    width: 100%;
  }
}
</style>

