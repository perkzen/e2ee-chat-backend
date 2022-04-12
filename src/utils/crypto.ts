import * as crypto from 'crypto';

export const generatePublic = () => {
  const client = crypto.getDiffieHellman('modp1');
  client.generateKeys();
  const buffer = client.getPublicKey();

  return buffer.toString('base64');
};

export const diffieHellman = () => {
  const client = crypto.getDiffieHellman('modp1');
  const recipient = crypto.getDiffieHellman('modp1');
  client.generateKeys();
  recipient.generateKeys();
  const clientSecret = client.computeSecret(recipient.getPublicKey());

  return clientSecret.toString('base64');
};
