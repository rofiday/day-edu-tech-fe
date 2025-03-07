import forge from "node-forge";
import { Buffer } from "buffer";
export const encryptPayload = (payload, session) => {
  try {
    const jsonPayload = JSON.stringify(payload);
    const symmetricKey = forge.random.getBytesSync(32);
    const iv = forge.random.getBytesSync(16);

    const cipher = forge.cipher.createCipher("AES-CBC", symmetricKey);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(jsonPayload, "utf8"));
    cipher.finish();

    const encryptedPayload = cipher.output.getBytes();

    const pemPublicKey = Buffer.from(
      import.meta.env.VITE_APP_PUBLIC_KEY,
      "base64"
    ).toString("utf-8");
    const publicKey = forge.pki.publicKeyFromPem(pemPublicKey);
    const encryptedSymmetricKey = publicKey.encrypt(symmetricKey, "RSA-OAEP");

    const hmac = forge.hmac.create();
    hmac.start("sha256", session);
    hmac.update(encryptedPayload);
    const hmacDigest = hmac.digest().toHex();
    return {
      __unknown: Buffer.from(
        JSON.stringify({
          payload: forge.util.encode64(encryptedPayload),
          key: forge.util.encode64(encryptedSymmetricKey),
          iv: forge.util.encode64(iv),
          hmac: hmacDigest,
          session: session,
        })
      ).toString("base64"),
    };
  } catch (error) {
    console.error("Failed to process the request");
    throw new Error(error.message);
  }
};
