/**
 * User model.
 */
export default class User {
    private profile = {
    	first_name: '',
    	last_name: '',
    	document_type: '',
    	document_number: '',
    	phone: '',
    	cell_phone: '',
    	email: '',
    	birthday: '',
    	gender: '',
    	address: ''
    }

    constructor () {
    }

    setFirstName (data: string) {
    	this.profile.first_name = data
    }

    getFirstName () {
    	return this.profile.first_name
    }

    setLastName (data: string) {
    	this.profile.last_name = data
    }

    getLastName () {
    	return this.profile.last_name
    }

    setDocumentType (data: string) {
    	this.profile.document_type = data
    }

    getDocumentTyoe () {
    	return this.profile.document_type
    }

    setDocumentNumber (data: string) {
    	this.profile.document_number = data
    }

    getDocumentNumber () {
    	return this.profile.document_number
    }

    setPhone (data: string) {
    	this.profile.phone = data
    }

    getPhone () {
    	return this.profile.phone
    }

    setCellPhone (data: string) {
    	this.profile.cell_phone = data
    }

    getCellPhone () {
    	return this.profile.cell_phone
    }

    setEmail (data: string) {
    	this.profile.email = data
    }

    getEmail () {
    	return this.profile.email
    }

    setBirthday (data: string) {
    	this.profile.birthday = data
    }

    getBirthday () {
    	return this.profile.birthday
    }

    setGender (data: string) {
    	this.profile.gender = data
    }

    getGender () {
    	return this.profile.gender
    }

    setAddress (data: string) {
    	this.profile.address = data
    }

    getaddress () {
    	return this.profile.address
    }

    getProfile () {
    	return this.profile
    }
}
