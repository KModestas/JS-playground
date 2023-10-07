import { sendDataRequest } from "../http/http.js";

class ValidationError {
  constructor(message) {
    this.message = message;
  }
}

function validateNotEmpty(text, errorMessage) {
  if (!text || text.trim().length === 0) {
    throw new ValidationError(errorMessage);
  }
}

export function savePost(postData) {
  postData.created = new Date();
  return sendDataRequest(postData);
}

export function extractPostData(form) {
  const title = form.get("title");
  const content = form.get("content");

  validateNotEmpty(title, "A title must be provided.");
  validateNotEmpty(content, "Content must not be empty!");

  return { title, content };
}
