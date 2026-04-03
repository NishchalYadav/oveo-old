import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import Layout from '../components/Layout';

const Admin = () => {
  const [contacts, setContacts] = useState([]);
  const [newsletter, setNewsletter] = useState([]);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setContacts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    const fetchNewsletter = async () => {
      const q = query(collection(db, 'newsletter'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setNewsletter(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    if (user) {
      fetchContacts();
      fetchNewsletter();
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const downloadCSV = (data: any[], filename: string) => {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${header}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!user) {
    return (
      <Layout>
        <div className="pt-32 pb-32 px-6 flex items-center justify-center">
          <form onSubmit={handleLogin} className="w-full max-w-sm p-8 bg-black border border-white/20 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-2 bg-secondary border border-border rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full px-4 py-2 bg-secondary border border-border rounded"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded">Login</button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12">Admin Panel</h1>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
              <button onClick={() => downloadCSV(contacts, 'contacts.csv')} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold">Download CSV</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full bg-black border border-white/20">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-b border-white/20 text-left">Name</th>
                    <th className="py-3 px-4 border-b border-white/20 text-left">Email</th>
                    <th className="py-3 px-4 border-b border-white/20 text-left">Business Name</th>
                    <th className="py-3 px-4 border-b border-white/20 text-left">Project Type</th>
                    <th className="py-3 px-4 border-b border-white/20 text-left">Budget</th>
                    <th className="py-3 px-4 border-b border-white/20 text-left">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact.id}>
                      <td className="py-3 px-4 border-b border-white/20">{contact.name}</td>
                      <td className="py-3 px-4 border-b border-white/20">{contact.email}</td>
                      <td className="py-3 px-4 border-b border-white/20">{contact.businessName}</td>
                      <td className="py-3 px-4 border-b border-white/20">{contact.projectType}</td>
                      <td className="py-3 px-4 border-b border-white/20">{contact.budget}</td>
                      <td className="py-3 px-4 border-b border-white/20">{contact.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Newsletter Subscriptions</h2>
              <button onClick={() => downloadCSV(newsletter, 'newsletter.csv')} className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold">Download CSV</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <table className="min-w-full bg-black border border-white/20">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-b border-white/20 text-left">Email</th>
                    <th className="py-3 px-4 border-b border-white/20 text-left">Subscribed At</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletter.map(item => (
                    <tr key={item.id}>
                      <td className="py-3 px-4 border-b border-white/20">{item.email}</td>
                      <td className="py-3 px-4 border-b border-white/20">{new Date(item.createdAt?.seconds * 1000).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
