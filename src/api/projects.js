const BASE_URL = "scriptlyserver-production.up.railway.app";

export const createProject = async (name) => {
  const res = await fetch(`${BASE_URL}/projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description: "새 프로젝트" }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`프로젝트 생성 실패: ${text}`);
  }

  return res.json(); // FastAPI에서 반환된 Project 객체
};
export const getProjects = async () => {
  const res = await fetch(`${BASE_URL}/projects/`);
  return res.json();
};

export const getProject = async (id) => {
  const res = await fetch(`${BASE_URL}/projects/${id}`);
  return res.json();
};
