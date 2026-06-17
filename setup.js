const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'kolo-frontend', 'src');

const directories = [
  'app/(auth)/login',
  'app/(auth)/register',
  'app/(dashboard)/dashboard',
  'app/(dashboard)/groups/[id]',
  'app/(dashboard)/payments/send',
  'app/(dashboard)/payments/history',
  'app/(dashboard)/profile',
  'app/api/auth/[...nextauth]',
  'app/api/webhooks/whatsapp',
  'app/api/stellar/wallet',
  'app/api/stellar/transactions',
  'components/common/Button',
  'components/common/Input',
  'components/common/Card',
  'components/common/Modal',
  'components/dashboard/BalanceCard',
  'components/dashboard/TransactionList',
  'components/dashboard/QuickActions',
  'components/groups/GroupCard',
  'components/groups/GroupList',
  'components/groups/GroupCreation',
  'components/groups/ContributionTracker',
  'components/payments/SendPayment',
  'components/payments/RequestPayment',
  'components/payments/PaymentHistory',
  'components/layout/Header',
  'components/layout/Sidebar',
  'hooks',
  'services/api',
  'services/stellar',
  'services/whatsapp',
  'types',
  'utils/validators',
  'utils/formatters',
  'utils/constants',
  'context',
  'styles'
];

directories.forEach(dir => fs.mkdirSync(path.join(baseDir, dir), { recursive: true }));

