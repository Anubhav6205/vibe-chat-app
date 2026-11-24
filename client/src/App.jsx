
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from "./context/AccountProvider";
import SearchProvider from "./context/SearchProvider";
import Message from "./components/Message/Message";
import Login from "./components/Login/Login";
import LoginBox from "./components/Login Box/LoginBox";
import { DEMO_MODE } from "./config";

export default function App() {
  const clientId = '978784189066-5eutunn9o213qq4jh678gag09ijijbav.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {DEMO_MODE && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 2000,
            background: "#111", color: "#fff", fontSize: 13, padding: "4px 12px",
            textAlign: "center", fontFamily: "sans-serif",
          }}
        >
          Offline demo: no server or database. Contacts are scripted bots and nothing is saved.{" "}
          <a style={{ color: "#9ecbff" }} href="https://github.com/Anubhav6205/vibe-chat-app" target="_blank" rel="noopener noreferrer">
            Source on GitHub
          </a>
        </div>
      )}
      <AccountProvider>
        <SearchProvider>
          <LoginBox />
          <Login />
          <Message />
        </SearchProvider>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}
