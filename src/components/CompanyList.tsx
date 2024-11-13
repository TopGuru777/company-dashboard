"use client"
import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CompanyListItem from './CompanyListItem';
import { fetchCompanies, mockDeleteRequest } from '@/utils/api';
import { Company } from '@/types';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<number>>(new Set());
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const data = await fetchCompanies(1);
        setCompanies(data);
        if (data.length === 0) setHasMore(false);
      } catch (error) {
        toast.error('Error fetching companies.');
        console.error('Error fetching companies:', error);
      }
    };

    initialLoad();
  }, []);

  const loadMore = useCallback(async () => {
    const nextPage = page + 1;
    try {
      const data = await fetchCompanies(nextPage);
      setCompanies(prev => [...prev, ...data]);
      setPage(nextPage);
      if (data.length === 0) setHasMore(false);
    } catch (error) {
      toast.error('Error fetching more companies.');
      console.error('Error fetching more companies:', error);
    }
  }, [page]);

  const handleSelect = useCallback((id: number) => {
    setSelectedCompanies(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  }, []);

  const handleDeleteRequest = useCallback(async () => {
    setDeleting(true);
    try {
      const { message }: any = await mockDeleteRequest(selectedCompanies);
      if (message === 'success') {
        setCompanies(prev => prev.filter(company => !selectedCompanies.has(company.id)));
        setSelectedCompanies(new Set());
        toast.success('Companies deleted successfully!');
      }
    } catch (error) {
      toast.error('Error in delete request.');
      console.error('Error in delete request:', error);
    } finally {
      setDeleting(false);
    }
  }, [selectedCompanies]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <InfiniteScroll
        dataLength={companies.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
            <div className='flex justify-center my-4'>
                <ClipLoader size={35} color='#123abc' loading={true} />
            </div>
        }
        endMessage={<p className="text-center my-4 font-bold">No more companies</p>}
        className='pb-16'
      >
        <ul className="space-y-2">
          {companies.map(company => (
            <CompanyListItem
              key={company.id}
              company={company}
              selected={selectedCompanies.has(company.id)}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      </InfiniteScroll>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-center items-center">
        <button
          onClick={handleDeleteRequest}
          className="w-full max-w-md py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          {deleting ? (
            <div className="flex justify-center">
              <ClipLoader size={24} color={"white"} loading={deleting} />
            </div>
          ) : (
            'Delete Selected'
          )}
        </button>
      </div>
    </div>
  );
};

export default CompanyList;
