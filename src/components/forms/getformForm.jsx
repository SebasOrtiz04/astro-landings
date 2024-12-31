
import { useEffect, useState } from "react";
import formApi from "~/services/formsApi";


// Constantes ---------------------------------------------------------------------------------


const inputStyles = "w-full field-input border-2 border-secondary rounded-xl p-3 text-secondary h-12"
const labelStyles = "ml-1"
const errorStyles = "text-red-500 ml-2 text-xs"
const formInitialState = {full_name: '',phone: '', date_answer: ''}
const formErrorsInitialState = {
    full_name: {
        status:true,
        regex: new RegExp(/^[A-Za-zÁÉÍÓÚáéíóúñÑ]{2,}(\s[A-Za-zÁÉÍÓÚáéíóúñÑ'`]{2,})*$/),
        message:'El nombre solo puedo contener letras y espacios'
    }, 
    phone: {
        status:false,
        regex: new RegExp(/^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{3,4}[-.\s]?\d{4,6}$/),
        message:'El whastapp debe ser un numero valido'
    }, 
    date_answer: {
        status:true,
        regex: new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span className="text-bold">{text}</span>
            </div>
        </div>
    )
}

// -----------------------------------------------------------------------------
const ContactForm = () => {
    
    const [form, setForm] = useState(formInitialState);
    const [formErrors, setFormErrors] = useState(formErrorsInitialState);

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
        const someError = Object.keys(form).some(key => !formErrors[key] && form[key])
        console.log(someError)
        return someError
    }

    const handleSend = async  e => {
        e.preventDefault();
        try{
            const isValidid = lastValidate(form)
            
            if(!isValidid){
                setMessage('Formulario no válido', 'warning')
                return;
            }

            const response = await formApi.post('/forms', {});
            
            if(response.status === 201)
                setMessage('Mensaje enviado con éxito', 'success')

        }catch(error){
            setMessage(error.message, 'error');
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
        border-2 border-secondary rounded-xl mb-10 shadow-md text-secondary
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
                        <label className={labelStyles} id='date-label' htmlFor="date_answer"> Fecha de interes : </label>
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
                    {/* { load} */}
                    Enviar
                </button>
        </div>
    </section>
)
};

export default ContactForm;