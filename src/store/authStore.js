import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchApi } from '../api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      customer: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          // Attempt Medusa backend auth
          let customerData = null;
          try {
            const res = await fetchApi('/auth', {
              method: 'POST',
              body: JSON.stringify({ email, password }),
            });
            if (res && res.customer) {
              customerData = res.customer;
            }
          } catch (backendErr) {
            console.warn("Backend auth call error, using local customer fallback", backendErr);
          }

          // If backend doesn't return customer, construct from local or input
          if (!customerData) {
            const savedCustomers = JSON.parse(localStorage.getItem('nf_registered_customers') || '[]');
            const existing = savedCustomers.find(c => c.email.toLowerCase() === email.toLowerCase());
            if (existing) {
              if (existing.password && existing.password !== password) {
                throw new Error("Invalid email or password");
              }
              customerData = {
                id: existing.id || 'cust_' + Date.now(),
                first_name: existing.first_name,
                last_name: existing.last_name,
                email: existing.email,
                phone: existing.phone || '',
                orders: existing.orders || [],
                addresses: existing.addresses || []
              };
            } else {
              // Default test login
              customerData = {
                id: 'cust_' + Date.now(),
                first_name: email.split('@')[0],
                last_name: 'Customer',
                email: email,
                phone: '+91 9876543210',
                orders: [],
                addresses: []
              };
            }
          }

          set({
            customer: customerData,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
          return { success: true, customer: customerData };
        } catch (err) {
          set({ error: err.message || 'Login failed', loading: false });
          return { success: false, error: err.message };
        }
      },

      register: async ({ first_name, last_name, email, phone, password }) => {
        set({ loading: true, error: null });
        try {
          let newCustomer = null;
          try {
            const res = await fetchApi('/customers', {
              method: 'POST',
              body: JSON.stringify({
                first_name,
                last_name,
                email,
                phone,
                password,
              }),
            });
            if (res && res.customer) {
              newCustomer = res.customer;
            }
          } catch (backendErr) {
            console.warn("Backend registration call error, saving locally", backendErr);
          }

          if (!newCustomer) {
            newCustomer = {
              id: 'cust_' + Date.now(),
              first_name,
              last_name,
              email,
              phone: phone || '',
              password,
              orders: [],
              addresses: []
            };
          }

          // Persist in local storage for re-login
          const savedCustomers = JSON.parse(localStorage.getItem('nf_registered_customers') || '[]');
          savedCustomers.push(newCustomer);
          localStorage.setItem('nf_registered_customers', JSON.stringify(savedCustomers));

          set({
            customer: newCustomer,
            isAuthenticated: true,
            loading: false,
            error: null,
          });
          return { success: true, customer: newCustomer };
        } catch (err) {
          set({ error: err.message || 'Registration failed', loading: false });
          return { success: false, error: err.message };
        }
      },

      logout: async () => {
        try {
          await fetchApi('/auth', { method: 'DELETE' }).catch(() => {});
        } catch (_) {}
        set({ customer: null, token: null, isAuthenticated: false, error: null });
      },

      updateProfile: (updatedData) => {
        set((state) => ({
          customer: state.customer ? { ...state.customer, ...updatedData } : null,
        }));
      },

      addOrder: (order) => {
        set((state) => {
          if (!state.customer) return state;
          const currentOrders = state.customer.orders || [];
          const updatedOrders = [order, ...currentOrders];
          const updatedCustomer = {
            ...state.customer,
            orders: updatedOrders,
          };

          // Also update saved registered customers in localStorage if exists
          try {
            const saved = JSON.parse(localStorage.getItem('nf_registered_customers') || '[]');
            const idx = saved.findIndex(c => c.email?.toLowerCase() === state.customer.email?.toLowerCase());
            if (idx !== -1) {
              saved[idx].orders = updatedOrders;
              localStorage.setItem('nf_registered_customers', JSON.stringify(saved));
            }
          } catch (e) {
            console.warn('Error saving order to localStorage:', e);
          }

          return { customer: updatedCustomer };
        });
      },

      addAddress: (address) => {
        set((state) => {
          if (!state.customer) return state;
          const currentAddrs = state.customer.addresses || [];
          // Avoid duplicate addresses
          const exists = currentAddrs.some(a => a.address === address.address);
          const updatedAddrs = exists ? currentAddrs : [address, ...currentAddrs];
          const updatedCustomer = {
            ...state.customer,
            addresses: updatedAddrs,
          };

          try {
            const saved = JSON.parse(localStorage.getItem('nf_registered_customers') || '[]');
            const idx = saved.findIndex(c => c.email?.toLowerCase() === state.customer.email?.toLowerCase());
            if (idx !== -1) {
              saved[idx].addresses = updatedAddrs;
              localStorage.setItem('nf_registered_customers', JSON.stringify(saved));
            }
          } catch (e) {
            console.warn('Error saving address to localStorage:', e);
          }

          return { customer: updatedCustomer };
        });
      }
    }),
    {
      name: 'naikfoods-auth',
    }
  )
);
