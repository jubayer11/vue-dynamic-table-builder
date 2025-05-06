<template>
  <div class="table-demo__wrapper">
    <!-- 🔷 Demo Header -->
    <header class="table-demo__header">
      <div>
        <h1 class="table-demo__titleMain">Vue 3 Customizable Table Demo</h1>
        <p class="table-demo__subtitle">by Jubayer Ahmed</p>
      </div>
      <!-- GitHub Badge Placeholder -->
      <a class="table-demo__githubBadge" href="#" target="_blank" title="View on GitHub">
        <img src="https://img.shields.io/badge/GitHub-Repo-blue?logo=github" alt="GitHub Repo">
      </a>
    </header>

    <!-- Next sections will be inserted below -->
  </div>
</template>

<style scoped>
.table-demo__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.5em;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5em;
}
.table-demo__titleMain {
  margin: 0;
  font-size: 1.75em;
  font-weight: 700;
  color: #333;
}
.table-demo__subtitle {
  font-size: 1em;
  color: #666;
  margin-top: 0.25em;
}
.table-demo__githubBadge img {
  height: 28px;
}
</style>
