<template>
  <section class="doc-section">
    <!-- Pagination Modes -->
    <div id="modes" class="doc-block">
      <h2>🔁 Pagination Modes</h2>
      <p>
        Vue Dynamic Table Builder supports two built-in pagination UX patterns:
      </p>
      <ul>
        <li><strong>Numbered Pagination</strong> — classic page-by-page navigation</li>
        <li><strong>Load More</strong> — appends rows incrementally</li>
      </ul>

      <p>
        Toggle modes programmatically using the table config:
      </p>
      <pre><code class="language-js">
// Numbered pagination
customTable.updatePaginationNumber()

// Load More (infinite-style)
customTable.updatePaginationLoadMore()
      </code></pre>

      <p>
        Each mode uses the same internal pagination object structure — so switching requires no data format changes.
      </p>
    </div>

    <!-- Pagination Events -->
    <div id="events" class="doc-block">
      <h2>📡 Pagination Events</h2>
      <p>
        The <code>onPaginate</code> prop allows you to handle pagination changes — for both <code>pagination</code> and <code>loadMore</code> modes.
      </p>

      <pre><code class="language-html">
&lt;DynamicTable
  :myTable="customTable"
  :onPaginate="handlePagination"
/&gt;
      </code></pre>

      <p>
        This is useful for fetching data from a backend or appending new rows manually:
      </p>

      <pre><code class="language-js">
const handlePagination = (page) => {
  // Load data manually
  fetchItemsFromBackend(page)
}
      </code></pre>

      <p>⚠️ <strong>Important:</strong> This callback is optional — you can also manage all pagination internally with a <code>watch</code>:</p>

      <pre><code class="language-js">
watch([items, pagination], () => {
  customTable.updateData(data)
  customTable.updatePaginationData(pagination)
})
      </code></pre>
    </div>

    <!-- Pagination Styling -->
    <div id="styling" class="doc-block">
      <h2>🎨 Styling Pagination</h2>
      <p>
        Pagination buttons, icons, and containers are fully customizable using <code>TableStyleConfig</code>:
      </p>

      <pre><code class="language-js">
style.update("pagination.wrapper", "my-pagination__wrapper")
style.update("pagination.container", "my-pagination__container")
style.update("pagination.itemLink", "my-pagination__item")
style.update("pagination.itemLinkClicked", "my-pagination__active")
style.update("pagination.icon", "my-pagination__icon")
style.update("pagination.path", ["path1", "path2"])
      </code></pre>

      <p>
        For <strong>Load More</strong> styling, you can target the following keys:
      </p>

      <pre><code class="language-js">
style.update("pagination.loadMore.button", "loadmore__btn")
style.update("pagination.loadMore.content", "loadmore__text")
style.update("pagination.loadMore.wrapper", "loadmore__wrap")
      </code></pre>

      <p>
        You can also use <code>updatePagination()</code> or <code>updatePaginationLoadMore()</code> to update values directly:
      </p>

      <pre><code class="language-js">
// Deep path-based updates
style.updatePagination("itemLink", "custom-pagination-link")
style.updatePaginationLoadMore("button", "loadmore-btn")
      </code></pre>

      <p>
        🕵️‍♂️ Pagination is automatically hidden unless you call:
      </p>
      <pre><code class="language-js">
customTable.updatePaginationData(pagination)
      </code></pre>
    </div>
  </section>
</template>

<script setup>
/**
 * @component Pagination
 * Documentation for pagination modes, events, and styling in Vue Dynamic Table Builder.
 */
</script>

<style scoped>
.doc-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.doc-block {
  scroll-margin-top: 6rem;
}

.doc-block h2 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.doc-block p {
  font-size: 1rem;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 1rem;
}

.doc-block ul {
  padding-left: 1.5rem;
  list-style-type: disc;
  margin-top: 0.5rem;
}

.doc-block li {
  margin: 0.3rem 0;
  color: #374151;
  font-size: 0.97rem;
}

pre {
  background: #f3f4f6;
  padding: 1rem;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

/* 🌙 Dark mode */
.dark-mode .doc-block h2 {
  color: #f3f4f6;
}
.dark-mode .doc-block p,
.dark-mode .doc-block li {
  color: #d1d5db;
}
.dark-mode pre {
  background: #1e2937;
}
</style>
