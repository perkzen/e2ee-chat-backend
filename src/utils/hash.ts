import * as bcrypt from 'bcrypt';

export const hashData = async (data: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

export const compareHash = async (
  data1: string,
  data2: string,
): Promise<boolean> => {
  return await bcrypt.compare(data1, data2);
};
