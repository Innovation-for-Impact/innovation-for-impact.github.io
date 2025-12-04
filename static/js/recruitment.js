document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('recruitment-content');
  if (!container) return;

  fetch('/static/data/recruitment.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      renderRecruitment(container, data);
    })
    .catch((error) => {
      console.error('Error loading recruitment data:', error);
      container.innerHTML =
        '<p class="recruitment-announcement">Recruitment information will be posted soon.</p>';
    });
});

function renderRecruitment(container, data) {
  if (!data || !data.isRecruiting) {
    const message =
      data && data.announcementWhenClosed
        ? data.announcementWhenClosed
        : 'Recruitment is currently closed. Check back for our next cycle!';

    container.innerHTML = `
      <section class="recruitment-closed">
        <h2 class="recruitment-cycle">Recruitment Closed</h2>
        <p class="recruitment-announcement">${escapeHtml(message)}</p>
      </section>
    `;
    return;
  }

  const applySection =
    data.apply && data.apply.url
      ? `
    <div class="apply-wrapper">
      <a href="${data.apply.url}" class="apply-button" target="_blank" rel="noopener noreferrer">
        ${escapeHtml(data.apply.text || 'Apply')}
      </a>
    </div>`
      : '';

  const events = Array.isArray(data.timeline) ? data.timeline : [];
  const timelineItems = events
    .map(
      (event) => `
    <li class="timeline-item">
      <div class="timeline-card">
        <p class="timeline-date">${escapeHtml(event.date || '')}</p>
        <p class="timeline-title">${escapeHtml(event.title || '')}</p>
        ${
          event.location
            ? `<p class="timeline-label">Location</p>
               <p class="timeline-text">${escapeHtml(event.location)}</p>`
            : ''
        }
        ${
          event.time
            ? `<p class="timeline-label">Time</p>
               <p class="timeline-text">${escapeHtml(event.time)}</p>`
            : ''
        }
      </div>
      <div class="timeline-marker">
        <span class="timeline-dot"></span>
      </div>
    </li>`
    )
    .join('');

  container.innerHTML = `
    <section class="recruitment-open">
      <h2 class="recruitment-cycle">${escapeHtml(
        data.cycleTitle || 'Recruitment Timeline'
      )}</h2>
      ${applySection}
      <div class="timeline-wrapper">
        <ul class="timeline">
          ${timelineItems}
        </ul>
      </div>
    </section>
  `;
}

// basic escaping so JSON text can't break the HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
