export interface ContactDetails {
    name: string
    email: string
    phone: string 
    whatsapp: string
}

export interface ContactUs {
    title: string
    primaryContact: ContactDetails
    secondaryContact: ContactDetails
}