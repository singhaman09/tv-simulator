// import React, { useContext, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import {
//   useFocusable,
//   FocusContext,
//   setFocus,
// } from "@noriginmedia/norigin-spatial-navigation";
// import Header from "../component/Header";
// import Footer from "../component/footer";

// const Focusable = React.memo(({ onEnterPress, children, focusKey }) => {
//   const { ref, focused } = useFocusable({
//     onEnterPress,
//     focusKey,
//     onFocus: () => {
//       console.log(`Focused: ${focusKey}`);
//       if (ref.current) {
//         const input = ref.current.querySelector("input, button");
//         if (input) input.focus();
//       }
//     },
//     onArrowPress: (direction) => {
//       console.log(`Arrow key pressed: ${direction} on ${focusKey}`);
//       return true;
//     },
//   });
//   return (
//     <div ref={ref} tabIndex={-1}>
//       {children(focused, { ref })}
//     </div>
//   );
// });

// function Login() {
//   console.log("Login rendered");
//   const { login } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [email, setEmailState] = React.useState("");
//   const [password, setPasswordState] = React.useState("");
//   const [error, setError] = React.useState("");
//   const setEmail = React.useCallback((value) => setEmailState(value), []);
//   const setPassword = React.useCallback((value) => setPasswordState(value), []);
//   const focusableOptions = useMemo(
//     () => ({
//       focusKey: "LOGIN_PAGE",
//       trackChildren: true,
//       preferredChildFocusKey: "login-email",
//     }),
//     []
//   );
//   const { ref, focusKey } = useFocusable(focusableOptions);

//   const handleLogin = () => {
//     if (!email.trim() || !password.trim()) {
//       setError("Email and password are required.");
//       return;
//     }
//     login(() => navigate("/country"));
//   };

//   useEffect(() => {
//     console.log("setFocus called for login-email");
//     setFocus("login-email");
//     const emailInput = ref.current?.querySelector("input[placeholder='Email']");
//     if (emailInput) {
//       console.log("Focusing email input");
//       emailInput.focus();
//     }
//   }, [ref]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       console.log("Manual keydown:", e.key);
//       const emailInput = ref.current?.querySelector("input[placeholder='Email']");
//       const passwordInput = ref.current?.querySelector("input[placeholder='Password']");
//       const button = ref.current?.querySelector("button");
//       if (e.key === "ArrowDown") {
//         if (document.activeElement === emailInput) {
//           setFocus("login-password");
//           passwordInput?.focus();
//         } else if (document.activeElement === passwordInput) {
//           setFocus("login-button");
//           button?.focus();
//         }
//       } else if (e.key === "ArrowUp") {
//         if (document.activeElement === button) {
//           setFocus("login-password");
//           passwordInput?.focus();
//         } else if (document.activeElement === passwordInput) {
//           setFocus("login-email");
//           emailInput?.focus();
//         }
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [ref]);

//   useEffect(() => {
//     const checkLayout = () => {
//       const email = ref.current?.querySelector("input[placeholder='Email']")?.getBoundingClientRect();
//       const password = ref.current?.querySelector("input[placeholder='Password']")?.getBoundingClientRect();
//       const button = ref.current?.querySelector("button")?.getBoundingClientRect();
//       console.log("Layout:", { email, password, button });
//     };
//     window.addEventListener("resize", checkLayout);
//     checkLayout();
//     return () => window.removeEventListener("resize", checkLayout);
//   }, [ref]);

//   return (
//     <FocusContext.Provider value={focusKey}>
//       <div ref={ref} className="flex flex-col min-h-screen bg-black text-white">
//         <Header />
//         <main className="flex-grow flex flex-col items-center justify-center p-4">
//           <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8">
//             <h1 className="text-3xl font-bold mb-4 text-center">Welcome</h1>
//             <p className="text-gray-300 mb-6 text-center">
//               Enter any email and password to continue.
//             </p>
//             <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
//               <Focusable focusKey="login-email">
//                 {(focused, { ref }) => (
//                   <input
//                     ref={ref}
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     tabIndex={0}
//                     autoComplete="email"
//                     className={`w-full px-4 py-2 rounded bg-black text-white outline-none border ${
//                       focused ? "border-pink-500 ring-2 ring-pink-400" : "border-gray-600"
//                     }`}
//                   />
//                 )}
//               </Focusable>

//               <Focusable focusKey="login-password">
//                 {(focused, { ref }) => (
//                   <input
//                     ref={ref}
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     tabIndex={0}
//                     autoComplete="current-password"
//                     className={`w-full px-4 py-2 rounded bg-black text-white outline-none border ${
//                       focused ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-600"
//                     }`}
//                   />
//                 )}
//               </Focusable>

