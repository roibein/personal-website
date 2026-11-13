import { PULSE_MEDIA, PULSE_WRITEUP } from "./pulse.js";

/* ------------------------------------------------------------------ */
/* Project content.                                                    */
/*                                                                     */
/* id        URL fragment (roibein.com/#knee-brace) — keep stable.     */
/* featured  true = written up in full on the page;                    */
/*           false = compact card that opens a details dialog.         */
/* facts     the write-up: Problem / My role / Methods / Result.       */
/* models    interactive glTF models shown in the 3D viewer.           */
/* link      one supporting document (poster, memo, live CAD).         */
/* ------------------------------------------------------------------ */
export const PROJECTS = [
  {
    id: "suspension",
    featured: true,
    title: "2027 Suspension",
    category: "Formula SAE",
    context: "Duke Motorsports · 2026",
    summary:
      "Front pull-rod actuation for the 2027 car, rear pushrod packaging, and the rods and rod ends that set their length.",
    facts: [
      {
        label: "Problem",
        text: "The 2026 front carried a pushrod high on the chassis, and rod length was set by turning the whole bar.",
      },
      {
        label: "My role",
        text: "I designed the front and rear actuation and the suspension hardware, and checked camber in Optimum Kinematics.",
      },
      {
        label: "Methods",
        text: "The front uses a pull rod. The rear keeps a pushrod, and the tie rod moved toward the lower aft arm. Shims at the chassis end of the rods set the length, instead of a turnbuckle in the bar.",
      },
      {
        label: "Result",
        text: "The front pull rod carries less weight and drag on the chassis, packages more compactly, and keeps kinematics close to 2026.",
      },
    ],
    tags: ["Optimum Kinematics", "SolidWorks", "Vehicle dynamics"],
    thumb: { fit: "contain" },
    media: [
      {
        src: "/projects/suspension-front-pullrod.png",
        alt: "CAD of the 2027 front suspension corner: pull rod, inboard damper, A-arms, and brake upright",
        caption: "Front corner assembly with pull-rod actuation.",
      },
      {
        src: "/projects/suspension-rear-side.png",
        alt: "CAD of the 2027 rear suspension corner: pushrod, links, damper, and upright",
        caption: "Rear corner assembly with pushrod actuation.",
      },
      {
        src: "/projects/suspension-control-arm.png",
        alt: "CAD of a control arm: a clevis bracket, tube, and male rod end",
        caption: "Control arm: hex insert and a male rod end.",
      },
      {
        src: "/projects/suspension-actuation-rod.png",
        alt: "CAD of shims stacked between clevis flanges at the chassis end of an actuation rod",
        caption: "Shim stacks between the flanges set the rod length.",
      },
      {
        src: "/projects/suspension-tierod.png",
        alt: "CAD of a tie rod from the upright bearing out to a rod end",
        caption: "Tie rod, with the same rod-end hardware.",
      },
      {
        src: "/projects/suspension-camber.png",
        alt: "Plot of front camber against steering angle at constant roll, 2026 and 2027 curves crossing a green band from -0.5 to -1 degree",
        caption: "Front camber in steering with 1.5° of roll. The band is -0.5° to -1°.",
      },
    ],
    slides: [
      {
        src: "/projects/slides/suspension-front.png",
        alt: "Design review slide of the front suspension change from pushrod to pullrod",
        caption: "Front suspension.",
      },
      {
        src: "/projects/slides/suspension-rear.png",
        alt: "Design review slide of the rear suspension and tie rod placement",
        caption: "Rear suspension.",
      },
      {
        src: "/projects/slides/suspension-hardware.png",
        alt: "Design review slide of the control arm, tie rod, and 2026 and 2027 actuation hardware",
        caption: "Suspension hardware.",
      },
      {
        src: "/projects/slides/suspension-camber.png",
        alt: "Design review slide with four front camber plots comparing 2026 and 2027",
        caption: "Front camber.",
      },
    ],
  },
  {
    id: "knee-brace",
    featured: true,
    title: "Aquatic Knee Stabilization Device",
    category: "Medical device",
    context: "Team project · Aug–Dec 2025",
    summary:
      "A waterproof knee brace that stabilizes the joint during aquatic physical therapy, built for a patient with a spinal cord injury.",
    facts: [
      {
        label: "Problem",
        text: "The patient needed knee support in the pool. Off-the-shelf braces aren't waterproof, get heavy when saturated, and restrict the range of motion that therapy depends on.",
      },
      {
        label: "Approach",
        text: "Our team modeled the brace in SolidWorks and Onshape, then ran model, print, test, revise loops. Each prototype was tested in water, and we tuned cuff fit, hinge resistance, and strap retention against real therapy conditions.",
      },
      {
        label: "Result",
        text: "A working waterproof prototype that stabilizes the joint without fighting the patient's motion. It was validated in a pool therapy session and presented at the Duke Pratt design showcase.",
      },
    ],
    tags: ["SolidWorks", "Onshape", "Iterative prototyping", "Patient-centered design"],
    link: { href: "/knee-brace-poster.pdf", label: "Project poster (PDF)" },
    media: [
      {
        src: "/projects/knee-brace-0.jpg",
        alt: "The printed knee brace prototype mounted on a pole: green and red 3D-printed cuffs with purple hinges and adjustable straps",
        caption: "Working prototype: 3D-printed cuffs, hinged struts, and adjustable straps.",
      },
      {
        src: "/projects/knee-brace-pool-test.jpg",
        alt: "Roi and his team at the pool edge fitting the knee brace during an aquatic therapy session, with the patient in the water",
        caption: "Fitting and testing the brace with the patient during a therapy session.",
      },
      {
        src: "/projects/knee-brace-2.jpg",
        alt: "The patient wearing the knee brace during aquatic physical therapy in the pool",
        caption: "The brace in use in the therapy pool.",
      },
      {
        src: "/projects/knee-brace-1.jpg",
        alt: "Roi and his teammates with their project poster, holding the printed brace, at the Duke design showcase",
        caption: "Presenting at the Duke Pratt design showcase.",
      },
    ],
  },
  {
    id: "bearing-carriers",
    featured: true,
    title: "Bearing Carriers",
    category: "Formula SAE",
    context: "Duke Motorsports · 2026",
    summary:
      "4140 carriers that locate the bearings and pick up the A-arms and the pull rod.",
    facts: [
      {
        label: "Problem",
        text: "Each corner needs an upper and a lower carrier for a 320 km season. The 2026 fronts were built around a pushrod.",
      },
      {
        label: "My role",
        text: "I designed the 2027 front and rear carriers and ran the FEA on all four.",
      },
      {
        label: "Methods",
        text: "4140 steel, with a shelf in the bore and 1/8 in fillets for a 1/4 in end mill. The bar was 1.5 factor of safety.",
      },
      {
        label: "Result",
        text: "Front uppers dropped from 159 g to 120 g. The rear upper is the limit, at 1.76 FOS.",
      },
    ],
    tags: ["SolidWorks", "FEA", "AISI 4140"],
    thumb: { fit: "contain" },
    media: [
      {
        src: "/projects/bearing-front-upper.png",
        alt: "CAD of the 2027 front upper bearing carrier, a steel lug with a bore and a clevis",
        caption: "2027 front upper.",
      },
      {
        src: "/projects/bearing-front-lower.png",
        alt: "CAD of the 2027 front lower bearing carrier, with a bore and two mounting tabs",
        caption: "2027 front lower, packaged for the pull rod.",
      },
      {
        src: "/projects/bearing-rear-upper.png",
        alt: "CAD of the 2027 rear upper bearing carrier, with a bore, lightening pockets, and a clevis",
        caption: "2027 rear upper.",
      },
      {
        src: "/projects/bearing-rear-lower.png",
        alt: "CAD of the 2027 rear lower bearing carrier, with a large bore and a lightening window",
        caption: "2027 rear lower.",
      },
      {
        src: "/projects/bearing-fea-front.png",
        alt: "FEA plot of the front upper carrier, mostly dark blue, minimum factor of safety 2.42 at the fore arm",
        caption: "Front upper in 5 g bump and max braking. Minimum 2.42 FOS.",
      },
      {
        src: "/projects/bearing-fea-rear.png",
        alt: "FEA plot of the rear upper carrier, minimum factor of safety 1.76 at the bearing bore",
        caption: "Rear upper in 5 g bump, braking, and cornering. Minimum 1.76 FOS.",
      },
    ],
    slides: [
      {
        src: "/projects/slides/bearing-criteria.png",
        alt: "Design review slide listing bearing carrier criteria, geometry, and the FEA method",
        caption: "Criteria and method.",
      },
      {
        src: "/projects/slides/bearing-front.png",
        alt: "Design review slide comparing 2026 and 2027 front bearing carriers and their mass",
        caption: "Front carriers.",
      },
      {
        src: "/projects/slides/bearing-rear.png",
        alt: "Design review slide of the 2027 rear bearing carriers and their mass",
        caption: "Rear carriers.",
      },
      {
        src: "/projects/slides/bearing-method-upper.png",
        alt: "Design review slide of the upper bearing carrier load cases",
        caption: "Upper load cases.",
      },
      {
        src: "/projects/slides/bearing-method-lower.png",
        alt: "Design review slide of the lower bearing carrier load cases",
        caption: "Lower load cases.",
      },
      {
        src: "/projects/slides/bearing-fea-front.png",
        alt: "Design review slide of the front bearing carrier FEA results",
        caption: "Front FEA.",
      },
      {
        src: "/projects/slides/bearing-fea-rear.png",
        alt: "Design review slide of the rear bearing carrier FEA results",
        caption: "Rear FEA.",
      },
    ],
  },
  {
    id: "steering-sensor-mount",
    featured: true,
    title: "Steering Angle Sensor Mount",
    category: "Formula SAE",
    context: "Duke Motorsports · 2026",
    summary:
      "A 3D-printed clamshell mount that holds a steering-angle sensor on the race car's steering rack, so steering input can be logged without modifying the rack.",
    facts: [
      {
        label: "Problem",
        text: "The team needed to log steering angle. A 360° Hall-effect sensor (5 V supply, 0–5 V output) had to be held rigidly against the rack and coupled to its rotation on a running car, without machining anything on the rack.",
      },
      {
        label: "My role",
        text: "I designed the mount in SolidWorks and fabricated it.",
      },
      {
        label: "Methods",
        text: "A two-piece clamshell driven by global variables. The clamp bores are sized to the rack and sensor diameters, and the fastener holes are toleranced for M4 and M3 hardware: clearance where bolts pass through, a tight fit where they clamp. Change a diameter and the mount re-fits.",
      },
      {
        label: "Result",
        text: "Printed in PLA, bolted together, and installed on the chassis with the sensor wired in.",
      },
    ],
    tags: ["SolidWorks", "Tolerance analysis", "Design variables", "3D printing", "Sensor integration"],
    models: [
      {
        src: "/models/steering-mount/steering_sensor_mount_new.gltf",
        alt: "Interactive 3D model of the steering angle sensor mount: two clamshell halves with a sensor bore and M4/M3 fastener holes",
        label: "Mount",
      },
      {
        src: "/models/steering-rack/real_steering_rack.gltf",
        alt: "Interactive 3D model of the sensor mount clamped around the full steering rack assembly with tie-rod ends",
        label: "On the rack",
      },
    ],
    media: [
      {
        src: "/projects/steering-mount-real-2.jpg",
        alt: "The assembled printed mount clamped around the aluminum steering rack inside the car chassis, with the sensor wired below",
        caption: "Installed on the car: clamped around the rack with M4/M3 hardware, sensor wired in.",
      },
      {
        src: "/projects/steering-mount-rack-1.png",
        alt: "SolidWorks assembly of the sensor mount clamped around the middle of the steering rack, with tie-rod ends at each side",
        caption: "CAD assembly: the mount at the center of the steering rack, sensor seated on top.",
      },
      {
        src: "/projects/steering-mount-rack-2.png",
        alt: "Angled SolidWorks view showing the sensor drum and shaft protruding from the mount on the steering rack",
        caption: "The 360° angle sensor coupled to the rack's rotation.",
      },
      {
        src: "/projects/steering-mount-only.png",
        alt: "SolidWorks view of the two-piece clamshell mount by itself, showing the sensor bore and corner fastener holes",
        caption: "Two-piece clamshell: sensor bore in the center, M4/M3 fastener holes at the corners.",
      },
      {
        src: "/projects/steering-mount-real-1.jpg",
        alt: "The 3D-printed yellow mount body and its separate curved rack-clamp half on a workbench",
        caption: "Printed in PLA: the main body and the curved rack-clamp half before assembly.",
      },
      {
        src: "/projects/steering-mount-real-3.jpg",
        alt: "Another angle of the printed mount clamped on the steering rack in the chassis, sensor and wiring visible underneath",
        caption: "Holding the sensor against the rack, mounted in the chassis.",
      },
    ],
  },
  {
    id: "pulse-app",
    featured: true,
    title: "Pulse: Wearable Health Research App",
    category: "Software",
    context: "Duke OIT internship · May–Jul 2026",
    summary:
      "A SwiftUI research app that collects wearable health data through Apple HealthKit for a shared Duke research database. Our team of four built the features that keep participants opening it.",
    facts: [
      {
        label: "Problem",
        text: "iOS ends an app's background tasks after about a week unopened, so a participant who stops launching the app silently stops contributing data.",
      },
      {
        label: "My role",
        text: "I owned three of the four engagement features end to end: a fitness dashboard with custom goals and 7- and 30-day HealthKit trend charts, a Duke Recreation class browser with in-app registration, and 2048 and Minesweeper rebuilt in SwiftUI. I also built the frontend for the leaderboard and photo feed, and the backend behind the leaderboards.",
      },
      {
        label: "Result",
        text: "The app is used by 100+ research participants. I presented progress and the final deliverable to the research team and Duke OIT stakeholders.",
      },
    ],
    tags: ["SwiftUI", "SwiftData", "FastAPI", "Apple HealthKit", "Duke Fitness API"],
    writeup: PULSE_WRITEUP,
    media: PULSE_MEDIA,
  },
  {
    id: "happy-meal-toy",
    featured: true,
    title: "Happy Meal Toy: Bobsled Bonanza",
    category: "Consumer product",
    context: "Design challenge · Mar 2026",
    summary:
      "A Winter Olympics bobsled launcher designed to a McDonald's Happy Meal brief: five injection-moldable parts that lock together without adhesive.",
    facts: [
      {
        label: "Brief",
        text: "Five separately moldable parts in recycled ABS (bobsled figure, disk, pusher, arms, back connector), assembled only with interference fits, at $0.22 per unit, and safe for ages 3+.",
      },
      {
        label: "My role",
        text: "I designed the launcher arms: curved tightly enough to hold the disk, flexible enough to release it at speed.",
      },
      {
        label: "Methods",
        text: "Worst-case tolerance analysis. Printer accuracy of ±0.004 in per part stacks to ±0.008 in per two-part joint, then each fit is tuned: interference where parts must lock, clearance where the pusher must slide.",
      },
      {
        label: "Result",
        text: "A fully assembled, working launcher that met the cost, safety, and manufacturability constraints. Every exposed edge is filleted, which also helps mold flow, and every part is at least 1.50 in wide to pass the choking-hazard test.",
      },
    ],
    tags: ["SolidWorks", "Injection-molding DFM", "Worst-case tolerancing", "Recycled ABS"],
    link: {
      href: "/happy-meal-toy-technical-memo.pdf",
      label: "Technical memo (PDF)",
    },
    models: [
      {
        src: "/models/happy-meal/Bobsled_Assembly.gltf",
        alt: "Interactive 3D model of the Bobsled Bonanza launcher assembly: figure, disk, pusher, arms, and back connector",
        label: "Assembly",
      },
    ],
    media: [
      {
        src: "/projects/bobsled-bonanza.png",
        alt: "The final 3D-printed toy: a blue bobsled figure with a USA flag seated on the disk, with the pusher drawn back in the launcher",
        caption: "Final printed launcher: pusher drawn back, figure seated on the disk.",
      },
      {
        src: "/projects/happy-meal-arms-drawing.jpg",
        alt: "Toleranced engineering drawing of the launcher arms with title block, section A-A, and multiple views",
        caption: "Launcher-arm drawing: 0.012 in interference at the hinge, 0.05 in clearance so the pusher slides freely.",
      },
      {
        src: "/projects/bobsled-assembly.png",
        alt: "SolidWorks exploded view of the toy showing the launcher arms, pusher, and figure on the disk",
        caption: "Exploded view of the five parts: figure, disk, pusher, arms, back connector.",
      },
      {
        src: "/projects/toy-flyer.jpg",
        alt: "Bobsled Bonanza flyer with assembly instructions and the five-part breakdown",
        caption: "Packaging flyer with assembly steps and the five-part breakdown.",
      },
      {
        src: "/projects/team-picture.jpg",
        alt: "Roi and his teammates presenting the Bobsled Bonanza toy at the design showcase",
        caption: "The team at the design showcase.",
      },
    ],
  },
  {
    id: "sunflower-sheller",
    featured: false,
    title: "Sunflower Shelling Machine",
    category: "Mechanism design",
    context: "EGR 121 · Feb 2026",
    summary:
      "A hand-cranked machine that cracks sunflower seeds and separates shell from kernel. I did all the CAD.",
    facts: [
      {
        label: "Problem",
        text: "Design a fully human-powered machine that cracks sunflower seeds while sparing the kernel.",
      },
      {
        label: "My role",
        text: "A group project in which I owned all the CAD, from every SolidWorks part file to the print-ready assembly.",
      },
      {
        label: "Methods",
        text: "A dual-roller concept won a weighted value matrix (4.65 of 5) over splitter and crusher-plate designs. Testing showed identical rollers either crushed kernels or let seeds slip through, so the final design pairs one horizontal-bump roller with one vertical-bump roller. Two semicircular PLA filters (6.5 mm and 4.3 mm holes, sized from caliper measurements of real shells) sort the output, with twist handles to clear clogs mid-run.",
      },
      {
        label: "Result",
        text: "A class-high yield of 24 seeds per minute. The crank handle snapped under torsional load mid-test; next time I'd use higher infill and a stiffer, non-PLA handle.",
      },
    ],
    tags: ["SolidWorks", "3D printing (PLA)", "Mechanism design", "Value matrix"],
    models: [
      {
        src: "/models/sunflower/Grinder_Assembly.gltf",
        alt: "Interactive 3D model of the sheller assembly: dual rollers, crank, and funnel",
        label: "Assembly",
      },
    ],
    thumb: { fit: "contain" },
    media: [
      {
        src: "/projects/sheller-assembly.png",
        alt: "SolidWorks assembly of the shelling machine: a hopper box with dual geared rollers and a hand crank",
        caption: "Dual-roller assembly. The hand crank drives both rollers through the gear train.",
      },
    ],
  },
  {
    id: "cd-display-case",
    featured: false,
    title: "CD Display Case",
    category: "Parametric CAD",
    context: "Personal project",
    summary:
      "A wall-mounted case for nine CDs, modeled so the whole thing rebuilds when one dimension changes.",
    facts: [
      {
        label: "Goal",
        text: "A case that holds nine CDs in a 3×3 grid and rebuilds itself automatically if any dimension changes.",
      },
      {
        label: "Methods",
        text: "A fully parametric SolidWorks model driven by global variables: 142 mm CD width, 125 mm height, 10 mm thickness, 10 mm walls, and a deliberate 1 mm tolerance on every slot. It mounts on four 5 mm pegs in 15 mm-deep holes, with peg spacing computed by equation from total height, buffer, and peg count rather than placed by hand.",
      },
      {
        label: "Result",
        text: "A 450 × 399 mm case that resolves from the equations, printed in orange PLA and holding nine albums.",
      },
    ],
    // Copied from the SolidWorks model's equation manager.
    equations: [
      ['"CD_Height"', "125mm"],
      ['"CD_Thickness"', "10mm"],
      ['"CD_Width"', "142mm"],
      ['"Wall_Thickness"', "10mm"],
      ['"Tolerance"', "1mm"],
      ['"Total_Height"', '3 * "CD_Height" + 2 * "Wall_Thickness" + 4mm'],
      ['"Total_Width"', '"CD_Width" * 3 + "Wall_Thickness" * 2 + 4mm'],
      ['"Dist_Btwn_Pegs"', '("Total_Height" - 2 * "Peg_Buffer") / ("Num_Pegs" - 1)'],
    ],
    tags: ["SolidWorks", "Parametric modeling", "Tolerance analysis", "Design equations"],
    models: [
      {
        src: "/models/cd-display/Full_CD_Display_Case_Assembly.gltf",
        alt: "Interactive 3D model of the CD display case: four interlocking panels with mounting pins",
        label: "Assembly",
      },
    ],
    thumb: { position: "50% 62%" },
    media: [
      {
        src: "/projects/cd-display-case.jpg",
        alt: "The finished CD display case in orange PLA, holding nine hip-hop albums in a 3 by 3 grid",
        caption: "Printed in orange PLA, holding nine albums in a 3×3 grid.",
      },
      {
        src: "/projects/cd-assembly.png",
        alt: "SolidWorks assembly showing the four interlocking panels of the case with mounting pegs",
        caption: "Parametric assembly: four interlocking panels with equation-driven peg spacing.",
      },
    ],
  },
  {
    id: "robocop-helmet",
    featured: false,
    title: "Toy RoboCop Helmet",
    category: "Surface modeling",
    context: "Personal project",
    summary:
      "The helmet from RoboCop (1987), modeled in Onshape to fit a Lego Bionicle head. My first CAD project, made as a gift for my brother.",
    facts: [
      {
        label: "Idea",
        text: "Model the RoboCop helmet so it fits onto a Lego Bionicle head.",
      },
      {
        label: "Approach",
        text: "I measured the existing Bionicle head and built around it so the helmet seats correctly, then used Onshape's surface-modeling features to turn the on-screen silhouette into printable geometry.",
      },
      {
        label: "Result",
        text: "A printed helmet that fits the figure, and the project that got me started in CAD.",
      },
    ],
    tags: ["Onshape", "Surface modeling", "Reverse-engineered fit", "3D printing"],
    link: {
      href: "https://cad.onshape.com/documents/c57e6c0af198edbf7f9126a2/w/cd66e504ddfa145e3869a074/e/43f2697d61a75598f6f19398?renderMode=0&uiState=693b8bfb61f7a400401c0e6b",
      label: "Live CAD model on Onshape",
      external: true,
    },
    models: [
      {
        src: "/models/robocop/RoboCopDemo.gltf",
        alt: "Interactive 3D model of the RoboCop helmet",
        label: "Helmet",
      },
    ],
    thumb: { position: "50% 22%" },
    media: [
      {
        src: "/projects/robocop-helmet.jpg",
        alt: "The 3D-printed grey RoboCop helmet fitted onto a red Lego Bionicle figure, held in hand",
        caption: "Printed helmet seated on the Bionicle head it was measured to fit.",
      },
      {
        src: "/projects/robocop-helmet-2.jpg",
        alt: "Close-up of the printed helmet held in hand, showing the visor detail",
        caption: "Visor and brow detail off the print bed.",
      },
      {
        src: "/projects/robocop-cad.png",
        alt: "Onshape CAD model of the helmet with OCP POLICE 001 detailing",
        caption: "Onshape surface model: swept brow, domed crown, embossed “OCP POLICE 001.”",
      },
      {
        src: "/projects/robocop-1987.jpg",
        alt: "RoboCop from the 1987 film in full armor, the reference the helmet model was based on",
        caption: "The 1987 film reference the silhouette was modeled from.",
      },
    ],
  },
  {
    id: "tire-analysis",
    featured: false,
    title: "Hoosier R20 Tire Study",
    category: "Formula SAE",
    context: "Duke Motorsports · 2026",
    summary:
      "A camber and temperature study of the Hoosier R20 that set the kinematic targets for the 2027 suspension.",
    facts: [
      {
        label: "Problem",
        text: "Camber and Ackermann for the 2027 car needed to come from the tire, not from last year's geometry copied forward.",
      },
      {
        label: "My role",
        text: "I ran the tire study: lateral force against slip angle, across load and camber, and a temperature comparison against the LC0.",
      },
      {
        label: "Methods",
        text: "The Hoosier R20 16x7.5-10, carried over from 2026, at 12 psi. For each normal load and camber I took the slip angle where lateral force peaks, and I plotted center carcass temperature against normalized lateral grip for the R20 and the LC0.",
      },
      {
        label: "Result",
        text: "Peak grip sits between 0° and -1° of camber, which became the target for the outside front tire. Slip angle at that peak is smaller at lighter loads, which argues for anti-Ackermann, while pro-Ackermann turns in better, so the car stays at neutral Ackermann. The R20 loses less grip as temperature moves than the LC0 does. Its best grip is at a center temperature of 55–60°C.",
      },
    ],
    tags: ["Tire data", "Vehicle dynamics", "Optimum Kinematics"],
    thumb: { fit: "contain" },
    media: [
      {
        src: "/projects/tires-camber.png",
        alt: "Tire analysis slide with tables of peak lateral force and slip angle for the Hoosier R20 across camber and normal load at 12 psi",
        caption: "Hoosier R20 at 12 psi. Peak lateral force sits at 0° to -1° of camber, so Ackermann stays neutral.",
      },
      {
        src: "/projects/tires-temperature.png",
        alt: "Scatter plot of normalized lateral grip against center tire temperature for the R20 and the LC0",
        caption: "Center temperature against grip. The R20 holds on better than the LC0, best between 55 and 60°C.",
      },
    ],
  },
];
