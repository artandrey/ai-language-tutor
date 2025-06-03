// Server-side Ultravox API integration
export interface UltravoxCall {
  callId: string;
  joinUrl: string;
  agentId?: string;
}

export interface CreateCallRequest {
  systemPrompt?: string;
  model?: string;
  voice?: string;
  temperature?: number;
  maxDuration?: string; // Should be duration string like "600s"
}

/**
 * Create a new call using Ultravox API
 */
export async function createUltravoxCall(): Promise<UltravoxCall> {
  const apiKey = process.env.ULTRAVOX_API_KEY;
  const agentId = process.env.ULTRAVOX_AGENT_ID;

  const response = await fetch(
    `https://api.ultravox.ai/api/agents/${agentId}/calls`,
    {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey!,
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  return {
    callId: data.callId,
    joinUrl: data.joinUrl,
    agentId: data.agentId,
  };
}

/**
 * Get call status from Ultravox API
 */
export async function getCallStatus(callId: string) {
  const apiKey = process.env.ULTRAVOX_API_KEY;

  if (!apiKey) {
    throw new Error('ULTRAVOX_API_KEY environment variable is not set');
  }

  try {
    const response = await fetch(
      `https://api.ultravox.ai/api/calls/${callId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get call status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting call status:', error);
    throw error;
  }
}

/**
 * End a call using Ultravox API
 */
export async function endCall(callId: string) {
  const apiKey = process.env.ULTRAVOX_API_KEY;

  if (!apiKey) {
    throw new Error('ULTRAVOX_API_KEY environment variable is not set');
  }

  try {
    const response = await fetch(
      `https://api.ultravox.ai/api/calls/${callId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to end call: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error ending call:', error);
    throw error;
  }
}
