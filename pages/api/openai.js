// /pages/api/openai.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일에서 API 키 가져오기
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question, messages } = req.body;

    try {
      // OpenAI API 호출
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // 또는 사용하고자 하는 모델로 변경
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...messages,
          { role: 'user', content: question },
        ],
      });

      // OpenAI의 답변을 클라이언트로 반환
      res.status(200).json({ answer: response.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'OpenAI API 호출 중 오류가 발생했습니다.' });
    }
  } else {
    res.status(405).json({ error: '허용되지 않은 요청 방식입니다.' });
  }
}
