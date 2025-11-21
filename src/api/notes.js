const BASE_URL = "scriptlyserver-production.up.railway.app";

export const createNote = async (data) => {
  const res = await fetch(`${BASE_URL}/notes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getNotes = async (projectId) => {
  const res = await fetch(`${BASE_URL}/notes/project/${projectId}`);
  return res.json();
};
