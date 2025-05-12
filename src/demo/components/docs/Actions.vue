<template>
  <section class="doc-wrapper">
    <div class="section-header">
      <h1 class="section-title">⚙️ Action System Overview</h1>
      <p class="section-description">
        The Vue Dynamic Table Builder supports a powerful and fully customizable action system. You can assign any combination of icon-based or button-based actions to your table rows.
      </p>
    </div>

    <div class="doc-subsection" id="icon-vs-button">
      <h2 class="subsection-title">🔳 Icon vs Button</h2>
      <p class="subsection-description">
        Icons are best for compact dashboards. Buttons provide clearer UX for text-heavy views. You can assign either by column:
      </p>
      <pre><code class="language-js">
customTable.updateActionColumnIndexProperty(4, iconType, [viewIcon, editIcon, destroyIcon]);
customTable.updateActionColumnIndexProperty(3, buttonType, [confirmButton, absentButton]);
      </code></pre>
    </div>

    <div class="doc-subsection" id="popup-vs-route">
      <h2 class="subsection-title">🧭 Popup vs Route</h2>
      <p class="subsection-description">
        Choose between modal or route navigation for each action:
      </p>
      <pre><code class="language-js">
viewIcon.updatePopUpOrRoute(popUpOrRoute.route, '/user/profile');
editIcon.updatePopUpOrRoute(popUpOrRoute.popUp, 'editDialog');
      </code></pre>
    </div>

    <div class="doc-subsection" id="activity-types">
      <h2 class="subsection-title">🎚️ ActionActivityType</h2>
      <p class="subsection-description">
        Activity types control grouping and rendering of row actions:
      </p>
      <ul>
        <li><code>IconInlineActivityType</code> – icon row actions</li>
        <li><code>ButtonActionActivityType</code> – inline button actions</li>
      </ul>
    </div>

    <div class="doc-subsection" id="custom-icons">
      <h2 class="subsection-title">🎨 Using Custom Icons</h2>
      <p class="subsection-description">
        Customize icons with utility classes:
      </p>
      <pre><code class="language-js">
editIcon.updateStyleClasses('wrapper', 'icon-wrapper icon-wrapper--edit');
editIcon.updateStyleClasses('icon', 'icon-svg');
editIcon.updateStyleClasses('path', ['icon-fill--warning']);
      </code></pre>
    </div>

    <div class="doc-subsection" id="smart-logic">
      <h2 class="subsection-title">🧠 Advanced Use (Smart Logic)</h2>
      <p class="subsection-description">
        Dynamically render icons or buttons per row using <code>SpecificAction()</code>:
      </p>
      <pre><code class="language-js">
const contactAction =
  obj.contact === 'email' ? new SpecificAction(0) :
  obj.contact === 'message' ? new SpecificAction(1) :
  obj.contact === 'phone' ? new SpecificAction(2) :
  new SpecificAction(10);

return [obj.name, contactAction, obj.status, obj.id];
      </code></pre>
      <p class="subsection-description">
        Assign the related icons to the same column:
      </p>
      <pre><code class="language-js">
customTable.updateActionColumnIndexProperty(1, iconType, [emailIcon, messageIcon, smsIcon]);
      </code></pre>
    </div>

    <div class="doc-subsection" id="dialogs">
      <h2 class="subsection-title">🪟 Dialogs & External Handling</h2>
      <p class="subsection-description">
        Dialogs are triggered based on the name you assign in <code>updatePopUpOrRoute</code>. Use a shared component like <code>ActionDialog.vue</code>:
      </p>
      <pre><code class="language-js">
editIcon.updatePopUpOrRoute(popUpOrRoute.popUp, 'editDialog');
      </code></pre>
      <p class="subsection-description">
        Manage active row and dialog visibility inside your component:
      </p>
      <pre><code class="language-js">
const activeUser = ref(null);
const showDialog = ref(false);

const handleActionClick = async (item, id) => {
  activeUser.value = findUser(id);
  if (item.popUpOrRoute.isPopUpOrRoute === 'popup') {
    showDialog.value = true;
  }
};
      </code></pre>
    </div>
  </section>
</template>

<script setup>
// No logic needed in documentation component
</script>

<style scoped>
.doc-wrapper {
  background: linear-gradient(135deg, #f8fafc, #ffffff);
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  max-width: 900px;
  margin: 3rem auto;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.section-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(to right, #3b82f6, #6366f1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.section-description {
  font-size: 1.05rem;
  color: #4b5563;
  margin-top: 1rem;
  line-height: 1.6;
}

.doc-subsection {
  margin-bottom: 2.5rem;
}
.subsection-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.6rem;
}
.subsection-description {
  font-size: 1rem;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
}
pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}
code {
  font-family: 'Fira Code', monospace;
  color: #111827;
}
ul {
  margin-left: 1.5rem;
  list-style-type: disc;
}

/* 🌙 Dark Mode */
.dark-mode .doc-wrapper {
  background: linear-gradient(135deg, #1e1e1e, #2a2a2a);
}
.dark-mode .section-description,
.dark-mode .subsection-description {
  color: #94a3b8;
}
.dark-mode .subsection-title {
  color: #f3f4f6;
}
.dark-mode pre {
  background-color: #1f2937;
}
.dark-mode code {
  color: #e5e7eb;
}
</style>
