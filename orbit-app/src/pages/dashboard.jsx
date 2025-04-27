import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

function Dashboard({ dataCount }) {
  // Dashboard Info API
  const { data: dashboardInfoData, error: dashboardInfoError, isLoading: isDashboardInfoLoading } = useQuery(
    ['dashboardInfoData'],
    fetchDashboardInfoData,
    {
      enabled: dataCount > 0,
      retry: false,
      cacheTime: 0,
    }
  );

  if (isDashboardInfoLoading) return <div>Loading dashboard info...</div>;
  if (dashboardInfoError) return <div>Error loading dashboard info</div>;

  return (
    <div>
      <h1>Dashboard Info</h1>
      <pre>{JSON.stringify(dashboardInfoData, null, 2)}</pre> {/* Displaying fetched data without validation */}
    </div>
  );
}

export default Dashboard;

// Fetch Dashboard Info Data
export const fetchDashboardInfoData = async () => {
  const response = await axios.get('https://orbit-dashboard-api.vercel.app/get-dashboard-activity');
  const { data } = response;
  return data;
};

