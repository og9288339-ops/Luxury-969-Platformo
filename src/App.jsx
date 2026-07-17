import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/routing/ProtectedRoute';

// استيراد مباشر للصفحات الأساسية لضمان الاستقرار (Stability > Lazy Load في مرحلة البيع)
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Shop from './pages/Shop';
import Login from './pages/Login';
import AuctionsPage from './pages/AuctionsPage';
import InsightsPage from './pages/InsightsPage';

// الـ Admin فقط نجعله Lazy لأنه صفحة خاصة
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#050505] text-yellow-500 text-lg tracking-[0.5em] uppercase animate-pulse">
    System Initializing...
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة سريعة جداً للتحقق
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingFallback />;

  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/auctions" element={<AuctionsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* توجيه ذكي لأي مسار خاطئ */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;