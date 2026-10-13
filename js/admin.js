/**
 * BOLD — Black Outreach Leadership Directive
 * Launch Readiness & Content Placeholders Assistant
 * 
 * Provides an interactive administrative interface to:
 * 1. Track launch readiness checklist items
 * 2. Visually highlight all content placeholders and unverified data
 * 3. Inspect, preview, and export form submissions (Volunteers, Partners, RSVPs)
 * 4. Generate a downloadable Launch Readiness Audit Report (Markdown)
 */

(function () {
  'use strict';

  const STORAGE_KEY_CHECKLIST = 'bold_launch_checklist_state';
  const STORAGE_KEY_HIGHLIGHT = 'bold_placeholder_highlight_mode';

  function initAdminAssistant() {
    // 1. Create floating trigger pill if not present
    if (!document.getElementById('adminTriggerPill')) {
      const pill = document.createElement('button');
      pill.id = 'adminTriggerPill';
      pill.className = 'admin-trigger-pill';
      pill.setAttribute('aria-label', 'Open Launch Readiness & Admin Assistant');
      pill.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span>Launch Readiness</span>
        <span id="adminChecklistBadge" style="background: var(--gold-500); color: #000; border-radius: 999px; padding: 1px 7px; font-size: 0.72rem; font-weight: 800;">0/12</span>
      `;
      document.body.appendChild(pill);
    }

    // 2. Create Drawer
    if (!document.getElementById('adminDrawer')) {
      const drawer = document.createElement('aside');
      drawer.id = 'adminDrawer';
      drawer.className = 'admin-drawer';
      drawer.setAttribute('aria-hidden', 'true');
      drawer.innerHTML = `
        <div class="admin-drawer-header">
          <div class="admin-drawer-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" color="var(--gold-400)">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Launch Readiness & Placeholders</span>
          </div>
          <button id="closeAdminDrawerBtn" class="modal-close-btn" aria-label="Close Assistant">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div class="admin-drawer-body">
          <!-- Highlight Mode Toggle -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
            <div>
              <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-white);">Highlight Placeholders Mode</div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">Visually outline all items pending verification</div>
            </div>
            <label style="position: relative; display: inline-block; width: 44px; height: 24px; cursor: pointer;">
              <input type="checkbox" id="togglePlaceholderHighlight" style="opacity: 0; width: 0; height: 0;">
              <span style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--bg-surface-3); border-radius: 24px; transition: 0.3s; border: 1px solid var(--border-medium);" class="switch-slider"></span>
            </label>
          </div>

          <!-- Checklist Progress -->
          <div class="checklist-progress-box">
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; font-weight: 700;">
              <span>Pre-Publication Checklist</span>
              <span id="checklistPercentage" class="text-gold">0% Complete</span>
            </div>
            <div class="progress-bar-bg">
              <div id="checklistProgressBar" class="progress-bar-fill" style="width: 0%;"></div>
            </div>
          </div>

          <!-- Checklist Items -->
          <div style="display: flex; flex-direction: column; gap: 10px;" id="adminChecklistContainer"></div>

          <!-- Submissions Inspector & Data Exporter -->
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-white); display: flex; align-items: center; justify-content: space-between;">
              <span>Live Form Submissions</span>
              <button class="btn btn-sm btn-outline-gold" id="exportDataBtn">Export All (JSON)</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.85rem;" id="submissionCounters">
              <div>
                <div style="color: var(--text-muted);">Volunteers</div>
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--gold-400);" id="cntVolunteers">0</div>
              </div>
              <div>
                <div style="color: var(--text-muted);">Partners</div>
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--gold-400);" id="cntPartners">0</div>
              </div>
              <div>
                <div style="color: var(--text-muted);">Event RSVPs</div>
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--gold-400);" id="cntRsvps">0</div>
              </div>
              <div>
                <div style="color: var(--text-muted);">Newsletter</div>
                <div style="font-size: 1.2rem; font-weight: 800; color: var(--gold-400);" id="cntNewsletter">0</div>
              </div>
            </div>
          </div>

          <!-- Export Report Button -->
          <button class="btn btn-primary" id="downloadAuditReportBtn" style="width: 100%;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Download Launch Audit Report (.md)</span>
          </button>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    setupAdminInteractions();
  }

  function setupAdminInteractions() {
    const trigger = document.getElementById('adminTriggerPill');
    const drawer = document.getElementById('adminDrawer');
    const closeBtn = document.getElementById('closeAdminDrawerBtn');
    const highlightCheckbox = document.getElementById('togglePlaceholderHighlight');

    if (!trigger || !drawer) return;

    trigger.addEventListener('click', () => {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      refreshSubmissionCounts();
    });

    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    });

    // Handle Highlight Mode
    const savedHighlight = localStorage.getItem(STORAGE_KEY_HIGHLIGHT) === 'true';
    if (savedHighlight) {
      document.body.classList.add('highlight-placeholders');
      if (highlightCheckbox) highlightCheckbox.checked = true;
    }

    if (highlightCheckbox) {
      highlightCheckbox.addEventListener('change', e => {
        if (e.target.checked) {
          document.body.classList.add('highlight-placeholders');
          localStorage.setItem(STORAGE_KEY_HIGHLIGHT, 'true');
        } else {
          document.body.classList.remove('highlight-placeholders');
          localStorage.setItem(STORAGE_KEY_HIGHLIGHT, 'false');
        }
      });
    }

    renderChecklist();
    refreshSubmissionCounts();

    // Export submissions
    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportSubmissionsJson);
    }

    // Download audit report
    const reportBtn = document.getElementById('downloadAuditReportBtn');
    if (reportBtn) {
      reportBtn.addEventListener('click', generateAuditReport);
    }
  }

  function renderChecklist() {
    const container = document.getElementById('adminChecklistContainer');
    if (!container || !window.BOLD_DATA) return;

    const items = window.BOLD_DATA.launchChecklist || [];
    let savedState = {};
    try {
      savedState = JSON.parse(localStorage.getItem(STORAGE_KEY_CHECKLIST) || '{}');
    } catch (e) {
      savedState = {};
    }

    let completedCount = 0;

    container.innerHTML = items.map(item => {
      const isDone = savedState[item.id] !== undefined ? savedState[item.id] : item.status === 'completed';
      if (isDone) completedCount++;

      return `
        <div class="checklist-item ${isDone ? 'done' : ''}">
          <input type="checkbox" class="checklist-checkbox" id="chk_${item.id}" data-id="${item.id}" ${isDone ? 'checked' : ''}>
          <div style="flex-grow: 1;">
            <div style="font-weight: 600; color: ${isDone ? 'var(--text-white)' : 'var(--text-secondary)'};">
              ${item.label}
            </div>
            <span class="badge ${isDone ? 'badge-success' : 'badge-gold'}" style="font-size: 0.68rem; margin-top: 4px;">
              ${item.category} • ${isDone ? 'Verified Ready' : 'Pending Verification'}
            </span>
          </div>
        </div>
      `;
    }).join('');

    // Update Progress
    const pct = Math.round((completedCount / items.length) * 100);
    const progressBar = document.getElementById('checklistProgressBar');
    const pctText = document.getElementById('checklistPercentage');
    const badge = document.getElementById('adminChecklistBadge');

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (pctText) pctText.textContent = `${pct}% Complete (${completedCount}/${items.length})`;
    if (badge) badge.textContent = `${completedCount}/${items.length}`;

    // Attach listeners
    container.querySelectorAll('.checklist-checkbox').forEach(cb => {
      cb.addEventListener('change', e => {
        const id = e.target.dataset.id;
        savedState[id] = e.target.checked;
        localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(savedState));
        renderChecklist();
      });
    });
  }

  function refreshSubmissionCounts() {
    const vol = JSON.parse(localStorage.getItem('bold_volunteer_submissions') || '[]').length;
    const part = JSON.parse(localStorage.getItem('bold_partner_submissions') || '[]').length;
    const rsvp = JSON.parse(localStorage.getItem('bold_event_rsvps') || '[]').length;
    const news = JSON.parse(localStorage.getItem('bold_newsletter_subscribers') || '[]').length;

    const elVol = document.getElementById('cntVolunteers');
    const elPart = document.getElementById('cntPartners');
    const elRsvp = document.getElementById('cntRsvps');
    const elNews = document.getElementById('cntNewsletter');

    if (elVol) elVol.textContent = vol;
    if (elPart) elPart.textContent = part;
    if (elRsvp) elRsvp.textContent = rsvp;
    if (elNews) elNews.textContent = news;
  }

  function exportSubmissionsJson() {
    const exportBundle = {
      exportedAt: new Date().toISOString(),
      organization: "BOLD — Black Outreach Leadership Directive",
      data: {
        volunteers: JSON.parse(localStorage.getItem('bold_volunteer_submissions') || '[]'),
        partnerships: JSON.parse(localStorage.getItem('bold_partner_submissions') || '[]'),
        eventRsvps: JSON.parse(localStorage.getItem('bold_event_rsvps') || '[]'),
        donations: JSON.parse(localStorage.getItem('bold_donations') || '[]'),
        branchInquiries: JSON.parse(localStorage.getItem('bold_branch_inquiries') || '[]'),
        newsletterSubscribers: JSON.parse(localStorage.getItem('bold_newsletter_subscribers') || '[]'),
        contactMessages: JSON.parse(localStorage.getItem('bold_contact_submissions') || '[]')
      }
    };

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bold-directive-submissions-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function generateAuditReport() {
    const items = window.BOLD_DATA.launchChecklist || [];
    let savedState = {};
    try {
      savedState = JSON.parse(localStorage.getItem(STORAGE_KEY_CHECKLIST) || '{}');
    } catch (e) {
      savedState = {};
    }

    let report = `# BOLD (Black Outreach Leadership Directive) — Launch Readiness Audit Report\n\n`;
    report += `**Generated:** ${new Date().toLocaleString()}\n`;
    report += `**Target:** Website Production Release\n\n`;
    report += `## 1. Executive Summary & Verification Status\n\n`;

    items.forEach((item, idx) => {
      const isDone = savedState[item.id] !== undefined ? savedState[item.id] : item.status === 'completed';
      const statusIcon = isDone ? '✅ [VERIFIED]' : '⚠️ [PENDING REVIEW]';
      report += `${idx + 1}. ${statusIcon} **${item.category}**: ${item.label}\n`;
    });

    report += `\n## 2. Identified Content Placeholders Awaiting Board Input\n\n`;
    report += `- **Official Logo Asset**: High-resolution vector file (SVG/PNG) to replace temporary text mark.\n`;
    report += `- **Institutional Emails**: Verify active forwarding for \`info@\`, \`outreach@\`, \`volunteer@\`, \`partnerships@boldinitiative.ca\`.\n`;
    report += `- **Leadership Team Profiles**: Executive bios, headshots, and portfolio assignments.\n`;
    report += `- **Impact Metrics**: 2025–2026 audited participant counts.\n`;
    report += `- **Banking & Financial Processing**: Stripe/PayPal payment processor keys & CRA registration status confirmation.\n`;
    report += `- **Branch Leads**: Formalize campus executive leads for Toronto, London, Windsor, Hamilton, Ottawa.\n\n`;
    report += `---\n*Document generated by BOLD Production Assistant.*\n`;

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BOLD-Launch-Readiness-Audit-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Auto initialize on load
  document.addEventListener('DOMContentLoaded', initAdminAssistant);

})();
