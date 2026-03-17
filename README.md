# Multi-Cloud Manager (MCM) 🚀

A real-time, full-stack dashboard designed to monitor and manage services across multiple cloud providers (Render, Vercel, Netlify, and Aiven) from a single interface.

---

**Live Demo:** [https://mcm-rfhpw3j0f-teja-jangas-projects.vercel.app/](https://mcm-rfhpw3j0f-teja-jangas-projects.vercel.app/)

---

## 🛠️ Features
- **Unified Monitoring:** Real-time health checks for Render services, Vercel projects, Netlify sites, and Aiven databases.
- **Incident Log Console:** A motion-animated system log tracking API synchronization and network latency.
- **Global Search:** Cross-platform search to quickly locate specific project nodes.
- **Smart Analytics:** Automatically calculates active nodes and total connectivity status.
- **Resilient Architecture:** Implemented `Promise.allSettled` logic to ensure the dashboard remains functional even if one cloud provider is unreachable.
- **Dynamic Background:** Persistent theme management with high-performance Canvas background effects.

---

## 🏗️ Tech Stack
- **Frontend:** React.js (Vite), Framer Motion, Lucide Icons.
- **Backend:** Node.js, Express.js (Proxy Server for CORS bypass).
- **Styling:** Tailwind CSS (Mobile-first responsive design).
- **APIs:** Render API, Vercel API, Netlify API, Aiven API.
- **Deployment:** Vercel (Frontend), Render (Backend).

---

## 🚀 Installation & Setup
1. Clone the repository.
2. Run `npm install` in the root, `client`, and `server` directories.
3. Configure your `.env` files with your respective Cloud Provider Tokens.
4. Use `npm run dev` to launch both the server and client concurrently.

---

## 📁 Project Structure

```text
MCM-App/
├── client/                # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI (Home, Footer, etc.)
│   │   ├── API/           # Axios configurations
│   │   └── App.jsx        # Main routing & state
│   └── public/            # Static assets (SVG logos)
├── server/                # Node.js Express Backend
│   ├── index.js           # API Proxy & Routes
│   └── .env               # Private API Keys (Hidden)
├── package.json           # Root scripts for Concurrency
└── .gitignore             # Multilevel ignore rules

```

---

## 🚧 Future Enhancements

- **Service Analytics:** Add charts to visualize service uptime and database usage over time.
- **User Authentication:** Secure the dashboard with Firebase or Auth0 for personal account management.

--- 

## Author
**Teja Janga**
🔗 GitHub: [@Teja-Janga](https://github.com/Teja-Janga)
💼 LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/teja-janga)

--- 

## 📄 License
This project is for learning and portfolio purposes.
You are free to fork and experiment with it. For any serious reuse, please credit the original author.

**Made by Teja Janga**