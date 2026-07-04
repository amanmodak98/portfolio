import CrudManager from "../../components/admin/CrudManager";
import { skillsApi } from "../../services/resources";
import type { Skill } from "../../types";

export default function SkillsAdmin() {
  return (
    <CrudManager<Skill>
      title="Skills"
      addLabel="Add Skill"
      api={skillsApi}
      fields={[
        { name: "name", label: "Name", required: true },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: ["Frontend", "Backend", "DevOps", "Cloud", "Other"],
        },
        { name: "percentage", label: "Proficiency (%)", type: "number", required: true },
      ]}
      empty={{ name: "", category: "Frontend", percentage: "80" }}
      toForm={(s) => ({
        name: s.name,
        category: s.category,
        percentage: String(s.percentage),
      })}
      toPayload={(f) => ({
        name: f.name,
        category: f.category,
        percentage: Number(f.percentage),
      })}
      primary={(s) => `${s.name} — ${s.percentage}%`}
      secondary={(s) => s.category}
    />
  );
}
