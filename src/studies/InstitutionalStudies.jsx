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
    IS1 — Marquee Trader
══════════════════════════════════════════ */
export function IS1Marquee() {
  return (
    <>
      {/* ── IS1: Marquee Trader ── */}
      <section id="is1" style={{ padding: '6vw var(--mg) 0' }}>
        <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 01</span>
        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          Marquee Trader<br />Modernizing Institutional<br />Trading Workflows
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Overview</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Institutional trading environments are built around speed, precision, and trust. At Goldman Sachs, traders relied on a collection of disconnected systems, spreadsheets, and legacy workflows that were designed for a different era of markets. Critical information was fragmented across tools, creating unnecessary friction during moments where seconds mattered.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>Marquee Trader was designed to modernize the trading experience by bringing execution, market context, and risk visibility into a unified workflow optimized for how institutional traders actually work.</p>
          </div>
        </div>
        <CaseImg src="/assets/Marquee Trader — unified trading platform.PNG" alt="Marquee Trader: unified trading platform" caption="Full-width hero view of the Marquee Trader execution environment." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>The Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Trading systems evolve through years of incremental additions, creating fragmented workflows that become difficult to navigate under pressure. We rethought how traders interact with information during live execution, reducing unnecessary context switching while bringing execution, market context, and risk visibility into a more unified workflow.</p>
          </div>
        </div>
        <CaseImg src="/assets/Legacy workflow — fragmented systems.jpeg" alt="Legacy workflow: fragmented systems" caption="Collage of disconnected execution surfaces and tools used prior to Marquee Trader." />
      </section>

      <div style={{ padding: '3rem var(--mg) 0' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State</p>
        <Rule />
        {stats([
          { n: '400+', d: 'Disconnected datasets influencing trading decisions' },
          { n: '5M+',  d: 'Daily pricing and risk calculations across fragmented workflows' },
          { n: '45+',  d: 'Trading and analytics tools used during active execution' },
        ])}
      </div>

      <section style={{ padding: '3rem var(--mg) 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Led UX efforts focused on trading workflows, execution experiences, and risk visibility across the platform. Partnered closely with traders, product leaders, and engineering teams to understand how institutional workflows operated in real market conditions and redesign fragmented execution flows into more unified, efficient experiences.</p>

          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Understanding the Environment</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Spending time directly with traders became one of the most important parts of the project. Trading floors operate at an intense pace where information changes constantly and attention is fragmented across multiple systems and streams of data.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We observed how traders moved between tools, where hesitation occurred, and how information gaps created uncertainty during execution. The work became less about visual modernization and more about reducing cognitive overhead during high-pressure moments.</p>
            </div>
        </div>
        <CaseImg src="/assets/Trading floor — research artifacts and workflow sketches.jpeg" alt="Trading floor: research artifacts and workflow sketches" caption="Observation sessions, workflow mapping, and research artifacts from trader shadowing." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="01" tag="Key Moment" title="Reimagining Order Entry" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Legacy order entry workflows required traders to navigate multiple disconnected screens to complete even straightforward transactions. Information was spread across windows, confirmations interrupted flow, and critical details were often separated from execution itself.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We redesigned the experience around a unified execution model that consolidated workflow steps into a single interaction surface.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The redesigned system emphasized:</p>
          <Dots items={[
            'Keyboard-first interaction patterns',
            'Faster execution flows',
            'Inline validation and feedback',
            'Reduced visual clutter',
            'Immediate contextual awareness',
          ]} />
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The focus was simplicity under pressure.</p>
          <Why text="Execution quality in institutional trading depends on speed and clarity. Every unnecessary interaction creates friction during moments where precision matters most. The best trading systems fade into the background, allowing traders to stay focused on decisions instead of the interface itself." />
        </div>
        <CaseImg src="/assets/Order entry — before and after workflow comparison.PNG" alt="Order entry: before and after workflow comparison" caption="Redesigned execution surface consolidating multi-screen workflows into a single keyboard-optimized panel." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="02" tag="Key Moment" title="Bringing Risk Into the Workflow" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Trading systems evolved through years of separate tools for execution, research, pricing, and risk management. Traders were forced to move between disconnected experiences to gather information, evaluate market conditions, and execute decisions under pressure.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>Marquee Trader brought these workflows closer together through a more unified execution environment built on OpenFin, reducing context switching and helping traders operate with greater speed and focus during live market activity.</p>
          <Why text="Risk systems are most effective when they operate in context. Information delivered too late, or separated from the workflow itself, loses value in fast-moving environments. The challenge was surfacing the right information at the moment it could influence a decision." />
        </div>
        <CaseImg src="/assets/Risk visualization — integrated dashboard UI.jpeg" alt="Risk visualization: integrated dashboard UI" caption="Real-time risk panel embedded within the execution workflow, replacing fragmented spreadsheet-based monitoring." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0', borderBottom: '1px solid #E0E0E0' }}>
        <MomentHead num="03" tag="Key Moment" title="Designing for High-Frequency Workflows" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Institutional trading interfaces are used for hours at a time in highly repetitive patterns. Over time, even small interaction inefficiencies create fatigue.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>To support this environment, we designed the platform around a desktop-style application architecture using OpenFin, enabling advanced window management, persistent workspace layouts, keyboard-driven interaction patterns, and faster movement between workflows during live trading activity.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The interface needed to feel:</p>
          <Dots items={['Fast', 'Predictable', 'Scannable', 'Efficient under pressure']} />
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>This was less about visual styling and more about operational performance.</p>
        </div>
        <CaseImg src="/assets/UI detail — dense data layouts and execution flow.jpeg" alt="UI detail: dense data layouts and execution flow" caption="Layout systems and interaction patterns designed for sustained high-frequency use." darkCaption />
      </section>

      {impact([
        { big: '20+',         mid: 'years of market and pricing data made available' },
        { big: 'API 1st',     mid: 'platform made available to clients' },
        { big: '1 Unified',   mid: 'UX with research, analytics, execution, and risk visibility' },
      ])}
    </>
  )
}

/* ══════════════════════════════════════════
    IS2 — GS Now
══════════════════════════════════════════ */
export function IS2GSNow() {
  return (
    <>
      {/* ── IS2: GS Now ── */}
      <section id="is2" style={{ padding: '6vw var(--mg) 0' }}>
        <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 02</span>
        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          GS Now<br />Making Institutional Research<br />Accessible Beyond the Terminal
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Overview</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Goldman Sachs produced some of the most valuable financial research in the market, but access to that information was still heavily tied to desktop terminals and static PDF workflows. Outside traditional trading environments, research became difficult to consume, navigate, and act on across the moments where clients actually needed it.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>GS Now explored how institutional intelligence could become more continuous, contextual, and accessible across mobile and web experiences designed around modern financial workflows.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The project was less about portability and more about transforming research from static publishing into a more adaptive intelligence system.</p>
          </div>
        </div>
        <CaseImg src="/assets/GS Now mobile concepts and streaming research feeds.png" alt="GS Now mobile concepts and streaming research feeds" caption="Mobile exploration concepts showing research, market commentary, and trading signals integrated into a continuous experience." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>The Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Institutional research platforms were historically designed around dense terminal environments optimized for highly specialized users. While powerful, these systems created friction outside desktop workflows, especially on mobile devices where long-form PDFs and static publishing models broke down quickly.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The opportunity was to modernize how research was surfaced, consumed, and navigated while preserving the rigor and credibility expected from Goldman Sachs research products.</p>
          </div>
        </div>
        <CaseImg src="/assets/Legacy mobile research experience.png" alt="Legacy mobile research experience" caption="Static PDF research workflows that became difficult to navigate and consume on mobile devices." />
      </section>

      <div style={{ padding: '3rem var(--mg) 0' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State</p>
        <Rule />
        {stats([
          { n: '180+',         d: 'research publications produced monthly across sectors and markets' },
          { n: '1,000+',       d: 'institutional clients consuming research globally' },
          { n: 'Desktop-Only', d: 'research workflows with limited mobile accessibility' },
        ])}
      </div>

      <section style={{ padding: '3rem var(--mg) 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Led UX efforts focused on research discovery, mobile experience strategy, navigation systems, alerts, streaming commentary, and cross-platform experience design across web and mobile.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The work included research workflow analysis, information architecture, high-fidelity product vision, mobile interaction concepts, and close collaboration with product and engineering teams.</p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Understanding the Environment</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Institutional research consumption is highly contextual. Portfolio managers, analysts, traders, and executives all approach the same information differently depending on market conditions and time pressure.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We observed how users moved between devices, where static research workflows created friction, and how traditional chronological publishing models made it difficult to surface relevant intelligence quickly.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The challenge became designing a system that could adapt across devices while helping users move from information overload toward faster situational awareness.</p>
          </div>
        </div>
        <CaseImg src="/assets/GS Now principles and early product direction.jpeg" alt="GS Now principles and early product direction" caption="Workshop artifacts exploring the principles, behaviors, and qualities the experience should immediately convey." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="01" tag="Key Moment" title="Rethinking Research Discovery" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Traditional research systems prioritized publication order over contextual relevance. Users often had to manually scan dense streams of information to find research connected to sectors, market movement, analyst coverage, or portfolio interests.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We explored more adaptive discovery models that brought streaming commentary, market updates, and institutional research closer together in a single experience.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The experience emphasized:</p>
          <Dots items={[
            'Continuous market awareness',
            'Research connected to market context',
            'Faster scanning and prioritization',
            'Personalized feeds and follow models',
            'Cross-device continuity',
          ]} />
          <Why text="Research only creates value when people can find and act on it quickly. In fast-moving markets, discoverability becomes just as important as the research itself." />
        </div>
        <CaseImg src="/assets/Streaming commentary and personalized feeds.jpeg" alt="Streaming commentary and personalized feeds" caption="Institutional research, analyst commentary, and market signals surfaced together in a continuous mobile experience." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="02" tag="Key Moment" title="Designing for Mobile Consumption" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Institutional research was historically designed for desktop terminals and long-form reading environments. On mobile devices, that same content often became nearly unreadable.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>Rather than shrinking desktop workflows, we redesigned the experience around how financial professionals actually consume information throughout the day, quickly scanning updates between meetings, monitoring markets while traveling, and revisiting deeper research in shorter focused sessions.</p>
          <Why text="Mobile is not a smaller desktop experience. It is a different behavioral environment with different expectations, attention patterns, and workflows." />
        </div>
      </section>

      <section style={{ padding: '5rem var(--mg) 0', borderBottom: '1px solid #E0E0E0' }}>
        <MomentHead num="03" tag="Key Moment" title="Shaping Personalized Intelligence" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>One of the larger opportunities was moving beyond static publishing toward more personalized intelligence systems.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We explored how users could follow sectors, asset classes, analysts, and topics while shaping feeds around their own interests and workflows. Early concepts introduced configurable channels, personalized streams, and market-aware discovery patterns that adapted over time.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The goal was helping institutional clients spend less time searching for information and more time acting on it.</p>
          <Why text="Institutional users do not need more information. They need systems that help surface what matters within the context of their role, portfolio, and market activity." />
        </div>
        <CaseImg src="/assets/Wire flows — personalized channel architecture.jpeg" alt="Wire flows: personalized channel architecture" caption="Early mobile flow concepts and personalized channel architecture. Workflow explorations showing topic selection, configurable feeds, and adaptive research discovery concepts." darkCaption />
      </section>

      {impact([
        { big: 'Mobile-first',  mid: 'Research and market intelligence accessible anywhere' },
        { big: 'Personalized',  mid: 'Custom market feeds reduced information overload' },
        { big: 'Real-time',     mid: 'Institutional insights delivered during live market movement' },
      ])}
      <Reflection text="GS Now helped shift institutional research away from static publishing models toward more continuous, contextual, and mobile-aware intelligence experiences. The work became less about designing a research application and more about designing systems that help people stay connected to changing market conditions across devices, workflows, and moments throughout the day." />
    </>
  )
}

/* ══════════════════════════════════════════
    IS3 — QuickPoll
══════════════════════════════════════════ */
export function IS3QuickPoll() {
  return (
    <>
      {/* ── IS3: QuickPoll ── */}
      <section id="is3" style={{ padding: '6vw var(--mg) 0' }}>
        <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 03</span>
        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          QuickPoll<br />Turning Institutional Sentiment<br />Into Live Market Intelligence
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Overview</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Institutional market sentiment was traditionally gathered through fragmented workflows spread across email outreach, spreadsheets, Bloomberg chat, analyst calls, and manually compiled summaries. By the time insights were aggregated, market conditions had often already shifted.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>QuickPoll explored how institutional sentiment could become a more continuous and actionable intelligence system by collecting investor perspectives in near real-time and surfacing them through live visualization, expert overlays, and personalized insight experiences.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The project was less about surveys and more about helping clients understand how their market views compared against institutional consensus, historical patterns, and Goldman Sachs expertise.</p>
          </div>
        </div>
        <CaseImg src="/assets/QuickPoll concepts and workflow orchestration.jpeg" alt="QuickPoll concepts and workflow orchestration" caption="Early workflow explorations showing investor participation, insight delivery, and institutional sentiment aggregation across the experience." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>The Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Investor sentiment contains valuable market signals, but the workflows used to gather and interpret that information were slow, fragmented, and difficult to scale. Feedback was often trapped across disconnected systems, making it difficult to identify conviction, divergence, or changing market positioning quickly.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The opportunity was to transform institutional sentiment from a manual research exercise into a more dynamic intelligence platform that could visualize market conviction as responses were submitted.</p>
          </div>
        </div>
        <CaseImg src="/assets/QuickPoll homepage and survey overview.jpeg" alt="QuickPoll homepage and survey overview" caption="Live surveys, archived market views, and participation tracking brought institutional sentiment into a centralized experience." />
      </section>

      <div style={{ padding: '3rem var(--mg) 0' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State</p>
        <Rule />
        {stats([
          { n: '7 Days',     d: 'market sentiment gathered through manual outreach and spreadsheets' },
          { n: 'Fragmented', d: 'investor feedback spread across email, calls, PDFs, and Bloomberg chat' },
          { n: 'Limited',    d: 'institutional sentiment based on small anecdotal samples' },
        ])}
      </div>

      <section style={{ padding: '3rem var(--mg) 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Led UX efforts focused on institutional sentiment visualization, survey workflows, personalized insights, mobile participation experiences, and client comparison models across web and mobile platforms.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The work included workflow mapping, interaction design, data visualization concepts, insight delivery systems, and close collaboration with product and engineering teams.</p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Understanding the Environment</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Institutional market positioning changes quickly. Analysts, sales teams, portfolio managers, and clients all interpret market conditions differently depending on timing, exposure, and investment strategy.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We observed how difficult it was to gather timely investor sentiment at scale, how fragmented the participation workflows had become, and how existing reporting models made it difficult to surface meaningful insight quickly.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The challenge became designing a system that could continuously collect, visualize, and contextualize institutional sentiment while helping clients understand how their views compared against the broader market.</p>
          </div>
        </div>
        <CaseImg src="/assets/QuickPoll principles and early workflow thinking.jpeg" alt="QuickPoll principles and early workflow thinking" caption="Workshop explorations mapping investor participation flows, insight generation, and relationship management workflows." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="01" tag="Key Moment" title="Visualizing Market Conviction" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Traditional survey systems focused on collecting responses. QuickPoll focused on helping users interpret market positioning while responses were still being submitted.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We explored visualization models that surfaced consensus, divergence, historical comparison, and GS expert positioning in ways that felt immediate and actionable during changing market conditions.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The experience emphasized:</p>
          <Dots items={[
            'Consensus visibility',
            'GS expert comparison',
            'Historical trend analysis',
            'Real-time sentiment tracking',
            'Faster interpretation of market positioning',
          ]} />
          <Why text="Institutional users do not need raw survey results. They need systems that help them quickly understand conviction, divergence, and changing market sentiment." />
        </div>
        <CaseImg src="/assets/Market views dashboard.jpeg" alt="Market views dashboard" caption="Live market sentiment visualized through consensus comparison, historical tracking, and GS expert overlays." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="02" tag="Key Moment" title="Designing Personalized Insights" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>One of the larger opportunities was helping institutional clients understand where their market views differed from broader consensus.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We designed personalized insight experiences that surfaced outlier positions, historical sentiment shifts, and contextual expert commentary based on individual responses and market conditions.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The goal was making institutional sentiment feel more relevant, interpretable, and actionable for each participant.</p>
          <Why text="Market intelligence becomes more valuable when users can understand not only what the market believes, but how their own positioning compares against it." />
        </div>
        <CaseImg src="/assets/Personalized insights and mobile insight flows.jpeg" alt="Personalized insights and mobile insight flows" caption="Personalized insight experiences helped clients compare their market positioning against institutional consensus and GS expertise." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0', borderBottom: '1px solid #E0E0E0' }}>
        <MomentHead num="03" tag="Key Moment" title="Building Participation Loops" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Gathering institutional sentiment at scale required more than survey distribution. Participation depended on reminders, relationship management, follow-up workflows, and timely insight delivery.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We explored operational workflows that helped sales teams track participation, re-engage clients, monitor completion, and deliver personalized insight summaries back into the relationship cycle.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The experience connected participation, insight generation, and client engagement into a more continuous workflow.</p>
          <Why text="Institutional intelligence systems only work when participation becomes part of an ongoing relationship loop rather than a one-time transaction." />
        </div>
        <CaseImg src="/assets/Reminder workflow and participation management.jpeg" alt="Reminder workflow and participation management" caption="Participation tracking, reminders, and insight delivery workflows supported continuous institutional engagement." darkCaption />
      </section>

      {impact([
        { big: '1,000+',      mid: 'investors contributing institutional sentiment in near real-time' },
        { big: 'Live',        mid: 'market conviction visualized as responses were submitted' },
        { big: 'Web + Mobile', mid: 'institutional intelligence accessible across devices and workflows' },
      ])}
      <Reflection text="QuickPoll helped shift institutional sentiment gathering away from slow manual workflows toward more continuous and participatory intelligence systems. The work became less about collecting survey responses and more about helping institutional clients understand market positioning, conviction, and divergence as conditions evolved in real time." />
    </>
  )
}
