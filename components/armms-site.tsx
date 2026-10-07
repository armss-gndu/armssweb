'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  BrainCircuit,
  Cpu,
  MoveRight,
  Network,
  Settings2,
  Wrench,
  X,
} from 'lucide-react'
import { Footer, Navbar, useRevealOnScroll } from './chrome'
import { KickoffCountdown } from './kickoff-countdown'
import { buildfestUrl, joinUrl } from './bf-data'

const principles = [
  ['01', 'INNOVATE', 'Question the obvious and explore frontier tech.'],
  ['02', 'ENGINEER', 'Convert theoretical ideas into physical systems.'],
  ['03', 'BUILD', 'Learn through hands-on laboratory creation.'],
  ['04', 'EXPERIMENT', 'Test, iterate, debug, and perfect.'],
]

const techtales = [
  {
    episode: 'EPISODE 1',
    title: 'UAVs and AI-Driven Applications in Aerial Technologies',
    speaker: 'MD Azizul Islam Junaid',
    speakerRole: 'Drone Avionics & Embedded AI Specialist',
    date: '17.FEB.2026',
    time: '3:00 P.M. ONWARDS',
    venue: 'UIT Building, Room No. 426',
    image: '/techtales-ep1.png',
    summary:
      'An intensive session on modern aerial robotics, autonomous drone flight controllers, and edge computer vision integration.',
    topicsCovered: [
      'Multi-rotor aerodynamics, brushless motors, and electronic speed control (ESC) architectures.',
      'Interfacing onboard companion computers (Raspberry Pi / Jetson) with flight controllers (Pixhawk / ArduPilot).',
      'Running real-time YOLO object detection models for autonomous aerial target tracking.',
      'Autonomous waypoint navigation, mission planning, and optical-flow stabilization.',
      'Real-world case studies: Precision agriculture crop surveillance, search-and-rescue grids, and industrial infrastructure inspection.',
    ],
    keyTakeaways:
      'Students gained an end-to-end understanding of how to architect, solder, calibrate, and program an AI-assisted autonomous drone from scratch.',
  },
  {
    episode: 'EPISODE 2',
    title: 'Introduction to 3D Printing and Additive Manufacturing',
    speaker: 'Gavish Sharma',
    speakerRole: 'Additive Manufacturing & CAD Lead // ARMSS',
    date: '1.APRIL.2026',
    time: '1:00 P.M. ONWARDS',
    venue: 'UIT Building, Room No. 113',
    image: '/techtales-ep2.png',
    summary:
      'A deep-dive workshop exploring how additive manufacturing transforms digital CAD blueprints into functional physical engineering prototypes.',
    topicsCovered: [
      'Core FDM (Fused Deposition Modeling) mechanics: hotend thermodynamics, extruder calibration, and stepper precision.',
      'Design for Additive Manufacturing (DfAM) in Fusion 360 & SolidWorks: tolerances, wall thickness, and overhang design rules.',
      'Slicing software mastery (Cura / PrusaSlicer): infill geometries (gyroid vs cubic), layer heights, print speed, and support optimization.',
      'Filament material science: PLA for rapid prototyping, PETG for mechanical toughness, ABS for high-temp resistance, and TPU for flexible gaskets.',
      'Live troubleshooting: Bed leveling, warping prevention, stringing elimination, and post-processing techniques.',
    ],
    keyTakeaways:
      'Participants learned how to take an idea from a blank CAD canvas to a finished, dimensionally accurate 3D printed mechanical assembly.',
  },
  {
    episode: 'EPISODE 3',
    title: 'Cybersecurity Workshop',
    speaker: 'Harsh Dev',
    speakerRole: 'Cybersecurity Researcher & Systems Lead // ARMSS',
    date: '6.APRIL.2026',
    time: '1:00 P.M. ONWARDS',
    venue: 'UIT Building, Room No. 113',
    image: '/techtales-ep3.png',
    summary:
      'A practical, hands-on workshop on securing connected hardware, modern computer networks, and defensive cybersecurity practices.',
    topicsCovered: [
      'Fundamentals of network topology, packet inspection, and protocol analysis using Wireshark.',
      'Hardware & IoT security: vulnerabilities in unencrypted ESP32/ESP8266 telemetry, MQTT brokers, and default credentials.',
      'Understanding attack vectors: Man-in-the-Middle (MitM), packet spoofing, port scanning, and buffer overflows.',
      'Securing embedded firmware: Cryptographic handshakes, TLS/SSL certificate verification, and secure bootloaders.',
      'Live demonstration of ethical penetration testing, vulnerability discovery, and hardening techniques.',
    ],
    keyTakeaways:
      'Students learned essential penetration testing methodologies and how to build robust, secure-by-design IoT and software systems.',
  },
]

