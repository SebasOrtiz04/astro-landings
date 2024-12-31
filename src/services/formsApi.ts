import axios from 'axios';

const axiosConfig = {
    baseURL: import.meta.env.PUBLIC_FORMS_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Mistli-Public-Key' : import.meta.env.PUBLIC_MISTLI_PUBLIC_KEY,
        'Mistli-Form-Secret' : import.meta.env.PUBLIC_MISTLI_FORM_SECRET,
    },
}

const formApi = axios.create(axiosConfig);

export default formApi;