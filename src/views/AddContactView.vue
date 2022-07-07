<template>
    <div class="container">
        <div class="container mt-3">
            <div class="row">
                <div class="col-md-6">
                    <div class="h3">Add new contact</div>
                </div>
                <p class="lead fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore nam quas
                    recusandae repellat suscipit? Cupiditate delectus dicta fugiat illo inventore minima porro quas vero
                    voluptatem! Ad atque dicta dolorem doloribus ea, eligendi exercitationem facilis harum illum ipsa
                    itaque magni maxime minima nam nulla omnis perspiciatis quasi quidem quo tempore voluptatibus?</p>
            </div>
        </div>
    </div>
    <!--  Add new Contact-->
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <form @submit.prevent="submitNewContact">
                    <div class="mb-2">
                        <input class="form-control" placeholder="Full name" type="text" v-model="contact.name">
                    </div>
                    <div class="mb-2">
                        <input class="form-control" placeholder="Photo url" type="text" v-model="contact.photo">
                    </div>
                    <div class="mb-2">
                        <input class="form-control" placeholder="Email address" type="email" v-model="contact.email">
                    </div>
                    <div class="mb-2">
                        <input class="form-control" placeholder="Phone number" type="tel" v-model="contact.mobile">
                    </div>
                    <div class="mb-2">
                        <input class="form-control" placeholder="Company name" type="text" v-model="contact.company">
                    </div>
                    <div class="mb-2">
                        <input class="form-control" placeholder="Title" type="text" v-model="contact.title">
                    </div>
                    <div class="mb-2">
                        <select class="form-control" v-if="groups.length>0" v-model="contact.groupId">
                            <option value="">select group</option>
                            <option :key="group.id" :value="group.id" v-for="group in groups">{{group.name}}</option>
                        </select>
                    </div>
                    <div class="g-3">
                        <input class="btn btn-success" type="submit" value="Save"/>
                    </div>
                </form>
            </div>
            <div class="col-md-4">
                <img :src="contact.photo" alt="Contact image" class="user-image">
            </div>
        </div>
    </div>
</template>
<script>
    import {ContactServices} from "@/services/contactServices";

    export default {
        name: 'AddContactComponent',
        data() {
            return {
                contact: {
                    name: '',
                    photo: '',
                    mobile: '',
                    groupId: '',
                    email: '',
                    title: '',
                    company: ''
                },
                groups: []
            }
        },
        async created() {
            try {
                const groups = await ContactServices.getAllGroups()
                this.groups = groups.data
            } catch (e) {
                console.log(e)

            }
        },
        methods: {
            async submitNewContact() {
                try {
                    const savedContact = await ContactServices.createContact(this.contact)
                    if (savedContact) {
                        return this.$router.push({name: 'home'})
                    } else {
                        return this.$router.push({name: 'addContact'})
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>