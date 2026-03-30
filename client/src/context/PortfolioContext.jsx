import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();
const API = import.meta.env.VITE_API_URL;

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState({
    projects: [],
    skills: [],
    experience: [],
    certificates: [],
    profile: null,
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [projRes, skillsRes, expRes, userRes, certRes] = await Promise.all([
        fetch(`${API}/api/projects`),
        fetch(`${API}/api/skills`),
        fetch(`${API}/api/experience`),
        fetch(`${API}/api/user`),
        fetch(`${API}/api/certificates`)
      ]);

      const [projects, skills, experience, profile, certificates] = await Promise.all([
        projRes.json(),
        skillsRes.json(),
        expRes.json(),
        userRes.json(),
        certRes.json()
      ]);

      setData({ projects, skills, experience, profile, certificates });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, refreshData: fetchData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