const domains = [
  { n: '01', title: 'ARTIFICIAL INTELLIGENCE', text: 'Models, computer vision, data, and intelligent edge systems.', icon: BrainCircuit, tech: ['AI', 'ML', 'DL'] },
  { n: '02', title: 'ROBOTICS', text: 'Sensors, control systems, autonomous machines, and kinematics.', icon: Cpu, tech: ['ROS 2', 'Gazebo', 'Kinematics', 'SLAM'] },
  { n: '03', title: 'MECHANICAL ENGINEERING', text: 'CAD, mechanisms, materials, simulation, and fabrication.', icon: Wrench, tech: ['SolidWorks', 'Fusion 360', 'CFD', '3D Printing'] },
  { n: '04', title: 'AUTOMATION & IoT', text: 'Embedded microcontrollers, telemetry, and smart sensor buses.', icon: Settings2, tech: ['ESP32', 'Arduino', 'Raspberry Pi', 'NVIDIA Jetson'] },
]

const domainDetails: Record<string, { description: string; tools: string; areas: string }> = {
  'ARTIFICIAL INTELLIGENCE': {
    description: 'Build systems that learn from data, interpret sensory feeds, and make autonomous decisions.',
    tools: 'Python, OpenCV, YOLO, PyTorch, Edge TPU, ONNX',
    areas: 'Generative AI · Autonomous Vision · Edge AI · NLP',
  },
  ROBOTICS: {
    description: 'Design machines that sense, calculate kinematics, and move through physical environments with precision.',
    tools: 'ROS 2 Humble, Gazebo, LiDAR, PID Controllers, Kinematics',
    areas: 'Autonomous Navigation · Mechatronics · Motion Planning',
  },
  'MECHANICAL ENGINEERING': {
    description: 'Transform raw physics into functional prototypes through additive manufacturing and stress analysis.',
    tools: 'Fusion 360, SolidWorks, 3D Printing, ANSYS, CNC Fabrication',
    areas: 'Robotic Chassis · Additive Manufacturing · Structural Simulation',
  },
  'AUTOMATION & IoT': {
    description: 'Bridge sensors and edge compute to create reactive, reliable, and distributed embedded ecosystems.',
    tools: 'ESP32, C/C++, FreeRTOS, MQTT, Node-RED, Embedded C',
    areas: 'Smart Hardware · Remote Telemetry · Industrial Control',
  },
}

const labHardware = [
  { id: 'HW-01', name: 'Raspberry Pi 5', category: 'Compute & Vision', specs: '8GB RAM · 2.4GHz · Dual 4K @60Hz', image: '/device-6.png' },
  { id: 'HW-02', name: 'Arduino Nano', category: 'Microcontrollers', specs: 'ATmega328P · 16MHz · 14 Digital I/O · Mini USB', image: '/device-1.png' },
  { id: 'HW-03', name: 'Soil Moisture Sensor', category: 'Sensors', specs: 'Capacitive Sensing · Analog Output · Environmental Monitoring', image: '/device-2.png' },
  { id: 'HW-04', name: 'I2C 1602 LCD Display', category: 'Telemetry Displays', specs: '16×2 Characters · I2C Serial Interface · Backlit', image: '/device-4.png' },
  { id: 'HW-05', name: 'ESP8266 Wi-Fi Module', category: 'Microcontrollers', specs: '802.11 b/g/n · Integrated TCP/IP Stack · GPIO Pins', image: '/device-5.png' },
  { id: 'HW-06', name: '0.96" OLED I2C Display', category: 'Telemetry Displays', specs: '128×64 Pixels · SSD1306 Driver · Fast Graphic Telemetry', image: '/device-7.png' },
  { id: 'HW-07', name: 'Pratham 3.0 3D Printer', category: 'Additive Fabrication', specs: '300×300×300mm Build Volume · Rapid Prototyping', image: '/device-3d-printer.png' },
]