//               {error && <p className="text-red-400 text-sm">{error}</p>}

//               <Focusable focusKey="login-button" onEnterPress={handleLogin}>
//                 {(focused, { ref }) => (
//                   <button
//                     ref={ref}
//                     type="submit"
//                     onClick={handleLogin}
//                     className={`w-full py-2 rounded text-white transition ${
//                       focused ? "bg-blue-700" : "bg-blue-600"
//                     }`}
//                   >
//                     Login
//                   </button>
//                 )}
//               </Focusable>
//             </form>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     </FocusContext.Provider>
//   );
// }

// export default React.memo(Login);
// import React, { useContext, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import {
//   useFocusable,
//   FocusContext,
//   setFocus,
//   doesFocusableExist,
// } from "@noriginmedia/norigin-spatial-navigation";
// import Header from "../component/Header";
// import Footer from "../component/footer";

// const Focusable = React.memo(({ focusKey, onEnterPress, children }) => {
//   const { ref, focused } = useFocusable({
//     focusKey,
//     onEnterPress: () => {
//       if (focusKey === "login-email") {
//         setFocus("login-password");
//       } else if (focusKey === "login-password") {
//         setFocus("login-button");
//       } else if (focusKey === "login-button") {
//         if (typeof onEnterPress === "function") {
//           onEnterPress();
//         }
//       }
//     },
//     onArrowPress: () => true, // Allow arrow key navigation
//   });

//   // Trigger on-screen keyboard when input is focused
//   useEffect(() => {
//     if (focused && (focusKey === "login-email" || focusKey === "login-password")) {
//       // Small delay to ensure the element is properly focused
//       setTimeout(() => {
//         if (ref.current) {
//           console.log(`🔤 ${focusKey} focused → requesting keyboard`);
//           ref.current.focus(); // Programmatically focus the input
          
//           // Show webOS keyboard if available
//           if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
//             console.log("📱 Showing webOS keyboard");
//             window.webOS.keyboard.show();
//           }
//         }
//       }, 50);
//     }
//   }, [focused, focusKey, ref]);

//   return (
//     <div ref={ref} tabIndex={-1}>
//       {children(focused, { ref })}
//     </div>
//   );
// });

// function Login() {
//   const { login } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [error, setError] = React.useState("");

//   const handleLogin = useCallback(() => {
//     console.log("🔐 handleLogin fired");
//     if (!email.trim() || !password.trim()) {
//       setError("Email and password are required.");
//       return;
//     }
//     login(() => {
//       console.log("✅ Navigating to /country");
//       navigate("/country");
//     });
//   }, [email, password, login, navigate]);

//   const { ref, focusKey } = useFocusable({
//     focusKey: "LOGIN_PAGE",
//     trackChildren: true,
//     preferredChildFocusKey: "login-email",
//   });

//   useEffect(() => {
//     setTimeout(() => {
//       if (doesFocusableExist("login-email")) {
//         console.log("🎯 Setting initial focus to login-email");
//         setFocus("login-email");
//       }
//     }, 300);
//   }, []);

//   return (
//     <FocusContext.Provider value={focusKey}>
//       <div ref={ref} className="flex flex-col min-h-screen bg-black text-white">
//         <Header />
//         <main className="flex-grow flex flex-col items-center justify-center p-4">
//           <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8 space-y-4">
//             <h1 className="text-3xl font-bold text-center">Welcome</h1>
//             <p className="text-gray-300 text-center">
//               Enter any email and password to continue.
//             </p>

//             <Focusable focusKey="login-email">
//               {(focused, { ref }) => (
//                 <input
//                   ref={ref}
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       console.log("📧 Email Enter pressed → navigating to password");
//                       setFocus("login-password");
//                     }
//                   }}
//                   onFocus={() => {
//                     console.log("📧 Email input focused via click");
//                     // Show keyboard when clicked/focused
//                     if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
//                       window.webOS.keyboard.show();
//                     }
//                   }}
//                   placeholder="Email"
//                   autoComplete="email"
//                   inputMode="email"
//                   className={`w-full px-4 py-2 rounded bg-black text-white outline-none border-2 transition-all ${
//                     focused ? "border-pink-500 ring-2 ring-pink-400" : "border-gray-600"
//                   }`}
//                 />
//               )}
//             </Focusable>

//             <Focusable focusKey="login-password">
//               {(focused, { ref }) => (
//                 <input
//                   ref={ref}
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       e.preventDefault();
//                       console.log("🔒 Password Enter pressed → navigating to button");
//                       setFocus("login-button");
//                     }
//                   }}
//                   onFocus={() => {
//                     console.log("🔒 Password input focused via click");
//                     // Show keyboard when clicked/focused
//                     if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
//                       window.webOS.keyboard.show();
//                     }
//                   }}
//                   placeholder="Password"
//                   autoComplete="current-password"
//                   inputMode="text"
//                   className={`w-full px-4 py-2 rounded bg-black text-white outline-none border-2 transition-all ${
//                     focused ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-600"
//                   }`}
//                 />
//               )}
//             </Focusable>

