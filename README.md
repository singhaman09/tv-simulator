# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


3. Enable Developer Mode on LG TV

	Install Developer Mode App from LG Content Store.
	Sign in with your webOS Developer account.
	Enable Developer Mode from the app.
	Restart the TV to activate it.

4. Connect Your TV to PC
	ares-setup-device
	Add a new device (give it name like lgwebos)
	IP address: (your LG TV IP)
	Port: 9922 (default)

	Then verify:
	ares-device-info --device lgwebos
5. Package Your Project

	ares-package ./your-project-folder
	This creates a .ipk file (webOS app package)

6. Install App to LG TV

	ares-install --device lgwebos yourapp.ipk
7. Launch the App

	ares-launch --device lgwebos com.your.appid
	(Use your correct app ID from appinfo.json)