const workshopGallery = {
  ros: { title: 'ROS Workshop', label: 'ROBOT OPERATING SYSTEM', images: ['/ros-workshop-classroom.jpeg', '/ros-workshop-presentation.jpeg', '/ros-workshop-group.jpeg', '/ros-workshop-award.jpeg'] },
  uav: { title: 'UAV Workshop', label: 'AERIAL SYSTEMS', images: ['/uav-workshop-team.jpeg', '/uav-workshop-soldering.jpeg', '/uav-workshop-build.jpeg', '/uav-workshop-drone.jpeg'] },
  devices: { title: '7 Days 7 Electronic Devices', label: 'ELECTRONIC DEVICES', images: ['/device-esp32.png', '/device-relay.png', '/device-esp8266.png', '/device-ultrasonic.png', '/device-arduino-nano.png', '/device-lcd-controller.png', '/device-soil-moisture.png'] },
}

const buildfestWinners: [string, string, string][] = [
  ['FIRST POSITION', 'Team Glare Guardians', 'Gurbani Kaur, Niyati Seth, Vanshika Marwaha, Akshdeep Kaur'],
  ['SECOND POSITION', 'Team Ecopioneers', 'Sehajpreet Kaur, Arshnoor Kaur, Harjee Singh, Ustat Chhabra'],
  ['THIRD POSITION', 'Team BloomTech', 'Devshi, Harmanpreet, Suhani'],
]

const team: { name: string; role: string }[] = [
  { name: 'Gavish Sharma', role: 'Head' },
  { name: 'Harsh Dev', role: 'Head' },
  { name: 'Mansimar Singh', role: 'Head Coordinator' },
  { name: 'Devshi Khehra', role: 'Head Coordinator' },
  { name: 'Suhani Sharma', role: 'Head Coordinator' },
  { name: 'Ridhi Gandhi', role: 'Head Coordinator' },
]

const faqs: [string, string][] = [
  ['Who can join ARMSS?', 'Any student curious about AI, robotics, mechanical engineering, or hardware prototyping can join. No prior experience is required; we teach and build together.'],
  ['Do I need my own hardware or tools?', 'No. ARMSS provides shared access to microcontrollers, sensors, 3D printers, soldering benches, and labs for workshops and project teams.'],
  ['How do I join a project or research track?', 'Attend our workshops, meet the leads, and let us know what you are curious about. We match you with active development pods.'],
]

function RadarLogo() {
  const [showGndu, setShowGndu] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setShowGndu((value) => !value), 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="radar-outer">
      <div className="radar-ring-pulse" />
      <div className="radar-ring-dash" />
      <div className="radar-inner">
        <div className="radar-sweep" />
        <div className="radar-scan-dot" />
        <div className="radar-mat" />
        <div className="radar-logo-ring" />
        <img
          src="/armss-emblem.png"
          alt="ARMSS emblem"
          className={`radar-logo ${showGndu ? 'radar-logo-hidden' : ''}`}
        />
        <img
          src="/gndu-logo-transparent.png"
          alt="GNDU logo"
          className={`radar-logo gndu ${showGndu ? '' : 'radar-logo-hidden'}`}
        />
        <div className="radar-cross-h" />
        <div className="radar-cross-v" />
      </div>
      <span className="radar-label">
        {showGndu ? 'GNDU — GURU NANAK DEV UNIVERSITY' : 'ARMSS — STUDENT SOCIETY'}
      </span>
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="hero-home">
      <div className="shell hero-grid">
        <div>
          <p className="eyebrow hero-eyebrow">ARMSS / GNDU AMRITSAR</p>
          <h1 className="hero-word">
            ARMSS<span className="hero-dot">.</span>
          </h1>
          <p className="hero-tag">
            Artificial Intelligence, Robotics &amp; Mechanical Student Society.
            <small>DEPT OF MECHANICAL ENGINEERING · GURU NANAK DEV UNIVERSITY</small>
          </p>
          <div className="hero-ctas">
            <Link href="/buildfest" className="btn btn-solid">
              BUILDFEST 2.0 <ArrowUpRight size={16} />
            </Link>
            <a href={joinUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              JOIN ARMSS <MoveRight size={16} />
            </a>
          </div>
          <KickoffCountdown variant="light" />
        </div>
        <RadarLogo />
      </div>
    </section>
  )
}

