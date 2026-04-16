<script lang="ts">
  import type { Project } from "../data/projects";

  let { projects }: { projects: Project[] } = $props();

  let search = $state("");
  let activeTag = $state<string | null>(null);
  let selected = $state<Project | null>(null);
  let carouselIndex = $state(0);
  let lightboxOpen = $state(false);

  const allTags = $derived(
    [...new Set(projects.flatMap((p) => p.tags))].sort()
  );

  const filtered = $derived(
    projects.filter((p) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    })
  );

  const gradients: Record<string, string> = {
    blue: "from-blue-400 to-indigo-500",
    purple: "from-purple-400 to-pink-500",
    green: "from-green-400 to-cyan-500",
  };

  function open(p: Project) {
    selected = p;
    carouselIndex = 0;
    lightboxOpen = false;
    document.body.style.overflow = "hidden";
  }

  function close() {
    if (lightboxOpen) {
      lightboxOpen = false;
      return;
    }
    selected = null;
    document.body.style.overflow = "";
  }

  function prevImage() {
    if (!selected?.images) return;
    carouselIndex = (carouselIndex - 1 + selected.images.length) % selected.images.length;
  }

  function nextImage() {
    if (!selected?.images) return;
    carouselIndex = (carouselIndex + 1) % selected.images.length;
  }

  function openLightbox() {
    if (selected?.images && selected.images.length > 0) lightboxOpen = true;
  }
</script>

<svelte:window onkeydown={(e) => {
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft" && selected?.images) prevImage();
  if (e.key === "ArrowRight" && selected?.images) nextImage();
}} />

