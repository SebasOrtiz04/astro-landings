
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import formApi from "~/services/formsApi";
import { regex, removeEmptyKeys, sendInitialState } from "~/utils/forms";

// Constantes ---------------------------------------------------------------------------------


const inputStyles = "w-full field-input border-2 border-secondary rounded-xl p-3 text-secondary h-12"
const labelStyles = "ml-1"
const errorStyles = "text-red-500 ml-2 text-xs"
const formInitialState = {full_name: '',phone: '', date_answer: ''}
const formErrorsInitialState = {
    full_name: {
        status:true,
        regex: regex.optional_date_answer,
        message:'El nombre solo puedo contener letras y espacios'
    }, 
    phone: {
        status:false,
        regex: regex.required_phone,
        message:'El whastapp debe ser un numero valido'
    }, 
    date_answer: {
        status:true,
        regex: regex.required_date_answer,
        message:'Ingrese uan fecha válida'
    }
}


// Stack para el input ---------------------------------------------------------------------------------


const Stack = ({children, value, error}) => (
    <div className="flex flex-col gap-1">
        {children}
        <div className="h-4 -mt-1">            
            {   value && !error?.status && <span className={errorStyles}>{error?.message}</span> }
        </div>
    </div>
)

// SnackBar ---------------------------------------------------------------------------------

const SnackBar = ({text, open, handleClose, status = 'info'}) => {

    const statusStates = {
        success: 'bg-green-400 text-white',
        error: 'bg-red-400 text-white',
        warning: 'bg-yellow-400 text-secondary',
        info : 'bg-blue-400 text-white'
    }

    useEffect(()=>{
        if(!open) return
        const timer = setTimeout(() => handleClose(), 3000)
        return () => clearTimeout(timer)
    },[open])

    return (
        <div className={`fixed -top-10 z-50 flex items-center justify-center 
            w-full max-w-[400px] gap-3 rounded-lg p-2 shadow-xl 
            ${statusStates[status]}
            ${open ? 'translate-y-20 ' : '-translate-y-full'} transition-all duration-300 ease-in-out`
        }>
            <div className="flex items-center gap-2">
                <Icon icon="tabler:info-square-rounded" width="24" height="24" />
                <span className="text-bold">{text}</span>
            </div>
        </div>
    )
}

// -----------------------------------------------------------------------------
const ContactForm = () => {
    
    const [form, setForm] = useState(formInitialState);
    const [formErrors, setFormErrors] = useState(formErrorsInitialState);
    const [send, setSend] = useState(sendInitialState);

    const [msg, setMsg] = useState({text: '', status: 'info'});
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    
    useEffect(()=>{
        const newErrors = {...formErrors}
        Object.keys(form).forEach(key => {        
            const isValid = formErrors[key]?.regex.test(form[key])
            newErrors[key].status = isValid
        })
        setFormErrors(newErrors)
    },[form])
    
    const handleBlur =  e => {
        e.preventDefault();
        const {target : {name, value}} = e
        const newForm = {...form}
        newForm[name] = value.trim()
        setForm(newForm)
    }
    
    const setMessage = (text, status = 'info') => {
        setMsg({text,status})
        setOpen(true)
    }

    const lastValidate = form => {
        const someError = Object.keys(form).some(key => !formErrors[key].status)
        return !someError
    }

    const handleSend = async  e => {
        e.preventDefault();

        setSend({...send, loading:true, status:-1})
        try{
            const isValidid = lastValidate(form)
            if(!isValidid){
                setMessage('Formulario no válido', 'warning')
                return;
            }

            const cookedForm = removeEmptyKeys(form)
            const response = await formApi.post('/forms', cookedForm);

            if(response.status === 201){
                setForm(formInitialState)
                setMessage('Mensaje enviado con éxito', 'success')
            }

        }catch(error){
            setMessage(error.message, 'error');
        }finally{
            setSend({...send, loading:false})
        }
    }

return (
    <section className="flex flex-col items-center justify-center" >
        
        <SnackBar 
            text={msg.text}
            status={msg.status}
            open={open} 
            handleClose={handleClose} 
            handleOpen={handleOpen}
        />
        
        <h3 className="text-2xl max-w-[500px] font-bold my-10 text-center px-5">Déjanos la información de tu evento y te contactaremos</h3>
        <div 
        className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 w-[min(90vw,500px)] 
        border-2 border-secondary rounded-xl mb-10 shadow-md text-secondary dark:text-default
        ">
            <form id="contactForm" className="w-full">
                
                <fieldset className="flex flex-col gap-3" aria-labelledby='general-data'>

                    <legend id='general-data' className='text-xl mb-5'>
                        Información de contacto
                        <span className="block text-xs text-default"> (*) Obligatorios</span>    
                    </legend>
                    
                    <Stack error={formErrors.full_name} value={form.full_name}>
                        <label className={labelStyles} htmlFor="full_name" id='full-name-label' > Nombre :</label>
                        <input 
                            type="text"
                            value={form.full_name}
                            onChange={(e) => setForm({...form, full_name: e.target.value})}
                            name="full_name" 
                            aria-labelledby="full-name-label" 
                            placeholder="Escribe tu nombre como Juan o María"
                            className={`${inputStyles} ${formErrors.full_name?.status && form.full_name ? 'border-green-600' : form.full_name && 'border-red-500'}`}
                            onBlur={e => handleBlur(e)}
                        />

                    </Stack>

                    <Stack error={formErrors.phone} value={form.phone}>
                        <label className={labelStyles} id='phone-label' htmlFor="phone">* Whatsapp : </label>
                        <input 
                            type="text" 
                            name="phone"
                            value={form.phone}
                            onChange={(e) => setForm({...form, phone: e.target.value})}
                            aria-labelledby="phone-label"
                            className={`${inputStyles} ${formErrors.phone?.status && form.phone ? 'border-green-600' : form.phone && 'border-red-500'}`}
                            placeholder="Escribe tu número de whatsapp"
                            onBlur={e => handleBlur(e)}
                        />
                    </Stack>

                    <Stack error={formErrors.date_answer} value={form.date_answer}>
                        <label className={labelStyles} id='date-label' htmlFor="date_answer">* Fecha de interes : </label>
                        <input 
                            type="date" 
                            value={form.date_answer}
                            onChange={(e) => setForm({...form, date_answer: e.target.value})}
                            aria-labelledby="date-label"
                            name="date_answer" 
                            placeholder="Escribe la fecha de tu evento"
                            className={`${inputStyles} ${formErrors.date_answer?.status && form.date_answer ? 'border-green-600' : form.date_answer && 'border-red-500'}`}
                        />
                    </Stack>
                </fieldset>

            </form>
                <button type="submit" onClick={handleSend} className="mt-5 btn-secondary w-[100%] focus:outline-none focus:ring-0">
                    {
                        send.loading 
                        ? <Icon icon="tabler:loader-3" width="24" height="24" className='animate-spin' />
                        : <Icon icon="tabler:send" width="24" height="24" />}
                    Enviar
                </button>
        </div>
    </section>
)
};

export default ContactForm;