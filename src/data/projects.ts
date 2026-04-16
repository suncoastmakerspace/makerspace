export type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  content: string;
  gradient?: 'blue' | 'purple' | 'green';
  images?: string[];    // array of image paths e.g. ["/images/rc-car-1.jpg", "/images/rc-car-2.jpg"]
  github?: string;      // full GitHub URL
  driveUrl?: string;    // full Google Drive URL
};

export const projects: Project[] = [
  {
    slug: "functional-prints",
    title: "Functional Prints",
    summary: "An ongoing 3D printing project producing functional parts and prototypes, with multiple iterations refining design and material choices.",
    tags: ["3D Printing"],
    date: "2026-02",
    gradient: "green",
    // images: ["/images/functional-prints-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/functional-prints",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>An ongoing project focused on producing functional 3D printed parts rather than decorative pieces. Multiple iterations have been completed, each refining the design and material selection.</p>
      <h2>Technical lead</h2>
      <p>Louis Mangano</p>
      <h2>Notes</h2>
      <p>Multiple iterations completed. Focus is on real-world functional applications.</p>
    `,
  },
  {
    slug: "rc-car",
    title: "RC Car",
    summary: "A ground-up RC car build covering chassis design, motor control electronics, and radio communication.",
    tags: ["Electronics", "Mechanical"],
    date: "2026-03",
    gradient: "blue",
    // images: ["/images/rc-car-1.jpg", "/images/rc-car-2.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/rc-car",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A team build of a radio-controlled car from the ground up, covering chassis fabrication, motor driver electronics, and RC receiver integration.</p>
      <h2>Team</h2>
      <p>Anvith Arra, Rishith Arra, Nickolas Huaman-Gonzales</p>
      <h2>Technical lead</h2>
      <p>Nickolas Huaman-Gonzales</p>
      <h2>Notes</h2>
      <p>Basic build. Currently in progress.</p>
    `,
  },
  {
    slug: "cortical-brain-simulation",
    title: "Cortical Brain Simulation",
    summary: "A computational neuroscience project simulating cortical brain activity, developed in collaboration with a UF undergraduate researcher.",
    tags: ["Software"],
    date: "2026-01",
    gradient: "purple",
    // images: ["/images/cortical-sim-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/cortical-sim",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A simulation of cortical brain activity, developed in partnership with a University of Florida undergraduate researcher. The project models neural activity patterns using computational methods.</p>
      <h2>Team</h2>
      <p>Abhi Ayithi, Manil Chabria</p>
      <h2>Technical lead</h2>
      <p>Abhi Ayithi</p>
      <h2>Notes</h2>
      <p>Working with a UF undergrad. Not yet started.</p>
    `,
  },
  {
    slug: "computer-vision-system",
    title: "Computer Vision System",
    summary: "A completed computer vision system capable of real-time image recognition and analysis, built over an estimated 4–6 month timeline.",
    tags: ["Software", "Electronics"],
    date: "2026-03",
    gradient: "blue",
    // images: ["/images/cv-system-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/computer-vision",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A fully completed computer vision system built for real-time image recognition and scene analysis. The project spanned roughly 4–6 months from initial research to final implementation.</p>
      <h2>Team</h2>
      <p>Shritan Soma, Rishith Arra, Omar Chowdhury</p>
      <h2>Technical lead</h2>
      <p>Omar Chowdhury</p>
      <h2>Status</h2>
      <p>Completed — see the project documentation on GitHub.</p>
    `,
  },
  {
    slug: "suncoast-drone",
    title: "Suncoast Drone",
    summary: "A custom-built drone project covering frame assembly, flight controller configuration, and autonomous flight capabilities.",
    tags: ["Robotics", "Electronics"],
    date: "2026-02",
    gradient: "blue",
    // images: ["/images/drone-1.jpg", "/images/drone-2.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/drone",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A custom drone built from scratch, covering frame design, ESC and motor selection, flight controller configuration, and initial autonomous flight testing. Estimated 4–8 months to completion.</p>
      <h2>Team</h2>
      <p>Juan Beraldi, Benjamin Mori, Abhi Ayithi, David Pena</p>
      <h2>Technical lead</h2>
      <p>Abhi Ayithi</p>
      <h2>Notes</h2>
      <p>Currently in progress.</p>
    `,
  },
  {
    slug: "suncoast-solar-greenhouse",
    title: "Suncoast Solar Greenhouse",
    summary: "A solar-powered smart greenhouse integrating environmental sensors and automated climate control, estimated 6–18 months in scope.",
    tags: ["Electronics", "Sustainability"],
    date: "2026-01",
    gradient: "green",
    // images: ["/images/greenhouse-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/greenhouse",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A solar-powered greenhouse with integrated environmental monitoring and automated climate control. The project combines renewable energy, embedded systems, and agricultural applications. Estimated scope is 6–18 months.</p>
      <h2>Team</h2>
      <p>Sonny Sharmin, Abhi Ayithi</p>
      <h2>Technical lead</h2>
      <p>Sonny Sharmin</p>
      <h2>Notes</h2>
      <p>Currently in progress.</p>
    `,
  },
  {
    slug: "calculator-creator",
    title: "Calculator Creator",
    summary: "A from-scratch calculator build exploring both the hardware logic and software interface sides of computation.",
    tags: ["Electronics", "Software"],
    date: "2026-02",
    gradient: "purple",
    // images: ["/images/calculator-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/calculator",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A calculator built from scratch, exploring both hardware logic design and software interface implementation. Noted as a complex project with interesting engineering challenges.</p>
      <h2>Team</h2>
      <p>Abhiram Raj, Zijun An</p>
      <h2>Technical lead</h2>
      <p>Zijun An</p>
      <h2>Notes</h2>
      <p>Pretty complex. Currently in progress.</p>
    `,
  },
  {
    slug: "belt-holder",
    title: "Belt Holder",
    summary: "A completed mechanical design project celebrating a first successful fabrication milestone.",
    tags: ["Mechanical", "3D Printing"],
    date: "2026-02",
    gradient: "green",
    // images: ["/images/belt-holder-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/belt-holder",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A mechanical belt holder design, completed as a fabrication milestone project. Marked a first successful end-to-end design and build for the member involved.</p>
      <h2>Team</h2>
      <p>Abhi Ayithi</p>
      <h2>Technical lead</h2>
      <p>Abhi Ayithi</p>
      <h2>Notes</h2>
      <p>Completed — celebrating 1st Dan!</p>
    `,
  },
  {
    slug: "arc-1-continuations",
    title: "ARC-1 & Continuations",
    summary: "A bionic arm project exploring prosthetic design, servo control, and EMG-based input systems.",
    tags: ["Robotics", "Mechanical", "Electronics"],
    date: "2026-01",
    gradient: "blue",
    // images: ["/images/arc-1.jpg", "/images/arc-2.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/arc-1",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>ARC-1 is a bionic arm project exploring prosthetic limb design, servo actuation, and electromyography (EMG) based control inputs. The project has continued into successive iterations.</p>
      <h2>Team</h2>
      <p>Shritan Soma, Abhi Ayithi</p>
      <h2>Technical lead</h2>
      <p>Shritan Soma</p>
      <h2>Notes</h2>
      <p>Completed. Estimated 1–2 months per iteration.</p>
    `,
  },
  {
    slug: "minga-replacement",
    title: "Minga Replacement",
    summary: "A completed mechanical replacement component project, delivering a finished part within a tight 0–1.5 month timeline.",
    tags: ["Mechanical"],
    date: "2026-01",
    gradient: "green",
    // images: ["/images/minga-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/minga",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A focused mechanical project to design and fabricate a replacement component. Completed efficiently within a 0–1.5 month window.</p>
      <h2>Team</h2>
      <p>Shritan Soma</p>
      <h2>Technical lead</h2>
      <p>Shritan Soma</p>
      <h2>Notes</h2>
      <p>Completed.</p>
    `,
  },
  {
    slug: "video-game-controller",
    title: "Video Game Controller",
    summary: "A custom-built video game controller covering input hardware, microcontroller programming, and USB HID communication.",
    tags: ["Electronics", "Software"],
    date: "2026-02",
    gradient: "purple",
    // images: ["/images/controller-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/controller",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A custom video game controller built around a microcontroller, covering button and joystick input hardware, firmware development, and USB HID protocol implementation to communicate with a PC.</p>
      <h2>Team</h2>
      <p>Adib Karim</p>
      <h2>Technical lead</h2>
      <p>Adib Karim</p>
      <h2>Notes</h2>
      <p>Short, easy project. Currently blocked.</p>
    `,
  },
  {
    slug: "don-cheedle-bird",
    title: "Don Cheedle Bird",
    summary: "A creative art and engineering project described as interesting, blending fabrication with artistic expression.",
    tags: ["Art", "3D Printing"],
    date: "2026-02",
    gradient: "purple",
    // images: ["/images/don-cheedle-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/don-cheedle-bird",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>An artistic fabrication project combining engineering skills with creative expression. Noted as an interesting project by the team.</p>
      <h2>Team</h2>
      <p>Malakai Dennard, Abhi Ayithi, Shritan Soma</p>
      <h2>Technical lead</h2>
      <p>Shritan Soma</p>
      <h2>Notes</h2>
      <p>Completed.</p>
    `,
  },
  {
    slug: "motion-lighting",
    title: "Motion Lighting",
    summary: "A completed motion-activated lighting system using presence detection sensors and programmable LED control.",
    tags: ["Electronics"],
    date: "2026-03",
    gradient: "blue",
    // images: ["/images/motion-lighting-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/motion-lighting",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A motion-activated lighting system built around presence detection sensors and programmable LED drivers. Completed quickly as a focused short-scope project.</p>
      <h2>Team</h2>
      <p>Advait Patel</p>
      <h2>Technical lead</h2>
      <p>Advait Patel</p>
      <h2>Notes</h2>
      <p>Quick project. Completed.</p>
    `,
  },
  {
    slug: "temphumi-sensor",
    title: "TempHumid Sensor",
    summary: "A temperature and humidity monitoring device with data logging, described as simple but technically interesting.",
    tags: ["Electronics", "Software"],
    date: "2026-03",
    gradient: "green",
    // images: ["/images/temphum-1.jpg"],
    // github: "https://github.com/suncoastmakerspace-ops/temphum",
    // driveUrl: "https://drive.google.com/...",
    content: `
      <h2>Overview</h2>
      <p>A temperature and humidity sensor unit with onboard data logging capability. While straightforward in scope, the project covers embedded firmware, sensor interfacing, and data output formatting.</p>
      <h2>Team</h2>
      <p>Abhi Ayithi, Shritan Soma, Omar Chowdhury</p>
      <h2>Technical lead</h2>
      <p>Abhi Ayithi</p>
      <h2>Notes</h2>
      <p>Simple but interesting. Completed.</p>
    `,
  },
];