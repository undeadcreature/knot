<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redux Auth & Theme Demo</title>
    <script src="https://unpkg.com/redux@4.2.1/dist/redux.min.js"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #000000;
            --card-bg: #f5f5f5;
            --button-bg: #007bff;
            --button-text: #ffffff;
            --nav-bg: #ffffff;
            --nav-border: #e5e7eb;
            --nav-text: #374151;
        }

        [data-theme="dark"] {
            --bg-color: #1a1a1a;
            --text-color: #ffffff;
            --card-bg: #2d2d2d;
            --button-bg: #0056b3;
            --button-text: #ffffff;
            --nav-bg: #1f2937;
            --nav-border: #374151;
            --nav-text: #e5e7eb;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-color);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            transition: all 0.3s ease;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .card {
            background-color: var(--card-bg);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1, h2 {
            margin-top: 0;
        }

        button {
            background-color: var(--button-bg);
            color: var(--button-text);
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 10px;
            font-weight: bold;
        }

        button:hover {
            opacity: 0.9;
        }

        input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 200px;
            margin-right: 10px;
        }

        .user-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .auth-section, .theme-section {
            margin-bottom: 30px;
        }

        .status {
            padding: 8px 12px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 10px;
        }

        .authenticated {
            background-color: #d4edda;
            color: #155724;
        }

        .not-authenticated {
            background-color: #f8d7da;
            color: #721c24;
        }

        .theme-indicator {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-left: 10px;
            vertical-align: middle;
        }

        .light-indicator {
            background-color: #ffc107;
        }

        .dark-indicator {
            background-color: #343a40;
        }

        /* Navigation styles */
        .top-nav {
            position: sticky;
            top: 0;
            z-index: 50;
            background-color: var(--nav-bg);
            border-bottom: 1px solid var(--nav-border);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            padding: 0 1rem;
        }

        .nav-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 4rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .nav-left, .nav-right {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .nav-center {
            flex: 1;
            max-width: 32rem;
            margin: 0 1rem;
        }

        .search-input {
            position: relative;
            width: 100%;
        }

        .search-input input {
            width: 100%;
            padding-left: 2.5rem;
            background-color: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 9999px;
            color: var(--nav-text);
        }

        .search-input input:focus {
            background-color: var(--nav-bg);
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #9ca3af;
        }

        .nav-button {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            color: #6b7280;
            border-radius: 0.5rem;
            transition: all 0.2s;
        }

        .nav-button:hover {
            color: #374151;
            background-color: #f3f4f6;
        }

        .notification-badge {
            position: absolute;
            top: -0.25rem;
            right: -0.25rem;
            width: 1.25rem;
            height: 1.25rem;
            background-color: #ef4444;
            color: white;
            font-size: 0.75rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .avatar {
            width: 2rem;
            height: 2rem;
            border-radius: 9999px;
            object-fit: cover;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .logo-icon {
            width: 2rem;
            height: 2rem;
            background: linear-gradient(to right, #2563eb, #8b5cf6);
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 0.875rem;
        }

        .logo-text {
            font-size: 1.25rem;
            font-weight: bold;
            color: var(--nav-text);
        }

        .user-name {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--nav-text);
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { createSlice, configureStore, combineReducers } = Redux;
        const { Provider, useDispatch, useSelector } = ReactRedux;
        const { useState } = React;

        // Auth Slice
        const authSlice = createSlice({
            name: "auth",
            initialState: {
                isAuthenticated: false,
                user: null,
            },
            reducers: {
                login: (state, action) => {
                    state.isAuthenticated = true;
                    state.user = action.payload;
                },
                logout: (state) => {
                    state.isAuthenticated = false;
                    state.user = null;
                },
            },
        });

        // Theme Slice (this was missing)
        const themeSlice = createSlice({
            name: "theme",
            initialState: {
                currentTheme: 'light'
            },
            reducers: {
                toggleTheme: (state) => {
                    state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
                },
                setTheme: (state, action) => {
                    state.currentTheme = action.payload;
                },
            },
        });

        // UI Slice (for search and sidebar)
        const uiSlice = createSlice({
            name: "ui",
            initialState: {
                searchQuery: '',
                sidebarOpen: false
            },
            reducers: {
                setSearchQuery: (state, action) => {
                    state.searchQuery = action.payload;
                },
                toggleSidebar: (state) => {
                    state.sidebarOpen = !state.sidebarOpen;
                },
            },
        });

        // Notifications Slice
        const notificationsSlice = createSlice({
            name: "notifications",
            initialState: {
                unreadCount: 5
            },
            reducers: {
                incrementUnread: (state) => {
                    state.unreadCount += 1;
                },
                clearUnread: (state) => {
                    state.unreadCount = 0;
                },
            },
        });

        // Combine reducers
        const rootReducer = combineReducers({
            auth: authSlice.reducer,
            theme: themeSlice.reducer,
            ui: uiSlice.reducer,
            notifications: notificationsSlice.reducer,
        });

        // Create store
        const store = configureStore({
            reducer: rootReducer
        });

        // Mock user data
        const mockUser = {
            name: "John Doe",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        };

        // TopNavigation Component (fixed import)
        const TopNavigation = () => {
            const dispatch = useDispatch();
            const { user, isAuthenticated } = useSelector(state => state.auth);
            const { currentTheme } = useSelector(state => state.theme);
            const { searchQuery } = useSelector(state => state.ui);
            const { unreadCount } = useSelector(state => state.notifications);

            const handleLogin = () => {
                dispatch(authSlice.actions.login(mockUser));
            };

            const handleLogout = () => {
                dispatch(authSlice.actions.logout());
            };

            const handleToggleTheme = () => {
                dispatch(themeSlice.actions.toggleTheme());
            };

            const handleSearchChange = (e) => {
                dispatch(uiSlice.actions.setSearchQuery(e.target.value));
            };

            const handleToggleSidebar = () => {
                dispatch(uiSlice.actions.toggleSidebar());
            };

            return (
                <nav className="top-nav">
                    <div className="nav-container">
                        {/* Left section */}
                        <div className="nav-left">
                            <button
                                onClick={handleToggleSidebar}
                                className="nav-button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            
                            <div className="logo">
                                <div className="logo-icon">K</div>
                                <h1 className="logo-text">Knot</h1>
                            </div>
                        </div>

                        {/* Center section - Search */}
                        <div className="nav-center">
                            <div className="search-input">
                                <div className="search-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search alumni, posts, events..."
                                />
                            </div>
                        </div>

                        {/* Right section */}
                        <div className="nav-right">
                            <button
                                onClick={handleToggleTheme}
                                className="nav-button"
                            >
                                {currentTheme === 'light' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )}
                            </button>
                            
                            <button className="nav-button relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                <span className="notification-badge">3</span>
                            </button>
                            
                            <button className="nav-button relative">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                {unreadCount > 0 && (
                                    <span className="notification-badge">{unreadCount}</span>
                                )}
                            </button>

                            {isAuthenticated ? (
                                <div className="flex items-center gap-2">
                                    <img
                                        className="avatar"
                                        src={user.avatar}
                                        alt={user.name}
                                    />
                                    <span className="user-name">{user.name}</span>
                                    <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </nav>
            );
        };

        // Demo App Component
        const App = () => {
            const { isAuthenticated, user } = useSelector(state => state.auth);
            const { currentTheme } = useSelector(state => state.theme);
            const { searchQuery } = useSelector(state => state.ui);
            const dispatch = useDispatch();

            React.useEffect(() => {
                // Set theme on document for CSS
                document.documentElement.setAttribute('data-theme', currentTheme);
            }, [currentTheme]);

            return (
                <div>
                    <TopNavigation />
                    <div className="container">
                        <h1>Redux Authentication & Theme Demo</h1>
                        
                        <div className="card auth-section">
                            <h2>Authentication</h2>
                            <div className={`status ${isAuthenticated ? 'authenticated' : 'not-authenticated'}`}>
                                {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
                            </div>
                            
                            <div className="user-info">
                                <div>
                                    {isAuthenticated ? (
                                        <button onClick={() => dispatch(authSlice.actions.logout())}>
                                            Logout
                                        </button>
                                    ) : (
                                        <button onClick={() => dispatch(authSlice.actions.login(mockUser))}>
                                            Login
                                        </button>
                                    )}
                                </div>
                                <div id="user-display">
                                    {isAuthenticated ? `User: ${user.name}` : 'No user logged in'}
                                </div>
                            </div>
                        </div>
                        
                        <div className="card theme-section">
                            <h2>Theme Control</h2>
                            <button onClick={() => dispatch(themeSlice.actions.toggleTheme())}>
                                Toggle Theme
                            </button>
                            <span>Current theme: {currentTheme}</span>
                            <span className={`theme-indicator ${currentTheme === 'light' ? 'light-indicator' : 'dark-indicator'}`}></span>
                        </div>
                        
                        <div className="card">
                            <h2>Redux State Information</h2>
                            <pre>{JSON.stringify({
                                auth: { isAuthenticated, user },
                                theme: { currentTheme },
                                ui: { searchQuery }
                            }, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            );
        };

        // Render the app
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    </script>
</body>
</html>