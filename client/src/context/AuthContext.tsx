import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

/**
 * Auth Context - إدارة مركزية للـ Token والمصادقة
 * 
 * هذا الـ Context يوفر:
 * - تخزين واسترجاع الـ Token بشكل آمن
 * - حالة المصادقة (isAuthenticated)
 * - بيانات المستخدم
 * - دوال login و logout
 * - دالة getAuthHeader() جاهزة للاستخدام مع API calls
 * 
 * الاستخدام:
 * 
 * 1. في أي مكون:
 *    const { token, isAuthenticated, getAuthHeader, logout } = useAuth();
 * 
 * 2. عند استدعاء API:
 *    fetch(url, {
 *      headers: {
 *        ...getAuthHeader(),
 *        'Content-Type': 'application/json'
 *      }
 *    })
 * 
 * 3. للتحقق من تسجيل الدخول:
 *    if (isAuthenticated) { ... }
 */

interface UserData {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    bir_of_date?: string | null;
    location?: string | null;
    image?: string | null;
    gender?: string;
    status?: boolean;
}

interface AuthContextType {
    token: string | null;
    tokenType: string;
    userData: UserData | null;
    isAuthenticated: boolean;
    login: (token: string, tokenType: string, userData: UserData) => void;
    logout: () => void;
    updateUserData: (userData: Partial<UserData>) => void;
    getAuthHeader: () => { Authorization: string } | Record<string, never>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [tokenType, setTokenType] = useState<string>('Bearer');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // تحميل البيانات من localStorage عند بدء التطبيق
    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        const storedTokenType = localStorage.getItem('token_type');
        const storedUserData = localStorage.getItem('user_data');

        if (storedToken) {
            setToken(storedToken);
            setTokenType(storedTokenType || 'Bearer');

            if (storedUserData) {
                try {
                    setUserData(JSON.parse(storedUserData));
                } catch (e) {
                    console.error('Error parsing stored user data:', e);
                }
            }
        }

        setIsLoading(false);
    }, []);

    /**
     * تسجيل الدخول وحفظ البيانات
     */
    const login = useCallback((newToken: string, newTokenType: string, newUserData: UserData) => {
        setToken(newToken);
        setTokenType(newTokenType);
        setUserData(newUserData);

        localStorage.setItem('auth_token', newToken);
        localStorage.setItem('token_type', newTokenType);
        localStorage.setItem('user_data', JSON.stringify(newUserData));
    }, []);

    /**
     * تسجيل الخروج ومسح البيانات
     */
    const logout = useCallback(() => {
        setToken(null);
        setTokenType('Bearer');
        setUserData(null);

        localStorage.removeItem('auth_token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('user_data');
        localStorage.removeItem('verification_user_id');
    }, []);

    /**
     * تحديث بيانات المستخدم
     */
    const updateUserData = useCallback((newData: Partial<UserData>) => {
        setUserData(prev => {
            const updated = { ...prev, ...newData } as UserData;
            localStorage.setItem('user_data', JSON.stringify(updated));
            return updated;
        });
    }, []);

    /**
     * الحصول على header المصادقة للـ API calls
     * 
     * مثال الاستخدام:
     * fetch(url, { headers: { ...getAuthHeader(), 'Content-Type': 'application/json' } })
     */
    const getAuthHeader = useCallback((): { Authorization: string } | Record<string, never> => {
        if (token) {
            return { Authorization: `${tokenType} ${token}` };
        }
        return {};
    }, [token, tokenType]);

    const isAuthenticated = !!token;

    // عرض شاشة تحميل أثناء استرجاع البيانات
    if (isLoading) {
        return null; // أو يمكنك عرض loading spinner
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                tokenType,
                userData,
                isAuthenticated,
                login,
                logout,
                updateUserData,
                getAuthHeader,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook للوصول لـ Auth Context
 * 
 * const { token, isAuthenticated, getAuthHeader, logout } = useAuth();
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
