import DashboardGuard from '@/components/guards/DashboardGuard';
import Header from '@/components/layouts/Header';
import LogoutButton from '@/components/layouts/LogoutButton';
import PaymentFormModal from '@/components/modals/PaymentFormModal';
import PaymentSidebarForm from '@/components/pages/dash/PaymentSidebarForm';
import TransactionsTable from '@/components/pages/dash/TransactionsTable';
import UserBalance from '@/components/pages/dash/UserBalance';

export default function Home() {
  return (
    <DashboardGuard>
      <div className='min-h-screen pb-[40px] bg-[#f5f5f5] '>
        <Header>
          <LogoutButton />
        </Header>

        <div className='flex gap-[20px]  py-[40px]  container mx-auto px-[8px] sm:px-[14px]'>
          <div className='flex flex-col flex-1 gap-[20px]'>
            <UserBalance />

            <div className='flex-1 flex flex-col min-h-[300px] p-[20px]  bg-white rounded-md border border-gray-200'>
              <h2 className='font-medium text-base text-defaultText/70'>Transactions</h2>

              <div className='mt-[20px] flex-1'>
                <TransactionsTable />
              </div>
            </div>
          </div>
          <div className='hidden lg:block'>
            <PaymentSidebarForm />
          </div>
        </div>

        <div className='fixed left-0 bottom-0 w-full  lg:hidden flex items-center justify-center h-[70px] bg-white'>
          <PaymentFormModal
            trigger={
              <button className='bg-[#222] w-[220px] text-white text-sm font-medium px-[12px] rounded-md py-[10px]'>
                Pay
              </button>
            }
          />
        </div>
      </div>
    </DashboardGuard>
  );
}
