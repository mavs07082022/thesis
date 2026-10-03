import { Crop } from '@/types';
import { TARGET_CROPS } from '@/utils/constants';

export const cropService = {
  async getAll(): Promise<Crop[]> {
    await new Promise((r) => setTimeout(r, 200));
    return TARGET_CROPS;
  },

  getById(id: string): Crop | undefined {
    return TARGET_CROPS.find((c) => c.id === id);
  },
};