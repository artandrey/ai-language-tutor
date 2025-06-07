export function TranscriptView({ transcript }: { transcript: string }) {
  return (
    <div
      style={{ marginTop: '1em', padding: '0.5em', border: '1px solid #ccc' }}
    >
      <strong>Agent is saying:</strong>
      <div>{transcript || <em>No agent message yet.</em>}</div>
    </div>
  );
}
