import { CaseImg, Placeholder, Rule, Label, Insight, Why, Decision, HiddenComplexity, Dots, MomentHead, Reflection, VideoFigure } from '../shared.jsx'
import { HF, MF, BF } from '../shared.jsx'

/* ── Module-level helpers ── */
function stats(rows) {
  const cols = rows.length
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, borderBottom: '1px solid #E0E0E0' }} className="stats-row">
      {rows.map(({ n, d }, i) => (
        <div key={n} style={{ padding: '3rem', borderRight: i < cols - 1 ? '1px solid #E0E0E0' : 'none' }}>
          <div style={{ fontFamily: HF, fontSize: 'clamp(2.25rem, 4.5vw, 5rem)', lineHeight: 0.9, marginBottom: '0.5rem' }}>{n}</div>
          <div style={{ fontFamily: BF, fontSize: 14, color: '#444', lineHeight: 1.6 }}>{d}</div>
        </div>
      ))}
    </div>
  )
}

function impact(items) {
  const cols = items.length
  return (
    <div className="dark-section" style={{ background: '#000', padding: '5vw var(--mg)' }}>
      <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white', margin: '0 0 1rem' }}>Impact</p>
      <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 0 }} />
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)` }} className="stats-row">
        {items.map(({ big, mid }, i) => (
          <div key={big} style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', paddingRight: i < cols - 1 ? '3rem' : 0, paddingLeft: i > 0 ? '3rem' : 0, borderRight: i < cols - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
            <div style={{ fontFamily: HF, fontSize: 'clamp(2.25rem, 4.5vw, 5rem)', color: 'white', lineHeight: 0.9, marginBottom: '0.625rem' }}>{big}</div>
            <div style={{ fontFamily: BF, fontSize: 14, color: 'rgba(255,255,255,0.87)' }}>{mid}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
    WP1 — MyADP & ADP Mobile
══════════════════════════════════════════ */
export function WP1MyADP() {
  return (
    <>
      {/* ── WP1: MyADP & ADP Mobile ── */}
      <section id="wp1" style={{ padding: '6vw var(--mg) 0' }}>
        <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 01</span>
        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          MyADP & ADP Mobile<br />Transforming Workforce Software<br />Into an Employee-Centered Platform
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Overview</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>For decades, enterprise HR systems were designed primarily around administrative workflows, payroll processing, and organizational management. Employees often interacted with these systems only when necessary, navigating fragmented experiences spread across disconnected products and utilities.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>MyADP explored how workforce software could become more connected, accessible, and employee-centered across desktop and mobile environments.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The work was less about redesigning screens and more about rethinking how people interact with payroll, HR, benefits, approvals, and workforce tasks throughout the flow of everyday work.</p>
          </div>
        </div>
        <CaseImg src="/assets/MyADP dashboard — unified employee experience.png" alt="MyADP dashboard: unified employee experience" caption="MyADP unified payroll, HR, benefits, and workforce actions into a connected employee experience." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>The Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Enterprise workforce systems historically evolved through separate products, disconnected workflows, and deeply operational interfaces optimized for administrators instead of employees.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The opportunity was to create a more unified platform experience that simplified workforce interactions while helping employees and managers stay connected to the moments and actions that mattered most.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>At the same time, mobile devices were rapidly changing expectations around accessibility, speed, and usability. Most enterprise workforce applications still treated mobile as a limited companion experience focused primarily on viewing information instead of completing work.</p>
          </div>
        </div>
        <CaseImg src="/assets/Early ADP mobile concepts — desktop and mobile continuity.png" alt="Early ADP mobile concepts: desktop and mobile continuity" caption="Early explorations focused on creating continuity across desktop and mobile workforce experiences." />
      </section>

      <div style={{ padding: '3rem var(--mg) 0' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State</p>
        <Rule />
        {stats([
          { n: 'Millions',     d: 'of employees interacting with fragmented HR and payroll systems' },
          { n: 'Disconnected', d: 'workflows spread across payroll, benefits, HR, talent, and approvals' },
          { n: 'Desktop-first', d: 'enterprise systems with limited mobile functionality' },
        ])}
      </div>

      <section style={{ padding: '3rem var(--mg) 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Joined ADP as part of the company's Innovation Lab and helped lead the evolution of Project RedBox into MyADP, eventually scaling the UX organization supporting the initiative across product areas and platforms.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>Led UX efforts focused on employee experience strategy, mobile transformation, workflow orchestration, unified navigation models, operational systems thinking, and cross-functional platform design across desktop and mobile experiences.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The work included organizational alignment, experience architecture, workflow modeling, product vision, research collaboration, and scaling design systems and UX teams across a rapidly growing platform.</p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Understanding the Environment</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Workforce software touches highly personal and operational moments across people's lives: getting paid, requesting time off, onboarding into a company, approving changes, accessing benefits, or completing critical tasks under time pressure.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We observed how fragmented systems forced employees and managers to move between disconnected tools, how operational tasks were often hidden deep within navigation structures, and how traditional enterprise experiences prioritized system organization over human workflows.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The challenge became designing a platform that could bring workforce actions, notifications, approvals, and operational tasks together into a more connected and manageable experience.</p>
          </div>
        </div>
        <CaseImg src="/assets/Workflow diagrams — Things To Do framework and orchestration sketches.png" alt="Workflow diagrams: Things To Do framework and orchestration sketches" caption="Early workflow models explored event-driven experiences, operational coordination, and task-oriented workforce systems." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="01" tag="Key Moment" title="Reframing Workforce Software Around Actions" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Traditional HR systems were largely organized around modules and navigation structures. Employees often had to understand how the system was organized before they could complete even simple tasks.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We explored a different approach centered around actions, events, and operational workflows. Experiences like Things To Do surfaced the work that actually required attention instead of forcing users to navigate complex organizational structures.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The experience emphasized:</p>
          <Dots items={[
            'Task-oriented workflows',
            'Event-driven coordination',
            'Clear operational visibility',
            'Cross-system continuity',
            'Reduced navigation complexity',
          ]} />
          <Why text="Employees do not think in modules. They think in moments, responsibilities, and actions they need to complete." />
        </div>
        <figure style={{ margin: '2.5rem 0 0', padding: 0, maxWidth: 740 }}>
          <div style={{ border: '1px solid #E5E7EB', background: '#fff', padding: '1rem 0 2rem' }}>
            <p style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: '0 1.5rem 0.75rem' }}>Things To Do — Action Center</p>
            <img src="/assets/Things To Do — action center concepts.png" alt="Things To Do: action center concepts" style={{ width: '100%', display: 'block' }} />
          </div>
          <figcaption style={{ fontFamily: MF, fontSize: 11, lineHeight: 1.6, color: '#666', paddingTop: '0.75rem' }}>Task-oriented experiences helped employees and managers focus on actions instead of navigating disconnected systems.</figcaption>
        </figure>
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="02" tag="Key Moment" title="Transforming Mobile From Viewing to Doing" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Early enterprise mobile applications often focused on viewing payroll information or checking basic employee data. Completing meaningful work still required returning to desktop systems.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We helped expand mobile experiences beyond passive access into fully operational workforce tools where employees and managers could review approvals, complete tasks, access payroll information, manage benefits, and stay connected to workforce activity throughout the day.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The interface prioritized clarity, speed, continuity, and accessibility across different moments of use.</p>
          <Why text="Mobile workforce experiences become valuable when people can complete work in context instead of waiting to return to a desktop environment." />
        </div>
        <CaseImg src="/assets/ADP Mobile Approvals Pay  Workflows.png" alt="ADP Mobile: Approvals, Pay Statements, and Workforce Workflows" caption="Mobile experiences evolved from passive utilities into active workforce management tools." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="03" tag="Key Moment" title="Designing Connected Workforce Systems" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>One of the larger opportunities was reducing fragmentation across workforce experiences that historically operated as separate systems.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We explored ways to connect payroll, HR, benefits, talent, notifications, approvals, and operational workflows into a more unified platform experience that could adapt across employees, managers, and practitioners.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The work introduced more coordinated experience patterns across desktop and mobile while helping establish shared systems thinking across teams and product areas.</p>
          <Why text="Workforce platforms become more effective when employees can move across experiences without feeling the boundaries between systems." />
        </div>
        <figure style={{ margin: '2.5rem 0 0', padding: 0, maxWidth: 740 }}>
          <div style={{ border: '1px solid #E5E7EB', background: '#fff', padding: '1rem 0 0' }}>
            <p style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: '0 1.5rem 0.75rem' }}>Connected Platform Architecture</p>
            <img src="/assets/Connected platform concepts helped unify workforce experiences across products and operational workflows..png" alt="Connected platform concepts: unified navigation and orchestration models" style={{ width: '100%', display: 'block' }} />
          </div>
          <figcaption style={{ fontFamily: MF, fontSize: 11, color: '#666', marginTop: '0.75rem', lineHeight: 1.6, borderLeft: '2px solid #000', paddingLeft: '0.75rem' }}>
            Connected platform concepts helped unify workforce experiences across products and operational workflows.
          </figcaption>
        </figure>
      </section>

      <section style={{ padding: '5rem var(--mg) 0', borderBottom: '1px solid #E0E0E0' }}>
        <MomentHead num="04" tag="Key Moment" title="Scaling an Employee-First Platform" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>As adoption accelerated, the work expanded from product design into organizational transformation. Teams, systems, and workflows needed to scale alongside the platform itself.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We helped grow UX practices, establish shared experience principles, align cross-functional teams, and evolve more consistent interaction models across a rapidly expanding ecosystem of workforce products and services.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The challenge was maintaining coherence while supporting millions of employees across highly varied organizational structures and workforce scenarios.</p>
          <Why text="Large-scale workforce platforms require not only scalable technology, but scalable systems thinking, collaboration models, and operational alignment." />
        </div>
        <figure style={{ margin: '2.5rem 0 6rem', padding: 0, maxWidth: 740 }}>
          <div style={{ border: '1px solid #E5E7EB', background: '#fff', padding: '1rem 0 2rem' }}>
            <p style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: '0 1.5rem 0.75rem' }}>Design System Explorations</p>
            <img src="/assets/Design System Explorations Platform Ecosystem.png" alt="Design System Explorations: Platform Ecosystem and Organizational Frameworks" style={{ width: '100%', display: 'block' }} />
          </div>
          <figcaption style={{ fontFamily: MF, fontSize: 11, lineHeight: 1.6, color: '#666', paddingTop: '0.75rem' }}>Shared experience principles and systems thinking helped scale the platform across products and teams.</figcaption>
        </figure>
      </section>

      {impact([
        { big: '13M+',       mid: 'employees and users supported across the platform ecosystem' },
        { big: '1B+',        mid: 'annual logins across workforce experiences and services' },
        { big: 'Unified',    mid: 'payroll, HR, benefits, approvals, and workforce workflows connected into one platform experience' },
      ])}
      <Reflection text="MyADP helped reposition workforce software from fragmented administrative tooling into a connected operational platform designed around employee actions, workflows, and everyday work moments." />
    </>
  )
}
