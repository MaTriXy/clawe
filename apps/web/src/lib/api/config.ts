import axios from "axios";
import type { ConfigResponse } from "@/lib/config/types";

export type SaveConfigResponse = { ok: true } | { ok: false; error: string };

export const getConfig = async (): Promise<ConfigResponse> => {
  const { data } = await axios.get<ConfigResponse>("/api/config");
  return data;
};

export const saveConfig = async (
  convexUrl: string,
): Promise<SaveConfigResponse> => {
  const { data } = await axios.post<SaveConfigResponse>("/api/config", {
    convexUrl,
  });
  return data;
};
