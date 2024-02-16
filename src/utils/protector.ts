import { TextEncoder, TextDecoder } from "text-encoding";
import crypto from "crypto";

export const passPhrase = new TextEncoder().encode(
  process.env.PROT_KEY as string
);
const algorithm = "aes-256-ecb";

export const protector = (value: string) => {
  const secret_msg = new TextEncoder().encode(value);

  const cipher = crypto.createCipheriv(
    algorithm,
    passPhrase,
    new Uint8Array(0)
  );
  const encrypted = Buffer.concat([cipher.update(secret_msg), cipher.final()]);

  return btoa(String.fromCharCode(...new Uint16Array(encrypted.buffer)));
};

// antagonist helps us get the decrypted values
export const antagonist = (protectedValue: string) => {
  try {
    const secret_msg = new Uint8Array(
      atob(protectedValue)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    const decipher = crypto.createDecipheriv(
      algorithm,
      passPhrase,
      new Uint8Array(0)
    );
    const decrypted = Buffer.concat([
      decipher.update(secret_msg),
      decipher.final(),
    ]);

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
