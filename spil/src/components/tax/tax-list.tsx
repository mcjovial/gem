import { Table } from '@components/ui/table';
import ActionButtons from '@components/common/action-buttons';
import { IPaginator, Tax } from '@ts-types/generated';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@utils/locals';

export type IProps = {
  taxes: IPaginator<Tax> | undefined;
};
const TaxList = ({ taxes }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t('table:table-item-id'),
      dataIndex: '_id',
      key: '_id',
      ellipsis: true,
      align: 'center',
      width: 100,
    },
    {
      title: t('table:table-item-title'),
      dataIndex: 'name',
      key: 'name',
      align: alignLeft,
      width: 150,
    },
    {
      title: `${t('table:table-item-rate')} (%)`,
      dataIndex: 'rate',
      key: 'rate',
      align: 'center',
    },
    {
      title: t('table:table-item-country'),
      dataIndex: 'country',
      key: 'country',
      align: 'center',
    },
    {
      title: t('table:table-item-city'),
      dataIndex: 'city',
      key: 'city',
      align: 'center',
    },
    {
      title: t('table:table-item-state'),
      dataIndex: 'state',
      key: 'state',
      align: 'center',
    },
    {
      title: t('table:table-item-zip'),
      dataIndex: 'zip',
      key: 'zip',
      align: 'center',
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: '_id',
      key: 'actions',
      align: 'center',
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.TAXES}/edit/${id}`}
          deleteModalView="DELETE_TAX"
        />
      ),
      width: 200,
    },
  ];
  return (
    <div className="rounded overflow-hidden shadow mb-8">
      {/* @ts-ignore */}
      <Table
        columns={columns}
        emptyText={t('table:empty-table-data')}
        data={taxes?.data}
        rowKey="_id"
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default TaxList;
