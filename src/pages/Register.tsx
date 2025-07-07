import clsx from 'clsx'
import Input from '../components/input'
import { useForm, type SubmitHandler } from 'react-hook-form'
import ButtonComponent from '../components/button'
import Label from '../components/label'
import { Link } from 'react-router-dom'
import { userInputSchema, type userInputSchemaType } from '../toolkit/users/types'
import {zodResolver} from '@hookform/resolvers/zod'
import type { AppDispatch, RootState } from '../toolkit/store'
import { useDispatch, useSelector } from 'react-redux'
import { userThunk } from '../toolkit/users/thunk'
const Register = () => {
  const { isLoading } = useSelector((state: RootState) => state.userSlice)
    const {register, formState : {errors}, handleSubmit} = useForm<userInputSchemaType>({
      resolver : zodResolver(userInputSchema),
      mode : 'all'
    })
    const dispatch : AppDispatch = useDispatch()
    const handleRegister : SubmitHandler<userInputSchemaType> = async (data:userInputSchemaType) => {
      const response = await dispatch(userThunk.createUserThunk(data)).unwrap()
      if(response.status === 201){
        window.location.href = '/login'
      }
    }
  return (
    <main className={clsx(`w-full h-[90vh] font-manrope flex items-center justify-center`)}>
        <div className={clsx(`w-full max-w-lg items-center justify-center mx-auto px-4 py-6 md:px-10 md:py-10 flex flex-col gap-4 shadow shadow-gray-100 rounded-2xl`)}>
            <Label content='Avengine Workshop' sxStyle={{textAlign : "center"}}  textAlign={'center'}  variant='h4' />
            <Label content='Create your account' sxStyle={{textAlign : "center"}}  textAlign={'center'}  variant='subtitle1' />
            <Input placeholder='e.g. Joe' sxStyle={{width : '100%',}} errors={errors} id='username' name='username' register={register} label='Username' />
            <Input placeholder='e.g. balem@gmail.com' sxStyle={{width : '100%'}} errors={errors} id='email' name='email' register={register} label='Email' />
            <Input type='password' placeholder='e.g. 12345678' sxStyle={{width : '100%'}} errors={errors} id='password' name='password' register={register} label='Password' />
        <ButtonComponent disabled={isLoading} sxStyle={{padding : 1.2}}  label='Register' onClick={handleSubmit(handleRegister)}   />
            <div className={clsx('flex items-center gap-1 justify-center')}>
            <Label content="Already have an account?" sxStyle={{textAlign : "center", height : 'fit-content', mt : 1, fontStyle :"italic"}}  textAlign={'center'}  variant='subtitle2' />    
            <Link to={'/login'}  >Login</Link>
            </div>
        </div>
    </main>
  )
}

export default Register