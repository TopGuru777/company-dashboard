import { DeleteResponse } from '@/types';
import axios from 'axios';

export const fetchCompanies = async (page: number) => {
  const response = await axios.get(`/api/companies?page=${page}`);
  return response.data;
};

export const mockDeleteRequest = async (selectedCompanies: Set<number>): Promise<DeleteResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'success', data: selectedCompanies });
    }, 2000);
  });
};
