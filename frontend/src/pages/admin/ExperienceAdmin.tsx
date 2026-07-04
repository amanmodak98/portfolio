import CrudManager from "../../components/admin/CrudManager";
import { experienceApi } from "../../services/resources";
import type { Experience } from "../../types";

export default function ExperienceAdmin() {
  return (
    <CrudManager<Experience>
      title="Experience"
      addLabel="Add Experience"
      api={experienceApi}
      fields={[
        { name: "position", label: "Position", required: true },
        { name: "company", label: "Company", required: true },
        { name: "startDate", label: "Start date", type: "date", required: true },
        { name: "endDate", label: "End date (blank = present)", type: "date" },
        { name: "description", label: "Description", type: "textarea", full: true },
      ]}
      empty={{ position: "", company: "", startDate: "", endDate: "", description: "" }}
      toForm={(e) => ({
        position: e.position,
        company: e.company,
        startDate: e.startDate.slice(0, 10),
        endDate: e.endDate ? e.endDate.slice(0, 10) : "",
        description: e.description,
      })}
      toPayload={(f) => ({
        position: f.position,
        company: f.company,
        startDate: f.startDate,
        endDate: f.endDate || null,
        description: f.description,
      })}
      primary={(e) => `${e.position} · ${e.company}`}
      secondary={(e) =>
        `${e.startDate.slice(0, 7)} — ${e.endDate ? e.endDate.slice(0, 7) : "Present"}`
      }
    />
  );
}
