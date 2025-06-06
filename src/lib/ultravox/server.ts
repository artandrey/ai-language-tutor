import {
  AgentsCallsCreateResponse,
  AgentsService,
  CallsRetrieveResponse,
  CallsService,
} from './client';

export async function createUltravoxCall(): Promise<AgentsCallsCreateResponse> {
  const apiKey = process.env.ULTRAVOX_API_KEY!;
  const agentId = process.env.ULTRAVOX_AGENT_ID!;

  const response = await AgentsService.agentsCallsCreate({
    path: {
      agent_id: agentId,
    },
    headers: {
      'X-API-Key': apiKey!,
    },
  });
  if (response.error) {
    throw response.error;
  }
  const data = response.data!;

  return data;
}

export async function getUltravoxCall(
  callId: string
): Promise<CallsRetrieveResponse> {
  const apiKey = process.env.ULTRAVOX_API_KEY!;

  const response = await CallsService.callsRetrieve({
    path: {
      call_id: callId,
    },
    headers: {
      'X-API-Key': apiKey!,
    },
  });
  if (response.error) {
    throw response.error;
  }
  const data = response.data!;

  return data;
}
