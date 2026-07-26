export const STEERING_MOUNT_MEDIA = [
  {
    type: "image",
    src: "/projects/steering-mount-rack-1.png",
    alt: "SolidWorks assembly of the sensor mount clamped around the middle of the full steering rack, with tie-rod ends at each side",
    caption:
      "CAD assembly — the mount clamped to the center of the steering rack, sensor seated on top.",
  },
  {
    type: "image",
    src: "/projects/steering-mount-rack-2.png",
    alt: "Angled SolidWorks view showing the sensor drum and shaft protruding from the mount on the steering rack",
    caption:
      "Sensor coupled to the rack — the 360° angle sensor registers steering rotation.",
  },
  {
    type: "image",
    src: "/projects/steering-mount-only.png",
    alt: "SolidWorks view of the two-piece clamshell mount by itself, showing the sensor bore and corner fastener holes",
    caption:
      "Two-piece clamshell — sensor bore in the center, M4/M3 fastener holes at the corners.",
  },
  {
    type: "image",
    src: "/projects/steering-mount-real-1.jpg",
    alt: "The 3D-printed yellow mount body and its separate curved rack-clamp half on a workbench",
    caption:
      "Printed in PLA — the main body and the curved rack-clamp half before assembly.",
  },
  {
    type: "image",
    src: "/projects/steering-mount-real-2.jpg",
    alt: "The assembled printed mount clamped around the polished aluminum steering rack, installed in the car chassis with the sensor wired below",
    caption:
      "Installed on the car — clamped around the rack with M4/M3 hardware, sensor wired in.",
  },
  {
    type: "image",
    src: "/projects/steering-mount-real-3.jpg",
    alt: "Another angle of the printed mount clamped on the steering rack in the chassis, sensor and wiring visible underneath",
    caption: "Holding the sensor against the rack, mounted in the chassis.",
  },
];

export const STEERING_MOUNT_WORK = {
  kind: "caseStudy",
  label: "STEERING ANGLE SENSOR MOUNT",
  blocks: [
    {
      h: "THE CHALLENGE",
      p: "Duke Motorsports needed to log steering angle on the car. A 360° Hall-effect angle sensor (5V supply, 0–5V output) had to be held rigidly against the steering rack and coupled to its rotation, surviving the vibration of a running FSAE car — without machining anything on the rack itself.",
    },
    {
      h: "THE APPROACH",
      p: "I designed a two-piece clamshell mount in SolidWorks that wraps the steering rack and cradles the sensor. Every critical dimension is driven by global variables and tolerances: the clamp bores are sized to the rack and sensor diameters, and the fastener holes are toleranced for M4 and M3 bolts and nuts so hardware seats with the right clearance and clamping fit. Change a diameter and the mount re-fits.",
    },
    {
      h: "THE OUTCOME",
      p: "A 3D-printed mount that clamps onto the rack and holds the sensor in place on the car — printed, bolted together with M4/M3 hardware, and installed on the chassis.",
    },
  ],
  media: STEERING_MOUNT_MEDIA,
  tags: [
    "SolidWorks",
    "Tolerance Analysis",
    "Design Variables",
    "3D Printing",
    "Sensor Integration",
  ],
};
