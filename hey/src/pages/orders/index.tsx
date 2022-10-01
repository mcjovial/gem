import Card from '@components/common/card';
import Layout from '@components/layouts/admin';
import Search from '@components/common/search';
import OrderList from '@components/order/order-list';
import { useState } from 'react';
import ErrorMessage from '@components/ui/error-message';
import Loader from '@components/ui/loader/loader';
import { useOrdersQuery } from '@data/order/use-orders.query';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SortOrder } from '@ts-types/generated';
import SortForm from '@components/common/sort-form';

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState('createdAt');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const {
    data,
    isLoading: loading,
    error,
  } = useOrdersQuery({
    limit: 20,
    page,
    text: searchTerm,
    orderBy,
    sortedBy,
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t('form:input-label-orders')}
          </h1>
        </div>

        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center ms-auto">
          <Search onSearch={handleSearch} />
          <SortForm
            showLabel={false}
            className="w-full md:w-1/2 md:ms-5 mt-5 md:mt-0 flex-shrink-0"
            onSortChange={({ value }: { value: SortOrder }) => {
              setColumn(value);
            }}
            onOrderChange={({ value }: { value: string }) => {
              setOrder(value);
            }}
            options={[
              { value: 'total', label: 'Total' },
              { value: 'createdAt', label: 'Created At' },
              { value: 'updatedAt', label: 'Updated At' },
            ]}
          />
        </div>
      </Card>

      <OrderList orders={data?.orders} onPagination={handlePagination} />
    </>
  );
}
Orders.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
