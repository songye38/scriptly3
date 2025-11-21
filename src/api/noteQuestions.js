const BASE_URL = "scriptlyserver-production.up.railway.app";

/** 노트와 질문 연결 */
export const linkNoteQuestion = async (noteId, questionId) => {
  const res = await fetch(`${BASE_URL}/note-questions/${noteId}/${questionId}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("연결 실패");
  return res.json();
};

/** 연결 해제 */
export const unlinkNoteQuestion = async (noteId, questionId) => {
  const res = await fetch(`${BASE_URL}/note-questions/${noteId}/${questionId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("연결 해제 실패");
  return res.json();
};
