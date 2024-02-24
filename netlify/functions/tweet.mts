import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  let code, data;

  try {
    const response = await fetch(
      "https://twitter.com/JoshWComeau/status/1757864818877325495"
    );
    data = await response.json();

    console.log(data);

    code = 200;
  } catch (error) {
    code = error.statusCode || 500;
    data = {
      error: error.message,
    };
  }

  return {
    body: JSON.stringify({ data: data }),
    statusCode: code,
  };
};
