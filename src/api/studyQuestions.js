const BASE_URL = "scriptlyserver-production.up.railway.app";

export const createStudyQuestion = async (data) => {
  const res = await fetch(`${BASE_URL}/study-questions/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getStudyQuestions = async (projectId) => {
  const res = await fetch(`${BASE_URL}/study-questions/project/${projectId}`);
  return res.json();
};
