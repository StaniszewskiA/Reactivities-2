import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../app/stores/store';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextIArea from '../../app/common/form/MyTextArea';

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditform({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile}} = useStore();
    return (
        <Formik
            initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form className='ui form'>
                    <MyTextInput placeholder='Display Name' name='displayName' />
                    <MyTextIArea rows={3} placeholder='Add your bio' name='bio' />
                    <Button
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content='Update profile'
                        floated='right'
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    )
})