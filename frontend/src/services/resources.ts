import api from "./api";
import type {
  Blog,
  Certificate,
  DashboardOverview,
  Education,
  Experience,
  Message,
  Project,
  SiteSettings,
  Skill,
} from "../types";

// Public reads
export const getProjects = (params?: { search?: string; tech?: string }) =>
  api.get<Project[]>("/projects", { params }).then((r) => r.data);
export const getProject = (id: number | string) =>
  api.get<Project>(`/projects/${id}`).then((r) => r.data);
export const getSkills = () => api.get<Skill[]>("/skills").then((r) => r.data);
export const getExperience = () =>
  api.get<Experience[]>("/experience").then((r) => r.data);
export const getEducation = () =>
  api.get<Education[]>("/education").then((r) => r.data);
export const getCertificates = () =>
  api.get<Certificate[]>("/certificates").then((r) => r.data);
export const getBlogs = (params?: { tag?: string; category?: string; all?: boolean }) =>
  api.get<Blog[]>("/blogs", { params }).then((r) => r.data);
export const getBlogBySlug = (slug: string) =>
  api.get<Blog>(`/blogs/slug/${slug}`).then((r) => r.data);
export const sendMessage = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => api.post("/messages", data).then((r) => r.data);

export const getSettings = () =>
  api.get<SiteSettings>("/settings").then((r) => r.data);

// Generic CRUD factory for simple resources (skills, experience, education).
function crud<T>(path: string) {
  return {
    list: () => api.get<T[]>(`/${path}`).then((r) => r.data),
    create: (data: Partial<T>) =>
      api.post<T>(`/${path}`, data).then((r) => r.data),
    update: (id: number, data: Partial<T>) =>
      api.put<T>(`/${path}/${id}`, data).then((r) => r.data),
    remove: (id: number) => api.delete(`/${path}/${id}`),
  };
}

export const skillsApi = crud<Skill>("skills");
export const experienceApi = crud<Experience>("experience");
export const educationApi = crud<Education>("education");

// Admin
export const updateSettings = (data: Partial<SiteSettings>) =>
  api.put<SiteSettings>("/settings", data).then((r) => r.data);

export const getDashboard = () =>
  api.get<DashboardOverview>("/dashboard").then((r) => r.data);
export const getMessages = () =>
  api.get<Message[]>("/messages").then((r) => r.data);
export const setMessageReplied = (id: number, replied: boolean) =>
  api.patch<Message>(`/messages/${id}`, { replied }).then((r) => r.data);
export const deleteMessage = (id: number) => api.delete(`/messages/${id}`);

export const getAllBlogs = () => getBlogs({ all: true });
export const createBlog = (data: Partial<Blog>) =>
  api.post<Blog>("/blogs", data).then((r) => r.data);
export const updateBlog = (id: number, data: Partial<Blog>) =>
  api.put<Blog>(`/blogs/${id}`, data).then((r) => r.data);
export const deleteBlog = (id: number) => api.delete(`/blogs/${id}`);

export const createProject = (data: Partial<Project>) =>
  api.post<Project>("/projects", data).then((r) => r.data);
export const updateProject = (id: number, data: Partial<Project>) =>
  api.put<Project>(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id: number) => api.delete(`/projects/${id}`);

export const createCertificate = (data: Partial<Certificate>) =>
  api.post<Certificate>("/certificates", data).then((r) => r.data);
export const updateCertificate = (id: number, data: Partial<Certificate>) =>
  api.put<Certificate>(`/certificates/${id}`, data).then((r) => r.data);
export const deleteCertificate = (id: number) =>
  api.delete(`/certificates/${id}`);

export const uploadFile = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return api
    .post<{ url: string }>("/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((r) => r.data);
};
