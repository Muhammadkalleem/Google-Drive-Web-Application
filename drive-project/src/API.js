const BASE = "http://localhost:5000/api";

export const API = {
  REGISTER: `${BASE}/users/register`,
  LOGIN: `${BASE}/users/login`,
  PROFILE: `${BASE}/users/profile`,
  FILES: `${BASE}/files`,
  UPLOAD: `${BASE}/files/upload`,   // ✅ correct path
  DELETE: (id) => `${BASE}/files/${id}`, // ✅ correct path
  UPLOAD: "http://localhost:5000/api/files/upload",
  DELETE: (id) => `http://localhost:5000/api/files/${id}`

};
