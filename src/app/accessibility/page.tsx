'use client';

import { useEffect, useState } from 'react';

const exampleImageUrl =
  'https://res.cloudinary.com/dtglidvcw/image/upload/v1721943129/BUGBUSTER/smsccp4wsl8o6v4tmmfb.jpg';

const bugs = [
  {
    title: 'Color contrast',
    componentName: 'Product action button',
    purpose: 'This button represents a primary action in a shopping flow.',
    axeRule: 'color-contrast',
    problem:
      'The text color is too close to the background color, so the button is hard to read.',
    whyItMatters:
      'Low contrast affects users with low vision, color vision differences, older displays, and bright environments.',
    fix:
      'Use foreground and background colors that meet WCAG contrast requirements. Normal text usually needs at least 4.5:1.',
    example: (
      <button
        className="rounded px-4 py-3"
        style={{ backgroundColor: '#888888', color: '#777777' }}
        type="button"
      >
        Buy now
      </button>
    ),
    fixedExample: (
      <button
        className="rounded bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        type="button"
      >
        Buy now
      </button>
    ),
  },
  {
    title: 'Missing image alt text',
    componentName: 'Promotional image',
    purpose: 'This image is meant to communicate visual information to the user.',
    axeRule: 'image-alt',
    problem:
      'The image has no alt attribute, so screen reader users do not receive any information about it.',
    whyItMatters:
      'Images that communicate content need a text alternative. Decorative images should use an empty alt attribute.',
    fix:
      'Add a meaningful alt attribute, or use alt="" when the image is purely decorative.',
    example: (
      <img
        className="h-52 w-full rounded object-cover"
        src={exampleImageUrl}
      />
    ),
    fixedExample: (
      <img
        alt="Bug Buster mentoring banner"
        className="h-52 w-full rounded object-cover"
        src={exampleImageUrl}
      />
    ),
  },
  {
    title: 'Input without label',
    componentName: 'Email input',
    purpose: 'This field collects an email address from the user.',
    axeRule: 'label',
    problem:
      'The input has no accessible name. The user can type in it, but assistive technologies cannot identify its purpose.',
    whyItMatters:
      'Every form control needs a label so users know what information is expected.',
    fix:
      'Connect a visible label with htmlFor/id, wrap the input in a label, or provide a clear aria-label when a visible label is not possible.',
    example: (
      <input
        className="w-full rounded border border-gray-500 bg-gray-800 p-3 text-gray-100"
        type="email"
      />
    ),
    fixedExample: (
      <div className="w-full max-w-sm text-left">
        <label className="block font-semibold text-gray-100" htmlFor="email-fixed">
          Email
        </label>
        <input
          className="mt-2 w-full rounded border border-gray-500 bg-gray-800 p-3 text-gray-100"
          id="email-fixed"
          type="email"
        />
      </div>
    ),
  },
  {
    title: 'Button without accessible name',
    componentName: 'Icon button',
    purpose: 'This compact button represents an action using only a visual symbol.',
    axeRule: 'button-name',
    problem:
      'The button only contains an icon that is hidden from assistive technologies.',
    whyItMatters:
      'A screen reader announces this as an unnamed button, so the user does not know what action it performs.',
    fix:
      'Add visible text, aria-label, or aria-labelledby that describes the button action.',
    example: (
      <button
        className="rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
        type="button"
      >
        <span aria-hidden="true">×</span>
      </button>
    ),
    fixedExample: (
      <button
        className="inline-flex items-center gap-2 rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
        title="Close dialog"
        type="button"
      >
        <span aria-hidden="true">×</span>
        <span>Close</span>
      </button>
    ),
  },
  {
    title: 'Link without accessible name',
    componentName: 'Icon link',
    purpose: 'This link navigates to another page using only a visual symbol.',
    axeRule: 'link-name',
    problem:
      'The link is focusable but only contains an icon hidden with aria-hidden.',
    whyItMatters:
      'Keyboard and screen reader users can reach the link, but they cannot understand where it goes.',
    fix:
      'Use descriptive link text or add an accessible name such as aria-label="Go to About page".',
    example: (
      <a
        className="inline-flex rounded bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700"
        href="/about"
      >
        <span aria-hidden="true">→</span>
      </a>
    ),
    fixedExample: (
      <a
        className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700"
        href="/about"
        title="Go to About page"
      >
        <span>About</span>
        <span aria-hidden="true">→</span>
      </a>
    ),
  },
  {
    title: 'Incorrect heading order',
    componentName: 'Content subsection',
    purpose: 'This text introduces a subsection inside the current page content.',
    axeRule: 'heading-order',
    problem:
      'The content jumps from a higher-level heading to an h4, skipping the expected heading levels.',
    whyItMatters:
      'Screen reader users often navigate by headings. A broken hierarchy makes the page outline confusing.',
    fix:
      'Use heading levels in order. After an h2, use h3 for the next nested section before using h4.',
    example: (
      <div className="max-w-xl text-left">
        <h1 className="text-3xl font-bold text-gray-100">Account settings</h1>
        <p className="mt-2 text-gray-300">
          This is the main title for the settings area.
        </p>

        <h4 className="mt-6 text-lg font-semibold text-yellow-200">
          Notification preferences
        </h4>
        <p className="mt-2 text-gray-300">
          This section appears nested, but its heading level jumps too far.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-gray-100">
          Security options
        </h2>
        <p className="mt-2 text-gray-300">
          This section returns to a higher heading level after the skipped one.
        </p>
      </div>
    ),
    fixedExample: (
      <div className="max-w-xl text-left">
        <h1 className="text-3xl font-bold text-gray-100">Account settings</h1>
        <p className="mt-2 text-gray-300">
          This is the main title for the settings area.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-gray-100">
          Notification preferences
        </h2>
        <p className="mt-2 text-gray-300">
          This section is one level below the main page title.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-gray-100">
          Security options
        </h2>
        <p className="mt-2 text-gray-300">
          This section stays at the same level as the previous section.
        </p>
      </div>
    ),
  },
  {
    title: 'List item outside a list',
    componentName: 'Checklist item',
    purpose: 'This item is presented as part of a list of related information.',
    axeRule: 'listitem',
    problem:
      'The li element is not inside a ul or ol element.',
    whyItMatters:
      'Assistive technologies rely on proper list structure to announce list length, position, and relationships.',
    fix:
      'Wrap li elements inside a ul or ol, or use a different element if the content is not really a list.',
    example: (
      <div className="rounded border border-gray-700 p-4">
        <li>This item looks like a list item, but it is not inside ul or ol.</li>
      </div>
    ),
    fixedExample: (
      <ul className="list-disc rounded border border-gray-700 p-4 pl-8 text-left">
        <li>This item is inside a proper unordered list.</li>
      </ul>
    ),
  },
  {
    title: 'Focusable content inside aria-hidden',
    componentName: 'Hidden action area',
    purpose: 'This area contains an action that may appear or disappear in an interface.',
    axeRule: 'aria-hidden-focus',
    problem:
      'The container is hidden from assistive technologies, but it still contains a focusable button.',
    whyItMatters:
      'Keyboard users may focus something that screen readers cannot announce, creating a confusing dead end.',
    fix:
      'Do not place focusable elements inside aria-hidden content. Remove the button from the DOM, disable it, or remove aria-hidden.',
    example: (
      <div aria-hidden="true" className="rounded border border-gray-700 p-4">
        <button
          className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          type="button"
        >
          Hidden action
        </button>
      </div>
    ),
    fixedExample: (
      <div className="rounded border border-gray-700 p-4">
        <button
          className="inline-flex items-center gap-2 rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          title="Run visible action"
          type="button"
        >
          <span aria-hidden="true">✓</span>
          Visible action
        </button>
      </div>
    ),
  },
];