const stats: [string, string][] = [
  ['100+', 'ACTIVE STUDENT BUILDERS'],
  ['04', 'CORE ENGINEERING DOMAINS'],
  ['20+', 'HARDWARE LAB ITEMS'],
  ['03', 'TECHTALES SESSIONS'],
  ['100%', 'HANDS-ON PRACTICAL R&D'],
]

function StatsRail() {
  return (
    <div className="shell py-7">
      <div className="stats-rail">
        {stats.map(([num, label]) => (
          <div className="stat" key={label}>
            <b>{num}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 01 / ABOUT</span>
          <h2 className="sheet-title">
            MORE THAN
            <br />
            <em>A SOCIETY.</em>
          </h2>
          <div className="sheet-meta">
            <span>EST. GNDU</span>
            <span>AMRITSAR</span>
          </div>
        </div>
        <div className="about-split">
          <p className="about-lead">
            A place to turn raw curiosity into <em>tangible capability.</em>
          </p>
          <p className="about-body">
            ARMSS brings together students who want to learn beyond the classroom, engineer real-world hardware, and
            build across disciplines. From intelligent vision models and ROS robotics to CAD simulation and embedded
            microcontrollers — start anywhere, build with us.
          </p>
        </div>
        <div className="principles">
          {principles.map(([n, title, text]) => (
            <div className="principle" key={n}>
              <span className="principle-num">{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

type Domain = (typeof domains)[number]

function DomainModal({ domain, onClose }: { domain: Domain; onClose: () => void }) {
  const detail = domainDetails[domain.title] ?? {
    description: domain.text,
    tools: domain.tech.join(', '),
    areas: 'Research, Prototyping & Field Testing',
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="ovl"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" type="button" onClick={onClose}>
          <X size={13} /> CLOSE [ESC]
        </button>
        <p className="panel-tag">DOMAIN / {domain.n}</p>
        <h2>{domain.title}</h2>
        <p className="panel-lead">{detail.description}</p>
        <div className="panel-kv">
          <div>
            <span className="panel-tag">CORE STACK &amp; TOOLS</span>
            <p>{detail.tools}</p>
          </div>
          <div>
            <span className="panel-tag">RESEARCH SUB-AREAS</span>
            <p>{detail.areas}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Domains() {
  const [selected, setSelected] = useState<Domain | null>(null)

  const glow = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    card.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }

  return (
    <section id="domains" className="section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 02 / DOMAINS</span>
          <h2 className="sheet-title">
            FOUR WAYS
            <br />
            <em>TO EXPLORE.</em>
          </h2>
          <div className="sheet-meta">
            <span>CLICK A CARD</span>
            <span>STACK &amp; TOOLS</span>
          </div>
        </div>
        <div className="domains-grid">
          {domains.map((d) => {
            const Icon = d.icon
            return (
              <button
                className="domain-card"
                key={d.title}
                type="button"
                onMouseMove={glow}
                onClick={() => setSelected(d)}
                aria-label={`View details about ${d.title}`}
              >
                <div className="domain-top">
                  <span className="idx">{d.n}</span>
                  <Icon className="domain-icon" size={22} strokeWidth={1.5} />
                </div>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
                <div className="tech">
                  {d.tech.map((t) => (
                    <i key={t}>{t}</i>
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>
      {selected && <DomainModal domain={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

const labCategories = [
  'ALL',
  'Microcontrollers',
  'Compute & Vision',
  'Sensors',
  'Telemetry Displays',
  'Additive Fabrication',
]

function HardwareLab() {
  const [active, setActive] = useState('ALL')
  const filtered = active === 'ALL' ? labHardware : labHardware.filter((h) => h.category === active)

  return (
    <section id="lab" className="section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 03 / HARDWARE LAB</span>
          <h2 className="sheet-title">
            THE LAB
            <br />
            <em>STACK.</em>
          </h2>
          <div className="sheet-meta">
            <span>SHARED KITS</span>
            <span>GNDU VIBRATION LAB</span>
          </div>
        </div>
        <div className="lab-tools">
          {labCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tool ${active === cat ? 'on' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="lab-grid">
          {filtered.map((item) => (
            <div className="lab-card" key={item.id}>
              <div className="lab-card-top">
                <span className="lab-id">{item.id}</span>
                <span className="lab-status">ACTIVE IN LAB</span>
              </div>
              <div className="lab-shot">
                <img src={item.image} alt={item.name} />
              </div>
              <h4>{item.name}</h4>
              <p className="lab-specs">{item.specs}</p>
              <div className="lab-card-foot">
                <span>CAT: {item.category.toUpperCase()}</span>
                <b>GNDU VIBRATION LAB</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const wsCards = [
  { event: 'ros' as const, label: 'ROBOT OPERATING SYSTEM', l1: 'ROS', l2: 'WORKSHOP', title: 'ROS Workshop', text: 'Hands-on learning with the Robot Operating System, Gazebo simulator & kinematics.' },
  { event: 'uav' as const, label: 'AERIAL SYSTEMS', l1: 'UAV', l2: 'WORKSHOP', title: 'UAV Workshop', text: 'Explore unmanned aerial vehicles, flight controllers, ESCs, and vision avionics.' },
  { event: 'devices' as const, label: 'ELECTRONIC DEVICES', l1: '7 DAYS', l2: '7 DEVICES', title: '7 Days 7 Electronic Devices', text: 'A focused hardware build challenge exploring one electronic device and sensor each day.' },
]

function WorkshopGalleryModal({
  gallery,
  onClose,
}: {
  gallery: { title: string; label: string; images: string[] }
  onClose: () => void
}) {
  const [active, setActive] = useState(0)
  const count = gallery.images.length

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setActive((v) => (v - 1 + count) % count)
      if (e.key === 'ArrowRight') setActive((v) => (v + 1) % count)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [count, onClose])

  return (
    <div
      className="ovl"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="panel panel-wide" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" type="button" onClick={onClose}>
          <X size={13} /> CLOSE [ESC]
        </button>
        <div className="gal-head">
          <div>
            <p className="panel-tag">{gallery.label}</p>
            <h2>{gallery.title}</h2>
          </div>
          <span className="gal-count">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
        <div className="gal-stage">
          <img src={gallery.images[active]} alt={`${gallery.title} photo ${active + 1}`} />
          <button
            className="gal-arrow gal-prev"
            type="button"
            aria-label="Previous photo"
            onClick={() => setActive((v) => (v - 1 + count) % count)}
          >
            <MoveRight className="rotate-180" size={18} />
          </button>
          <button
            className="gal-arrow gal-next"
            type="button"
            aria-label="Next photo"
            onClick={() => setActive((v) => (v + 1) % count)}
          >
            <MoveRight size={18} />
          </button>
        </div>
        <div className="gal-thumbs">
          {gallery.images.map((img, i) => (
            <button key={img} type="button" className={i === active ? 'on' : ''} onClick={() => setActive(i)}>
              <img src={img} alt={`Thumbnail ${i + 1}`} />
            </button>
          ))}
        </div>
        <p className="gal-note">DEPARTMENT OF MECHANICAL ENGINEERING · GNDU AMRITSAR</p>
      </div>
    </div>
  )
}

function Workshops() {
  const [selected, setSelected] = useState<keyof typeof workshopGallery | null>(null)

  return (
    <section id="workshops" className="section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 04 / WORKSHOPS</span>
          <h2 className="sheet-title">
            MAKE IT
            <br />
            <em>REAL.</em>
          </h2>
          <div className="sheet-meta">
            <span>CLICK FOR PHOTOS</span>
          </div>
        </div>
        <div className="ws-grid">
          {wsCards.map((card) => (
            <button
              className="ws-card"
              key={card.event}
              type="button"
              onClick={() => setSelected(card.event)}
              aria-label={`Open ${card.title} photo gallery`}
            >
              <div className="ws-visual">
                <small>{card.label}</small>
                <strong>
                  {card.l1}
                  <br />
                  {card.l2}
                </strong>
              </div>
              <div className="ws-body">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && <WorkshopGalleryModal gallery={workshopGallery[selected]} onClose={() => setSelected(null)} />}
    </section>
  )
}

function TechTalesModal({ ep, onClose }: { ep: (typeof techtales)[number]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="ovl"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="panel panel-wide" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" type="button" onClick={onClose}>
          <X size={13} /> CLOSE [ESC]
        </button>
        <div className="gal-head">
          <div>
            <p className="panel-tag">TECHTALES // {ep.episode}</p>
            <h2>{ep.title}</h2>
          </div>
          <span className="gal-count">{ep.date}</span>
        </div>
        <div className="ttm-grid">
          <div className="ttm-poster">
            <img src={ep.image} alt={ep.title} />
          </div>
          <div>
            <p className="about-lead" style={{ fontSize: '1.15rem' }}>
              {ep.summary}
            </p>
            <div className="ttm-speaker">
              <b>SPEAKER: {ep.speaker}</b>
              <span>{ep.speakerRole}</span>
            </div>
            <div className="sheet-meta" style={{ marginTop: 14 }}>
              <span>{ep.venue}</span>
              <span>{ep.time}</span>
            </div>
          </div>
        </div>
        <div className="ttm-list">
          <h4>WHAT WAS EXPLAINED &amp; DEMONSTRATED</h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {ep.topicsCovered.map((topic, i) => (
              <li key={topic}>
                <i>{String(i + 1).padStart(2, '0')}</i>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
          <div className="ttm-speaker" style={{ marginTop: 18 }}>
            <b>KEY TAKEAWAYS &amp; PRACTICAL VALUE</b>
            <span>{ep.keyTakeaways}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function TechTales() {
  const [selected, setSelected] = useState<(typeof techtales)[number] | null>(null)

  return (
    <section id="techtales" className="section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 05 / TECHTALES</span>
          <h2 className="sheet-title">
            STORIES
            <br />
            <em>BEHIND THE BUILD.</em>
          </h2>
          <div className="sheet-meta">
            <span>CLICK AN EPISODE</span>
          </div>
        </div>
        <div className="tt-grid">
          {techtales.map((ep) => (
            <button
              key={ep.episode}
              type="button"
              className="tt-card"
              onClick={() => setSelected(ep)}
              style={{
                backgroundImage: `linear-gradient(to top, rgba(7,21,47,0.95) 0%, rgba(7,21,47,0.7) 55%, rgba(7,21,47,0.35) 100%), url(${ep.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            >
              <div className="tt-card-top">
                <span className="tt-ep">{ep.episode}</span>
                <span className="tt-date">{ep.date}</span>
              </div>
              <div className="tt-body">
                <h3>{ep.title}</h3>
                <p>Featuring {ep.speaker}</p>
                <div className="tt-foot">
                  <span>{ep.venue}</span>
                  <b>READ DETAILS →</b>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {selected && <TechTalesModal ep={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

function BuildfestPromo() {
  return (
    <section id="buildfest" className="section reveal-section" style={{ paddingTop: 0 }}>
      <div className="shell">
        <div className="bf-promo">
          <div className="bf-promo-grid">
            <div>
              <span className="bf-promo-tag">FEATURED · 13–15 OCT 2026</span>
              <h2 className="bf-promo-title">
                BUILDFEST
                <br />
                <em>2.0</em>
              </h2>
              <div className="bf-promo-actions">
                <Link href="/buildfest" className="btn btn-amber">
                  EVENT PAGE <ArrowUpRight size={16} />
                </Link>
                <a href={buildfestUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  REGISTER NOW <MoveRight size={16} />
                </a>
              </div>
              <p className="bf-promo-note">REGISTRATIONS VIA GOOGLE FORM // LIMITED SLOTS</p>
            </div>
            <div>
              <ul className="bf-promo-list">
                <li>
                  <span>3 Days · 13–15 October</span>
                  <b>Hackathon</b>
                </li>
                <li>
                  <span>14 Oct · 1:30 PM</span>
                  <b>Treasure Hunt</b>
                </li>
                <li>
                  <span>13–14 Oct · 1:15 PM</span>
                  <b>BGMI E-Sports</b>
                </li>
                <li>
                  <span>₹10,000 + goodies</span>
                  <b>Prize Pool</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Archive() {
  return (
    <section className="section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 06 / ARCHIVE</span>
          <h2 className="sheet-title">
            IDEAS IN
            <br />
            <em>MOTION.</em>
          </h2>
          <div className="sheet-meta">
            <span>THREE TEAMS</span>
            <span>ONE BRIEF</span>
          </div>
        </div>
        <div className="arch-list">
          {buildfestWinners.map(([pos, teamName, members], i) => (
            <article className={`arch-row ${i === 0 ? 'winner' : ''}`} key={pos}>
              <div>
                <span className="pos">BUILDFEST 1.0 / {pos}</span>
                <h3>{teamName}</h3>
                <p>{members}</p>
              </div>
              <span className="rank">{String(i + 1).padStart(2, '0')}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Membership() {
  return (
    <section id="membership" className="section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 07 / MEMBERSHIP</span>
          <h2 className="sheet-title">
            BRING YOUR
            <br />
            <em>CURIOSITY.</em>
          </h2>
          <div className="sheet-meta">
            <span>OPEN TO ALL</span>
            <span>NO EXPERIENCE</span>
          </div>
        </div>
        <div className="member-split">
          <p className="about-lead">
            Membership is free — show up, plug in, and start <em>making things.</em>
          </p>
          <ul className="benefits">
            <li>Hands-on laboratory &amp; hardware component checkout</li>
            <li>Insider technical workshops &amp; project pods</li>
            <li>Direct faculty &amp; senior peer mentoring</li>
            <li>Competition sponsorships &amp; hackathon teams</li>
            <li>ARMSS certification, badges &amp; project portfolio</li>
          </ul>
        </div>
        <div className="hero-ctas" style={{ marginTop: 40 }}>
          <a href={joinUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            JOIN ARMSS <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 08 / FAQ</span>
          <h2 className="sheet-title">
            STILL HAVE
            <br />
            <em>QUESTIONS?</em>
          </h2>
          <div className="sheet-meta">
            <span>ARMSS · GNDU</span>
          </div>
        </div>
        <div className="faq-grid">
          <p className="about-lead">
            Good. That is usually where the most exciting <em>engineering problems</em> start.
          </p>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div className="faq-item" key={question}>
                <button
                  className="faq-q"
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{question}</span>
                  <span className="pm">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <p>{answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section id="team" className="section reveal-section">
      <div className="shell">
        <div className="sheet-head">
          <span className="sheet-no">SHT 09 / THE CREW</span>
          <h2 className="sheet-title">
            THE PEOPLE
            <br />
            <em>OF ARMSS.</em>
          </h2>
          <div className="sheet-meta">
            <span>STUDENT LEADERSHIP</span>
          </div>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <article className="team-card" key={member.name}>
              <div className="team-shot">
                <span>PHOTO / {String(i + 1).padStart(2, '0')}</span>
                <Network size={26} strokeWidth={1.5} />
              </div>
              <p className="team-role">{member.role}</p>
              <h3>{member.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ArmmsSite() {
  useRevealOnScroll()

  return (
    <div className="site site-light">
      <Navbar />
      <main>
        <Hero />
        <StatsRail />
        <About />
        <Domains />
        <HardwareLab />
        <Workshops />
        <TechTales />
        <BuildfestPromo />
        <Archive />
        <Membership />
        <FAQ />
        <Team />
      </main>
      <Footer />
    </div>
  )
}
