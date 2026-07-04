import CrudManager from "../../components/admin/CrudManager";
import { educationApi } from "../../services/resources";
import type { Education } from "../../types";

export default function EducationAdmin() {
  return (
    <CrudManager<Education>
      title="Education"
      addLabel="Add Education"
      api={educationApi}
      fields={[
        { name: "degree", label: "Degree", required: true },
        { name: "institution", label: "Institution", required: true },
        { name: "startYear", label: "Start year", type: "number", required: true },
        { name: "endYear", label: "End year (blank = present)", type: "number" },
        { name: "cgpa", label: "CGPA / Grade", full: true },
      ]}
      empty={{ degree: "", institution: "", startYear: "", endYear: "", cgpa: "" }}
      toForm={(e) => ({
        degree: e.degree,
        institution: e.institution,
        startYear: String(e.startYear),
        endYear: e.endYear ? String(e.endYear) : "",
        cgpa: e.cgpa || "",
      })}
      toPayload={(f) => ({
        degree: f.degree,
        institution: f.institution,
        startYear: Number(f.startYear),
        endYear: f.endYear ? Number(f.endYear) : null,
        cgpa: f.cgpa || null,
      })}
      primary={(e) => `${e.degree} · ${e.institution}`}
      secondary={(e) => `${e.startYear} — ${e.endYear ?? "Present"}`}
    />
  );
}
