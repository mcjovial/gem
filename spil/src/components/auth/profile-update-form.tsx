import Input from '@components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Card from '@components/common/card';
import { useUpdateUserMutation } from '@data/user/use-user-update.mutation';
import TextArea from '@components/ui/text-area';
import { useTranslation } from 'next-i18next';
import FileInput from '@components/ui/file-input';
import pick from 'lodash/pick';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileValidationSchema } from './profile-validation-schema';

type FormValues = {
  name: string;
  profile: {
    bio: string;
    contact: string;
    avatar: string;
  };
};

export default function ProfileUpdate({ me }: any) {
  const { t } = useTranslation();
  const { mutate: updateUser, isLoading: loading } = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      ...(me &&
        pick(me, ['name', 'profile.bio', 'profile.contact', 'profile.avatar'])),
    },
    resolver: yupResolver(profileValidationSchema),
  });

  async function onSubmit(values: FormValues) {
    const { name, profile } = values;
    updateUser({
      variables: {
        id: me?._id,
        input: {
          name: name,
          profile: {
            bio: profile?.bio,
            contact: profile?.contact,
            avatar: profile?.avatar,
          },
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:input-label-avatar')}
          details={t('form:avatar-help-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="profile.avatar" control={control} multiple={false} />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 border-b border-dashed border-border-base my-5 sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:profile-info-help-text')}
          className="w-full px-0 sm:pe-4 md:pe-5 pb-5 sm:w-4/12 md:w-1/3 sm:py-8"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3 mb-5">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            error={t(errors.name?.message!)}
            variant="outline"
            className="mb-5"
          />
          <TextArea
            label={t('form:input-label-bio')}
            {...register('profile.bio')}
            error={t(errors.profile?.bio?.message!)}
            variant="outline"
            className="mb-6"
          />
          <Input
            label={t('form:input-label-contact')}
            {...register('profile.contact')}
            error={t(errors.profile?.contact?.message!)}
            variant="outline"
            className="mb-5"
          />
        </Card>

        <div className="w-full text-end">
          <Button loading={loading} disabled={loading}>
            {t('form:button-label-save')}
          </Button>
        </div>
      </div>
    </form>
  );
}
