// Styles ---------------------------------------------------------------------------------
export const inputStyles : string = "w-full field-input border-2 border-secondary rounded-xl p-3 text-secondary h-12"
export const labelStyles : string = "ml-1"
export const errorStyles : string = "text-red-500 ml-2 text-xs"

//  Form ---------------------------------------------------------------------------------
export type FormKeys = 'full_name' | 'phone' | 'date_answer';
export type FormInitialState = Record<FormKeys, string>;

export const formInitialState : FormInitialState = {
    full_name: '',
    phone: '', 
    date_answer: ''
}

export const sendInitialState = {
    loading:false,
    status:-1
}

// Regex ---------------------------------------------------------------------------------
type RegexOptions = 'optional_full_name' | 'required_phone' | 'optional_date_answer' | 'required_date_answer';
type RegexList = Record<RegexOptions, RegExp>;

export const regex : RegexList = {
    optional_full_name : new RegExp(/^$|^[A-Za-zÁÉÍÓÚáéíóúñÑ]{2,}(\s[A-Za-zÁÉÍÓÚáéíóúñÑ'`]{2,})*$/),
    required_phone : new RegExp(/^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{3,4}[-.\s]?\d{4,6}$/),
    optional_date_answer : new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$|^$/),
    required_date_answer : new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/),
}

export const styles = {

}

// helpers ---------------------------------------------------------------------------------

export const removeEmptyKeys = (obj) => {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
        delete obj[key];
      }
    }
    return obj;
};

export const whatsAppUrl = 'https://wa.me/522221275134?text=Hola%20Estaba%20en%20tu%20sitio%20y%20quiero%20información%20sobre%20el%20infblable.'
