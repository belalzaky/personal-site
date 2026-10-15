// MC-Flow live card (homepage and /mission-control).
// A straight port of the state machine in the Home board's renderVals():
// a tick every 1.4s; steps 1–4 advance; at the gate (step 4) it waits 5 ticks and then
// auto-approves; "Approve" works as soon as the gate is waiting; "done" holds 2 ticks,
// then the next of the three examples starts. Paused while off-screen.

export interface FlowExample {
  label: string;
  lines: string[];
  done: string;
}

export const FLOW_EXAMPLES: FlowExample[] = [
  {
    label: 'lecture cards',
    lines: [
      'Endocrinology note: this week’s lecture has no cards yet.',
      'Matched to the next free study slot.',
      'Shown in Today → Up next.',
      'The assistant drafts concept cards from the slides.',
      'Waiting for me: add the cards?',
    ],
    done: 'Approved — cards added to the deck.',
  },
  {
    label: 'a slipping project',
    lines: [
      'A project note hasn’t moved in over a week.',
      'Marked as slipping.',
      'It turns red on the Projects screen.',
      'The assistant proposes one small next step.',
      'Waiting for me: add it as a task?',
    ],
    done: 'Approved — task written into the note.',
  },
  {
    label: 'a follow-up email',
    lines: [
      'Task in a note: follow up after an event.',
      'It is due today.',
      'Shown in Today → Up next.',
      'The assistant drafts the email.',
      'Waiting for me: open the draft?',
    ],
    done: 'Approved — the draft opens in Mail; I send it myself.',
  },
];

export const FLOW_NODES = [
  { name: 'My notes', sub: 'Plain text' },
  { name: 'Local server', sub: 'On my Mac' },
  { name: 'Dashboard', sub: 'Today, Projects' },
  { name: 'Assistant', sub: 'Drafts, never sends' },
  { name: 'Me', sub: 'Approve or not' },
];

const TICK_MS = 1400;
const GATE = 4;

interface State {
  s: number;
  step: number;
  done: boolean;
  wait: number;
  after: number;
}

function initFlow(root: HTMLElement) {
  const label = root.querySelector<HTMLElement>('[data-flow-label]');
  const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-flow-node]'));
  const log = root.querySelector<HTMLElement>('[data-flow-log]');
  const btn = root.querySelector<HTMLButtonElement>('[data-flow-approve]');
  if (!label || !log || !btn || dots.length !== FLOW_NODES.length) return;

  let st: State = { s: 0, step: 0, done: false, wait: 0, after: 0 };
  let timer: number | undefined;

  function set(patch: Partial<State>) {
    st = { ...st, ...patch };
    render();
  }

  function tick() {
    if (st.done) {
      if (st.after >= 2) set({ s: (st.s + 1) % FLOW_EXAMPLES.length, step: 0, done: false, wait: 0, after: 0 });
      else set({ after: st.after + 1 });
      return;
    }
    if (st.step < GATE) { set({ step: st.step + 1 }); return; }
    if (st.wait >= 5) { set({ done: true, after: 0 }); return; }
    set({ wait: st.wait + 1 });
  }

  function render() {
    const cur = FLOW_EXAMPLES[st.s];
    const waiting = st.step === GATE && !st.done;
    label!.textContent = cur.label;
    dots.forEach((li, i) => {
      const state = st.done || i < st.step ? 'done' : i === st.step ? 'active' : 'todo';
      li.dataset.state = state;
      const mark = li.querySelector<HTMLElement>('[data-flow-mark]');
      if (mark) mark.textContent = state === 'done' ? '✓' : String(i + 1);
    });
    const line = st.done ? cur.done : cur.lines[st.step];
    if (log!.textContent !== line) log!.textContent = line;
    btn!.disabled = !waiting;
    btn!.textContent = st.done ? 'Approved ✓' : 'Approve';
  }

  btn.addEventListener('click', () => {
    if (st.step === GATE && !st.done) set({ done: true, after: 0 });
  });

  function start() {
    if (timer === undefined) timer = window.setInterval(tick, TICK_MS);
  }
  function stop() {
    if (timer !== undefined) { window.clearInterval(timer); timer = undefined; }
  }

  let inView = !('IntersectionObserver' in window);
  const sync = () => (inView && !document.hidden ? start() : stop());

  if (!inView) {
    new IntersectionObserver((entries) => {
      for (const e of entries) inView = e.isIntersecting;
      sync();
    }).observe(root);
  }
  document.addEventListener('visibilitychange', sync);
  sync();

  render();
}

export function initAllFlows() {
  document.querySelectorAll<HTMLElement>('[data-mc-flow]').forEach(initFlow);
}
