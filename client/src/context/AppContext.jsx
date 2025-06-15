import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate()
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState('')
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalBlogs: 0,
        blogsPerPage: 9
    })

    const fetchBlogs = async (page = 1) => {
        try {
            const { data } = await axios.get(`/api/blog/all?page=${page}&limit=${pagination.blogsPerPage}`)
            if (data.state) {
                setBlogs(data.blogs)
                setPagination({
                    currentPage: data.currentPage || 1,
                    totalPages: data.totalPages || 1,
                    totalBlogs: data.totalBlogs || 0,
                    blogsPerPage: pagination.blogsPerPage
                })
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        axios.defaults.headers.common['Authorization'] = null;
        navigate('/');
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
                setUser(JSON.parse(jsonPayload));
            } catch (error) {
                console.error('Error decoding token:', error);
                logout();
            }
        }
    }, [])

    const value = {
        axios,
        navigate,
        token,
        setToken,
        user,
        setUser,
        blogs,
        setBlogs,
        input,
        setInput,
        pagination,
        fetchBlogs,
        logout
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => {
    return useContext(AppContext)
};