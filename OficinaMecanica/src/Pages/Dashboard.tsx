import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <h1>Auto Repair Shop Dashboard</h1>
        <Button icon="pi pi-sign-out" label="Logout" onClick={handleLogout} className="p-button-danger" />
      </div>
      
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-3">
          <Card title="Active Services" className="shadow-2">
            <div className="text-4xl text-center">12</div>
            <div className="text-center mt-3">Current services in progress</div>
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <Card title="Vehicles" className="shadow-2">
            <div className="text-4xl text-center">45</div>
            <div className="text-center mt-3">Registered vehicles</div>
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <Card title="Customers" className="shadow-2">
            <div className="text-4xl text-center">28</div>
            <div className="text-center mt-3">Active customers</div>
          </Card>
        </div>
        <div className="col-12 md:col-6 lg:col-3">
          <Card title="Revenue" className="shadow-2">
            <div className="text-4xl text-center">$4,250</div>
            <div className="text-center mt-3">Monthly revenue</div>
          </Card>
        </div>
      </div>
      
      <div className="mt-4">
        <Card title="Recent Services" className="shadow-2">
          <p>Here you will display a table of recent services...</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;