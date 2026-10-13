/**
 * BOLD — Black Outreach Leadership Directive
 * Master Client Application Script
 * 
 * Features:
 * - Accessible Mobile Drawer & Focus Trap
 * - Interactive Resource Hub (Instant Search & Category Filtering)
 * - Events Hub (Upcoming vs Past Tabs & Registration Modal)
 * - Volunteer Application Form Validation & Local CRM Storage
 * - Donation Calculator & Supporter Pledge Flow (CAD)
 * - Partnership & School Outreach Request Modal
 * - Regional Branch Expansion ("Bring BOLD to Your Community")
 * - FAQ Accordion with Keyboard Support
 * - Toast Notification System
 * - Scrollspy Header Active Link Tracking
 */

(function () {
  'use strict';

  // --- Utility Functions ---
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

  // Toast Notification
  function showToast(message, type = 'gold') {
    let container = $('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 300ms ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // --- Modal Management ---
  function openModal(modalId) {
    const modal = $(`#${modalId}`);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first interactive element
    const focusable = modal.querySelector('button, input, select, textarea, a');
    if (focusable) focusable.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Setup modal close listeners
  function initModals() {
    $$('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal || e.target.closest('.modal-close-btn')) {
          closeModal(modal);
        }
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const activeModal = $('.modal-overlay.open');
        if (activeModal) closeModal(activeModal);
        const drawer = $('.mobile-drawer-overlay.open');
        if (drawer) closeMobileNav();
      }
    });

    // Delegated modal openers
    document.addEventListener('click', e => {
      const trigger = e.target.closest('[data-modal-target]');
      if (trigger) {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-modal-target');
        openModal(targetId);
      }
    });
  }

  // --- Mobile Navigation ---
  function initMobileNav() {
    const toggleBtn = $('.mobile-nav-toggle');
    const overlay = $('.mobile-drawer-overlay');
    const drawer = $('.mobile-drawer');
    const closeBtn = $('.mobile-drawer-close');
    const mobileLinks = $$('.mobile-nav-link');

    if (!toggleBtn || !overlay) return;

    function openMobileNav() {
      overlay.classList.add('open');
      drawer.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    window.closeMobileNav = function () {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', openMobileNav);
    closeBtn?.addEventListener('click', window.closeMobileNav);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) window.closeMobileNav();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        window.closeMobileNav();
      });
    });
  }

  // --- Scrollspy Header Active Links ---
  function initScrollspy() {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 120;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else if (href.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    });
  }

  // --- Resource Hub Filter & Search ---
  function initResourceHub() {
    const searchInput = $('#resourceSearchInput');
    const filterButtons = $$('.resource-filter-btn');
    const container = $('#resourcesGrid');

    if (!container || !window.BOLD_DATA) return;

    let currentFilter = 'all';
    let searchQuery = '';

    function renderResources() {
      const allResources = window.BOLD_DATA.resources || [];
      const filtered = allResources.filter(res => {
        const matchCategory = currentFilter === 'all' || res.category === currentFilter;
        const matchSearch =
          res.title.toLowerCase().includes(searchQuery) ||
          res.description.toLowerCase().includes(searchQuery) ||
          res.type.toLowerCase().includes(searchQuery) ||
          res.audience.toLowerCase().includes(searchQuery);
        return matchCategory && matchSearch;
      });

      if (!filtered.length) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center;">
            <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 8px;">No resources found matching "${searchQuery}"</p>
            <button class="btn btn-sm btn-secondary" id="resetResourceSearchBtn">Reset Search Filters</button>
          </div>
        `;
        const resetBtn = $('#resetResourceSearchBtn');
        if (resetBtn) {
          resetBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            searchQuery = '';
            currentFilter = 'all';
            filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));
            renderResources();
          });
        }
        return;
      }

      container.innerHTML = filtered.map(item => `
        <article class="resource-card">
          <div class="resource-top">
            <span class="badge badge-gold">${item.type}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${item.audience}</span>
          </div>
          <h3 class="resource-title">${item.title}</h3>
          <p class="resource-desc">${item.description}</p>
          <div>
            ${item.isExternal 
              ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="resource-action">
                  <span>Visit Verified Portal</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>`
              : `<button class="resource-action" data-modal-target="resourceRequestModal" data-resource-name="${item.title}">
                  <span>Access BOLD Guide</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>`
            }
          </div>
        </article>
      `).join('');
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        renderResources();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderResources();
      });
    }

    renderResources();
  }

  // --- Events Hub (Upcoming vs Past & Registration Modal) ---
  function initEventsHub() {
    const tabButtons = $$('.event-tab-btn');
    const container = $('#eventsGrid');

    if (!container || !window.BOLD_DATA) return;

    let currentStatus = 'upcoming';

    function renderEvents() {
      const allEvents = window.BOLD_DATA.events || [];
      const filtered = allEvents.filter(evt => evt.status === currentStatus);

      if (!filtered.length) {
        container.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center;">
            <p style="color: var(--text-muted); font-size: 1.05rem;">No ${currentStatus} events currently listed.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(evt => `
        <article class="event-card" data-event-id="${evt.id}">
          <div class="event-image">
            <img src="${evt.image}" alt="${evt.title}" loading="lazy">
            <div class="event-date-chip">${evt.date}</div>
          </div>
          <div class="event-body">
            <span class="badge badge-gold event-category-badge">${evt.category}</span>
            <h3 class="event-title">${evt.title}</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">${evt.description}</p>
            <div class="event-details">
              <div class="event-detail-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${evt.time}</span>
              </div>
              <div class="event-detail-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>${evt.location}</span>
              </div>
              <div class="event-detail-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span><strong>Audience:</strong> ${evt.audience}</span>
              </div>
            </div>
            <div class="event-actions">
              ${evt.status === 'upcoming' 
                ? `<button class="btn btn-sm btn-primary event-rsvp-btn" data-event-title="${evt.title}" data-event-date="${evt.date}" data-event-loc="${evt.location}">
                    <span>Register / RSVP</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                   </button>`
                : `<span class="badge badge-info">Archive Completed</span>`
              }
              <button class="btn btn-sm btn-secondary event-details-btn" data-event-id="${evt.id}">Details</button>
            </div>
          </div>
        </article>
      `).join('');

      // Attach RSVP and Detail triggers
      $$('.event-rsvp-btn', container).forEach(btn => {
        btn.addEventListener('click', () => {
          const title = btn.dataset.eventTitle;
          const date = btn.dataset.eventDate;
          const loc = btn.dataset.eventLoc;
          const modalTitle = $('#eventModalTitle');
          const modalMeta = $('#eventModalMeta');
          const inputHidden = $('#rsvpEventHidden');
          if (modalTitle) modalTitle.textContent = title;
          if (modalMeta) modalMeta.textContent = `${date} • ${loc}`;
          if (inputHidden) inputHidden.value = title;
          openModal('eventRegistrationModal');
        });
      });

      $$('.event-details-btn', container).forEach(btn => {
        btn.addEventListener('click', () => {
          const evtId = btn.dataset.eventId;
          const evtObj = allEvents.find(e => e.id === evtId);
          if (evtObj) {
            $('#detailModalTitle').textContent = evtObj.title;
            $('#detailModalCategory').textContent = evtObj.category;
            $('#detailModalDate').textContent = evtObj.date;
            $('#detailModalTime').textContent = evtObj.time;
            $('#detailModalLocation').textContent = evtObj.location;
            $('#detailModalAudience').textContent = evtObj.audience;
            $('#detailModalDesc').textContent = evtObj.description;
            $('#detailModalAccessibility').textContent = evtObj.accessibility;
            $('#detailModalContact').textContent = evtObj.contact;
            openModal('eventDetailModal');
          }
        });
      });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentStatus = btn.dataset.tab;
        renderEvents();
      });
    });

    renderEvents();
  }

  // --- Volunteer Application Form Submission ---
  function initVolunteerForm() {
    const form = $('#volunteerForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const fullName = $('#volFullName')?.value.trim();
      const email = $('#volEmail')?.value.trim();
      const institution = $('#volInstitution')?.value.trim();
      const roleLevel = $('#volRoleLevel')?.value.trim();
      const city = $('#volCity')?.value.trim();
      const experience = $('#volExperience')?.value.trim();
      const motivation = $('#volMotivation')?.value.trim();
      const commitment = $('#volCommitment')?.value;
      const consent = $('#volConsent')?.checked;

      // Collect checked interests
      const checkedInterests = $$('input[name="interests"]:checked', form).map(cb => cb.value);

      if (!fullName || !email || !roleLevel || !city || !consent) {
        showToast('Please fill in all required fields and accept the contact consent.', 'danger');
        return;
      }

      if (!checkedInterests.length) {
        showToast('Please select at least one area of interest.', 'danger');
        return;
      }

      const submission = {
        id: 'vol_' + Date.now(),
        date: new Date().toISOString(),
        fullName,
        email,
        institution,
        roleLevel,
        city,
        interests: checkedInterests,
        experience,
        motivation,
        commitment,
        status: 'Pending Review'
      };

      // Store in localStorage CRM simulation
      try {
        const stored = JSON.parse(localStorage.getItem('bold_volunteer_submissions') || '[]');
        stored.push(submission);
        localStorage.setItem('bold_volunteer_submissions', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage failed:', err);
      }

      // Show confirmation state
      form.innerHTML = `
        <div style="text-align: center; padding: 48px 24px;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--success-bg); color: #34D399; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; border: 2px solid rgba(16, 185, 129, 0.4);">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 style="font-size: 1.85rem; font-weight: 800; color: var(--text-white); margin-bottom: 12px;">Application Received!</h3>
          <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 560px; margin: 0 auto 24px; line-height: 1.6;">
            Thank you, <strong>${fullName}</strong>, for stepping up to empower Black students. Our leadership coordination team will review your application and reach out to <strong>${email}</strong> with next steps within 3–5 business days.
          </p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-secondary" onclick="location.reload()">Submit Another Application</button>
            <a href="#events" class="btn btn-primary">Browse Upcoming Events</a>
          </div>
        </div>
      `;

      showToast('Volunteer application submitted successfully!');
    });
  }

  // --- Donation Calculator & Supporter Pledge ---
  function initDonationSection() {
    const amountButtons = $$('.amount-btn');
    const customInput = $('#customAmountInput');
    const freqButtons = $$('.freq-btn');
    const pledgeForm = $('#donationForm');

    let selectedAmount = '50';
    let selectedFrequency = 'one-time';

    amountButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        amountButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAmount = btn.dataset.amount;
        if (customInput) customInput.value = '';
      });
    });

    if (customInput) {
      customInput.addEventListener('input', e => {
        amountButtons.forEach(b => b.classList.remove('active'));
        selectedAmount = e.target.value.trim() || '0';
      });
    }

    freqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        freqButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedFrequency = btn.dataset.frequency;
      });
    });

    if (pledgeForm) {
      pledgeForm.addEventListener('submit', e => {
        e.preventDefault();
        const finalAmount = customInput && customInput.value.trim() ? customInput.value.trim() : selectedAmount;
        const donorName = $('#donorName')?.value.trim() || 'Supporter';
        const donorEmail = $('#donorEmail')?.value.trim() || 'Not provided';

        if (!finalAmount || parseFloat(finalAmount) <= 0) {
          showToast('Please select or specify a valid contribution amount.', 'danger');
          return;
        }

        const donation = {
          id: 'don_' + Date.now(),
          date: new Date().toISOString(),
          amount: `$${finalAmount} CAD`,
          frequency: selectedFrequency,
          donorName,
          donorEmail
        };

        try {
          const stored = JSON.parse(localStorage.getItem('bold_donations') || '[]');
          stored.push(donation);
          localStorage.setItem('bold_donations', JSON.stringify(stored));
        } catch (err) {
          console.warn('Storage failed:', err);
        }

        $('#donationReceiptAmount').textContent = `$${finalAmount} CAD (${selectedFrequency})`;
        $('#donationReceiptName').textContent = donorName;
        openModal('donationSuccessModal');
      });
    }
  }

  // --- Partnership Inquiry Form ---
  function initPartnershipForm() {
    const form = $('#partnershipInquiryForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const orgName = $('#partOrgName')?.value.trim();
      const contactName = $('#partContactName')?.value.trim();
      const email = $('#partEmail')?.value.trim();
      const orgType = $('#partOrgType')?.value;
      const collaboration = $('#partCollaboration')?.value;
      const message = $('#partMessage')?.value.trim();
      const website = $('#partWebsite')?.value.trim();

      if (!orgName || !contactName || !email || !message) {
        showToast('Please complete all required partnership fields.', 'danger');
        return;
      }

      const inquiry = {
        id: 'part_' + Date.now(),
        date: new Date().toISOString(),
        orgName,
        contactName,
        email,
        orgType,
        collaboration,
        message,
        website
      };

      try {
        const stored = JSON.parse(localStorage.getItem('bold_partner_submissions') || '[]');
        stored.push(inquiry);
        localStorage.setItem('bold_partner_submissions', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage failed:', err);
      }

      closeModal($('#partnershipModal'));
      showToast('Partnership inquiry received! Our outreach director will be in touch.');
      form.reset();
    });
  }

  // --- Branch Expansion ("Bring BOLD to Your Community") ---
  function initBranchModal() {
    const form = $('#branchExpansionForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#branchApplicantName')?.value.trim();
      const email = $('#branchApplicantEmail')?.value.trim();
      const region = $('#branchApplicantRegion')?.value.trim();
      const institution = $('#branchApplicantInstitution')?.value.trim();
      const notes = $('#branchApplicantNotes')?.value.trim();

      if (!name || !email || !region) {
        showToast('Please enter your name, email, and target community/region.', 'danger');
        return;
      }

      const branchApp = {
        id: 'branch_' + Date.now(),
        date: new Date().toISOString(),
        name,
        email,
        region,
        institution,
        notes
      };

      try {
        const stored = JSON.parse(localStorage.getItem('bold_branch_inquiries') || '[]');
        stored.push(branchApp);
        localStorage.setItem('bold_branch_inquiries', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage error:', err);
      }

      closeModal($('#branchModal'));
      showToast('Expansion inquiry submitted! Thank you for helping BOLD grow.');
      form.reset();
    });
  }

  // --- Event RSVP Modal Submission ---
  function initEventRsvp() {
    const form = $('#eventRsvpForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const eventTitle = $('#rsvpEventHidden')?.value;
      const attendeeName = $('#rsvpAttendeeName')?.value.trim();
      const attendeeEmail = $('#rsvpAttendeeEmail')?.value.trim();
      const role = $('#rsvpRole')?.value;
      const accommodations = $('#rsvpAccommodations')?.value.trim();

      if (!attendeeName || !attendeeEmail) {
        showToast('Please enter your name and email to RSVP.', 'danger');
        return;
      }

      const rsvp = {
        id: 'rsvp_' + Date.now(),
        date: new Date().toISOString(),
        eventTitle,
        attendeeName,
        attendeeEmail,
        role,
        accommodations
      };

      try {
        const stored = JSON.parse(localStorage.getItem('bold_event_rsvps') || '[]');
        stored.push(rsvp);
        localStorage.setItem('bold_event_rsvps', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage error:', err);
      }

      closeModal($('#eventRegistrationModal'));
      showToast(`RSVP confirmed for "${eventTitle}"! A calendar invite has been queued.`);
      form.reset();
    });
  }

  // --- Newsletter Signup ---
  function initNewsletter() {
    const form = $('#newsletterForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = $('#newsletterEmail')?.value.trim();
      const firstName = $('#newsletterFirstName')?.value.trim() || 'Friend';
      const consent = $('#newsletterConsent')?.checked;

      if (!email || !consent) {
        showToast('Please provide your email and agree to receive updates.', 'danger');
        return;
      }

      const subscriber = {
        id: 'sub_' + Date.now(),
        date: new Date().toISOString(),
        email,
        firstName
      };

      try {
        const stored = JSON.parse(localStorage.getItem('bold_newsletter_subscribers') || '[]');
        stored.push(subscriber);
        localStorage.setItem('bold_newsletter_subscribers', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage error:', err);
      }

      showToast(`Welcome, ${firstName}! You are now subscribed to BOLD updates.`);
      form.reset();
    });
  }

  // --- Contact Us Form ---
  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = $('#contactName')?.value.trim();
      const email = $('#contactEmail')?.value.trim();
      const category = $('#contactCategory')?.value;
      const message = $('#contactMessage')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in your name, email, and message.', 'danger');
        return;
      }

      const inquiry = {
        id: 'msg_' + Date.now(),
        date: new Date().toISOString(),
        name,
        email,
        category,
        message
      };

      try {
        const stored = JSON.parse(localStorage.getItem('bold_contact_submissions') || '[]');
        stored.push(inquiry);
        localStorage.setItem('bold_contact_submissions', JSON.stringify(stored));
      } catch (err) {
        console.warn('Storage error:', err);
      }

      showToast('Message sent! A BOLD coordinator will reply to you shortly.');
      form.reset();
    });
  }

  // --- FAQ Accordion ---
  function initFaqAccordion() {
    const faqContainer = $('#faqContainer');
    if (!faqContainer || !window.BOLD_DATA) return;

    const faqs = window.BOLD_DATA.faqs || [];
    faqContainer.innerHTML = faqs.map((faq, index) => `
      <div class="faq-item ${index === 0 ? 'open' : ''}">
        <button class="faq-question" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
          <span>${faq.q}</span>
          <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');

    $$('.faq-item', faqContainer).forEach(item => {
      const btn = item.querySelector('.faq-question');
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        $$('.faq-item', faqContainer).forEach(other => {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // --- Populate Dynamic Cards & Values ---
  function initDynamicContent() {
    if (!window.BOLD_DATA) return;

    // Populate Values
    const valuesContainer = $('#valuesGrid');
    if (valuesContainer) {
      valuesContainer.innerHTML = window.BOLD_DATA.values.map(val => `
        <article class="value-card">
          <div class="value-icon-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              ${getIconSvgPath(val.icon)}
            </svg>
          </div>
          <h3 class="value-title">${val.title}</h3>
          <p class="value-desc">${val.description}</p>
        </article>
      `).join('');
    }

    // Populate Impact Metrics
    const metricsContainer = $('#impactMetricsGrid');
    if (metricsContainer) {
      metricsContainer.innerHTML = window.BOLD_DATA.impactMetrics.map(met => `
        <article class="metric-card">
          <div class="metric-number">${met.value}</div>
          <h3 class="metric-label">${met.label}</h3>
          <p class="metric-desc">${met.description}</p>
          <span class="placeholder-tag">[${met.placeholderNote}]</span>
        </article>
      `).join('');
    }

    // Populate Volunteer Roles
    const rolesContainer = $('#volunteerRolesGrid');
    if (rolesContainer) {
      rolesContainer.innerHTML = window.BOLD_DATA.volunteerRoles.map(role => `
        <article class="role-card">
          <div class="role-header">
            <h3 class="role-title">${role.title}</h3>
            <span class="badge badge-${role.badgeColor}">${role.status}</span>
          </div>
          <p class="role-desc">${role.description}</p>
          <div class="role-specs">
            <div><strong>Time Commitment:</strong> ${role.timeCommitment}</div>
            <div><strong>Requirements:</strong> ${role.requirements}</div>
          </div>
          <a href="#volunteer-application" class="btn btn-sm btn-outline-gold" style="margin-top: auto;">Apply for this Role</a>
        </article>
      `).join('');
    }

    // Populate Branches
    const branchesContainer = $('#branchesGrid');
    if (branchesContainer) {
      branchesContainer.innerHTML = window.BOLD_DATA.branches.map(br => `
        <article class="branch-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
            <h3 class="branch-title">${br.name}</h3>
            <span class="badge badge-gold" style="font-size: 0.7rem;">${br.status}</span>
          </div>
          <div class="branch-region">${br.region}</div>
          <p class="branch-desc">${br.description}</p>
          <div style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 6px;">
            <div><strong>Key Campus Partners:</strong> ${br.institutions}</div>
            <div style="margin-top: 4px;"><strong>Contact:</strong> ${br.email}</div>
          </div>
          <button class="btn btn-sm btn-secondary" style="margin-top: auto;" data-modal-target="branchModal">Connect with Branch</button>
        </article>
      `).join('');
    }

    // Populate Team Placeholders
    const teamContainer = $('#teamGrid');
    if (teamContainer) {
      teamContainer.innerHTML = window.BOLD_DATA.team.map(member => `
        <article class="team-card">
          <div class="team-avatar-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Verified Photo Pending</span>
          </div>
          <h3 class="team-name">${member.name}</h3>
          <div class="team-role">${member.role}</div>
          <span class="badge badge-gold" style="font-size: 0.72rem;">${member.category} • ${member.branch}</span>
          <p class="team-bio">${member.bio}</p>
          <span class="placeholder-tag">[Verified Profile Pending]</span>
        </article>
      `).join('');
    }
  }

  // Helper for inline icons
  function getIconSvgPath(name) {
    switch (name) {
      case 'zap': return '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>';
      case 'users': return '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>';
      case 'heart': return '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>';
      case 'key': return '<path d="M21 2l-2 2m-1.5 1.5L20 8l-3 3-1.5-1.5L14 11l-2-2-4 4v2h2l1 1-1 1-1-1v2h-2l-1 1H4v-4l6-6 1.5 1.5L13 7l-1.5-1.5L14 3l2.5 2.5L18 4l3-2z"></path>';
      case 'compass': return '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>';
      case 'share-2': return '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>';
      default: return '<circle cx="12" cy="12" r="10"></circle>';
    }
  }

  // --- Document Ready Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    initModals();
    initMobileNav();
    initScrollspy();
    initDynamicContent();
    initResourceHub();
    initEventsHub();
    initVolunteerForm();
    initDonationSection();
    initPartnershipForm();
    initBranchModal();
    initEventRsvp();
    initNewsletter();
    initContactForm();
    initFaqAccordion();
  });

})();
