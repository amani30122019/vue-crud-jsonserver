import axios from 'axios'

export class ContactServices {
    static baseUrl = "http://localhost:9000"

    static getAllContacts() {
        const dataUrl = `${this.baseUrl}/contacts`
        return axios.get(dataUrl)
    }

    static getContact(contactId) {
        const contactUrl = `${this.baseUrl}/contacts/${contactId}`
        return axios.get(contactUrl)
    }

    static createContact(contact) {
        const contactUrl = `${this.baseUrl}/contacts`
        return axios.post(contactUrl, contact)
    }

    static updateContact(contact, contactId) {
        const contactUrl = `${this.baseUrl}/contacts/${contactId}`
        return axios.patch(contactUrl, contact)
    }

    static destroyContact(contactId) {
        const contactUrl = `${this.baseUrl}/contacts/${contactId}`
        return axios.delete(contactUrl)
    }

    static getAllGroups() {
        const groupsUrl = `${this.baseUrl}/groups`
        return axios.get(groupsUrl)
    }

    static getGroup(contact) {
        const id = contact.groupId
        const groupUrl = `${this.baseUrl}/groups/${id}`
        return axios.get(groupUrl)
    }
}