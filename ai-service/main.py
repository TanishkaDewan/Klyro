from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Klyro AI Service is running"}


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "klyro-ai"
    }


class EvaluationRequest(BaseModel):
    team_id: str
    repo_url: str
    challenge_id: str


@app.post("/evaluate")
def evaluate(request: EvaluationRequest):
    return {
        "team_id": request.team_id,
        "repo_url": request.repo_url,
        "challenge_id": request.challenge_id,
        "message": "Evaluation request received"
    }