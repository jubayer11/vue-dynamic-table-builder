<template>
  <div class="view-user-wrapper">
    <div class="view-user">
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
    </div>
  </div>
</template>

<script setup>
/**
 * ⚠️ This is a static mock for demo purposes only.
 *
 * In a real-world app, you would typically:
 * - Use route params (e.g. /user/:id) to fetch this user from a store or API.
 * - Use Pinia, Vuex, or an event bus to share selected user data between views.
 *
 * Example:
 * const route = useRoute();
 * const user = store.getUserById(route.params.id)
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
