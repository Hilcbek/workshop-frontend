import clsx from 'clsx'
import Input from '../components/input'
import { useForm, type SubmitHandler } from 'react-hook-form'
import ButtonComponent from '../components/button'
import Label from '../components/label'
import { Link } from 'react-router-dom'
import type { userInputSchemaType } from '../toolkit/users/types'
import type { AppDispatch, RootState, } from '../toolkit/store'
import { useDispatch, useSelector, } from 'react-redux'
import { userThunk } from '../toolkit/users/thunk'
import Cookies from 'js-cookie'
const Login = () => {
    const {isLoading} = useSelector((state:RootState) => state.userSlice)
    const {register, formState : {errors}, handleSubmit} = useForm<userInputSchemaType>()
    const dispatch : AppDispatch = useDispatch()
    const handleLogin : SubmitHandler<Omit<userInputSchemaType, 'email'>> = async (data:  Omit<userInputSchemaType, 'email'>) => {
        const res = await dispatch(userThunk.loginUserThunk(data)).unwrap()
        if(res.status === 200){
            Cookies.set('token', res.data[0].token, {expires : 1})
            window.location.href = '/'
        }
    }
  return (
    <main className={clsx(`w-full h-[90vh] font-manrope flex items-center justify-center`)}>
        <div className={clsx(`w-full max-w-lg items-center justify-center mx-auto px-4 py-6 md:px-10 md:py-10 flex flex-col gap-4 shadow shadow-gray-100 rounded-2xl`)}>
            <Label content='Avengine Workshop' sxStyle={{textAlign : "center"}}  textAlign={'center'}  variant='h4' />
             <Label content='Sign in to your account' sxStyle={{textAlign : "center"}}  textAlign={'center'}  variant='subtitle1' />
            <Input placeholder='e.g. Joe' sxStyle={{width : '100%',}} errors={errors} id='username' name='username' register={register} label='Username or Email-address' />
            <Input type='password' placeholder='e.g. Some#2323)_.' sxStyle={{width : '100%'}} errors={errors} id='password' name='password' register={register} label='Password' />
           <Link className='self-end text-sm hover:underline' to={'/forgot-password'}>Forgot password?</Link>
            <ButtonComponent disabled={isLoading} sxStyle={{padding : 1.2}}  label='Login' onClick={handleSubmit(handleLogin)}   />
            <div className={clsx('flex items-center gap-3 justify-center')}>
                <Label content="Don't have an account?" sxStyle={{textAlign : "center", height : 'fit-content', mt : 1, fontStyle :"italic"}}  textAlign={'center'}  variant='subtitle2' />    
                <Link to={'/register'}  >Register</Link>
            </div>
        </div>
    </main>
  )
}

export default Login