import { cleanEnv, str, email, json } from 'envalid'
const env = cleanEnv(process.env, {
  REACT_APP_BACKEND_URL: str()
})