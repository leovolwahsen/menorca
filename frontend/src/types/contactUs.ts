export interface IContactDetails {
    name: string
    email: string
    phone: string 
    whatsapp: string
}

export interface IContactUs {
    title: string
    primaryContact: IContactDetails
    secondaryContact: IContactDetails
}