<!-- Search + tag bar -->
<div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
  <input
    type="search"
    placeholder="Search projects..."
    bind:value={search}
    class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:max-w-xs"
  />
  <div class="flex flex-wrap gap-2">
    <button
      onclick={() => (activeTag = null)}
      class="rounded-full px-3 py-1 text-xs font-medium transition-colors
        {activeTag === null
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
    >
      All
    </button>
    {#each allTags as tag}
      <button
        onclick={() => (activeTag = activeTag === tag ? null : tag)}
        class="rounded-full px-3 py-1 text-xs font-medium transition-colors
          {activeTag === tag
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
      >
        {tag}
      </button>
    {/each}
  </div>
</div>

<!-- Project count -->
<p class="mb-6 text-sm text-gray-500">
  {filtered.length} project{filtered.length !== 1 ? "s" : ""}
  {activeTag ? `tagged "${activeTag}"` : ""}
</p>

<!-- Grid -->
{#if filtered.length === 0}
  <div class="py-16 text-center text-gray-400">No projects match your search.</div>
{:else}
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each filtered as project (project.slug)}
      <button
        onclick={() => open(project)}
        class="group flex flex-col overflow-hidden rounded-lg bg-white text-left shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="h-48 bg-gradient-to-br {gradients[project.gradient ?? 'blue']} flex items-center justify-center overflow-hidden">
          {#if project.images && project.images.length > 0}
            <img src={project.images[0]} alt={project.title} class="h-full w-full object-cover" />
          {:else}
            <svg class="h-16 w-16 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          {/if}
        </div>
        <div class="flex flex-1 flex-col p-6">
          <div class="mb-3 flex flex-wrap gap-1.5">
            {#each project.tags as tag}
              <span class="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">{tag}</span>
            {/each}
          </div>
          <h3 class="mb-2 text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors">
            {project.title}
          </h3>
          <p class="flex-1 text-sm text-gray-600 line-clamp-3">{project.summary}</p>
          <p class="mt-4 text-xs font-semibold text-indigo-600">Read more →</p>
        </div>
      </button>
    {/each}
  </div>
{/if}

<!-- ===================== OVERLAY ===================== -->
{#if selected}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
    onclick={close}
    role="presentation"
  />

  <!-- Centered modal: wide, scrollable vertically -->
  <div
    class="fixed left-1/2 top-1/2 z-50 flex w-[92vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
    style="max-height: 90vh;"
    role="dialog"
    aria-modal="true"
    aria-label={selected.title}
  >

    <!-- ── Header bar ── -->
    <div class="flex flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div class="flex flex-wrap gap-1.5">
        {#each selected.tags as tag}
          <span class="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{tag}</span>
        {/each}
      </div>
      <button
        onclick={close}
        class="ml-4 rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="5" x2="15" y2="15" /><line x1="15" y1="5" x2="5" y2="15" />
        </svg>
      </button>
    </div>

    <!-- ── Scrollable body ── -->
    <div class="overflow-y-auto">

      <!-- Landscape carousel -->
      <div class="relative w-full bg-gray-950" style="aspect-ratio: 16/9;">
        {#if selected.images && selected.images.length > 0}

          <!-- Image -->
          <img
            src={selected.images[carouselIndex]}
            alt="{selected.title} image {carouselIndex + 1}"
            class="h-full w-full object-cover"
          />

          <!-- Expand button (top-right) -->
          <button
            onclick={openLightbox}
            class="absolute right-3 top-3 rounded-lg bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Expand image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
              <polyline points="10,2 14,2 14,6" /><line x1="14" y1="2" x2="9" y2="7" />
              <polyline points="6,14 2,14 2,10" /><line x1="2" y1="14" x2="7" y2="9" />
            </svg>
          </button>

          <!-- Prev / next arrows -->
          {#if selected.images.length > 1}
            <button
              onclick={prevImage}
              class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="11,4 6,9 11,14" />
              </svg>
            </button>
            <button
              onclick={nextImage}
              class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2.5 text-white hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="7,4 12,9 7,14" />
              </svg>
            </button>

            <!-- Dot indicators -->
            <div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {#each selected.images as _, i}
                <button
                  onclick={() => (carouselIndex = i)}
                  class="h-1.5 rounded-full transition-all {i === carouselIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'}"
                  aria-label="Go to image {i + 1}"
                />
              {/each}
            </div>
          {/if}

        {:else}
          <!-- Gradient placeholder -->
          <div class="flex h-full w-full items-center justify-center bg-gradient-to-br {gradients[selected.gradient ?? 'blue']}">
            <svg class="h-20 w-20 text-white opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        {/if}
      </div>

      <!-- ── Documentation body ── -->
      <div class="px-8 py-8">

        <!-- Title + date -->
        <p class="mb-1 text-sm text-gray-400">
          {new Date(selected.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
        <h1 class="mb-3 text-3xl font-bold text-gray-900">{selected.title}</h1>
        <p class="mb-8 border-b border-gray-100 pb-8 text-base leading-relaxed text-gray-500">
          {selected.summary}
        </p>

        <!-- Content -->
        <div class="prose prose-indigo max-w-none
          prose-h2:text-lg prose-h2:font-semibold prose-h2:text-gray-800 prose-h2:mt-6 prose-h2:mb-2
          prose-p:text-gray-600 prose-p:leading-relaxed
          prose-li:text-gray-600">
          {@html selected.content}
        </div>

        <!-- Action buttons -->
        <div class="mt-10 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-8">
          {#if selected.github}
            <a
              href={selected.github}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
              </svg>
              View on GitHub
            </a>
          {:else}
            <span class="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 px-4 py-2.5 text-sm text-gray-300 cursor-default">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
              </svg>
              No GitHub yet
            </span>
          {/if}

          {#if selected.driveUrl}
            <a
              href={selected.driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              <svg width="16" height="14" viewBox="0 0 87.3 78" fill="currentColor">
                <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L28 55H0c0 1.55.4 3.1 1.2 4.5z" fill="#fff"/>
                <path d="M43.65 25L29.35 0c-1.35.8-2.5 1.9-3.3 3.3L1.2 50.5C.4 51.9 0 53.45 0 55h28z" fill="#fff"/>
                <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 55c0-1.55-.4-3.1-1.2-4.5L59.65 0c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l30 55z" fill="#fff"/>
                <path d="M43.65 25L58 0H29.35z" fill="#fff" opacity="0.7"/>
                <path d="M73.55 76.8L59.3 53H28L13.75 76.8z" fill="#fff" opacity="0.85"/>
                <path d="M43.65 53h15.65L43.65 25 28 55z" fill="#fff" opacity="0.9"/>
              </svg>
              Drive docs
            </a>
          {:else}
            <span class="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 px-4 py-2.5 text-sm text-gray-300 cursor-default">
              No Drive docs yet
            </span>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <!-- ===================== LIGHTBOX ===================== -->
  {#if lightboxOpen && selected.images}
    <div
      class="fixed inset-0 z-60 flex items-center justify-center bg-black/90"
      onclick={() => (lightboxOpen = false)}
      role="presentation"
    >
      <!-- Image — fills as much space as possible -->
      <img
        src={selected.images[carouselIndex]}
        alt="{selected.title} image {carouselIndex + 1}"
        class="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
        onclick={(e) => e.stopPropagation()}
      />

      <!-- Close -->
      <button
        onclick={() => (lightboxOpen = false)}
        class="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/25 transition-colors"
        aria-label="Close lightbox"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="5" x2="15" y2="15" /><line x1="15" y1="5" x2="5" y2="15" />
        </svg>
      </button>

      <!-- Prev / next in lightbox -->
      {#if selected.images.length > 1}
        <button
          onclick={(e) => { e.stopPropagation(); prevImage(); }}
          class="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
          aria-label="Previous image"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="14,5 8,11 14,17" />
          </svg>
        </button>
        <button
          onclick={(e) => { e.stopPropagation(); nextImage(); }}
          class="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 transition-colors"
          aria-label="Next image"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="8,5 14,11 8,17" />
          </svg>
        </button>

        <!-- Counter -->
        <p class="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm text-white">
          {carouselIndex + 1} / {selected.images.length}
        </p>
      {/if}
    </div>
  {/if}
{/if}