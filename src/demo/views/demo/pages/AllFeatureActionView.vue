<template>
  <div class="view-user-wrapper">
    <div class="view-user">
      <!-- Header -->
      <div class="demo-header">
        <h2 class="demo-title">👤 User Profile View</h2>
        <p class="demo-description">
          This component displays full user information — perfect for read-only profile pages or detailed views in dashboards.
          All data is currently mocked. In real applications, you can retrieve the user dynamically using route params, global state (Pinia/Vuex), or composables.
        </p>
      </div>

      <!-- Main Content -->
      <h2>{{ user.name }} <span class="role">({{ user.role }})</span></h2>
      <ul>
        <li><strong>Status:</strong> {{ user.status }}</li>
        <li><strong>Email:</strong> {{ user.email }}</li>
        <li><strong>Phone:</strong> {{ user.phone }}</li>
        <li><strong>Performance:</strong> {{ user.performance }}%</li>
        <li><strong>Online:</strong> {{ user.online ? '✅ Online' : '❌ Offline' }}</li>
        <li><strong>Notes:</strong> {{ user.notes || 'No notes available.' }}</li>
        <li><strong>Tags:</strong> {{ user.tags?.join(', ') || 'None' }}</li>
      </ul>

      <button class="btn-back" @click="$router.back()">← Back</button>

      <!-- Footer -->
      <div class="demo-footer">
        <p>
          🧠 <strong>Note:</strong> Data in this example is static, but in real-world apps, fetch it via route parameters or shared state.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * @component ViewUserExtended
 * @description
 * This is a detailed user view showcasing full profile information.
 * Intended for demo purposes with hardcoded data.
 * 🔁 In production, connect this to:
 * - Vue Router params (e.g. /users/:id)
 * - Pinia/Vuex store (getUserById)
 * - Or a composable for modular fetch logic
 */
const user = {
  id: 1,
  name: 'Alice Johnson',
  avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  email: 'alice.j@example.com',
  phone: '+8801711111111',
  role: 'Frontend Developer',
  status: 'active',
  performance: 93,
  notes: 'Works on design system and component library.',
  online: true,
  tags: ['Vue', 'Tailwind', 'Figma']
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
  background: linear-gradient(to right, #0ea5e9, #6366f1);
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

/* 📱 Minor Responsive Adjustment */
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