export default function AccessibilityPage() {
  const [activeBugIndex, setActiveBugIndex] = useState(0);
  const activeBug = bugs[activeBugIndex];

  useEffect(() => {
    const bugFromUrl = Number(new URLSearchParams(window.location.search).get('bug'));

    if (bugFromUrl >= 1 && bugFromUrl <= bugs.length) {
      setActiveBugIndex(bugFromUrl - 1);
    }
  }, []);

  const selectBug = (index: number) => {
    setActiveBugIndex(index);
    window.history.replaceState(null, '', `/accessibility?bug=${index + 1}`);
  };

  return (
    <div className="min-h-screen bg-gray-800 px-6 py-10 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Accessibility Bug Lab</h1>
          <p className="mt-3 text-gray-300">
            Pick one bug, inspect the component, then reveal the explanation.
          </p>
        </header>

        <div
          aria-label="Accessibility bug examples"
          className="mb-6 grid grid-cols-4 gap-2 md:grid-cols-8"
          role="tablist"
        >
          {bugs.map((bug, index) => {
            const isActive = index === activeBugIndex;

            return (
              <button
                aria-controls="accessibility-bug-panel"
                aria-selected={isActive}
                className={`rounded border px-3 py-2 text-left text-sm font-semibold transition ${
                  isActive
                    ? 'border-blue-300 bg-blue-100 text-center text-gray-900'
                    : 'border-gray-600 bg-gray-900 text-center text-gray-100 hover:bg-gray-700'
                }`}
                id={`accessibility-bug-tab-${index}`}
                key={bug.axeRule}
                onClick={() => selectBug(index)}
                role="tab"
                type="button"
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        <section
          aria-labelledby={`accessibility-bug-tab-${activeBugIndex}`}
          className="mx-auto max-w-3xl rounded-lg border border-gray-600 bg-gray-900 p-6 text-center"
          id="accessibility-bug-panel"
          key={activeBug.axeRule}
          role="tabpanel"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">
              Example {activeBugIndex + 1}
            </p>
            <h2 className="mt-2 text-2xl font-bold">{activeBug.componentName}</h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-300">
              {activeBug.purpose}
            </p>

            <div className="mt-6 flex min-h-36 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 p-6">
              {activeBug.example}
            </div>

            <details className="mt-6 rounded-lg border border-gray-700 bg-gray-800 p-4 text-center">
              <summary className="cursor-pointer font-semibold text-green-200">
                Reveal fixed version
              </summary>

              <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-green-200">
                Corrected component
              </p>
              <div className="mt-4 flex min-h-36 items-center justify-center rounded-lg border border-gray-700 bg-gray-900 p-6">
                {activeBug.fixedExample}
              </div>
            </details>

            <details className="mt-4 rounded-lg border border-gray-700 bg-gray-800 p-4 text-center">
              <summary className="cursor-pointer font-semibold text-blue-200">
                Reveal explanation
              </summary>

              <h3 className="mt-5 text-xl font-bold text-gray-100">
                {activeBug.title}
              </h3>
              <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-blue-200">
                Axe rule: {activeBug.axeRule}
              </p>

              <dl className="mx-auto mt-4 max-w-xl space-y-5">
                <div>
                  <dt className="font-semibold text-gray-100">What is wrong?</dt>
                  <dd className="mt-1 text-gray-300">{activeBug.problem}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-100">Why does it matter?</dt>
                  <dd className="mt-1 text-gray-300">{activeBug.whyItMatters}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-100">How can we fix it?</dt>
                  <dd className="mt-1 text-gray-300">{activeBug.fix}</dd>
                </div>
              </dl>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
