import axiosClient from './axiosClient';

const jobApi = {
  getJobs: (params) => axiosClient.get('/jobs', { params }),
  getJob: (id) => axiosClient.get(`/jobs/${id}`),
  createJob: (data) => axiosClient.post('/jobs', data),
  updateJob: (id, data) => axiosClient.put(`/jobs/${id}`, data),
  deleteJob: (id) => axiosClient.delete(`/jobs/${id}`),
  getStats: () => axiosClient.get('/analytics/stats'),
};

export default jobApi;
