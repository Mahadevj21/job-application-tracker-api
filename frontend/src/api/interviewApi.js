import axiosClient from './axiosClient';

const interviewApi = {
  getInterviewsByJobId: (jobId) => axiosClient.get(`/interviews/job/${jobId}`),
  createInterview: (data) => axiosClient.post('/interviews', data),
  getInterview: (id) => axiosClient.get(`/interviews/${id}`),
};

export default interviewApi;
