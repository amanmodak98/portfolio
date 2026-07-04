import { useFetch } from "../hooks/useFetch";
import { getCertificates } from "../services/resources";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import Spinner from "../components/Spinner";
import { uploadsUrl } from "../services/api";

const fmt = (d: string) =>
  new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "long" });

export default function Certifications() {
  const { data: certs, loading } = useFetch(getCertificates, []);

  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications"
        subtitle="Courses and certifications I've earned."
      />

      {loading ? (
        <Spinner />
      ) : (certs || []).length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(certs || []).map((c, i) => (
            <Reveal key={c.id} delay={i * 0.07}>
              <div className="card card-hover flex h-full flex-col">
                <div className="mb-4 flex h-36 w-full items-center justify-center overflow-hidden rounded-xl border border-hair bg-gradient-to-br from-brand-600/20 to-accent-500/10">
                  {c.imageUrl ? (
                    <img
                      src={uploadsUrl(c.imageUrl)}
                      alt={c.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl">🏅</span>
                  )}
                </div>
                <h3 className="font-semibold text-ink">{c.title}</h3>
                <p className="text-sm text-brand-300">{c.issuer}</p>
                <p className="mt-1 text-xs text-faint">{fmt(c.issueDate)}</p>
                {c.verifyUrl && (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto pt-3 text-sm font-medium text-brand-300 hover:text-brand-200"
                  >
                    Verify credential →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-faint">No certificates yet.</p>
      )}
    </div>
  );
}