const files = {
  'app/(auth)/login/page.tsx': 'export default function Login() { return <div>Login Page</div>; }',
  'app/(auth)/register/page.tsx': 'export default function Register() { return <div>Register Page</div>; }',
  'app/(dashboard)/dashboard/page.tsx': 'export default function Dashboard() { return <div>Dashboard Page</div>; }',
  'app/(dashboard)/groups/page.tsx': 'export default function Groups() { return <div>Groups Page</div>; }',
  'app/(dashboard)/groups/[id]/page.tsx': 'export default function GroupDetails() { return <div>Group Details</div>; }',
  'app/(dashboard)/payments/page.tsx': 'export default function Payments() { return <div>Payments Page</div>; }',
  'app/(dashboard)/payments/send/page.tsx': 'export default function SendPayment() { return <div>Send Payment</div>; }',
  'app/(dashboard)/payments/history/page.tsx': 'export default function PaymentHistory() { return <div>Payment History</div>; }',
  'app/(dashboard)/profile/page.tsx': 'export default function Profile() { return <div>Profile Page</div>; }',
  
  'app/api/auth/[...nextauth]/route.ts': 'export async function GET() { return Response.json({ message: "Auth route" }); }\nexport async function POST() { return Response.json({ message: "Auth route" }); }',
  'app/api/webhooks/whatsapp/route.ts': 'export async function POST() { return Response.json({ message: "Webhook route" }); }',
  'app/api/stellar/wallet/route.ts': 'export async function GET() { return Response.json({ message: "Wallet route" }); }',
  'app/api/stellar/transactions/route.ts': 'export async function GET() { return Response.json({ message: "Transactions route" }); }',

  'app/layout.tsx': 'import "../styles/globals.css";\nexport const metadata = { title: "Kolo App" };\nexport default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }',
  'app/page.tsx': 'import { redirect } from "next/navigation";\nexport default function Home() { redirect("/dashboard"); }',

  // Common Components
  'components/common/Button/Button.tsx': 'export const Button = () => <button>Button</button>;',
  'components/common/Button/index.ts': 'export * from "./Button";',
  'components/common/Input/Input.tsx': 'export const Input = () => <input />;',
  'components/common/Input/index.ts': 'export * from "./Input";',
  'components/common/Card/Card.tsx': 'export const Card = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;',
  'components/common/Card/index.ts': 'export * from "./Card";',
  'components/common/Modal/Modal.tsx': 'export const Modal = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;',
  'components/common/Modal/index.ts': 'export * from "./Modal";',
  
  // Dashboard Components
  'components/dashboard/BalanceCard/BalanceCard.tsx': 'export const BalanceCard = () => <div>Balance Card</div>;',
  'components/dashboard/BalanceCard/index.ts': 'export * from "./BalanceCard";',
  'components/dashboard/TransactionList/TransactionList.tsx': 'export const TransactionList = () => <div>Transaction List</div>;',
  'components/dashboard/TransactionList/index.ts': 'export * from "./TransactionList";',
  'components/dashboard/QuickActions/QuickActions.tsx': 'export const QuickActions = () => <div>Quick Actions</div>;',
  'components/dashboard/QuickActions/index.ts': 'export * from "./QuickActions";',

  // Groups Components
  'components/groups/GroupCard/GroupCard.tsx': 'export const GroupCard = () => <div>Group Card</div>;',
  'components/groups/GroupCard/index.ts': 'export * from "./GroupCard";',
  'components/groups/GroupList/GroupList.tsx': 'export const GroupList = () => <div>Group List</div>;',
  'components/groups/GroupList/index.ts': 'export * from "./GroupList";',
  'components/groups/GroupCreation/GroupCreation.tsx': 'export const GroupCreation = () => <div>Group Creation</div>;',
  'components/groups/GroupCreation/index.ts': 'export * from "./GroupCreation";',
  'components/groups/ContributionTracker/ContributionTracker.tsx': 'export const ContributionTracker = () => <div>Contribution Tracker</div>;',
  'components/groups/ContributionTracker/index.ts': 'export * from "./ContributionTracker";',

  // Payments Components
  'components/payments/SendPayment/SendPayment.tsx': 'export const SendPayment = () => <div>Send Payment</div>;',
  'components/payments/SendPayment/index.ts': 'export * from "./SendPayment";',
  'components/payments/RequestPayment/RequestPayment.tsx': 'export const RequestPayment = () => <div>Request Payment</div>;',
  'components/payments/RequestPayment/index.ts': 'export * from "./RequestPayment";',
  'components/payments/PaymentHistory/PaymentHistory.tsx': 'export const PaymentHistory = () => <div>Payment History</div>;',
  'components/payments/PaymentHistory/index.ts': 'export * from "./PaymentHistory";',

  // Layout Components
  'components/layout/Header/Header.tsx': 'export const Header = () => <header>Header</header>;',
  'components/layout/Header/index.ts': 'export * from "./Header";',
  'components/layout/Sidebar/Sidebar.tsx': 'export const Sidebar = () => <aside>Sidebar</aside>;',
  'components/layout/Sidebar/index.ts': 'export * from "./Sidebar";',

  // Hooks
  'hooks/useAuth.ts': 'export const useAuth = () => ({});',
  'hooks/useWallet.ts': 'export const useWallet = () => ({});',
  'hooks/useGroups.ts': 'export const useGroups = () => ({});',
  'hooks/usePayments.ts': 'export const usePayments = () => ({});',
  'hooks/useNotifications.ts': 'export const useNotifications = () => ({});',

  // Services
  'services/api/auth.ts': 'export const authService = {};',
  'services/api/wallet.ts': 'export const walletService = {};',
  'services/api/groups.ts': 'export const groupsService = {};',
  'services/api/payments.ts': 'export const paymentsService = {};',
  'services/stellar/wallet.ts': 'export const stellarWallet = {};',
  'services/stellar/transactions.ts': 'export const stellarTransactions = {};',
  'services/stellar/soroban.ts': 'export const soroban = {};',
  'services/whatsapp/webhook.ts': 'export const whatsappWebhook = {};',

  // Types
  'types/user.ts': 'export interface User { id: string; }',
  'types/group.ts': 'export interface Group { id: string; }',
  'types/payment.ts': 'export interface Payment { id: string; }',
  'types/transaction.ts': 'export interface Transaction { id: string; }',
  'types/wallet.ts': 'export interface Wallet { id: string; }',
  'types/api.ts': 'export interface ApiResponse { data: any; }',

  // Utils
  'utils/validators/auth.ts': 'export const validateAuth = () => true;',
  'utils/validators/group.ts': 'export const validateGroup = () => true;',
  'utils/validators/payment.ts': 'export const validatePayment = () => true;',
  'utils/formatters/currency.ts': 'export const formatCurrency = (amount: number) => amount.toString();',
  'utils/formatters/date.ts': 'export const formatDate = (date: Date) => date.toISOString();',
  'utils/formatters/address.ts': 'export const formatAddress = (address: string) => address;',
  'utils/constants/stellar.ts': 'export const STELLAR_NETWORK = "TESTNET";',
  'utils/constants/whatsapp.ts': 'export const WHATSAPP_API_VERSION = "v16.0";',
  'utils/helpers.ts': 'export const noop = () => {};',
  'utils/errorHandler.ts': 'export const handleError = (error: Error) => console.error(error);',

  // Context
  'context/AuthContext.tsx': 'import { createContext } from "react";\nexport const AuthContext = createContext({});',
  'context/WalletContext.tsx': 'import { createContext } from "react";\nexport const WalletContext = createContext({});',
  'context/GroupsContext.tsx': 'import { createContext } from "react";\nexport const GroupsContext = createContext({});',

  // Middleware
  'middleware.ts': 'import { NextResponse } from "next/server";\nexport function middleware(request) { return NextResponse.next(); }\nexport const config = { matcher: ["/dashboard/:path*"] };',
};

// Handle globals.css logic
const oldGlobalsCss = path.join(baseDir, 'app/globals.css');
if (fs.existsSync(oldGlobalsCss)) {
  fs.renameSync(oldGlobalsCss, path.join(baseDir, 'styles/globals.css'));
} else {
  files['styles/globals.css'] = '@import "tailwindcss";';
}

for (const [filePath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, filePath), content);
}

// Clean up default Next.js files
const toRemove = ['app/favicon.ico', 'app/fonts', 'app/page.module.css'];
toRemove.forEach(f => {
  const p = path.join(baseDir, f);
  if (fs.existsSync(p)) {
    if (fs.lstatSync(p).isDirectory()) {
      fs.rmSync(p, { recursive: true, force: true });
    } else {
      fs.unlinkSync(p);
    }
  }
});

console.log("Scaffold complete.");
