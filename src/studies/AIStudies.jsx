import { CaseImg, Placeholder, Rule, Label, Insight, Why, Decision, HiddenComplexity, Dots, MomentHead, Reflection, VideoFigure } from '../shared.jsx'
import { HF, MF, BF } from '../shared.jsx'

/* ══════════════════════════════════════════
    CASE STUDY 1 — Hiring
══════════════════════════════════════════ */
export function CS1Hiring() {
  return (
    <>
      <section id="cs1" style={{ padding: '6vw var(--mg) 0' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '0' }}>
          <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 01</span>
        </div>

        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          Reimagining Hiring<br />as an Intelligent,<br />Human-in-the-Loop System
        </h2>
        {/* Overview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0',  }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Overview</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              Hiring slows down long before recruiting begins. Work is spread across managers, recruiters, approvals, and disconnected tools, causing delays that compound throughout the process.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              We reframed hiring as a coordinated experience where AI helps surface signals, reduce manual effort, and accelerate execution, while people remain responsible for decisions.
            </p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Redefine hiring as a connected experience instead of a series of disconnected steps, helping managers, recruiters, and candidates move through the process with greater clarity while establishing how hiring signals are surfaced, how decisions are supported, and where people remain accountable throughout the process.
            </p>
          </div>
        </div>

        {/* Current State label */}
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem' }}>
              Hiring slows down early as managers, recruiters, and interview teams work across disconnected tools, approvals, and handoffs, making it difficult to maintain momentum or shared visibility throughout the process. The result is slow requisition setup, delayed screening cycles, and hiring timelines that continue to expand long before candidates enter the pipeline.
            </p>
        <Rule weight={3} />

        {/* Current State stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid #E0E0E0' }} className="stats-row">
          {[
            {
              n: '7–10', d: 'days to create and open a job requisition',
              insight: 'Manual intake and approvals create early delays.',
              icon: (
                <svg width="48" height="48" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="6" width="30" height="27" rx="3"/>
                  <line x1="3" y1="14" x2="33" y2="14"/>
                  <line x1="11" y1="3" x2="11" y2="9"/>
                  <line x1="25" y1="3" x2="25" y2="9"/>
                  <rect x="9.5" y="19" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                  <rect x="16.5" y="19" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                  <rect x="23.5" y="19" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                  <rect x="9.5" y="25" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                  <rect x="16.5" y="25" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                  <rect x="23.5" y="25" width="3" height="3" rx="0.5" fill="currentColor" stroke="none"/>
                </svg>
              )
            },
            {
              n: '12–18', d: 'days to schedule an initial screening',
              insight: 'Coordination across calendars and systems slows the process.',
              icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              )
            },
            {
              n: '~45', d: 'average days, time to hire',
              insight: 'Lengthy cycles impact speed, candidate experience, and business.',
              icon: (
                <svg width="48" height="48" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="18" r="14"/>
                  <line x1="18" y1="9" x2="18" y2="18"/>
                  <line x1="18" y1="18" x2="24" y2="22"/>
                </svg>
              )
            },
          ].map(({ n, d, icon }, i) => (
            <div key={n} style={{ padding: '3rem', borderRight: i < 2 ? '1px solid #E0E0E0' : 'none' }}>
              <div style={{ height: 64, display: 'flex', alignItems: 'flex-end', marginBottom: '0.75rem', color: '#000' }}>{icon}</div>
              <div style={{ fontFamily: HF, fontSize: 'clamp(4rem, 7vw, 7rem)', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: '0.5rem' }}>{n}</div>
              <div style={{ fontFamily: BF, fontSize: 14, color: '#444', lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}
        </div>

        {/* Role + Approach */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 0' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Led the experience strategy and design direction for an AI-assisted hiring platform, working across product, engineering, and research to define how people and AI operate together throughout the hiring process while simplifying decision-making, reducing operational friction, and helping teams design and scale the experience consistently.
            </p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Approach</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
             Through conversations with managers, recruiters, and hiring teams, we identified where the process lost momentum, where communication failed, and where people needed more visibility and support.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              We designed a shared model where AI helps surface signals, reduce manual effort, and support execution, while managers and recruiters remain responsible for hiring decisions. Working closely with product and engineering, we defined how information moves across the process to create a faster and more connected hiring experience.
            </p>

          </div>
        </div>

        {/* ── KEY MOMENT 1 ── */}
        <div style={{ padding: '5rem 0 0' }}>
          <MomentHead num="01" tag="Key Moment" title="Proactive Signal Detection" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ maxWidth: 720 }}>
              <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
                Hiring often begins too late, after teams are already reacting to attrition, workload shifts, or emerging skill gaps. We explored how organizational signals could help managers recognize hiring needs earlier and act with more confidence.
              </p>
              <figure style={{ margin: '2.5rem 0 0', padding: 0, maxWidth: 740 }}>
                <div style={{ border: '1px solid #E5E7EB', background: '#fff', padding: '1rem 0 0' }}>
                  <p style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: '0 1.5rem 0.75rem' }}>Hiring Signal Model</p>
                  <img
                    src="/assets/AI-powered%20hiring%20process%20flow%20diagram.png"
                    alt="Diagram showing the AI-powered hiring process flow"
                    style={{ width: '100%', display: 'block' }}
                  />
                </div>
              </figure>
              <Why text="Hiring does not start when a requisition is opened. It starts when teams recognize a need early enough to act with confidence." />
            </div>
          </div>
          <VideoFigure src="/assets/Org-chart.mp4" caption="AI surfaces organizational risk in context, helping teams recognize what matters and act faster with confidence." />
          <Insight text="Hiring does not start when a requisition is opened. It starts when a need is recognized." />
        </div>

        {/* ── KEY MOMENT 2 ── */}
        <div style={{ padding: '5rem 0 0' }}>
          <MomentHead num="02" tag="Key Moment" title="Accelerating Talent Selection" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              After a hiring need was identified, we then explored a more parallel approach where hiring managers define the role while AI supports job description creation, skills mapping, sourcing, and screening simultaneously. This reduced early-stage delays and helped recruiters move into candidate review faster and with better alignment around role expectations.
            </p>
          </div>

          {/* System diagram */}
          <figure style={{ margin: '2.5rem 0 2.5rem', padding: 0, maxWidth: 740 }}>
            <div style={{ border: '1px solid #E5E7EB', background: '#fff', padding: '1rem 0 0' }}>
              <p style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: '0 1.5rem 0.75rem' }}>Parallel Hiring Flow</p>
              <img
                src="/assets/Orchestrating%20talent%20selection%20workflow.png"
                alt="Diagram showing Manager Defines Role flowing into four parallel AI agents: Job Description, Skills and Requirements, Sourcing, and Screening, which feed into a Candidate Pipeline"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </figure>

          <div style={{ maxWidth: 720 }}>
            <Why text="The value is not automation. It is coordination that makes the process faster, more consistent, and easier to trust." />
          </div>
          <VideoFigure src="/assets/Open-requisition.mp4" caption="AI-assisted hiring flow supporting role definition, sourcing, screening, and candidate review in parallel." />
          <Insight text="AI helps shape the role while reducing manual effort and improving candidate signals." />
        </div>

        {/* ── KEY MOMENT 3 ── */}
        <div style={{ padding: '5rem 0 0' }}>
          <MomentHead num="03" tag="Key Moment" title="Accelerating Decisions" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              We also explored how hiring decisions could move faster when interviews, feedback, and candidate data are brought into a unified candidate intelligence layer. AI synthesizes interviews, feedback, and data into structured summaries, helping teams compare candidates side by side and move forward with greater clarity.
            </p>
            <Why text="The value is not more data. It is turning information into decisions teams can act on quickly." />
          </div>
          <VideoFigure src="/assets/Candidate-match.mp4" caption="AI synthesizes phone screening interviews into structured candidate summaries, helping teams compare responses and identify patterns early in the process. As candidates progress, additional interview feedback builds a more complete view of each individual." />
          <Insight text="The challenge is not collecting information. It is turning it into something teams can act on." />
        </div>

        {/* ── SUPPORTING CAPABILITY ── */}
        <div style={{ padding: '5rem 0', borderBottom: '1px solid #E0E0E0' }}>
          <Label>Supporting Capability</Label>
          <h3 style={{ fontFamily: HF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1, letterSpacing: '0.02em', margin: '0.5rem 0 2rem' }}>Context-Aware Screening</h3>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              High-volume roles require teams to move quickly without reducing candidates to rigid screening scripts. We explored how AI could adapt screening conversations in real time based on role requirements, candidate responses, and conversational context, including multilingual shifts and interruptions, while summarizing interviews into structured insights that help recruiters review candidates faster and with greater consistency.
            </p>
          </div>
          <VideoFigure src="/assets/Candidate-screening.mp4" caption="Visual simulation of recorded agent interactions from the live demo. Applauded by clients for demonstrating multilingual support and real-time conversational adaptability, including seamless handling of interruptions." />
        </div>

      </section>

      {/* CS1 Impact */}
      <div className="dark-section" style={{ background: '#000', padding: '5vw var(--mg)' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white', margin: '0 0 1rem' }}>Impact</p>
        <p style={{ color: '#fff', fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
          This work helped teams identify hiring needs earlier, reduce delays across the hiring process, and make candidate decisions with greater clarity.
          </p>
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: '0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="stats-row">
          {[
            {
              big: '~40%', mid: 'Faster hiring cycles', sub: 'early indicators',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="14" cy="14" r="11"/>
                  <polyline points="14 8 14 14 18 16"/>
                </svg>
              )
            },
            {
              big: '10X', mid: 'Faster role setup', sub: 'reduced manual coordination',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 8 16 14 16 12 25 20 12 14 12 16 3"/>
                </svg>
              )
            },
            {
              big: '1,200', mid: "Presented live at ADP's flagship client conference.", sub: 'to 1,200 clients and executive leadership',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="24" height="16" rx="1.5"/>
                  <line x1="14" y1="19" x2="14" y2="23"/>
                  <line x1="14" y1="23" x2="9" y2="27"/>
                  <line x1="14" y1="23" x2="19" y2="27"/>
                </svg>
              )
            },
          ].map(({ big, mid, sub, icon }, i) => (
            <div key={big} style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', paddingRight: i < 2 ? '3rem' : 0, paddingLeft: i > 0 ? '3rem' : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
              <div style={{ height: 64, display: 'flex', alignItems: 'flex-end', marginBottom: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>{icon}</div>
              <div style={{ fontFamily: HF, fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'white', lineHeight: 0.9, marginBottom: '0.625rem' }}>{big}</div>
              <div style={{ fontFamily: BF, fontSize: 14, color: 'rgba(255,255,255,0.87)' }}>{mid}</div>
            </div>
          ))}
        </div>
        <figure style={{ margin: '3rem calc(-1 * var(--mg)) 0', padding: 0 }}>
          <div style={{ position: 'relative' }}>
            <img src="/assets/Keynote-stage.png" alt="ADP Meeting of the Minds keynote stage" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '60vh' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 25%, transparent 45%, transparent 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.92) 100%)', pointerEvents: 'none' }} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="sdimg" width="4" height="4" patternUnits="userSpaceOnUse">
                  <rect width="1" height="1" fill="rgba(0,0,0,0.18)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sdimg)" />
            </svg>
          </div>
          <figcaption style={{ fontFamily: MF, fontSize: 11, color: '#666', marginTop: '0.75rem', lineHeight: 1.6, borderLeft: '2px solid #000', paddingLeft: '0.75rem', marginLeft: 'var(--mg)', marginRight: 'var(--mg)' }}>
            Presented live at ADP Meeting of the Minds 2026, ADP's flagship client conference.
          </figcaption>
        </figure>
      </div>

      {/* CS1 System Design */}
      <div style={{ padding: '5vw var(--mg)', borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0' }}>
        <Label>Designing the System</Label>
        <h3 style={{ fontFamily: HF, fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1, letterSpacing: '0.02em', margin: '0.5rem 0 2rem' }}>Agentic Blueprint &amp; Canvas</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              As the hiring experience evolved, we needed a shared model for how people, agents, data, and decisions work together across the system. This blueprint became the foundation for aligning product, design, and engineering around both the frontstage experience and the backstage orchestration required to support it.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
              Originally developed as part of the hiring initiative, the model later expanded into additional use cases, including payroll and other agent-driven workflows, helping teams define where AI supports execution, where people remain accountable, and how information moves across increasingly connected systems.
            </p>
           </div>
          <figure style={{ margin: '3rem calc(-1 * var(--mg)) 0', padding: 0 }}>
            <div style={{ position: 'relative' }}>
              <img src="/assets/Agentic-canvas.png" alt="Agentic AI Blueprint - human and agent responsibilities" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="sdcanvas" width="4" height="4" patternUnits="userSpaceOnUse">
                    <rect width="1" height="1" fill="rgba(0,0,0,0.18)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#sdcanvas)" />
              </svg>
            </div>
            <figcaption style={{ fontFamily: MF, fontSize: 11, color: '#666', marginTop: '0.75rem', lineHeight: 1.6, borderLeft: '2px solid #000', paddingLeft: '0.75rem', marginLeft: 'var(--mg)', marginRight: 'var(--mg)' }}>
              A system-level blueprint aligned product, design, and engineering around human and agent responsibilities.
            </figcaption>
          </figure>
        </div>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════
    CASE STUDY 2 — Payroll
══════════════════════════════════════════ */
export function CS2Payroll() {
  return (
    <>
      <section id="cs2" style={{ padding: '6vw var(--mg) 0' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
          <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 02</span>
        </div>

        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          Designing for Accuracy<br /> in a High Stakes<br /> Human System
        </h2>

        {/* Problem + Opportunity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Problem</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Payroll errors often begin long before payroll is processed. Managers, employees, and disconnected systems introduce issues upstream, while payroll practitioners are responsible for identifying and resolving them before employees are paid.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, marginTop: '1rem', fontWeight: 300 }}>
              The challenge is not simply accuracy. Payroll teams need to recognize meaningful change early enough to investigate and resolve issues before payroll is committed, especially across shifts in pay, hours, deductions, and policy-driven variances.
            </p>
            </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Design a payroll experience that helps teams identify meaningful issues early, understand what changed and why, and resolve problems before payroll is committed.
            </p>
          </div>
        </div>

        {/* Current State label */}
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State of Payroll</p>

        <Rule weight={3} />

        {/* Current State stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid #E0E0E0' }} className="stats-row">
          {[
            {
              n: '~15', d: 'average payroll corrections or errors per payroll periodP',
              insight: 'Payroll errors have a direct impact on millions of paychecks.',
              icon: <img src="/assets/icon 3 ppl.png" width="64" height="64" alt="" style={{ display: 'block' }} />
            },
            {
              n: '~1.2%', d: 'average payroll error rate per pay period',
              insight: 'Every mistake creates financial stress for real employees.',
              icon: (
                <img src="/assets/icon target.png" width="74" height="74" alt="" style={{ display: 'block' }} />
              )
            },
            {
              n: '~$291', d: 'average cost to resolve a payroll error',
              insight: 'Complexity grows with every pay type and policy variation.',
              icon: <img src="/assets/icon dollar.png" width="64" height="64" alt="" style={{ display: 'block' }} />
            },
          ].map(({ n, d, icon, insight }, i) => (
            <div key={n} style={{ padding: '3rem', borderRight: i < 2 ? '1px solid #E0E0E0' : 'none' }}>
              <div style={{ height: 80, display: 'flex', alignItems: 'flex-end', marginBottom: '0.75rem', color: '#000' }}>{icon}</div>
              <div style={{ fontFamily: HF, fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: '0.5rem' }}>{n}</div>
              <div style={{ fontFamily: BF, fontSize: 14, color: '#444', lineHeight: 1.6 }}>{d}</div>
            </div>
          ))}

        </div>
        <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '1rem', maxWidth: 720 }}>
            Payroll teams operate in a high-pressure environment where even small upstream issues can quickly compound across pay statements, approvals, deductions, and policy-driven workflows. Errors are common, expensive to resolve, and often discovered too late in the process.
          </p>

        {/* Role + Approach */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem 0 0' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Led the experience strategy and operating model for AI-assisted payroll workflows, partnering with product, engineering, payroll practitioners, and SMEs to define how issues are surfaced, prioritized, investigated, and resolved across high-volume payroll operations.
            </p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Approach</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
             Through collaboration with payroll practitioners, SMEs, product, and engineering teams, we mapped where payroll issues entered the process and how delays compounded as payroll moved toward commit. We shifted the experience from reactive issue management to a more proactive model that helps teams identify, investigate, and resolve issues earlier in the workflow.
            </p>
          </div>

          {/* Reactive → proactive diagram */}
          <figure style={{ margin: '0', padding: 0, maxWidth: 740 }}>
            <div style={{ border: '1px solid #E5E7EB', background: '#fff', padding: '1rem 0 0' }}>
              <p style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: '0 1.5rem 0.75rem' }}>Framework · Payroll Management Model</p>
              <img
                src="/assets/From%20reactive%20to%20proactive%20payroll%20management.png"
                alt="Diagram showing the shift from reactive to proactive payroll management"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </figure>
        </div>

        {/* ── LAYER 1 ── */}
        <div style={{ padding: '5rem 0 0' }}>
          <MomentHead num="01" tag="Key Moment" title="Shifting Accountability Upstream" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Managers are often the first source of payroll risk, especially during time entry and approval workflows where issues can quietly move downstream into payroll processing. We introduced guidance directly into the timecard experience to help managers identify issues earlier, understand what needs attention, and resolve problems before they impact payroll.
            </p>
            <HiddenComplexity text="Although the workflow appears simple, payroll operations involve significant variability across policies, approvals, pay types, employee scenarios, and legacy constraints. Early exploration showed that many resolution paths still required human judgment, leading us toward a guided human-in-the-loop approach where AI surfaces issues and recommends actions while managers remain responsible for final decisions." />
          </div>
          <VideoFigure src="/assets/Timecard issues.mp4" caption="AI helps shift issue resolution upstream, enabling managers to correct errors before they impact payroll." />
          <Insight text="Simplicity in high-stakes systems requires absorbing complexity behind the scenes." />
        </div>

        {/* ── LAYER 2 ── */}
        <div style={{ padding: '5rem 0 0' }}>
          <MomentHead num="02" tag="Key Moment" title="Prioritizing Payroll Issues" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Even with upstream improvements, payroll practitioners still need to identify and resolve discrepancies before payroll is committed. Under tight timelines, important issues were often difficult to distinguish from routine change.
            </p>
             <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, marginTop: '1rem', fontWeight: 300 }}>
              We designed the experience to surface meaningful payroll variance in context, helping practitioners understand what changed, where to investigate, and what required action before payroll was finalized.
            </p>
            <Why text="The value is not finding more issues. It is helping payroll teams recognize which ones require action before they impact employees." />
          </div>
          <VideoFigure src="/assets/Pay Anomalies.mp4" caption="AI surfaces and prioritizes payroll risk, enabling teams to act before issues impact outcomes." />
        </div>

        {/* ── LAYER 3 ── */}
        <div style={{ padding: '5rem 0', borderBottom: '1px solid #E0E0E0' }}>
          <MomentHead num="03" tag="Key Moment" title="Understanding Payroll Changes" />
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>
              Finding a variance is only the first step. Payroll practitioners also need to understand why it happened and whether it requires action.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, marginTop: '1rem', fontWeight: 300 }}>
              We shifted the experience from detection to explanation, helping teams connect payroll changes across timesheets, employee records, prior pay cycles, and policy-driven workflows so issues could be resolved faster and with greater accuracy.
            </p>
            <Why text="The experience does not just surface change. It helps teams understand what changed, why it changed, and whether it matters." />
          </div>
          <VideoFigure src="/assets/Paycheck-summary.mp4" caption="AI explains why changes occurred, connecting data across systems to enable faster and more accurate resolution." />
          <Insight text="Payroll is not just processing pay. It is creating confidence at scale." />
        </div>

      </section>

      {/* CS2 Impact */}
      <div className="dark-section" style={{ background: '#000', padding: '5vw var(--mg)' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white', margin: '0 0 1rem' }}>Impact</p>
        <p style={{ color: '#fff', fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>
          This work helped payroll teams identify issues earlier, prioritize what required action, and resolve payroll discrepancies with greater speed and clarity before payroll was committed.
          </p>
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: '0' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="stats-row">
          {[
            {
              big: '22%', mid: 'Investigation time reduced', sub: 'from ~3.5 hrs to ~2.4 hrs per payroll run',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="14" cy="14" r="11"/>
                  <polyline points="14 8 14 14 18 16"/>
                </svg>
              )
            },
            {
              big: '50%', mid: 'Faster resolution', sub: 'for managers',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 8 16 14 16 12 25 20 12 14 12 16 3"/>
                </svg>
              )
            },
            {
              big: 'Improved', mid: 'Payroll confidence before commit', sub: 'before payroll commit',
              icon: (
                <svg width="48" height="48" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3L4 7v8c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V7L14 3z"/>
                  <polyline points="10 14 13 17 18 11"/>
                </svg>
              )
            },
          ].map(({ big, mid, sub, icon }, i) => (
            <div key={big} style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', paddingRight: i < 2 ? '3rem' : 0, paddingLeft: i > 0 ? '3rem' : 0, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
              <div style={{ height: 64, display: 'flex', alignItems: 'flex-end', marginBottom: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>{icon}</div>
              <div style={{ fontFamily: HF, fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'white', lineHeight: 0.9, marginBottom: '0.625rem' }}>{big}</div>
              <div style={{ fontFamily: BF, fontSize: 14, color: 'rgba(255,255,255,0.87)' }}>{mid}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════
    HOW FRAMEWORK — Think, Shape, Realize
══════════════════════════════════════════ */
export function HowFramework() {
  return (
    <>
      <section id="how" style={{ padding: '6vw var(--mg) 0', borderTop: '1px solid #E0E0E0' }}>
        <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Framework</span>
        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0' }}>
          How I Work:<br />Think, Shape, Realize
        </h2>

        <p style={{ fontFamily: BF, fontSize: 'clamp(1rem, 1.75vw, 1.25rem)', lineHeight: 1.75, fontWeight: 300, maxWidth: 680, padding: '2rem 0' }}>
          As AI began reshaping how products are built, I focused on helping teams adapt how they think, collaborate, and make decisions. Think, Shape, Realize became a shared operating model that aligned UX, product, and engineering around faster exploration, clearer system thinking, and more scalable execution.
        </p>

        {/* Three phases */}
          <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Operating Model</p>
          <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
            AI did not just change the product. It changed how teams explored ideas, made decisions, and moved work forward.
          </p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
            Think, Shape, Realize gave design, product, and engineering a shared way to test assumptions early, shape workflows together, and build with greater speed and consistency.
          </p>
          </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #E0E0E0', borderBottom: '1px solid #E0E0E0' }} className="stats-row">
          {[
            {
              phase: 'Think', sub: 'Explore ideas quickly.',
              desc: 'Use AI to test assumptions and surface risk early.',
              icon: <img src="/assets/icon-think.png" width="84" height="84" alt="" style={{ display: 'block' }} />
            },
            {
              phase: 'Shape', sub: 'Define how the system works.',
              desc: 'Clarify how people, agents, and data operate together.',
              icon: <img src="/assets/icon-shape.png" width="84" height="84" alt="" style={{ display: 'block' }} />
            },
            {
              phase: 'Realize', sub: 'Deliver and scale.',
              desc: 'Turn systems into outcomes teams can extend over time.',
              icon: <img src="/assets/icon-realize.png" width="84" height="84" alt="" style={{ display: 'block' }} />
            },
          ].map(({ phase, sub, desc, icon }, i) => (
            <div key={phase} style={{ padding: '3rem', borderRight: i < 2 ? '1px solid rgba(0,0,0,0.15)' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '0.75rem' }}>
                {icon}
                <h3 style={{ fontFamily: HF, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#000', lineHeight: 1, margin: 0, letterSpacing: '0.02em' }}>{phase}</h3>
              </div>
              <p style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.65)', marginBottom: '0.75rem' }}>{sub}</p>
              <p style={{ fontFamily: BF, fontSize: 14, lineHeight: 1.75, color: '#444', fontWeight: 300, margin: 0 }}>{desc}</p>
            </div>

          ))}
        </div>

        {/* Scaling + Deterministic AI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0', borderBottom: '1px solid #E0E0E0', maxWidth: 720 }}>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Scaling the Capability</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
              Scaling AI required more than new features. Teams needed shared ways to explore ideas, evaluate outputs, and design systems consistently across product, UX, and engineering.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
              We introduced operating models, structured learning, and reusable frameworks that helped teams move from isolated experimentation toward more intentional and scalable ways of working.
            </p>
            </div>
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Enabling Deterministic AI in Builder Workflows</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
              Early AI-generated experiences were fast, but inconsistent and difficult to scale. We shifted from prompt-driven experimentation toward more structured approaches that defined patterns, interaction rules, constraints, and reusable decision models.
            </p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
              This helped teams move beyond one-off outputs and build AI-assisted workflows that were more reliable, repeatable, and easier to evolve over time.
            </p>
             </div>
        </div>
      </section>

      {/* Final Thought */}
      <div style={{ background: '#fff', padding: '5vw var(--mg)' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', marginBottom: '1rem' }}>Final Thought</p>
        <p style={{ fontFamily: HF, fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: '#000', lineHeight: 1.05, letterSpacing: '0.01em', maxWidth: 900 }}>
          The most critical systems are often invisible when they work well. Payroll is one of those systems. Across this work, AI was never the goal. The goal was helping people make better decisions and manage complex processes with greater clarity and confidence.
        </p>
      </div>
    </>
  )
}