//             {error && <p className="text-red-400 text-sm">{error}</p>}

//             <Focusable focusKey="login-button" onEnterPress={handleLogin}>
//               {(focused, { ref }) => (
//                 <button
//                   ref={ref}
//                   onClick={handleLogin}
//                   type="button"
//                   className={`w-full py-2 rounded text-white transition-all border-2 ${
//                     focused
//                       ? "bg-blue-700 border-blue-400 ring-2 ring-blue-400"
//                       : "bg-blue-600 border-blue-600"
//                   }`}
//                 >
//                   Login
//                 </button>
//               )}
//             </Focusable>
//           </div>
//         </main>
//         <Footer />
//       </div>
//     </FocusContext.Provider>
//   );
// }

// export default React.memo(Login);
import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  useFocusable,
  FocusContext,
  setFocus,
  doesFocusableExist,
} from "@noriginmedia/norigin-spatial-navigation";
import Header from "../component/Header";
import Footer from "../component/footer";

// Custom Focusable wrapper
const Focusable = React.memo(({ focusKey, onEnterPress, children }) => {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress,
    onArrowPress: () => true,
  });

  useEffect(() => {
    if (focused && (focusKey === "login-email" || focusKey === "login-password")) {
      setTimeout(() => {
        if (ref.current) {
          ref.current.focus();
          if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
            window.webOS.keyboard.show();
          }
        }
      }, 50);
    }
  }, [focused, focusKey, ref]);

  return (
    <div ref={ref} tabIndex={-1}>
      {children(focused, { ref })}
    </div>
  );
});

function Login() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = useCallback(() => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    login(() => navigate("/country"));
  }, [email, password, login, navigate]);

  const { ref, focusKey } = useFocusable({
    focusKey: "LOGIN_PAGE",
    trackChildren: true,
    preferredChildFocusKey: "login-email",
  });

  useEffect(() => {
    setTimeout(() => {
      if (doesFocusableExist("login-email")) {
        setFocus("login-email");
      }
    }, 300);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-8 space-y-4">
            <h1 className="text-3xl font-bold text-center">Welcome</h1>
            <p className="text-gray-300 text-center">
              Enter any email and password to continue.
            </p>

            {/* Email Input */}
            <Focusable
              focusKey="login-email"
              onEnterPress={() => {
                if (!email.trim()) {
                  const input = document.getElementById("loginEmailInput");
                  if (input) {
                    input.focus();
                    if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
                      window.webOS.keyboard.show();
                    }
                  }
                } else {
                  setFocus("login-password");
                }
              }}
            >
              {(focused, { ref }) => (
                <input
                  ref={ref}
                  id="loginEmailInput"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  inputMode="email"
                  className={`w-full px-4 py-2 rounded bg-black text-white outline-none border-2 transition-all ${
                    focused ? "border-pink-500 ring-2 ring-pink-400" : "border-gray-600"
                  }`}
                />
              )}
            </Focusable>

            {/* Password Input */}
            <Focusable
              focusKey="login-password"
              onEnterPress={() => {
                if (!password.trim()) {
                  const input = document.getElementById("loginPasswordInput");
                  if (input) {
                    input.focus();
                    if (typeof window.webOS !== "undefined" && window.webOS?.keyboard) {
                      window.webOS.keyboard.show();
                    }
                  }
                } else {
                  setFocus("login-button");
                }
              }}
            >
              {(focused, { ref }) => (
                <input
                  ref={ref}
                  id="loginPasswordInput"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  inputMode="text"
                  className={`w-full px-4 py-2 rounded bg-black text-white outline-none border-2 transition-all ${
                    focused ? "border-blue-500 ring-2 ring-blue-400" : "border-gray-600"
                  }`}
                />
              )}
            </Focusable>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Login Button */}
            <Focusable focusKey="login-button" onEnterPress={handleLogin}>
              {(focused, { ref }) => (
                <button
                  ref={ref}
                  onClick={handleLogin}
                  type="button"
                  className={`w-full py-2 rounded text-white transition-all border-2 ${
                    focused
                      ? "bg-blue-700 border-blue-400 ring-2 ring-blue-400"
                      : "bg-blue-600 border-blue-600"
                  }`}
                >
                  Login
                </button>
              )}
            </Focusable>
          </div>
        </main>
        <Footer />
      </div>
    </FocusContext.Provider>
  );
}

export default React.memo(Login);
