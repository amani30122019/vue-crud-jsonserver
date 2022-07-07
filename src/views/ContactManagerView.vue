<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 text-success fw-bold">Contacts Manager
                    <router-link
                            :to="{name:'addContact'}"
                            class="btn btn-success btn-sm"
                    ><i
                            aria-hidden="true"
                            class="fa fa-plus-circle text-white fa-1x"
                    ></i>New Contact
                    </router-link>
                </p>
                <p class="fst-italic">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur ad autem dolor
                    nihil vitae earum aliquam aliquid officiis rem adipisci tempore, enim repellat iste explicabo nisi
                    odio eos illo vel aperiam consectetur. Saepe in nesciunt repudiandae distinctio natus praesentium
                    possimus. Obcaecati iste ipsa provident dolorem beatae quia nisi qui a.</p>
                <form>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col">
                                    <label>
                                        <input
                                                class="form-control"
                                                name="search-query"
                                                placeholder="Search name"
                                                type="text"
                                        >
                                    </label>
                                </div>
                                <div class="col">
                                    <input
                                            class="btn btn-sm btn-outline-dark"
                                            type="submit"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
    <!--    spinner-->
    <div class="container" v-if="loading">
        <div class="row">
            <div class="col">
                <spinner-component/>
            </div>
        </div>
    </div>
    <!--    error message-->
    <div class="container mt-5" v-if="!loading&&errorMessages">
        <div class="row">
            <div class="col">
                <p class="lead display-1 text-danger text-center">{{errorMessages}}</p>
            </div>
        </div>
    </div>
    <div class="container mt-3" v-if="contacts.length>0">
        <div class="row">
            <div :key="contact.id" class="col-md-6" v-for="contact in contacts">
                <div class="card my-3 list-group-item-success shadow-lg">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-sm-4">
                                <img
                                        :src="contact.photo"
                                        alt="User image"
                                        class="user-image"
                                >
                            </div>
                            <div class="col-sm-7">
                                <ul class="list-group">
                                    <li class="list-group-item">Name: <span class="fw-bold"> {{contact.name}}</span>
                                    </li>
                                    <li class="list-group-item">Email: <span class="fw-bold"> {{contact.email}}</span>
                                    </li>
                                    <li class="list-group-item">Mobile: <span class="fw-bold"> {{contact.mobile}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-sm-1 d-flex flex-column justify-content-center align-items-center">
                                <router-link
                                        :to="{name:'viewContact',params:{contactId:contact.id}}"
                                        class="my-2 btn btn-sm btn-warning"
                                ><i
                                        aria-hidden="true"
                                        class="fa fa-eye"
                                ></i></router-link>

                                <router-link
                                        :to="{name:'editContact',params:{contactId:contact.id}}"
                                        class="my-2 btn btn-sm btn-success"
                                ><i
                                        aria-hidden="true"
                                        class="fa fa-pen"
                                ></i></router-link>
                                <button @click="eraseContact(contact.id)" class="my-2 btn btn-sm btn-danger"><i
                                        aria-hidden="true"
                                        class="fa fa-trash"
                                ></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import {ContactServices} from "@/services/contactServices";
    import SpinnerComponent from "@/components/SpinnerComponent";

    export default {
        name: 'ContactManager',
        components: {SpinnerComponent},
        data() {
            return {
                loading: false,
                contacts: [],
                errorMessages: null
            }
        },
        created: async function () {
            try {
                this.loading = true
                const response = await ContactServices.getAllContacts()
                this.contacts = response.data
                this.loading = false
            } catch (e) {
                this.errorMessages = e;
                this.loading = false
            }
        },
        methods: {
            async eraseContact(id) {
                try {
                    this.loading = true
                    const killedContact = await ContactServices.destroyContact(id)
                    if (killedContact) {
                        const response = await ContactServices.getAllContacts()
                        this.contacts = response.data
                        this.loading = false
                    }
                } catch (e) {
                    this.errorMessages = e;
                    this.loading = false
                }


            }
        }


    }
</script>
