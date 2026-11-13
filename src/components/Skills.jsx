import { ChevronDown } from "lucide-react";

const CATEGORIES = [
  {
    label: "CAD & simulation",
    skills: ["SolidWorks", "Onshape", "FEA", "CFD", "Optimum Kinematics"],
  },
  {
    label: "Manufacturing",
    skills: ["CNC mill", "Lathe", "Waterjet", "Laser cutter", "3D printing", "ShopBot"],
  },
  {
    label: "Programming",
    skills: ["Python", "JavaScript", "Java", "SwiftUI", "Arduino"],
  },
  {
    label: "Research methods",
    skills: [
      "Load cell instrumentation",
      "Drop tower testing",
      "Flow cytometry",
      "ML model training",
    ],
  },
  {
    label: "Software & design",
    skills: ["FastAPI", "SwiftData", "Figma", "Photoshop", "Adobe Illustrator"],
  },
  {
    label: "Languages",
    skills: ["English", "Spanish", "Hebrew"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container-page">
        <details className="group">
          <summary
            id="skills-title"
            className="section-title flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg border-2 border-ink px-5 py-4 transition-colors duration-150 hover:bg-surface [&::-webkit-details-marker]:hidden"
          >
            Skills
            <ChevronDown
              size={22}
              aria-hidden="true"
              className="shrink-0 text-muted transition-transform duration-150 group-open:rotate-180"
            />
          </summary>

          <dl className="mt-8 border-t border-line pt-8">
            {CATEGORIES.map((category) => (
              <div
                key={category.label}
                className="grid gap-1 border-t border-line py-5 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-12"
              >
                <dt className="label lg:col-span-3 lg:pt-0.5">{category.label}</dt>
                <dd className="lg:col-span-9">
                  <ul className="flex flex-wrap gap-x-6 gap-y-1 text-base font-medium text-ink">
                    {category.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </details>
      </div>
    </section>
  );
}
