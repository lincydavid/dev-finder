// // contexts/ThemeContext.tsx
// import React, { ReactNode, createContext, useContext, useState } from 'react';

// interface ThemeContextType {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// }

// interface ThemeProviderProps {
//   children: ReactNode;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };


// export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
//   const [darkMode, setDarkMode] = useState<boolean>(false);

//   const toggleDarkMode = () => {
//     setDarkMode(prevMode => !prevMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
