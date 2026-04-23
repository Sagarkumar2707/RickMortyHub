import axios from 'axios';
import { fetchCharacterById } from '../api/axiosInstance';
import { Character } from '@types/api.types';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  })),
}));

import axiosInstance from '../api/axiosInstance';

describe('API Service', () => {
  const mockCharacter: Partial<Character> = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
  };

  it('fetchCharacterById should return character data on success', async () => {
    // Access the mocked get method
    (axiosInstance.get as jest.Mock).mockResolvedValueOnce({ data: mockCharacter });

    const result = await fetchCharacterById(1);

    expect(axiosInstance.get).toHaveBeenCalledWith('/character/1');
    expect(result).toEqual(mockCharacter);
  });

  it('fetchCharacterById should throw error on failure', async () => {
    const errorMessage = 'Network Error';
    (axiosInstance.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchCharacterById(1)).rejects.toThrow(errorMessage);
  });
});
