import * as SecureStore from "expo-secure-store";
let token: string | null = null;

export async function setToken(newToken: string): Promise<void> {
  // Code implementation
  token = newToken;

  if (token !== null) {
    await SecureStore.setItemAsync("token", token);
  } else {
    await SecureStore.deleteItemAsync("token");
  }
}

export async function getToken() {
  if (token !== null) {
    return token;
  }

  token = await SecureStore.getItemAsync("token");

  return token;
}

export async function deleteToken() {
  token = null;
  await SecureStore.deleteItemAsync("token");
}
