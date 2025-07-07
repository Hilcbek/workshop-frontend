# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
## 🗺️ Frontend Routes (React Router)

This project uses React Router with role-based access control for Admin and Customer pages.

---

### ✅ Customer Site Routes

| Path              | Auth         | Description                                |
| ------------------ | ------------ | ------------------------------------------ |
| `/`                | Public       | Home page                                  |
| `/register`        | Must not     | Register page for customers                |
| `/login`           | Must not     | Login page for customers                   |
| `/create-booking`  | Must (User)  | Create new booking (select workshop/slot)  |
| `/update-booking`  | Must (User)  | Update existing booking                    |
| `/my-bookings`     | Must (User)  | View all bookings made by the user         |

---

### ✅ Admin Panel Routes (under `/admin`)

| Path                        | Auth         | Description                                             |
| --------------------------- | ------------ | ------------------------------------------------------- |
| `/admin`                    | Must (Admin) | Admin dashboard with analytics charts                   |
| `/admin/all-workshops`      | Must (Admin) | View and manage all workshops                           |
| `/admin/add-workshop`       | Must (Admin) | Add a new workshop                                      |
| `/admin/update-workshop`    | Must (Admin) | Update existing workshop                                |
| `/admin/all-bookings`       | Must (Admin) | View all bookings                                       |
| `/admin/all-timeslots`      | Must (Admin) | View and manage all time slots                          |
| `/admin/add-timeslot`       | Must (Admin) | Add a new time slot                                     |
| `/admin/update-timeslot`    | Must (Admin) | Update existing time slot                               |

---

### ✅ 404 Not Found Page

| Path | Auth   | Description           |
| ---- | ------ | --------------------- |
| `*`  | Public | Catches unmatched routes |

---

### ⚡️ Role-based Access Control

✅ `Must` - User must be authenticated  
✅ `Must (User)` - Must be logged in as **customer**  
✅ `Must (Admin)` - Must be logged in as **admin**  
✅ `Must not` - Only accessible if NOT logged in

---

### ⚙️ Notes
- All **/admin/** routes are protected with `RoleBasedRoute` to require **admin** role.
- Customer routes also use `RoleBasedRoute` to protect booking pages.
- Fallback 404 page renders for any unmatched path.
