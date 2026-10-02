import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Lock, 
  Search, 
  UserCheck, 
  Key, 
  Ban, 
  Edit, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { sampleUsers } from '../data/sampleUsers';
import { User, UserRole } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { Modal } from '../components/common/Modal';

export const UsersPage: React.FC = () => {
  const { currentUser, switchRole } = useApp();
  const [usersList, setUsersList] = useState<User[]>(sampleUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('Verification Officer');
  const [newUserDistrict, setNewUserDistrict] = useState('Mysuru');

  const filteredUsers = usersList.filter(u => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.employeeId.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: User = {
      id: `USR-GOV-${Math.floor(100 + Math.random() * 900)}`,
      name: newUserName,
      employeeId: `EMP-RD-${Math.floor(1000 + Math.random() * 9000)}`,
      email: newUserEmail,
      role: newUserRole,
      district: newUserDistrict,
      department: 'Revenue & Cadastral Operations Directorate',
      status: 'Active',
      lastLogin: 'Never (New Account)',
    };

    setUsersList(prev => [newUser, ...prev]);
    setIsAddModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    alert(`Officer account created for ${newUserName} with Employee ID ${newUser.employeeId}.`);
  };

  const handleToggleStatus = (userId: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase">
              Administrative Gateway
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Active Authorized Officers: <strong className="text-slate-800">{usersList.length}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Officer & Role Access Management (RBAC)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure officer designations, district jurisdictions, cryptographic signing privileges, and multi-factor auth.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          <span>Provision New Officer</span>
        </button>
      </div>

      {/* Security Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-gov flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-slate-900">Role-Based Access Control</h4>
            <p className="text-slate-500 mt-0.5">Granular permissions for Verification Officers, Surveyors, and District Authorities.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-gov flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-slate-900">Digital Token Verification</h4>
            <p className="text-slate-500 mt-0.5">All land record approvals require PKI digital certificate endorsement.</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-gov flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-slate-900">Automated Session Audit</h4>
            <p className="text-slate-500 mt-0.5">Continuous IP and subnet geo-fencing on NIC National Backbone.</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-gov overflow-hidden">
        {/* Table Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Officer Name, ID, District, Role..."
              className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100/70 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3.5">Officer Name</th>
                <th className="px-4 py-3.5">Employee ID</th>
                <th className="px-4 py-3.5">Designation / Role</th>
                <th className="px-4 py-3.5">Assigned District</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5 text-center">Status</th>
                <th className="px-4 py-3.5">Last Login</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {u.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-blue-900 font-bold">
                    {u.employeeId}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-800">
                    {u.district}
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] max-w-xs truncate">
                    {u.department}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-[11px]">
                    {u.lastLogin}
                  </td>
                  <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => switchRole(u.role)}
                      className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition-colors"
                      title="Test login as this user"
                    >
                      Login As
                    </button>
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`px-2 py-1 rounded font-bold text-xs transition-colors ${
                        u.status === 'Active'
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {u.status === 'Active' ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Provision Authorized Government Personnel"
        subtitle="Create credentials and assign administrative cadastral authority."
        maxWidth="lg"
      >
        <form onSubmit={handleAddUser} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-700">Officer Full Name</label>
            <input
              type="text"
              required
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="e.g. Shri Manjunath Hegde"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-700">NIC Email Address</label>
            <input
              type="email"
              required
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="e.g. m.hegde@bhoomiverify.gov.in"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Assign Role</label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="Verification Officer">Verification Officer</option>
                <option value="Administrator">Administrator</option>
                <option value="Land Records Officer">Land Records Officer</option>
                <option value="Survey Officer">Survey Officer</option>
                <option value="District Authority">District Authority</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">District Jurisdiction</label>
              <select
                value={newUserDistrict}
                onChange={(e) => setNewUserDistrict(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="Mysuru">Mysuru</option>
                <option value="Mandya">Mandya</option>
                <option value="Bengaluru Rural">Bengaluru Rural</option>
                <option value="Tumakuru">Tumakuru</option>
                <option value="Hassan">Hassan</option>
                <option value="Shivamogga">Shivamogga</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
            >
              Provision Account
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
