import { useState, useCallback } from 'react';
import jobApi from '../api/jobApi';
import { toast } from 'react-hot-toast';

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchJobs = useCallback(async (params) => {
    setLoading(true);
    try {
      const data = await jobApi.getJobs(params);
      setJobs(data.content);
      setTotalPages(data.totalPages);
      return data;
    } catch (error) {
      toast.error('Identity of this job collection is currently synchronized.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteJob = useCallback(async (id) => {
    try {
      await jobApi.deleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
      toast.success('Career application archived.');
    } catch (error) {
      toast.error('Archiving operation failed.');
    }
  }, []);

  return { jobs, loading, totalPages, fetchJobs, deleteJob };
};
