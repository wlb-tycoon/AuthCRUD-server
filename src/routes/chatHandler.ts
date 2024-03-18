const openaiApiKey = process.env.openaiApiKey;

import axios, { AxiosResponse } from "axios";

async function chatHandler(req: any, res: any): Promise<void> {
  try {
    const { message }: any = req.body;
    const response: AxiosResponse<any, any> = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );
    res.code(200).send({ response: response.data.choices[0].message.content });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while processing the request" });
  }
}

export default chatHandler;
