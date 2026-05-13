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
    MT1 — MTV University
══════════════════════════════════════════ */
export function MT1MTV() {
  return (
    <>
      {/* ── MT1: MTV University ── */}
      <section id="mt1" style={{ padding: '6vw var(--mg) 0' }}>
        <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 01</span>
        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          MTV University<br />Building a Distributed Publishing<br />Platform for the Next Generation<br />of Journalists
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Overview</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Before creator platforms became mainstream, college journalism was already highly participatory, decentralized, and deeply community-driven. Thousands of student journalists were producing meaningful work across independent campus publications, but the infrastructure supporting them was fragmented, inconsistent, and largely disconnected from broader digital audiences.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>MTV University transformed 600+ college publications into a connected digital publishing ecosystem, giving student writers, editors, and creators the tools to publish, distribute, and amplify their work at scale.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The project was not simply about modernizing student newspapers. It was about building infrastructure for a new generation of digital creators.</p>
          </div>
        </div>
        <figure style={{ margin: '2.5rem 0 0', padding: 0, maxWidth: 740 }}>
          <div style={{ border: '1px solid #E5E7EB', background: '#fff', padding: '1rem 0 0' }}>
            <p style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: '0 1.5rem 0.75rem' }}>CollegePublisher Platform</p>
            <img src="/assets/CollegePublisher 5 — publishing platform and multi-site architecture.png" alt="CollegePublisher 5: publishing platform and multi-site architecture" style={{ width: '100%', display: 'block' }} />
          </div>
          <figcaption style={{ fontFamily: MF, fontSize: 11, color: '#666', marginTop: '0.75rem', lineHeight: 1.6, borderLeft: '2px solid #000', paddingLeft: '0.75rem' }}>
            Shared publishing infrastructure supporting hundreds of student publications across a connected media network.
          </figcaption>
        </figure>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>The Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>College publications operated independently with different workflows, editorial structures, technical capabilities, and publishing standards. Many relied on basic HTML sites, PDF uploads, or inconsistent publishing tools that created friction for writers and limited audience reach.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The opportunity was to create a unified publishing platform that could:</p>
            <Dots items={[
              'Support hundreds of independent organizations',
              'Simplify publishing for inexperienced users',
              'Preserve local editorial identity',
              'Enable cross-network content discovery',
              'Scale operationally across hundreds of campuses',
            ]} />
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The challenge was balancing standardization with authenticity.</p>
          </div>
        </div>
        <CaseImg src="/assets/Early front-end publishing templates and modular page systems.png" alt="Early front-end publishing templates and modular page systems" caption="Flexible front-end templates designed to support local editorial identity across different campus publications." />
      </section>

      <div style={{ padding: '3rem var(--mg) 0' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State</p>
        <Rule />
        {stats([
          { n: '600+',        d: 'independent campus publications operating across fragmented publishing systems' },
          { n: '2,400+',      d: 'student journalists and editors contributing across the network' },
          { n: 'Disconnected', d: 'publishing workflows, inconsistent templates, and limited audience reach' },
        ])}
      </div>

      <section style={{ padding: '3rem var(--mg) 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Led UX efforts focused on publishing workflows, editorial tooling, network discovery systems, CMS usability, front-end publishing templates, and scalable platform architecture across the ecosystem.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The work included:</p>
            <Dots items={[
              'CMS workflow design',
              'Editorial tooling',
              'Information architecture',
              'Discovery and aggregation systems',
              'Front-end template systems',
              'Platform strategy collaboration',
              'High-fidelity prototyping',
              'Publishing workflow simplification',
            ]} />
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Understanding the Environment</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Most publishing systems at the time assumed trained editorial staff and technically experienced users. Student contributors often had neither.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The challenge was not simply designing a CMS. It was designing a system that could help inexperienced creators successfully participate in digital publishing without requiring formal training.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>At the same time, each publication needed to maintain its own editorial identity and local culture. A platform that felt overly centralized or corporate would undermine authenticity.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The system needed to feel approachable enough for first-time contributors while remaining powerful enough for active editorial teams.</p>
          </div>
        </div>
        <Placeholder label="Existing publishing infrastructure and fragmented site ecosystem" caption="Hundreds of independent campus publications managed across distributed editorial structures and inconsistent publishing workflows." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="01" tag="Key Moment" title="Reimagining the Publishing Experience" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Traditional publishing systems created unnecessary friction for student contributors. Formatting workflows were complicated, publishing actions were unclear, and content structure depended heavily on editorial training.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We redesigned the publishing experience around guided workflows that simplified contribution while preserving editorial flexibility.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The experience emphasized:</p>
          <Dots items={[
            'Inline formatting guidance',
            'Simplified publishing actions',
            'Structured editorial workflows',
            'Consistent output across publications',
            'Faster contribution with minimal training',
          ]} />
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The goal was lowering the barrier to participation.</p>
          <Why text="A publishing platform succeeds or fails based on participation. If contributing feels difficult, the network stops growing. The most effective creator systems reduce operational friction without reducing creative ownership." />
        </div>
        <Placeholder label="CollegePublisher administrative workflows and editorial tooling" caption="Custom publishing workflows layered on top of enterprise publishing infrastructure to simplify contribution and site management." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="02" tag="Key Moment" title="Preserving Local Identity at Scale" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Each publication wanted control over its own voice, branding, and editorial structure. A system that forced uniformity would fail culturally, even if it succeeded technically.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We designed a shared platform architecture that allowed:</p>
          <Dots items={[
            'Local branding flexibility',
            'Configurable layouts',
            'Shared infrastructure',
            'Consistent publishing standards',
            'Independent editorial ownership',
          ]} />
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The result was a scalable platform that still felt local.</p>
          <Why text="Platform systems only scale when contributors feel ownership. Preserving identity was just as important as operational efficiency. The challenge was not building one publication. It was building infrastructure for hundreds of them." />
        </div>
        <CaseImg src="/assets/Modular front-end templates and configurable content layouts.png" alt="Modular front-end templates and configurable content layouts" caption="Shared design patterns supporting flexible layouts, editorial variation, and local publication branding." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0', borderBottom: '1px solid #E0E0E0' }}>
        <MomentHead num="03" tag="Key Moment" title="Building Cross-Network Discovery" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>One of the largest challenges was visibility. Strong journalism produced at one campus often remained invisible beyond that institution.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We designed a discovery layer that surfaced relevant stories across the entire network based on topic, editorial quality, and audience interest.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The system introduced:</p>
          <Dots items={[
            'Cross-publication content surfacing',
            'Topic-driven discovery',
            'Shared visibility across campuses',
            'Editorial amplification opportunities',
            'Network-level engagement signals',
          ]} />
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>This transformed the platform from isolated campus publications into a connected media ecosystem.</p>
          <Why text="Distribution is part of publishing. A story only reaches its potential when it can move beyond its original audience. The platform created network effects that increased visibility for both writers and publications." />
        </div>
        <Placeholder label="Cross-campus publishing network and connected editorial ecosystem" caption="Shared publishing infrastructure connected student journalism across hundreds of campuses into a unified discovery network." darkCaption />
      </section>

      {impact([
        { big: '600+',    mid: 'college publications operating on a unified publishing platform' },
        { big: '2,400+',  mid: 'student journalists actively publishing across the ecosystem' },
        { big: '2M+', mid: 'monthly student content impressions across the network' },
      ])}
      <Reflection text="MTV University reinforced a lesson that continues throughout much of my work today: the most powerful digital systems are built around participation. Long before creator platforms became mainstream, the platform explored ideas that now define modern digital ecosystems: publishing, discovery, amplification, and network-driven engagement at scale." />
    </>
  )
}

/* ══════════════════════════════════════════
    MT3 — CBS Local
══════════════════════════════════════════ */
export function MT3CBS() {
  return (
    <>
      {/* ── MT3: CBS Local ── */}
      <section id="mt3" style={{ padding: '6vw var(--mg) 0' }}>
        <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 02</span>
        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          CBS Local<br />Transforming Broadcast Media<br />into Unified Local<br />Digital Ecosystems
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Overview</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Local media was undergoing a massive behavioral shift. Audiences were no longer consuming news through scheduled broadcasts or desktop homepages. They were moving fluidly between mobile devices, streaming video, live radio, alerts, social feeds, and real-time coverage throughout the day.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>At the same time, CBS operated a fragmented collection of television, radio, sports, and local digital properties that evolved independently across markets over many years.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The challenge was not simply redesigning local news websites. It was transforming CBS from a collection of disconnected broadcast properties into unified local digital ecosystems capable of supporting modern publishing, streaming, and real-time audience engagement.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The initiative began with CBS New York and later expanded across CBS markets nationwide.</p>
          </div>
        </div>
        <CaseImg src="/assets/CBS Local homepage ecosystem and responsive article experiences.png" alt="CBS Local homepage ecosystem and responsive article experiences" caption="Unified local city portals bringing together news, sports, video, radio, and live streaming into a connected digital experience." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>The Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Local television stations, radio brands, sports properties, and digital teams all operated through separate systems, workflows, and publishing models.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>Audiences experienced:</p>
            <Dots items={[
              'Disconnected local experiences',
              'Inconsistent mobile workflows',
              'Fragmented streaming experiences',
              'Duplicate publishing operations',
              'Siloed content across TV, radio, and digital',
              'Desktop-first article and homepage systems',
            ]} />
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>At the same time, newsroom teams needed faster publishing workflows capable of supporting live updates, breaking news, streaming media, and mobile audiences.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The opportunity was to create a unified publishing and streaming platform that could modernize CBS local media operations while preserving the identity and trust of each market.</p>
          </div>
        </div>
        <figure style={{ margin: '2.5rem 0 0', padding: 0, maxWidth: 740 }}>
          <div style={{ border: '1px solid #E5E7EB', background: '#fff', padding: '1rem 0 0' }}>
            <p style={{ fontFamily: MF, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: '0 1.5rem 0.75rem' }}>Local Media Ecosystem — Legacy State</p>
            <img src="/assets/Legacy fragmented local media workflows and disconnected properties.png" alt="Legacy fragmented local media workflows and disconnected properties" style={{ width: '100%', display: 'block' }} />
          </div>
          <figcaption style={{ fontFamily: MF, fontSize: 11, lineHeight: 1.6, color: '#666', paddingTop: '0.75rem' }}>Prior to convergence, television, radio, streaming, and digital publishing experiences operated independently across markets.</figcaption>
        </figure>
      </section>

      <div style={{ padding: '3rem var(--mg) 0' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State</p>
        <Rule />
        {stats([
          { n: '100+',        d: 'local television, radio, sports, and digital properties operating across CBS markets' },
          { n: 'Millions',    d: 'monthly users consuming local news, sports, audio, and video' },
          { n: 'Disconnected', d: 'television, radio, streaming, and publishing workflows across markets' },
        ])}
      </div>

      <section style={{ padding: '3rem var(--mg) 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Led product and UX efforts across CBS Local, managing a small cross-functional product team of approximately nine people responsible for helping define the future of CBS local digital media experiences.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The work included:</p>
            <Dots items={[
              'Platform strategy',
              'Product leadership',
              'UX direction',
              'Cross-market publishing systems',
              'Mobile-first article experiences',
              'Streaming audio and video integration',
              'WordPress platform partnership with Automattic',
              'Homepage systems and editorial tooling',
              'Cross-platform content architecture',
            ]} />
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The initiative began with CBS New York and later expanded into a scalable model used across additional CBS local markets.</p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Understanding the Environment</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Local media operates differently than national publishing organizations. Audiences move fluidly between breaking news, sports coverage, live broadcasts, radio programming, weather alerts, community events, and streaming audio and video.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>At the same time, internal editorial teams were managing separate workflows across television, radio, publishing, and streaming systems that were never originally designed to work together.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The challenge became designing a unified ecosystem capable of supporting real-time publishing, live streaming, mobile-first consumption, cross-market scalability, faster editorial workflows, and local brand identity.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The work became less about websites and more about operational convergence across media platforms.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="01" tag="Key Moment" title="Converging Television, Radio, and Digital" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Prior to the transformation, television content, radio programming, sports coverage, and local digital publishing largely existed as separate audience experiences.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We explored how local portals could unify these previously disconnected media systems into cohesive city-based digital ecosystems.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The platform brought together:</p>
          <Dots items={[
            'Broadcast news content',
            'Streaming video',
            'Sports radio integration',
            'Local journalism',
            'Real-time publishing',
            'Audio streaming',
            'Cross-platform discovery',
          ]} />
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The experience shifted from isolated properties toward connected local media hubs.</p>
          <Why text="Audiences no longer think in channels. They move fluidly between formats, devices, and moments throughout the day. The future of local media depended on connecting experiences that historically operated separately." />
        </div>
        <Placeholder label="Unified Local Portal: News, Streaming Video, and Radio Experiences" caption="Local ecosystem experiences unified television, streaming, publishing, and audio into a single city-focused platform." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="02" tag="Key Moment" title="Rebuilding Publishing Around Real-Time Workflows" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Breaking news exposed the limitations of legacy publishing systems most clearly. Editorial teams needed to publish updates rapidly across web, mobile, streaming, and homepage surfaces while coordinating with broadcast operations in real time.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We redesigned workflows and publishing systems around:</p>
          <Dots items={[
            'Faster editorial publishing',
            'Real-time homepage management',
            'Flexible modular content systems',
            'Mobile-first publishing',
            'Live update workflows',
            'Streaming media integration',
          ]} />
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The platform needed to support both operational speed and editorial flexibility.</p>
          <Why text="During breaking news moments, platform friction directly impacts audience trust. The system needed to disappear behind the workflow so editorial teams could focus on delivering information quickly and reliably." />
        </div>
        <Placeholder label="Breaking news homepage systems and modular publishing architecture" caption="Modular publishing systems supported rapid homepage updates, live coverage, and real-time editorial coordination." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0', borderBottom: '1px solid #E0E0E0' }}>
        <MomentHead num="03" tag="Key Moment" title="Building a Scalable Multi-Market Platform" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>One of the largest challenges was creating a shared platform architecture capable of supporting dozens of local markets without making every experience feel identical.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>Working closely with Automattic and leveraging WordPress as a foundation, we helped build a scalable publishing ecosystem that balanced:</p>
          <Dots items={[
            'Shared infrastructure',
            'Local editorial flexibility',
            'Common interaction patterns',
            'Configurable homepage systems',
            'Shared streaming architecture',
            'Cross-market operational consistency',
          ]} />
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The result was a platform system capable of scaling across CBS markets while preserving local identity.</p>
          <Why text="Transformation at scale is not about creating a single website. It is about creating systems that allow many organizations to move together without losing what makes them unique." />
        </div>
        <Placeholder label="Cross-market homepage variations and shared WordPress publishing platform" caption="Shared platform architecture enabled scalable publishing across CBS markets while preserving local identity and editorial flexibility." darkCaption />
      </section>

      {impact([
        { big: '100+',      mid: 'CBS local media properties unified into a scalable digital platform ecosystem' },
        { big: '50M+',      mid: 'monthly users supported through improved SEO, publishing, and mobile experiences' },
        { big: 'Converged', mid: 'television, radio, publishing, and streaming unified into connected local portals' },
      ])}
      <Reflection text="CBS Local became less about redesigning news websites and more about helping a legacy broadcast organization transition into a connected digital media ecosystem. The work unified publishing, streaming, broadcast, and local audience experiences into scalable operational systems capable of supporting the next era of local media consumption. It reinforced a lesson that continued throughout much of my later work: large-scale transformation succeeds when systems, workflows, technology, and human operations evolve together rather than independently." />
    </>
  )
}

/* ══════════════════════════════════════════
    MT4 — Audio Roadshow
══════════════════════════════════════════ */
export function MT4Audio() {
  return (
    <>
      {/* ── MT4: Audio Roadshow ── */}
      <section id="mt4" style={{ padding: '6vw var(--mg) 0' }}>
        <span style={{ fontFamily: MF, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Case Study 03</span>
        <h2 style={{ fontFamily: HF, fontSize: 'clamp(3rem, 8vw, 7.5rem)', lineHeight: 0.92, letterSpacing: '0.01em', margin: '1rem 0 0', maxWidth: '95%' }}>
          Audio Roadshow<br />Transforming Talk Radio<br />into a Real-Time<br />Participatory Media Platform
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>Overview</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Traditional talk radio was built around one-way broadcasting. Hosts spoke. Audiences listened. Participation was largely limited to phone calls, busy signals, and disconnected web forums.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>Audio Roadshow explored how live radio could evolve into a connected real-time digital experience where audiences actively participated in broadcasts across mobile, web, and studio systems.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The platform connected live radio broadcasts, producer workflows, audience participation, mobile engagement, polling and sentiment, audio submissions, and real-time show management into a single ecosystem.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The work became less about building a companion app and more about designing a connected ecosystem where listeners, producers, and hosts could interact together during live broadcasts.</p>
          </div>
        </div>
        <CaseImg src="/assets/Audio Roadshow mobile application concepts.png" alt="Audio Roadshow mobile application concepts" caption="Mobile experiences allowed listeners to follow live shows, participate in polls, react to guests, and submit audio clips directly into broadcasts." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '3rem 0 2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>The Opportunity</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Talk radio audiences were highly engaged, but the participation model had barely evolved beyond traditional call-in workflows.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>Listeners struggled to know who was on-air, follow show topics in real time, participate during busy broadcasts, share opinions quickly, or engage beyond phone calls.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>At the same time, producers managed live broadcasts through fragmented operational workflows involving guest scheduling, topic management, poll moderation, audio screening, broadcast timing, and listener participation.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The opportunity was to create a connected real-time platform that modernized both audience participation experiences and producer operational tooling, without disrupting the speed and unpredictability of live radio.</p>
          </div>
        </div>
      </section>

      <div style={{ padding: '3rem var(--mg) 0' }}>
        <p style={{ fontFamily: MF, fontSize: 16, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000', margin: '0 0 1rem' }}>Current State</p>
        <Rule />
        {stats([
          { n: 'Phone-driven', d: 'Audience participation relied on calls, SMS, and manual screening' },
          { n: 'Delayed',      d: 'Listener feedback disconnected from live broadcast workflows' },
          { n: 'Manual',       d: 'Producers managed audience interaction across fragmented tools' },
        ])}
      </div>

      <section style={{ padding: '3rem var(--mg) 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ maxWidth: 720 }}>
            <Label>My Role</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Led product development, UX strategy, operational workflow design, and creative direction across both audience-facing and studio-facing experiences.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The work included:</p>
            <Dots items={[
              'Mobile application design',
              'Real-time audience participation systems',
              'Producer workflow tooling',
              'Polling and sentiment systems',
              'Audio submission experiences',
              'Web integration',
              'Show scheduling workflows',
              'Guest management systems',
              'Broadcast moderation tooling',
              'Cross-platform experience strategy',
            ]} />
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The platform required balancing the needs of listeners, hosts, producers, broadcast operations, and live radio environments.</p>
          </div>
          <div style={{ maxWidth: 720 }}>
            <Label>Understanding the Environment</Label>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Before designing the platform, we spent time directly inside radio studios observing how live broadcasts actually operated, including how producers coordinated segments, how guests transitioned on and off-air, how callers were screened, and how topics evolved under time pressure.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The studio environment moved extremely fast. Producers were simultaneously managing live timing, guest coordination, poll moderation, topic sequencing, audience participation, commercial breaks, and broadcast coordination.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>At the same time, listeners increasingly expected more direct participation and digital engagement beyond passive listening.</p>
            <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>This led to a dual-system approach: operational studio tooling for producers and real-time participation experiences for audiences.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="01" tag="Key Moment" title="Designing Studio Operations for Live Broadcasts" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Most people only see the broadcast itself. Behind the scenes, producers are coordinating an enormous amount of operational activity in real time.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>We designed a custom operational system that allowed producers to manage live schedules, transition guests on and off-air, moderate polls, review audience sentiment, push updates to mobile devices, manage listener audio submissions, and coordinate show topics, all during live broadcasts.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The interface needed to feel fast, lightweight, highly scannable, and operational under pressure.</p>
          <Why text="Participatory media experiences only work when operational systems behind the scenes can keep up with the speed of live production. The strongest audience experiences are powered by invisible operational infrastructure." />
        </div>
        <CaseImg src="/assets/Producer schedule management.png" alt="Producer Admin Interfaces: Scheduling, Guests, and Moderation" caption="Backend workflow systems gave producers real-time control over schedules, guests, polls, and audience participation during live broadcasts." />
      </section>

      <section style={{ padding: '5rem var(--mg) 0' }}>
        <MomentHead num="02" tag="Key Moment" title="Bringing Listeners Into the Broadcast" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>The mobile experience transformed audiences from passive listeners into active participants.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>Listeners could follow live shows in real time, view current topics and guests, vote on discussions, respond to live polls, and submit audio responses directly from their mobile devices, with selected clips played on-air.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>The system also allowed producers to push real-time information directly into the app: current hosts, live topics, upcoming guests, active questions, and audience prompts, creating a continuous feedback loop between the studio and the audience.</p>
          <Why text="At the time, very few broadcast platforms allowed audiences to actively participate in live media experiences across both mobile and web ecosystems. Audio Roadshow explored participation models years before these interaction patterns became common across creator platforms, streaming ecosystems, and social audio products." />
        </div>
      </section>

      <section style={{ padding: '5rem var(--mg) 0', borderBottom: '1px solid #E0E0E0' }}>
        <MomentHead num="03" tag="Key Moment" title="Visualizing Audience Sentiment Live" />
        <div style={{ maxWidth: 720 }}>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>One of the more unique aspects of the platform was surfacing live audience sentiment directly into the broadcast workflow. Listeners could vote on guests, respond to polls in real time, influence discussion visibility, and participate asynchronously during broadcasts.</p>
          <p style={{ fontFamily: BF, fontSize: 15, lineHeight: 1.8, fontWeight: 300, marginTop: '0.75rem' }}>Producers and hosts could immediately see audience reaction while shows were live on-air, connecting broadcast content, audience reaction, polling systems, listener participation, mobile engagement, and studio workflows into a single real-time ecosystem.</p>
          <Why text="The work explored early forms of second-screen interaction and participatory media years before these behaviors became mainstream across modern streaming and creator ecosystems." />
        </div>
        <CaseImg src="/assets/audience participation.png" alt="Live poll results, audience sentiment, and participation dashboards" caption="Real-time polling and audience sentiment systems allowed producers and hosts to react to listener engagement during live broadcasts." />
      </section>

      {impact([
        { big: 'Real-time',      mid: 'Audience audio and poll responses integrated into live broadcasts' },
        { big: 'Multi-platform', mid: 'Mobile, web, and broadcast experiences connected into one system' },
        { big: 'Producer-first', mid: 'Moderation and publishing workflows streamlined through unified tooling' },
      ])}
      <Reflection text="Audio Roadshow explored how broadcast media could evolve from one-way publishing into participatory real-time systems where audiences, producers, and live programming operated as part of the same connected experience." />
    </>
  )
}
