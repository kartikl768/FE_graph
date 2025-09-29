import React, { useState } from "react";

export default function ScheduleForm() {
  const [candidateEmail, setCandidateEmail] = useState("");
  const [interviewerEmail, setInterviewerEmail] = useState("");
  const [subject, setSubject] = useState("Interview");
  const [body, setBody] = useState("Please join the interview.");
  const [startLocal, setStartLocal] = useState("");
  const [endLocal, setEndLocal] = useState("");
  const [resp, setResp] = useState<any>(null);

  function toUtcIso(localDateTime: string) {
    if (!localDateTime) return "";
    const d = new Date(localDateTime);
    return d.toISOString();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      CandidateEmail: candidateEmail,
      InterviewerEmail: interviewerEmail,
      Subject: subject,
      Body: body,
      StartUtc: toUtcIso(startLocal),
      EndUtc: toUtcIso(endLocal),
    };

    const res = await fetch("/api/schedule/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setResp(data);
  }

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">📅 Schedule Interview</h2>
          <form onSubmit={onSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label className="form-label">Candidate Email</label>
              <input
                type="email"
                className="form-control"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
                placeholder="candidate@example.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Interviewer Email</label>
              <input
                type="email"
                className="form-control"
                value={interviewerEmail}
                onChange={(e) => setInterviewerEmail(e.target.value)}
                placeholder="interviewer@example.com"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Body</label>
              <textarea
                className="form-control"
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Start (local)</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={startLocal}
                  onChange={(e) => setStartLocal(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">End (local)</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={endLocal}
                  onChange={(e) => setEndLocal(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Schedule
              </button>
            </div>
          </form>

          {resp && (
            <div className="alert alert-info mt-4" role="alert">
              <h5 className="alert-heading">Result</h5>
              <pre className="mb-0">{JSON.stringify(resp, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
